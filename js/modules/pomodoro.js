/**
 * Student Productivity Hub - Focus & Pomodoro Engine Module
 */

import { state } from '../state.js';
import { sound } from '../audio.js';

let timerInterval = null;
let mode = 'focus'; // 'focus', 'shortBreak', 'longBreak'
let timeLeft = 25 * 60; // in seconds
let totalDuration = 25 * 60;
let isRunning = false;
let selectedTaskId = '';

export function renderPomodoro(container) {
  const pData = state.data.pomodoro;
  const tasks = state.data.tasks.filter(t => !t.completed);

  // Calculate circular stroke values
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
  const strokeDashoffset = circumference - (progressRatio * circumference);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Title & Intro -->
      <div class="text-center">
        <h1 class="text-3xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
          <i data-lucide="timer" class="w-8 h-8 text-indigo-600"></i> Deep Focus & Pomodoro
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Eliminate digital distractions, train concentration stamina, and maintain consistent daily study streaks.
        </p>
      </div>

      <!-- Mode Selector Pills -->
      <div class="flex items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl max-w-sm mx-auto border border-slate-200 dark:border-slate-700">
        <button id="pomo-mode-focus" class="flex-1 py-2 text-xs font-bold rounded-xl transition-all ${mode === 'focus' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'}">
          Focus (25m)
        </button>
        <button id="pomo-mode-short" class="flex-1 py-2 text-xs font-bold rounded-xl transition-all ${mode === 'shortBreak' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'}">
          Short Break (5m)
        </button>
        <button id="pomo-mode-long" class="flex-1 py-2 text-xs font-bold rounded-xl transition-all ${mode === 'longBreak' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'}">
          Long Break (15m)
        </button>
      </div>

      <!-- Main Timer Card -->
      <div class="glass-panel rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col items-center relative overflow-hidden">
        <!-- Circular Display -->
        <div class="relative w-72 h-72 flex items-center justify-center my-4">
          <svg class="w-full h-full timer-progress-ring" viewBox="0 0 280 280">
            <!-- Background circle -->
            <circle
              cx="140"
              cy="140"
              r="${radius}"
              stroke="currentColor"
              stroke-width="12"
              class="text-slate-200 dark:text-slate-700/60 fill-none"
            />
            <!-- Animated progress circle -->
            <circle
              id="pomo-progress-circle"
              cx="140"
              cy="140"
              r="${radius}"
              stroke="currentColor"
              stroke-width="12"
              stroke-linecap="round"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${strokeDashoffset}"
              class="${mode === 'focus' ? 'text-indigo-600' : 'text-emerald-500'} fill-none transition-all duration-500"
            />
          </svg>

          <!-- Digital Clock in Center -->
          <div class="absolute flex flex-col items-center">
            <span id="pomo-display" class="text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-mono">
              ${formattedTime}
            </span>
            <span class="text-xs uppercase tracking-widest font-bold text-slate-400 mt-2">
              ${mode === 'focus' ? 'Study Sprint' : 'Rest & Recharge'}
            </span>
          </div>
        </div>

        <!-- Task Link Selector -->
        <div class="w-full max-w-sm mb-6">
          <label class="block text-center text-xs font-bold text-slate-500 mb-1.5">
            Focus Goal for this session:
          </label>
          <select id="pomo-task-select" class="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">General Study / Unassigned</option>
            ${tasks.map(t => `
              <option value="${t.id}" ${selectedTaskId === t.id ? 'selected' : ''}>
                ${t.title}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Timer Controls -->
        <div class="flex items-center gap-4">
          <button id="pomo-btn-reset" class="p-3 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Reset Timer">
            <i data-lucide="rotate-ccw" class="w-5 h-5"></i>
          </button>

          <button id="pomo-btn-toggle" class="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 transition-all transform active:scale-95">
            <i data-lucide="${isRunning ? 'pause' : 'play'}" class="w-5 h-5 fill-current"></i>
            <span>${isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>

          <button id="pomo-btn-skip" class="p-3 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Skip to next session">
            <i data-lucide="skip-forward" class="w-5 h-5"></i>
          </button>
        </div>
      </div>

      <!-- Ambient Audio Generator & Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Procedural Ambient Sound Controls -->
        <div class="glass-panel rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <i data-lucide="headphones" class="w-5 h-5 text-indigo-500"></i>
              <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">Ambient Background Audio</h3>
            </div>
            <span class="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              Procedural Web Audio
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Generated directly in your browser. Blocks distracting background noise with zero downloads needed.
          </p>

          <div class="grid grid-cols-2 gap-2">
            <button data-sound="none" class="btn-ambient-sound py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${sound.currentAmbient === null ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'border-slate-200 dark:border-slate-700 text-slate-600'}">
              🔇 Mute / Silence
            </button>
            <button data-sound="rain" class="btn-ambient-sound py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${sound.currentAmbient === 'rain' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'border-slate-200 dark:border-slate-700 text-slate-600'}">
              🌧️ Gentle Rain
            </button>
            <button data-sound="whitenoise" class="btn-ambient-sound py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${sound.currentAmbient === 'whitenoise' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'border-slate-200 dark:border-slate-700 text-slate-600'}">
              🌊 Brown / White Noise
            </button>
            <button data-sound="binaural" class="btn-ambient-sound py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${sound.currentAmbient === 'binaural' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'border-slate-200 dark:border-slate-700 text-slate-600'}">
              🧠 Alpha Focus Beats
            </button>
          </div>
        </div>

        <!-- Focus Statistics -->
        <div class="glass-panel rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <i data-lucide="bar-chart-2" class="w-5 h-5 text-indigo-500"></i>
              <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">Daily Focus Milestones</h3>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-3 bg-white/60 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700/60">
                <span class="text-xs text-slate-500 font-medium">Today's Focus Time</span>
                <p class="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">${pData.stats.todayMinutes} min</p>
              </div>
              <div class="p-3 bg-white/60 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700/60">
                <span class="text-xs text-slate-500 font-medium">Completed Sprints</span>
                <p class="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">${pData.stats.todaySessions} sessions</p>
              </div>
              <div class="p-3 bg-white/60 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700/60">
                <span class="text-xs text-slate-500 font-medium">All-time Deep Work</span>
                <p class="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">${(pData.stats.totalMinutes / 60).toFixed(1)} hrs</p>
              </div>
              <div class="p-3 bg-white/60 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700/60">
                <span class="text-xs text-slate-500 font-medium">Total Sprints</span>
                <p class="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">${pData.stats.totalSessions}</p>
              </div>
            </div>
          </div>
          <p class="text-[11px] text-slate-400 mt-4 italic">
            Tip: 4 Pomodoro sessions (100 min) daily equals over 11 hours of pure deep study every week!
          </p>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  attachPomoEvents(container);
}

function attachPomoEvents(container) {
  // Mode Buttons
  container.querySelector('#pomo-mode-focus')?.addEventListener('click', () => switchMode('focus', 25 * 60, container));
  container.querySelector('#pomo-mode-short')?.addEventListener('click', () => switchMode('shortBreak', 5 * 60, container));
  container.querySelector('#pomo-mode-long')?.addEventListener('click', () => switchMode('longBreak', 15 * 60, container));

  // Toggle Play/Pause
  container.querySelector('#pomo-btn-toggle')?.addEventListener('click', () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer(container);
    }
    renderPomodoro(container);
  });

  // Reset
  container.querySelector('#pomo-btn-reset')?.addEventListener('click', () => {
    pauseTimer();
    timeLeft = totalDuration;
    renderPomodoro(container);
  });

  // Skip
  container.querySelector('#pomo-btn-skip')?.addEventListener('click', () => {
    pauseTimer();
    if (mode === 'focus') {
      switchMode('shortBreak', 5 * 60, container);
    } else {
      switchMode('focus', 25 * 60, container);
    }
  });

  // Task selection
  container.querySelector('#pomo-task-select')?.addEventListener('change', (e) => {
    selectedTaskId = e.target.value;
  });

  // Ambient sound buttons
  container.querySelectorAll('.btn-ambient-sound').forEach(btn => {
    btn.addEventListener('click', () => {
      const soundType = btn.dataset.sound;
      sound.startAmbient(soundType);
      renderPomodoro(container);
    });
  });
}

function switchMode(newMode, duration, container) {
  pauseTimer();
  mode = newMode;
  totalDuration = duration;
  timeLeft = duration;
  renderPomodoro(container);
}

function startTimer(container) {
  if (isRunning) return;
  isRunning = true;
  sound.playTick();

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateClockDisplay();
    } else {
      onTimerFinished(container);
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateClockDisplay() {
  const display = document.getElementById('pomo-display');
  const circle = document.getElementById('pomo-progress-circle');

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (display) {
    display.textContent = formattedTime;
    document.title = `(${formattedTime}) Student Productivity Hub`;
  }

  if (circle) {
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const progressRatio = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
    const strokeDashoffset = circumference - (progressRatio * circumference);
    circle.style.strokeDashoffset = strokeDashoffset;
  }
}

function onTimerFinished(container) {
  pauseTimer();
  document.title = 'Student Productivity Hub';

  // Play celebration sound
  sound.playChime('success');

  // Trigger confetti for student reward!
  if (window.confetti) {
    window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  }

  if (mode === 'focus') {
    const focusMinutes = Math.round(totalDuration / 60);
    state.recordPomodoroSession(focusMinutes);

    // If attached to a task, offer quick complete
    if (selectedTaskId) {
      const task = state.data.tasks.find(t => t.id === selectedTaskId);
      if (task && confirm(`Great focus sprint! Did you complete "${task.title}"?`)) {
        state.toggleTaskCompletion(selectedTaskId);
      }
    }

    alert('🎉 Fantastic focus session completed! Take a well-deserved short break.');
    switchMode('shortBreak', 5 * 60, container);
  } else {
    alert('☕ Break is over! Ready to dive back in?');
    switchMode('focus', 25 * 60, container);
  }
}

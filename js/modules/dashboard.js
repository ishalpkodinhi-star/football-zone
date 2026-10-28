/**
 * Student Productivity Hub - Dashboard Module
 */

import { state } from '../state.js';

const STUDENT_QUOTES = [
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Focus is a muscle; the more you protect your deep work, the stronger it becomes.", author: "Cal Newport" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" }
];

export function renderDashboard(container) {
  const data = state.data;
  const quote = STUDENT_QUOTES[Math.floor(Math.random() * STUDENT_QUOTES.length)];

  // Compute metrics
  const totalTasks = data.tasks.length;
  const completedTasks = data.tasks.filter(t => t.completed).length;
  const taskCompletionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Upcoming deadlines (next 48h)
  const now = new Date();
  const upcomingTasks = data.tasks
    .filter(t => !t.completed && t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  // Today's classes / scheduled items
  const currentDayOfWeek = now.getDay() === 0 ? 7 : now.getDay(); // 1 = Mon ... 7 = Sun
  const todaySchedule = data.planner
    .filter(p => p.dayOfWeek === currentDayOfWeek)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  container.innerHTML = `
    <!-- Top Greeting Banner -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-lg mb-8">
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 mr-1 text-amber-300"></i> Semester ${data.profile.semester}
            </span>
            <span class="text-xs text-indigo-200">${data.profile.university}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome back, ${data.profile.name}! 👋</h1>
          <p class="mt-2 text-indigo-100 italic text-sm max-w-xl">
            "${quote.text}" — <span class="text-indigo-200 font-medium">${quote.author}</span>
          </p>
        </div>

        <!-- Streak & Quick Action -->
        <div class="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
          <div class="text-center">
            <div class="flex items-center justify-center text-amber-400">
              <i data-lucide="flame" class="w-7 h-7 animate-bounce"></i>
              <span class="text-2xl font-black ml-1">${data.profile.streak}</span>
            </div>
            <p class="text-[11px] font-medium tracking-wide uppercase text-indigo-100">Day Streak</p>
          </div>
          <div class="h-10 w-px bg-white/20"></div>
          <div class="text-center">
            <span class="text-2xl font-black text-emerald-300">${data.pomodoro.stats.todayMinutes}m</span>
            <p class="text-[11px] font-medium tracking-wide uppercase text-indigo-100">Focus Today</p>
          </div>
        </div>
      </div>

      <!-- Background decorative circle -->
      <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
    </div>

    <!-- Quick Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- Focus Minutes -->
      <div class="glass-panel rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 transition-card">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Deep Work</span>
          <div class="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <i data-lucide="timer" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-bold text-slate-800 dark:text-slate-100">${data.pomodoro.stats.todayMinutes}</span>
          <span class="text-sm text-slate-500">minutes today</span>
        </div>
        <div class="mt-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
          ${data.pomodoro.stats.todaySessions} completed session${data.pomodoro.stats.todaySessions === 1 ? '' : 's'}
        </div>
      </div>

      <!-- Tasks Progress -->
      <div class="glass-panel rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 transition-card">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assignments</span>
          <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <i data-lucide="check-circle-2" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-bold text-slate-800 dark:text-slate-100">${completedTasks} / ${totalTasks}</span>
          <span class="text-sm text-slate-500">done</span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-1.5 mt-3 overflow-hidden">
          <div class="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style="width: ${taskCompletionRate}%"></div>
        </div>
      </div>

      <!-- Active Courses -->
      <div class="glass-panel rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 transition-card">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Enrolled Courses</span>
          <div class="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
            <i data-lucide="book-open" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-bold text-slate-800 dark:text-slate-100">${data.courses.length}</span>
          <span class="text-sm text-slate-500">subjects</span>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Target GPA: <span class="font-bold text-slate-700 dark:text-slate-200">${data.profile.targetGpa}</span>
        </div>
      </div>

      <!-- Quick Action / Study Trigger -->
      <div class="glass-panel rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 transition-card flex flex-col justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quick Start</span>
          <p class="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1">Ready for a focus sprint?</p>
        </div>
        <button id="btn-quick-pomo" class="mt-3 w-full py-2 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all">
          <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i> Launch 25m Timer
        </button>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Upcoming Deadlines (2 cols) -->
      <div class="lg:col-span-2 space-y-6">
        <div class="glass-panel rounded-xl p-6 border border-slate-200/80 dark:border-slate-800">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <i data-lucide="clock" class="w-5 h-5 text-indigo-500"></i>
              <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">Priority Deadlines</h2>
            </div>
            <button id="btn-view-all-tasks" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              View all tasks <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          ${upcomingTasks.length === 0 ? `
            <div class="text-center py-8 text-slate-400">
              <i data-lucide="check-circle" class="w-10 h-10 mx-auto mb-2 text-emerald-400"></i>
              <p class="text-sm font-medium">All caught up! No urgent assignments pending.</p>
            </div>
          ` : `
            <div class="space-y-3">
              ${upcomingTasks.map(task => {
                const course = data.courses.find(c => c.id === task.courseId) || { name: 'General', color: '#6366f1' };
                const daysDiff = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                const isUrgent = daysDiff <= 1;

                return `
                  <div class="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                    <div class="flex items-center gap-3">
                      <button data-task-id="${task.id}" class="btn-check-task w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 flex items-center justify-center transition-colors">
                      </button>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="text-xs font-bold px-2 py-0.5 rounded text-white" style="background-color: ${course.color};">
                            ${course.code || course.name}
                          </span>
                          <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-100">${task.title}</h4>
                        </div>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                          <i data-lucide="calendar" class="w-3.5 h-3.5"></i> Due: ${task.dueDate} 
                          ${isUrgent ? '<span class="text-red-500 font-semibold ml-1.5">(Due soon!)</span>' : ''}
                        </p>
                      </div>
                    </div>
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-full badge-${task.priority}">
                      ${task.priority.toUpperCase()}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- Quick Study Notes Preview -->
        <div class="glass-panel rounded-xl p-6 border border-slate-200/80 dark:border-slate-800">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <i data-lucide="file-text" class="w-5 h-5 text-indigo-500"></i>
              <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">Recent Study Notes</h2>
            </div>
            <button id="btn-view-notes" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              Open notebook <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${data.notes.slice(0, 2).map(note => {
              const course = data.courses.find(c => c.id === note.courseId);
              return `
                <div class="p-4 rounded-lg border border-slate-100 dark:border-slate-700/60 bg-white/40 dark:bg-slate-800/30">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                    ${course ? course.code : 'General'}
                  </span>
                  <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 truncate">${note.title}</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    ${note.content.replace(/[#*`-]/g, '')}
                  </p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Right Column: Today's Schedule & Flashcard Quick Review -->
      <div class="space-y-6">
        <!-- Today's Classes -->
        <div class="glass-panel rounded-xl p-6 border border-slate-200/80 dark:border-slate-800">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <i data-lucide="calendar-days" class="w-5 h-5 text-indigo-500"></i>
              <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">Today's Timetable</h2>
            </div>
            <button id="btn-open-planner" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              Full Week
            </button>
          </div>

          ${todaySchedule.length === 0 ? `
            <div class="text-center py-6 text-slate-400">
              <i data-lucide="coffee" class="w-8 h-8 mx-auto mb-2 text-indigo-300"></i>
              <p class="text-xs">No lectures scheduled for today! Great time for study & deep work.</p>
            </div>
          ` : `
            <div class="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100 dark:before:bg-slate-700">
              ${todaySchedule.map(item => {
                const course = data.courses.find(c => c.id === item.courseId);
                return `
                  <div class="relative">
                    <span class="absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800" style="background-color: ${course?.color || '#6366f1'}"></span>
                    <div class="text-xs font-bold text-slate-500 dark:text-slate-400">${item.startTime} - ${item.endTime}</div>
                    <div class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">${item.title}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <i data-lucide="map-pin" class="w-3 h-3"></i> ${item.location}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- Flashcards Quick Practice Widget -->
        <div class="glass-panel rounded-xl p-6 border border-slate-200/80 dark:border-slate-800">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <i data-lucide="layers" class="w-5 h-5 text-indigo-500"></i>
              <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">Flashcards</h2>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Strengthen your memory retention with active recall before exams.
          </p>
          <div class="space-y-2">
            ${data.flashcardDecks.map(deck => `
              <div class="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700/60 bg-white/40 dark:bg-slate-800/30">
                <div>
                  <h4 class="text-xs font-bold text-slate-800 dark:text-slate-100">${deck.title}</h4>
                  <span class="text-[11px] text-slate-500">${deck.cards.length} cards</span>
                </div>
                <button data-deck-id="${deck.id}" class="btn-review-deck px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-bold rounded transition-colors">
                  Practice
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach quick events
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Quick pomodoro button
  container.querySelector('#btn-quick-pomo')?.addEventListener('click', () => {
    window.navigateToTab('pomodoro');
  });

  container.querySelector('#btn-view-all-tasks')?.addEventListener('click', () => {
    window.navigateToTab('tasks');
  });

  container.querySelector('#btn-view-notes')?.addEventListener('click', () => {
    window.navigateToTab('notes');
  });

  container.querySelector('#btn-open-planner')?.addEventListener('click', () => {
    window.navigateToTab('planner');
  });

  // Check task quick action
  container.querySelectorAll('.btn-check-task').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const taskId = e.currentTarget.dataset.taskId;
      state.toggleTaskCompletion(taskId);
      if (window.confetti) {
        window.confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      }
      renderDashboard(container);
    });
  });

  // Practice flashcard deck
  container.querySelectorAll('.btn-review-deck').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const deckId = e.currentTarget.dataset.deckId;
      window.navigateToTab('flashcards', { deckId });
    });
  });
}

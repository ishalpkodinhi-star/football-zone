/**
 * Student Productivity Hub - Weekly Study Planner & Timetable Module
 */

import { state } from '../state.js';

const DAYS = [
  { id: 1, name: 'Monday', short: 'Mon' },
  { id: 2, name: 'Tuesday', short: 'Tue' },
  { id: 3, name: 'Wednesday', short: 'Wed' },
  { id: 4, name: 'Thursday', short: 'Thu' },
  { id: 5, name: 'Friday', short: 'Fri' },
  { id: 6, name: 'Saturday', short: 'Sat' },
  { id: 7, name: 'Sunday', short: 'Sun' }
];

export function renderPlanner(container) {
  const data = state.data;
  const events = data.planner;

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <i data-lucide="calendar" class="w-7 h-7 text-indigo-600"></i> Weekly Timetable & Study Schedule
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Visual weekly time-blocking for lectures, laboratory sessions, and focused deep work.
          </p>
        </div>

        <button id="btn-add-schedule-item" class="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-1.5 transition-colors self-start md:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i> Add Class / Time Block
        </button>
      </div>

      <!-- Weekly Schedule Grid (Columns per Day) -->
      <div class="grid grid-cols-1 md:grid-cols-7 gap-3">
        ${DAYS.map(day => {
          const dayEvents = events
            .filter(e => e.dayOfWeek === day.id)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          const isToday = (new Date().getDay() === 0 ? 7 : new Date().getDay()) === day.id;

          return `
            <div class="flex flex-col rounded-xl bg-slate-50 dark:bg-slate-800/40 border ${isToday ? 'border-indigo-500 shadow-sm ring-1 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800'} p-3 min-h-[420px]">
              <!-- Day Header -->
              <div class="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-700/60">
                <span class="text-xs font-black uppercase tracking-wider ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}">
                  ${day.short}
                </span>
                ${isToday ? `
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300">
                    Today
                  </span>
                ` : ''}
              </div>

              <!-- Day Events Container -->
              <div class="space-y-2.5 flex-1">
                ${dayEvents.map(evt => {
                  const course = data.courses.find(c => c.id === evt.courseId) || { color: '#6366f1', code: 'General' };
                  return `
                    <div class="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 shadow-xs relative group transition-card" style="border-left: 3px solid ${course.color}">
                      <div class="flex items-center justify-between gap-1">
                        <span class="text-[10px] font-bold text-slate-400">
                          ${evt.startTime} - ${evt.endTime}
                        </span>
                        <button data-event-id="${evt.id}" class="btn-delete-event opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity">
                          <i data-lucide="trash" class="w-3 h-3"></i>
                        </button>
                      </div>

                      <h4 class="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1 leading-snug">
                        ${evt.title}
                      </h4>

                      ${evt.location ? `
                        <div class="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          <i data-lucide="map-pin" class="w-2.5 h-2.5"></i>
                          <span class="truncate">${evt.location}</span>
                        </div>
                      ` : ''}

                      <span class="inline-block mt-2 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        ${evt.type || 'Study'}
                      </span>
                    </div>
                  `;
                }).join('')}

                ${dayEvents.length === 0 ? `
                  <div class="h-28 flex items-center justify-center text-center text-slate-400 text-[11px] border border-dashed border-slate-200 dark:border-slate-700/60 rounded-lg">
                    Free day
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Modal Container -->
    <div id="planner-modal-container"></div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  attachPlannerEvents(container);
}

function attachPlannerEvents(container) {
  // Add Event
  container.querySelector('#btn-add-schedule-item')?.addEventListener('click', () => {
    openPlannerModal(container);
  });

  // Delete event
  container.querySelectorAll('.btn-delete-event').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.eventId;
      if (confirm('Delete this scheduled event?')) {
        state.deletePlannerEvent(id);
        renderPlanner(container);
      }
    });
  });
}

function openPlannerModal(container) {
  const modalContainer = container.querySelector('#planner-modal-container');
  const courses = state.data.courses;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div class="glass-panel bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
            Schedule Timetable Block
          </h3>
          <button id="btn-close-plan-modal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form id="planner-form" class="mt-4 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Session Title *</label>
            <input 
              type="text" 
              name="title" 
              required
              placeholder="e.g. CS 301 Lecture or Library Deep Work" 
              class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Associated Course</label>
              <select name="courseId" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">General / Independent</option>
                ${courses.map(c => `
                  <option value="${c.id}">${c.code} - ${c.name}</option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Type</label>
              <select name="type" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="lecture">Lecture</option>
                <option value="lab">Lab / Discussion</option>
                <option value="study">Deep Study</option>
                <option value="group">Study Group</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Day of the Week</label>
            <select name="dayOfWeek" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              ${DAYS.map(d => `
                <option value="${d.id}">${d.name}</option>
              `).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Start Time</label>
              <input 
                type="time" 
                name="startTime" 
                required
                value="10:00"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">End Time</label>
              <input 
                type="time" 
                name="endTime" 
                required
                value="11:30"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Location / Link</label>
            <input 
              type="text" 
              name="location" 
              placeholder="e.g. Turing Hall 204 or Zoom Link" 
              class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button type="button" id="btn-cancel-plan" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-md transition-colors">
              Add to Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const close = () => {
    modalContainer.innerHTML = '';
  };

  modalContainer.querySelector('#btn-close-plan-modal').addEventListener('click', close);
  modalContainer.querySelector('#btn-cancel-plan').addEventListener('click', close);

  modalContainer.querySelector('#planner-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const eventPayload = {
      title: form.get('title').trim(),
      courseId: form.get('courseId') || null,
      dayOfWeek: parseInt(form.get('dayOfWeek')),
      startTime: form.get('startTime'),
      endTime: form.get('endTime'),
      type: form.get('type'),
      location: form.get('location').trim()
    };

    state.addPlannerEvent(eventPayload);
    close();
    renderPlanner(container);
  });
}

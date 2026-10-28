/**
 * Student Productivity Hub - Tasks & Assignments Module
 */

import { state } from '../state.js';

let currentFilterCourse = 'all';
let currentFilterPriority = 'all';
let currentSearchQuery = '';
let currentViewMode = 'kanban'; // 'kanban' or 'list'

export function renderTasks(container) {
  const data = state.data;

  // Filter tasks based on selections
  const filteredTasks = data.tasks.filter(task => {
    const matchesCourse = currentFilterCourse === 'all' || task.courseId === currentFilterCourse;
    const matchesPriority = currentFilterPriority === 'all' || task.priority === currentFilterPriority;
    const matchesSearch = !currentSearchQuery || 
      task.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      (task.notes && task.notes.toLowerCase().includes(currentSearchQuery.toLowerCase()));
    return matchesCourse && matchesPriority && matchesSearch;
  });

  const columns = [
    { id: 'todo', label: 'To Do', icon: 'circle-dot', color: 'border-slate-400 text-slate-500' },
    { id: 'in_progress', label: 'In Progress', icon: 'clock', color: 'border-indigo-500 text-indigo-500' },
    { id: 'review', label: 'Under Review', icon: 'glasses', color: 'border-amber-500 text-amber-500' },
    { id: 'completed', label: 'Completed', icon: 'check-circle-2', color: 'border-emerald-500 text-emerald-500' }
  ];

  container.innerHTML = `
    <!-- Header / Controls Bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <i data-lucide="check-square" class="w-7 h-7 text-indigo-600"></i> Assignments & Tasks
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track course problem sets, term projects, lab submissions, and daily study items.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button id="btn-toggle-view" class="px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors">
          <i data-lucide="${currentViewMode === 'kanban' ? 'list' : 'layout-grid'}" class="w-4 h-4"></i>
          <span>${currentViewMode === 'kanban' ? 'List View' : 'Kanban Board'}</span>
        </button>

        <button id="btn-new-task" class="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-1.5 transition-colors">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Add Assignment</span>
        </button>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="glass-panel rounded-xl p-4 mb-6 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-3">
      <!-- Search Input -->
      <div class="relative flex-1 min-w-[200px]">
        <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
        <input 
          id="task-search-input" 
          type="text" 
          placeholder="Search assignments or notes..." 
          value="${currentSearchQuery}"
          class="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Course Filter -->
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-slate-500">Course:</span>
        <select id="select-filter-course" class="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all" ${currentFilterCourse === 'all' ? 'selected' : ''}>All Courses</option>
          ${data.courses.map(c => `
            <option value="${c.id}" ${currentFilterCourse === c.id ? 'selected' : ''}>${c.code} - ${c.name}</option>
          `).join('')}
        </select>
      </div>

      <!-- Priority Filter -->
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-slate-500">Priority:</span>
        <select id="select-filter-priority" class="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all" ${currentFilterPriority === 'all' ? 'selected' : ''}>All Priorities</option>
          <option value="urgent" ${currentFilterPriority === 'urgent' ? 'selected' : ''}>Urgent</option>
          <option value="high" ${currentFilterPriority === 'high' ? 'selected' : ''}>High</option>
          <option value="medium" ${currentFilterPriority === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="low" ${currentFilterPriority === 'low' ? 'selected' : ''}>Low</option>
        </select>
      </div>
    </div>

    <!-- Main View: Kanban or List -->
    ${currentViewMode === 'kanban' ? renderKanban(filteredTasks, columns, data) : renderListView(filteredTasks, data)}

    <!-- Add/Edit Task Modal Container -->
    <div id="task-modal-container"></div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  attachTaskEvents(container);
}

function renderKanban(tasks, columns, data) {
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      ${columns.map(col => {
        const colTasks = tasks.filter(t => t.status === col.id);
        return `
          <div class="kanban-column flex flex-col rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 p-3 min-h-[500px]" data-column-id="${col.id}">
            <!-- Column Header -->
            <div class="flex items-center justify-between px-2 py-2 mb-2 border-b border-slate-200/60 dark:border-slate-700/60">
              <div class="flex items-center gap-2">
                <i data-lucide="${col.icon}" class="w-4 h-4 ${col.color}"></i>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">${col.label}</h3>
              </div>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                ${colTasks.length}
              </span>
            </div>

            <!-- Task Cards Container -->
            <div class="flex-1 space-y-3 py-1 drop-zone" data-column-id="${col.id}">
              ${colTasks.map(task => renderTaskCard(task, data)).join('')}
              ${colTasks.length === 0 ? `
                <div class="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 text-xs">
                  Drop tasks here
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderListView(tasks, data) {
  return `
    <div class="glass-panel rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th class="p-3 w-10">Status</th>
              <th class="p-3">Title & Notes</th>
              <th class="p-3">Course</th>
              <th class="p-3">Due Date</th>
              <th class="p-3">Priority</th>
              <th class="p-3">Est. Time</th>
              <th class="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            ${tasks.length === 0 ? `
              <tr>
                <td colspan="7" class="p-8 text-center text-slate-400">
                  No assignments found matching your filter criteria.
                </td>
              </tr>
            ` : tasks.map(task => {
              const course = data.courses.find(c => c.id === task.courseId) || { code: 'Gen', name: 'General', color: '#6366f1' };
              return `
                <tr class="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3">
                    <input type="checkbox" data-task-id="${task.id}" class="task-checkbox rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" ${task.completed ? 'checked' : ''} />
                  </td>
                  <td class="p-3">
                    <span class="font-bold text-slate-800 dark:text-slate-100 ${task.completed ? 'line-through opacity-60' : ''}">${task.title}</span>
                    ${task.notes ? `<p class="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">${task.notes}</p>` : ''}
                  </td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded text-white font-bold text-[10px]" style="background-color: ${course.color}">${course.code}</span>
                  </td>
                  <td class="p-3 text-slate-600 dark:text-slate-300 font-medium">
                    ${task.dueDate || 'No due date'}
                  </td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded-full font-bold text-[10px] badge-${task.priority}">
                      ${task.priority.toUpperCase()}
                    </span>
                  </td>
                  <td class="p-3 text-slate-500">
                    ${task.estimatedHours ? `${task.estimatedHours} hrs` : '-'}
                  </td>
                  <td class="p-3 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button data-task-id="${task.id}" class="btn-edit-task p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                        <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                      </button>
                      <button data-task-id="${task.id}" class="btn-delete-task p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTaskCard(task, data) {
  const course = data.courses.find(c => c.id === task.courseId) || { code: 'Gen', name: 'General', color: '#6366f1' };

  return `
    <div 
      draggable="true" 
      data-task-id="${task.id}"
      class="task-card p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/70 shadow-sm hover:shadow-md transition-card cursor-grab active:cursor-grabbing group relative"
    >
      <div class="flex items-start justify-between gap-2">
        <span class="px-2 py-0.5 rounded text-white text-[10px] font-bold tracking-wider" style="background-color: ${course.color}">
          ${course.code}
        </span>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full badge-${task.priority}">
          ${task.priority.toUpperCase()}
        </span>
      </div>

      <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mt-2 ${task.completed ? 'line-through opacity-60' : ''}">
        ${task.title}
      </h4>

      ${task.notes ? `
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${task.notes}</p>
      ` : ''}

      <div class="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60">
        <div class="flex items-center gap-1">
          <i data-lucide="calendar" class="w-3 h-3"></i>
          <span>${task.dueDate ? task.dueDate.split('-').slice(1).join('/') : 'Open'}</span>
        </div>
        ${task.estimatedHours ? `
          <div class="flex items-center gap-1 text-[11px]">
            <i data-lucide="clock" class="w-3 h-3"></i>
            <span>${task.estimatedHours}h</span>
          </div>
        ` : ''}
      </div>

      <!-- Action Hover Overlay -->
      <div class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-1 rounded-lg border border-slate-200 dark:border-slate-700">
        <button data-task-id="${task.id}" class="btn-edit-task p-1 text-slate-400 hover:text-indigo-600 rounded">
          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
        </button>
        <button data-task-id="${task.id}" class="btn-delete-task p-1 text-slate-400 hover:text-red-500 rounded">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `;
}

function attachTaskEvents(container) {
  // Toggle View
  container.querySelector('#btn-toggle-view')?.addEventListener('click', () => {
    currentViewMode = currentViewMode === 'kanban' ? 'list' : 'kanban';
    renderTasks(container);
  });

  // Search input
  const searchInput = container.querySelector('#task-search-input');
  searchInput?.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    renderTasks(container);
  });

  // Filters
  container.querySelector('#select-filter-course')?.addEventListener('change', (e) => {
    currentFilterCourse = e.target.value;
    renderTasks(container);
  });

  container.querySelector('#select-filter-priority')?.addEventListener('change', (e) => {
    currentFilterPriority = e.target.value;
    renderTasks(container);
  });

  // Add Task Button
  container.querySelector('#btn-new-task')?.addEventListener('click', () => {
    openTaskModal(container);
  });

  // Edit Task Button
  container.querySelectorAll('.btn-edit-task').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const taskId = btn.dataset.taskId;
      const task = state.data.tasks.find(t => t.id === taskId);
      if (task) openTaskModal(container, task);
    });
  });

  // Delete Task Button
  container.querySelectorAll('.btn-delete-task').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const taskId = btn.dataset.taskId;
      if (confirm('Are you sure you want to delete this assignment?')) {
        state.deleteTask(taskId);
        renderTasks(container);
      }
    });
  });

  // Task checkboxes in list view
  container.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const taskId = cb.dataset.taskId;
      const completed = state.toggleTaskCompletion(taskId);
      if (completed && window.confetti) {
        window.confetti({ particleCount: 50, spread: 60 });
      }
      renderTasks(container);
    });
  });

  // Drag and Drop (Kanban)
  const cards = container.querySelectorAll('.task-card');
  const dropZones = container.querySelectorAll('.drop-zone');

  cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', card.dataset.taskId);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.parentElement.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
      zone.parentElement.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.parentElement.classList.remove('drag-over');
      const taskId = e.dataTransfer.getData('text/plain');
      const targetColumn = zone.dataset.columnId;

      if (taskId && targetColumn) {
        state.updateTask(taskId, { status: targetColumn });
        if (targetColumn === 'completed' && window.confetti) {
          window.confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        }
        renderTasks(container);
      }
    });
  });
}

function openTaskModal(container, existingTask = null) {
  const modalContainer = container.querySelector('#task-modal-container');
  const isEdit = !!existingTask;
  const courses = state.data.courses;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div class="glass-panel bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
            ${isEdit ? 'Edit Assignment' : 'Add New Assignment'}
          </h3>
          <button id="btn-close-modal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form id="task-form" class="mt-4 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Title *</label>
            <input 
              type="text" 
              name="title" 
              required
              placeholder="e.g. Solve Problem Set 3 or Write Research Draft" 
              value="${existingTask?.title || ''}"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course *</label>
              <select name="courseId" required class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                ${courses.map(c => `
                  <option value="${c.id}" ${existingTask?.courseId === c.id ? 'selected' : ''}>
                    ${c.code} - ${c.name}
                  </option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Due Date *</label>
              <input 
                type="date" 
                name="dueDate" 
                required
                value="${existingTask?.dueDate || new Date().toISOString().split('T')[0]}"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select name="priority" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="urgent" ${existingTask?.priority === 'urgent' ? 'selected' : ''}>Urgent (Due ASAP)</option>
                <option value="high" ${existingTask?.priority === 'high' ? 'selected' : ''}>High</option>
                <option value="medium" ${!existingTask || existingTask?.priority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="low" ${existingTask?.priority === 'low' ? 'selected' : ''}>Low</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Estimated Hours</label>
              <input 
                type="number" 
                name="estimatedHours" 
                step="0.5" 
                min="0.5" 
                max="50"
                placeholder="e.g. 3.5"
                value="${existingTask?.estimatedHours || '2'}"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Detailed Notes / Requirements</label>
            <textarea 
              name="notes" 
              rows="3" 
              placeholder="Rubric notes, problem numbers, submission links..."
              class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >${existingTask?.notes || ''}</textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button type="button" id="btn-cancel-modal" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-md transition-colors">
              ${isEdit ? 'Save Changes' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const closeModal = () => {
    modalContainer.innerHTML = '';
  };

  modalContainer.querySelector('#btn-close-modal').addEventListener('click', closeModal);
  modalContainer.querySelector('#btn-cancel-modal').addEventListener('click', closeModal);

  modalContainer.querySelector('#task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskData = {
      title: formData.get('title').trim(),
      courseId: formData.get('courseId'),
      dueDate: formData.get('dueDate'),
      priority: formData.get('priority'),
      estimatedHours: parseFloat(formData.get('estimatedHours')) || 1,
      notes: formData.get('notes').trim()
    };

    if (isEdit) {
      state.updateTask(existingTask.id, taskData);
    } else {
      state.addTask(taskData);
    }

    closeModal();
    renderTasks(container);
  });
}

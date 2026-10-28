/**
 * Student Productivity Hub - Course Hub & GPA Calculator Module
 */

import { state } from '../state.js';

export function getGradePoint(percentage) {
  if (percentage >= 93) return { point: 4.0, letter: 'A' };
  if (percentage >= 90) return { point: 3.7, letter: 'A-' };
  if (percentage >= 87) return { point: 3.3, letter: 'B+' };
  if (percentage >= 83) return { point: 3.0, letter: 'B' };
  if (percentage >= 80) return { point: 2.7, letter: 'B-' };
  if (percentage >= 77) return { point: 2.3, letter: 'C+' };
  if (percentage >= 73) return { point: 2.0, letter: 'C' };
  if (percentage >= 70) return { point: 1.7, letter: 'C-' };
  if (percentage >= 65) return { point: 1.0, letter: 'D' };
  return { point: 0.0, letter: 'F' };
}

export function renderCourses(container) {
  const data = state.data;
  const courses = data.courses;

  // Calculate Weighted GPA
  let totalCredits = 0;
  let totalPoints = 0;

  courses.forEach(c => {
    const { point } = getGradePoint(c.currentGrade);
    const credits = parseFloat(c.credits) || 3;
    totalCredits += credits;
    totalPoints += point * credits;
  });

  const currentGpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '4.00';
  const targetGpa = (data.profile.targetGpa || 3.8).toFixed(2);
  const gpaDiff = (currentGpa - targetGpa).toFixed(2);

  container.innerHTML = `
    <div class="space-y-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <i data-lucide="graduation-cap" class="w-7 h-7 text-indigo-600"></i> Course Management & GPA Tracker
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track syllabi, instructor info, credit weightings, and real-time semester GPA projections.
          </p>
        </div>

        <button id="btn-add-course" class="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-1.5 transition-colors self-start md:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i> Add Course
        </button>
      </div>

      <!-- GPA Summary Card -->
      <div class="glass-panel rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <!-- Current GPA Metric -->
          <div class="border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-4 md:pb-0 md:pr-6">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Semester Projected GPA</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-4xl font-black text-indigo-600 dark:text-indigo-400">${currentGpa}</span>
              <span class="text-sm text-slate-400">/ 4.00</span>
            </div>
            <p class="text-xs mt-1 ${parseFloat(gpaDiff) >= 0 ? 'text-emerald-500 font-semibold' : 'text-amber-500 font-semibold'}">
              ${parseFloat(gpaDiff) >= 0 ? `▲ +${gpaDiff} above target` : `▼ ${gpaDiff} from target`}
            </p>
          </div>

          <!-- Target GPA Metric -->
          <div class="border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-4 md:pb-0 md:pr-6">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Academic GPA</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl font-black text-slate-800 dark:text-slate-200">${targetGpa}</span>
              <span class="text-sm text-slate-400">/ 4.00</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">${data.profile.major}</p>
          </div>

          <!-- Total Credits -->
          <div class="border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-4 md:pb-0 md:pr-6">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Credits</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl font-black text-slate-800 dark:text-slate-200">${totalCredits}</span>
              <span class="text-sm text-slate-400">credit hours</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">${courses.length} Active Courses</p>
          </div>

          <!-- Quick Tip -->
          <div class="bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
            <div class="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <i data-lucide="sparkles" class="w-4 h-4"></i> Dean's Honor Roll
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Maintaining ≥ 3.50 qualifies for honors distinction this semester.
            </p>
          </div>
        </div>
      </div>

      <!-- Courses Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${courses.map(course => {
          const { point, letter } = getGradePoint(course.currentGrade);
          const courseTasks = data.tasks.filter(t => t.courseId === course.id);
          const pendingTasks = courseTasks.filter(t => !t.completed).length;

          return `
            <div class="glass-panel rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 transition-card relative flex flex-col justify-between">
              <!-- Top bar color indicator -->
              <div class="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style="background-color: ${course.color}"></div>

              <div>
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <span class="text-xs font-black uppercase px-2 py-0.5 rounded text-white" style="background-color: ${course.color}">
                      ${course.code}
                    </span>
                    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mt-2">${course.name}</h3>
                  </div>

                  <div class="text-right">
                    <span class="text-2xl font-black text-slate-800 dark:text-slate-100">${course.currentGrade}%</span>
                    <div class="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      ${letter} (${point.toFixed(1)} pts)
                    </div>
                  </div>
                </div>

                <!-- Course details -->
                <div class="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div class="flex items-center gap-2">
                    <i data-lucide="user" class="w-4 h-4 text-slate-400"></i>
                    <span>${course.instructor || 'Instructor unassigned'}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i data-lucide="map-pin" class="w-4 h-4 text-slate-400"></i>
                    <span>${course.room || 'TBA'}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i data-lucide="award" class="w-4 h-4 text-slate-400"></i>
                    <span>${course.credits} Credits • Target: ${course.targetGrade || 'A'}</span>
                  </div>
                </div>
              </div>

              <!-- Footer Actions -->
              <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span class="text-xs text-slate-500 font-medium">
                  ${pendingTasks} pending assignment${pendingTasks === 1 ? '' : 's'}
                </span>

                <div class="flex items-center gap-1.5">
                  <button data-course-id="${course.id}" class="btn-edit-course p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                    <i data-lucide="edit-3" class="w-4 h-4"></i>
                  </button>
                  <button data-course-id="${course.id}" class="btn-delete-course p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Course Modal Container -->
    <div id="course-modal-container"></div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  attachCourseEvents(container);
}

function attachCourseEvents(container) {
  // Add course
  container.querySelector('#btn-add-course')?.addEventListener('click', () => {
    openCourseModal(container);
  });

  // Edit course
  container.querySelectorAll('.btn-edit-course').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseId = btn.dataset.courseId;
      const course = state.data.courses.find(c => c.id === courseId);
      if (course) openCourseModal(container, course);
    });
  });

  // Delete course
  container.querySelectorAll('.btn-delete-course').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseId = btn.dataset.courseId;
      if (confirm('Delete this course? Associated tasks and notes will also be removed.')) {
        state.deleteCourse(courseId);
        renderCourses(container);
      }
    });
  });
}

function openCourseModal(container, existingCourse = null) {
  const modalContainer = container.querySelector('#course-modal-container');
  const isEdit = !!existingCourse;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div class="glass-panel bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
            ${isEdit ? 'Edit Course' : 'Add New Course'}
          </h3>
          <button id="btn-close-course-modal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form id="course-form" class="mt-4 space-y-4 text-xs">
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Code *</label>
              <input 
                type="text" 
                name="code" 
                required
                placeholder="e.g. CS 301" 
                value="${existingCourse?.code || ''}"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="col-span-2">
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course Name *</label>
              <input 
                type="text" 
                name="name" 
                required
                placeholder="e.g. Data Structures & Algorithms" 
                value="${existingCourse?.name || ''}"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Instructor</label>
              <input 
                type="text" 
                name="instructor" 
                placeholder="e.g. Dr. Turing" 
                value="${existingCourse?.instructor || ''}"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Location / Room</label>
              <input 
                type="text" 
                name="room" 
                placeholder="e.g. Room 204 or Zoom link" 
                value="${existingCourse?.room || ''}"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Credits</label>
              <input 
                type="number" 
                name="credits" 
                min="1" 
                max="10" 
                value="${existingCourse?.credits || 3}"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Current Grade %</label>
              <input 
                type="number" 
                name="currentGrade" 
                min="0" 
                max="100" 
                value="${existingCourse?.currentGrade || 90}"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Theme Color</label>
              <input 
                type="color" 
                name="color" 
                value="${existingCourse?.color || '#6366f1'}"
                class="w-full h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer"
              />
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button type="button" id="btn-cancel-course" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-md transition-colors">
              ${isEdit ? 'Save Changes' : 'Add Course'}
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

  modalContainer.querySelector('#btn-close-course-modal').addEventListener('click', close);
  modalContainer.querySelector('#btn-cancel-course').addEventListener('click', close);

  modalContainer.querySelector('#course-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const coursePayload = {
      code: form.get('code').trim(),
      name: form.get('name').trim(),
      instructor: form.get('instructor').trim(),
      room: form.get('room').trim(),
      credits: parseInt(form.get('credits')) || 3,
      currentGrade: parseInt(form.get('currentGrade')) || 90,
      color: form.get('color')
    };

    if (isEdit) {
      state.updateCourse(existingCourse.id, coursePayload);
    } else {
      state.addCourse(coursePayload);
    }

    close();
    renderCourses(container);
  });
}

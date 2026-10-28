/**
 * Student Productivity Hub - Main Application Controller
 */

import { state } from './state.js';
import { renderDashboard } from './modules/dashboard.js';
import { renderTasks } from './modules/tasks.js';
import { renderPomodoro } from './modules/pomodoro.js';
import { renderCourses } from './modules/courses.js';
import { renderPlanner } from './modules/planner.js';
import { renderFlashcards } from './modules/flashcards.js';
import { renderNotes } from './modules/notes.js';

let currentTab = 'dashboard';
let currentTabOptions = {};

const TAB_MODULES = {
  dashboard: renderDashboard,
  tasks: renderTasks,
  pomodoro: renderPomodoro,
  courses: renderCourses,
  planner: renderPlanner,
  flashcards: renderFlashcards,
  notes: renderNotes
};

export function initApp() {
  initTheme();
  setupNavigation();
  setupSettingsAndBackup();
  renderCurrentTab();

  // Expose global navigation for deep linking across widgets
  window.navigateToTab = (tabId, options = {}) => {
    if (TAB_MODULES[tabId]) {
      currentTab = tabId;
      currentTabOptions = options;
      updateActiveNavPill(tabId);
      renderCurrentTab();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
}

function renderCurrentTab() {
  const container = document.getElementById('main-content-area');
  if (!container) return;

  const renderFn = TAB_MODULES[currentTab] || renderDashboard;
  renderFn(container, currentTabOptions);
  currentTabOptions = {}; // Reset options after render
}

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-link');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = item.dataset.tab;
      if (tab) {
        window.navigateToTab(tab);
      }
    });
  });
}

function updateActiveNavPill(tabId) {
  const navItems = document.querySelectorAll('.nav-link');
  navItems.forEach(item => {
    const isCurrent = item.dataset.tab === tabId;
    if (isCurrent) {
      item.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');
      item.classList.remove('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
    } else {
      item.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm');
      item.classList.add('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
    }
  });

  // Mobile drawer close if open
  const mobileSidebar = document.getElementById('mobile-sidebar');
  if (mobileSidebar && !mobileSidebar.classList.contains('hidden')) {
    mobileSidebar.classList.add('hidden');
  }
}

function initTheme() {
  const isDark = localStorage.getItem('hub_dark_mode') === 'true' ||
    (!localStorage.getItem('hub_dark_mode') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const toggleTheme = () => {
    const currentlyDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('hub_dark_mode', currentlyDark);
  };

  document.getElementById('btn-toggle-theme')?.addEventListener('click', toggleTheme);
  document.getElementById('btn-toggle-theme-mobile')?.addEventListener('click', toggleTheme);
}

function setupSettingsAndBackup() {
  // Export JSON backup
  document.getElementById('btn-export-data')?.addEventListener('click', () => {
    state.exportToJson();
  });

  // Import JSON backup
  const importInput = document.getElementById('file-import-data');
  document.getElementById('btn-import-data')?.addEventListener('click', () => {
    importInput?.click();
  });

  importInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = state.importFromJson(event.target.result);
        if (success) {
          alert('✅ Data restored successfully!');
          renderCurrentTab();
        } else {
          alert('❌ Failed to restore data. Please check the JSON format.');
        }
      };
      reader.readAsText(file);
    }
  });

  // Reset demo data
  document.getElementById('btn-reset-data')?.addEventListener('click', () => {
    if (confirm('Reset all courses, tasks, and notes to the default template data?')) {
      state.resetToDefault();
      renderCurrentTab();
      alert('Default student sample data loaded.');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('btn-mobile-menu');
  const mobileSidebar = document.getElementById('mobile-sidebar');
  mobileToggle?.addEventListener('click', () => {
    mobileSidebar?.classList.toggle('hidden');
  });
}

// Kick off when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

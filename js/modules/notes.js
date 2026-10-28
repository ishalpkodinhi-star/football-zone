/**
 * Student Productivity Hub - Study Notes & Markdown Scratchpad Module
 */

import { state } from '../state.js';

let activeNoteId = null;
let isPreviewMode = false;
let notesSearchQuery = '';

export function renderNotes(container) {
  const data = state.data;
  const notes = data.notes;

  // Filter notes
  const filteredNotes = notes.filter(n => {
    if (!notesSearchQuery) return true;
    return n.title.toLowerCase().includes(notesSearchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(notesSearchQuery.toLowerCase());
  });

  if (!activeNoteId && filteredNotes.length > 0) {
    activeNoteId = filteredNotes[0].id;
  }

  const activeNote = notes.find(n => n.id === activeNoteId) || filteredNotes[0] || null;

  container.innerHTML = `
    <div class="h-[calc(100vh-140px)] flex flex-col">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 class="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <i data-lucide="file-text" class="w-7 h-7 text-indigo-600"></i> Course Notebook & Scratchpad
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Quick formula sheets, lecture summaries, and markdown-enabled study notes.
          </p>
        </div>

        <button id="btn-create-note" class="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-1.5 transition-colors self-start sm:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i> New Note
        </button>
      </div>

      <!-- Main Notebook Workspace (Split View) -->
      <div class="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden">
        <!-- Sidebar: Notes List (4 cols) -->
        <div class="md:col-span-4 flex flex-col glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <!-- Search Bar -->
          <div class="p-3 border-b border-slate-200 dark:border-slate-800">
            <div class="relative">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input 
                id="notes-search-input"
                type="text" 
                placeholder="Search notes..." 
                value="${notesSearchQuery}"
                class="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <!-- Notes List Items -->
          <div class="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
            ${filteredNotes.length === 0 ? `
              <div class="p-6 text-center text-xs text-slate-400">
                No notes found. Click "New Note" to create one.
              </div>
            ` : filteredNotes.map(note => {
              const course = data.courses.find(c => c.id === note.courseId);
              const isActive = note.id === activeNote?.id;

              return `
                <div data-note-id="${note.id}" class="note-list-item p-3.5 cursor-pointer transition-colors ${isActive ? 'bg-indigo-50/80 dark:bg-slate-800/90 border-l-4 border-indigo-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'}">
                  <div class="flex items-center justify-between gap-1 mb-1">
                    <span class="text-[10px] font-black uppercase px-1.5 py-0.5 rounded text-white" style="background-color: ${course?.color || '#6366f1'}">
                      ${course ? course.code : 'General'}
                    </span>
                    <span class="text-[10px] text-slate-400">
                      ${new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">${note.title}</h4>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    ${note.content.replace(/[#*`-]/g, '')}
                  </p>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Main Editor / Preview Panel (8 cols) -->
        <div class="md:col-span-8 flex flex-col glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          ${activeNote ? `
            <!-- Editor Header -->
            <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-white/40 dark:bg-slate-800/40">
              <input 
                id="note-title-input" 
                type="text" 
                value="${activeNote.title}"
                class="font-black text-base text-slate-800 dark:text-slate-100 bg-transparent border-none focus:outline-none flex-1 min-w-[200px]"
                placeholder="Untitled Note"
              />

              <div class="flex items-center gap-2">
                <!-- Course selector -->
                <select id="note-course-select" class="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-1.5 focus:outline-none">
                  <option value="">No Course</option>
                  ${data.courses.map(c => `
                    <option value="${c.id}" ${activeNote.courseId === c.id ? 'selected' : ''}>
                      ${c.code}
                    </option>
                  `).join('')}
                </select>

                <!-- Edit vs Preview toggle -->
                <div class="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-0.5 text-xs font-bold">
                  <button id="btn-mode-edit" class="px-2.5 py-1 rounded-md ${!isPreviewMode ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500'}">
                    Edit
                  </button>
                  <button id="btn-mode-preview" class="px-2.5 py-1 rounded-md ${isPreviewMode ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500'}">
                    Preview
                  </button>
                </div>

                <!-- Download Markdown -->
                <button id="btn-download-note" class="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded" title="Download .md file">
                  <i data-lucide="download" class="w-4 h-4"></i>
                </button>

                <!-- Delete Note -->
                <button id="btn-delete-active-note" class="p-1.5 text-slate-400 hover:text-red-500 rounded" title="Delete Note">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <!-- Content Area: Textarea or Formatted Preview -->
            <div class="flex-1 p-4 overflow-y-auto bg-white/20 dark:bg-slate-900/40">
              ${isPreviewMode ? `
                <div class="prose dark:prose-invert max-w-none text-xs leading-relaxed">
                  ${renderMarkdown(activeNote.content)}
                </div>
              ` : `
                <textarea 
                  id="note-content-input"
                  class="w-full h-full p-2 bg-transparent text-xs text-slate-800 dark:text-slate-200 font-mono resize-none focus:outline-none"
                  placeholder="Type notes here in Markdown... (# Heading, - Bullet, **Bold**)"
                >${activeNote.content}</textarea>
              `}
            </div>
          ` : `
            <div class="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select or create a note to start writing.
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  attachNotesEvents(container, activeNote);
}

// Lightweight Markdown renderer without external library dependencies
function renderMarkdown(md) {
  if (!md) return '<p class="text-slate-400 italic">Empty note</p>';

  let html = md
    .replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold mt-3 mb-1 text-slate-800 dark:text-slate-100">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-base font-bold mt-4 mb-2 text-slate-800 dark:text-slate-100">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-lg font-extrabold mt-5 mb-2 text-slate-800 dark:text-slate-100">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-indigo-600 dark:text-indigo-400">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
    .replace(/`([^`]+)`/gim, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 font-mono text-[11px]">$1</code>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300 my-0.5">$1</li>')
    .replace(/\n$/gim, '<br />');

  return html.split('\n\n').map(p => {
    if (p.startsWith('<h') || p.startsWith('<li')) return p;
    return `<p class="my-1.5 text-slate-700 dark:text-slate-300">${p}</p>`;
  }).join('');
}

function attachNotesEvents(container, activeNote) {
  // Search
  container.querySelector('#notes-search-input')?.addEventListener('input', (e) => {
    notesSearchQuery = e.target.value;
    renderNotes(container);
  });

  // Switch Active Note
  container.querySelectorAll('.note-list-item').forEach(item => {
    item.addEventListener('click', () => {
      activeNoteId = item.dataset.noteId;
      renderNotes(container);
    });
  });

  // Create Note
  container.querySelector('#btn-create-note')?.addEventListener('click', () => {
    const newNote = state.addNote({
      title: 'New Study Note',
      courseId: state.data.courses[0]?.id || null,
      content: '# Note Topic\n\n- Key concept 1\n- Key concept 2'
    });
    activeNoteId = newNote.id;
    isPreviewMode = false;
    renderNotes(container);
  });

  if (!activeNote) return;

  // Title edit with autosave
  const titleInput = container.querySelector('#note-title-input');
  titleInput?.addEventListener('input', (e) => {
    state.updateNote(activeNote.id, { title: e.target.value });
  });

  // Course edit
  const courseSelect = container.querySelector('#note-course-select');
  courseSelect?.addEventListener('change', (e) => {
    state.updateNote(activeNote.id, { courseId: e.target.value || null });
    renderNotes(container);
  });

  // Content edit with autosave
  const contentInput = container.querySelector('#note-content-input');
  contentInput?.addEventListener('input', (e) => {
    state.updateNote(activeNote.id, { content: e.target.value });
  });

  // Edit / Preview toggle
  container.querySelector('#btn-mode-edit')?.addEventListener('click', () => {
    isPreviewMode = false;
    renderNotes(container);
  });

  container.querySelector('#btn-mode-preview')?.addEventListener('click', () => {
    isPreviewMode = true;
    renderNotes(container);
  });

  // Delete note
  container.querySelector('#btn-delete-active-note')?.addEventListener('click', () => {
    if (confirm('Delete this note?')) {
      state.deleteNote(activeNote.id);
      activeNoteId = null;
      renderNotes(container);
    }
  });

  // Download note
  container.querySelector('#btn-download-note')?.addEventListener('click', () => {
    const blob = new Blob([activeNote.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeNote.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

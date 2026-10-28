/**
 * Student Productivity Hub - Flashcards & Active Recall Module
 */

import { state } from '../state.js';

let activeReviewDeckId = null;
let currentCardIndex = 0;
let isFlipped = false;

export function renderFlashcards(container, options = {}) {
  if (options.deckId) {
    activeReviewDeckId = options.deckId;
    currentCardIndex = 0;
    isFlipped = false;
  }

  if (activeReviewDeckId) {
    renderStudySession(container);
  } else {
    renderDecksList(container);
  }
}

function renderDecksList(container) {
  const data = state.data;
  const decks = data.flashcardDecks;

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <i data-lucide="layers" class="w-7 h-7 text-indigo-600"></i> Flashcards & Active Recall
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build permanent memory retention with 3D interactive flashcards and spaced repetition.
          </p>
        </div>

        <button id="btn-create-deck" class="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center gap-1.5 transition-colors self-start md:self-auto">
          <i data-lucide="plus" class="w-4 h-4"></i> Create New Deck
        </button>
      </div>

      <!-- Decks Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${decks.map(deck => {
          const course = data.courses.find(c => c.id === deck.courseId) || { code: 'Gen', name: 'General', color: '#6366f1' };

          return `
            <div class="glass-panel rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 transition-card flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded text-white" style="background-color: ${course.color}">
                    ${course.code}
                  </span>
                  <span class="text-xs font-bold text-slate-400">
                    ${deck.cards.length} cards
                  </span>
                </div>

                <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 mt-3">${deck.title}</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${deck.description || 'Practice active recall terms and concepts.'}</p>
              </div>

              <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button data-deck-id="${deck.id}" class="btn-add-card text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 flex items-center gap-1">
                  <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Add Card
                </button>

                <div class="flex items-center gap-2">
                  <button data-deck-id="${deck.id}" class="btn-delete-deck text-slate-400 hover:text-red-500 p-1.5">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                  </button>
                  <button data-deck-id="${deck.id}" class="btn-start-study px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-colors" ${deck.cards.length === 0 ? 'disabled opacity-50' : ''}>
                    <i data-lucide="play" class="w-3 h-3 fill-current"></i> Study Now
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Modals Container -->
    <div id="deck-modal-container"></div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  attachDeckListEvents(container);
}

function renderStudySession(container) {
  const deck = state.data.flashcardDecks.find(d => d.id === activeReviewDeckId);

  if (!deck || deck.cards.length === 0) {
    activeReviewDeckId = null;
    renderDecksList(container);
    return;
  }

  const currentCard = deck.cards[currentCardIndex];
  const progressPercent = Math.round(((currentCardIndex) / deck.cards.length) * 100);

  container.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Session Header -->
      <div class="flex items-center justify-between">
        <button id="btn-exit-study" class="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Decks
        </button>

        <span class="text-xs font-bold text-slate-500">
          Card ${currentCardIndex + 1} of ${deck.cards.length}
        </span>
      </div>

      <!-- Progress bar -->
      <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <div class="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
      </div>

      <!-- 3D Flashcard Container -->
      <div class="perspective-1000 min-h-[320px] cursor-pointer" id="flashcard-3d">
        <div id="card-inner" class="relative w-full min-h-[320px] transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}">
          <!-- FRONT FACE -->
          <div class="absolute inset-0 backface-hidden glass-panel rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xl bg-white dark:bg-slate-800">
            <div>
              <span class="text-[10px] uppercase font-black text-indigo-500 tracking-wider">Question / Prompt</span>
              <div class="mt-8 text-xl font-bold text-slate-800 dark:text-slate-100 text-center leading-relaxed">
                ${currentCard.front}
              </div>
            </div>

            <div class="text-center text-xs font-semibold text-slate-400 flex items-center justify-center gap-1">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i> Click anywhere to flip & reveal answer
            </div>
          </div>

          <!-- BACK FACE -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 glass-panel rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xl bg-indigo-50/90 dark:bg-slate-900">
            <div>
              <span class="text-[10px] uppercase font-black text-emerald-500 tracking-wider">Answer & Explanation</span>
              <div class="mt-8 text-lg font-semibold text-slate-800 dark:text-slate-100 text-center leading-relaxed">
                ${currentCard.back}
              </div>
            </div>

            <div class="text-center text-xs font-semibold text-slate-400 flex items-center justify-center gap-1">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i> Click card to flip back
            </div>
          </div>
        </div>
      </div>

      <!-- Rating / Self-Evaluation Controls -->
      <div class="pt-4">
        <p class="text-xs font-bold text-slate-500 dark:text-slate-400 text-center mb-3">
          ${isFlipped ? 'How well did you recall this?' : 'Flip the card first to grade your recall'}
        </p>

        <div class="grid grid-cols-4 gap-3 ${!isFlipped ? 'opacity-40 pointer-events-none' : ''}">
          <button data-rating="1" class="btn-grade py-3 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 transition-colors">
            Again (1)
          </button>
          <button data-rating="2" class="btn-grade py-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-100 transition-colors">
            Hard (2)
          </button>
          <button data-rating="3" class="btn-grade py-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 transition-colors">
            Good (3)
          </button>
          <button data-rating="4" class="btn-grade py-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-100 transition-colors">
            Easy (4)
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Card flip click
  container.querySelector('#flashcard-3d')?.addEventListener('click', () => {
    isFlipped = !isFlipped;
    renderStudySession(container);
  });

  // Exit study
  container.querySelector('#btn-exit-study')?.addEventListener('click', () => {
    activeReviewDeckId = null;
    renderDecksList(container);
  });

  // Grade clicks
  container.querySelectorAll('.btn-grade').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rating = parseInt(btn.dataset.rating);
      state.updateCard(activeReviewDeckId, currentCard.id, { repetitionLevel: rating });

      if (currentCardIndex + 1 < deck.cards.length) {
        currentCardIndex++;
        isFlipped = false;
        renderStudySession(container);
      } else {
        // Finished deck!
        if (window.confetti) {
          window.confetti({ particleCount: 80, spread: 70 });
        }
        alert('🎉 Awesome work! You finished reviewing this entire deck.');
        activeReviewDeckId = null;
        renderDecksList(container);
      }
    });
  });
}

function attachDeckListEvents(container) {
  // Start study
  container.querySelectorAll('.btn-start-study').forEach(btn => {
    btn.addEventListener('click', () => {
      activeReviewDeckId = btn.dataset.deckId;
      currentCardIndex = 0;
      isFlipped = false;
      renderStudySession(container);
    });
  });

  // Create Deck
  container.querySelector('#btn-create-deck')?.addEventListener('click', () => {
    openDeckModal(container);
  });

  // Add Card to Deck
  container.querySelectorAll('.btn-add-card').forEach(btn => {
    btn.addEventListener('click', () => {
      openAddCardModal(container, btn.dataset.deckId);
    });
  });

  // Delete Deck
  container.querySelectorAll('.btn-delete-deck').forEach(btn => {
    btn.addEventListener('click', () => {
      const deckId = btn.dataset.deckId;
      if (confirm('Delete this flashcard deck and its cards?')) {
        state.deleteDeck(deckId);
        renderDecksList(container);
      }
    });
  });
}

function openDeckModal(container) {
  const modalContainer = container.querySelector('#deck-modal-container');
  const courses = state.data.courses;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div class="glass-panel bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">Create Flashcard Deck</h3>
          <button id="btn-close-deck-modal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form id="deck-form" class="mt-4 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Deck Title *</label>
            <input 
              type="text" 
              name="title" 
              required
              placeholder="e.g. Operating Systems Kernel Terms" 
              class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course</label>
            <select name="courseId" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              ${courses.map(c => `
                <option value="${c.id}">${c.code} - ${c.name}</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description / Topic</label>
            <textarea 
              name="description" 
              rows="2" 
              placeholder="Summary of terms or concepts covered in this deck..." 
              class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button type="button" id="btn-cancel-deck" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-md transition-colors">
              Create Deck
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

  modalContainer.querySelector('#btn-close-deck-modal').addEventListener('click', close);
  modalContainer.querySelector('#btn-cancel-deck').addEventListener('click', close);

  modalContainer.querySelector('#deck-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    state.addFlashcardDeck({
      title: form.get('title').trim(),
      courseId: form.get('courseId'),
      description: form.get('description').trim()
    });
    close();
    renderDecksList(container);
  });
}

function openAddCardModal(container, deckId) {
  const modalContainer = container.querySelector('#deck-modal-container');

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div class="glass-panel bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">Add New Flashcard</h3>
          <button id="btn-close-card-modal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form id="card-form" class="mt-4 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Front (Prompt / Question) *</label>
            <textarea 
              name="front" 
              required
              rows="3" 
              placeholder="e.g. What is the definition of Semaphore in OS concurrency?" 
              class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Back (Answer / Details) *</label>
            <textarea 
              name="back" 
              required
              rows="3" 
              placeholder="e.g. A synchronization variable that controls access to common resources via wait() and signal()..." 
              class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button type="button" id="btn-cancel-card" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-md transition-colors">
              Add Card
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

  modalContainer.querySelector('#btn-close-card-modal').addEventListener('click', close);
  modalContainer.querySelector('#btn-cancel-card').addEventListener('click', close);

  modalContainer.querySelector('#card-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    state.addCardToDeck(deckId, {
      front: form.get('front').trim(),
      back: form.get('back').trim()
    });
    close();
    renderDecksList(container);
  });
}

/**
 * Student Productivity Hub - Centralized Reactive State & Storage Manager
 */

const STORAGE_KEY = 'student_productivity_hub_data_v1';

const DEFAULT_DATA = {
  profile: {
    name: 'Ishal',
    major: 'B.Tech Computer Science & Engineering',
    university: 'University of Calicut (CUIET)',
    semester: 'Semester 3 (2024 Scheme)',
    targetGpa: 8.75,
    streak: 8
  },
  courses: [
    { id: 'cs24_301', code: 'CS24 301', name: 'Engineering Mathematics III', short: 'M3', instructor: 'Mubeena K (MBK)', room: 'Lecture Hall 1', credits: 4, currentGrade: 91, color: '#4f46e5' },
    { id: 'cs24_302', code: 'CS24 302', name: 'Data Structures and Algorithms', short: 'DSA', instructor: 'Arya A Surya (ARA)', room: 'CS Hall A', credits: 4, currentGrade: 94, color: '#0891b2' },
    { id: 'cs24_303', code: 'CS24 303', name: 'Software Engineering', short: 'SE', instructor: 'Fathima Murshida K (FMK)', room: 'CS Hall B', credits: 4, currentGrade: 89, color: '#059669' },
    { id: 'cs24_304', code: 'CS24 304', name: 'Computer Organization & Architecture', short: 'COA', instructor: 'Jessy K (JSK)', room: 'CS Hall A', credits: 3, currentGrade: 86, color: '#d97706' },
    { id: 'cs24_305', code: 'CS24 305', name: 'Switching Theory & Logic Design', short: 'STLD', instructor: 'Aswani N M (ANM)', room: 'Digital Hall 2', credits: 4, currentGrade: 90, color: '#e11d48' },
    { id: 'cs24_306', code: 'CS24 306', name: 'Life Skills & Professional Ethics', short: 'LS', instructor: 'Mubeena K (MBK)', room: 'Seminar Hall', credits: 0, currentGrade: 92, color: '#64748b' },
    { id: 'cs24_307p', code: 'CS24 307(P)', name: 'Data Structures Lab', short: 'DS Lab', instructor: 'Arya A Surya (ARA) / Aswani N M (ANM)', room: 'Computing Lab 2', credits: 1, currentGrade: 95, color: '#7c3aed' },
    { id: 'cs24_308p', code: 'CS24 308(P)', name: 'Digital Electronics Lab', short: 'Digital Lab', instructor: 'Arya A Surya (ARA) / Aswani N M (ANM)', room: 'Hardware Lab', credits: 1, currentGrade: 96, color: '#2563eb' }
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'Implement Singly & Doubly Linked List Operations',
      courseId: 'cs24_302',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      priority: 'urgent',
      status: 'in_progress',
      estimatedHours: 4,
      completed: false,
      notes: 'Module III: C program for insertion/deletion at beginning, end, and specific position. Lab Exercise 1.'
    },
    {
      id: 'task-2',
      title: 'Cauchy-Riemann & Analytic Functions Problem Set',
      courseId: 'en24_301',
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      priority: 'high',
      status: 'todo',
      estimatedHours: 3,
      completed: false,
      notes: 'Module I: Verify C-R equations in cartesian and polar forms, find harmonic conjugates, Mobius transform.'
    },
    {
      id: 'task-3',
      title: '5-Variable K-Map Minimization & Don\'t Care Conditions',
      courseId: 'cs24_305',
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      priority: 'high',
      status: 'todo',
      estimatedHours: 3,
      completed: false,
      notes: 'Module II: Boolean algebra postulates, canonical POS/SOP forms, universal NAND/NOR logic realization.'
    },
    {
      id: 'task-4',
      title: 'Infix to Postfix Conversion & Expression Tree Lab Exercise',
      courseId: 'cs24_307p',
      dueDate: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
      priority: 'high',
      status: 'review',
      estimatedHours: 2.5,
      completed: false,
      notes: 'Data Structures Lab Experiment 9: Implement stack operator precedence and evaluate postfix expression.'
    },
    {
      id: 'task-5',
      title: 'Booth\'s Algorithm & Fast Adders Numerical Assignment',
      courseId: 'cs24_304',
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      priority: 'medium',
      status: 'todo',
      estimatedHours: 3,
      completed: false,
      notes: 'Module II: Addition/subtraction of signed numbers, Carry Look-Ahead Adders, Booth\'s multiplication trace.'
    },
    {
      id: 'task-6',
      title: 'Draft IEEE 830 SRS Document for Term Project',
      courseId: 'cs24_303',
      dueDate: new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0],
      priority: 'medium',
      status: 'todo',
      estimatedHours: 4,
      completed: false,
      notes: 'Module III: Software Requirements Specification with functional & non-functional requirements, Cohesion & Coupling.'
    },
    {
      id: 'task-7',
      title: 'Breadboard Setup: 4-Bit Binary Parallel Adder/Subtractor',
      courseId: 'cs24_308p',
      dueDate: new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0],
      priority: 'medium',
      status: 'todo',
      estimatedHours: 2,
      completed: false,
      notes: 'Digital Electronics Lab Experiment 3: Setup IC 7483 with XOR gates for 2\'s complement addition/subtraction.'
    },
    {
      id: 'task-8',
      title: 'Group Discussion Prep: Engineering Ethics & Whistleblowing',
      courseId: 'en24_306',
      dueDate: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
      priority: 'low',
      status: 'completed',
      estimatedHours: 2,
      completed: true,
      notes: 'Module 4: Kohlberg\'s theory, moral dilemmas, IEEE/ACM Code of Ethics, Challenger disaster case study.'
    }
  ],
  pomodoro: {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
    autoStartNext: false,
    soundEnabled: true,
    ambientSound: 'none', // none, rain, whitenoise, birds, cafe
    stats: {
      todayMinutes: 100,
      todaySessions: 4,
      totalMinutes: 1450,
      totalSessions: 58,
      lastActiveDate: new Date().toISOString().split('T')[0]
    }
  },
  planner: [
    // MONDAY
    { id: 'p-mon-1', title: 'DSA (ARA)', courseId: 'cs24_302', dayOfWeek: 1, startTime: '09:30', endTime: '10:30', location: 'Arya A Surya (ARA)', type: 'Theory (Sec 1)' },
    { id: 'p-mon-2', title: 'COA (JSK)', courseId: 'cs24_304', dayOfWeek: 1, startTime: '10:30', endTime: '11:30', location: 'Jessy K (JSK)', type: 'Theory (Sec 2)' },
    { id: 'p-mon-3', title: 'SE (FMK)', courseId: 'cs24_303', dayOfWeek: 1, startTime: '11:30', endTime: '12:30', location: 'Fathima Murshida K (FMK)', type: 'Theory (Sec 3)' },
    { id: 'p-mon-4', title: 'DSA / DIGITAL LAB', courseId: 'cs24_307p', dayOfWeek: 1, startTime: '13:30', endTime: '16:30', location: 'Arya A Surya / Aswani N M', type: 'Lab (Sec 4-6)' },

    // TUESDAY
    { id: 'p-tue-1', title: 'COA (JSK)', courseId: 'cs24_304', dayOfWeek: 2, startTime: '09:30', endTime: '10:30', location: 'Jessy K (JSK)', type: 'Theory (Sec 1)' },
    { id: 'p-tue-2', title: 'M3 (MBK)', courseId: 'cs24_301', dayOfWeek: 2, startTime: '10:30', endTime: '11:30', location: 'Mubeena K (MBK)', type: 'Theory (Sec 2)' },
    { id: 'p-tue-3', title: 'STLD (ANM)', courseId: 'cs24_305', dayOfWeek: 2, startTime: '11:30', endTime: '12:30', location: 'Aswani N M (ANM)', type: 'Theory (Sec 3)' },
    { id: 'p-tue-4', title: 'SE (FMK)', courseId: 'cs24_303', dayOfWeek: 2, startTime: '13:30', endTime: '14:30', location: 'Fathima Murshida K (FMK)', type: 'Theory (Sec 4)' },
    { id: 'p-tue-5', title: 'LS (MBK)', courseId: 'cs24_306', dayOfWeek: 2, startTime: '14:30', endTime: '15:30', location: 'Mubeena K (MBK)', type: 'Theory (Sec 5)' },
    { id: 'p-tue-6', title: 'DSA (ARA)', courseId: 'cs24_302', dayOfWeek: 2, startTime: '15:30', endTime: '16:30', location: 'Arya A Surya (ARA)', type: 'Theory (Sec 6)' },

    // WEDNESDAY
    { id: 'p-wed-1', title: 'DSA / DIGITAL LAB', courseId: 'cs24_308p', dayOfWeek: 3, startTime: '09:30', endTime: '12:30', location: 'Arya A Surya / Aswani N M', type: 'Lab (Sec 1-3)' },
    { id: 'p-wed-4', title: 'COA (JSK)', courseId: 'cs24_304', dayOfWeek: 3, startTime: '13:30', endTime: '14:30', location: 'Jessy K (JSK)', type: 'Theory (Sec 4)' },
    { id: 'p-wed-5', title: 'M3 (MBK)', courseId: 'cs24_301', dayOfWeek: 3, startTime: '14:30', endTime: '15:30', location: 'Mubeena K (MBK)', type: 'Theory (Sec 5)' },
    { id: 'p-wed-6', title: 'LS (MBK)', courseId: 'cs24_306', dayOfWeek: 3, startTime: '15:30', endTime: '16:30', location: 'Mubeena K (MBK)', type: 'Theory (Sec 6)' },

    // THURSDAY
    { id: 'p-thu-1', title: 'STLD (ANM)', courseId: 'cs24_305', dayOfWeek: 4, startTime: '09:30', endTime: '10:30', location: 'Aswani N M (ANM)', type: 'Theory (Sec 1)' },
    { id: 'p-thu-2', title: 'M3 (MBK)', courseId: 'cs24_301', dayOfWeek: 4, startTime: '10:30', endTime: '11:30', location: 'Mubeena K (MBK)', type: 'Theory (Sec 2)' },
    { id: 'p-thu-3', title: 'DSA (ARA)', courseId: 'cs24_302', dayOfWeek: 4, startTime: '11:30', endTime: '12:30', location: 'Arya A Surya (ARA)', type: 'Theory (Sec 3)' },
    { id: 'p-thu-4', title: 'SE (FMK)', courseId: 'cs24_303', dayOfWeek: 4, startTime: '13:30', endTime: '14:30', location: 'Fathima Murshida K (FMK)', type: 'Theory (Sec 4)' },
    { id: 'p-thu-5', title: 'LS (MBK)', courseId: 'cs24_306', dayOfWeek: 4, startTime: '14:30', endTime: '15:30', location: 'Mubeena K (MBK)', type: 'Theory (Sec 5)' },
    { id: 'p-thu-6', title: 'STLD (ANM)', courseId: 'cs24_305', dayOfWeek: 4, startTime: '15:30', endTime: '16:30', location: 'Aswani N M (ANM)', type: 'Theory (Sec 6)' },

    // FRIDAY
    { id: 'p-fri-1', title: 'SE (FMK)', courseId: 'cs24_303', dayOfWeek: 5, startTime: '09:30', endTime: '10:30', location: 'Fathima Murshida K (FMK)', type: 'Theory (Sec 1)' },
    { id: 'p-fri-2', title: 'STLD (ANM)', courseId: 'cs24_305', dayOfWeek: 5, startTime: '10:30', endTime: '11:30', location: 'Aswani N M (ANM)', type: 'Theory (Sec 2)' },
    { id: 'p-fri-3', title: 'COA (JSK)', courseId: 'cs24_304', dayOfWeek: 5, startTime: '11:30', endTime: '12:30', location: 'Jessy K (JSK)', type: 'Theory (Sec 3)' },
    { id: 'p-fri-4', title: 'DSA (ARA)', courseId: 'cs24_302', dayOfWeek: 5, startTime: '13:45', endTime: '14:40', location: 'Arya A Surya (ARA)', type: 'Theory (Sec 4)' },
    { id: 'p-fri-5', title: 'M3 (MBK)', courseId: 'cs24_301', dayOfWeek: 5, startTime: '14:40', endTime: '15:35', location: 'Mubeena K (MBK)', type: 'Theory (Sec 5)' },
    { id: 'p-fri-6', title: 'LS (MBK)', courseId: 'cs24_306', dayOfWeek: 5, startTime: '15:35', endTime: '16:30', location: 'Mubeena K (MBK)', type: 'Theory (Sec 6)' }
  ],
  flashcardDecks: [
    {
      id: 'deck-1',
      title: 'CS24 302: Data Structures & Algorithms',
      courseId: 'cs24_302',
      description: 'Time complexities, trees, graphs, and searching/sorting algorithms',
      cards: [
        { id: 'c1', front: 'What is the worst-case and average-case time complexity of QuickSort?', back: 'Worst case: O(n²) (when pivot is consistently minimum/maximum). Average case: O(n log n).' },
        { id: 'c2', front: 'How does a Circular Queue overcome the limitation of a Linear Queue?', back: 'A linear queue suffers from false overflow when rear reaches capacity even if front has moved. A circular queue wraps around using modulo arithmetic: (rear + 1) % MAX.' },
        { id: 'c3', front: 'Compare Dijkstra\'s Algorithm vs Prim\'s Algorithm.', back: 'Dijkstra finds single-source shortest paths to all vertices (relaxing distance). Prim\'s algorithm finds a Minimum Spanning Tree connecting all vertices with minimum total edge weight.' },
        { id: 'c4', front: 'What is the balance factor condition for an AVL Tree?', back: 'Balance Factor = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, +1}. Rebalanced using LL, RR, LR, or RL rotations.' }
      ]
    },
    {
      id: 'deck-2',
      title: 'CS24 305: Logic Design & Flip-Flops',
      courseId: 'cs24_305',
      description: 'Boolean theorems, K-Maps, counters, and registers',
      cards: [
        { id: 'c5', front: 'Why are NAND and NOR called Universal Gates?', back: 'Because any Boolean function or basic gate (AND, OR, NOT) can be implemented solely using only NAND gates or only NOR gates.' },
        { id: 'c6', front: 'What is the Race-Around Condition in a JK Flip-Flop, and how is it resolved?', back: 'Occurs when J=1, K=1 and clock pulse width tp > propagation delay td, causing the output to oscillate. Resolved by using Master-Slave JK Flip-Flop or Edge-Triggering.' },
        { id: 'c7', front: 'What is the modulus of an n-bit Ring Counter vs an n-bit Johnson Counter?', back: 'An n-bit Ring Counter has modulus = n states. An n-bit Johnson (twisted ring) Counter has modulus = 2n states.' }
      ]
    },
    {
      id: 'deck-3',
      title: 'CS24 304: Computer Organization & Architecture',
      courseId: 'cs24_304',
      description: 'Memory hierarchy, fast adders, and pipelining hazards',
      cards: [
        { id: 'c8', front: 'What are the 3 major types of Pipelining Hazards?', back: '1. Structural Hazards (hardware resource conflict)\n2. Data Hazards (RAW, WAR, WAW dependencies)\n3. Control Hazards (branching and jumps)' },
        { id: 'c9', front: 'Compare Direct Mapping vs Set-Associative Cache Mapping.', back: 'Direct Mapping maps each main memory block to exactly one cache line (faster, higher conflict misses). Set-Associative maps to any line in a specific set (flexible, lower miss rate).' }
      ]
    }
  ],
  notes: [
    {
      id: 'note-1',
      title: 'DSA Exam Formula & Concept Sheet',
      courseId: 'cs301',
      content: `# Data Structures Key Reminders

- **Binary Search Tree**: Left < Node < Right
- **AVL Tree**: Balance factor = Height(Left) - Height(Right) ∈ {-1, 0, 1}
- **Heap Property**:
  - Max-Heap: Parent ≥ Children
  - Array representation: Left child = 2i+1, Right child = 2i+2, Parent = (i-1)/2
- **Graph Traversal**:
  - BFS uses Queue (Shortest path in unweighted graph)
  - DFS uses Stack/Recursion (Topological sort, cycle detection)`,
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: 'note-2',
      title: 'Quantum Physics Quick Reference',
      courseId: 'phys150',
      content: `# Modern Physics Cheat Sheet

- **Planck-Einstein Relation**: E = hf = hc / λ
- **De Broglie Wavelength**: λ = h / p = h / (mv)
- **Heisenberg Uncertainty**: Δx * Δp ≥ ℏ / 2
- **Photoelectric Cutoff Frequency**: f₀ = Φ / h`,
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ]
};

class StateManager {
  constructor() {
    this.listeners = new Set();
    this.data = this.loadData();
    this.verifyDateRollover();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with default in case of new structure keys
        return { ...DEFAULT_DATA, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using default data:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
    this.notify();
  }

  verifyDateRollover() {
    const today = new Date().toISOString().split('T')[0];
    if (this.data.pomodoro.stats.lastActiveDate !== today) {
      this.data.pomodoro.stats.todayMinutes = 0;
      this.data.pomodoro.stats.todaySessions = 0;
      this.data.pomodoro.stats.lastActiveDate = today;
      this.saveData();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.data);
      } catch (err) {
        console.error('Error in state listener:', err);
      }
    }
  }

  // --- Task Methods ---
  addTask(task) {
    const newTask = {
      id: 'task-' + Date.now(),
      status: 'todo',
      completed: false,
      ...task
    };
    this.data.tasks.unshift(newTask);
    this.saveData();
    return newTask;
  }

  updateTask(id, updates) {
    const task = this.data.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
      if (updates.status === 'completed') {
        task.completed = true;
      } else if (updates.status && updates.status !== 'completed') {
        task.completed = false;
      }
      this.saveData();
    }
  }

  deleteTask(id) {
    this.data.tasks = this.data.tasks.filter(t => t.id !== id);
    this.saveData();
  }

  toggleTaskCompletion(id) {
    const task = this.data.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.status = task.completed ? 'completed' : 'todo';
      this.saveData();
      return task.completed;
    }
    return false;
  }

  // --- Course Methods ---
  addCourse(course) {
    const newCourse = {
      id: 'course-' + Date.now(),
      currentGrade: 90,
      credits: 3,
      color: '#6366f1',
      ...course
    };
    this.data.courses.push(newCourse);
    this.saveData();
    return newCourse;
  }

  updateCourse(id, updates) {
    const course = this.data.courses.find(c => c.id === id);
    if (course) {
      Object.assign(course, updates);
      this.saveData();
    }
  }

  deleteCourse(id) {
    this.data.courses = this.data.courses.filter(c => c.id !== id);
    this.data.tasks = this.data.tasks.filter(t => t.courseId !== id);
    this.saveData();
  }

  // --- Planner Events ---
  addPlannerEvent(event) {
    const newEvent = {
      id: 'plan-' + Date.now(),
      type: 'study',
      ...event
    };
    this.data.planner.push(newEvent);
    this.saveData();
    return newEvent;
  }

  deletePlannerEvent(id) {
    this.data.planner = this.data.planner.filter(p => p.id !== id);
    this.saveData();
  }

  // --- Flashcards ---
  addFlashcardDeck(deck) {
    const newDeck = {
      id: 'deck-' + Date.now(),
      cards: [],
      ...deck
    };
    this.data.flashcardDecks.push(newDeck);
    this.saveData();
    return newDeck;
  }

  addCardToDeck(deckId, card) {
    const deck = this.data.flashcardDecks.find(d => d.id === deckId);
    if (deck) {
      const newCard = {
        id: 'fc-' + Date.now(),
        repetitionLevel: 1,
        ...card
      };
      deck.cards.push(newCard);
      this.saveData();
      return newCard;
    }
  }

  updateCard(deckId, cardId, updates) {
    const deck = this.data.flashcardDecks.find(d => d.id === deckId);
    if (deck) {
      const card = deck.cards.find(c => c.id === cardId);
      if (card) {
        Object.assign(card, updates);
        this.saveData();
      }
    }
  }

  deleteDeck(deckId) {
    this.data.flashcardDecks = this.data.flashcardDecks.filter(d => d.id !== deckId);
    this.saveData();
  }

  // --- Notes ---
  addNote(note) {
    const newNote = {
      id: 'note-' + Date.now(),
      updatedAt: new Date().toISOString(),
      ...note
    };
    this.data.notes.unshift(newNote);
    this.saveData();
    return newNote;
  }

  updateNote(id, updates) {
    const note = this.data.notes.find(n => n.id === id);
    if (note) {
      Object.assign(note, updates, { updatedAt: new Date().toISOString() });
      this.saveData();
    }
  }

  deleteNote(id) {
    this.data.notes = this.data.notes.filter(n => n.id !== id);
    this.saveData();
  }

  // --- Pomodoro Stats Recording ---
  recordPomodoroSession(minutes) {
    this.verifyDateRollover();
    this.data.pomodoro.stats.todayMinutes += minutes;
    this.data.pomodoro.stats.todaySessions += 1;
    this.data.pomodoro.stats.totalMinutes += minutes;
    this.data.pomodoro.stats.totalSessions += 1;
    this.saveData();
  }

  // --- Export / Import ---
  exportToJson() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importFromJson(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      if (!imported.courses || !imported.tasks) {
        throw new Error('Invalid format: missing required student hub sections');
      }
      this.data = imported;
      this.saveData();
      return true;
    } catch (err) {
      console.error('Import failed:', err);
      return false;
    }
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.saveData();
  }
}

export const state = new StateManager();

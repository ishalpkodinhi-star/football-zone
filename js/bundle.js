/**
 * Student Productivity Hub - Standalone Unified Application Bundle
 * Designed to work 100% offline and directly with file:/// protocol without CORS issues!
 */

(function () {
  'use strict';

  // ==========================================
  // 1. EMBEDDED SVG ICONS (Zero CDN Dependency)
  // ==========================================
  const ICONS = {
    'graduation-cap': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
    'layout-dashboard': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
    'check-square': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    'timer': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>`,
    'book-open': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    'calendar': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
    'layers': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    'file-text': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
    'sun-moon': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>`,
    'flame': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    'sparkles': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#facc15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    'check-circle-2': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
    'play': `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
    'pause': `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
    'rotate-ccw': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
    'skip-forward': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>`,
    'download': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    'upload': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,
    'plus': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
    'search': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    'trash-2': `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
    'edit-3': `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    'menu': `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    'x': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
  };

  function getIcon(name) {
    return ICONS[name] || '';
  }

  // ==========================================
  // 2. CENTRAL STATE & LOCAL STORAGE
  // ==========================================
  const STORAGE_KEY = 'student_hub_data_standalone_calicut_s3_v3';

  const DEFAULT_DATA = {
    profile: {
      name: 'Ishal',
      major: 'B.Tech Computer Science & Engineering',
      university: 'Institute of Engg & Technology University of Calicut (CUIET)',
      semester: 'Semester 3 (S3 CS - 2026)',
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
        id: 't-1',
        title: 'Implement Singly & Doubly Linked List Operations',
        courseId: 'cs24_302',
        dueDate: 'This Friday',
        priority: 'urgent',
        status: 'in_progress',
        estimatedHours: 4,
        completed: false,
        notes: 'Faculty: Arya A Surya (ARA). Module III: C programs for insertion/deletion at beginning, end, and specific position. Lab Exercise 1.'
      },
      {
        id: 't-2',
        title: 'Cauchy-Riemann & Analytic Functions Problem Set',
        courseId: 'cs24_301',
        dueDate: 'In 3 days',
        priority: 'high',
        status: 'todo',
        estimatedHours: 3,
        completed: false,
        notes: 'Faculty: Mubeena K (MBK). Module I: Verify C-R equations in cartesian and polar forms, find harmonic conjugates, Mobius transform.'
      },
      {
        id: 't-3',
        title: '5-Variable K-Map Minimization & Don\'t Care Conditions',
        courseId: 'cs24_305',
        dueDate: 'In 5 days',
        priority: 'high',
        status: 'todo',
        estimatedHours: 3,
        completed: false,
        notes: 'Faculty: Aswani N M (ANM). Module II: Boolean algebra postulates, canonical POS/SOP forms, universal NAND/NOR logic realization.'
      },
      {
        id: 't-4',
        title: 'Infix to Postfix Conversion & Expression Tree Lab Exercise',
        courseId: 'cs24_307p',
        dueDate: 'Next Lab Session',
        priority: 'high',
        status: 'review',
        estimatedHours: 2.5,
        completed: false,
        notes: 'Faculty: Arya A Surya (ARA) / Aswani N M (ANM). Data Structures Lab Experiment 9: Implement stack operator precedence and evaluate postfix expression.'
      },
      {
        id: 't-5',
        title: 'Booth\'s Algorithm & Fast Adders Numerical Assignment',
        courseId: 'cs24_304',
        dueDate: 'In 1 week',
        priority: 'medium',
        status: 'todo',
        estimatedHours: 3,
        completed: false,
        notes: 'Faculty: Jessy K (JSK). Module II: Addition/subtraction of signed numbers, Carry Look-Ahead Adders, Booth\'s multiplication trace.'
      },
      {
        id: 't-6',
        title: 'Draft IEEE 830 SRS Document for Term Project',
        courseId: 'cs24_303',
        dueDate: 'In 10 days',
        priority: 'medium',
        status: 'todo',
        estimatedHours: 4,
        completed: false,
        notes: 'Faculty: Fathima Murshida K (FMK). Module III: Software Requirements Specification with functional & non-functional requirements, Cohesion & Coupling.'
      },
      {
        id: 't-7',
        title: 'Breadboard Setup: 4-Bit Binary Parallel Adder/Subtractor',
        courseId: 'cs24_308p',
        dueDate: 'Next Wednesday',
        priority: 'medium',
        status: 'todo',
        estimatedHours: 2,
        completed: false,
        notes: 'Faculty: Arya A Surya (ARA) / Aswani N M (ANM). Digital Electronics Lab Experiment 3: Setup IC 7483 with XOR gates for 2\'s complement addition/subtraction.'
      },
      {
        id: 't-8',
        title: 'Group Discussion Prep: Engineering Ethics & Whistleblowing',
        courseId: 'cs24_306',
        dueDate: 'Completed',
        priority: 'low',
        status: 'completed',
        estimatedHours: 2,
        completed: true,
        notes: 'Faculty: Mubeena K (MBK). Module 4: Kohlberg\'s theory, moral dilemmas, IEEE/ACM Code of Ethics, Challenger disaster case study.'
      }
    ],
    pomodoro: {
      stats: { todayMinutes: 125, todaySessions: 5, totalMinutes: 1680, totalSessions: 67 }
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
    flashcards: [
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
        id: 'n-1',
        title: 'EN24 301 Complex Analysis & PDE Formulas',
        courseId: 'en24_301',
        content: `# EN24 301: Engineering Mathematics III Formula Sheet

## Module I: Complex Variables & Analytic Functions
- **Cauchy-Riemann (C-R) Equations (Cartesian)**:
  - $\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}$
  - $\\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}$
- **Laplace Equation (Harmonic function)**:
  - $\\nabla^2 u = \\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = 0$
- **Mobius Transformation**:
  - $w = \\frac{az + b}{cz + d}$ where $ad - bc \\neq 0$

## Module IV & V: Partial Differential Equations
- **One-Dimensional Wave Equation**:
  - $\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\frac{\\partial^2 u}{\\partial x^2}$
  - D'Alembert & separation of variables solutions
- **One-Dimensional Heat Equation**:
  - $\\frac{\\partial u}{\\partial t} = \\alpha^2 \\frac{\\partial^2 u}{\\partial x^2}$`
      },
      {
        id: 'n-2',
        title: 'CS24 302 Data Structures Lab & Exam Sheet',
        courseId: 'cs24_302',
        content: `# CS24 302: Data Structures & Algorithms Cheat Sheet

## Singly Linked List Node in C
\`\`\`c
struct Node {
    int data;
    struct Node* next;
};
\`\`\`

## Infix to Postfix Precedence Rules
1. Parentheses: '(' highest incoming, lowest on stack.
2. Exponentiation: '^' (Right-to-Left associative)
3. Multiplication/Division: '*', '/', '%' (Left-to-Right)
4. Addition/Subtraction: '+', '-' (Left-to-Right)

## Asymptotic Complexities
- **Binary Search**: $O(\\log n)$
- **Merge Sort / Heap Sort**: $O(n \\log n)$ guaranteed
- **QuickSort**: $O(n \\log n)$ average, $O(n^2)$ worst case
- **BST Search**: $O(h)$ where $h = O(\\log n)$ balanced, $O(n)$ skewed`
      }
    ]
  };

  let hubData = (function () {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile && (parsed.profile.name === 'Alex Chen' || !parsed.profile.name)) {
          parsed.profile.name = 'Ishal';
        }
        return Object.assign({}, DEFAULT_DATA, parsed);
      }
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  })();

  if (hubData.profile && (hubData.profile.name === 'Alex Chen' || !hubData.profile.name)) {
    hubData.profile.name = 'Ishal';
    saveData();
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hubData));
    } catch (e) {}
  }

  // ==========================================
  // 3. SOUND ENGINE (Synthesized Offline Web Audio)
  // ==========================================
  const Sound = {
    ctx: null,
    ambientNodes: [],
    currentAmbient: null,
    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    },
    playChime() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.9);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1);
      });
    },
    startAmbient(type) {
      this.stopAmbient();
      if (!type || type === 'none') return;
      this.init();
      if (!this.ctx) return;

      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(type === 'rain' ? 850 : 350, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start(0);

      this.ambientNodes.push(whiteNoise, filter, gain);
      this.currentAmbient = type;
    },
    stopAmbient() {
      this.ambientNodes.forEach(node => {
        try { if (node.stop) node.stop(); node.disconnect(); } catch (e) {}
      });
      this.ambientNodes = [];
      this.currentAmbient = null;
    }
  };

  // ==========================================
  // 4. GPA CALCULATOR HELPER
  // ==========================================
  function getGradeInfo(percentage) {
    if (percentage >= 93) return { point: 4.0, letter: 'A' };
    if (percentage >= 90) return { point: 3.7, letter: 'A-' };
    if (percentage >= 87) return { point: 3.3, letter: 'B+' };
    if (percentage >= 83) return { point: 3.0, letter: 'B' };
    if (percentage >= 80) return { point: 2.7, letter: 'B-' };
    if (percentage >= 77) return { point: 2.3, letter: 'C+' };
    if (percentage >= 73) return { point: 2.0, letter: 'C' };
    return { point: 1.5, letter: 'D' };
  }

  function calculateGpa() {
    let credits = 0;
    let points = 0;
    hubData.courses.forEach(c => {
      const info = getGradeInfo(c.currentGrade);
      credits += c.credits;
      points += info.point * c.credits;
    });
    return credits > 0 ? (points / credits).toFixed(2) : '4.00';
  }

  // ==========================================
  // 5. MODULE RENDERING FUNCTIONS
  // ==========================================

  // --- DASHBOARD ---
  function renderDashboard(container) {
    const completedTasks = hubData.tasks.filter(t => t.completed).length;
    const gpa = calculateGpa();

    container.innerHTML = `
      <div class="greeting-banner">
        <div>
          <span style="display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; background:rgba(255,255,255,0.2); padding:0.25rem 0.65rem; border-radius:9999px; margin-bottom:0.75rem;">
            ${getIcon('sparkles')} ${hubData.profile.university} • ${hubData.profile.semester}
          </span>
          <h1 style="font-size:1.85rem; font-weight:900; line-height:1.2;">Welcome back, <span id="profile-name-span" title="Click to edit name" style="cursor:pointer; text-decoration:underline dashed rgba(255,255,255,0.5);">${hubData.profile.name}</span>! 👋</h1>
          <p style="font-size:0.875rem; opacity:0.9; margin-top:0.4rem; max-width:600px;">
            "Focus is a muscle; the more you protect your deep work, the stronger it becomes."
          </p>
        </div>
        <div class="banner-stats">
          <div style="text-align:center;">
            <div style="display:flex; align-items:center; justify-content:center; gap:0.25rem;">
              ${getIcon('flame')} <span style="font-size:1.75rem; font-weight:900; color:#fef08a;">${hubData.profile.streak}</span>
            </div>
            <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.85;">Day Streak</div>
          </div>
          <div style="width:1px; height:36px; background:rgba(255,255,255,0.25);"></div>
          <div style="text-align:center;">
            <span style="font-size:1.75rem; font-weight:900; color:#6ee7b7;">${hubData.pomodoro.stats.todayMinutes}m</span>
            <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; opacity:0.85;">Focus Today</div>
          </div>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid-4">
        <div class="glass-panel">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Assignments</span>
            ${getIcon('check-square')}
          </div>
          <div style="font-size:1.85rem; font-weight:900; margin-top:0.5rem;">${completedTasks} / ${hubData.tasks.length}</div>
          <div style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700; margin-top:0.25rem;">
            ${Math.round((completedTasks / (hubData.tasks.length || 1)) * 100)}% completed
          </div>
        </div>

        <div class="glass-panel">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Semester GPA</span>
            ${getIcon('book-open')}
          </div>
          <div style="font-size:1.85rem; font-weight:900; margin-top:0.5rem; color:var(--primary);">${gpa}</div>
          <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.25rem;">Target: ${hubData.profile.targetGpa}</div>
        </div>

        <div class="glass-panel">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Courses</span>
            ${getIcon('graduation-cap')}
          </div>
          <div style="font-size:1.85rem; font-weight:900; margin-top:0.5rem;">${hubData.courses.length}</div>
          <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.25rem;">Active Enrolled Subjects</div>
        </div>

        <div class="glass-panel" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Focus Sprint</span>
            <div style="font-size:0.875rem; font-weight:700; margin-top:0.25rem;">Start 25m Deep Work</div>
          </div>
          <button id="btn-quick-pomo-action" class="btn btn-primary" style="margin-top:0.75rem; width:100%;">
            ${getIcon('play')} Launch Timer
          </button>
        </div>
      </div>

      <!-- Priority Deadlines List -->
      <div class="glass-panel" style="margin-bottom:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <h2 style="font-size:1.1rem; font-weight:800;">Upcoming Deadlines & Assignments</h2>
          <button id="btn-goto-tasks" class="btn btn-secondary btn-sm">View All Board</button>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${hubData.tasks.filter(t => !t.completed).slice(0, 4).map(task => {
            const course = hubData.courses.find(c => c.id === task.courseId) || { code: 'Gen', color: '#4f46e5' };
            return `
              <div style="display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border:1px solid var(--border); border-radius:12px; background:var(--bg-app);">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <button data-task-id="${task.id}" class="btn-check-task" style="width:20px; height:20px; border-radius:50%; border:2px solid var(--text-muted); background:transparent; cursor:pointer;"></button>
                  <div>
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                      <span style="background:${course.color}; color:#fff; font-size:0.65rem; font-weight:800; padding:0.15rem 0.45rem; border-radius:4px;">${course.code}</span>
                      <span style="font-size:0.875rem; font-weight:700;">${task.title}</span>
                    </div>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">Due: ${task.dueDate} • Est: ${task.estimatedHours}h</div>
                  </div>
                </div>
                <span class="badge badge-${task.priority}">${task.priority}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.querySelector('#btn-quick-pomo-action')?.addEventListener('click', () => window.navigateTo('pomodoro'));
    container.querySelector('#btn-goto-tasks')?.addEventListener('click', () => window.navigateTo('tasks'));

    container.querySelector('#profile-name-span')?.addEventListener('click', () => {
      showLoginModal(true);
    });

    container.querySelectorAll('.btn-check-task').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.taskId;
        const task = hubData.tasks.find(t => t.id === id);
        if (task) {
          task.completed = true;
          task.status = 'completed';
          saveData();
          renderDashboard(container);
        }
      });
    });
  }

  // --- TASKS / ASSIGNMENTS (Kanban Board) ---
  function renderTasks(container) {
    const columns = [
      { id: 'todo', title: 'To Do', badge: 'badge-medium' },
      { id: 'in_progress', title: 'In Progress', badge: 'badge-high' },
      { id: 'review', title: 'Under Review', badge: 'badge-urgent' },
      { id: 'completed', title: 'Completed', badge: 'badge-low' }
    ];

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h1 style="font-size:1.6rem; font-weight:900;">Assignments & Task Workflow</h1>
          <p style="font-size:0.825rem; color:var(--text-secondary);">Organize, prioritize, and track problem sets and project submissions.</p>
        </div>
        <button id="btn-add-task-open" class="btn btn-primary">${getIcon('plus')} Add Assignment</button>
      </div>

      <div class="kanban-board">
        ${columns.map(col => {
          const colTasks = hubData.tasks.filter(t => t.status === col.id);
          return `
            <div class="kanban-col" data-col="${col.id}">
              <div class="kanban-col-header">
                <span style="font-size:0.8rem; font-weight:800; text-transform:uppercase;">${col.title}</span>
                <span class="badge ${col.badge}">${colTasks.length}</span>
              </div>
              <div class="kanban-drop-zone" data-col="${col.id}" style="flex:1;">
                ${colTasks.map(task => {
                  const course = hubData.courses.find(c => c.id === task.courseId) || { code: 'Gen', color: '#4f46e5' };
                  return `
                    <div class="kanban-task-card" draggable="true" data-task-id="${task.id}">
                      <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="background:${course.color}; color:#fff; font-size:0.65rem; font-weight:800; padding:0.15rem 0.45rem; border-radius:4px;">${course.code}</span>
                        <span class="badge badge-${task.priority}">${task.priority}</span>
                      </div>
                      <h4 style="font-size:0.85rem; font-weight:700; margin:0.65rem 0 0.25rem 0;">${task.title}</h4>
                      ${task.notes ? `<p style="font-size:0.75rem; color:var(--text-secondary); line-height:1.3;">${task.notes}</p>` : ''}
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; padding-top:0.5rem; border-top:1px solid var(--border-subtle); font-size:0.725rem; color:var(--text-muted);">
                        <span>Due: ${task.dueDate}</span>
                        <button data-task-id="${task.id}" class="btn-delete-task" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer;">
                          ${getIcon('trash-2')}
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div id="task-modal-root"></div>
    `;

    // Delete tasks
    container.querySelectorAll('.btn-delete-task').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.taskId;
        hubData.tasks = hubData.tasks.filter(t => t.id !== id);
        saveData();
        renderTasks(container);
      });
    });

    // Add task modal
    container.querySelector('#btn-add-task-open')?.addEventListener('click', () => {
      openTaskModal(container);
    });

    // Drag and drop
    setupDragDrop(container);
  }

  function setupDragDrop(container) {
    const cards = container.querySelectorAll('.kanban-task-card');
    const cols = container.querySelectorAll('.kanban-col');

    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', card.dataset.taskId);
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });

    cols.forEach(col => {
      col.addEventListener('dragover', (e) => e.preventDefault());
      col.addEventListener('drop', (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const targetCol = col.dataset.col;
        const task = hubData.tasks.find(t => t.id === taskId);
        if (task && targetCol) {
          task.status = targetCol;
          task.completed = (targetCol === 'completed');
          saveData();
          renderTasks(container);
        }
      });
    });
  }

  function openTaskModal(container) {
    const root = container.querySelector('#task-modal-root');
    root.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
            <h3 style="font-size:1.1rem; font-weight:800;">Add New Assignment</h3>
            <button id="modal-close-x" style="background:transparent; border:none; cursor:pointer;">${getIcon('x')}</button>
          </div>
          <form id="new-task-form">
            <div class="form-group">
              <label class="form-label">Assignment Title *</label>
              <input type="text" name="title" required class="form-input" placeholder="e.g. Implement Dijkstra Algorithm" />
            </div>
            <div class="form-group">
              <label class="form-label">Course Subject</label>
              <select name="courseId" class="form-select">
                ${hubData.courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('')}
              </select>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
              <div class="form-group">
                <label class="form-label">Priority</label>
                <select name="priority" class="form-select">
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium" selected>Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Due Date</label>
                <input type="text" name="dueDate" class="form-input" placeholder="e.g. Next Tuesday" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Notes & Requirements</label>
              <textarea name="notes" class="form-textarea" rows="3" placeholder="Submission rubric, page limits..."></textarea>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1.5rem;">
              <button type="button" id="modal-btn-cancel" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">Create Assignment</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => { root.innerHTML = ''; };
    root.querySelector('#modal-close-x').addEventListener('click', close);
    root.querySelector('#modal-btn-cancel').addEventListener('click', close);

    root.querySelector('#new-task-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      hubData.tasks.unshift({
        id: 't-' + Date.now(),
        title: form.get('title'),
        courseId: form.get('courseId'),
        priority: form.get('priority'),
        dueDate: form.get('dueDate') || 'Open',
        notes: form.get('notes'),
        status: 'todo',
        estimatedHours: 2,
        completed: false
      });
      saveData();
      close();
      renderTasks(container);
    });
  }

  // --- POMODORO TIMER ---
  let pomoInterval = null;
  let pomoSecondsLeft = 25 * 60;
  let pomoTotalSeconds = 25 * 60;
  let pomoIsRunning = false;

  function renderPomodoro(container) {
    const minutes = Math.floor(pomoSecondsLeft / 60);
    const seconds = pomoSecondsLeft % 60;
    const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - ((pomoTotalSeconds - pomoSecondsLeft) / pomoTotalSeconds) * circumference;

    container.innerHTML = `
      <div style="max-w:650px; margin:0 auto; text-align:center;">
        <h1 style="font-size:1.85rem; font-weight:900;">Pomodoro Deep Work Timer</h1>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.25rem;">Train deep concentration and protect high-yield focus sessions.</p>

        <!-- Mode Selectors -->
        <div style="display:inline-flex; gap:0.5rem; background:var(--bg-card); border:1px solid var(--border); padding:0.4rem; border-radius:12px; margin:1.5rem 0;">
          <button id="pomo-25" class="btn ${pomoTotalSeconds === 25*60 ? 'btn-primary' : 'btn-secondary'} btn-sm">25m Focus</button>
          <button id="pomo-5" class="btn ${pomoTotalSeconds === 5*60 ? 'btn-primary' : 'btn-secondary'} btn-sm">5m Break</button>
          <button id="pomo-15" class="btn ${pomoTotalSeconds === 15*60 ? 'btn-primary' : 'btn-secondary'} btn-sm">15m Break</button>
        </div>

        <!-- Timer Circle -->
        <div class="glass-panel" style="max-width:440px; margin:0 auto; padding:2rem;">
          <div class="pomo-circle-wrap">
            <svg class="pomo-svg" viewBox="0 0 240 240">
              <circle cx="120" cy="120" r="${radius}" class="bg-circle" />
              <circle id="pomo-circle-progress" cx="120" cy="120" r="${radius}" class="fg-circle" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" />
            </svg>
            <div class="pomo-time-text">
              <div id="pomo-time-digits" class="pomo-time-digits">${timeDisplay}</div>
              <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); margin-top:0.25rem;">
                ${pomoTotalSeconds > 10*60 ? 'Study Sprint' : 'Rest Break'}
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div style="display:flex; justify-content:center; align-items:center; gap:0.75rem; margin-top:1.5rem;">
            <button id="pomo-reset" class="btn btn-secondary" title="Reset">${getIcon('rotate-ccw')}</button>
            <button id="pomo-toggle" class="btn btn-primary" style="padding:0.65rem 1.75rem; font-size:1rem;">
              ${getIcon(pomoIsRunning ? 'pause' : 'play')} ${pomoIsRunning ? 'Pause' : 'Start Focus'}
            </button>
            <button id="pomo-skip" class="btn btn-secondary" title="Skip">${getIcon('skip-forward')}</button>
          </div>
        </div>

        <!-- Procedural Web Audio Ambient Sounds -->
        <div class="glass-panel" style="max-width:540px; margin:1.5rem auto 0 auto; text-align:left;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="font-size:0.875rem; font-weight:800;">Procedural Ambient Audio (100% Offline)</h4>
            <span style="font-size:0.65rem; color:var(--accent-emerald); font-weight:800; background:rgba(5,150,105,0.1); padding:0.2rem 0.5rem; border-radius:6px;">SYNTHESIZED</span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
            <button data-sound="none" class="btn-sound btn ${Sound.currentAmbient === null ? 'btn-primary' : 'btn-secondary'} btn-sm">🔇 Mute</button>
            <button data-sound="rain" class="btn-sound btn ${Sound.currentAmbient === 'rain' ? 'btn-primary' : 'btn-secondary'} btn-sm">🌧️ Rain Noise</button>
            <button data-sound="brown" class="btn-sound btn ${Sound.currentAmbient === 'brown' ? 'btn-primary' : 'btn-secondary'} btn-sm">🌊 Brown Noise</button>
          </div>
        </div>
      </div>
    `;

    // Timer Mode switches
    container.querySelector('#pomo-25')?.addEventListener('click', () => switchPomo(25 * 60, container));
    container.querySelector('#pomo-5')?.addEventListener('click', () => switchPomo(5 * 60, container));
    container.querySelector('#pomo-15')?.addEventListener('click', () => switchPomo(15 * 60, container));

    // Timer play/pause
    container.querySelector('#pomo-toggle')?.addEventListener('click', () => {
      if (pomoIsRunning) {
        clearInterval(pomoInterval);
        pomoIsRunning = false;
      } else {
        pomoIsRunning = true;
        pomoInterval = setInterval(() => {
          if (pomoSecondsLeft > 0) {
            pomoSecondsLeft--;
            updatePomoClock();
          } else {
            clearInterval(pomoInterval);
            pomoIsRunning = false;
            Sound.playChime();
            hubData.pomodoro.stats.todayMinutes += Math.round(pomoTotalSeconds / 60);
            saveData();
            alert('🎉 Session complete! Great work.');
            switchPomo(5 * 60, container);
          }
        }, 1000);
      }
      renderPomodoro(container);
    });

    container.querySelector('#pomo-reset')?.addEventListener('click', () => {
      clearInterval(pomoInterval);
      pomoIsRunning = false;
      pomoSecondsLeft = pomoTotalSeconds;
      renderPomodoro(container);
    });

    container.querySelector('#pomo-skip')?.addEventListener('click', () => {
      clearInterval(pomoInterval);
      pomoIsRunning = false;
      switchPomo(pomoTotalSeconds === 25*60 ? 5*60 : 25*60, container);
    });

    // Sound toggle buttons
    container.querySelectorAll('.btn-sound').forEach(btn => {
      btn.addEventListener('click', () => {
        const sound = btn.dataset.sound;
        Sound.startAmbient(sound);
        renderPomodoro(container);
      });
    });
  }

  function switchPomo(duration, container) {
    clearInterval(pomoInterval);
    pomoIsRunning = false;
    pomoTotalSeconds = duration;
    pomoSecondsLeft = duration;
    renderPomodoro(container);
  }

  function updatePomoClock() {
    const digits = document.getElementById('pomo-time-digits');
    const circle = document.getElementById('pomo-circle-progress');
    const minutes = Math.floor(pomoSecondsLeft / 60);
    const seconds = pomoSecondsLeft % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (digits) digits.textContent = formatted;
    document.title = `(${formatted}) Student Productivity Hub`;

    if (circle) {
      const radius = 100;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - ((pomoTotalSeconds - pomoSecondsLeft) / pomoTotalSeconds) * circumference;
      circle.style.strokeDashoffset = offset;
    }
  }

  // --- COURSES & GPA TRACKER ---
  function renderCourses(container) {
    const gpa = calculateGpa();

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h1 style="font-size:1.6rem; font-weight:900;">Courses & GPA Projection</h1>
          <p style="font-size:0.825rem; color:var(--text-secondary);">Course syllabi, instructor info, and weighted semester GPA.</p>
        </div>
        <button id="btn-add-course" class="btn btn-primary">${getIcon('plus')} Add Course</button>
      </div>

      <!-- GPA Banner -->
      <div class="glass-panel" style="margin-bottom:2rem; display:flex; align-items:center; justify-content:space-around; flex-wrap:wrap; gap:1.5rem;">
        <div>
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Semester GPA</span>
          <div style="font-size:2.5rem; font-weight:900; color:var(--primary); line-height:1.1;">${gpa} / 4.00</div>
          <span style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700;">Dean's Honors Status</span>
        </div>
        <div style="width:1px; height:50px; background:var(--border);"></div>
        <div>
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Academic Goal</span>
          <div style="font-size:2rem; font-weight:800; color:var(--text-primary);">${hubData.profile.targetGpa} / 4.00</div>
          <span style="font-size:0.75rem; color:var(--text-secondary);">${hubData.profile.major}</span>
        </div>
        <div style="width:1px; height:50px; background:var(--border);"></div>
        <div>
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Registered Credits</span>
          <div style="font-size:2rem; font-weight:800; color:var(--text-primary);">${hubData.courses.reduce((acc, c) => acc + c.credits, 0)}</div>
          <span style="font-size:0.75rem; color:var(--text-secondary);">${hubData.courses.length} Enrolled Courses</span>
        </div>
      </div>

      <!-- Course Cards -->
      <div class="grid-2">
        ${hubData.courses.map(course => {
          const info = getGradeInfo(course.currentGrade);
          return `
            <div class="glass-panel" style="position:relative; overflow:hidden;">
              <div style="position:absolute; top:0; left:0; right:0; height:4px; background:${course.color};"></div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <span style="background:${course.color}; color:#fff; font-size:0.7rem; font-weight:800; padding:0.2rem 0.5rem; border-radius:6px;">${course.code}</span>
                  <h3 style="font-size:1.1rem; font-weight:800; margin-top:0.5rem;">${course.name}</h3>
                  <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.35rem;">
                    <div>👤 ${course.instructor}</div>
                    <div style="margin-top:0.2rem;">📍 ${course.room} • ${course.credits} Credits</div>
                  </div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:1.85rem; font-weight:900;">${course.currentGrade}%</div>
                  <div style="font-size:0.8rem; font-weight:800; color:var(--primary);">${info.letter} (${info.point.toFixed(1)} pts)</div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelector('#btn-add-course')?.addEventListener('click', () => {
      const code = prompt('Enter Course Code (e.g. CS 401):');
      if (code) {
        const name = prompt('Enter Course Name:');
        hubData.courses.push({
          id: 'c-' + Date.now(),
          code: code.trim(),
          name: name ? name.trim() : 'New Subject',
          instructor: 'TBD',
          room: 'Campus',
          credits: 3,
          currentGrade: 90,
          color: '#6366f1'
        });
        saveData();
        renderCourses(container);
      }
    });
  }

  // --- WEEKLY TIMETABLE ---
  function renderPlanner(container) {
    const days = [
      { id: 1, name: 'Monday', short: 'Mon' },
      { id: 2, name: 'Tuesday', short: 'Tue' },
      { id: 3, name: 'Wednesday', short: 'Wed' },
      { id: 4, name: 'Thursday', short: 'Thu' },
      { id: 5, name: 'Friday', short: 'Fri' }
    ];

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <span style="font-size:0.7rem; font-weight:800; color:var(--primary); text-transform:uppercase; letter-spacing:0.05em; background:rgba(79,70,229,0.1); padding:0.2rem 0.5rem; border-radius:6px;">
            CUIET • Dept of Computer Science & Engineering
          </span>
          <h1 style="font-size:1.6rem; font-weight:900; margin-top:0.35rem;">S3 CS Timetable (2026)</h1>
          <p style="font-size:0.825rem; color:var(--text-secondary);">Official schedule with faculty assignments and section periods.</p>
        </div>
      </div>

      <!-- Quick Faculty Legend -->
      <div class="glass-panel" style="margin-bottom:1.5rem; padding:1rem 1.25rem;">
        <div style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.5rem;">
          Faculty & Subject Reference
        </div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:0.5rem; font-size:0.75rem;">
          <div><strong style="color:var(--primary);">M3:</strong> Engineering Maths III — Mubeena K (MBK)</div>
          <div><strong style="color:var(--primary);">DSA:</strong> Data Structures & Algos — Arya A Surya (ARA)</div>
          <div><strong style="color:var(--primary);">SE:</strong> Software Engineering — Fathima Murshida K (FMK)</div>
          <div><strong style="color:var(--primary);">COA:</strong> Comp. Org & Arch. — Jessy K (JSK)</div>
          <div><strong style="color:var(--primary);">STLD:</strong> Switching Theory & Logic — Aswani N M (ANM)</div>
          <div><strong style="color:var(--primary);">LS:</strong> Life Skills & Ethics — Mubeena K (MBK)</div>
          <div><strong style="color:var(--primary);">LABS:</strong> DSA & Digital Lab — ARA / ANM</div>
        </div>
      </div>

      <div class="planner-week-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));">
        ${days.map(d => {
          const events = hubData.planner.filter(p => p.dayOfWeek === d.id);
          return `
            <div class="planner-day-col">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; padding-bottom:0.5rem; border-bottom:1px solid var(--border-subtle);">
                <span style="font-size:0.85rem; font-weight:900; text-transform:uppercase; color:var(--text-primary);">${d.name}</span>
                <span style="font-size:0.7rem; color:var(--text-muted); font-weight:700;">${events.length} Classes</span>
              </div>
              <div style="display:flex; flex-direction:column; gap:0.6rem; flex:1;">
                ${events.map(e => {
                  const course = hubData.courses.find(c => c.id === e.courseId);
                  const color = course ? course.color : 'var(--primary)';
                  const isLab = e.title.includes('LAB');
                  return `
                    <div style="background:var(--bg-app); border:1px solid var(--border); border-left:4px solid ${color}; border-radius:10px; padding:0.65rem; font-size:0.75rem; ${isLab ? 'background:rgba(99,102,241,0.06);' : ''}">
                      <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:var(--text-muted); font-weight:700;">
                        <span>⏰ ${e.startTime} - ${e.endTime}</span>
                        <span style="background:rgba(0,0,0,0.05); padding:0.1rem 0.35rem; border-radius:4px;">${e.type}</span>
                      </div>
                      <div style="font-weight:900; font-size:0.85rem; margin-top:0.3rem; color:var(--text-primary);">${e.title}</div>
                      <div style="color:var(--text-secondary); margin-top:0.25rem; font-size:0.7rem; display:flex; align-items:center; gap:0.25rem;">
                        <span>👤 ${e.location}</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // --- FLASHCARDS (3D Interactive Flip) ---
  let activeDeckIndex = 0;
  let activeCardIndex = 0;
  let isCardFlipped = false;

  function renderFlashcards(container) {
    const deck = hubData.flashcards[activeDeckIndex];
    const card = deck.cards[activeCardIndex];

    container.innerHTML = `
      <div style="max-width:680px; margin:0 auto; text-align:center;">
        <h1 style="font-size:1.75rem; font-weight:900;">Flashcards & Active Recall</h1>
        <p style="font-size:0.825rem; color:var(--text-secondary); margin-top:0.25rem;">${deck.title} • Card ${activeCardIndex + 1} of ${deck.cards.length}</p>

        <!-- 3D Card Stage -->
        <div class="flashcard-stage" id="fc-stage" style="margin:2rem auto 1.5rem auto;">
          <div class="flashcard-inner ${isCardFlipped ? 'flipped' : ''}" id="fc-inner">
            <!-- Front -->
            <div class="flashcard-face flashcard-front">
              <span style="font-size:0.7rem; font-weight:800; color:var(--primary); text-transform:uppercase; letter-spacing:0.05em;">QUESTION</span>
              <div style="font-size:1.35rem; font-weight:800; line-height:1.4;">${card.front}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Click anywhere to flip and see answer</div>
            </div>
            <!-- Back -->
            <div class="flashcard-face flashcard-back">
              <span style="font-size:0.7rem; font-weight:800; color:var(--accent-emerald); text-transform:uppercase; letter-spacing:0.05em;">ANSWER</span>
              <div style="font-size:1.15rem; font-weight:700; line-height:1.4;">${card.back}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Click to flip back</div>
            </div>
          </div>
        </div>

        <!-- Rating Buttons -->
        <div style="display:flex; justify-content:center; gap:0.5rem;">
          <button id="fc-prev" class="btn btn-secondary">Previous</button>
          <button id="fc-flip" class="btn btn-primary">Flip Card</button>
          <button id="fc-next" class="btn btn-secondary">Next Card</button>
        </div>
      </div>
    `;

    const flip = () => {
      isCardFlipped = !isCardFlipped;
      container.querySelector('#fc-inner')?.classList.toggle('flipped', isCardFlipped);
    };

    container.querySelector('#fc-stage')?.addEventListener('click', flip);
    container.querySelector('#fc-flip')?.addEventListener('click', flip);

    container.querySelector('#fc-prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeCardIndex > 0) activeCardIndex--;
      isCardFlipped = false;
      renderFlashcards(container);
    });

    container.querySelector('#fc-next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeCardIndex < deck.cards.length - 1) activeCardIndex++;
      isCardFlipped = false;
      renderFlashcards(container);
    });
  }

  // --- STUDY NOTES & MARKDOWN ---
  function renderNotes(container) {
    const note = hubData.notes[0];
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h1 style="font-size:1.6rem; font-weight:900;">Course Notebook</h1>
          <p style="font-size:0.825rem; color:var(--text-secondary);">Course cheat-sheets, formulas, and instant Markdown notes.</p>
        </div>
        <button id="btn-download-notes-file" class="btn btn-secondary btn-sm">${getIcon('download')} Download .md</button>
      </div>

      <div class="glass-panel" style="min-height:480px; display:flex; flex-direction:column;">
        <input id="note-title" class="form-input" style="font-size:1.1rem; font-weight:800; border:none; background:transparent; padding:0 0 0.75rem 0; border-bottom:1px solid var(--border);" value="${note.title}" />
        <textarea id="note-body" class="form-textarea" style="flex:1; border:none; background:transparent; font-family:var(--font-mono); font-size:0.85rem; margin-top:1rem; resize:none; line-height:1.6;">${note.content}</textarea>
      </div>
    `;

    container.querySelector('#note-title')?.addEventListener('input', (e) => {
      note.title = e.target.value;
      saveData();
    });

    container.querySelector('#note-body')?.addEventListener('input', (e) => {
      note.content = e.target.value;
      saveData();
    });

    container.querySelector('#btn-download-notes-file')?.addEventListener('click', () => {
      const blob = new Blob([note.content], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${note.title.toLowerCase().replace(/\s+/g, '-')}.md`;
      a.click();
    });
  }

  // ==========================================
  // USER PROFILE & LOGIN MODAL
  // ==========================================
  function updateSidebarProfile() {
    const avatar = document.getElementById('user-avatar-display');
    const nameEl = document.getElementById('user-display-name');
    const majorEl = document.getElementById('user-display-major');

    const firstLetter = (hubData.profile.name || 'S').trim().charAt(0).toUpperCase();
    if (avatar) avatar.textContent = firstLetter;
    if (nameEl) nameEl.textContent = hubData.profile.name || 'Student';
    if (majorEl) majorEl.textContent = hubData.profile.major || 'Undergraduate';
  }

  function showLoginModal(allowClose = true) {
    const root = document.getElementById('auth-modal-root');
    if (!root) return;

    const initialLetter = (hubData.profile.name || 'S').trim().charAt(0).toUpperCase();

    root.innerHTML = `
      <div class="login-overlay">
        <div class="login-card">
          ${allowClose ? `
            <button id="login-modal-close" style="position:absolute; top:1.25rem; right:1.25rem; background:transparent; border:none; color:var(--text-muted); cursor:pointer;">
              ${getIcon('x')}
            </button>
          ` : ''}

          <div class="login-card-header">
            <div class="login-avatar-preview" id="login-avatar-preview">${initialLetter}</div>
            <h2 style="font-size:1.5rem; font-weight:900; color:var(--text-primary); line-height:1.2;">
              Student Profile & Login
            </h2>
            <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.35rem;">
              Personalize your academic hub with your name, school, and study goals.
            </p>
          </div>

          <!-- Quick Presets -->
          <div class="quick-presets">
            <button type="button" class="preset-chip" id="preset-ishal">🎓 Calicut Univ (S3 CSE)</button>
            <button type="button" class="preset-chip" id="preset-med">💻 Generic B.Tech CSE</button>
            <button type="button" class="preset-chip" id="preset-clear">⚡ Custom / Blank</button>
          </div>

          <form id="student-login-form">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" id="login-input-name" name="name" required class="form-input" 
                value="${hubData.profile.name || ''}" placeholder="e.g. Ishal" />
            </div>

            <div class="form-group">
              <label class="form-label">University / College / School</label>
              <input type="text" id="login-input-uni" name="university" class="form-input" 
                value="${hubData.profile.university || ''}" placeholder="e.g. State Polytechnic Institute" />
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
              <div class="form-group">
                <label class="form-label">Major / Field of Study</label>
                <input type="text" id="login-input-major" name="major" class="form-input" 
                  value="${hubData.profile.major || ''}" placeholder="e.g. Computer Science & AI" />
              </div>
              <div class="form-group">
                <label class="form-label">Current Semester / Year</label>
                <input type="text" id="login-input-semester" name="semester" class="form-input" 
                  value="${hubData.profile.semester || ''}" placeholder="e.g. Fall 2026" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Target GPA Goal (4.00 Scale)</label>
              <input type="number" id="login-input-gpa" name="targetGpa" step="0.05" min="1.0" max="4.0" class="form-input" 
                value="${hubData.profile.targetGpa || 3.85}" placeholder="3.85" />
            </div>

            <div style="margin-top:1.5rem; display:flex; gap:0.5rem;">
              ${allowClose ? `
                <button type="button" id="login-btn-cancel" class="btn btn-secondary" style="flex:1;">Cancel</button>
              ` : ''}
              <button type="submit" class="btn btn-primary" style="flex:2; font-size:0.9rem; padding:0.65rem;">
                🚀 Save & Enter Hub
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const nameInput = root.querySelector('#login-input-name');
    const avatarPreview = root.querySelector('#login-avatar-preview');
    nameInput?.addEventListener('input', (e) => {
      const letter = (e.target.value || 'S').trim().charAt(0).toUpperCase();
      if (avatarPreview) avatarPreview.textContent = letter;
    });

    root.querySelector('#preset-ishal')?.addEventListener('click', () => {
      document.getElementById('login-input-name').value = 'Ishal';
      document.getElementById('login-input-uni').value = 'University of Calicut (CUIET)';
      document.getElementById('login-input-major').value = 'B.Tech Computer Science & Engineering';
      document.getElementById('login-input-semester').value = 'Semester 3 (2024 Scheme)';
      document.getElementById('login-input-gpa').value = '8.75';
      if (avatarPreview) avatarPreview.textContent = 'I';
    });

    root.querySelector('#preset-med')?.addEventListener('click', () => {
      document.getElementById('login-input-name').value = 'Alex Morgan';
      document.getElementById('login-input-uni').value = 'Johns Hopkins University';
      document.getElementById('login-input-major').value = 'Biomedical Science / Pre-Med';
      document.getElementById('login-input-semester').value = 'Year 2 - Term 1';
      document.getElementById('login-input-gpa').value = '3.95';
      if (avatarPreview) avatarPreview.textContent = 'A';
    });

    root.querySelector('#preset-clear')?.addEventListener('click', () => {
      document.getElementById('login-input-name').value = '';
      document.getElementById('login-input-uni').value = '';
      document.getElementById('login-input-major').value = '';
      document.getElementById('login-input-semester').value = '';
      document.getElementById('login-input-gpa').value = '3.50';
      if (avatarPreview) avatarPreview.textContent = '?';
      document.getElementById('login-input-name').focus();
    });

    const closeModal = () => { root.innerHTML = ''; };
    root.querySelector('#login-modal-close')?.addEventListener('click', closeModal);
    root.querySelector('#login-btn-cancel')?.addEventListener('click', closeModal);

    root.querySelector('#student-login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const name = form.get('name').trim();
      const uni = form.get('university').trim() || 'University';
      const major = form.get('major').trim() || 'General Studies';
      const semester = form.get('semester').trim() || 'Current Term';
      const targetGpa = parseFloat(form.get('targetGpa')) || 3.8;

      hubData.profile.name = name;
      hubData.profile.university = uni;
      hubData.profile.major = major;
      hubData.profile.semester = semester;
      hubData.profile.targetGpa = targetGpa;
      hubData.profile.isLoggedIn = true;
      hubData.profile.isConfigured = true;

      saveData();
      updateSidebarProfile();
      closeModal();
      Sound.playChime();

      window.navigateTo(currentTab);
    });
  }

  // ==========================================
  // 6. ROUTER & GLOBAL APP INITIALIZATION
  // ==========================================
  let currentTab = 'dashboard';
  const TAB_MAP = {
    dashboard: renderDashboard,
    tasks: renderTasks,
    pomodoro: renderPomodoro,
    courses: renderCourses,
    planner: renderPlanner,
    flashcards: renderFlashcards,
    notes: renderNotes
  };

  window.navigateTo = function (tabId) {
    if (TAB_MAP[tabId]) {
      currentTab = tabId;
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.tab === tabId);
      });
      const container = document.getElementById('main-content-area');
      if (container) {
        TAB_MAP[tabId](container);
        container.scrollTop = 0;
      }
    }
  };

  function init() {
    // Theme setup
    const isDark = localStorage.getItem('hub_dark_theme') === 'true';
    if (isDark) document.documentElement.classList.add('dark');

    const toggleTheme = () => {
      const dark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('hub_dark_theme', dark);
    };

    document.getElementById('btn-toggle-theme')?.addEventListener('click', toggleTheme);
    document.getElementById('btn-toggle-theme-mobile')?.addEventListener('click', toggleTheme);

    // Nav setup
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.navigateTo(link.dataset.tab);
        // Mobile sidebar close
        document.getElementById('mobile-sidebar')?.classList.remove('mobile-open');
      });
    });

    // Mobile menu toggle
    document.getElementById('btn-mobile-menu')?.addEventListener('click', () => {
      document.getElementById('mobile-sidebar')?.classList.toggle('mobile-open');
    });

    // Backup & Export
    document.getElementById('btn-export-data')?.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(hubData, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `student-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    });

    // Reset data
    document.getElementById('btn-reset-data')?.addEventListener('click', () => {
      if (confirm('Reset to default sample data?')) {
        hubData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        saveData();
        window.navigateTo(currentTab);
      }
    });

    // Sidebar profile click to customize / login
    document.getElementById('sidebar-profile-card')?.addEventListener('click', () => showLoginModal(true));
    document.getElementById('btn-edit-profile')?.addEventListener('click', (e) => {
      e.stopPropagation();
      showLoginModal(true);
    });

    updateSidebarProfile();

    // Initial render
    window.navigateTo('dashboard');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

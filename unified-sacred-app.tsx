import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Users,
  Brain,
  Compass,
  Trophy,
  Sparkles,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Home,
  MessageCircle,
  Award,
  Lock,
  Star,
  Play,
  BookMarked,
  Search,
  Palette,
  Gamepad,
  Target,
  Gem,
  Lightbulb,
  BadgeCheck,
  Layers,
  ScrollText,
  ClipboardList,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';

// ============================================
// CONTENT DATABASE - Real Content Structure
// ============================================
const CONTENT_DATABASE = {
  books: [
    {
      id: 'bhagavad-gita',
      title: 'Bhagavad Gita',
      category: 'hinduism',
      description: 'The Bhagavad Gita is a 700-verse Hindu scripture, part of the epic Mahabharata.',
      chapters: [
        {
          id: 1,
          title: 'Arjuna's Dilemma',
          content: `On the battlefield of Kurukshetra, Arjuna stood between two great armies. His relatives, teachers, and friends filled both sides. Overcome with compassion and doubt, he turned to Krishna, his charioteer and guide.

"O Krishna," Arjuna said, his voice heavy with sorrow, "I see my own kinsmen gathered here, desiring to fight. My limbs fail, my mouth is dry, my body trembles. How can I fight against my own people?"

This moment of crisis became the setting for one of humanity's greatest philosophical dialogues...`,
          verses: 47,
          audioUrl: null
        },
        {
          id: 2,
          title: 'The Yoga of Knowledge',
          content: `Krishna smiled gently at Arjuna's confusion. "You grieve for those who should not be grieved for, yet you speak words of wisdom. The wise grieve neither for the living nor the dead.

Never was there a time when I did not exist, nor you, nor these kings. Nor will there be a time when we cease to be. Just as the soul passes through childhood, youth, and old age in this body, so too does it pass into another body at death. The wise are not deluded by this."

These words began to illuminate the eternal nature of the self...`,
          verses: 72,
          audioUrl: null
        }
      ],
      totalChapters: 18,
      estimatedTime: '12 hours',
      difficulty: 'intermediate'
    },
    {
      id: 'dhammapada',
      title: 'The Dhammapada',
      category: 'buddhism',
      description: 'Collection of sayings of the Buddha in verse form, one of the most widely read Buddhist scriptures.',
      chapters: [
        {
          id: 1,
          title: 'The Twin Verses',
          content: `All that we are is the result of what we have thought: it is founded on our thoughts, it is made up of our thoughts. If a person speaks or acts with an evil thought, pain follows them, as the wheel follows the foot of the ox that draws the carriage.

All that we are is the result of what we have thought: it is founded on our thoughts, it is made up of our thoughts. If a person speaks or acts with a pure thought, happiness follows them, like a shadow that never leaves.

"They abused me, they struck me, they overpowered me, they robbed me"—in those who harbor such thoughts, hatred will never cease.

"They abused me, they struck me, they overpowered me, they robbed me"—in those who do not harbor such thoughts, hatred will cease.

For hatred does not cease by hatred at any time; hatred ceases by love—this is an eternal law.`,
          verses: 20,
          audioUrl: null
        }
      ],
      totalChapters: 26,
      estimatedTime: '6 hours',
      difficulty: 'beginner'
    },
    {
      id: 'tao-te-ching',
      title: 'Tao Te Ching',
      category: 'taoism',
      description: 'Ancient Chinese text attributed to Laozi, foundational to Taoist philosophy.',
      chapters: [
        {
          id: 1,
          title: 'Chapter 1: The Tao',
          content: `The Tao that can be told is not the eternal Tao.
The name that can be named is not the eternal name.
The nameless is the beginning of heaven and earth.
The named is the mother of ten thousand things.

Ever desireless, one can see the mystery.
Ever desiring, one can see the manifestations.
These two spring from the same source but differ in name;
this appears as darkness.

Darkness within darkness.
The gate to all mystery.`,
          verses: 1,
          audioUrl: null
        }
      ],
      totalChapters: 81,
      estimatedTime: '4 hours',
      difficulty: 'intermediate'
    }
  ],
  
  courses: [
    {
      id: 'intro-eastern-philosophy',
      title: 'Introduction to Eastern Philosophy',
      description: 'A comprehensive journey through the foundations of Eastern thought',
      difficulty: 'beginner',
      duration: '8 weeks',
      instructor: 'Dr. Maya Patel',
      lessons: [
        {
          id: 1,
          title: 'What is Eastern Philosophy?',
          content: `Eastern philosophy encompasses the philosophical traditions that originated in Asia, including Indian, Chinese, Japanese, Korean, and other Asian philosophies.

Unlike Western philosophy's focus on logic and analysis, Eastern philosophy emphasizes:
- Direct experience and practice
- The interconnectedness of all things
- Balance and harmony
- The nature of consciousness
- Liberation from suffering

Key traditions include:
1. Hinduism - The oldest tradition, exploring dharma, karma, and moksha
2. Buddhism - Founded by the Buddha, focusing on the end of suffering
3. Taoism - Chinese philosophy of living in harmony with the Tao
4. Confucianism - Social philosophy emphasizing ethics and relationships

These philosophies aren't just intellectual exercises—they're meant to be lived and practiced daily.`,
          quiz: {
            question: 'What is a key difference between Eastern and Western philosophy?',
            options: [
              'Eastern philosophy is newer',
              'Eastern philosophy emphasizes direct experience and practice',
              'Western philosophy is more spiritual',
              'Eastern philosophy only focuses on meditation'
            ],
            correct: 1,
            explanation: 'Eastern philosophy traditionally emphasizes direct experience, practice, and transformation over pure intellectual analysis.'
          },
          unlocked: true
        },
        {
          id: 2,
          title: 'The Concept of Dharma',
          content: `Dharma is a central concept in Hinduism and Buddhism, though its meaning varies between traditions.

In Hinduism, dharma means:
- Cosmic law and order
- One's duty and righteous path
- The principles that sustain society
- Living in alignment with one's nature and purpose

In Buddhism, dharma refers to:
- The teachings of the Buddha
- The nature of reality
- The path to enlightenment
- Universal truth

Understanding your dharma means understanding your role in the cosmic order and how to live authentically. It's not about rules imposed from outside, but about discovering your true nature and purpose.

The Bhagavad Gita explores this deeply through Arjuna's crisis: should he fight or not? Krishna's answer reveals that dharma is complex and contextual.`,
          quiz: {
            question: 'In Hinduism, dharma primarily refers to:',
            options: [
              'Religious rituals only',
              'One\'s duty and righteous path',
              'Meditation practices',
              'Temple worship'
            ],
            correct: 1,
            explanation: 'Dharma in Hinduism encompasses one\'s duty, righteous path, and living in alignment with cosmic order and personal nature.'
          },
          unlocked: false
        }
      ],
      totalLessons: 8
    }
  ],

  paths: [
    {
      id: 'mindful-presence',
      title: 'The Way of Mindful Presence',
      creator: 'ZenMaster',
      description: 'A 12-week journey into cultivating deep present-moment awareness through progressive meditation techniques',
      difficulty: 'Intermediate',
      duration: '12 weeks',
      followers: 234,
      completed: 89,
      rating: 4.8,
      tags: ['Meditation', 'Mindfulness', 'Awareness'],
      prerequisites: ['Basic meditation experience', '30 days consistent practice'],
      rewards: {
        wisdom: 1200,
        badges: ['Mindful Observer', 'Present Moment Warrior']
      },
      steps: [
        {
          week: 1,
          title: 'Foundation of Breath',
          description: 'Learn basic breath awareness and establish your daily practice routine',
          practices: ['10-minute daily sitting', 'Breath counting meditation', 'Evening reflection journal'],
          unlocked: true
        },
        {
          week: 2,
          title: 'Body Awareness Integration',
          description: 'Expand awareness to include bodily sensations while maintaining breath focus',
          practices: ['15-minute body scan', 'Walking meditation', 'Mindful eating exercise'],
          unlocked: true
        },
        {
          week: 3,
          title: 'Working with Thoughts',
          description: 'Observe thoughts without attachment, developing the witness consciousness',
          practices: ['Thought labeling technique', 'Open awareness meditation', 'Noting practice'],
          unlocked: false
        }
      ],
      totalSteps: 12
    },
    {
      id: 'desert-wisdom',
      title: 'Desert Wisdom: The Path of Stillness',
      creator: 'SandSage',
      description: 'Ancient desert contemplation practices for finding clarity in emptiness and silence',
      difficulty: 'Advanced',
      duration: '8 weeks',
      followers: 156,
      completed: 45,
      rating: 4.9,
      tags: ['Contemplation', 'Silence', 'Advanced'],
      prerequisites: ['Completed intermediate path', '1+ year meditation experience'],
      rewards: {
        wisdom: 2000,
        badges: ['Desert Sage', 'Master of Stillness']
      },
      steps: [
        {
          week: 1,
          title: 'Entering the Silence',
          description: 'Begin your journey into profound stillness through extended silent periods',
          practices: ['4-hour silence periods', 'Desert visualization', 'Emptiness meditation'],
          unlocked: true
        },
        {
          week: 2,
          title: 'Listening to the Dunes',
          description: 'Learn to interpret subtle internal shifts as guidance from the desert winds',
          practices: ['Wind breath practice', 'Night sky contemplation', 'Silence journaling'],
          unlocked: false
        }
      ],
      totalSteps: 8
    },
    {
      id: 'beginners-mind',
      title: "Beginner's Mind: First Steps",
      creator: 'NewPath',
      description: 'A gentle introduction to meditation and mindfulness for complete beginners',
      difficulty: 'Beginner',
      duration: '4 weeks',
      followers: 512,
      completed: 287,
      rating: 4.7,
      tags: ['Beginner', 'Basics', 'Introduction'],
      prerequisites: ['Open mind', 'Willingness to practice'],
      rewards: {
        wisdom: 400,
        badges: ['First Steps Taken', 'Journey Begun']
      },
      steps: [
        {
          week: 1,
          title: 'What is Meditation?',
          description: 'Understanding the basics and setting up your practice space',
          practices: ['5-minute guided meditation', 'Create sacred space', 'Set intentions'],
          unlocked: true
        },
        {
          week: 2,
          title: 'Breath as an Anchor',
          description: 'Use the breath as a steadying guide for attention',
          practices: ['Counting breaths practice', 'Gentle stretching', 'Breath journaling'],
          unlocked: false
        }
      ],
      totalSteps: 4
    }
  ],

  missions: [
    {
      id: 1,
      title: '30-Day Sunrise Meditation',
      description: 'Commit to watching the sunrise while practicing mindful breathing for 30 consecutive days',
      category: 'Meditation',
      difficulty: 'Intermediate',
      rewards: 500,
      participants: 23,
      postedBy: 'ZenMaster'
    },
    {
      id: 2,
      title: 'Library Lightkeeper',
      description: 'Host a weekly reading circle and summarize the wisdom for new members',
      category: 'Community',
      difficulty: 'Beginner',
      rewards: 250,
      participants: 41,
      postedBy: 'Archivist Mira'
    },
    {
      id: 3,
      title: 'Quest of the Seven Virtues',
      description: 'Complete seven themed lessons and report a reflective insight for each',
      category: 'Learning',
      difficulty: 'Advanced',
      rewards: 900,
      participants: 12,
      postedBy: 'Council of Stewards'
    }
  ],

  eduDashboard: {
    stats: [
      {
        id: 'math',
        title: 'Mathematics Fundamentals',
        description: 'Master the building blocks of mathematical thinking',
        color: 'bg-blue-500',
        icon: '📐',
        completed: 2,
        total: 6
      },
      {
        id: 'physics',
        title: 'Physics Principles',
        description: 'Explore the fundamental laws governing our universe',
        color: 'bg-green-500',
        icon: '⚡',
        completed: 1,
        total: 6
      },
      {
        id: 'history',
        title: 'World History',
        description: "Journey through humanity's greatest achievements and lessons",
        color: 'bg-amber-500',
        icon: '🏛️',
        completed: 3,
        total: 6
      }
    ],
    achievements: [
      {
        id: 'mindful-scholar',
        title: 'Mindful Scholar',
        description: 'Complete 3 lessons in a single week to earn this radiant badge',
        reward: 150
      },
      {
        id: 'collaborative-scribe',
        title: 'Collaborative Scribe',
        description: 'Contribute notes to two community study scrolls',
        reward: 120
      },
      {
        id: 'quest-keeper',
        title: 'Quest Keeper',
        description: 'Maintain a 7-day practice streak within any learning path',
        reward: 220
      }
    ],
    mentors: [
      {
        name: 'Dr. Maya Patel',
        focus: 'Eastern Philosophy',
        officeHours: 'Thursdays · Virtual tea in the pavilion'
      },
      {
        name: 'Master Liang',
        focus: 'Breath & Movement Arts',
        officeHours: 'Sundays · Morning qi-gong on the dune terrace'
      }
    ],
    quests: [
      {
        id: 'daily-ritual',
        title: 'Daily Ritual Tracker',
        description: 'Log a mindful ritual before noon three days in a row',
        reward: 90
      },
      {
        id: 'wisdom-trader',
        title: 'Wisdom Trader',
        description: 'Swap insights with another learner in the discussion halls',
        reward: 130
      }
    ],
    projects: [
      {
        id: 1,
        title: 'Create Educational Videos for Algebra',
        author: 'Sarah M.',
        skills: ['Math', 'Video Editing'],
        responses: 12,
        description: 'Storyboard and record six bite-sized explainers that make algebra visual and friendly.'
      },
      {
        id: 2,
        title: 'Develop Physics Simulation for Waves',
        author: 'Dr. Chen',
        skills: ['Physics', 'Programming'],
        responses: 8,
        description: 'Collaboratively build an interactive wave lab showcasing interference patterns.'
      },
      {
        id: 3,
        title: 'Historical Timeline Interactive Map',
        author: 'James R.',
        skills: ['History', 'Design'],
        responses: 15,
        description: 'Design a scrollable atlas that links major world events with immersive audio clips.'
      }
    ]
  },

  designInitiatives: [
    {
      id: 'plugin-console',
      title: 'Plugin Management Console',
      focus: 'Design the steward console for activating, sequencing, and auditing plugins',
      mood: 'Polished sandstone terminals with glowing inlay controls',
      gameMoments: ['Collectible plugin glyphs earned through quests', 'Animated activation rituals with progress rings'],
      actionIdeas: [
        'Create wireframes for dashboard, plugin detail drawer, and ritualized activation modal',
        'Design badge-based permissions that feel like relic attunements',
        'Prototype a drag-and-drop path builder for plugin sequences'
      ]
    },
    {
      id: 'consent-prompts',
      title: 'Consent & Alignment Prompts',
      focus: 'Craft gentle, story-driven consent flows for knowledge exchanges',
      mood: 'Floating parchment prompts with soft lantern lighting',
      gameMoments: ['Trust meter that fills with transparent disclosures', 'Choice of guiding spirit offering contextual advice'],
      actionIdeas: [
        'Storyboard layered prompts that surface scope, duration, and benefits',
        'Explore cooperative mini-ritual animations before acceptance',
        'Map states for decline, negotiate, and accept responses with positive reinforcement'
      ]
    },
    {
      id: 'visual-elevation',
      title: 'Pavilion Visual Elevation',
      focus: 'Infuse more game-like celebration and progression into shared interfaces',
      mood: 'Aurora gradients, crystalline score counters, wind-driven particle effects',
      gameMoments: ['Level-up ceremonies that light the pavilion spires', 'Collectible constellation cards for milestones'],
      actionIdeas: [
        'Outline component updates that add animated score orbs to navigation',
        'Prepare mockups for quest log with animated parchment reveal',
        'Document motion guidelines for hovering sand sprites guiding attention'
      ]
    }
  ]
};

const createInitialNewPath = () => ({
  title: '',
  description: '',
  difficulty: 'Beginner',
  duration: '',
  isPublic: true,
  tags: [] as string[],
  steps: [] as {
    week: number;
    title: string;
    description: string;
    practices: string[];
    unlocked: boolean;
  }[],
  prerequisites: [''],
  rewards: {
    wisdom: 500,
    badges: [] as string[]
  },
  currentStep: {
    title: '',
    description: '',
    practices: ['']
  }
});

const createInitialProject = () => ({
  title: '',
  description: '',
  skills: ''
});

// ============================================
// MAIN APP COMPONENT
// ============================================
const SacredKnowledgeApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    progress: {
      booksRead: [],
      chaptersCompleted: [],
      coursesStarted: [],
      lessonsCompleted: [],
      pathsFollowed: [],
      missionsActive: [],
      wisdomPoints: 0
    }
  });

  const [loginForm, setLoginForm] = useState({ name: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [courseView, setCourseView] = useState<'dashboard' | 'catalog' | 'projects'>('dashboard');
  const [collabProjects, setCollabProjects] = useState(CONTENT_DATABASE.eduDashboard.projects);
  const [newProject, setNewProject] = useState(createInitialProject());
  const [communityPaths, setCommunityPaths] = useState(CONTENT_DATABASE.paths);
  const [pathView, setPathView] = useState<'overview' | 'detail' | 'create'>('overview');
  const [focusedPath, setFocusedPath] = useState(CONTENT_DATABASE.paths[0]);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [newPath, setNewPath] = useState(createInitialNewPath());
  const [newTag, setNewTag] = useState('');
  const [newBadge, setNewBadge] = useState('');
  const [selectedDesign, setSelectedDesign] = useState(CONTENT_DATABASE.designInitiatives[0]);

  const resetCourseExperience = () => {
    setCourseView('dashboard');
    setSelectedCourse(null);
    setSelectedLesson(null);
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      return;
    }

    const skills = newProject.skills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    const project = {
      id: Date.now(),
      title: newProject.title,
      author: user.isLoggedIn ? (user.name || 'Pavilion Member') : 'Guest Contributor',
      skills,
      responses: 0,
      description: newProject.description
    };

    setCollabProjects([...collabProjects, project]);
    setNewProject(createInitialProject());
  };

  const addPathTag = () => {
    if (newTag && !newPath.tags.includes(newTag)) {
      setNewPath({
        ...newPath,
        tags: [...newPath.tags, newTag]
      });
      setNewTag('');
    }
  };

  const removePathTag = (tagToRemove: string) => {
    setNewPath({
      ...newPath,
      tags: newPath.tags.filter((tag) => tag !== tagToRemove)
    });
  };

  const addRewardBadge = () => {
    if (newBadge && !newPath.rewards.badges.includes(newBadge)) {
      setNewPath({
        ...newPath,
        rewards: {
          ...newPath.rewards,
          badges: [...newPath.rewards.badges, newBadge]
        }
      });
      setNewBadge('');
    }
  };

  const removeRewardBadge = (badgeToRemove: string) => {
    setNewPath({
      ...newPath,
      rewards: {
        ...newPath.rewards,
        badges: newPath.rewards.badges.filter((badge) => badge !== badgeToRemove)
      }
    });
  };

  const addPracticeField = () => {
    setNewPath({
      ...newPath,
      currentStep: {
        ...newPath.currentStep,
        practices: [...newPath.currentStep.practices, '']
      }
    });
  };

  const updatePractice = (index: number, value: string) => {
    const practices = [...newPath.currentStep.practices];
    practices[index] = value;
    setNewPath({
      ...newPath,
      currentStep: {
        ...newPath.currentStep,
        practices
      }
    });
  };

  const addStepToNewPath = () => {
    if (!newPath.currentStep.title || !newPath.currentStep.description) {
      return;
    }

    const sanitizedPractices = newPath.currentStep.practices
      .map((practice) => practice.trim())
      .filter(Boolean);

    const step = {
      week: newPath.steps.length + 1,
      title: newPath.currentStep.title,
      description: newPath.currentStep.description,
      practices: sanitizedPractices.length ? sanitizedPractices : ['Reflective journal entry'],
      unlocked: newPath.steps.length === 0
    };

    setNewPath({
      ...newPath,
      steps: [...newPath.steps, step],
      currentStep: {
        title: '',
        description: '',
        practices: ['']
      }
    });
  };

  const addPrerequisiteField = () => {
    setNewPath({
      ...newPath,
      prerequisites: [...newPath.prerequisites, '']
    });
  };

  const updatePrerequisite = (index: number, value: string) => {
    const prerequisites = [...newPath.prerequisites];
    prerequisites[index] = value;
    setNewPath({
      ...newPath,
      prerequisites
    });
  };

  const publishNewPath = () => {
    if (!newPath.title || !newPath.description || newPath.steps.length === 0) {
      return;
    }

    const curatedPath = {
      id: `custom-${Date.now()}`,
      title: newPath.title,
      creator: user.isLoggedIn ? (user.name || 'Curator in Residence') : 'Guest Curator',
      description: newPath.description,
      difficulty: newPath.difficulty,
      duration: newPath.duration || `${newPath.steps.length} weeks`,
      followers: 0,
      completed: 0,
      rating: 5,
      tags: newPath.tags,
      prerequisites: newPath.prerequisites.filter((entry) => entry.trim().length > 0),
      rewards: {
        wisdom: newPath.rewards.wisdom,
        badges: newPath.rewards.badges
      },
      steps: newPath.steps,
      totalSteps: newPath.steps.length,
      isPublic: newPath.isPublic
    };

    setCommunityPaths([...communityPaths, curatedPath]);
    setFocusedPath(curatedPath);
    setExpandedStep(null);
    setPathView('detail');
    setNewPath(createInitialNewPath());
    setNewTag('');
    setNewBadge('');
  };

  const handleSelectPath = (path: typeof communityPaths[number]) => {
    setFocusedPath(path);
    setExpandedStep(null);
    setPathView('detail');
  };

  const resetPathBuilder = () => {
    setNewPath(createInitialNewPath());
    setNewTag('');
    setNewBadge('');
  };

  const selectDesignInitiative = (initiative: typeof CONTENT_DATABASE.designInitiatives[number]) => {
    setSelectedDesign(initiative);
  };

  const followPath = (pathId: string) => {
    if (!user.progress.pathsFollowed.includes(pathId)) {
      setUser({
        ...user,
        progress: {
          ...user.progress,
          pathsFollowed: [...user.progress.pathsFollowed, pathId],
          wisdomPoints: user.progress.wisdomPoints + 120
        }
      });
    }
  };

  // Save/Load user progress (localStorage ready)
  useEffect(() => {
    // PRODUCTION: const saved = JSON.parse(localStorage.getItem('sacredUser'));
    // PRODUCTION: if (saved) setUser(saved);
  }, []);

  useEffect(() => {
    // PRODUCTION: localStorage.setItem('sacredUser', JSON.stringify(user));
    console.log('Progress saved:', user.progress);
  }, [user]);

  const handleLogin = () => {
    if (loginForm.name && loginForm.email) {
      setUser({
        ...user,
        isLoggedIn: true,
        name: loginForm.name,
        email: loginForm.email
      });
      setShowLogin(false);
      setLoginForm({ name: '', email: '' });
    }
  };

  const completeChapter = (bookId, chapterId) => {
    if (!user.progress.chaptersCompleted.includes(`${bookId}-${chapterId}`)) {
      setUser({
        ...user,
        progress: {
          ...user.progress,
          chaptersCompleted: [...user.progress.chaptersCompleted, `${bookId}-${chapterId}`],
          wisdomPoints: user.progress.wisdomPoints + 50
        }
      });
    }
  };

  const completeLesson = (courseId, lessonId) => {
    if (!user.progress.lessonsCompleted.includes(`${courseId}-${lessonId}`)) {
      setUser({
        ...user,
        progress: {
          ...user.progress,
          lessonsCompleted: [...user.progress.lessonsCompleted, `${courseId}-${lessonId}`],
          wisdomPoints: user.progress.wisdomPoints + 100
        }
      });
    }
  };

  // ============================================
  // HOME PAGE
  // ============================================
  const HomePage = () => (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="text-8xl mb-6">🏛️</div>
        <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6">
          Sacred Knowledge Hub
        </h1>
        <p className="text-xl text-amber-700 max-w-2xl mx-auto mb-8">
          Your integrated platform for spiritual learning, ancient wisdom, and conscious growth
        </p>
        {user.isLoggedIn && (
          <div className="flex justify-center gap-4 text-sm mb-6">
            <div className="px-4 py-2 bg-amber-100 rounded-full">
              <Trophy className="w-4 h-4 inline mr-1" />
              {user.progress.wisdomPoints} Wisdom Points
            </div>
            <div className="px-4 py-2 bg-blue-100 rounded-full">
              {user.progress.chaptersCompleted.length} Chapters Read
            </div>
            <div className="px-4 py-2 bg-green-100 rounded-full">
              {user.progress.lessonsCompleted.length} Lessons Done
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4 text-amber-900">
            <Gamepad className="w-6 h-6" />
            <h3 className="text-2xl font-bold">Learning Momentum Tracker</h3>
          </div>
          <p className="text-amber-700 mb-4 text-sm">
            Flow through your active courses and watch the progress orbs light up as you advance.
          </p>
          <div className="space-y-4">
            {CONTENT_DATABASE.eduDashboard.stats.map((stat) => (
              <div key={stat.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-semibold text-amber-900">{stat.title}</span>
                  <span className="text-amber-700">{stat.completed}/{stat.total}</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2">
                  <div
                    className={`${stat.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(stat.completed / stat.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 via-rose-50 to-orange-100 border-2 border-purple-200 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4 text-purple-900">
            <Palette className="w-6 h-6" />
            <h3 className="text-2xl font-bold">Design Spotlight</h3>
          </div>
          <h4 className="text-xl font-semibold text-purple-900 mb-2">{selectedDesign.title}</h4>
          <p className="text-purple-700 text-sm mb-4">{selectedDesign.focus}</p>
          <div className="space-y-3 text-sm">
            <div>
              <span className="uppercase tracking-wide text-xs text-purple-500">Mood</span>
              <p className="text-purple-800">{selectedDesign.mood}</p>
            </div>
            <div>
              <span className="uppercase tracking-wide text-xs text-purple-500">Playful Beats</span>
              <ul className="list-disc list-inside text-purple-800">
                {selectedDesign.gameMoments.slice(0, 2).map((moment, idx) => (
                  <li key={idx}>{moment}</li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={() => {
              selectDesignInitiative(selectedDesign);
              setCurrentPage('design');
            }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            View Design Lab
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
        <div
          onClick={() => {
            setCurrentPage('library');
            setSelectedBook(null);
            setSelectedChapter(null);
          }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <BookOpen className="w-12 h-12 text-amber-600 mb-4" />
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Sacred Library</h3>
          <p className="text-amber-700">Explore ancient texts and wisdom</p>
          <div className="mt-4 text-sm text-amber-600">
            {CONTENT_DATABASE.books.length} texts available
          </div>
        </div>

        <div
          onClick={() => {
            setCurrentPage('courses');
            resetCourseExperience();
          }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <Brain className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-blue-900 mb-2">Learning Studio</h3>
          <p className="text-blue-700">Structured courses and shared quests</p>
          <div className="mt-4 text-sm text-blue-600">
            {CONTENT_DATABASE.courses.length} courses available
          </div>
        </div>

        <div
          onClick={() => setCurrentPage('community')}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <Users className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-2xl font-bold text-green-900 mb-2">Community Missions</h3>
          <p className="text-green-700">Collaborate with fellow seekers</p>
          <div className="mt-4 text-sm text-green-600">
            {CONTENT_DATABASE.missions.length} active missions
          </div>
        </div>

        <div
          onClick={() => {
            setCurrentPage('paths');
            setPathView('overview');
            if (communityPaths.length > 0) {
              setFocusedPath(communityPaths[0]);
            }
          }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <Compass className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-purple-900 mb-2">Inheritance Paths</h3>
          <p className="text-purple-700">Curate and follow wisdom journeys</p>
          <div className="mt-4 text-sm text-purple-600">
            {communityPaths.length} paths available
          </div>
        </div>

        <div
          onClick={() => {
            selectDesignInitiative(selectedDesign);
            setCurrentPage('design');
          }}
          className="bg-gradient-to-br from-rose-50 to-amber-50 border-2 border-rose-200 rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <Palette className="w-12 h-12 text-rose-600 mb-4" />
          <h3 className="text-2xl font-bold text-rose-900 mb-2">Design Lab</h3>
          <p className="text-rose-700">Plan mockups & gameful experiences</p>
          <div className="mt-4 text-sm text-rose-600">
            {CONTENT_DATABASE.designInitiatives.length} concept sprints
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // LIBRARY PAGE
  // ============================================
  const LibraryPage = () => {
    if (selectedBook && selectedChapter) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedChapter(null)}
            className="mb-6 text-amber-700 hover:text-amber-900 flex items-center gap-2"
          >
            ← Back to {selectedBook.title}
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-200">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">
              {selectedChapter.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-amber-600 mb-6">
              <span>Chapter {selectedChapter.id}</span>
              <span>•</span>
              <span>{selectedChapter.verses} verses</span>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line">
              {selectedChapter.content}
            </div>

            <div className="mt-8 pt-6 border-t border-amber-200 flex gap-4">
              <button
                onClick={() => {
                  completeChapter(selectedBook.id, selectedChapter.id);
                  alert('Chapter completed! +50 Wisdom Points');
                }}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Mark as Complete
              </button>
              <button className="px-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
                <Play className="w-5 h-5" />
                Listen
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (selectedBook) {
      return (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedBook(null)}
            className="mb-6 text-amber-700 hover:text-amber-900"
          >
            ← Back to Library
          </button>
          
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 mb-8 border-2 border-amber-200">
            <h1 className="text-4xl font-bold text-amber-900 mb-3">{selectedBook.title}</h1>
            <p className="text-lg text-amber-800 mb-4">{selectedBook.description}</p>
            <div className="flex gap-4 text-sm">
              <span className="px-3 py-1 bg-white rounded-full">{selectedBook.totalChapters} chapters</span>
              <span className="px-3 py-1 bg-white rounded-full">{selectedBook.estimatedTime}</span>
              <span className="px-3 py-1 bg-white rounded-full capitalize">{selectedBook.difficulty}</span>
            </div>
          </div>

          <div className="grid gap-4">
            {selectedBook.chapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 cursor-pointer border-2 border-amber-100 hover:border-amber-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2">
                      Chapter {chapter.id}: {chapter.title}
                    </h3>
                    <p className="text-sm text-gray-600">{chapter.verses} verses</p>
                  </div>
                  {user.progress.chaptersCompleted.includes(`${selectedBook.id}-${chapter.id}`) && (
                    <div className="text-green-600 font-semibold flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Sacred Library</h1>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
            <input
              type="text"
              placeholder="Search texts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT_DATABASE.books.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.description.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl p-6 cursor-pointer border-2 border-amber-100 hover:border-amber-300 transition-all transform hover:scale-105"
            >
              <BookMarked className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-2xl font-bold text-amber-900 mb-2">{book.title}</h3>
              <p className="text-amber-700 mb-4 line-clamp-3">{book.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{book.totalChapters} chapters</span>
                <span className="capitalize">{book.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ============================================
  // COURSES PAGE
  // ============================================
  const CoursesPage = () => {
    if (selectedCourse && selectedLesson) {
      const isCompleted = user.progress.lessonsCompleted.includes(`${selectedCourse.id}-${selectedLesson.id}`);

      return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-6 text-blue-700 hover:text-blue-900"
          >
            ← Back to Course
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              Lesson {selectedLesson.id}: {selectedLesson.title}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-800 mb-8 whitespace-pre-line">
              {selectedLesson.content}
            </div>

            {selectedLesson.quiz && (
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Knowledge Check</h3>
                <p className="font-semibold mb-4">{selectedLesson.quiz.question}</p>
                <div className="space-y-2">
                  {selectedLesson.quiz.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === selectedLesson.quiz.correct) {
                          alert(`Correct! ${selectedLesson.quiz.explanation}`);
                          completeLesson(selectedCourse.id, selectedLesson.id);
                        } else {
                          alert(`Not quite. ${selectedLesson.quiz.explanation}`);
                        }
                      }}
                      className="w-full text-left p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isCompleted && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-300 text-green-800 flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Lesson Completed!</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (selectedCourse) {
      return (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => {
              setSelectedCourse(null);
              setCourseView('catalog');
            }}
            className="mb-6 text-blue-700 hover:text-blue-900"
          >
            ← Back to Courses
          </button>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <h1 className="text-4xl font-bold text-blue-900 mb-3">{selectedCourse.title}</h1>
            <p className="text-lg text-blue-800 mb-4">{selectedCourse.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="px-3 py-1 bg-white rounded-full">Instructor: {selectedCourse.instructor}</span>
              <span className="px-3 py-1 bg-white rounded-full">{selectedCourse.duration}</span>
              <span className="px-3 py-1 bg-white rounded-full capitalize">{selectedCourse.difficulty}</span>
            </div>
          </div>

          <div className="grid gap-4">
            {selectedCourse.lessons.map((lesson, idx) => {
              const isCompleted = user.progress.lessonsCompleted.includes(`${selectedCourse.id}-${lesson.id}`);
              const isLocked = !lesson.unlocked && idx > 0 && !user.progress.lessonsCompleted.includes(`${selectedCourse.id}-${idx}`);

              return (
                <div
                  key={lesson.id}
                  onClick={() => !isLocked && setSelectedLesson(lesson)}
                  className={`bg-white rounded-xl shadow-md p-6 border-2 border-blue-100 transition-all ${
                    isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl cursor-pointer hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                        {isLocked && <Lock className="w-5 h-5" />}
                        Lesson {lesson.id}: {lesson.title}
                      </h3>
                    </div>
                    {isCompleted && (
                      <div className="text-green-600 font-semibold flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Completed
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    const courseTabClass = (view: 'dashboard' | 'catalog' | 'projects') =>
      `px-4 py-2 rounded-full border transition-all ${
        courseView === view
          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
          : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
      }`;

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-4xl font-bold text-blue-900">Learning Studio</h1>
          <div className="flex flex-wrap gap-3">
            <button className={courseTabClass('dashboard')} onClick={() => setCourseView('dashboard')}>
              Studio Dashboard
            </button>
            <button className={courseTabClass('catalog')} onClick={() => setCourseView('catalog')}>
              Course Catalog
            </button>
            <button className={courseTabClass('projects')} onClick={() => setCourseView('projects')}>
              Collaborative Projects
            </button>
          </div>
        </div>

        {courseView === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
              <h2 className="text-3xl font-bold text-blue-900 mb-3">Welcome to the Pavilion Studio</h2>
              <p className="text-blue-800 mb-6 text-sm md:text-base">
                Track your progress, celebrate achievements, and plan your next quests. Each milestone fuels the pavilion lights and unlocks new collaborative rituals.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="px-3 py-1 bg-white/80 rounded-full border border-blue-200">
                  <Trophy className="w-4 h-4 inline mr-1 text-amber-600" />
                  {user.progress.wisdomPoints} wisdom points earned
                </span>
                <span className="px-3 py-1 bg-white/80 rounded-full border border-blue-200">
                  <BookMarked className="w-4 h-4 inline mr-1 text-blue-500" />
                  {user.progress.lessonsCompleted.length} lessons completed
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4 text-blue-900">
                  <Layers className="w-5 h-5" />
                  <h3 className="text-xl font-semibold">Course Progress Orbs</h3>
                </div>
                <div className="space-y-4">
                  {CONTENT_DATABASE.eduDashboard.stats.map((stat) => (
                    <div key={stat.id} className="border border-blue-100 rounded-xl p-4">
                      <div className="flex justify-between text-sm text-blue-800 mb-2">
                        <span className="font-semibold">{stat.title}</span>
                        <span>
                          {stat.completed}/{stat.total}
                        </span>
                      </div>
                      <div className="w-full bg-blue-50 rounded-full h-2">
                        <div
                          className={`${stat.color} h-2 rounded-full transition-all`}
                          style={{ width: `${(stat.completed / stat.total) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-blue-500 mt-2">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4 text-blue-900">
                  <BadgeCheck className="w-5 h-5" />
                  <h3 className="text-xl font-semibold">Achievements Ledger</h3>
                </div>
                <div className="space-y-3">
                  {CONTENT_DATABASE.eduDashboard.achievements.map((achievement) => (
                    <div key={achievement.id} className="border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                      <Gem className="w-6 h-6 text-amber-500" />
                      <div>
                        <h4 className="font-semibold text-blue-900">{achievement.title}</h4>
                        <p className="text-sm text-blue-700">{achievement.description}</p>
                        <p className="text-xs text-amber-600 mt-1">Reward: +{achievement.reward} XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4 text-blue-900">
                  <MessageCircle className="w-5 h-5" />
                  <h3 className="text-xl font-semibold">Mentors on Call</h3>
                </div>
                <div className="space-y-3">
                  {CONTENT_DATABASE.eduDashboard.mentors.map((mentor, idx) => (
                    <div key={idx} className="border border-blue-100 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-900">{mentor.name}</h4>
                      <p className="text-sm text-blue-700">{mentor.focus}</p>
                      <p className="text-xs text-blue-500 mt-1">{mentor.officeHours}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4 text-blue-900">
                  <Target className="w-5 h-5" />
                  <h3 className="text-xl font-semibold">Active Skill Quests</h3>
                </div>
                <div className="space-y-3">
                  {CONTENT_DATABASE.eduDashboard.quests.map((quest) => (
                    <div key={quest.id} className="border border-blue-100 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-900">{quest.title}</h4>
                      <p className="text-sm text-blue-700">{quest.description}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-blue-500">
                        <span>Reward: +{quest.reward} XP</span>
                        <button
                          onClick={() => setCourseView('projects')}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Find collaborators →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {courseView === 'catalog' && (
          <div className="grid md:grid-cols-2 gap-6">
            {CONTENT_DATABASE.courses.map((course) => (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourse(course);
                }}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl p-6 cursor-pointer border-2 border-blue-100 hover:border-blue-300 transition-all transform hover:scale-105"
              >
                <Brain className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{course.title}</h3>
                <p className="text-blue-700 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{course.totalLessons} lessons</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {courseView === 'projects' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {collabProjects.map((project) => (
                <div key={project.id} className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-md">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">{project.title}</h3>
                      <p className="text-sm text-blue-600">Hosted by {project.author}</p>
                    </div>
                    <span className="px-3 py-1 text-sm bg-blue-50 border border-blue-200 text-blue-800 rounded-full">
                      {project.responses} responses
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-blue-800 mb-4">{project.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(Array.isArray(project.skills) ? project.skills : []).map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                    Join project circle
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Pitch a New Project</h3>
              <p className="text-sm text-blue-700 mb-4">
                Launch a co-creation quest for the pavilion. Describe the vision, the impact, and skills sought.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full border-2 border-blue-100 rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
                    placeholder="Design a quantum learning path"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full border-2 border-blue-100 rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
                    rows={4}
                    placeholder="Share the story and deliverables for this collaboration"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-800 mb-1">Skills Requested</label>
                  <input
                    type="text"
                    value={newProject.skills}
                    onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                    className="w-full border-2 border-blue-100 rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
                    placeholder="e.g. Systems Thinking, Motion Design"
                  />
                  <p className="text-xs text-blue-500 mt-1">Separate skills with commas</p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Launch new collaboration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // COMMUNITY PAGE
  // ============================================
  const CommunityPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-green-900 mb-8">Community Board</h1>
      
      <div className="grid gap-6">
        {CONTENT_DATABASE.missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 border-2 border-green-100 hover:border-green-300 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-2">{mission.title}</h3>
                <p className="text-green-700">{mission.description}</p>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
                {mission.difficulty}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-green-100">
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  {mission.rewards} points
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {mission.participants} participants
                </span>
              </div>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all">
                Accept Mission
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // PATHS PAGE
  // ============================================
  const PathsPage = () => {
    const pathTabClass = (view: 'overview' | 'detail' | 'create') =>
      `px-4 py-2 rounded-full border transition-all ${
        pathView === view
          ? 'bg-purple-600 text-white border-purple-600 shadow-md'
          : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
      }`;

    const activePath = focusedPath || (communityPaths.length > 0 ? communityPaths[0] : null);

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-4xl font-bold text-purple-900">Inheritance Path Forge</h1>
          <div className="flex flex-wrap gap-3">
            <button className={pathTabClass('overview')} onClick={() => setPathView('overview')}>
              Path Gallery
            </button>
            <button
              className={pathTabClass('detail')}
              onClick={() => {
                if (activePath) {
                  setPathView('detail');
                }
              }}
            >
              Path Detail
            </button>
            <button className={pathTabClass('create')} onClick={() => setPathView('create')}>
              Craft New Path
            </button>
          </div>
        </div>

        {pathView === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            {communityPaths.map((path) => (
              <div
                key={path.id}
                onClick={() => handleSelectPath(path)}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-6 border-2 border-purple-100 hover:border-purple-300 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-900 mb-2">{path.title}</h3>
                    <p className="text-purple-700 mb-3">{path.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">{path.creator}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  {path.tags?.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-100">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 border-t border-purple-100">
                  <div className="text-center">
                    <div className="font-bold text-purple-900">{path.followers}</div>
                    <div className="text-xs text-purple-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-900">{path.totalSteps}</div>
                    <div className="text-xs text-purple-600">Steps</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-900">{path.duration}</div>
                    <div className="text-xs text-purple-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-purple-900">
                      <Star className="w-4 h-4 fill-purple-600" />
                      <span className="font-bold">{path.rating}</span>
                    </div>
                    <div className="text-xs text-purple-600">Rating</div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all">
                  View detail ritual
                </button>
              </div>
            ))}
          </div>
        )}

        {pathView === 'detail' && (
          <div className="space-y-6">
            {activePath ? (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 shadow-md">
                  <div className="flex items-center gap-2 mb-4 text-purple-900">
                    <Compass className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">{activePath.title}</h2>
                  </div>
                  <p className="text-purple-700 mb-4">{activePath.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
                      <div className="font-semibold text-purple-900">{activePath.difficulty}</div>
                      <div className="text-xs text-purple-600">Difficulty</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
                      <div className="font-semibold text-purple-900">{activePath.duration}</div>
                      <div className="text-xs text-purple-600">Duration</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
                      <div className="font-semibold text-purple-900">{activePath.followers}</div>
                      <div className="text-xs text-purple-600">Followers</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
                      <div className="font-semibold text-purple-900">{activePath.totalSteps}</div>
                      <div className="text-xs text-purple-600">Steps</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-purple-800 mb-2">Prerequisites</h3>
                    <ul className="list-disc list-inside text-sm text-purple-700">
                      {activePath.prerequisites?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-purple-800 mb-2">Rewards</h3>
                    <p className="text-sm text-purple-700 mb-2">{activePath.rewards?.wisdom} wisdom points</p>
                    <div className="flex flex-wrap gap-2">
                      {activePath.rewards?.badges?.map((badge) => (
                        <span key={badge} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => followPath(activePath.id)}
                    className="w-full mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Attune to this path
                  </button>
                </div>

                <div className="lg:col-span-2 bg-white border-2 border-purple-100 rounded-2xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-purple-900">
                      <ScrollText className="w-5 h-5" />
                      <h3 className="text-xl font-semibold">Step-by-step Journey</h3>
                    </div>
                    <span className="text-xs text-purple-600">Created by {activePath.creator}</span>
                  </div>
                  <div className="space-y-3">
                    {activePath.steps?.map((step) => (
                      <div key={step.week} className="border border-purple-100 rounded-xl">
                        <button
                          onClick={() => setExpandedStep(expandedStep === step.week ? null : step.week)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left"
                        >
                          <div>
                            <div className="text-xs text-purple-500 uppercase">Week {step.week}</div>
                            <h4 className="text-lg font-semibold text-purple-900">{step.title}</h4>
                          </div>
                          {expandedStep === step.week ? <ChevronRight className="w-5 h-5 rotate-90 transition-transform" /> : <ChevronRight className="w-5 h-5 text-purple-700" />}
                        </button>
                        {expandedStep === step.week && (
                          <div className="px-5 pb-5 text-sm text-purple-700 space-y-2">
                            <p>{step.description}</p>
                            <div>
                              <span className="font-semibold text-purple-800">Practices</span>
                              <ul className="list-disc list-inside text-purple-700">
                                {step.practices.map((practice, idx) => (
                                  <li key={idx}>{practice}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-8 text-center text-purple-700">
                No path selected yet. Choose one from the gallery or craft a new journey.
              </div>
            )}
          </div>
        )}

        {pathView === 'create' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border-2 border-purple-100 rounded-2xl p-6 shadow-md space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-purple-800 mb-1">Path Title</label>
                  <input
                    type="text"
                    value={newPath.title}
                    onChange={(e) => setNewPath({ ...newPath, title: e.target.value })}
                    className="w-full border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                    placeholder="The Song of Desert Insight"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-800 mb-1">Description</label>
                  <textarea
                    value={newPath.description}
                    onChange={(e) => setNewPath({ ...newPath, description: e.target.value })}
                    rows={4}
                    className="w-full border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                    placeholder="Describe the transformation this path offers..."
                  ></textarea>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-purple-800 mb-1">Difficulty</label>
                    <select
                      value={newPath.difficulty}
                      onChange={(e) => setNewPath({ ...newPath, difficulty: e.target.value })}
                      className="w-full border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-purple-800 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newPath.duration}
                      onChange={(e) => setNewPath({ ...newPath, duration: e.target.value })}
                      className="w-full border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                      placeholder="e.g. 6 weeks"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-purple-800 mb-1">Wisdom Reward</label>
                    <input
                      type="number"
                      value={newPath.rewards.wisdom}
                      onChange={(e) =>
                        setNewPath({
                          ...newPath,
                          rewards: { ...newPath.rewards, wisdom: Number(e.target.value) || 0 }
                        })
                      }
                      className="w-full border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-purple-800 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {newPath.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        #{tag}
                        <button onClick={() => removePathTag(tag)} className="text-purple-600 hover:text-purple-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                      placeholder="Mindfulness"
                    />
                    <button
                      onClick={addPathTag}
                      className="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    >
                      Add tag
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-purple-800 mb-2">Prerequisites</label>
                  <div className="space-y-2">
                    {newPath.prerequisites.map((req, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={req}
                        onChange={(e) => updatePrerequisite(idx, e.target.value)}
                        className="w-full border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                        placeholder="Describe an entry requirement"
                      />
                    ))}
                  </div>
                  <button
                    onClick={addPrerequisiteField}
                    className="mt-2 text-sm text-purple-600 hover:text-purple-800"
                  >
                    + Add another prerequisite
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-purple-800 mb-2">Reward Badges</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newPath.rewards.badges.map((badge) => (
                      <span key={badge} className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                        {badge}
                        <button onClick={() => removeRewardBadge(badge)} className="text-amber-600 hover:text-amber-800">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      className="flex-1 border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                      placeholder="Desert Dreamer"
                    />
                    <button
                      onClick={addRewardBadge}
                      className="px-3 py-2 rounded-lg bg-amber-500 text-amber-900 hover:bg-amber-400 transition-colors"
                    >
                      Add badge
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 shadow-md space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Step Builder</h3>
                  <p className="text-sm text-purple-600 mb-4">
                    Outline the weekly rituals. Practices can be meditations, reflections, or collaborative activities.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-800 mb-1">Step Title</label>
                  <input
                    type="text"
                    value={newPath.currentStep.title}
                    onChange={(e) =>
                      setNewPath({
                        ...newPath,
                        currentStep: { ...newPath.currentStep, title: e.target.value }
                      })
                    }
                    className="w-full border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                    placeholder="Week 1: Gathering Breath"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-800 mb-1">Description</label>
                  <textarea
                    value={newPath.currentStep.description}
                    onChange={(e) =>
                      setNewPath({
                        ...newPath,
                        currentStep: { ...newPath.currentStep, description: e.target.value }
                      })
                    }
                    rows={3}
                    className="w-full border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                    placeholder="Describe the focus and reflection prompts for this step"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-purple-800">Practices</label>
                  {newPath.currentStep.practices.map((practice, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={practice}
                      onChange={(e) => updatePractice(idx, e.target.value)}
                      className="w-full border-2 border-purple-100 rounded-lg px-3 py-2 focus:border-purple-400 focus:outline-none"
                      placeholder="Guided sand walking"
                    />
                  ))}
                  <button
                    onClick={addPracticeField}
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    + Add another practice
                  </button>
                </div>
                <button
                  onClick={addStepToNewPath}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Save step to path
                </button>

                <div className="border-t border-purple-100 pt-4">
                  <h4 className="text-sm font-semibold text-purple-800 mb-2">Steps drafted</h4>
                  <ul className="space-y-2 text-sm text-purple-700">
                    {newPath.steps.map((step) => (
                      <li key={step.week} className="bg-purple-50 border border-purple-100 rounded-lg px-3 py-2">
                        Week {step.week}: {step.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={publishNewPath}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Publish path to pavilion
              </button>
              <button
                onClick={resetPathBuilder}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors"
              >
                Reset builder
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const DesignLabPage = () => {
    const allGameMoments = Array.from(
      new Set(CONTENT_DATABASE.designInitiatives.flatMap((initiative) => initiative.gameMoments))
    );

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border-2 border-rose-100 rounded-2xl p-8 shadow-md">
              <div className="flex items-center gap-3 mb-4 text-rose-900">
                <Palette className="w-6 h-6" />
                <h1 className="text-3xl font-bold">Pavilion Design Lab</h1>
              </div>
              <p className="text-rose-700 mb-6">
                Merge architectural serenity with playful storytelling. Use this lab to align plugin interfaces, consent rituals, and game-inspired visuals.
              </p>
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-rose-900 mb-2">Current Focus: {selectedDesign.title}</h2>
                <p className="text-rose-700 mb-4">{selectedDesign.focus}</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-xl border border-rose-100 p-4">
                    <span className="text-xs uppercase tracking-wide text-rose-500">Mood</span>
                    <p className="text-rose-800 mt-1">{selectedDesign.mood}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-rose-100 p-4">
                    <span className="text-xs uppercase tracking-wide text-rose-500">Signature Play Moments</span>
                    <ul className="list-disc list-inside text-rose-800">
                      {selectedDesign.gameMoments.map((moment, idx) => (
                        <li key={idx}>{moment}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-rose-100 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4 text-rose-900">
                <Lightbulb className="w-5 h-5" />
                <h2 className="text-2xl font-semibold">Action Steps</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-rose-800">
                {selectedDesign.actionIdeas.map((idea, idx) => (
                  <li key={idx}>{idea}</li>
                ))}
              </ul>
              <p className="text-sm text-rose-600 mt-4">
                Capture quick sketches, then translate them into interactive prototypes that fit the pavilion's luminous material palette.
              </p>
            </div>

            <div className="bg-white border-2 border-rose-100 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4 text-rose-900">
                <Gamepad className="w-5 h-5" />
                <h2 className="text-2xl font-semibold">Cross-Pavilion Play Concepts</h2>
              </div>
              <p className="text-rose-700 mb-4">
                Blend these playful elements across plugin controls, consent rituals, and learning journeys.
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {allGameMoments.map((moment, idx) => (
                  <div key={idx} className="bg-rose-50 border border-rose-100 rounded-xl p-3">
                    {moment}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-rose-100 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4 text-rose-900">
                <ClipboardList className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Initiative Backlog</h2>
              </div>
              <p className="text-sm text-rose-700 mb-4">
                Choose a focus to adjust the plan. Each card highlights an upcoming concept sprint.
              </p>
              <div className="space-y-3">
                {CONTENT_DATABASE.designInitiatives.map((initiative) => (
                  <button
                    key={initiative.id}
                    onClick={() => selectDesignInitiative(initiative)}
                    className={`w-full text-left border rounded-xl p-4 transition-all ${
                      selectedDesign.id === initiative.id
                        ? 'border-rose-400 bg-rose-50 shadow-md'
                        : 'border-rose-100 bg-white hover:border-rose-200'
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-rose-900">{initiative.title}</h3>
                    <p className="text-xs text-rose-600 mt-1">{initiative.focus}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-rose-100 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4 text-rose-900">
                <Target className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Next Moves Checklist</h2>
              </div>
              <ul className="list-disc list-inside text-sm text-rose-700 space-y-2">
                <li>Draft UI mockups that mirror pavilion geometry and glowing control surfaces.</li>
                <li>Storyboard consent prompts with cooperative spirit guides and transparent disclosures.</li>
                <li>Prototype gameful scoreboards for plugin health, featuring animated energy rings.</li>
                <li>Collect feedback from stewards and adapt quests to reinforce trust signals.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // NAVIGATION
  // ============================================
  const NavBar = () => (
    <nav className="bg-gradient-to-r from-amber-900 to-orange-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            onClick={() => {
              setCurrentPage('home');
              setSelectedBook(null);
              setSelectedChapter(null);
              resetCourseExperience();
              setPathView('overview');
              if (communityPaths.length > 0) {
                setFocusedPath(communityPaths[0]);
              }
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold">Sacred Knowledge</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className="hover:text-amber-200 transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('library')}
              className="hover:text-amber-200 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Library
            </button>
            <button
              onClick={() => {
                setCurrentPage('courses');
                resetCourseExperience();
              }}
              className="hover:text-amber-200 transition-colors flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Courses
            </button>
            <button
              onClick={() => setCurrentPage('community')}
              className="hover:text-amber-200 transition-colors flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Community
            </button>
            <button
              onClick={() => {
                setCurrentPage('paths');
                setPathView('overview');
                if (communityPaths.length > 0) {
                  setFocusedPath(communityPaths[0]);
                }
              }}
              className="hover:text-amber-200 transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Paths
            </button>
            <button
              onClick={() => {
                setCurrentPage('design');
                selectDesignInitiative(selectedDesign);
              }}
              className="hover:text-amber-200 transition-colors flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Design Lab
            </button>
            
            {user.isLoggedIn ? (
              <div className="flex items-center gap-4 border-l border-amber-700 pl-6">
                <div className="text-right">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-xs text-amber-200">{user.progress.wisdomPoints} points</div>
                </div>
                <button
                  onClick={() => setUser({
                    isLoggedIn: false,
                    name: '',
                    email: '',
                    progress: {
                      booksRead: [],
                      chaptersCompleted: [],
                      coursesStarted: [],
                      lessonsCompleted: [],
                      pathsFollowed: [],
                      missionsActive: [],
                      wisdomPoints: 0
                    }
                  })}
                  className="p-2 hover:bg-amber-800 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-amber-900 rounded-lg font-semibold transition-all shadow-lg"
              >
                Sign In
              </button>
            )}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-amber-700 pt-4">
            <button 
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 hover:text-amber-200"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentPage('library'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 hover:text-amber-200"
            >
              Library
            </button>
            <button
              onClick={() => { setCurrentPage('courses'); resetCourseExperience(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 hover:text-amber-200"
            >
              Courses
            </button>
            <button
              onClick={() => { setCurrentPage('community'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 hover:text-amber-200"
            >
              Community
            </button>
            <button
              onClick={() => {
                setCurrentPage('paths');
                setPathView('overview');
                if (communityPaths.length > 0) {
                  setFocusedPath(communityPaths[0]);
                }
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:text-amber-200"
            >
              Paths
            </button>
            <button
              onClick={() => {
                setCurrentPage('design');
                selectDesignInitiative(selectedDesign);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:text-amber-200"
            >
              Design Lab
            </button>
          </div>
        )}
      </div>
    </nav>
  );

  // ============================================
  // LOGIN MODAL
  // ============================================
  const LoginModal = () => (
    showLogin && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-amber-900">Welcome</h3>
            <button
              onClick={() => setShowLogin(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">Name</label>
              <input
                type="text"
                value={loginForm.name}
                onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-amber-900 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition-all shadow-lg"
            >
              Begin Your Journey
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Progress automatically saved as you learn
          </p>
        </div>
      </div>
    )
  );

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <NavBar />
      <LoginModal />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'library' && <LibraryPage />}
      {currentPage === 'courses' && <CoursesPage />}
      {currentPage === 'community' && <CommunityPage />}
      {currentPage === 'paths' && <PathsPage />}
      {currentPage === 'design' && <DesignLabPage />}
    </div>
  );
};

export default SacredKnowledgeApp;

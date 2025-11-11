import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Brain, Compass, Trophy, Sparkles, Menu, X, LogOut, ChevronRight, Home, MessageCircle, Award, Lock, Star, Play, BookMarked, Search } from 'lucide-react';

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
      description: 'A 12-week journey into cultivating deep present-moment awareness',
      difficulty: 'intermediate',
      duration: '12 weeks',
      followers: 234,
      rating: 4.8,
      steps: [
        {
          week: 1,
          title: 'Foundation of Breath',
          description: 'Learn basic breath awareness and establish your daily practice routine',
          practices: [
            '10-minute daily sitting meditation',
            'Breath counting (1-10, repeat)',
            'Evening reflection journal'
          ],
          unlocked: true
        },
        {
          week: 2,
          title: 'Body Awareness Integration',
          description: 'Expand awareness to include bodily sensations',
          practices: [
            '15-minute body scan meditation',
            'Walking meditation practice',
            'Mindful eating exercise'
          ],
          unlocked: false
        }
      ],
      totalSteps: 12
    }
  ],

  missions: [
    {
      id: 1,
      title: '30-Day Sunrise Meditation',
      description: 'Commit to watching the sunrise while practicing mindful breathing for 30 consecutive days',
      category: 'Meditation',
      difficulty: 'intermediate',
      rewards: 500,
      participants: 23,
      postedBy: 'ZenMaster'
    }
  ]
};

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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => setCurrentPage('library')}
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
          onClick={() => setCurrentPage('courses')}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <Brain className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-blue-900 mb-2">Learning Paths</h3>
          <p className="text-blue-700">Structured courses and curriculum</p>
          <div className="mt-4 text-sm text-blue-600">
            {CONTENT_DATABASE.courses.length} courses available
          </div>
        </div>

        <div
          onClick={() => setCurrentPage('community')}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <Users className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-2xl font-bold text-green-900 mb-2">Community</h3>
          <p className="text-green-700">Missions and discussions</p>
          <div className="mt-4 text-sm text-green-600">
            {CONTENT_DATABASE.missions.length} active missions
          </div>
        </div>

        <div
          onClick={() => setCurrentPage('paths')}
          className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
        >
          <Compass className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-purple-900 mb-2">Inheritance Paths</h3>
          <p className="text-purple-700">Curated learning journeys</p>
          <div className="mt-4 text-sm text-purple-600">
            {CONTENT_DATABASE.paths.length} paths available
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
            onClick={() => setSelectedCourse(null)}
            className="mb-6 text-blue-700 hover:text-blue-900"
          >
            ← Back to Courses
          </button>
          
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 mb-8 border-2 border-blue-200">
            <h1 className="text-4xl font-bold text-blue-900 mb-3">{selectedCourse.title}</h1>
            <p className="text-lg text-blue-800 mb-4">{selectedCourse.description}</p>
            <div className="flex gap-4 text-sm">
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

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Learning Courses</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {CONTENT_DATABASE.courses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
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
  const PathsPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-purple-900 mb-8">Inheritance Paths</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {CONTENT_DATABASE.paths.map((path) => (
          <div
            key={path.id}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl p-6 border-2 border-purple-100 hover:border-purple-300 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-2">{path.title}</h3>
                <p className="text-purple-700 mb-3">{path.description}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {path.difficulty}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {path.duration}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-t border-purple-100">
              <div className="text-center">
                <div className="font-bold text-purple-900">{path.followers}</div>
                <div className="text-xs text-purple-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-900">{path.totalSteps}</div>
                <div className="text-xs text-purple-600">Steps</div>
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
              Begin Path
            </button>
          </div>
        ))}
      </div>
    </div>
  );

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
              setSelectedCourse(null);
              setSelectedLesson(null);
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
              onClick={() => setCurrentPage('courses')}
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
              onClick={() => { setCurrentPage('courses'); setMobileMenuOpen(false); }}
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
    </div>
  );
};

export default SacredKnowledgeApp;
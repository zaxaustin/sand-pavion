import React, { useState } from 'react';
import { BookOpen, User, Home, Menu, X, Play, BookMarked, TrendingUp, Sparkles } from 'lucide-react';

export default function SpiritualLibrary() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const rooms = [
    { id: 'hinduism', name: 'Hinduism', color: 'bg-orange-500', books: ['Bhagavad Gita', 'Upanishads', 'Vedas'] },
    { id: 'buddhism', name: 'Buddhism', color: 'bg-yellow-500', books: ['Dhammapada', 'Heart Sutra', 'Tibetan Book of the Dead'] },
    { id: 'comparative', name: 'Comparative Studies', color: 'bg-purple-500', books: ['Perennial Philosophy', 'World Religions', 'Mysticism East and West'] },
    { id: 'meditation', name: 'Meditation & Practice', color: 'bg-blue-500', books: ['Mindfulness Guide', 'Pranayama Techniques', 'Zen Practice'] }
  ];

  const tracks = [
    { level: 'Beginner', description: 'Introduction to Eastern Philosophy', lessons: 8 },
    { level: 'Intermediate', description: 'Deep Dive into Sacred Texts', lessons: 12 },
    { level: 'Advanced', description: 'Comparative Analysis & Practice', lessons: 15 }
  ];

  const aiPlugins = [
    {
      id: 'summary-scribe',
      title: 'Scribe of Echoes',
      purpose: 'Summarizes key passages and composes luminous recaps to close each study vigil.',
      rituals: [
        'Highlight a paragraph and request a three-sentence retelling anchored to guild lore.',
        'Schedule end-of-session reflections that gather questions for the next circle.',
        'Export offline-friendly summaries that can be stored with the steward archives.'
      ]
    },
    {
      id: 'koan-weaver',
      title: 'Koan Weaver',
      purpose: "Transforms readings into gentle, layered prompts that mimic a mentor's inquiry.",
      rituals: [
        'Offer one warm-up question, one paradox, and one action challenge per excerpt.',
        'Track which prompts a visitor resolves to adapt the next session’s depth.',
        'Blend multiple traditions to show the resonance between guild rooms.'
      ]
    },
    {
      id: 'guardian-of-voices',
      title: 'Guardian of Voices',
      purpose: 'Validates pronunciations and phonetic hints before a TTS session begins.',
      rituals: [
        'Surface transliteration notes for Sanskrit, Pāli, and Classical Chinese terms.',
        'Preview the speech synthesis voice and allow a visitor to tweak pacing offline.',
        'Flag verses that might require a human elder for sensitive interpretation.'
      ]
    }
  ];

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-amber-900 mb-4">Sacred Library</h1>
          <p className="text-xl text-amber-700">Journey Through Ancient Wisdom</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div 
            onClick={() => setCurrentPage('library')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-amber-200 hover:border-amber-400"
          >
            <BookOpen className="w-16 h-16 text-amber-600 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-amber-900 mb-2 text-center">Enter the Library</h2>
            <p className="text-amber-700 text-center">Explore sacred texts and ancient wisdom</p>
          </div>

          <div 
            onClick={() => setCurrentPage('tracks')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-amber-200 hover:border-amber-400"
          >
            <TrendingUp className="w-16 h-16 text-amber-600 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-amber-900 mb-2 text-center">Learning Tracks</h2>
            <p className="text-amber-700 text-center">Structured paths to deepen your understanding</p>
          </div>
        </div>

        {!isLoggedIn && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-amber-900 mb-4 text-center">Join Our Community</h3>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Sign In / Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const LibraryPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-amber-200">The Sacred Library</h2>
        
        {!selectedRoom ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`${room.color} rounded-xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl`}
              >
                <BookOpen className="w-12 h-12 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-center text-white">{room.name}</h3>
                <p className="text-center text-white/80 mt-2">{room.books.length} texts available</p>
              </div>
            ))}
          </div>
        ) : !selectedBook ? (
          <div>
            <button 
              onClick={() => setSelectedRoom(null)}
              className="mb-6 px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
            >
              ← Back to Rooms
            </button>
            <h3 className="text-3xl font-bold mb-6 text-amber-200">{selectedRoom.name}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {selectedRoom.books.map((book, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedBook(book)}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all border border-amber-400/30"
                >
                  <BookMarked className="w-8 h-8 mb-2 text-amber-300" />
                  <h4 className="text-xl font-semibold text-amber-100">{book}</h4>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <button 
              onClick={() => setSelectedBook(null)}
              className="mb-6 px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
            >
              ← Back to Books
            </button>
            <h3 className="text-3xl font-bold mb-4 text-amber-200">{selectedBook}</h3>
            <div className="bg-white/5 rounded-lg p-6 mb-4">
              <p className="text-amber-100 leading-relaxed mb-4">
                This is where the book content would be displayed. In a full implementation, 
                this would include the actual text of the sacred work, formatted for easy reading.
              </p>
              <p className="text-amber-100/80 italic">
                Features to be implemented: Text-to-speech, bookmarking, annotations, and AI discussion guide.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors">
              <Play className="w-5 h-5" />
              Listen (Text-to-Speech)
            </button>
          </div>
        )}

        <section className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl border border-amber-400/30 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-amber-200" />
            <div>
              <h3 className="text-3xl font-bold text-amber-200">AI Study Prompt Loom</h3>
              <p className="text-amber-100/80">Concept sketches for local LLM plugins that stay offline yet help each seeker reflect.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiPlugins.map((plugin) => (
              <article key={plugin.id} className="bg-black/30 rounded-xl border border-amber-200/20 p-6 flex flex-col">
                <header className="mb-4">
                  <h4 className="text-2xl font-semibold text-amber-100">{plugin.title}</h4>
                  <p className="text-amber-100/70 text-sm uppercase tracking-wide">{plugin.purpose}</p>
                </header>
                <ul className="space-y-3 text-amber-50/80 text-sm flex-1">
                  {plugin.rituals.map((ritual, index) => (
                    <li key={index} className="bg-white/5 border border-amber-300/20 rounded-lg p-3">{ritual}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-amber-600 text-white px-4 py-2 font-medium hover:bg-amber-700 transition"
                >
                  Mark for Local Prototype
                </button>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-amber-100/70">
            Implementation note: each module will point to a local LLM service exposed via the Companion Artificers’ plugin API. The scaffolding here describes the prompt choreography so engineers can map UI events to offline inference hooks in a later sprint.
          </p>
        </section>
      </div>
    </div>
  );

  const TracksPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-indigo-900">Learning Tracks</h2>
        <div className="space-y-6">
          {tracks.map((track, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-8 border-2 border-indigo-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-indigo-900">{track.level}</h3>
                <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
                  {track.lessons} Lessons
                </span>
              </div>
              <p className="text-indigo-700 mb-4">{track.description}</p>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Start Track
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MemberPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-900">Member Area</h2>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h3 className="text-2xl font-bold text-teal-900 mb-4">Profile</h3>
          <p className="text-teal-700 mb-2"><strong>Name:</strong> Seeker</p>
          <p className="text-teal-700 mb-2"><strong>Path:</strong> Comparative Studies</p>
          <p className="text-teal-700"><strong>Books Read:</strong> 12</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h3 className="text-2xl font-bold text-teal-900 mb-4">Reading List</h3>
          <ul className="space-y-2 text-teal-700">
            <li>• Bhagavad Gita - In Progress (45%)</li>
            <li>• Dhammapada - Completed</li>
            <li>• Heart Sutra - Not Started</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-teal-900 mb-4">Reflection Journal</h3>
          <textarea 
            placeholder="Write your reflections here..."
            className="w-full h-32 p-4 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <nav className="bg-amber-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <BookOpen className="w-8 h-8" />
              <span className="text-xl font-bold">Sacred Library</span>
            </div>
            
            <div className="hidden md:flex gap-6">
              <button onClick={() => setCurrentPage('home')} className="hover:text-amber-200 transition-colors flex items-center gap-2">
                <Home className="w-5 h-5" /> Home
              </button>
              <button onClick={() => setCurrentPage('library')} className="hover:text-amber-200 transition-colors flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Library
              </button>
              <button onClick={() => setCurrentPage('tracks')} className="hover:text-amber-200 transition-colors flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Tracks
              </button>
              {isLoggedIn && (
                <button onClick={() => setCurrentPage('member')} className="hover:text-amber-200 transition-colors flex items-center gap-2">
                  <User className="w-5 h-5" /> Profile
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
            <div className="md:hidden pb-4 space-y-2">
              <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-200">
                Home
              </button>
              <button onClick={() => { setCurrentPage('library'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-200">
                Library
              </button>
              <button onClick={() => { setCurrentPage('tracks'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-200">
                Tracks
              </button>
              {isLoggedIn && (
                <button onClick={() => { setCurrentPage('member'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-amber-200">
                  Profile
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'library' && <LibraryPage />}
      {currentPage === 'tracks' && <TracksPage />}
      {currentPage === 'member' && <MemberPage />}
    </div>
  );
}
import React, { useState } from 'react';
import { Scroll, MessageCircle, Star, Award, Plus, Search, Filter } from 'lucide-react';

const SandPavilionBoard = () => {
  const [activeTab, setActiveTab] = useState('missions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showNewMissionForm, setShowNewMissionForm] = useState(false);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);

  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "30-Day Sunrise Meditation",
      description: "Commit to watching the sunrise while practicing mindful breathing for 30 consecutive days",
      category: "Meditation",
      difficulty: "Intermediate",
      rewards: 500,
      participants: 23,
      postedBy: "ZenMaster",
      timePosted: "2 days ago"
    },
    {
      id: 2,
      title: "Walk the Labyrinth Path",
      description: "Create or find a labyrinth and walk it mindfully, documenting your journey and insights",
      category: "Movement",
      difficulty: "Beginner",
      rewards: 200,
      participants: 45,
      postedBy: "PathWalker",
      timePosted: "5 days ago"
    },
    {
      id: 3,
      title: "Silent Retreat Weekend",
      description: "Practice noble silence for an entire weekend, maintaining mindfulness in all activities",
      category: "Retreat",
      difficulty: "Advanced",
      rewards: 1000,
      participants: 8,
      postedBy: "SilentSage",
      timePosted: "1 week ago"
    }
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How to maintain focus during longer meditation sessions?",
      description: "I can meditate for 15 minutes easily, but when I try 30+ minutes my mind wanders constantly. Any techniques?",
      askedBy: "NewSeeker",
      category: "Meditation",
      responses: 12,
      timePosted: "3 hours ago",
      wisdom: 34
    },
    {
      id: 2,
      title: "Best practices for morning vs evening meditation?",
      description: "Is there a difference in the quality or type of meditation that works better at different times of day?",
      askedBy: "DawnDreamer",
      category: "Practice",
      responses: 8,
      timePosted: "1 day ago",
      wisdom: 56
    },
    {
      id: 3,
      title: "Dealing with physical discomfort in lotus position",
      description: "My knees hurt after 10 minutes. Should I push through or find alternative positions?",
      askedBy: "FlexibleMind",
      category: "Body",
      responses: 15,
      timePosted: "2 days ago",
      wisdom: 89
    }
  ]);

  const [newMission, setNewMission] = useState({
    title: '',
    description: '',
    category: 'Meditation',
    difficulty: 'Beginner'
  });

  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    category: 'Meditation'
  });

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-700 border-green-300',
    Intermediate: 'bg-amber-100 text-amber-700 border-amber-300',
    Advanced: 'bg-red-100 text-red-700 border-red-300'
  };

  const categoryIcons = {
    Meditation: '🧘',
    Movement: '🚶',
    Retreat: '⛰️',
    Practice: '📿',
    Body: '🌸',
    Mind: '🧠'
  };

  const handleAddMission = () => {
    if (newMission.title && newMission.description) {
      const mission = {
        id: missions.length + 1,
        ...newMission,
        rewards: newMission.difficulty === 'Beginner' ? 200 : newMission.difficulty === 'Intermediate' ? 500 : 1000,
        participants: 0,
        postedBy: 'You',
        timePosted: 'Just now'
      };
      setMissions([mission, ...missions]);
      setNewMission({ title: '', description: '', category: 'Meditation', difficulty: 'Beginner' });
      setShowNewMissionForm(false);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.title && newQuestion.description) {
      const question = {
        id: questions.length + 1,
        ...newQuestion,
        askedBy: 'You',
        responses: 0,
        timePosted: 'Just now',
        wisdom: 0
      };
      setQuestions([question, ...questions]);
      setNewQuestion({ title: '', description: '', category: 'Meditation' });
      setShowNewQuestionForm(false);
    }
  };

  const filteredMissions = missions.filter(m => 
    (filterLevel === 'all' || m.difficulty === filterLevel) &&
    (searchTerm === '' || m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     m.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredQuestions = questions.filter(q =>
    searchTerm === '' || q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-800 text-amber-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">🏜️</div>
            <div>
              <h1 className="text-4xl font-bold tracking-wide">Sand Pavilion</h1>
              <p className="text-amber-200 text-lg mt-1">Community Bulletin Board</p>
            </div>
          </div>
          <p className="text-amber-100 max-w-2xl">
            A sacred space where seekers gather to share missions, exchange wisdom, and walk the path together
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex gap-4 border-b-2 border-amber-200">
          <button
            onClick={() => setActiveTab('missions')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
              activeTab === 'missions'
                ? 'text-amber-900 border-b-4 border-amber-600 -mb-0.5'
                : 'text-amber-600 hover:text-amber-800'
            }`}
          >
            <Scroll size={20} />
            Mission Board
          </button>
          <button
            onClick={() => setActiveTab('exchange')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
              activeTab === 'exchange'
                ? 'text-amber-900 border-b-4 border-amber-600 -mb-0.5'
                : 'text-amber-600 hover:text-amber-800'
            }`}
          >
            <MessageCircle size={20} />
            Knowledge Exchange
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mt-6 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" size={20} />
            <input
              type="text"
              placeholder={activeTab === 'missions' ? 'Search missions...' : 'Search questions...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none bg-white"
            />
          </div>
          {activeTab === 'missions' && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" size={20} />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="pl-10 pr-8 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none bg-white appearance-none cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          )}
          <button
            onClick={() => activeTab === 'missions' ? setShowNewMissionForm(true) : setShowNewQuestionForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            {activeTab === 'missions' ? 'Post Mission' : 'Ask Question'}
          </button>
        </div>

        {/* Mission Board */}
        {activeTab === 'missions' && (
          <div className="space-y-4 mb-12">
            {showNewMissionForm && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-amber-300 p-6 mb-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Post a New Mission</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Mission Title"
                    value={newMission.title}
                    onChange={(e) => setNewMission({...newMission, title: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                  <textarea
                    placeholder="Mission Description"
                    value={newMission.description}
                    onChange={(e) => setNewMission({...newMission, description: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                  <div className="flex gap-4">
                    <select
                      value={newMission.category}
                      onChange={(e) => setNewMission({...newMission, category: e.target.value})}
                      className="flex-1 px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Meditation">Meditation</option>
                      <option value="Movement">Movement</option>
                      <option value="Retreat">Retreat</option>
                      <option value="Practice">Practice</option>
                    </select>
                    <select
                      value={newMission.difficulty}
                      onChange={(e) => setNewMission({...newMission, difficulty: e.target.value})}
                      className="flex-1 px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddMission}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-all"
                    >
                      Post Mission
                    </button>
                    <button
                      onClick={() => setShowNewMissionForm(false)}
                      className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {filteredMissions.map((mission) => (
              <div
                key={mission.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-amber-100 hover:border-amber-300 p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-3xl">{categoryIcons[mission.category]}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
                        {mission.title}
                      </h3>
                      <p className="text-amber-700 mt-2 leading-relaxed">{mission.description}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full border-2 font-semibold text-sm ${difficultyColors[mission.difficulty]}`}>
                    {mission.difficulty}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-100">
                  <div className="flex items-center gap-6 text-sm text-amber-600">
                    <span className="flex items-center gap-1">
                      <Award size={16} className="text-amber-500" />
                      <strong>{mission.rewards}</strong> Wisdom Points
                    </span>
                    <span className="flex items-center gap-1">
                      👥 <strong>{mission.participants}</strong> Participants
                    </span>
                  </div>
                  <div className="text-sm text-amber-500">
                    Posted by <strong>{mission.postedBy}</strong> • {mission.timePosted}
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-amber-100 hover:bg-amber-200 text-amber-900 py-3 rounded-lg font-semibold transition-all">
                  Accept Mission
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Knowledge Exchange */}
        {activeTab === 'exchange' && (
          <div className="space-y-4 mb-12">
            {showNewQuestionForm && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-amber-300 p-6 mb-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Ask a Question</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Question Title"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                  <textarea
                    placeholder="Describe your question in detail..."
                    value={newQuestion.description}
                    onChange={(e) => setNewQuestion({...newQuestion, description: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Meditation">Meditation</option>
                    <option value="Practice">Practice</option>
                    <option value="Body">Body</option>
                    <option value="Mind">Mind</option>
                  </select>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddQuestion}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-all"
                    >
                      Post Question
                    </button>
                    <button
                      onClick={() => setShowNewQuestionForm(false)}
                      className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-amber-100 hover:border-amber-300 p-6 cursor-pointer group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{categoryIcons[question.category]}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
                        {question.title}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        <Star size={16} className="text-amber-500" />
                        <span className="font-semibold">{question.wisdom}</span>
                      </div>
                    </div>
                    <p className="text-amber-700 mt-2 leading-relaxed">{question.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-100">
                  <div className="flex items-center gap-6 text-sm text-amber-600">
                    <span className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      <strong>{question.responses}</strong> Responses
                    </span>
                    <span className="px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
                      {question.category}
                    </span>
                  </div>
                  <div className="text-sm text-amber-500">
                    Asked by <strong>{question.askedBy}</strong> • {question.timePosted}
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-amber-100 hover:bg-amber-200 text-amber-900 py-3 rounded-lg font-semibold transition-all">
                  Share Your Wisdom
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SandPavilionBoard;
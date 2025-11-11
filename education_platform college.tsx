import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Users, ChevronRight, Star, Check, Lock, Trophy, MessageSquare, Plus } from 'lucide-react';

const EduCollective = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [userProgress, setUserProgress] = useState({
    math: { completed: 0, total: 6 },
    physics: { completed: 0, total: 6 },
    history: { completed: 0, total: 6 }
  });
  const [certificates, setCertificates] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [projects, setProjects] = useState([
    { id: 1, title: "Create Educational Videos for Algebra", author: "Sarah M.", skills: ["Math", "Video Editing"], responses: 12 },
    { id: 2, title: "Develop Physics Simulation for Waves", author: "Dr. Chen", skills: ["Physics", "Programming"], responses: 8 },
    { id: 3, title: "Historical Timeline Interactive Map", author: "James R.", skills: ["History", "Design"], responses: 15 }
  ]);
  const [newProject, setNewProject] = useState({ title: '', description: '', skills: [] });

  const courses = {
    math: {
      title: "Mathematics Fundamentals",
      description: "Master the building blocks of mathematical thinking",
      color: "bg-blue-500",
      icon: "📐",
      lessons: [
        { id: 1, title: "Number Systems", content: "Understanding natural numbers, integers, rational and irrational numbers...", quiz: { question: "Which of these is a rational number?", options: ["π", "√2", "1/3", "e"], correct: 2 } },
        { id: 2, title: "Basic Algebra", content: "Variables, expressions, and solving linear equations...", quiz: { question: "What is x if 2x + 5 = 13?", options: ["3", "4", "5", "6"], correct: 1 } },
        { id: 3, title: "Geometry Basics", content: "Points, lines, angles, and basic shapes...", quiz: { question: "Sum of angles in a triangle equals:", options: ["90°", "180°", "270°", "360°"], correct: 1 } },
        { id: 4, title: "Functions", content: "Understanding mathematical functions and their properties...", quiz: { question: "If f(x) = 2x + 1, what is f(3)?", options: ["5", "6", "7", "8"], correct: 2 } },
        { id: 5, title: "Statistics Intro", content: "Mean, median, mode, and basic data analysis...", quiz: { question: "The median of [1,2,3,4,5] is:", options: ["2", "3", "4", "15"], correct: 1 } },
        { id: 6, title: "Probability", content: "Basic probability concepts and calculations...", quiz: { question: "Probability of getting heads in a fair coin flip:", options: ["0.25", "0.5", "0.75", "1"], correct: 1 } }
      ]
    },
    physics: {
      title: "Physics Principles",
      description: "Explore the fundamental laws governing our universe",
      color: "bg-green-500",
      icon: "⚡",
      lessons: [
        { id: 1, title: "Motion & Forces", content: "Newton's laws of motion and basic force concepts...", quiz: { question: "Newton's first law is also called:", options: ["Law of Action", "Law of Inertia", "Law of Gravity", "Law of Energy"], correct: 1 } },
        { id: 2, title: "Energy & Work", content: "Kinetic energy, potential energy, and work-energy theorem...", quiz: { question: "Unit of energy is:", options: ["Newton", "Joule", "Watt", "Meter"], correct: 1 } },
        { id: 3, title: "Waves & Sound", content: "Wave properties, frequency, amplitude, and sound waves...", quiz: { question: "Sound travels fastest in:", options: ["Air", "Water", "Steel", "Vacuum"], correct: 2 } },
        { id: 4, title: "Light & Optics", content: "Properties of light, reflection, refraction, and lenses...", quiz: { question: "Speed of light in vacuum is approximately:", options: ["300,000 km/s", "3,000 km/s", "30,000 km/s", "3,000,000 km/s"], correct: 0 } },
        { id: 5, title: "Electricity", content: "Electric charge, current, voltage, and basic circuits...", quiz: { question: "Unit of electric current is:", options: ["Volt", "Ohm", "Ampere", "Coulomb"], correct: 2 } },
        { id: 6, title: "Magnetism", content: "Magnetic fields, magnetic materials, and electromagnetism...", quiz: { question: "Earth's magnetic field protects us from:", options: ["Gravity", "Solar radiation", "Sound waves", "Light"], correct: 1 } }
      ]
    },
    history: {
      title: "World History",
      description: "Journey through humanity's greatest achievements and lessons",
      color: "bg-amber-500",
      icon: "🏛️",
      lessons: [
        { id: 1, title: "Ancient Civilizations", content: "Mesopotamia, Egypt, Indus Valley, and early human societies...", quiz: { question: "Which river was central to ancient Egyptian civilization?", options: ["Tigris", "Euphrates", "Nile", "Ganges"], correct: 2 } },
        { id: 2, title: "Classical Antiquity", content: "Greek philosophy, Roman Empire, and classical achievements...", quiz: { question: "Who taught Alexander the Great?", options: ["Socrates", "Plato", "Aristotle", "Archimedes"], correct: 2 } },
        { id: 3, title: "Medieval Period", content: "Feudalism, crusades, and medieval society...", quiz: { question: "The Medieval period is also known as:", options: ["Renaissance", "Dark Ages", "Enlightenment", "Industrial Age"], correct: 1 } },
        { id: 4, title: "Renaissance", content: "Art, science, and cultural rebirth in Europe...", quiz: { question: "Renaissance began in which country?", options: ["France", "England", "Italy", "Spain"], correct: 2 } },
        { id: 5, title: "Industrial Revolution", content: "Technological advancement and social change...", quiz: { question: "The Industrial Revolution began in:", options: ["France", "Germany", "United States", "Britain"], correct: 3 } },
        { id: 6, title: "Modern Era", content: "20th century developments and contemporary history...", quiz: { question: "World War II ended in:", options: ["1944", "1945", "1946", "1947"], correct: 1 } }
      ]
    }
  };

  const handleLessonComplete = (courseKey, lessonId) => {
    const newProgress = { ...userProgress };
    if (newProgress[courseKey].completed < lessonId) {
      newProgress[courseKey].completed = lessonId;
    }
    setUserProgress(newProgress);

    // Check if course is complete for certificate
    if (newProgress[courseKey].completed === newProgress[courseKey].total) {
      const courseName = courses[courseKey].title;
      if (!certificates.some(cert => cert.course === courseName)) {
        setCertificates([...certificates, { 
          id: Date.now(), 
          course: courseName, 
          date: new Date().toLocaleDateString(),
          score: 95 + Math.floor(Math.random() * 5) // Random score 95-99%
        }]);
      }
    }
  };

  const handleQuizSubmit = () => {
    const quiz = selectedLesson.quiz;
    const userAnswer = quizAnswers[selectedLesson.id];
    const isCorrect = userAnswer === quiz.correct;
    
    setQuizResults({
      correct: isCorrect,
      correctAnswer: quiz.options[quiz.correct],
      explanation: isCorrect ? "Great job! You got it right!" : `The correct answer is: ${quiz.options[quiz.correct]}`
    });

    if (isCorrect) {
      handleLessonComplete(selectedCourse, selectedLesson.id);
    }
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, {
        id: Date.now(),
        title: newProject.title,
        author: "You",
        skills: newProject.skills,
        responses: 0,
        description: newProject.description
      }]);
      setNewProject({ title: '', description: '', skills: [] });
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to EduCollective</h1>
        <p className="text-lg opacity-90">Empowering minds, building the future together</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(courses).map(([key, course]) => (
          <div key={key} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className={`${course.color} text-white p-3 rounded-lg mb-4 text-center text-2xl`}>
              {course.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{userProgress[key].completed}/{userProgress[key].total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${course.color} h-2 rounded-full transition-all`}
                  style={{ width: `${(userProgress[key].completed / userProgress[key].total) * 100}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => { setSelectedCourse(key); setCurrentView('course'); }}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              Continue Learning <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
          Your Achievements
        </h2>
        {certificates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map(cert => (
              <div key={cert.id} className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-4 text-center">
                <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">{cert.course}</h3>
                <p className="text-sm text-gray-600">Completed: {cert.date}</p>
                <p className="text-sm text-gray-600">Score: {cert.score}%</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Complete courses to earn certificates!</p>
        )}
      </div>
    </div>
  );

  const renderCourse = () => {
    const course = courses[selectedCourse];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className={`${course.color} text-white rounded-lg p-6`}>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg opacity-90">{course.description}</p>
        </div>

        <div className="grid gap-4">
          {course.lessons.map((lesson, index) => {
            const isUnlocked = index === 0 || userProgress[selectedCourse].completed >= index;
            const isCompleted = userProgress[selectedCourse].completed >= lesson.id;
            
            return (
              <div
                key={lesson.id}
                className={`bg-white rounded-lg shadow-md p-4 flex items-center justify-between ${
                  isUnlocked ? 'hover:shadow-lg transition-shadow cursor-pointer' : 'opacity-50'
                }`}
                onClick={() => isUnlocked && setSelectedLesson(lesson)}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    isCompleted ? 'bg-green-500 text-white' : isUnlocked ? 'bg-gray-200' : 'bg-gray-100'
                  }`}>
                    {isCompleted ? <Check className="h-5 w-5" /> : isUnlocked ? lesson.id : <Lock className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">
                      {isCompleted ? 'Completed' : isUnlocked ? 'Available' : 'Locked'}
                    </p>
                  </div>
                </div>
                {isUnlocked && (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLesson = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedLesson(null)}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Course
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">{selectedLesson.title}</h1>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{selectedLesson.content}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Knowledge Check</h2>
        <div className="space-y-4">
          <p className="font-medium">{selectedLesson.quiz.question}</p>
          <div className="space-y-2">
            {selectedLesson.quiz.options.map((option, index) => (
              <label key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`quiz-${selectedLesson.id}`}
                  value={index}
                  checked={quizAnswers[selectedLesson.id] === index}
                  onChange={() => setQuizAnswers({...quizAnswers, [selectedLesson.id]: index})}
                  className="mr-3"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          
          {!quizResults && (
            <button
              onClick={handleQuizSubmit}
              disabled={quizAnswers[selectedLesson.id] === undefined}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          )}

          {quizResults && (
            <div className={`p-4 rounded-lg ${quizResults.correct ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
              <p className={`font-semibold ${quizResults.correct ? 'text-green-800' : 'text-red-800'}`}>
                {quizResults.correct ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              <p className="text-gray-700">{quizResults.explanation}</p>
              {quizResults.correct && (
                <button
                  onClick={() => {
                    setQuizResults(null);
                    setQuizAnswers({});
                    setSelectedLesson(null);
                  }}
                  className="mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continue to Next Lesson
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Community Collaboration</h1>
        <p className="text-lg opacity-90">Work together to make education better for everyone</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Share a New Project</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Project title..."
            value={newProject.title}
            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            placeholder="Describe your project and what help you need..."
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            className="w-full p-3 border rounded-lg h-24"
          />
          <input
            type="text"
            placeholder="Required skills (comma separated)..."
            value={newProject.skills.join(', ')}
            onChange={(e) => setNewProject({...newProject, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
            className="w-full p-3 border rounded-lg"
          />
          <button
            onClick={addProject}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Share Project
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Projects</h2>
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <MessageSquare className="h-4 w-4 mr-1" />
                {project.responses} responses
              </div>
            </div>
            <p className="text-gray-600 mb-3">by {project.author}</p>
            {project.description && (
              <p className="text-gray-700 mb-3">{project.description}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
            <button className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
              Join Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">EduCollective</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('community')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'community' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="h-4 w-4 inline mr-1" />
                Community
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'course' && !selectedLesson && renderCourse()}
        {currentView === 'course' && selectedLesson && renderLesson()}
        {currentView === 'community' && renderCommunity()}
      </main>
    </div>
  );
};

export default EduCollective;
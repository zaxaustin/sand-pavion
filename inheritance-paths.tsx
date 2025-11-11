import React, { useState } from 'react';
import { BookOpen, Plus, Lock, Unlock, Star, Users, Clock, Award, ChevronDown, ChevronUp, Edit } from 'lucide-react';

const InheritancePaths = () => {
  const [viewMode, setViewMode] = useState('browse'); // browse, create, detail
  const [selectedPath, setSelectedPath] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);

  const [paths, setPaths] = useState([
    {
      id: 1,
      title: "The Way of Mindful Presence",
      creator: "ZenMaster",
      description: "A 12-week journey into cultivating deep present-moment awareness through progressive meditation techniques",
      difficulty: "Intermediate",
      duration: "12 weeks",
      followers: 234,
      completed: 89,
      rating: 4.8,
      steps: 12,
      isPublic: true,
      tags: ["Meditation", "Mindfulness", "Awareness"],
      steps_detail: [
        {
          week: 1,
          title: "Foundation of Breath",
          description: "Learn basic breath awareness and establish your daily practice routine",
          practices: ["10-minute daily sitting", "Breath counting meditation", "Evening reflection journal"],
          unlocked: true
        },
        {
          week: 2,
          title: "Body Awareness Integration",
          description: "Expand awareness to include bodily sensations while maintaining breath focus",
          practices: ["15-minute body scan", "Walking meditation", "Mindful eating exercise"],
          unlocked: true
        },
        {
          week: 3,
          title: "Working with Thoughts",
          description: "Observe thoughts without attachment, developing the witness consciousness",
          practices: ["Thought labeling technique", "Open awareness meditation", "Noting practice"],
          unlocked: false
        }
      ],
      prerequisites: ["Basic meditation experience", "30 days consistent practice"],
      rewards: {
        wisdom: 1200,
        badges: ["Mindful Observer", "Present Moment Warrior"]
      }
    },
    {
      id: 2,
      title: "Desert Wisdom: The Path of Stillness",
      creator: "SandSage",
      description: "Ancient desert contemplation practices for finding clarity in emptiness and silence",
      difficulty: "Advanced",
      duration: "8 weeks",
      followers: 156,
      completed: 45,
      rating: 4.9,
      steps: 8,
      isPublic: true,
      tags: ["Contemplation", "Silence", "Advanced"],
      steps_detail: [
        {
          week: 1,
          title: "Entering the Silence",
          description: "Begin your journey into profound stillness through extended silent periods",
          practices: ["4-hour silence periods", "Desert visualization", "Emptiness meditation"],
          unlocked: true
        }
      ],
      prerequisites: ["Completed intermediate path", "1+ year meditation experience"],
      rewards: {
        wisdom: 2000,
        badges: ["Desert Sage", "Master of Stillness"]
      }
    },
    {
      id: 3,
      title: "Beginner's Mind: First Steps",
      creator: "NewPath",
      description: "A gentle introduction to meditation and mindfulness for complete beginners",
      difficulty: "Beginner",
      duration: "4 weeks",
      followers: 512,
      completed: 287,
      rating: 4.7,
      steps: 4,
      isPublic: true,
      tags: ["Beginner", "Basics", "Introduction"],
      steps_detail: [
        {
          week: 1,
          title: "What is Meditation?",
          description: "Understanding the basics and setting up your practice space",
          practices: ["5-minute guided meditation", "Create sacred space", "Set intentions"],
          unlocked: true
        }
      ],
      prerequisites: ["Open mind", "Willingness to practice"],
      rewards: {
        wisdom: 400,
        badges: ["First Steps Taken", "Journey Begun"]
      }
    }
  ]);

  const [newPath, setNewPath] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner',
    duration: '',
    isPublic: true,
    tags: [],
    steps: [],
    prerequisites: [''],
    currentStep: {
      title: '',
      description: '',
      practices: ['']
    }
  });

  const [newTag, setNewTag] = useState('');

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-700 border-green-300',
    Intermediate: 'bg-amber-100 text-amber-700 border-amber-300',
    Advanced: 'bg-purple-100 text-purple-700 border-purple-300'
  };

  const addStep = () => {
    if (newPath.currentStep.title && newPath.currentStep.description) {
      setNewPath({
        ...newPath,
        steps: [...newPath.steps, { ...newPath.currentStep, week: newPath.steps.length + 1 }],
        currentStep: { title: '', description: '', practices: [''] }
      });
    }
  };

  const addTag = () => {
    if (newTag && !newPath.tags.includes(newTag)) {
      setNewPath({
        ...newPath,
        tags: [...newPath.tags, newTag]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPath({
      ...newPath,
      tags: newPath.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addPractice = () => {
    setNewPath({
      ...newPath,
      currentStep: {
        ...newPath.currentStep,
        practices: [...newPath.currentStep.practices, '']
      }
    });
  };

  const updatePractice = (index, value) => {
    const updatedPractices = [...newPath.currentStep.practices];
    updatedPractices[index] = value;
    setNewPath({
      ...newPath,
      currentStep: {
        ...newPath.currentStep,
        practices: updatedPractices
      }
    });
  };

  const addPrerequisite = () => {
    setNewPath({
      ...newPath,
      prerequisites: [...newPath.prerequisites, '']
    });
  };

  const updatePrerequisite = (index, value) => {
    const updated = [...newPath.prerequisites];
    updated[index] = value;
    setNewPath({ ...newPath, prerequisites: updated });
  };

  const publishPath = () => {
    if (newPath.title && newPath.description && newPath.steps.length > 0) {
      const path = {
        id: paths.length + 1,
        ...newPath,
        creator: 'You',
        followers: 0,
        completed: 0,
        rating: 0,
        steps: newPath.steps.length
      };
      setPaths([path, ...paths]);
      setNewPath({
        title: '',
        description: '',
        difficulty: 'Beginner',
        duration: '',
        isPublic: true,
        tags: [],
        steps: [],
        prerequisites: [''],
        currentStep: { title: '', description: '', practices: [''] }
      });
      setViewMode('browse');
    }
  };

  const viewPathDetail = (path) => {
    setSelectedPath(path);
    setViewMode('detail');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-800 text-amber-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">📜</div>
              <div>
                <h1 className="text-4xl font-bold tracking-wide">Inheritance Paths</h1>
                <p className="text-amber-200 text-lg mt-1">Create and Follow Knowledge Lineages</p>
              </div>
            </div>
            {viewMode === 'browse' && (
              <button
                onClick={() => setViewMode('create')}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-900 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                Create Your Inheritance
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Browse Mode */}
        {viewMode === 'browse' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-2">Discover Knowledge Paths</h2>
              <p className="text-amber-700">Follow curated learning journeys created by experienced practitioners</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {paths.map((path) => (
                <div
                  key={path.id}
                  onClick={() => viewPathDetail(path)}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all border-2 border-amber-100 hover:border-amber-400 p-6 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
                          {path.title}
                        </h3>
                        {path.isPublic ? (
                          <Unlock size={20} className="text-green-600" />
                        ) : (
                          <Lock size={20} className="text-amber-600" />
                        )}
                      </div>
                      <p className="text-amber-700 leading-relaxed mb-3">{path.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {path.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-amber-600">
                    <span className={`px-3 py-1 rounded-full border-2 font-semibold ${difficultyColors[path.difficulty]}`}>
                      {path.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {path.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={16} />
                      {path.steps} steps
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-amber-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-600 mb-1">
                        <Users size={16} />
                      </div>
                      <div className="font-bold text-amber-900">{path.followers}</div>
                      <div className="text-xs text-amber-600">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-600 mb-1">
                        <Award size={16} />
                      </div>
                      <div className="font-bold text-amber-900">{path.completed}</div>
                      <div className="text-xs text-amber-600">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-600 mb-1">
                        <Star size={16} className="text-amber-500 fill-amber-500" />
                      </div>
                      <div className="font-bold text-amber-900">{path.rating}</div>
                      <div className="text-xs text-amber-600">Rating</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-amber-100 text-sm text-amber-600">
                    Created by <strong className="text-amber-800">{path.creator}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Mode */}
        {viewMode === 'create' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-amber-300 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-amber-900">Create Your Inheritance Path</h2>
                <button
                  onClick={() => setViewMode('browse')}
                  className="px-4 py-2 text-amber-700 hover:text-amber-900 font-semibold"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">Path Title *</label>
                  <input
                    type="text"
                    value={newPath.title}
                    onChange={(e) => setNewPath({...newPath, title: e.target.value})}
                    placeholder="The Way of..."
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-2">Description *</label>
                  <textarea
                    value={newPath.description}
                    onChange={(e) => setNewPath({...newPath, description: e.target.value})}
                    placeholder="Describe the journey and transformation this path offers..."
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">Difficulty Level</label>
                    <select
                      value={newPath.difficulty}
                      onChange={(e) => setNewPath({...newPath, difficulty: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">Duration</label>
                    <input
                      type="text"
                      value={newPath.duration}
                      onChange={(e) => setNewPath({...newPath, duration: e.target.value})}
                      placeholder="e.g., 8 weeks, 3 months"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-lg font-semibold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newPath.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm border border-amber-300 flex items-center gap-2">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="text-amber-500 hover:text-amber-700">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">Prerequisites</label>
                  <div className="space-y-2">
                    {newPath.prerequisites.map((prereq, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={prereq}
                        onChange={(e) => updatePrerequisite(idx, e.target.value)}
                        placeholder="e.g., Basic meditation experience"
                        className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                      />
                    ))}
                  </div>
                  <button
                    onClick={addPrerequisite}
                    className="mt-2 text-amber-700 hover:text-amber-900 font-semibold text-sm"
                  >
                    + Add prerequisite
                  </button>
                </div>

                {/* Visibility */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newPath.isPublic}
                    onChange={(e) => setNewPath({...newPath, isPublic: e.target.checked})}
                    className="w-5 h-5 text-amber-600"
                  />
                  <label htmlFor="isPublic" className="text-amber-900 font-semibold">
                    Make this path public (others can follow it)
                  </label>
                </div>

                {/* Steps Section */}
                <div className="border-t-2 border-amber-200 pt-6 mt-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">Add Steps to Your Path</h3>
                  
                  {newPath.steps.length > 0 && (
                    <div className="mb-6 space-y-3">
                      <h4 className="font-semibold text-amber-800">Added Steps ({newPath.steps.length}):</h4>
                      {newPath.steps.map((step, idx) => (
                        <div key={idx} className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                          <div className="font-bold text-amber-900">Week {step.week}: {step.title}</div>
                          <div className="text-sm text-amber-700 mt-1">{step.description}</div>
                          <div className="text-xs text-amber-600 mt-2">{step.practices.length} practices</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-4 p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">Step Title *</label>
                      <input
                        type="text"
                        value={newPath.currentStep.title}
                        onChange={(e) => setNewPath({...newPath, currentStep: {...newPath.currentStep, title: e.target.value}})}
                        placeholder="e.g., Foundation of Breath"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">Step Description *</label>
                      <textarea
                        value={newPath.currentStep.description}
                        onChange={(e) => setNewPath({...newPath, currentStep: {...newPath.currentStep, description: e.target.value}})}
                        placeholder="Describe what the practitioner will learn and experience..."
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">Practices</label>
                      <div className="space-y-2">
                        {newPath.currentStep.practices.map((practice, idx) => (
                          <input
                            key={idx}
                            type="text"
                            value={practice}
                            onChange={(e) => updatePractice(idx, e.target.value)}
                            placeholder="e.g., 10-minute daily sitting meditation"
                            className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none bg-white"
                          />
                        ))}
                      </div>
                      <button
                        onClick={addPractice}
                        className="mt-2 text-amber-700 hover:text-amber-900 font-semibold text-sm"
                      >
                        + Add practice
                      </button>
                    </div>

                    <button
                      onClick={addStep}
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all"
                    >
                      Add This Step
                    </button>
                  </div>
                </div>

                {/* Publish Button */}
                <div className="pt-6 border-t-2 border-amber-200">
                  <button
                    onClick={publishPath}
                    disabled={!newPath.title || !newPath.description || newPath.steps.length === 0}
                    className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-bold text-lg transition-all shadow-lg disabled:cursor-not-allowed"
                  >
                    Publish Your Inheritance Path
                  </button>
                  <p className="text-center text-sm text-amber-600 mt-2">
                    {newPath.steps.length === 0 ? 'Add at least one step to publish' : 'Ready to share your wisdom'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Mode */}
        {viewMode === 'detail' && selectedPath && (
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setViewMode('browse')}
              className="mb-6 text-amber-700 hover:text-amber-900 font-semibold"
            >
              ← Back to Paths
            </button>

            <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 border-b-2 border-amber-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold text-amber-900 mb-3">{selectedPath.title}</h2>
                    <p className="text-lg text-amber-800 leading-relaxed">{selectedPath.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  {selectedPath.tags.map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white text-amber-700 rounded-full font-semibold border-2 border-amber-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 text-center border-2 border-amber-200">
                    <div className="text-2xl font-bold text-amber-900">{selectedPath.followers}</div>
                    <div className="text-sm text-amber-600">Followers</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border-2 border-amber-200">
                    <div className="text-2xl font-bold text-amber-900">{selectedPath.completed}</div>
                    <div className="text-sm text-amber-600">Completed</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border-2 border-amber-200">
                    <div className="text-2xl font-bold text-amber-900">{selectedPath.rating} ⭐</div>
                    <div className="text-sm text-amber-600">Rating</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border-2 border-amber-200">
                    <div className="text-2xl font-bold text-amber-900">{selectedPath.duration}</div>
                    <div className="text-sm text-amber-600">Duration</div>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="p-8 border-b-2 border-amber-200 bg-amber-50">
                <h3 className="text-xl font-bold text-amber-900 mb-3">Prerequisites</h3>
                <ul className="list-disc list-inside space-y-2 text-amber-800">
                  {selectedPath.prerequisites.map((prereq, idx) => (
                    <li key={idx}>{prereq}</li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-amber-900 mb-6">Path Steps</h3>
                <div className="space-y-4">
                  {selectedPath.steps_detail.map((step, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-amber-200 rounded-lg overflow-hidden"
                    >
                      <div
                        onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                        className={`p-5 cursor-pointer transition-all ${
                          step.unlocked ? 'bg-white hover:bg-amber-50' : 'bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {step.unlocked ? (
                              <Unlock size={24} className="text-green-600" />
                            ) : (
                              <Lock size={24} className="text-gray-400" />
                            )}
                            <div>
                              <h4 className="text-lg font-bold text-amber-900">
                                Week {step.week}: {step.title}
                              </h4>
                              <p className="text-amber-700 text-sm mt-1">{step.description}</p>
                            </div>
                          </div>
                          {expandedStep === idx ? <ChevronUp /> : <ChevronDown />}
                        </div>
                      </div>

                      {expandedStep === idx && step.unlocked && (
                        <div className="p-5 bg-amber-50 border-t-2 border-amber-200">
                          <h5 className="font-bold text-amber-900 mb-3">Practices:</h5>
                          <ul className="space-y-2">
                            {step.practices.map((practice, pidx) => (
                              <li key={pidx} className="flex items-start gap-2">
                                <span className="text-amber-600 mt-1">•</span>
                                <span className="text-amber-800">{practice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {expandedStep === idx && !step.unlocked && (
                        <div className="p-5 bg-gray-50 border-t-2 border-gray-200 text-center">
                          <Lock size={32} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Complete previous steps to unlock</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 bg-amber-50 border-t-2 border-amber-200">
                <div className="flex gap-4">
                  <button className="flex-1 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg">
                    Begin This Path
                  </button>
                  <button className="px-8 py-4 bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-300 rounded-lg font-bold transition-all">
                    Save to Library
                  </button>
                </div>
                <div className="mt-4 text-center text-sm text-amber-700">
                  Created by <strong>{selectedPath.creator}</strong> • Earn <strong>{selectedPath.rewards.wisdom}</strong> wisdom points upon completion
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InheritancePaths;
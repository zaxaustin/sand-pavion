import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, Cloud, Cpu, Settings, Download, Play, Code, Users } from 'lucide-react';

const LocalAIArchitecture = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to your personal AI assistant! Running locally with cloud backup.' }
  ]);
  const [input, setInput] = useState('');
  const [isLocalRunning, setIsLocalRunning] = useState(true);
  const [modelSize, setModelSize] = useState('3B');
  const [useCloud, setUseCloud] = useState(false);
  const [stats, setStats] = useState({
    tokensPerSecond: 45,
    memoryUsage: '2.1 GB',
    responseTime: '120ms'
  });

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    // Simulate response
    setTimeout(() => {
      const isComplexQuery = input.length > 100 || input.includes('complex') || input.includes('research');
      const responseSource = isComplexQuery && useCloud ? 'cloud' : 'local';
      
      let response = '';
      if (responseSource === 'cloud') {
        response = `🌩️ [Cloud Response] This is a complex query that I've escalated to the cloud model for better accuracy. Here's a comprehensive answer: ${input.split(' ').reverse().join(' ')}`;
      } else {
        response = `🏠 [Local Response] Processing locally on ${modelSize} model: ${input.split('').reverse().join('')}`;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, useCloud && input.length > 100 ? 2000 : 500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-xl">Personal AI Assistant</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              isLocalRunning ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isLocalRunning ? '🟢 Local Running' : '🔴 Local Offline'}
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : msg.role === 'system'
                    ? 'bg-blue-100 text-blue-800 text-center w-full'
                    : 'bg-white shadow-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask your AI anything..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            💡 Tip: Try asking something complex to see cloud escalation in action!
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          
          {/* Model Settings */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Model Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Local Model Size</label>
                <select 
                  value={modelSize} 
                  onChange={(e) => setModelSize(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="1B">1B - Ultra Fast</option>
                  <option value="3B">3B - Balanced</option>
                  <option value="7B">7B - High Quality</option>
                  <option value="13B">13B - Best Local</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cloud Backup</span>
                <button
                  onClick={() => setUseCloud(!useCloud)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    useCloud ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    useCloud ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="text-xs text-gray-600">
                {useCloud ? '🌩️ Will escalate complex queries to cloud' : '🏠 Local-only processing'}
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Performance
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Speed</span>
                <span className="font-mono text-sm">{stats.tokensPerSecond} tok/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Memory</span>
                <span className="font-mono text-sm">{stats.memoryUsage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Latency</span>
                <span className="font-mono text-sm">{stats.responseTime}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-green-800">
                ✅ Running efficiently on local hardware
              </div>
            </div>
          </div>

          {/* Architecture Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-bold text-lg mb-4">Architecture</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                <Cpu className="w-4 h-4 text-purple-600" />
                <span>Local Model ({modelSize})</span>
              </div>
              
              {useCloud && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <Cloud className="w-4 h-4 text-blue-600" />
                  <span>Cloud Backup (GPT-4/Claude)</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                <Code className="w-4 h-4 text-green-600" />
                <span>Custom Training Pipeline</span>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                <Users className="w-4 h-4 text-orange-600" />
                <span>Community Contributions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
        <h3 className="font-bold text-xl mb-4">Implementation Roadmap</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
            <h4 className="font-bold text-purple-800">Phase 1: Local Setup</h4>
            <ul className="text-sm text-purple-700 mt-2 space-y-1">
              <li>• Ollama/LM Studio integration</li>
              <li>• Model selection UI</li>
              <li>• Performance monitoring</li>
            </ul>
          </div>
          
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
            <h4 className="font-bold text-blue-800">Phase 2: Cloud Bridge</h4>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• API routing logic</li>
              <li>• Cost optimization</li>
              <li>• Fallback mechanisms</li>
            </ul>
          </div>
          
          <div className="p-4 border-l-4 border-green-500 bg-green-50">
            <h4 className="font-bold text-green-800">Phase 3: Customization</h4>
            <ul className="text-sm text-green-700 mt-2 space-y-1">
              <li>• Fine-tuning interface</li>
              <li>• Personal data training</li>
              <li>• Model merging</li>
            </ul>
          </div>
          
          <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
            <h4 className="font-bold text-orange-800">Phase 4: Community</h4>
            <ul className="text-sm text-orange-700 mt-2 space-y-1">
              <li>• Model sharing</li>
              <li>• Collaborative training</li>
              <li>• Knowledge exchange</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalAIArchitecture;
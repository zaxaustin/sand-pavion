import React, { useState, useEffect } from 'react';
import { Trophy, Target, BookOpen, TrendingUp, Users, DollarSign, FileText, CheckCircle, Circle, Star, Award, Youtube, Book } from 'lucide-react';

const BusinessQuestDashboard = () => {
  const [completedQuests, setCompletedQuests] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [showResources, setShowResources] = useState(false);

  const categories = [
    { id: 'fundamentals', name: 'Business Fundamentals', icon: BookOpen, color: 'bg-amber-600' },
    { id: 'finance', name: 'Finance & Accounting', icon: DollarSign, color: 'bg-emerald-600' },
    { id: 'marketing', name: 'Marketing & Sales', icon: TrendingUp, color: 'bg-sky-600' },
    { id: 'operations', name: 'Operations', icon: Target, color: 'bg-orange-600' },
    { id: 'leadership', name: 'Leadership & People', icon: Users, color: 'bg-teal-600' },
    { id: 'legal', name: 'Legal & Compliance', icon: FileText, color: 'bg-slate-600' }
  ];

  const books = [
    {
      category: 'fundamentals',
      title: 'The Lean Startup',
      author: 'Eric Ries',
      description: 'Learn to build businesses efficiently using validated learning and rapid experimentation'
    },
    {
      category: 'fundamentals',
      title: 'Zero to One',
      author: 'Peter Thiel',
      description: 'Insights on building innovative companies that create new things'
    },
    {
      category: 'fundamentals',
      title: 'The E-Myth Revisited',
      author: 'Michael Gerber',
      description: 'Why most small businesses fail and what to do about it'
    },
    {
      category: 'finance',
      title: 'Profit First',
      author: 'Mike Michalowicz',
      description: 'Transform your business from cash-eating monster to money-making machine'
    },
    {
      category: 'finance',
      title: 'Financial Intelligence',
      author: 'Karen Berman & Joe Knight',
      description: 'A manager\'s guide to knowing what the numbers really mean'
    },
    {
      category: 'finance',
      title: 'The Personal MBA',
      author: 'Josh Kaufman',
      description: 'Master the art of business including finance without going to business school'
    },
    {
      category: 'marketing',
      title: 'Building a StoryBrand',
      author: 'Donald Miller',
      description: 'Clarify your message so customers will listen'
    },
    {
      category: 'marketing',
      title: 'Traction',
      author: 'Gabriel Weinberg',
      description: 'A startup guide to getting customers through 19 channels'
    },
    {
      category: 'marketing',
      title: '$100M Offers',
      author: 'Alex Hormozi',
      description: 'How to make offers so good people feel stupid saying no'
    },
    {
      category: 'operations',
      title: 'The Goal',
      author: 'Eliyahu Goldratt',
      description: 'A process of ongoing improvement through the Theory of Constraints'
    },
    {
      category: 'operations',
      title: 'Work the System',
      author: 'Sam Carpenter',
      description: 'The simple mechanics of making more and working less'
    },
    {
      category: 'operations',
      title: 'The Checklist Manifesto',
      author: 'Atul Gawande',
      description: 'How to get things right through simple checklists'
    },
    {
      category: 'leadership',
      title: 'Extreme Ownership',
      author: 'Jocko Willink & Leif Babin',
      description: 'How Navy SEALs lead and win - applied to business'
    },
    {
      category: 'leadership',
      title: 'The Five Dysfunctions of a Team',
      author: 'Patrick Lencioni',
      description: 'A leadership fable about overcoming team challenges'
    },
    {
      category: 'leadership',
      title: 'Dare to Lead',
      author: 'Brené Brown',
      description: 'Brave work, tough conversations, whole hearts'
    },
    {
      category: 'legal',
      title: 'The Art of the Start 2.0',
      author: 'Guy Kawasaki',
      description: 'Time-tested, battle-hardened guide for starting anything'
    },
    {
      category: 'legal',
      title: 'Business Law for Entrepreneurs',
      author: 'Nolo Press',
      description: 'Essential legal concepts every business owner should know'
    }
  ];

  const youtubeChannels = [
    {
      category: 'fundamentals',
      name: 'Y Combinator',
      description: 'Startup advice from the world\'s most successful accelerator',
      focus: 'Startup fundamentals, founder stories, product development'
    },
    {
      category: 'fundamentals',
      name: 'The Futur',
      description: 'Business, marketing, and design education',
      focus: 'Creative business, pricing, branding, client relations'
    },
    {
      category: 'fundamentals',
      name: 'Valuetainment',
      description: 'Patrick Bet-David\'s entrepreneur content',
      focus: 'Business strategy, interviews, mindset'
    },
    {
      category: 'finance',
      name: 'Minority Mindset',
      description: 'Jaspreet Singh on money and investing',
      focus: 'Financial literacy, investing, wealth building'
    },
    {
      category: 'finance',
      name: 'Accounting Stuff',
      description: 'Accounting made simple and fun',
      focus: 'Bookkeeping, accounting basics, financial statements'
    },
    {
      category: 'finance',
      name: 'The Swedish Investor',
      description: 'Animated book summaries on business and investing',
      focus: 'Financial concepts, business books, investing'
    },
    {
      category: 'marketing',
      name: 'Neil Patel',
      description: 'Digital marketing and SEO expertise',
      focus: 'SEO, content marketing, traffic generation'
    },
    {
      category: 'marketing',
      name: 'GaryVee',
      description: 'Gary Vaynerchuk on marketing and hustle',
      focus: 'Social media marketing, brand building, content'
    },
    {
      category: 'marketing',
      name: 'Alex Hormozi',
      description: 'Scaling businesses and making offers',
      focus: 'Sales, offers, customer acquisition, scaling'
    },
    {
      category: 'operations',
      name: 'Process Street',
      description: 'Workflow and process optimization',
      focus: 'SOPs, automation, business processes'
    },
    {
      category: 'operations',
      name: 'Thomas Frank',
      description: 'Productivity and systems thinking',
      focus: 'Productivity, tools, organization, time management'
    },
    {
      category: 'operations',
      name: 'Ali Abdaal',
      description: 'Productivity and business systems',
      focus: 'Productivity, business systems, tools, efficiency'
    },
    {
      category: 'leadership',
      name: 'Jocko Podcast',
      description: 'Leadership lessons from Navy SEAL Jocko Willink',
      focus: 'Leadership, discipline, decision-making'
    },
    {
      category: 'leadership',
      name: 'Simon Sinek',
      description: 'Inspirational leadership content',
      focus: 'Purpose-driven leadership, team building, culture'
    },
    {
      category: 'leadership',
      name: 'Craig Groeschel Leadership Podcast',
      description: 'Practical leadership insights',
      focus: 'Leadership development, team management'
    },
    {
      category: 'legal',
      name: 'LegalEagle',
      description: 'Legal concepts explained clearly',
      focus: 'Business law, contracts, legal issues'
    },
    {
      category: 'legal',
      name: 'Nolo',
      description: 'DIY legal help and education',
      focus: 'Small business law, contracts, compliance'
    }
  ];

  const quests = [
    // Business Fundamentals
    {
      id: 1,
      category: 'fundamentals',
      title: 'Create Your Business Plan',
      description: 'Write a comprehensive business plan including executive summary, market analysis, and financial projections',
      xp: 100,
      tasks: [
        'Define your business mission and vision',
        'Conduct market research and competitive analysis',
        'Outline your products/services',
        'Create 3-year financial projections',
        'Define your target customer personas'
      ]
    },
    {
      id: 2,
      category: 'fundamentals',
      title: 'Define Your Business Model',
      description: 'Use the Business Model Canvas to map out your value proposition',
      xp: 75,
      tasks: [
        'Identify key partners and resources',
        'Define value propositions',
        'Map customer segments and relationships',
        'Outline revenue streams and cost structure',
        'Validate assumptions with 5 potential customers'
      ]
    },
    {
      id: 3,
      category: 'fundamentals',
      title: 'Establish Your Brand Identity',
      description: 'Create a cohesive brand that resonates with your target market',
      xp: 80,
      tasks: [
        'Define brand values and personality',
        'Create a brand style guide',
        'Design logo and color palette',
        'Write your brand story',
        'Develop brand messaging and tagline'
      ]
    },
    // Finance & Accounting
    {
      id: 4,
      category: 'finance',
      title: 'Master Financial Statements',
      description: 'Learn to read and analyze balance sheets, income statements, and cash flow statements',
      xp: 90,
      tasks: [
        'Study the three main financial statements',
        'Create a personal P&L statement',
        'Practice analyzing public company financials',
        'Calculate key financial ratios (ROI, margins, etc.)',
        'Set up a simple bookkeeping system'
      ]
    },
    {
      id: 5,
      category: 'finance',
      title: 'Build Your First Budget',
      description: 'Create a detailed operating budget for your business',
      xp: 85,
      tasks: [
        'List all expected revenue sources',
        'Categorize fixed and variable costs',
        'Project monthly cash flow for 12 months',
        'Identify break-even point',
        'Create contingency plans for 20% revenue variance'
      ]
    },
    {
      id: 6,
      category: 'finance',
      title: 'Understand Business Funding',
      description: 'Research and evaluate different funding options for your business',
      xp: 70,
      tasks: [
        'Compare bootstrapping vs. external funding',
        'Research angel investors and VCs',
        'Learn about SBA loans and grants',
        'Create a funding pitch deck',
        'Calculate how much capital you actually need'
      ]
    },
    // Marketing & Sales
    {
      id: 7,
      category: 'marketing',
      title: 'Develop Your Marketing Strategy',
      description: 'Create a comprehensive marketing plan to reach your target audience',
      xp: 95,
      tasks: [
        'Define SMART marketing goals',
        'Choose 3 primary marketing channels',
        'Create a content calendar for 1 month',
        'Set marketing budget and KPIs',
        'Design your first marketing campaign'
      ]
    },
    {
      id: 8,
      category: 'marketing',
      title: 'Build Your Online Presence',
      description: 'Establish your digital footprint across key platforms',
      xp: 80,
      tasks: [
        'Create a professional website',
        'Set up Google My Business profile',
        'Establish presence on 2 social media platforms',
        'Implement basic SEO practices',
        'Collect and showcase customer testimonials'
      ]
    },
    {
      id: 9,
      category: 'marketing',
      title: 'Master the Sales Funnel',
      description: 'Design and optimize your customer acquisition process',
      xp: 85,
      tasks: [
        'Map your customer journey',
        'Create lead magnets and CTAs',
        'Develop a follow-up email sequence',
        'Practice sales objection handling',
        'Track conversion rates at each stage'
      ]
    },
    {
      id: 10,
      category: 'marketing',
      title: 'Learn Customer Retention',
      description: 'Develop strategies to keep customers coming back',
      xp: 75,
      tasks: [
        'Calculate your customer lifetime value',
        'Create a customer loyalty program',
        'Set up automated customer check-ins',
        'Implement a referral program',
        'Survey customers for feedback'
      ]
    },
    // Operations
    {
      id: 11,
      category: 'operations',
      title: 'Streamline Your Processes',
      description: 'Document and optimize core business operations',
      xp: 90,
      tasks: [
        'Map out 5 key business processes',
        'Create standard operating procedures (SOPs)',
        'Identify bottlenecks and inefficiencies',
        'Implement one automation tool',
        'Measure time saved after improvements'
      ]
    },
    {
      id: 12,
      category: 'operations',
      title: 'Build Your Tech Stack',
      description: 'Select and implement essential business tools',
      xp: 70,
      tasks: [
        'Research CRM software options',
        'Set up project management tool',
        'Choose accounting software',
        'Implement communication platform',
        'Create a data backup system'
      ]
    },
    {
      id: 13,
      category: 'operations',
      title: 'Master Time Management',
      description: 'Optimize your productivity and prioritization skills',
      xp: 65,
      tasks: [
        'Track your time for one week',
        'Implement the Eisenhower Matrix',
        'Block calendar for deep work',
        'Eliminate or delegate 3 low-value tasks',
        'Create morning and evening routines'
      ]
    },
    {
      id: 14,
      category: 'operations',
      title: 'Develop Supply Chain Knowledge',
      description: 'Understand inventory, vendors, and fulfillment',
      xp: 80,
      tasks: [
        'Research 3 potential suppliers',
        'Negotiate terms with one vendor',
        'Calculate optimal inventory levels',
        'Create a backup supplier plan',
        'Implement quality control checks'
      ]
    },
    // Leadership & People
    {
      id: 15,
      category: 'leadership',
      title: 'Define Your Leadership Style',
      description: 'Develop self-awareness and leadership principles',
      xp: 75,
      tasks: [
        'Take a leadership assessment',
        'Read one leadership book',
        'Define your core leadership values',
        'Create a personal development plan',
        'Seek feedback from 3 people'
      ]
    },
    {
      id: 16,
      category: 'leadership',
      title: 'Build Your First Team',
      description: 'Learn recruitment, onboarding, and team management',
      xp: 100,
      tasks: [
        'Write clear job descriptions',
        'Develop an interview process',
        'Create an onboarding checklist',
        'Establish team communication norms',
        'Schedule regular one-on-ones'
      ]
    },
    {
      id: 17,
      category: 'leadership',
      title: 'Master Delegation',
      description: 'Learn to effectively assign and monitor work',
      xp: 70,
      tasks: [
        'List all tasks you currently do',
        'Identify what only you can do',
        'Delegate 5 tasks this week',
        'Create delegation templates',
        'Follow up without micromanaging'
      ]
    },
    {
      id: 18,
      category: 'leadership',
      title: 'Build Company Culture',
      description: 'Create a positive, productive work environment',
      xp: 85,
      tasks: [
        'Define company core values',
        'Create a culture handbook',
        'Plan team building activities',
        'Establish recognition programs',
        'Survey team for culture feedback'
      ]
    },
    // Legal & Compliance
    {
      id: 19,
      category: 'legal',
      title: 'Set Up Your Business Legally',
      description: 'Handle registrations, licenses, and business structure',
      xp: 90,
      tasks: [
        'Choose business structure (LLC, Corp, etc.)',
        'Register with state and get EIN',
        'Obtain necessary licenses and permits',
        'Open business bank account',
        'Set up business insurance'
      ]
    },
    {
      id: 20,
      category: 'legal',
      title: 'Understand Contracts',
      description: 'Learn to draft and negotiate business agreements',
      xp: 80,
      tasks: [
        'Review common contract types',
        'Create standard service agreement',
        'Draft vendor/supplier agreements',
        'Understand terms and conditions',
        'Consult with business attorney'
      ]
    },
    {
      id: 21,
      category: 'legal',
      title: 'Protect Your IP',
      description: 'Safeguard your intellectual property and trademarks',
      xp: 75,
      tasks: [
        'Research trademark requirements',
        'Document your trade secrets',
        'Create employee NDAs',
        'Register domain names',
        'Consider patent opportunities'
      ]
    },
    {
      id: 22,
      category: 'legal',
      title: 'Master Tax Basics',
      description: 'Understand business tax obligations and deductions',
      xp: 85,
      tasks: [
        'Learn about quarterly estimated taxes',
        'Research available business deductions',
        'Set up record-keeping system',
        'Understand sales tax requirements',
        'Find a qualified tax professional'
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('businessQuestProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedQuests(data.completed || {});
      setXp(data.xp || 0);
      setLevel(data.level || 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('businessQuestProgress', JSON.stringify({
      completed: completedQuests,
      xp,
      level
    }));
    
    const newLevel = Math.floor(xp / 500) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
    }
  }, [completedQuests, xp, level]);

  const toggleQuest = (questId) => {
    const newCompleted = { ...completedQuests };
    if (newCompleted[questId]) {
      const quest = quests.find(q => q.id === questId);
      setXp(xp - quest.xp);
      delete newCompleted[questId];
    } else {
      const quest = quests.find(q => q.id === questId);
      setXp(xp + quest.xp);
      newCompleted[questId] = true;
    }
    setCompletedQuests(newCompleted);
  };

  const filteredQuests = selectedCategory === 'all' 
    ? quests 
    : quests.filter(q => q.category === selectedCategory);

  const filteredBooks = selectedCategory === 'all'
    ? books
    : books.filter(b => b.category === selectedCategory);

  const filteredChannels = selectedCategory === 'all'
    ? youtubeChannels
    : youtubeChannels.filter(c => c.category === selectedCategory);

  const completionRate = (Object.keys(completedQuests).length / quests.length * 100).toFixed(0);
  const xpToNextLevel = (level * 500) - xp;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-amber-500" />
            <h1 className="text-5xl font-bold text-slate-800">Business Owner Quest Hub</h1>
          </div>
          <p className="text-xl text-slate-600">Level up your entrepreneurial skills, one quest at a time</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowResources(false)}
            className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              !showResources
                ? 'bg-sky-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Target className="w-5 h-5" />
            Quests
          </button>
          <button
            onClick={() => setShowResources(true)}
            className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              showResources
                ? 'bg-sky-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Learning Resources
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Level</p>
                <p className="text-3xl font-bold text-slate-800">{level}</p>
              </div>
              <Award className="w-10 h-10 text-amber-500" />
            </div>
            <p className="text-xs text-slate-500 mt-2">{xpToNextLevel} XP to next level</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-sky-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total XP</p>
                <p className="text-3xl font-bold text-slate-800">{xp}</p>
              </div>
              <Star className="w-10 h-10 text-sky-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Completed</p>
                <p className="text-3xl font-bold text-slate-800">{Object.keys(completedQuests).length}/{quests.length}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Progress</p>
                <p className="text-3xl font-bold text-slate-800">{completionRate}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-sky-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              All {showResources ? 'Resources' : 'Quests'}
            </button>
            {categories.map(cat => {
              const Icon = cat.icon;
              const categoryQuests = quests.filter(q => q.category === cat.id);
              const completed = categoryQuests.filter(q => completedQuests[q.id]).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-sky-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {cat.name}
                  {!showResources && <span className="ml-1 text-sm">({completed}/{categoryQuests.length})</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources View */}
        {showResources ? (
          <div className="space-y-8">
            {/* Books Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Book className="w-8 h-8 text-amber-600" />
                <h2 className="text-3xl font-bold text-slate-800">Essential Books</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <Book className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{book.title}</h3>
                        <p className="text-sm text-slate-500 italic">by {book.author}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">{book.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Channels Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Youtube className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-bold text-slate-800">YouTube Channels</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredChannels.map((channel, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <Youtube className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-lg">{channel.name}</h3>
                        <p className="text-slate-600 text-sm mb-2">{channel.description}</p>
                        <p className="text-xs text-slate-500">
                          <span className="font-semibold">Focus:</span> {channel.focus}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Quests Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredQuests.map(quest => {
              const category = categories.find(c => c.id === quest.category);
              const Icon = category.icon;
              const isCompleted = completedQuests[quest.id];

              return (
                <div
                  key={quest.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                    isCompleted ? 'opacity-75' : ''
                  }`}
                >
                  <div className={`${category.color} p-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-white" />
                      <h3 className="text-xl font-bold text-white">{quest.title}</h3>
                    </div>
                    <div className="bg-white bg-opacity-30 px-3 py-1 rounded-full">
                      <span className="text-white font-bold">{quest.xp} XP</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-slate-600 mb-4">{quest.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {quest.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Circle className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{task}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleQuest(quest.id)}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        isCompleted
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'bg-sky-600 text-white hover:bg-sky-700'
                    }`}
                    >
                      {isCompleted ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Quest Complete!
                        </span>
                      ) : (
                        'Mark as Complete'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredQuests.length === 0 && !showResources && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-xl">No quests in this category yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessQuestDashboard;
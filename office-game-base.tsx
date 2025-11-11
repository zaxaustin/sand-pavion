import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Terminal, BookOpen, Users, Leaf, Droplet, Coffee, Calendar, ClipboardList, Brain, Briefcase, FileText, MessageSquare, Bell, TrendingUp, Mail, Video, FolderOpen, Archive, Award, Target, Zap, PieChart, Star, Trophy } from 'lucide-react';

const TILE_SIZE = 32;
const PLAYER_SPEED = 3;

const OfficeGame = () => {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState({ x: 400, y: 350, direction: 'down' });
  const [keys, setKeys] = useState({});
  const [interaction, setInteraction] = useState(null);
  const [computerMode, setComputerMode] = useState(null);
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [notifications, setNotifications] = useState(3);
  
  // Game-like features
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    xp: 0,
    xpToNext: 100,
    productivity: 85,
    focus: 100,
    energy: 100,
    achievements: []
  });
  const [dailyQuests, setDailyQuests] = useState([
    { id: 1, title: 'Chat with Victoria', completed: false, xp: 20 },
    { id: 2, title: 'Complete a workflow', completed: false, xp: 50 },
    { id: 3, title: 'Add document to knowledge base', completed: false, xp: 30 },
    { id: 4, title: 'Take a zen break', completed: false, xp: 15 }
  ]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);
  const [visitedStations, setVisitedStations] = useState(new Set());
  const [time, setTime] = useState(0); // Game time in seconds
  
  const [agentStatus, setAgentStatus] = useState({
    victoria: 'available',
    atlas: 'available',
    nexus: 'available'
  });
  
  // Comprehensive office infrastructure
  const objects = [
    // === LEADERSHIP & STRATEGY ZONE (Top Left) ===
    { id: 'executive-desk', x: 200, y: 120, name: 'Victoria', subtitle: 'Strategic Advisor', type: 'agent', size: 'large',
      interact: () => interactWithStation('agent-victoria') },
    { id: 'strategy-board', x: 100, y: 120, name: 'Vision Board', subtitle: 'Goals & OKRs', type: 'planning',
      interact: () => interactWithStation('strategy') },
    
    // === DEVELOPMENT & TECHNICAL ZONE (Top Right) ===
    { id: 'terminal', x: 600, y: 120, name: 'Nexus', subtitle: 'Dev Engineer', type: 'agent', size: 'large',
      interact: () => interactWithStation('agent-nexus') },
    { id: 'code-review-station', x: 700, y: 120, name: 'Code Review', subtitle: 'Quality Gate', type: 'technical',
      interact: () => interactWithStation('code-review') },
    
    // === RESEARCH & KNOWLEDGE ZONE (Middle Left) ===
    { id: 'research-desk', x: 120, y: 280, name: 'Atlas', subtitle: 'Researcher', type: 'agent', size: 'large',
      interact: () => interactWithStation('agent-atlas') },
    { id: 'knowledge-base', x: 120, y: 380, name: 'Library', subtitle: 'Knowledge Base', type: 'library',
      interact: () => interactWithStation('knowledge') },
    { id: 'archive', x: 120, y: 480, name: 'Archive', subtitle: 'Historical Data', type: 'storage',
      interact: () => interactWithStation('archive') },
    
    // === COMMUNICATION & COLLABORATION ZONE (Middle Center) ===
    { id: 'meeting-table', x: 400, y: 200, name: 'Meeting Hub', subtitle: 'Collaboration', type: 'collaboration',
      interact: () => interactWithStation('meeting') },
    { id: 'message-center', x: 320, y: 280, name: 'Messages', subtitle: 'Communications', type: 'communication',
      interact: () => interactWithStation('messages') },
    { id: 'video-call', x: 480, y: 280, name: 'Video Room', subtitle: 'Virtual Meetings', type: 'communication',
      interact: () => interactWithStation('video') },
    
    // === PRODUCTIVITY & WORKFLOW ZONE (Middle Right) ===
    { id: 'workflow-board', x: 680, y: 280, name: 'Workflows', subtitle: 'Automation', type: 'workflow',
      interact: () => interactWithStation('workflows') },
    { id: 'task-board', x: 680, y: 380, name: 'Tasks', subtitle: 'Kanban Board', type: 'tasks',
      interact: () => interactWithStation('tasks') },
    { id: 'project-tracker', x: 680, y: 480, name: 'Projects', subtitle: 'Tracking', type: 'tracking',
      interact: () => interactWithStation('projects') },
    
    // === ANALYTICS & INSIGHTS ZONE (Bottom Right) ===
    { id: 'dashboard', x: 600, y: 500, name: 'Analytics', subtitle: 'Metrics', type: 'analytics',
      interact: () => interactWithStation('analytics') },
    { id: 'reports', x: 500, y: 500, name: 'Reports', subtitle: 'Business Intel', type: 'analytics',
      interact: () => interactWithStation('reports') },
    
    // === ADMIN & OPERATIONS ZONE (Bottom Left) ===
    { id: 'calendar', x: 200, y: 500, name: 'Calendar', subtitle: 'Scheduling', type: 'scheduling',
      interact: () => interactWithStation('calendar') },
    { id: 'inbox', x: 300, y: 500, name: 'Inbox', subtitle: 'Email Hub', type: 'communication',
      interact: () => interactWithStation('inbox') },
    
    // === CREATIVE & IDEATION ZONE (Bottom Center) ===
    { id: 'whiteboard', x: 400, y: 450, name: 'Whiteboard', subtitle: 'Brainstorming', type: 'creative',
      interact: () => interactWithStation('whiteboard') },
    
    // === ZEN & WELLNESS ZONE (Corners & Edges) ===
    { id: 'tea', x: 100, y: 540, name: 'Tea Station', subtitle: '', type: 'zen',
      interact: () => takeZenBreak('tea') },
    { id: 'fountain', x: 700, y: 540, name: 'Zen Garden', subtitle: '', type: 'zen',
      interact: () => takeZenBreak('garden') },
    { id: 'meditation-corner', x: 400, y: 540, name: 'Reflection', subtitle: '', type: 'zen',
      interact: () => takeZenBreak('meditation') },
    
    // === DECORATIVE NATURE ELEMENTS ===
    { id: 'plant1', x: 60, y: 200, name: '', type: 'plant' },
    { id: 'plant2', x: 740, y: 200, name: '', type: 'plant' },
    { id: 'plant3', x: 60, y: 400, name: '', type: 'plant' },
    { id: 'plant4', x: 740, y: 400, name: '', type: 'plant' },
    { id: 'bonsai1', x: 250, y: 60, name: '', type: 'bonsai' },
    { id: 'bonsai2', x: 550, y: 60, name: '', type: 'bonsai' },
  ];

  const walls = [
    { x: 0, y: 0, width: 800, height: 40 },
    { x: 0, y: 0, width: 40, height: 600 },
    { x: 760, y: 0, width: 40, height: 600 },
    { x: 0, y: 560, width: 800, height: 40 },
  ];

  const bamboo = [
    { x: 70, y: 50 }, { x: 730, y: 50 },
  ];

  const rocks = [
    { x: 650, y: 545, size: 20 }, { x: 675, y: 550, size: 15 },
    { x: 720, y: 545, size: 18 },
  ];

  // Visual zones (floor areas)
  const zones = [
    { x: 40, y: 40, width: 280, height: 200, color: 'rgba(139, 69, 19, 0.1)', name: 'Leadership' },
    { x: 520, y: 40, width: 240, height: 200, color: 'rgba(52, 152, 219, 0.1)', name: 'Development' },
    { x: 40, y: 240, width: 200, height: 280, color: 'rgba(241, 196, 15, 0.1)', name: 'Research' },
    { x: 600, y: 240, width: 160, height: 280, color: 'rgba(155, 89, 182, 0.1)', name: 'Workflows' },
    { x: 240, y: 240, width: 360, height: 200, color: 'rgba(46, 204, 113, 0.1)', name: 'Collaboration' },
    { x: 240, y: 440, width: 360, height: 80, color: 'rgba(230, 126, 34, 0.1)', name: 'Creative' },
  ];

  // Game features
  const takeZenBreak = (type) => {
    const messages = {
      tea: { title: 'Tea Ceremony', text: 'You take a mindful tea break. +25 Focus restored!', focus: 25, energy: 10 },
      garden: { title: 'Zen Garden', text: 'The flowing water calms your mind. +15 Energy restored!', focus: 10, energy: 15 },
      meditation: { title: 'Meditation', text: 'Deep breathing restores your inner balance. +30 Focus, +20 Energy!', focus: 30, energy: 20 }
    };
    
    const msg = messages[type];
    setPlayerStats(prev => ({
      ...prev,
      focus: Math.min(100, prev.focus + msg.focus),
      energy: Math.min(100, prev.energy + msg.energy)
    }));
    
    completeQuest(4); // Zen break quest
    gainXP(msg.focus + msg.energy);
    
    setInteraction({ type: 'dialog', title: msg.title, text: msg.text });
  };

  const interactWithStation = (stationId) => {
    setComputerMode(stationId);
    setVisitedStations(prev => new Set([...prev, stationId]));
    
    // Complete relevant quests
    if (stationId.startsWith('agent-')) {
      completeQuest(1);
    }
    
    // Drain focus slightly
    setPlayerStats(prev => ({
      ...prev,
      focus: Math.max(0, prev.focus - 2)
    }));
    
    // Gain small XP for exploration
    gainXP(5);
  };

  const gainXP = (amount) => {
    setPlayerStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = prev.level;
      
      if (newXP >= prev.xpToNext) {
        // Level up!
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
        
        return {
          ...prev,
          level: newLevel + 1,
          xp: newXP - prev.xpToNext,
          xpToNext: Math.floor(prev.xpToNext * 1.5),
          focus: 100,
          energy: 100
        };
      }
      
      return { ...prev, xp: newXP };
    });
  };

  const completeQuest = (questId) => {
    setDailyQuests(prev => prev.map(q => {
      if (q.id === questId && !q.completed) {
        gainXP(q.xp);
        return { ...q, completed: true };
      }
      return q;
    }));
  };

  const startWorkflow = (workflowId) => {
    setActiveWorkflow(workflowId);
    setPlayerStats(prev => ({ ...prev, focus: Math.max(0, prev.focus - 10) }));
    
    setTimeout(() => {
      setActiveWorkflow(null);
      gainXP(50);
      completeQuest(2);
      setInteraction({
        type: 'dialog',
        title: 'Workflow Complete!',
        text: `Workflow completed successfully! +50 XP earned. Check your knowledge base for results.`
      });
    }, 3000);
  };

  // Game time ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => prev + 1);
      
      // Slowly drain focus and energy over time
      setPlayerStats(prev => ({
        ...prev,
        focus: Math.max(0, prev.focus - 0.1),
        energy: Math.max(0, prev.energy - 0.05)
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const checkCollision = (newX, newY) => {
    const playerBox = { x: newX - 12, y: newY - 12, width: 24, height: 24 };
    
    for (const wall of walls) {
      if (playerBox.x < wall.x + wall.width &&
          playerBox.x + playerBox.width > wall.x &&
          playerBox.y < wall.y + wall.height &&
          playerBox.y + playerBox.height > wall.y) {
        return true;
      }
    }
    
    for (const obj of objects) {
      if (obj.type === 'plant' || obj.type === 'bonsai') continue;
      const size = obj.size === 'large' ? 30 : 25;
      const objBox = { x: obj.x - size, y: obj.y - size, width: size * 2, height: size * 2 };
      if (playerBox.x < objBox.x + objBox.width &&
          playerBox.x + playerBox.width > objBox.x &&
          playerBox.y < objBox.y + objBox.height &&
          playerBox.y + playerBox.height > objBox.y) {
        return true;
      }
    }

    for (const rock of rocks) {
      const rockBox = { x: rock.x - rock.size/2, y: rock.y - rock.size/2, 
                       width: rock.size, height: rock.size };
      if (playerBox.x < rockBox.x + rockBox.width &&
          playerBox.x + playerBox.width > rockBox.x &&
          playerBox.y < rockBox.y + rockBox.height &&
          playerBox.y + playerBox.height > rockBox.y) {
        return true;
      }
    }
    
    return false;
  };

  const checkInteraction = () => {
    for (const obj of objects) {
      if (!obj.interact) continue;
      const distance = Math.sqrt(
        Math.pow(player.x - obj.x, 2) + Math.pow(player.y - obj.y, 2)
      );
      if (distance < 60) {
        return obj;
      }
    }
    return null;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
      }
      setKeys(prev => ({ ...prev, [e.key]: true }));
      
      if (e.key === ' ' || e.key === 'Enter') {
        const nearbyObj = checkInteraction();
        if (nearbyObj) {
          nearbyObj.interact();
        }
      }
      
      if (e.key === 'Escape') {
        setComputerMode(null);
        setInteraction(null);
      }
      
      if (e.key === 'q' || e.key === 'Q') {
        // Toggle quest log
        setComputerMode(prev => prev === 'quests' ? null : 'quests');
      }
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [player]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;
        let newDirection = prev.direction;

        if (keys['ArrowUp'] || keys['w']) {
          newY -= PLAYER_SPEED;
          newDirection = 'up';
        }
        if (keys['ArrowDown'] || keys['s']) {
          newY += PLAYER_SPEED;
          newDirection = 'down';
        }
        if (keys['ArrowLeft'] || keys['a']) {
          newX -= PLAYER_SPEED;
          newDirection = 'left';
        }
        if (keys['ArrowRight'] || keys['d']) {
          newX += PLAYER_SPEED;
          newDirection = 'right';
        }

        if (newX !== prev.x || newY !== prev.y) {
          if (!checkCollision(newX, newY)) {
            return { x: newX, y: newY, direction: newDirection };
          }
        }

        return prev;
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [keys]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 800, 600);

    // Base floor gradient
    const floorGradient = ctx.createLinearGradient(0, 0, 800, 600);
    floorGradient.addColorStop(0, '#9A7B5F');
    floorGradient.addColorStop(0.5, '#B89968');
    floorGradient.addColorStop(1, '#A0826D');
    ctx.fillStyle = floorGradient;
    ctx.fillRect(0, 0, 800, 600);

    // Wood grain texture
    ctx.strokeStyle = 'rgba(101, 67, 33, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 800, 0);
      ctx.quadraticCurveTo(Math.random() * 800, 300, Math.random() * 800, 600);
      ctx.stroke();
    }

    // Draw zones
    zones.forEach(zone => {
      ctx.fillStyle = zone.color;
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 2;
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(zone.name, zone.x + zone.width / 2, zone.y + 20);
    });

    // Draw walls
    ctx.fillStyle = '#3D2817';
    walls.forEach(wall => {
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });

    // Draw bamboo
    bamboo.forEach(b => {
      const bambooGrad = ctx.createLinearGradient(b.x - 5, 0, b.x + 5, 0);
      bambooGrad.addColorStop(0, '#6B8E23');
      bambooGrad.addColorStop(0.5, '#8FBC8F');
      bambooGrad.addColorStop(1, '#6B8E23');
      ctx.fillStyle = bambooGrad;
      ctx.fillRect(b.x - 5, b.y, 10, 500);
      
      ctx.strokeStyle = '#4A5D23';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(b.x - 5, b.y + 60 * i);
        ctx.lineTo(b.x + 5, b.y + 60 * i);
        ctx.stroke();
      }
      
      ctx.fillStyle = '#7CB342';
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.ellipse(b.x + 10, b.y + 20 + i * 60, 12, 4, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(b.x - 10, b.y + 40 + i * 60, 12, 4, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw rocks
    rocks.forEach(rock => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(rock.x + 2, rock.y + 2, rock.size * 0.7, rock.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      
      const rockGrad = ctx.createRadialGradient(rock.x - 3, rock.y - 3, 0, rock.x, rock.y, rock.size);
      rockGrad.addColorStop(0, '#A8A8A8');
      rockGrad.addColorStop(0.7, '#808080');
      rockGrad.addColorStop(1, '#606060');
      ctx.fillStyle = rockGrad;
      ctx.beginPath();
      ctx.ellipse(rock.x, rock.y, rock.size * 0.7, rock.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw objects
    objects.forEach(obj => {
      const size = obj.size === 'large' ? 28 : 22;
      
      // Show glow if visited
      if (visitedStations.has(obj.id)) {
        ctx.shadowColor = 'rgba(76, 175, 80, 0.5)';
        ctx.shadowBlur = 15;
      }
      
      if (obj.type === 'agent') {
        const deskGrad = ctx.createRadialGradient(obj.x - 10, obj.y - 10, 0, obj.x, obj.y, size + 10);
        deskGrad.addColorStop(0, '#34495E');
        deskGrad.addColorStop(1, '#2C3E50');
        ctx.fillStyle = deskGrad;
        ctx.fillRect(obj.x - size, obj.y - size, size * 2, size * 2);
        
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(obj.x - size + 5, obj.y - size + 5, size * 2 - 10, size * 2 - 10);
        
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#1A252F';
        ctx.lineWidth = 3;
        ctx.strokeRect(obj.x - size, obj.y - size, size * 2, size * 2);
        
      } else if (obj.type === 'plant') {
        ctx.fillStyle = '#2E7D32';
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 15, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          ctx.fillStyle = '#1B5E20';
          ctx.beginPath();
          ctx.arc(obj.x + Math.cos(angle) * 10, obj.y + Math.sin(angle) * 10, 7, 0, Math.PI * 2);
          ctx.fill();
        }
        
      } else if (obj.type === 'bonsai') {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(obj.x - 3, obj.y, 6, 15);
        ctx.fillStyle = '#2E7D32';
        ctx.beginPath();
        ctx.arc(obj.x, obj.y - 5, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(obj.x - 8, obj.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(obj.x + 8, obj.y, 8, 0, Math.PI * 2);
        ctx.fill();
        
      } else if (obj.type === 'zen') {
        const zenGrad = ctx.createRadialGradient(obj.x - 8, obj.y - 8, 0, obj.x, obj.y, size);
        zenGrad.addColorStop(0, '#C0C0C0');
        zenGrad.addColorStop(1, '#888888');
        ctx.fillStyle = zenGrad;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#606060';
        ctx.lineWidth = 2;
        ctx.stroke();
        
      } else {
        const objGrad = ctx.createRadialGradient(obj.x - 8, obj.y - 8, 0, obj.x, obj.y, size + 5);
        
        let color1, color2;
        switch(obj.type) {
          case 'planning': color1 = '#E74C3C'; color2 = '#C0392B'; break;
          case 'technical': color1 = '#3498DB'; color2 = '#2980B9'; break;
          case 'library': color1 = '#F39C12'; color2 = '#D68910'; break;
          case 'storage': color1 = '#95A5A6'; color2 = '#7F8C8D'; break;
          case 'collaboration': color1 = '#2ECC71'; color2 = '#27AE60'; break;
          case 'communication': color1 = '#1ABC9C'; color2 = '#16A085'; break;
          case 'workflow': color1 = '#9B59B6'; color2 = '#8E44AD'; break;
          case 'tasks': color1 = '#E67E22'; color2 = '#D35400'; break;
          case 'tracking': color1 = '#34495E'; color2 = '#2C3E50'; break;
          case 'analytics': color1 = '#16A085'; color2 = '#138D75'; break;
          case 'scheduling': color1 = '#E74C3C'; color2 = '#CB4335'; break;
          case 'creative': color1 = '#F1C40F'; color2 = '#D4AC0D'; break;
          default: color1 = '#8B4513'; color2 = '#654321';
        }
        
        objGrad.addColorStop(0, color1);
        objGrad.addColorStop(1, color2);
        ctx.fillStyle = objGrad;
        ctx.fillRect(obj.x - size, obj.y - size, size * 2, size * 2);
        
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(obj.x - size, obj.y - size, size * 2, size * 2);
      }
      
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      
      if (obj.name) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(obj.x - size - 2, obj.y + size + 2, size * 2 + 4, obj.subtitle ? 24 : 16);
        
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(obj.name, obj.x, obj.y + size + 12);
        
        if (obj.subtitle) {
          ctx.font = '8px Arial';
          ctx.fillStyle = '#AAA';
          ctx.fillText(obj.subtitle, obj.x, obj.y + size + 22);
        }
      }
    });

    // Draw player
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(player.x, player.y + 2, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    const playerGrad = ctx.createRadialGradient(player.x - 3, player.y - 3, 0, player.x, player.y, 15);
    playerGrad.addColorStop(0, '#8B4513');
    playerGrad.addColorStop(1, '#654321');
    ctx.fillStyle = playerGrad;
    ctx.beginPath();
    ctx.arc(player.x, player.y, 14, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#3D2817';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x, player.y, 14, 0, Math.PI * 2);
    ctx.stroke();
    
    // Direction indicator
    ctx.fillStyle = '#7CB342';
    ctx.beginPath();
    if (player.direction === 'up') {
      ctx.moveTo(player.x, player.y - 14);
      ctx.lineTo(player.x - 8, player.y - 6);
      ctx.lineTo(player.x + 8, player.y - 6);
    } else if (player.direction === 'down') {
      ctx.moveTo(player.x, player.y + 14);
      ctx.lineTo(player.x - 8, player.y + 6);
      ctx.lineTo(player.x + 8, player.y + 6);
    } else if (player.direction === 'left') {
      ctx.moveTo(player.x - 14, player.y);
      ctx.lineTo(player.x - 6, player.y - 8);
      ctx.lineTo(player.x - 6, player.y + 8);
    } else if (player.direction === 'right') {
      ctx.moveTo(player.x + 14, player.y);
      ctx.lineTo(player.x + 6, player.y - 8);
      ctx.lineTo(player.x + 6, player.y + 8);
    }
    ctx.fill();

    // Level indicator above player
    ctx.fillStyle = 'rgba(76, 175, 80, 0.9)';
    ctx.fillRect(player.x - 20, player.y - 30, 40, 8);
    ctx.fillStyle = '#4CAF50';
    const xpPercent = playerStats.xp / playerStats.xpToNext;
    ctx.fillRect(player.x - 20, player.y - 30, 40 * xpPercent, 8);
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 1;
    ctx.strokeRect(player.x - 20, player.y - 30, 40, 8);
    
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 9px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Lv${playerStats.level}`, player.x, player.y - 23);

    // Interaction prompt
    const nearbyObj = checkInteraction();
    if (nearbyObj) {
      ctx.fillStyle = 'rgba(34, 139, 34, 0.95)';
      ctx.fillRect(player.x - 65, player.y - 55, 130, 30);
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(nearbyObj.name, player.x, player.y - 40);
      ctx.font = '10px Arial';
      ctx.fillText('Press SPACE', player.x, player.y - 29);
    }

    // Workflow indicator
    if (activeWorkflow) {
      ctx.fillStyle = 'rgba(76, 175, 80, 0.95)';
      ctx.fillRect(10, 10, 280, 45);
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`⚙️ Processing Workflow...`, 20, 32);
    }

    // Notification badge
    if (notifications > 0) {
      ctx.fillStyle = '#E74C3C';
      ctx.beginPath();
      ctx.arc(770, 15, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(notifications, 770, 19);
    }
  }, [player, activeWorkflow, notifications, playerStats, visitedStations]);

  // Simplified modal rendering
  const renderModal = () => {
    if (!computerMode && !interaction) return null;

    return (
      <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center p-8 rounded-lg">
        <div className="bg-gradient-to-br from-stone-900 to-green-900 border-2 border-green-500 rounded-lg p-6 max-w-3xl w-full shadow-2xl max-h-[550px] overflow-y-auto">
          
          {computerMode === 'quests' && (
            <div>
              <h2 className="text-2xl mb-4 flex items-center gap-2 text-white">
                <Trophy size={24} className="text-yellow-400" /> Daily Quests
              </h2>
              <div className="space-y-3">
                {dailyQuests.map(quest => (
                  <div key={quest.id} className={`p-4 rounded border-2 ${quest.completed ? 'bg-green-900/30 border-green-600' : 'bg-black/30 border-gray-600'}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${quest.completed ? 'bg-green-600 border-green-600' : 'border-gray-500'}`}>
                          {quest.completed && <span className="text-white text-xs">✓</span>}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{quest.title}</div>
                          <div className="text-xs text-gray-400">+{quest.xp} XP</div>
                        </div>
                      </div>
                      {quest.completed && <span className="text-green-400 text-sm">Complete!</span>}
                    </div>
                  </div>
                ))}
                <div className="text-center text-sm text-gray-400 mt-4">
                  Complete all quests for bonus rewards!
                </div>
              </div>
              <button onClick={() => setComputerMode(null)} className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg">Close</button>
            </div>
          )}

          {computerMode === 'workflows' && (
            <div>
              <h2 className="text-2xl mb-4 flex items-center gap-2 text-white">
                <ClipboardList size={24} className="text-green-400" /> Workflow Automation
              </h2>
              <div className="space-y-3 mb-6">
                <p className="text-gray-300 text-sm">Automate complex tasks by chaining AI agents together</p>
                <div className="space-y-2">
                  {[
                    { id: 'research-write', name: 'Research & Write', agents: ['Atlas', 'Victoria'], icon: '📚', xp: 50 },
                    { id: 'project-plan', name: 'Project Planning', agents: ['Victoria'], icon: '📋', xp: 40 },
                    { id: 'code-review', name: 'Code Review', agents: ['Nexus'], icon: '💻', xp: 45 },
                    { id: 'daily-briefing', name: 'Daily Briefing', agents: ['Victoria', 'Atlas'], icon: '☀️', xp: 30 }
                  ].map(wf => (
                    <div key={wf.id} className="bg-black/30 p-4 rounded border border-green-700 hover:border-green-500 transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold flex items-center gap-2">
                            <span>{wf.icon}</span> {wf.name}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Agents: {wf.agents.join(', ')} • +{wf.xp} XP
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setComputerMode(null);
                            startWorkflow(wf.id);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                        >
                          Run
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setComputerMode(null)} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg">Close</button>
            </div>
          )}

          {/* Placeholder for other stations */}
          {!computerMode.includes('quest') && !computerMode.includes('workflow') && (
            <div className="text-white">
              <h2 className="text-xl mb-3 capitalize">{computerMode?.replace(/-/g, ' ')}</h2>
              <p className="text-gray-400 text-sm mb-4">
                This station is ready for backend integration. 
                <br/>Interact here to explore workflows and AI-powered features.
              </p>
              <div className="bg-black/30 p-4 rounded mb-4">
                <p className="text-sm text-green-400">✓ Station visited! +5 XP</p>
              </div>
              <button onClick={() => setComputerMode(null)} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg">Close</button>
            </div>
          )}

          {interaction && (
            <div>
              <h3 className="text-2xl font-bold mb-3 text-green-400 font-serif">{interaction.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{interaction.text}</p>
              <button 
                onClick={() => setInteraction(null)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-stone-800 to-gray-900 p-4">
      <div className="bg-gradient-to-br from-amber-900/30 to-stone-900/30 p-6 rounded-lg shadow-2xl backdrop-blur-sm border border-green-800/50">
        
        {/* Top HUD */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-stone-300 font-serif">
              AI Office
            </h1>
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded">
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-white text-sm font-bold">Level {playerStats.level}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setComputerMode('quests')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <Star size={14} />
              Quests ({dailyQuests.filter(q => !q.completed).length})
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
              <Bell size={14} />
              {notifications}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-black/40 p-2 rounded">
            <div className="text-xs text-gray-400 mb-1">XP</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{width: `${(playerStats.xp / playerStats.xpToNext) * 100}%`}}></div>
            </div>
            <div className="text-xs text-white">{playerStats.xp}/{playerStats.xpToNext}</div>
          </div>
          
          <div className="bg-black/40 p-2 rounded">
            <div className="text-xs text-gray-400 mb-1">Focus</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{width: `${playerStats.focus}%`}}></div>
            </div>
            <div className="text-xs text-white">{Math.floor(playerStats.focus)}%</div>
          </div>
          
          <div className="bg-black/40 p-2 rounded">
            <div className="text-xs text-gray-400 mb-1">Energy</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
              <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{width: `${playerStats.energy}%`}}></div>
            </div>
            <div className="text-xs text-white">{Math.floor(playerStats.energy)}%</div>
          </div>
          
          <div className="bg-black/40 p-2 rounded">
            <div className="text-xs text-gray-400 mb-1">Session Time</div>
            <div className="text-lg font-bold text-white">{formatTime(time)}</div>
          </div>
        </div>
        
        <div className="relative">
          <canvas 
            ref={canvasRef}
            width={800}
            height={600}
            className="border-4 border-gradient-to-r from-green-800 to-stone-600 rounded-lg shadow-2xl"
            style={{ boxShadow: '0 0 40px rgba(34, 139, 34, 0.3)' }}
          />
          
          {/* Level Up Notification */}
          {showLevelUp && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-600 text-white px-8 py-4 rounded-lg shadow-2xl border-4 border-yellow-400 animate-bounce">
              <div className="text-center">
                <Trophy size={48} className="mx-auto mb-2" />
                <div className="text-2xl font-bold">LEVEL UP!</div>
                <div className="text-lg">Level {playerStats.level}</div>
              </div>
            </div>
          )}
          
          {renderModal()}
        </div>

        <div className="mt-4 text-stone-200 space-y-3">
          <p className="text-center text-xs font-semibold bg-gradient-to-r from-green-800/50 to-stone-800/50 py-2 rounded">
            <strong className="text-green-300">Controls:</strong> WASD/Arrows to move • SPACE to interact • Q for quests • ESC to close
          </p>
          
          {/* Mini legend */}
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="bg-red-900/20 border border-red-700 p-2 rounded text-center">
              <div className="font-semibold text-red-300">🎯 Leadership</div>
            </div>
            <div className="bg-blue-900/20 border border-blue-700 p-2 rounded text-center">
              <div className="font-semibold text-blue-300">💻 Development</div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-700 p-2 rounded text-center">
              <div className="font-semibold text-yellow-300">📚 Research</div>
            </div>
            <div className="bg-purple-900/20 border border-purple-700 p-2 rounded text-center">
              <div className="font-semibold text-purple-300">⚙️ Workflows</div>
            </div>
          </div>

          <div className="bg-stone-800/50 p-2 rounded text-center">
            <div className="text-[10px] text-gray-400">
              💡 Tip: Visit all stations to explore features • Take zen breaks to restore focus & energy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeGame;
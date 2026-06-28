'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const rulesData = [
  {
    id: '01',
    shortName: 'Eligibility',
    protocol: 'PROTOCOL_01: ELIGIBILITY',
    content: 'The hackathon is open to all eligible participants.\n\n> Participants must complete registration through the official form.\n> Only successfully registered participants will be allowed to participate.'
  },
  {
    id: '02',
    shortName: 'Team Rules',
    protocol: 'PROTOCOL_02: TEAM_STRUCTURE',
    content: 'Participants may register individually or as a team.\n\n> Team size must follow the limits mentioned in the registration form.\n> Team modifications after the registration deadline may not be allowed.'
  },
  {
    id: '03',
    shortName: 'Originality',
    protocol: 'PROTOCOL_03: ORIGINALITY',
    content: 'All projects must be built during the hackathon period.\n\n> Previously built projects, copied work, or reused submissions are strictly prohibited.'
  },
  {
    id: '04',
    shortName: 'Fresh Repo',
    protocol: 'PROTOCOL_04: NEW_REPO',
    content: 'Each team must create a new repository for the hackathon.\n\n> Existing repositories, cloned projects, or forked repositories will not be accepted.'
  },
  {
    id: '05',
    shortName: 'Submission',
    protocol: 'PROTOCOL_05: SUBMISSION_DATA',
    content: 'Every submission must include:\n\n> Source code repository link\n> Project documentation (README.md)\n> Problem statement & Solution explanation\n> Installation/setup guide\n> Demo video or live project link (if available)'
  },
  {
    id: '06',
    shortName: 'Authenticity',
    protocol: 'PROTOCOL_06: AUTHENTICITY',
    content: 'Teams must maintain proper commit history.\n\n> Organizers may verify commits and development timelines to ensure authenticity.'
  },
  {
    id: '07',
    shortName: 'AI Usage',
    protocol: 'PROTOCOL_07: AUTHORIZED_TOOLS',
    content: 'Participants are allowed to use:\n\n> Open-source libraries, APIs, Frameworks\n> AI tools for assistance\n\n[WARNING]: The final implementation must be understood entirely by the team.'
  },
  {
    id: '08',
    shortName: 'Plagiarism',
    protocol: 'PROTOCOL_08: ANTI_PLAGIARISM',
    content: 'Plagiarism in any form will lead to immediate disqualification.\n\n> Similarity checks may be conducted on all submissions.'
  },
  {
    id: '09',
    shortName: 'Judging',
    protocol: 'PROTOCOL_09: EVALUATION',
    content: 'Projects will be judged on:\n\n> Creativity & Innovation\n> Problem Solving & Technical Complexity\n> User Experience & Scalability\n> Presentation'
  },
  {
    id: '10',
    shortName: 'Deadlines',
    protocol: 'PROTOCOL_10: CHRONO_LIMITS',
    content: 'All submissions must be made before the deadline.\n\n> [ERROR_NO_EXCEPTION]: Late entries will not be accepted under any circumstances.'
  },
  {
    id: '11',
    shortName: 'Presentation',
    protocol: 'PROTOCOL_11: JUDGEMENT_DAY',
    content: 'Shortlisted teams may have to present their project before judges.\n\n> Every team member should be ready to explain their specific contribution.'
  },
  {
    id: '12',
    shortName: 'Decision',
    protocol: 'PROTOCOL_12: OVERLORD_DIR',
    content: 'The decision of the judges and organizing team will be final.\n\n> Organizers reserve the right to disqualify any participant violating the rules.'
  },
  {
    id: '13',
    shortName: 'Conduct',
    protocol: 'PROTOCOL_13: CODE_OF_CONDUCT',
    content: 'Respect all participants, mentors, and organizers.\n\n> Any misconduct, abusive behavior, or unethical activity may result in immediate disqualification.'
  }
];

// Typewriter component for the terminal
function TypewriterText({ text, speed = 15, onComplete }: { text: string, speed?: number, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</span>;
}

export default function Rulebook() {
  const [activeRule, setActiveRule] = useState<typeof rulesData[0] | null>(null);
  const [hoveredRule, setHoveredRule] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const isPaused = hoveredRule !== null || activeRule !== null;

  // Responsive radius calculation
  const [radius, setRadius] = useState(260);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        if (window.innerWidth < 1024) {
          setRadius(200); // Tablet
        } else if (window.innerWidth < 1280) {
          setRadius(260); // Desktop
        } else {
          setRadius(300); // Large screens
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openTerminal = (rule: typeof rulesData[0]) => {
    setActiveRule(rule);
    setIsTyping(true);
  };

  const closeTerminal = () => {
    setActiveRule(null);
  };

  return (
    <section id="rules" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-0">
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-counter-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes sweep-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
      
      {/* 1. Background Grid & Glow (z-10) */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-[radial-gradient(circle,rgba(255,0,0,0.1)_0%,transparent_60%)] blur-[100px] pointer-events-none z-10" />

      {isMobile ? (
        /* Mobile View: Vertical Stack */
        <div className="relative z-40 w-full flex flex-col items-center justify-center py-24 px-4">
          <div className="text-center mb-12">
            <h2 className="neon-text text-4xl md:text-5xl text-text-primary mb-4 tracking-widest uppercase">Rulebook</h2>
            <div className="w-24 h-1 bg-neon-red mx-auto shadow-[0_0_15px_var(--neon-red)]" />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
            {rulesData.map((rule) => (
              <div 
                key={rule.id}
                onClick={() => openTerminal(rule)}
                className={`flex items-center justify-between p-5 bg-black border ${activeRule?.id === rule.id ? 'border-neon-red shadow-[0_0_20px_rgba(255,0,0,0.5)]' : 'border-neon-red/40'} rounded-sm cursor-pointer transition-all group`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${activeRule?.id === rule.id ? 'bg-neon-red shadow-[0_0_10px_var(--neon-red)]' : 'bg-transparent border border-neon-red group-hover:bg-neon-red/50'} transition-all`} />
                  <div>
                    <div className="code-font text-neon-red text-[10px] mb-1 opacity-70 tracking-widest uppercase">Rule {rule.id}</div>
                    <div className="text-text-primary text-base font-bold uppercase tracking-wider">{rule.shortName}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop/Tablet View: Animated Orbital Radar */
        <div className="absolute inset-0 flex items-center justify-center z-20">
          
          {/* Dashboard Title HUD (Top Left) */}
          <div className="absolute top-24 left-12 lg:left-24 z-50 text-left pointer-events-none">
            <h2 className="neon-text text-5xl md:text-6xl text-text-primary mb-4 tracking-widest uppercase">Rulebook</h2>
            <div className="w-24 h-1 bg-neon-red shadow-[0_0_15px_var(--neon-red)]" />
          </div>

          {/* 2. Thin Neon Orbit Ring (z-20) */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-neon-red/20 rounded-full pointer-events-none z-20"
            style={{ width: radius * 2, height: radius * 2, boxShadow: '0 0 20px rgba(255,0,0,0.1) inset' }}
          />

          {/* Animated Radar Sweep (z-20) */}
          <div
            className="absolute left-1/2 top-1/2 rounded-full pointer-events-none z-20"
            style={{ 
              width: radius * 2, 
              height: radius * 2, 
              background: 'conic-gradient(from 0deg, transparent 60%, rgba(255,0,0,0.2) 100%)',
              animation: 'sweep-spin 6s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {/* Leading edge line of the sweep */}
            <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-neon-red shadow-[0_0_20px_var(--neon-red)] origin-bottom -translate-x-1/2" />
          </div>

          {/* 3 & 4. Revolving Orbit Container (z-30) */}
          <div 
            className="absolute left-1/2 top-1/2 z-30"
            style={{ 
              width: 0, 
              height: 0,
              animation: 'orbit-spin 25s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {/* Connecting SVG Lines */}
            <svg 
              className="absolute pointer-events-none" 
              style={{ left: -radius, top: -radius, width: radius * 2, height: radius * 2 }}
            >
              {rulesData.map((rule, i) => {
                const angleDeg = (360 / rulesData.length) * i;
                const angleRad = (angleDeg * Math.PI) / 180 - Math.PI / 2;
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;
                const isHighlighted = activeRule?.id === rule.id || hoveredRule === rule.id;
                
                return (
                  <line 
                    key={`line-${rule.id}`}
                    x1={radius} 
                    y1={radius} 
                    x2={radius + x} 
                    y2={radius + y} 
                    stroke={isHighlighted ? "rgba(255,0,0,0.8)" : "transparent"} 
                    strokeWidth={isHighlighted ? "2" : "0"} 
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Orbiting Nodes (Cards) */}
            {rulesData.map((rule, i) => {
              const angleDeg = (360 / rulesData.length) * i;
              const angleRad = (angleDeg * Math.PI) / 180 - Math.PI / 2;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              const isActive = activeRule?.id === rule.id;

              return (
                <div
                  key={rule.id}
                  className="absolute z-40"
                  style={{ 
                    left: x, 
                    top: y, 
                    animation: 'orbit-counter-spin 25s linear infinite',
                    animationPlayState: isPaused ? 'paused' : 'running'
                  }}
                >
                  <div 
                    className={`group relative flex flex-col items-center justify-center cursor-pointer w-[140px] xl:w-[150px] p-4 bg-black border ${isActive ? 'border-neon-red shadow-[0_0_30px_rgba(255,0,0,0.9)] scale-110' : 'border-neon-red/50 hover:border-neon-red hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] hover:scale-105'} rounded-sm transition-all duration-300`}
                    onMouseEnter={() => setHoveredRule(rule.id)}
                    onMouseLeave={() => setHoveredRule(null)}
                    onClick={() => openTerminal(rule)}
                  >
                    <div className="flex items-center gap-2 mb-2 w-full justify-center">
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-neon-red shadow-[0_0_10px_var(--neon-red)]' : 'bg-transparent border border-neon-red group-hover:bg-neon-red transition-all'}`} />
                      <span className="code-font text-neon-red text-[10px] tracking-widest uppercase opacity-80">Rule {rule.id}</span>
                    </div>
                    <span className="text-text-primary text-sm font-bold uppercase tracking-wider text-center w-full leading-tight">
                      {rule.shortName}
                    </span>
                    
                    {/* Cyberpunk Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-red opacity-50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-red opacity-50" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5. Mission Core (z-50) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-black border-2 border-neon-red shadow-[0_0_50px_rgba(255,0,0,0.8)] cursor-default">
            <div className="absolute inset-0 rounded-full bg-neon-red opacity-10 animate-pulse" />
            <div className="w-20 h-20 rounded-full border border-dashed border-neon-red animate-[spin_10s_linear_infinite] absolute" />
            <span className="code-font text-neon-red text-xs font-bold text-center tracking-widest uppercase leading-tight z-10">Mission<br/>Core</span>
          </div>
        </div>
      )}

      {/* Terminal Details Side Panel / Bottom Sheet */}
      <AnimatePresence>
        {activeRule && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTerminal}
            />

            <motion.div 
              className="fixed bottom-0 md:top-0 right-0 w-full md:w-[500px] h-[75vh] md:h-screen bg-black border-t md:border-t-0 md:border-l border-neon-red z-[100] shadow-[0_0_50px_rgba(255,0,0,0.3)] flex flex-col"
              initial={isMobile ? { y: '100%' } : { x: '100%' }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: '100%' } : { x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-neon-red/10 border-b border-neon-red/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="code-font text-neon-red text-sm tracking-widest">OMNIKON_TERMINAL_V1.0</span>
                </div>
                <button 
                  onClick={closeTerminal}
                  className="text-neon-red hover:text-white transition-colors code-font text-lg px-2 py-1 bg-black border border-neon-red/30 rounded-sm hover:border-neon-red"
                >
                  [X]
                </button>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 code-font text-text-primary text-sm md:text-base leading-relaxed relative scrollbar-hide">
                {/* Glitch Overlay Effect */}
                <motion.div 
                  className="absolute inset-0 bg-neon-red/5 pointer-events-none mix-blend-overlay"
                  animate={{ opacity: [0, 0.2, 0, 0.1, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
                />

                <div className="text-neon-red mb-6">
                  <TypewriterText 
                    text={`> INITIALIZING SECURE CONNECTION...\n> FETCHING PROTOCOL_${activeRule.id}...\n> DECRYPTING... DONE.\n\n`} 
                    speed={15} 
                    onComplete={() => setIsTyping(false)} 
                  />
                </div>

                {!isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.1 }}
                    className="mt-6"
                  >
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="text-black bg-neon-red font-bold px-2 py-1 text-xs tracking-widest">RULE {activeRule.id}</div>
                      <div className="text-neon-red text-xl md:text-2xl font-bold drop-shadow-[0_0_5px_rgba(255,0,0,0.8)] tracking-wider uppercase">
                        {activeRule.shortName}
                      </div>
                    </div>
                    
                    <div className="text-neon-red text-sm font-mono mb-8 opacity-70 border-b border-neon-red/30 pb-4">
                      {activeRule.protocol}
                    </div>

                    <div className="text-gray-300 space-y-4">
                      <TypewriterText text={activeRule.content} speed={10} />
                    </div>
                  </motion.div>
                )}

                {/* Blinking Cursor */}
                <motion.span 
                  className="inline-block w-2 h-5 bg-neon-red ml-1 align-middle mt-2"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

const rulesData = [
  { id: '01', shortName: 'Eligibility', protocol: 'DIRECTIVE_01: ELIGIBILITY_SCAN', content: 'The hackathon is open to all eligible participants.\n\n> Participants must complete registration through the official form.\n> Only successfully registered participants will be allowed to participate.' },
  { id: '02', shortName: 'Team Rules', protocol: 'DIRECTIVE_02: TEAM_STRUCTURE', content: 'Participants may register individually or as a team.\n\n> Team size must follow the limits mentioned in the registration form.\n> Team modifications after the registration deadline may not be allowed.' },
  { id: '03', shortName: 'Originality', protocol: 'DIRECTIVE_03: ORIGINALITY', content: 'All projects must be built during the hackathon period.\n\n> Previously built projects, copied work, or reused submissions are strictly prohibited.' },
  { id: '04', shortName: 'Fresh Repo', protocol: 'DIRECTIVE_04: NEW_REPO', content: 'Each team must create a new repository for the hackathon.\n\n> Existing repositories, cloned projects, or forked repositories will not be accepted.' },
  { id: '05', shortName: 'Submission', protocol: 'DIRECTIVE_05: SUBMISSION_DATA', content: 'Every submission must include:\n\n> Source code repository link\n> Project documentation (README.md)\n> Problem statement & Solution explanation\n> Installation/setup guide\n> Demo video or live project link (if available)' },
  { id: '06', shortName: 'Authenticity', protocol: 'DIRECTIVE_06: AUTHENTICITY', content: 'Teams must maintain proper commit history.\n\n> Organizers may verify commits and development timelines to ensure authenticity.' },
  { id: '07', shortName: 'AI Usage', protocol: 'DIRECTIVE_07: AUTHORIZED_TOOLS', content: 'Participants are allowed to use:\n\n> Open-source libraries, APIs, Frameworks\n> AI tools for assistance\n\n[WARNING]: The final implementation must be understood entirely by the team.' },
  { id: '08', shortName: 'Plagiarism', protocol: 'DIRECTIVE_08: ANTI_PLAGIARISM', content: 'Plagiarism in any form will lead to immediate disqualification.\n\n> Similarity checks may be conducted on all submissions.' },
  { id: '09', shortName: 'Judging', protocol: 'DIRECTIVE_09: EVALUATION', content: 'Projects will be judged on:\n\n> Creativity & Innovation\n> Problem Solving & Technical Complexity\n> User Experience & Scalability\n> Presentation' },
  { id: '10', shortName: 'Deadlines', protocol: 'DIRECTIVE_10: CHRONO_LIMITS', content: 'All submissions must be made before the deadline.\n\n> [ERROR_NO_EXCEPTION]: Late entries will not be accepted under any circumstances.' },
  { id: '11', shortName: 'Presentation', protocol: 'DIRECTIVE_11: JUDGEMENT_DAY', content: 'Shortlisted teams may have to present their project before judges.\n\n> Every team member should be ready to explain their specific contribution.' },
  { id: '12', shortName: 'Decision', protocol: 'DIRECTIVE_12: OVERLORD_DIR', content: 'The decision of the judges and organizing team will be final.\n\n> Organizers reserve the right to disqualify any participant violating the rules.' },
  { id: '13', shortName: 'Conduct', protocol: 'DIRECTIVE_13: CODE_OF_CONDUCT', content: 'Respect all participants, mentors, and organizers.\n\n> Any misconduct, abusive behavior, or unethical activity may result in immediate disqualification.' }
];

function TypewriterText({ text, speed = 15, onComplete }: { text: string, speed?: number, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</span>;
}

export default function Rulebook() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = true; // Force true to animate on mount instead of scroll
  
  const [activeRule, setActiveRule] = useState<typeof rulesData[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Animation Phases: 'logo' -> 'compressing' -> 'closed-eye' -> 'open-eye'
  const [phase, setPhase] = useState<'logo' | 'compressing' | 'closed-eye' | 'open-eye'>('logo');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Animation Controls
  const logoControls = useAnimation();
  const topLidControls = useAnimation();
  const bottomLidControls = useAnimation();
  const irisControls = useAnimation();

  // Responsive radius calculation
  const [radius, setRadius] = useState(300);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        if (window.innerWidth < 1024) setRadius(200); // Tablet
        else if (window.innerWidth < 1280) setRadius(250); // Desktop
        else setRadius(280); // Large screens
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cinematic Sequence
  useEffect(() => {
    const runSequence = async () => {
      if (isInView) {
        // Step 1: Start with logo, ring rotates, core glows
        setPhase('logo');
        await new Promise(r => setTimeout(r, 600));

        // Step 2: Logo compresses horizontally
        setPhase('compressing');
        await logoControls.start({ scaleX: 0, opacity: 0, transition: { duration: 0.8, ease: "backIn" } });

        // Step 3: Logo splits into closed eye
        setPhase('closed-eye');
        await new Promise(r => setTimeout(r, 400));

        // Step 4: Eye opens
        setPhase('open-eye');
        topLidControls.start({ y: '-100%', transition: { duration: 1.5, ease: "easeInOut" } });
        bottomLidControls.start({ y: '100%', transition: { duration: 1.5, ease: "easeInOut" } });
        irisControls.start({ opacity: 1, scale: 1, transition: { duration: 1, delay: 0.5, ease: "backOut" } });

      } else {
        // Exit sequence
        if (phase === 'open-eye') {
          topLidControls.start({ y: '0%', transition: { duration: 1, ease: "easeInOut" } });
          bottomLidControls.start({ y: '0%', transition: { duration: 1, ease: "easeInOut" } });
          irisControls.start({ opacity: 0, scale: 0.5, transition: { duration: 0.5 } });
          await new Promise(r => setTimeout(r, 1000));
          setPhase('closed-eye');
          await new Promise(r => setTimeout(r, 300));
          setPhase('compressing');
          await logoControls.start({ scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: "backOut" } });
          setPhase('logo');
        }
      }
    };
    runSequence();
  }, [isInView]);

  // Pupil Tracking Math
  let pupilX = 0;
  let pupilY = 0;
  let pupilScale = 1;

  if (activeRule || hoveredIndex !== null) {
    const targetIdx = activeRule ? rulesData.findIndex(r => r.id === activeRule.id) : hoveredIndex;
    if (targetIdx !== null && targetIdx !== -1) {
      const angle = (targetIdx / rulesData.length) * 2 * Math.PI - Math.PI / 2;
      const maxTranslate = 35; // Max pixels pupil can move within the iris
      pupilX = Math.cos(angle) * maxTranslate;
      pupilY = Math.sin(angle) * maxTranslate;
      if (activeRule) pupilScale = 0.5; // Pupil contracts heavily when locked
    }
  } else if (containerRef.current && phase === 'open-eye') {
    const rect = containerRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;
    
    const dx = mousePos.x - eyeCenterX;
    const dy = mousePos.y - eyeCenterY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.05, 25);
    
    pupilX = Math.cos(angle) * dist;
    pupilY = Math.sin(angle) * dist;
  }

  const openTerminal = (rule: typeof rulesData[0]) => {
    setActiveRule(rule);
    setIsTyping(true);
  };

  const closeTerminal = () => {
    setActiveRule(null);
  };

  return (
    <section id="rules" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-20">
      
      {/* Surveillance Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:100%_4px]" />
        
        {/* Radar sweeping cone */}
        {phase === 'open-eye' && (
          <motion.div
            className="absolute left-1/2 top-1/2 rounded-full pointer-events-none opacity-20"
            style={{ width: radius * 3, height: radius * 3, x: '-50%', y: '-50%', background: 'conic-gradient(from 0deg, transparent 70%, rgba(255,0,0,0.3) 100%)' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          />
        )}
      </div>

      {isMobile ? (
        /* Mobile View: Simplified List */
        <div className="relative z-40 w-full flex flex-col items-center justify-center px-4">
          <div className="text-center mb-10 relative">
            <h2 className="neon-text text-4xl md:text-5xl text-text-primary tracking-widest uppercase font-mono">Rulebook Core</h2>
          </div>
          <div className="w-24 h-24 rounded-full border-2 border-neon-red bg-black relative flex items-center justify-center overflow-hidden mb-12 shadow-[0_0_30px_rgba(255,0,0,0.4)]">
            <motion.div className="absolute inset-2 border border-dashed border-neon-red/50 rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} />
            <motion.div className="w-8 h-8 rounded-full bg-neon-red shadow-[0_0_15px_var(--neon-red)]" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            {rulesData.map((rule) => (
              <div 
                key={rule.id}
                onClick={() => openTerminal(rule)}
                className={`flex items-center justify-between p-4 bg-black border ${activeRule?.id === rule.id ? 'border-neon-red shadow-[0_0_20px_rgba(255,0,0,0.5)]' : 'border-neon-red/30 hover:border-neon-red/70'} rounded-sm cursor-pointer transition-all group`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${activeRule?.id === rule.id ? 'bg-neon-red shadow-[0_0_10px_var(--neon-red)]' : 'bg-transparent border border-neon-red'} transition-all`} />
                  <span className="text-text-primary text-sm font-bold uppercase tracking-wider font-mono">{rule.shortName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop/Tablet View: The Living Eye & Orbit */
        <div className="absolute inset-0 flex items-center justify-center z-20">
          
          {/* Dashboard Title HUD */}
          <div className="absolute top-16 left-12 lg:left-24 z-50 text-left pointer-events-none opacity-80">
            <h2 className="neon-text text-4xl lg:text-5xl text-text-primary mb-3 tracking-widest uppercase font-mono">RULEBOOK<br/>CORE</h2>
            <div className="w-12 h-[2px] bg-neon-red shadow-[0_0_15px_var(--neon-red)]" />
          </div>

          {/* Neural Paths */}
          {phase === 'open-eye' && (
            <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-20" style={{ transform: 'translate(50%, 50%)' }}>
              {rulesData.map((rule, i) => {
                const angle = (i / rulesData.length) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isActive = activeRule?.id === rule.id;
                return (
                  <g key={`path-${rule.id}`}>
                    <motion.line 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                      x1={0} y1={0} x2={x} y2={y} stroke="rgba(255,0,0,0.15)" strokeWidth="1" 
                    />
                    {isActive && (
                      <motion.line 
                        x1={0} y1={0} x2={x} y2={y} stroke="rgba(255,0,0,1)" strokeWidth="2" strokeDasharray="10 20"
                        animate={{ strokeDashoffset: [30, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
                        style={{ filter: 'drop-shadow(0 0 8px rgba(255,0,0,1))' }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          )}

          {/* Central Transformation Container */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-64 h-64">
            
            {/* Phase 1 & 2: Omnikon Logo */}
            {(phase === 'logo' || phase === 'compressing') && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scaleX: 1, opacity: 1 }}
                animate={logoControls}
              >
                {/* Rotating Outer Ring */}
                <motion.div 
                  animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                  className="absolute inset-[-20%] rounded-full border-2 border-dashed border-neon-red shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                />
                <img src="/LogoOmnikon.jpeg" alt="Omnikon" className="w-full h-full object-cover rounded-full shadow-[0_0_40px_rgba(255,0,0,0.8)] border-4 border-neon-red/80 z-10" />
                <div className="absolute inset-0 bg-red-600/20 mix-blend-overlay animate-pulse rounded-full z-20" />
              </motion.div>
            )}

            {/* Phase 3 & 4: Mechanical Eye */}
            {(phase === 'closed-eye' || phase === 'open-eye') && (
              <div className="relative w-full h-full rounded-full bg-black overflow-hidden shadow-[0_0_60px_rgba(255,0,0,0.5)] border-4 border-neon-red/30">
                
                {/* Inner Eye Components (Visible when open) */}
                <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 0.5 }} animate={irisControls}>
                  <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-neon-red/30 animate-[spin_15s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border-t-4 border-neon-red/50 animate-[spin_8s_linear_infinite_reverse]" />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,0,0,0.4)_0%,transparent_60%)]"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  />
                  {/* The Tracking Pupil */}
                  <motion.div 
                    className="absolute left-1/2 top-1/2 flex items-center justify-center w-24 h-24 rounded-full border-[6px] border-neon-red bg-black shadow-[0_0_40px_rgba(255,0,0,1)]"
                    initial={{ x: '-50%', y: '-50%' }}
                    animate={{ x: `calc(-50% + ${pupilX}px)`, y: `calc(-50% + ${pupilY}px)`, scale: pupilScale }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,0,0,0.6)_0%,transparent_80%)] rounded-full animate-pulse" />
                    <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_15px_#fff]" />
                  </motion.div>
                </motion.div>

                {/* Top Mechanical Eyelid */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-[105%] bg-[linear-gradient(to_bottom,#111,#000)] border-b-[6px] border-neon-red shadow-[0_15px_30px_rgba(0,0,0,1)] origin-top z-40 flex items-end justify-center pb-2"
                  initial={{ y: 0 }}
                  animate={topLidControls}
                >
                  <div className="w-1/2 h-1 bg-neon-red/30 rounded-full" />
                </motion.div>
                
                {/* Bottom Mechanical Eyelid */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-[105%] bg-[linear-gradient(to_top,#111,#000)] border-t-[6px] border-neon-red shadow-[0_-15px_30px_rgba(0,0,0,1)] origin-bottom z-40 flex items-start justify-center pt-2"
                  initial={{ y: 0 }}
                  animate={bottomLidControls}
                >
                  <div className="w-1/2 h-1 bg-neon-red/30 rounded-full" />
                </motion.div>

                {/* Glowing Seam (Visible only when closed) */}
                {phase === 'closed-eye' && (
                  <motion.div 
                    className="absolute top-1/2 left-0 w-full h-[2px] bg-white shadow-[0_0_20px_rgba(255,0,0,1)] z-50 -translate-y-1/2"
                    initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Orbiting Rules Nodes */}
          {phase === 'open-eye' && rulesData.map((rule, i) => {
            const angle = (i / rulesData.length) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = activeRule?.id === rule.id;

            return (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + (i * 0.05), type: 'spring' }}
                className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              >
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 + (i % 3), delay: i * 0.2, ease: 'easeInOut' }}>
                  <div 
                    className={`group relative flex items-center px-6 py-3 bg-black/90 border-2 rounded-sm cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                      isActive ? 'border-neon-red shadow-[0_0_30px_rgba(255,0,0,1)] scale-110 z-50' : 
                      'border-neon-red/40 hover:border-neon-red hover:shadow-[0_0_20px_rgba(255,0,0,0.8)]'
                    }`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => openTerminal(rule)}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-2 text-[10px] text-neon-red font-mono font-bold tracking-widest border border-neon-red/50">
                      {rule.id}
                    </div>
                    <span className="text-white text-xs lg:text-sm font-bold font-mono tracking-widest whitespace-nowrap mt-1">
                      {rule.shortName}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Surveillance Data Terminal (Sidebar) */}
      <AnimatePresence>
        {activeRule && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/80 z-[90] backdrop-blur-md"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
              <div className="flex items-center justify-between px-6 py-4 bg-red-950/20 border-b border-neon-red/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,0,0,0.2)_50%,transparent_100%)] animate-[pulse_2s_ease-in-out_infinite]" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-neon-red animate-pulse shadow-[0_0_15px_rgba(255,0,0,1)]" />
                  <span className="font-mono text-neon-red text-sm tracking-widest font-bold">CORE_TERMINAL_ACCESS</span>
                </div>
                <button 
                  onClick={closeTerminal}
                  className="relative z-10 text-neon-red hover:text-white transition-colors font-mono text-sm px-4 py-1 bg-black border border-neon-red/60 hover:bg-neon-red hover:shadow-[0_0_15px_rgba(255,0,0,0.8)]"
                >
                  [DISCONNECT]
                </button>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 font-mono text-gray-300 text-sm md:text-base leading-relaxed relative scrollbar-hide bg-[linear-gradient(rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[size:100%_4px]">
                
                {/* Camera Overlay Elements */}
                <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-neon-red/50 pointer-events-none" />
                <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-neon-red/50 pointer-events-none" />
                <div className="absolute top-6 right-8 text-xs text-neon-red/60 animate-pulse pointer-events-none pr-2">REC</div>

                <div className="text-neon-red mb-10 border-l-2 border-neon-red pl-4 text-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                  <TypewriterText 
                    text={`> ALIGNING SURVEILLANCE OPTICS...\n> TARGET ACQUIRED: SECTOR ${activeRule.id}\n> DECRYPTING DIRECTIVE...\n> FEED LIVE.\n\n`} 
                    speed={15} 
                    onComplete={() => setIsTyping(false)} 
                  />
                </div>

                {!isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.1, type: 'spring' }}
                    className="mt-8 pl-4"
                  >
                    <div className="inline-flex flex-col gap-2 mb-8">
                      <div className="text-black bg-neon-red font-bold px-3 py-1 text-xs tracking-[4px] uppercase w-fit">DIRECTIVE {activeRule.id}</div>
                      <div className="text-neon-red text-4xl font-bold drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] tracking-widest uppercase mt-2">
                        {activeRule.shortName}
                      </div>
                    </div>
                    
                    <div className="text-neon-red/60 text-sm font-mono mb-8 border-b border-neon-red/30 pb-4 tracking-widest">
                      // {activeRule.protocol}
                    </div>

                    <div className="space-y-6 text-gray-300 leading-8">
                      <TypewriterText text={activeRule.content} speed={10} />
                    </div>
                  </motion.div>
                )}

                <motion.span 
                  className="inline-block w-3 h-5 bg-neon-red ml-1 align-middle mt-4"
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

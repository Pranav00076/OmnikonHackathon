'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const floatingIcons = [
  { label: '</>', x: -300, y: -200, pathX: [0, -60, 40, 0], pathY: [0, 80, -50, 0], rot: [0, 10, -5, 0], dur: 15 },
  { label: 'React', x: 350, y: -150, pathX: [0, 70, -30, 0], pathY: [0, -60, 40, 0], rot: [0, -10, 5, 0], dur: 18 },
  { label: 'Node', x: -350, y: 200, pathX: [0, 50, -80, 0], pathY: [0, 40, -60, 0], rot: [0, 5, -10, 0], dur: 20 },
  { label: 'API', x: 250, y: 250, pathX: [0, -50, 60, 0], pathY: [0, 70, -30, 0], rot: [0, -5, 10, 0], dur: 14 },
  { label: 'MongoDB', x: 0, y: -280, pathX: [0, 60, -40, 0], pathY: [0, -30, 80, 0], rot: [0, 15, -15, 0], dur: 16 },
  { label: 'Fullstack', x: 250, y: 60, pathX: [0, -80, 50, 0], pathY: [0, -50, 60, 0], rot: [0, -10, 5, 0], dur: 19 },
  { label: 'AI', x: -150, y: 150, pathX: [0, -30, 60, 0], pathY: [0, 40, -20, 0], rot: [0, 15, -10, 0], dur: 17 },
];

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days from now

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-6 sm:gap-12 mt-16">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center group">
          <div className="code-font neon-text text-4xl sm:text-6xl font-bold group-hover:scale-110 transition-transform duration-300">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm uppercase tracking-[2px] text-neon-red mt-2 font-mono">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-[100px] pb-[50px] overflow-hidden">
      
      {/* Floating Tech Tags */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          animate={{
            x: icon.pathX,
            y: icon.pathY,
            rotate: icon.rot
          }}
          transition={{
            duration: icon.dur,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={cn(
            "absolute code-font glass text-lg font-bold z-10 px-4 py-2 rounded border border-neon-red",
            "shadow-[0_0_15px_rgba(255,0,0,0.4),inset_0_0_10px_rgba(255,0,0,0.1)] pointer-events-none",
            "tracking-wider text-text-primary text-shadow-sm hover:scale-110 transition-transform"
          )}
          style={{
            left: `calc(50% + ${icon.x}px)`,
            top: `calc(50% + ${icon.y}px)`,
          }}
        >
          {icon.label}
        </motion.div>
      ))}

      {/* Reactor Core Logo & Content */}
      <div className="relative z-20 flex flex-col items-center">
        
        {/* Core */}
        <div className="relative w-[250px] h-[250px] mb-8 group cursor-pointer">
          {/* Energy Rings */}
          <motion.div 
            animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.3, 0.7, 0.3], rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-dashed border-neon-red opacity-30 group-hover:border-solid transition-all"
          />
          <motion.div 
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,var(--neon-red)_0%,transparent_70%)] blur-[30px] z-0"
          />
          
          <motion.img 
            src="/LogoDemonDie.jpeg" 
            alt="DemonDie Logo" 
            className="w-full h-full object-cover rounded-full border-2 border-neon-red relative z-10 shadow-[0_0_40px_var(--neon-red)] group-hover:scale-105 group-hover:shadow-[0_0_80px_var(--neon-red)] transition-all duration-300"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Hero Text */}
        <motion.h1 
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.8 }}
          className="neon-text text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-center mb-4 leading-tight text-text-primary tracking-tighter"
        >
          CODE. THINK.<br/>CONQUER.
        </motion.h1>
        
        <motion.p 
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl sm:text-2xl text-text-secondary text-center max-w-3xl tracking-[2px] mt-4 font-light"
        >
          The ultimate Web Dev & Full Stack Hackathon
        </motion.p>

        {/* Buttons */}
        <motion.div 
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap gap-6 sm:gap-8 mt-12 justify-center"
        >
          <a href="#register" className="relative group overflow-hidden px-8 py-4 bg-neon-red text-black font-bold text-lg sm:text-xl uppercase tracking-[2px] devil-horn-card hover:shadow-[0_0_30px_var(--neon-red)] transition-shadow duration-300">
            <span className="relative z-10">Register on Unstop</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          
          <a href="#rules" className="glass px-8 py-4 text-text-primary font-bold text-lg sm:text-xl uppercase tracking-[2px] hover:border-neon-red hover:text-neon-red transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]">
            Rulebook
          </a>
          
          <a href="#discord" className="glass px-8 py-4 text-text-primary font-bold text-lg sm:text-xl uppercase tracking-[2px] hover:border-neon-red hover:text-neon-red transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]">
            Join Discord
          </a>
        </motion.div>

        <Countdown />
      </div>
    </section>
  );
}

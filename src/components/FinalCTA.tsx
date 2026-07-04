'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  const [particles, setParticles] = useState<{id: number, x: string, y: string, dur: number, delay: number}[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        x: Math.random() > 0.5 ? '100vw' : '-100vw',
        y: `${Math.random() * 100}vh`,
        dur: Math.random() * 2 + 1.5,
        delay: Math.random() * 2
      }))
    );
  }, []);

  return (
    <section className="relative py-32 px-6 min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background storm-like particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15)_0%,transparent_60%)]" />
        
        {/* Converging red particles effect */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-neon-red rounded-full shadow-[0_0_10px_var(--neon-red)]"
            initial={{ 
              x: p.x,
              y: p.y,
              opacity: 0
            }}
            animate={{ 
              x: '50vw',
              y: '50vh',
              opacity: [0, 1, 0],
              scale: [1, 2, 0]
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: "circIn",
              delay: p.delay
            }}
          />
        ))}
      </div>

      <div 
        className="relative z-10 w-full max-w-4xl mx-auto text-center bg-[#0a0a0a]/95 neon-border p-12 md:p-20 rounded-3xl overflow-hidden group"
      >
        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1)_0%,transparent_70%)] pointer-events-none" />

        <h2 className="neon-text text-5xl md:text-7xl lg:text-8xl text-text-primary mb-8 font-bold tracking-tighter">
          ENTER THE<br />BATTLEFIELD
        </h2>
        
        <p className="text-text-secondary text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light tracking-wide">
          The clock is ticking. Assemble your squad, arm yourself with code, and prepare for glory.
        </p>

        <a 
          href="#register" 
          className="relative inline-flex group/btn overflow-hidden px-10 py-5 bg-neon-red text-black font-bold text-xl md:text-2xl uppercase tracking-[3px] devil-horn-card transition-transform duration-300 hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-4">
            Register Now
            <motion.span 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}

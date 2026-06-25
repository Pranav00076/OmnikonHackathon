'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

const phases = [
  { id: '01', title: 'Registration', desc: 'Secure your spot in the arena.' },
  { id: '02', title: 'Team Formation', desc: 'Ally with elite hackers.' },
  { id: '03', title: 'Build Phase', desc: '48 hours to code your MVP.' },
  { id: '04', title: 'Submission', desc: 'Deploy your weapon.' },
  { id: '05', title: 'Final Battle', desc: 'Present to the overlords.' }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (lineRef.current && containerRef.current && scrollWrapperRef.current) {
      // Horizontal scrolling for the timeline container
      const scrollWidth = scrollWrapperRef.current.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth + 100;

      if (amountToScroll > 0 && window.innerWidth < 1024) {
        // Mobile/Tablet horizontal scroll
        gsap.to(scrollWrapperRef.current, {
          x: -amountToScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top+=100',
            end: `+=${amountToScroll}`,
            scrub: 1,
            pin: true,
          }
        });
      }

      // Line progress animation
      gsap.fromTo(lineRef.current, 
        { width: '0%' }, 
        {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          }
        }
      );
    }
  }, []);

  return (
    <section id="timeline" className="py-24 px-6 min-h-[80vh] flex flex-col justify-center overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto w-full mb-16">
        <div className="text-center">
          <h2 className="neon-text text-5xl md:text-6xl text-text-primary mb-6">MISSION PROGRESS</h2>
          <div className="w-24 h-1 bg-neon-red mx-auto shadow-[0_0_15px_var(--neon-red)]" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative mt-12 overflow-x-visible">
        <div ref={scrollWrapperRef} className="flex lg:grid lg:grid-cols-5 gap-8 lg:gap-4 relative w-max lg:w-full px-6 lg:px-0">
          
          {/* Background subtle line */}
          <div className="absolute top-8 left-6 lg:left-0 right-6 lg:right-0 h-[2px] bg-glass-border z-0" />
          
          {/* Animated red line */}
          <div ref={lineRef} className="absolute top-8 left-6 lg:left-0 h-[2px] bg-neon-red shadow-[0_0_10px_var(--neon-red)] z-0" />

          {phases.map((phase, index) => (
            <motion.div 
              key={phase.id} 
              className="relative z-10 flex flex-col items-center w-[250px] lg:w-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {/* Node */}
              <div className="w-16 h-16 rounded-full bg-black border-4 border-neon-red shadow-[0_0_15px_var(--neon-red)] flex items-center justify-center mb-6 group hover:scale-110 transition-transform cursor-pointer relative">
                <span className="code-font text-neon-red font-bold text-lg">{phase.id}</span>
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full border border-neon-red opacity-0 group-hover:animate-ping" />
              </div>
              
              {/* Content */}
              <div className="text-center glass neon-border p-6 rounded-lg group hover:-translate-y-2 transition-transform duration-300 w-full">
                <div className="code-font text-neon-red text-sm mb-2 opacity-70">PHASE {phase.id}</div>
                <h3 className="text-xl text-text-primary mb-2 font-bold">{phase.title}</h3>
                <p className="text-text-secondary text-sm font-light">{phase.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

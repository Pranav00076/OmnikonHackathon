'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const phases = [
  { id: '01', date: '10 JUL 2026', title: 'Registration', desc: 'Official launch. Secure your spot.' },
  { id: '02', date: '01 AUG 2026', title: 'Idea Submission', desc: 'Submit your problem statement and proposed solution.' },
  { id: '03', date: '10 AUG 2026', title: 'Documentation', desc: 'Submit a detailed Phase 1 project proposal (PDF).' },
  { id: '04', date: '17 AUG 2026', title: 'Presentation', desc: 'Project proposal presentation (PPT) for feedback.' },
  { id: '05', date: '25 AUG 2026', title: 'Prototype', desc: 'Submit a working prototype for evaluation.' },
  { id: '06', date: '01 SEP 2026', title: 'Results', desc: 'Winners announced and projects showcased.' }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (lineRef.current && containerRef.current) {
      // Vertical line progress animation
      gsap.fromTo(lineRef.current, 
        { height: '0%' }, 
        {
          height: '100%',
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
      <div className="max-w-7xl mx-auto w-full mb-20">
        <div className="text-center">
          <h2 className="neon-text text-5xl md:text-6xl text-text-primary mb-6">MISSION PROGRESS</h2>
          <div className="w-24 h-1 bg-neon-red mx-auto shadow-[0_0_15px_var(--neon-red)]" />
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto relative">
        {/* Background subtle line */}
        <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] bg-glass-border -translate-x-1/2 z-0" />
        
        {/* Animated red line */}
        <div ref={lineRef} className="absolute left-6 lg:left-1/2 top-0 w-[2px] bg-neon-red shadow-[0_0_10px_var(--neon-red)] -translate-x-1/2 z-0" />

        <div className="flex flex-col gap-12 lg:gap-16 relative">
          {phases.map((phase, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={phase.id} 
                className={`relative z-10 flex items-center justify-between w-full flex-row ${isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                
                {/* Empty Spacer for Desktop */}
                <div className="hidden lg:block w-5/12" />

                {/* Node */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-black border-4 border-neon-red shadow-[0_0_15px_var(--neon-red)] flex items-center justify-center group hover:scale-110 transition-transform cursor-pointer">
                  <span className="code-font text-neon-red font-bold text-lg">{phase.id}</span>
                  <div className="absolute inset-0 rounded-full border border-neon-red opacity-0 group-hover:animate-ping" />
                </div>
                
                {/* Content */}
                <div className={`w-full pl-24 lg:pl-0 lg:w-5/12 flex ${isLeft ? 'lg:justify-end' : 'lg:justify-start'}`}>
                  <div className={`text-left ${isLeft ? 'lg:text-right' : 'lg:text-left'} glass neon-border p-6 rounded-lg group hover:-translate-y-2 transition-transform duration-300 w-full lg:max-w-md`}>
                    <div className="code-font text-neon-red text-sm mb-2 opacity-70">PHASE {phase.id} • {phase.date}</div>
                    <h3 className="text-2xl text-text-primary mb-3 font-bold">{phase.title}</h3>
                    <p className="text-text-secondary text-base font-light">{phase.desc}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


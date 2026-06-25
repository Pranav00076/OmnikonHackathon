'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LayoutDashboard, Server, Layers, Bot, Shield, Cloud } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

const tracks = [
  {
    title: 'Frontend Arena',
    icon: LayoutDashboard,
    tags: ['React', 'Next.js', 'UI/UX'],
    desc: 'Craft pixel-perfect, highly animated, and performant user interfaces.'
  },
  {
    title: 'Fullstack Engineering',
    icon: Layers,
    tags: ['E2E Apps', 'Auth', 'Databases'],
    desc: 'Build complete applications from the database to the browser.'
  },
  {
    title: 'AI / ML',
    icon: Bot,
    tags: ['LLMs', 'Agents', 'Workflows'],
    desc: 'Integrate artificial intelligence to solve complex problems autonomously.'
  },
  {
    title: 'Web Security',
    icon: Shield,
    tags: ['Auth', 'Pentesting', 'Cryptography'],
    desc: 'Find and patch vulnerabilities. Build impenetrable systems.'
  },
  {
    title: 'Cloud',
    icon: Cloud,
    tags: ['AWS', 'Docker', 'Serverless'],
    desc: 'Architect scalable and resilient cloud infrastructure.'
  }
];

function TrackCard({ track, index }: { track: typeof tracks[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      whileInView={{ opacity: [0, 1], y: [50, 0] }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="group h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full cursor-pointer glass neon-border devil-horn-card transition-colors duration-500 hover:bg-black/60"
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1)_0%,transparent_60%)] pointer-events-none" 
          style={{ transform: "translateZ(-10px)" }} 
        />
        
        <div className="p-8 md:p-10 flex flex-col h-full z-10 relative" style={{ transform: "translateZ(30px)" }}>
          <div className="w-16 h-16 rounded-xl bg-red-900/20 flex items-center justify-center mb-6 border border-neon-red shadow-[0_0_15px_var(--neon-red-light)]">
            <track.icon size={32} className="text-neon-red drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
          </div>
          <h3 className="neon-text text-2xl mb-4 text-text-primary tracking-wider">{track.title}</h3>
          <p className="text-text-secondary mb-6 flex-1 text-lg font-light leading-relaxed">{track.desc}</p>
          <div className="flex gap-2 flex-wrap mt-auto">
            {track.tags.map(tag => (
              <span key={tag} className="code-font bg-white/5 border border-glass-border px-3 py-1 rounded-full text-xs text-neon-red tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Tracks() {
  return (
    <section id="tracks" className="py-24 px-6 md:px-12 min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="neon-text text-5xl md:text-6xl text-text-primary mb-6">CHOOSE YOUR ARENA</h2>
          <div className="w-24 h-1 bg-neon-red mx-auto shadow-[0_0_15px_var(--neon-red)]" />
          <p className="text-text-secondary text-xl mt-6 font-light tracking-wide">Select your battlefield and claim victory.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {tracks.map((track, i) => (
            <TrackCard key={track.title} track={track} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

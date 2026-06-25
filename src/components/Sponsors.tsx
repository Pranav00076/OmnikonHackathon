'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const sponsors = [
  'Google', 'Microsoft', 'GitHub', 'Unstop', 'Vercel', 'Stripe', 'Supabase', 'Figma'
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 relative overflow-hidden bg-black/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="neon-text text-5xl md:text-6xl text-text-primary mb-6">OUR ALLIES</h2>
        <div className="w-24 h-1 bg-neon-red mx-auto shadow-[0_0_15px_var(--neon-red)]" />
      </div>

      <div className="relative flex w-screen overflow-hidden py-10 z-10">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          className="flex gap-8 md:gap-12 pl-8 md:pl-12 w-max"
        >
          {/* Double the list to make it infinite loop seamlessly */}
          {[...sponsors, ...sponsors].map((sponsor, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center min-w-[250px] md:min-w-[300px] h-[120px] rounded-2xl glass cursor-pointer overflow-hidden border border-glass-border hover:border-neon-red transition-colors duration-500 hover:shadow-[0_0_30px_rgba(255,0,0,0.2)]"
            >
              {/* Holographic Sweep Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" />

              <span className="code-font text-3xl font-bold text-gray-500 group-hover:text-neon-red group-hover:drop-shadow-[0_0_15px_var(--neon-red)] transition-all duration-300 z-10">
                {sponsor}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

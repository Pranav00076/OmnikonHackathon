'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const prizes = [
  {
    title: 'Runner Up',
    icon: Medal,
    amount: '$1,500',
    color: '#c0c0c0', // Silver
    delay: 0.2
  },
  {
    title: 'Champion',
    icon: Trophy,
    amount: '$3,000',
    color: '#ffd700', // Gold
    delay: 0,
    scale: 1.1
  },
  {
    title: 'Special Awards',
    icon: Award,
    amount: '$500',
    color: '#cd7f32', // Bronze
    delay: 0.4
  }
];

function VaultCard({ prize }: { prize: typeof prizes[0] }) {
  return (
    <div
      className={cn(
        "relative group w-full sm:w-[320px] h-[400px] rounded-xl overflow-hidden cursor-pointer perspective-[1000px]",
        prize.scale && "lg:scale-110 z-10"
      )}
    >
      {/* Vault Inner Chamber (Revealed on Hover) */}
      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-8 border border-gray-800 rounded-xl">
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${prize.color}30 0%, transparent 60%)`,
            boxShadow: `inset 0 0 50px ${prize.color}20`
          }}
        />
        
        {/* Cinematic Light Beams */}
        <div 
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 origin-bottom scale-y-0 group-hover:scale-y-100"
          style={{
            background: `linear-gradient(to top, ${prize.color}40, transparent)`,
            filter: 'blur(20px)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center scale-90 group-hover:scale-100 transition-transform duration-500 delay-100">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
            style={{ 
              background: `radial-gradient(circle, ${prize.color}40 0%, transparent 70%)`,
              boxShadow: `0 0 30px ${prize.color}60`
            }}
          >
            <prize.icon size={48} color={prize.color} style={{ filter: `drop-shadow(0 0 10px ${prize.color})` }} />
          </div>
          
          <div className="code-font text-5xl font-bold mb-4 tracking-wider" style={{ color: prize.color, textShadow: `0 0 20px ${prize.color}80` }}>
            {prize.amount}
          </div>
          
          <h3 className="text-2xl text-text-primary uppercase tracking-widest font-bold">
            {prize.title}
          </h3>
        </div>
      </div>

      {/* Vault Door (Left Half) */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-[#111] border-r border-gray-700 flex flex-col justify-center items-end pr-2 group-hover:-translate-x-full transition-transform duration-700 ease-in-out shadow-[10px_0_20px_rgba(0,0,0,0.8)] z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:100%_4px]" />
        <Lock size={24} className="text-gray-500 mb-2 mr-2" />
        <div className="w-1 h-12 bg-neon-red/50 rounded-full mr-4" />
      </div>

      {/* Vault Door (Right Half) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#111] border-l border-gray-700 flex flex-col justify-center items-start pl-2 group-hover:translate-x-full transition-transform duration-700 ease-in-out shadow-[-10px_0_20px_rgba(0,0,0,0.8)] z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:100%_4px]" />
        <div className="text-[10px] code-font text-gray-500 tracking-widest ml-2 mb-2 rotate-90 origin-left">SECURE</div>
        <div className="w-1 h-12 bg-neon-red/50 rounded-full ml-4" />
      </div>

      {/* Warning Tape Overlay */}
      <div className="absolute inset-x-0 top-8 h-8 flex -skew-y-6 bg-yellow-500/10 border-y border-yellow-500/20 z-30 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none items-center justify-center overflow-hidden">
        <div className="text-yellow-500/30 font-bold text-xs tracking-[5px] uppercase whitespace-nowrap code-font">
          RESTRICTED ACCESS /// RESTRICTED ACCESS /// RESTRICTED ACCESS
        </div>
      </div>
    </div>
  );
}

export default function PrizePool() {
  return (
    <section id="prizes" className="py-24 px-6 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-24">
          <h2 className="neon-text text-5xl md:text-6xl text-text-primary mb-6">THE PRIZE VAULT</h2>
          <div className="w-24 h-1 bg-neon-red mx-auto shadow-[0_0_15px_var(--neon-red)]" />
          <p className="text-text-secondary text-xl mt-6 font-light tracking-wide">Breach the vault. Claim the ultimate spoils.</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          {prizes.map((prize) => (
            <VaultCard key={prize.title} prize={prize} />
          ))}
        </div>
      </div>
    </section>
  );
}

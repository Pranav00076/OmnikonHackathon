'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SEQUENCE = [
  "Initializing Omnikon Hackathon...",
  "Loading Neural Core...",
  "Verifying Rules...",
];

export default function BootSequence({ isLoaded, onComplete }: { isLoaded?: boolean; onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [flashing, setFlashing] = useState(false);
  const [sequenceDone, setSequenceDone] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, BOOT_SEQUENCE[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setSequenceDone(true);
      }
    }, 800); // 800ms per line

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Default to true if isLoaded is undefined (for backward compatibility if needed)
    const pageLoaded = isLoaded !== false;
    
    if (sequenceDone && pageLoaded) {
      const timer = setTimeout(() => {
        setFlashing(true);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 1200); // Wait for transition
        }, 300); // flash duration
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [sequenceDone, isLoaded, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Flash Effect */}
          {flashing && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ duration: 0.3 }} 
              className="absolute inset-0 bg-red-600 mix-blend-overlay z-50 pointer-events-none" 
            />
          )}

          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-12 flex flex-col items-center justify-center">
            {/* Red Glow Pulse */}
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,rgba(255,0,0,0.4)_0%,transparent_70%)] blur-[20px] z-0"
            />

            {/* Full Logo Fades In */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <img src="/HackathonLogo.png" alt="Omnikon Hackathon" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,0,0,0.6)]" />
            </motion.div>
          </div>

          {/* Terminal Text */}
          <div className="flex flex-col space-y-3 text-left font-mono max-w-[90vw] w-[400px]">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-neon-red text-sm sm:text-base font-bold tracking-widest uppercase border-l-2 border-neon-red/50 pl-3"
                style={{ textShadow: "0 0 8px rgba(255,0,0,0.8)" }}
              >
                &gt; {line}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-5 bg-neon-red inline-block mt-2 ml-3"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SEQUENCE = [
  "INITIALIZING DEMONDIE...",
  "LOADING HACKATHON MODULES...",
  "CONNECTING PARTICIPANTS...",
  "PREPARING BATTLEFIELD...",
  "SYSTEM READY."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, BOOT_SEQUENCE[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800); // Wait for fade out to complete
        }, 1000);
      }
    }, 600); // 600ms per line

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="flex flex-col space-y-2 text-left font-mono">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-neon-red text-xl sm:text-2xl font-bold uppercase tracking-wider"
                style={{ textShadow: "0 0 10px rgba(255,0,0,0.8)" }}
              >
                &gt; {line}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-4 h-6 bg-neon-red inline-block mt-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { question: "Who can participate?", answer: "Any developer, designer, or creator passionate about building the future. Teams can have up to 4 members." },
  { question: "Is it completely online?", answer: "Yes, DemonDie Hackathon is hosted 100% virtually on Unstop, so you can join the battle from anywhere in the world." },
  { question: "What are the rules?", answer: "All code must be written during the hackathon. Use of open-source libraries is permitted. Be respectful to fellow hackers." },
  { question: "Do I need an idea beforehand?", answer: "No! We will reveal specific themes and challenges at the start of the hackathon. You can brainstorm then." },
  { question: "How much does it cost?", answer: "Zero. Entry into the arena is completely free of charge." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-24 px-6 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="neon-text text-5xl md:text-6xl text-text-primary mb-6">TERMINAL_FAQ</h2>
          <div className="w-24 h-1 bg-neon-red mx-auto shadow-[0_0_15px_var(--neon-red)]" />
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`glass border transition-all duration-300 rounded-lg overflow-hidden ${
                  isOpen ? 'border-neon-red shadow-[0_0_20px_rgba(255,0,0,0.3)]' : 'border-glass-border shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full bg-[#0a0a0a] border-none p-6 flex items-center justify-between cursor-pointer text-left font-orbitron uppercase tracking-widest transition-colors duration-300 hover:bg-[#111]"
                >
                  <span className={`flex items-center gap-4 text-lg md:text-xl ${isOpen ? 'text-neon-red' : 'text-text-primary'}`}>
                    <span className="code-font text-gray-500">{`>`}</span>
                    {faq.question}
                  </span>
                  <motion.span 
                    animate={{ rotate: isOpen ? 180 : 0 }} 
                    className="text-neon-red text-2xl"
                  >
                    ↓
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="code-font p-6 text-text-secondary bg-black/80 border-t border-glass-border text-base md:text-lg leading-relaxed flex items-start gap-4">
                        <span className="text-neon-red whitespace-nowrap">system:~$</span>
                        <div className="relative">
                          {faq.answer}
                          {/* Blinking Cursor */}
                          <motion.span 
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-4 bg-neon-red ml-1 align-middle"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

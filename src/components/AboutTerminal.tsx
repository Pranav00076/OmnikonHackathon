'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const terminalCommands = [
  { cmd: '$ npm install innovation', output: 'fetch: innovation@latest... OK\nbuilding future...', delay: 1000 },
  { cmd: '$ git push origin hackathon', output: 'Compressing objects: 100% (4/4), done.\nWriting objects: 100% (4/4), 4.50 KiB | 4.50 MiB/s, done.\nTo https://github.com/omnikon/hackathon\n   a1b2c3d..e4f5g6h  main -> main', delay: 3500 },
  { cmd: '$ deploy future', output: 'Deploying to Omnikon Arena...\n\n[SUCCESS] Arena is live and waiting for contenders.', delay: 7000 }
];

function Terminal() {
  const [lines, setLines] = useState<{ text: string, isCommand: boolean }[]>([]);
  const terminalRef = useRef(null);

  useEffect(() => {

    const timeouts: NodeJS.Timeout[] = [];

    terminalCommands.forEach(({ cmd, output, delay }) => {
      const t1 = setTimeout(() => {
        setLines(prev => [...prev, { text: cmd, isCommand: true }]);
      }, delay);
      
      const t2 = setTimeout(() => {
        setLines(prev => [...prev, { text: output, isCommand: false }]);
      }, delay + 800);

      timeouts.push(t1, t2);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div ref={terminalRef} className="glass neon-border" style={{ borderRadius: '10px', overflow: 'hidden', height: '450px', display: 'flex', flexDirection: 'column', boxShadow: '0 0 30px rgba(255,0,0,0.2)' }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '0.8rem 1rem', display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        <div style={{ margin: '0 auto', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>root@omnikon:~</div>
      </div>
      <div className="code-font" style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-primary)' }}>
        {lines.map((line, i) => (
          <div key={i}>
            {line.isCommand ? (
              <div>
                <span style={{ color: 'var(--neon-red)' }}>root@omnikon:~$</span> {line.text.substring(2)}
              </div>
            ) : (
              <div style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
                {line.text}
              </div>
            )}
          </div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ width: '10px', height: '20px', background: 'var(--neon-red)', display: 'inline-block', marginTop: '0.5rem' }}
        />
      </div>
    </div>
  );
}

export default function AboutTerminal() {
  return (
    <section id="about" style={{ padding: '100px 2rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        
        <div>
          <h2 className="neon-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--neon-red)' }}>
            ENTER THE ARENA
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Omnikon is proud to host the most intense Web Dev and Full Stack Hackathon of the year on Unstop. This is not just a coding competition; it&apos;s a battleground for the brightest minds to build the future.
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Bring your ideas, assemble your squad, and conquer challenges that push the boundaries of modern technology. Do you have what it takes to survive the arena?
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div className="glass neon-border" style={{ padding: '1.5rem', textAlign: 'center', flex: 1, minWidth: '120px' }}>
              <div className="neon-text" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>48H</div>
              <div style={{ color: 'var(--neon-red)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Coding</div>
            </div>
            <div className="glass neon-border" style={{ padding: '1.5rem', textAlign: 'center', flex: 1, minWidth: '120px' }}>
              <div className="neon-text" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>$5K</div>
              <div style={{ color: 'var(--neon-red)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Prizes</div>
            </div>
            <div className="glass neon-border" style={{ padding: '1.5rem', textAlign: 'center', flex: 1, minWidth: '120px' }}>
              <div className="neon-text" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>500+</div>
              <div style={{ color: 'var(--neon-red)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Hackers</div>
            </div>
          </div>
        </div>

        <div>
          <Terminal />
        </div>

      </div>
    </section>
  );
}

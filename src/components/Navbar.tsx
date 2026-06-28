'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = ['Home', 'About', 'Tracks', 'Timeline', 'Prizes', 'FAQs', 'Sponsors'];

  return (
    <nav
      className={`glass`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid var(--neon-red)' : '1px solid var(--glass-border)',
        boxShadow: scrolled ? '0 4px 20px rgba(255,0,0,0.4)' : '0 4px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="flex justify-between items-center px-6 md:px-16 py-4 w-full">
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--neon-red)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Omnikon
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 list-none items-center">
          {links.map((item) => {
            const targetId = `#${item.toLowerCase()}`;
            return (
              <li key={item}>
                <a 
                  href={targetId}
                  onClick={(e) => handleScrollTo(e, targetId)}
                  style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--neon-red)';
                    e.currentTarget.style.textShadow = '0 0 8px var(--neon-red)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop Register Button */}
        <div className="hidden md:block">
          <a
            href="#register"
            onClick={(e) => handleScrollTo(e, '#register')}
            className="neon-border devil-horn-card"
            style={{
              display: 'inline-block',
              padding: '0.6rem 2rem',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--neon-red)';
              e.currentTarget.style.boxShadow = '0 0 25px var(--neon-red)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
              e.currentTarget.style.boxShadow = '0 0 10px var(--neon-red-light), inset 0 0 10px var(--glass-border)';
            }}
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-text-primary focus:outline-none p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-b border-neon-red shadow-[0_4px_20px_rgba(255,0,0,0.4)]" style={{ background: 'var(--bg-primary)' }}>
          <ul className="flex flex-col py-4 px-6 gap-2 list-none">
            {links.map((item) => {
              const targetId = `#${item.toLowerCase()}`;
              return (
                <li key={item}>
                  <a 
                    href={targetId}
                    onClick={(e) => handleScrollTo(e, targetId)}
                    className="block text-lg uppercase tracking-wider py-3"
                    style={{ transition: 'color 0.3s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--neon-red)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
            <li className="pt-4 mt-2 border-t border-glass-border">
              <a
                href="#register"
                onClick={(e) => handleScrollTo(e, '#register')}
                className="inline-block w-full text-center py-3 neon-border text-text-primary uppercase tracking-widest font-bold"
                style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}
              >
                Register
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

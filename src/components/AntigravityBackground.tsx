'use client';

import { useEffect, useRef } from 'react';

export default function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let width = canvas.width = rect.width;
    let height = canvas.height = rect.height;

    let particles: any[] = [];
    const particleCount = 150;
    
    // Global counter to limit orbiting particles to 15
    let globalOrbitCount = 0;
    
    // Mouse tracking - reduced radius so it doesn't attract everything
    let mouse = { x: -1000, y: -1000, radius: 100 };

    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to the hero section
      if (cachedCanvasRect) {
        mouse.x = e.clientX - cachedCanvasRect.left;
        mouse.y = e.clientY - cachedCanvasRect.top;
      }
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', () => {
      cachedCanvasRect = canvas.getBoundingClientRect();
      width = canvas.width = cachedCanvasRect.width;
      height = canvas.height = cachedCanvasRect.height;
      init();
    });

    let logoCenter = { x: width / 2, y: height / 2 };

    function updateLogoCenter() {
      const logo = document.getElementById('reactor-logo');
      if (logo && canvasRef.current) {
        const logoRect = logo.getBoundingClientRect();
        const canvasRect = canvasRef.current.getBoundingClientRect();
        logoCenter.x = (logoRect.left + logoRect.width / 2) - canvasRect.left;
        logoCenter.y = (logoRect.top + logoRect.height / 2) - canvasRect.top;
      }
    }

    class Particle {
      x!: number;
      y!: number;
      size!: number;
      baseX!: number;
      baseY!: number;
      vx!: number;
      vy!: number;
      color!: string;
      orbitAngle: number | null = null;
      orbitDist: number | null = null;
      targetOrbitDist: number | null = null;
      orbitSpeed: number | null = null;
      
      constructor() {
        this.reset();
        // Initial random spread so it's not empty at first load
        this.x = logoCenter.x + (Math.random() - 0.5) * width;
        this.y = logoCenter.y + (Math.random() - 0.5) * height;
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 80; // spawn from inside the logo radius
        this.x = logoCenter.x + Math.cos(angle) * radius;
        this.y = logoCenter.y + Math.sin(angle) * radius;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        
        // Emitting outwards
        const speed = Math.random() * 1.5 + 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.color = Math.random() > 0.5 ? '#ff0000' : '#ff2a2a';
        this.orbitAngle = null;
        this.orbitDist = null;
        this.targetOrbitDist = null;
        this.orbitSpeed = null;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          if (this.orbitAngle === null) {
            // Only capture if we have less than 15 particles orbiting
            if (globalOrbitCount < 15) {
              this.orbitAngle = Math.atan2(dy, dx);
              this.orbitDist = dist; 
              this.targetOrbitDist = 30 + Math.random() * 80; 
              // Extremely slow spin speed
              this.orbitSpeed = 0.0005 + Math.random() * 0.002; 
              globalOrbitCount++;
            }
          }
          
          if (this.orbitAngle !== null) {
            // Smoothly drift into their specific orbit ring
            this.orbitDist! += (this.targetOrbitDist! - this.orbitDist!) * 0.02;

            // Revolve slowly
            this.orbitAngle += this.orbitSpeed!; 
            
            const targetX = mouse.x + Math.cos(this.orbitAngle) * this.orbitDist!;
            const targetY = mouse.y + Math.sin(this.orbitAngle) * this.orbitDist!;
            
            this.x += (targetX - this.x) * 0.08; 
            this.y += (targetY - this.y) * 0.08;
          } else {
            // Unaffected drift if not captured
            this.x += this.vx;
            this.y += this.vy;
          }
        } else {
          // Release from orbit
          if (this.orbitAngle !== null) {
            globalOrbitCount--;
          }
          this.orbitAngle = null;
          this.orbitDist = null;
          this.targetOrbitDist = null;
          this.orbitSpeed = null;

          // Base drift (outwards emission)
          this.x += this.vx;
          this.y += this.vy;

          // If out of bounds, respawn at center
          if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
            this.reset();
          }
        }

        this.draw();
      }
    }

    function init() {
      updateLogoCenter();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    let animationFrameId: number;
    let isVisible = true;

    // Cache canvas rect to avoid layout thrashing on mousemove
    let cachedCanvasRect = canvas.getBoundingClientRect();
    
    const handleScroll = () => {
      cachedCanvasRect = canvas.getBoundingClientRect();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) {
        // Only start if not already running to prevent double loop
        cancelAnimationFrame(animationFrameId);
        animate();
      }
    }, { threshold: 0 });
    
    observer.observe(canvas);

    function animate() {
      if (!ctx || !isVisible) return;
      // Clear with longer trailing effect for smoothness
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    // initial animate call is handled by IntersectionObserver

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

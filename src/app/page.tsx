'use client';

import { useState, useEffect } from 'react';
import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutTerminal from "@/components/AboutTerminal";
import Tracks from "@/components/Tracks";
import Timeline from "@/components/Timeline";
import Rulebook from "@/components/Rulebook";
import PrizePool from "@/components/PrizePool";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BootSequence from "@/components/BootSequence";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      const handleLoad = () => setIsLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <main className={booting ? "h-screen overflow-hidden" : ""}>
      {/* Boot Sequence Overlay */}
      {booting && <BootSequence isLoaded={isLoaded} onComplete={() => setBooting(false)} />}
      
      <div className={booting ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-1000"}>
        <ThreeBackground />
        <Navbar />
        <Hero />
        <AboutTerminal />
        <Tracks />
        <Timeline />
        <Rulebook />
        <PrizePool />
        <Sponsors />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}

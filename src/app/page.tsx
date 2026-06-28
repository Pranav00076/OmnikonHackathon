'use client';

import { useState } from 'react';
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

  return (
    <main>
      {/* Boot Sequence Overlay */}
      {booting && <BootSequence onComplete={() => setBooting(false)} />}
      
      <div className={booting ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
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

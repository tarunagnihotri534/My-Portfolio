import { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LandingGate } from './components/LandingGate';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutHero } from './components/AboutHero';
import { PhilosophySection } from './components/PhilosophySection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { CTASection } from './components/CTASection';

// Register once at module level — not inside components
gsap.registerPlugin(ScrollTrigger);

// Expose lenis instance so Navbar can call lenis.scrollTo()
export let lenisInstance = null;

function App() {
  const [introDone, setIntroDone] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    // ── 1. Create ONE Lenis instance ──────────────────────────────────────
    const lenis = new Lenis({
      // lerp: how much of the remaining distance to cover per frame (0–1)
      // Lower = smoother / more lag. 0.1 is Aditya-level butter.
      lerp: 0.1,
      // duration is ignored when lerp is set, but keep for fallback
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // wheelMultiplier controls how fast wheel events move the page
      wheelMultiplier: 1,
      touchMultiplier: 2,
      // infinite: false
    });

    lenisRef.current = lenis;
    lenisInstance    = lenis;

    // ── 2. Keep ScrollTrigger in sync with Lenis position ─────────────────
    // ScrollTrigger reads window.scrollY by default. Lenis interpolates the
    // position, so we must tell ST the current interpolated value every tick.
    lenis.on('scroll', ScrollTrigger.update);

    // ── 3. Drive Lenis from GSAP ticker — ONE shared RAF loop ─────────────
    // Named function so we can remove the exact same reference on cleanup.
    function onRaf(time) {
      lenis.raf(time * 1000); // gsap ticker gives seconds, lenis wants ms
    }

    gsap.ticker.add(onRaf);

    // Prevent GSAP from "catching up" skipped frames — that's what causes
    // the pause-then-jump. With lagSmoothing(0) GSAP just uses real time.
    gsap.ticker.lagSmoothing(0);

    // ── 4. Handle nav scroll-to requests ──────────────────────────────────
    function onScrollTo(e) {
      lenis.scrollTo(e.detail.el, {
        offset: 0,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
    window.addEventListener('lenis-scroll-to', onScrollTo);

    // ── 5. Refresh ScrollTrigger after fonts/images settle ────────────────
    // Layout shifts from lazy images or web fonts desync scroll heights.
    let refreshTimer;
    function scheduleRefresh() {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
    }
    document.fonts.ready.then(scheduleRefresh);
    window.addEventListener('load', scheduleRefresh);

    // ── 6. Cleanup ────────────────────────────────────────────────────────
    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('load', scheduleRefresh);
      window.removeEventListener('lenis-scroll-to', onScrollTo);
      gsap.ticker.remove(onRaf);   // named ref — actually removes correctly
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance    = null;
    };
  }, []); // empty deps — runs once, cleans up on unmount

  return (
    <>
      <LandingGate onComplete={() => setIntroDone(true)} />
      <Navbar />
      <main id="home">
        <HeroSection introDone={introDone} />
        <AboutHero />
        <PhilosophySection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <CTASection />
      </main>
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { BootPreloader } from './BootPreloader';
import { GridRevealIntro } from './GridRevealIntro';

/**
 * LandingGate — controls the intro sequence:
 *
 * Fresh tab open (no sessionStorage flag):
 *   BootPreloader → GridRevealIntro → site
 *
 * Page refresh (sessionStorage flag exists, but it IS a reload):
 *   GridRevealIntro only → site
 *
 * SPA navigation / back-forward (sessionStorage flag + not a reload):
 *   Nothing → site immediately
 *
 * Detection: performance.getEntriesByType('navigation')[0].type
 *   'navigate' = fresh open
 *   'reload'   = F5 / Ctrl+R
 *   'back_forward' = browser history
 */

function getNavType() {
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    return nav?.type ?? 'navigate';
  } catch {
    return 'navigate';
  }
}

function getInitialPhase() {
  const navType = getNavType();
  const seen    = (() => { try { return !!sessionStorage.getItem('bp_seen'); } catch { return false; } })();

  if (!seen) return 'boot';          // fresh tab — full sequence
  if (navType === 'reload') return 'grid'; // refresh — grid only
  return 'done';                     // SPA nav / back-forward — skip all
}

export function LandingGate({ onComplete }) {
  const [phase, setPhase] = useState(getInitialPhase);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      onComplete?.();
    }
  }, [onComplete]);

  const handleBootDone = () => {
    // Mark tab as seen so refreshes skip boot preloader
    try { sessionStorage.setItem('bp_seen', '1'); } catch { /* ignore */ }
    setPhase('grid');
  };

  const handleGridDone = () => {
    setPhase('done');
    onComplete?.();
  };

  if (phase === 'boot') return <BootPreloader onComplete={handleBootDone} />;
  if (phase === 'grid') return <GridRevealIntro onComplete={handleGridDone} />;
  return null;
}

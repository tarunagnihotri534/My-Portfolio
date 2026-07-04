import { useState, useEffect } from 'react';
import { CinematicIntro } from './cinematic/CinematicIntro';

/**
 * LandingGate
 *
 * Sits above the whole page. Renders CinematicIntro until it calls
 * onComplete, then unmounts itself so there is zero DOM overhead after
 * the intro finishes.
 *
 * Reduced-motion users: skips the intro immediately on mount so the
 * portfolio is never blocked.
 */
export function LandingGate({ onComplete }) {
  const [done, setDone] = useState(false);

  // Honour prefers-reduced-motion — skip intro entirely
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      onComplete?.();
    }
  }, [onComplete]);

  const handleComplete = () => {
    setDone(true);
    onComplete?.();
  };

  if (done) return null;

  return <CinematicIntro onComplete={handleComplete} />;
}

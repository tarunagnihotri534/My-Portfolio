import { useState, useEffect } from 'react';
import { BootPreloader } from './BootPreloader';

/**
 * LandingGate
 *
 * - Shows BootPreloader only once per browser session (sessionStorage flag).
 * - Skips on internal route changes (SPA navigation without hard reload).
 * - Skips on prefers-reduced-motion (handled inside BootPreloader too).
 * - After completion, sets introDone so HeroSection can run its entrance.
 */
export function LandingGate({ onComplete }) {
  const [show, setShow] = useState(() => {
    // Check flag synchronously to avoid flash of preloader on return visits
    try {
      return !sessionStorage.getItem('bp_seen');
    } catch {
      return false; // private browsing may block sessionStorage
    }
  });

  // Also skip immediately for reduced-motion users
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(false);
      onComplete?.();
    }
  }, [onComplete]);

  const handleComplete = () => {
    try { sessionStorage.setItem('bp_seen', '1'); } catch { /* ignore */ }
    setShow(false);
    onComplete?.();
  };

  if (!show) return null;

  return <BootPreloader onComplete={handleComplete} />;
}

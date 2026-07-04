/**
 * GridRevealIntro
 *
 * 3×3 (or 3×4) grid of black tiles scale/slide outward revealing the site.
 * Giant name text sits behind the tiles as they wipe off.
 *
 * Runs ONCE after BootPreloader completes (or on first visit if preloader skipped).
 * Locks body scroll, then unlocks on completion.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function GridRevealIntro({ onComplete }) {
  const overlayRef = useRef(null);
  const nameRef    = useRef(null);
  const tilesRefs  = useRef([]);

  useEffect(() => {
    // Scroll to top instantly before the animation starts
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Lock body scroll during animation
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete?.();
      },
    });

    // ── Name text reveal behind tiles ────────────────────────────────────
    tl.fromTo(
      nameRef.current,
      { opacity: 0, scale: 1.3 },
      { opacity: 0.12, scale: 1, duration: 0.6, ease: 'power2.out' },
      0
    );

    // ── Tiles scale + slide outward from center ──────────────────────────
    // Each tile gets a unique direction vector based on its grid position
    tilesRefs.current.forEach((tile, i) => {
      if (!tile) return;

      // 3 cols × 3 rows = 9 tiles (adjust if you want 4×3)
      const col = i % 3;
      const row = Math.floor(i / 3);

      // Calculate direction vector from center (1,1) in 3×3 grid
      const xDir = col - 1; // -1, 0, +1
      const yDir = row - 1; // -1, 0, +1

      tl.to(
        tile,
        {
          x: xDir * 120 + '%',   // push tiles outward
          y: yDir * 120 + '%',
          scale: 0.6,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.inOut',
        },
        0.3 + i * 0.03   // slight stagger for visual flow
      );
    });

    // ── Fade out entire overlay ──────────────────────────────────────────
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.35, ease: 'power2.in' },
      '-=0.2'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="grid-reveal-overlay">
      {/* Giant name text behind tiles */}
      <div ref={nameRef} className="grid-reveal-name" aria-hidden="true">
        TARUN AGNIHOTRI
      </div>

      {/* 3×3 grid of tiles */}
      <div className="grid-reveal-tiles">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { tilesRefs.current[i] = el; }}
            className="grid-reveal-tile"
          />
        ))}
      </div>
    </div>
  );
}

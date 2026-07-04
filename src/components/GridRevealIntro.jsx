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
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';

    // Name is fully visible from frame 0 — tiles cover it initially
    gsap.set(nameRef.current, { opacity: 1, scale: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete?.();
      },
    });

    // ── Tiles scatter outward — all move at once, tight stagger ──────────
    tilesRefs.current.forEach((tile, i) => {
      if (!tile) return;

      const col  = i % 3;
      const row  = Math.floor(i / 3);
      const xDir = col - 1;
      const yDir = row - 1;

      tl.to(
        tile,
        {
          x:        xDir * 130 + '%',
          y:        yDir * 130 + '%',
          scale:    0.5,
          opacity:  0,
          duration: 0.7,
          ease:     'power3.inOut',
        },
        i * 0.025   // tight stagger — all tiles move nearly simultaneously
      );
    });

    // ── Name scales slightly as it's revealed then fades quickly ─────────
    tl.fromTo(
      nameRef.current,
      { scale: 1.08, opacity: 1 },
      { scale: 1, opacity: 0, duration: 0.35, ease: 'power2.in' },
      0
    );

    // ── Overlay fades out after tiles gone ────────────────────────────────
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.4, ease: 'power2.in' },
      '-=0.15'
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

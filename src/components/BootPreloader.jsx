/**
 * BootPreloader
 *
 * Sequence (one GSAP timeline):
 *  1. "npm run dev" types char-by-char (40-70ms/char + jitter), blinking cursor
 *  2. Line clears → React swaps to name phase → "TARUN AGNIHOTRI" clips up
 *  3. Counter 0 → 100 via GSAP numeric proxy (~1 s)
 *  4. Overlay fades out in 350 ms → onComplete fires → unmounts
 *
 * Requirements met:
 *  - Single GSAP timeline
 *  - Body scroll locked / unlocked
 *  - sessionStorage guard handled by LandingGate (parent)
 *  - prefers-reduced-motion → instant skip
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CMD         = 'npm run dev';
const CHAR_MIN    = 0.09;   // 90 ms minimum per char
const CHAR_MAX    = 0.12;   // 120 ms maximum per char

function randBetween(a, b) {
  return a + Math.random() * (b - a);
}

export function BootPreloader({ onComplete }) {
  const overlayRef  = useRef(null);
  const termLineRef = useRef(null);
  const nameRef     = useRef(null);    // set via callback ref after phase switch
  const countRef    = useRef(null);

  // Phase drives which DOM tree is rendered
  const [phase, setPhase] = useState('terminal'); // 'terminal' | 'name'

  // ── Phase 1 + scheduling phase 2+ ────────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.();
      return;
    }

    // Always start at the very top of the page
    window.scrollTo({ top: 0, behavior: 'instant' });

    const prevOverflow        = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({ paused: true });

    // Type each character
    let cursor = 0;
    for (let i = 0; i < CMD.length; i++) {
      const dur = randBetween(CHAR_MIN, CHAR_MAX);
      tl.call(
        () => {
          if (termLineRef.current)
            termLineRef.current.textContent = CMD.slice(0, i + 1);
        },
        [],
        cursor
      );
      cursor += dur;
    }

    // Pause after full command, then switch phase
    cursor += 0.6;  // Increased from 0.38 to match slower typing rhythm
    tl.call(() => setPhase('name'), [], cursor);

    // After a rAF (so React has rendered the name DOM), animate it in
    tl.call(
      () => {
        const nameEl  = document.querySelector('.bp-name');
        const countEl = document.querySelector('.bp-counter');
        if (!nameEl) return;

        // Set initial state
        gsap.set(nameEl,  { yPercent: 110, opacity: 0 });
        gsap.set(countEl, { opacity: 0 });

        const sub = gsap.timeline();

        // Name clips up
        sub.to(nameEl, {
          yPercent: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
        });

        // Counter fades in and counts
        const proxy = { val: 0 };
        sub.to(
          countEl,
          { opacity: 1, duration: 0.15, ease: 'none' },
          '<0.1'
        );
        sub.to(
          proxy,
          {
            val: 100,
            duration: 1.0,
            ease: 'power1.inOut',
            onUpdate() {
              if (countEl)
                countEl.textContent = Math.round(proxy.val) + '%';
            },
          },
          '<'
        );

        // Hold at 100 briefly, then immediately hand off to GridReveal
        // (NO fade-out here — GridRevealIntro covers the screen next)
        sub.to({}, { duration: 0.25 });
        sub.call(() => {
          onComplete?.();
        });
      },
      [],
      cursor + 0.1   // Increased from 0.05 to 0.1 to give font more time to load
    );

    tl.play();

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={overlayRef} className="bp-overlay" aria-label="Loading" role="status">

      {/* ── Phase: terminal ── */}
      {phase === 'terminal' && (
        <div className="bp-terminal">
          <span className="bp-prompt">❯&nbsp;</span>
          <span ref={termLineRef} className="bp-cmd" />
          <span className="bp-cursor" aria-hidden="true" />
        </div>
      )}

      {/* ── Phase: name + counter ── */}
      {phase === 'name' && (
        <div className="bp-name-block">
          <div className="bp-name-clip">
            <h1 className="bp-name">TARUN AGNIHOTRI</h1>
          </div>
          <p ref={countRef} className="bp-counter">0%</p>
        </div>
      )}

    </div>
  );
}

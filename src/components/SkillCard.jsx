/**
 * SkillCard
 *
 * Full-width coral card — "FRONTEND DEVELOPMENT" heading left,
 * image right. One-time GSAP pop-in on scroll into view.
 *
 * Animation sequence:
 *  1. Whole card: scale 0.85 → 1, opacity 0 → 1, ease back.out(1.7), 0.6 s
 *  2. Image: same pop, 0.12 s stagger after card so it arrives second
 *
 * ScrollTrigger trigger: "play none none none" (no replay on re-scroll)
 * Cleanup: gsap.context().revert() on unmount
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger already registered globally in App.jsx

export function SkillCard() {
  const cardRef  = useRef(null);
  const imgRef   = useRef(null);
  const textRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial hidden state ─────────────────────────────────────────────
      gsap.set(cardRef.current, { scale: 0.85, opacity: 0 });
      gsap.set(imgRef.current,  { scale: 0.85, opacity: 0 });

      // ── Card pop-in ──────────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none', // fire once, never replay
        },
      });

      tl.to(cardRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });

      // ── Image pops in 0.12 s after card ─────────────────────────────────
      tl.to(imgRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.48'); // offset so it starts 0.12 s after card tween begins
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skill-card-section" aria-label="Frontend Development skill">
      <div ref={cardRef} className="skill-card">

        {/* ── Left: heading text ── */}
        <div ref={textRef} className="skill-card-text">
          <h2 className="skill-card-heading">
            <span className="skill-card-line">FRONTEND</span>
            <span className="skill-card-line">DEVELOPMENT</span>
          </h2>
        </div>

        {/* ── Right: image ── */}
        <div ref={imgRef} className="skill-card-img-wrap">
          <img
            src="/frontend.jpg"
            alt="Frontend development illustration"
            className="skill-card-img"
            width="480"
            height="360"
            loading="lazy"
            decoding="async"
          />
        </div>

      </div>
    </section>
  );
}

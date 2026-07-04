/**
 * GetInTouch
 *
 * Full-width section with a large pill-shaped "GET IN TOUCH" button.
 * Matches reference: diagonal stripe fill, thick dark border, tagline above
 * the main text, hover scale effect.
 *
 * GSAP: section fades + scales up on scroll into view (once).
 *       drink-cup.png shakes continuously inside the button.
 * Clicking scrolls to the contact/footer section or opens mailto.
 */

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export function GetInTouch() {
  const sectionRef = useRef(null);
  const btnRef     = useRef(null);
  const cupRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance: section fades up ───────────────────────────────────
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Button pop-in ─────────────────────────────────────────────────
      gsap.fromTo(
        btnRef.current,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Idle float on button ──────────────────────────────────────────
      gsap.to(btnRef.current, {
        y: -8,
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // ── Cup shake — runs immediately, repeats forever ─────────────────
      // Sequence: quick rotate back-and-forth + tiny translate, then pause
      const shakeTl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
      shakeTl
        .to(cupRef.current, { rotation:  14, x:  4, duration: 0.07, ease: 'power1.inOut' })
        .to(cupRef.current, { rotation: -12, x: -4, duration: 0.07, ease: 'power1.inOut' })
        .to(cupRef.current, { rotation:  10, x:  3, duration: 0.07, ease: 'power1.inOut' })
        .to(cupRef.current, { rotation:  -8, x: -3, duration: 0.07, ease: 'power1.inOut' })
        .to(cupRef.current, { rotation:   5, x:  2, duration: 0.06, ease: 'power1.inOut' })
        .to(cupRef.current, { rotation:   0, x:  0, duration: 0.1,  ease: 'elastic.out(1, 0.5)' });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function handleClick() {
    // Now handled by React Router Link — kept for reference
  }

  return (
    <section
      ref={sectionRef}
      className="git-section"
      aria-label="Get in touch"
    >
      <Link
        ref={btnRef}
        to="/contact"
        className="git-btn"
        aria-label="Get in touch — open contact page"
      >
        {/* Diagonal stripe overlay */}
        <span className="git-btn-stripes" aria-hidden="true" />

        {/* Text content */}
        <span className="git-btn-inner">
          <span className="git-tagline">Let's build something amazing together</span>
          <span className="git-label-row">
            {/* Shaking cup */}
            <img
              ref={cupRef}
              src="/drink-cup.png"
              alt=""
              aria-hidden="true"
              className="git-cup"
            />
            <span className="git-label">GET IN TOUCH</span>
          </span>
        </span>
      </Link>
    </section>
  );
}

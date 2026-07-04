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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    const contact = document.getElementById('contact');
    if (contact) {
      window.dispatchEvent(
        new CustomEvent('lenis-scroll-to', { detail: { el: contact } })
      );
    } else {
      window.location.href = 'mailto:tarunagnihotri534@gmail.com';
    }
  }

  return (
    <section
      ref={sectionRef}
      className="git-section"
      aria-label="Get in touch"
    >
      <button
        ref={btnRef}
        className="git-btn"
        onClick={handleClick}
        aria-label="Get in touch — send an email"
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
      </button>
    </section>
  );
}

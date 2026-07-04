import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger already registered in App.jsx

export function CTASection() {
  const sectionRef  = useRef(null);
  const avatarRef   = useRef(null);
  const taglineRef  = useRef(null);
  const headingRef  = useRef(null);
  const arrowRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      // Avatar drops in from above
      tl.fromTo(avatarRef.current,
        { y: -40, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.6)' },
        0
      );

      // Tagline fades up
      tl.fromTo(taglineRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.3
      );

      // Heading lines clip-reveal up
      const lines = headingRef.current
        ? Array.from(headingRef.current.querySelectorAll('.cta-line'))
        : [];
      tl.fromTo(lines,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.12 },
        0.4
      );

      // Arrow bobs in
      tl.fromTo(arrowRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.85
      );

      // Idle arrow bob loop
      gsap.to(arrowRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: 'sine.inOut',
        delay: 1.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cta-section"
      id="cta-section"
      aria-label="Call to action"
    >
      {/* Small avatar */}
      <div ref={avatarRef} className="cta-avatar-wrap">
        <img
          src="/tarunSktechh.png"
          alt="Tarun Kumar Agnihotri"
          className="cta-avatar-img"
        />
      </div>

      {/* Tagline */}
      <p ref={taglineRef} className="cta-tagline">
        Your Vision. My Expertise.
      </p>

      {/* Giant heading */}
      <div ref={headingRef} className="cta-heading-wrap" aria-label="Full-Stack AI Development & Design Solutions">
        <div className="cta-line-clip">
          <h2 className="cta-line">FULL-STACK DEVELOPMENT</h2>
        </div>
        <div className="cta-line-clip">
          <h2 className="cta-line">&amp; DESIGN SOLUTIONS</h2>
        </div>
      </div>

      {/* Scroll arrow */}
      <div ref={arrowRef} className="cta-arrow" aria-hidden="true">↓</div>
    </section>
  );
}

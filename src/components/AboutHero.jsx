import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger already registered in App.jsx

export function AboutHero() {
  const sectionRef   = useRef(null);
  const eyebrowRef   = useRef(null);
  const hiRef        = useRef(null);
  const bioRef       = useRef(null);
  const dividerRef   = useRef(null);
  const tagsRef      = useRef(null);
  const portraitRef  = useRef(null);
  const badgeRef     = useRef(null);
  const bgTextRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      /* BG watermark text */
      tl.fromTo(
        bgTextRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
        0
      );

      /* Eyebrow pill */
      tl.fromTo(
        eyebrowRef.current,
        { y: -20, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 },
        0.1
      );

      /* "Hi" line */
      tl.fromTo(
        hiRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.2
      );

      /* Portrait card */
      tl.fromTo(
        portraitRef.current,
        { x: 60, opacity: 0, rotate: 0 },
        { x: 0, opacity: 1, rotate: 0, duration: 0.85, ease: 'back.out(1.2)' },
        0.25
      );

      /* Bio paragraph */
      tl.fromTo(
        bioRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        0.45
      );

      /* Divider line scale */
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.inOut' },
        0.6
      );

      /* Tags stagger */
      const tagEls = tagsRef.current
        ? Array.from(tagsRef.current.querySelectorAll('span'))
        : [];
      tl.fromTo(
        tagEls,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
        0.7
      );

      /* Badge pop */
      tl.fromTo(
        badgeRef.current,
        { y: 14, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.7)' },
        0.85
      );

      /* Subtle parallax on the BG watermark text */
      gsap.to(bgTextRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-hero-section"
      id="about-section"
      aria-label="About"
    >
      <div className="about-hero-inner">

        {/* ── Left: text column ── */}
        <div className="about-hero-text">

          {/* Background watermark — lives inside text column so it centers behind bio */}
          <span ref={bgTextRef} className="about-hero-bg-text" aria-hidden="true">
            ABOUT
          </span>

          {/* Eyebrow badge */}
          <span ref={eyebrowRef} className="about-hero-eyebrow">
            <span className="about-hero-eyebrow-sparkle" aria-hidden="true">✦</span>
            About me
          </span>

          {/* Heading stack */}
          <div className="about-hero-header">
            <h2 ref={hiRef} className="about-hero-hi">Hi, I'm</h2>
            <p className="about-hero-name">Tarun</p>
          </div>

          {/* Bio */}
          <div ref={bioRef} className="about-hero-bio">
            <p>
              Full Stack AI Developer with hands-on experience designing and delivering AI-integrated,
              production-ready web applications from concept to deployment. I specialize in building
              intelligent digital platforms by combining modern frontend technologies, scalable backend
              architectures, and cloud-native deployment practices. My expertise spans{' '}
              <strong>React, Next.js, Node.js, FastAPI</strong>, AI-powered automation, real-time systems,
              and DevOps workflows. Passionate about solving real-world problems through technology, I focus
              on creating secure, high-performance, and user-centric applications that drive meaningful
              impact across education, governance, and community platforms.
            </p>
          </div>

          {/* Divider */}
          <div ref={dividerRef} className="about-hero-divider" aria-hidden="true" />

          {/* Tags */}
          <div ref={tagsRef} className="about-hero-tags" aria-label="Mantra">
            <span>Code</span>
            <span className="about-hero-tag-sep" aria-hidden="true">/</span>
            <span>Design</span>
            <span className="about-hero-tag-sep" aria-hidden="true">/</span>
            <span>Craft</span>
            <span className="about-hero-tag-sep" aria-hidden="true">/</span>
            <span>Repeat</span>
          </div>
        </div>

        {/* ── Right: portrait column ── */}
        <div ref={portraitRef} className="about-hero-portrait-wrap">
          <div className="about-hero-portrait-inner">

            {/* Offset shadow block (behind card) */}
            <div className="about-hero-portrait-shadow" aria-hidden="true" />

            {/* Photo card */}
            <div className="about-hero-portrait-card">
              <img
                src="/tarunSktechh.png"
                alt="Tarun Kumar Agnihotri"
                className="about-hero-portrait-img"
              />
            </div>

            {/* Open-to-work badge */}
            <div ref={badgeRef} className="about-hero-badge" aria-label="Currently open to work">
              <span className="about-hero-badge-dot" aria-hidden="true" />
              Open to Work
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

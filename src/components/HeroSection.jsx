import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function HeroSection({ introDone }) {
  const sectionRef  = useRef(null);
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const devicesRef  = useRef(null);
  const bottomRef   = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!introDone || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      /* Lines clip-reveal from bottom up */
      tl.fromTo(
        [line1Ref.current, line2Ref.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.12 },
        0
      );

      /* Device mockup fade + float in */
      tl.fromTo(
        devicesRef.current,
        { y: 40, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.3)' },
        0.35
      );

      /* Bottom bar slide up */
      tl.fromTo(
        bottomRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.55
      );

      /* Idle float on device */
      gsap.to(devicesRef.current, {
        y: -12,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [introDone]);

  return (
    <section ref={sectionRef} className="hm-section" id="home" aria-label="Hero">
      <div className="hm-grain" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="hm-main-area">
        <div className="hm-text-container">
          <div className="hm-text-block" aria-hidden="true">
            <div className="hm-clip">
              <h1 ref={line1Ref} className="hm-line hm-line-1">TARUN KUMAR</h1>
            </div>
            <div className="hm-clip">
              <p ref={line2Ref} className="hm-line hm-line-2">AGNIHOTRI</p>
            </div>
          </div>
          <span className="hm-sr-only">Tarun Kumar Agnihotri — Full Stack AI Engineer</span>
        </div>

        {/* ── Device mockup ── */}
        <div ref={devicesRef} className="hm-devices" aria-hidden="true">
          <div
            className="hm-device hm-device--back"
            style={{ transform: 'rotate(-6deg) translate(-18px, 12px) scale(0.88)' }}
          >
            <div className="hm-device-frame hm-device-frame--dark">
              <div className="hm-fullscreen-layer" style={{ borderRadius: '12px' }}>
                <div className="hm-starfield" />
                <div className="hm-celestia-container" style={{ padding: '1rem' }}>
                  <div className="hm-celestia-content" style={{ padding: 0 }}>
                    <p className="hm-celestia-eyebrow" style={{ fontSize: '0.5rem', marginBottom: '0.5rem' }}>
                      PORTFOLIO 2026
                    </p>
                    <h2 className="hm-celestia-hero-title" style={{ fontSize: 'clamp(0.9rem,2.5vw,1.8rem)', marginBottom: '0.75rem' }}>
                      TARUN<br />KUMAR
                    </h2>
                  </div>
                </div>
              </div>
              <div className="hm-device-shine" />
            </div>
          </div>

          <div className="hm-device hm-device--front">
            <div className="hm-device-frame">
              <div className="hm-preview-layer">
                <img src="/project-thumb.png" alt="" className="hm-preview-bg-img" loading="lazy" />
                <div className="hm-preview-overlay">
                  <header className="hm-preview-header">
                    <span className="hm-preview-logo">A / P</span>
                    <span className="hm-preview-menu">Menu</span>
                  </header>
                  <div className="hm-preview-body">
                    <p className="hm-preview-title">Full Stack<br />AI Engineer</p>
                    <span className="hm-preview-btn">View Work ↗</span>
                  </div>
                </div>
              </div>
              <div className="hm-device-shine" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div ref={bottomRef} className="hm-bottom">
        {/* Left — SVG icon links, same clean line style as Aditya */}
        <div className="hm-icons">
          <a href="https://github.com/tarunagnihotri534" target="_blank" rel="noreferrer" className="hm-icon-btn" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/tarun-agnihotri69/" target="_blank" rel="noreferrer" className="hm-icon-btn" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="mailto:tarunagnihotri534@gmail.com" className="hm-icon-btn" aria-label="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
          <a href="https://x.com/tarunagnihotri_" target="_blank" rel="noreferrer" className="hm-icon-btn" aria-label="Twitter / X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.254 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>

        {/* Centre — resume */}
        <a href="/RESUME.pdf" download="Tarun_Agnihotri_Resume.pdf" className="hm-resume-link">
          FETCH // RESUME
        </a>

        {/* Right — showcase mode */}
        <button className="hm-showcase-btn" aria-label="Showcase mode">
          SHOWCASE MODE:&nbsp;
          <span className="hm-status-on">ON</span>
          <span className="hm-status-off">&nbsp;/&nbsp;OFF</span>
        </button>
      </div>
    </section>
  );
}

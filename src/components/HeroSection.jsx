import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Project cards data ─── */
const HERO_PROJECTS = [
  {
    id: '01',
    name: 'ClaimVertex',
    subtitle: 'Enterprise AI Insurance Claims & SIU Command Platform',
    thumb: '/Screenshot (3262).png',
    tags: ['RAG', 'Firebase', 'NextJS', 'Python'],
    live: 'https://claim-pilot-orcin.vercel.app/',
    rotate: -8,
  },
  {
    id: '02',
    name: 'Jennie',
    subtitle: 'Autonomous Agentic AI Code Reviewer',
    thumb: '/Screenshot (3048).png',
    tags: ['AI Agent', 'Node JS', 'LLMs'],
    live: 'https://github.com/tarunagnihotri534/Jennie',
    rotate: 6,
  },
  {
    id: '03',
    name: 'CiviLedger',
    subtitle: 'Decentralized Public Policy Engine',
    thumb: '/Screenshot (1920).png',
    tags: ['Web3', 'ICP', 'Smart Contracts'],
    live: 'https://civic-ledger-new.vercel.app/',
    rotate: -5,
  },
  {
    id: '04',
    name: 'RoadSense',
    subtitle: 'Intelligent Road Condition Detection',
    thumb: '/roadsense-thumb.png',
    tags: ['React JS', 'Supabase', 'Sensors'],
    live: 'https://rsai.vercel.app/',
    rotate: 7,
  },
];

/* ─── Arrow icon ─── */
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 7h10v10M7 17 17 7" />
  </svg>
);

export function HeroSection({ introDone }) {
  /* ── Refs ── */
  const wrapperRef  = useRef(null);   // outer tall scroll container
  const stickyRef   = useRef(null);   // pinned viewport (100vh)
  const line1Ref    = useRef(null);   // "TARUN KUMAR"
  const line2Ref    = useRef(null);   // "AGNIHOTRI"
  const bottomRef   = useRef(null);   // bottom bar
  const cardRef     = useRef(null);   // single project card
  const progressRef = useRef(null);   // thin progress bar
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  /* ── Image flipping effect (0.3s interval) ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % HERO_PROJECTS.length);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  /* ── Scroll-driven single card animation ── */
  useEffect(() => {
    if (!cardRef.current || !wrapperRef.current) return;

    const card = cardRef.current;
    const sticky = stickyRef.current;
    const lines = [line1Ref.current, line2Ref.current].filter(Boolean);
    const bottom = bottomRef.current;

    // Set initial resting state directly
    gsap.set(card, { rotateZ: -5, scale: 0.45, z: -350, opacity: 0.85 });

    // Build scroll-scrubbed timeline with robust fromTo definitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger   : wrapperRef.current,
        start     : 'top top',
        end       : '+=150%',
        scrub     : 1,
        pin       : sticky,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate(self) {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    // Phase 1 (0 -> 0.45): Name fades out & card smoothly untilts into straight position (0deg) and scales to exact natural fit (scale: 1.0)
    if (lines.length) {
      tl.fromTo(lines,
        { opacity: 1, scale: 1, y: 0 },
        { opacity: 0, scale: 0.85, y: -35, ease: 'power1.out', duration: 0.45 },
        0
      );
    }

    if (bottom) {
      tl.fromTo(bottom,
        { opacity: 1, y: 0 },
        { opacity: 0, y: 20, ease: 'power1.out', duration: 0.35 },
        0
      );
    }

    tl.fromTo(card,
      { rotateZ: -5, scale: 0.45, z: -350, opacity: 0.85, y: 0, zIndex: 1 },
      { rotateZ: 0,  scale: 1.0,  z: 0,    opacity: 1,    y: 0, zIndex: 10, ease: 'power1.inOut', duration: 0.45 },
      0
    );

    // Phase 2 (0.45 -> 0.70): Hold in full exact view
    tl.to(card, { duration: 0.25 }, 0.45);

    // Phase 3 (0.70 -> 1.0): Hide hero section completely as user continues scrolling down to next section
    if (sticky) {
      tl.fromTo(sticky,
        { opacity: 1, scale: 1, y: 0 },
        { opacity: 0, scale: 0.96, y: -60, ease: 'power2.in', duration: 0.3 },
        0.70
      );
    }

    if (introDone) {
      ScrollTrigger.refresh();
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [introDone]);

  return (
    /* Outer wrapper — provides scroll height: 200vh for single card animation */
    <div
      ref={wrapperRef}
      className="hm-wrapper"
      style={{ height: '200vh' }}
    >
      {/* ── Sticky viewport ── */}
      <section ref={stickyRef} className="hm-section" aria-label="Hero">
        <div className="hm-grain" aria-hidden="true" />

        {/* Progress bar */}
        <div className="hm-progress-track" aria-hidden="true">
          <div ref={progressRef} className="hm-progress-fill" />
        </div>

        {/* ── Big name text ── */}
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

          {/* ── Single card stage — centered over name text ── */}
          <div
            className="hm-cards-stage"
            style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
            aria-label="Projects showcase"
          >
            <article
              ref={cardRef}
              className="hm-proj-card hm-single-card"
              style={{
                transform: `rotateZ(-5deg)`,
              }}
            >
              {/* Thumbnail with flipping effect */}
              <div className="hm-proj-img-wrap">
                <img
                  src={HERO_PROJECTS[currentProjectIndex].thumb}
                  alt={HERO_PROJECTS[currentProjectIndex].name}
                  className="hm-proj-img"
                />
                {/* Gloss overlay */}
                <div className="hm-proj-gloss" />
              </div>

              {/* Info strip */}
              <div className="hm-proj-info">
                <div className="hm-proj-meta">
                  <h2 className="hm-proj-name">{HERO_PROJECTS[currentProjectIndex].name}</h2>
                  <p className="hm-proj-sub">{HERO_PROJECTS[currentProjectIndex].subtitle}</p>
                </div>
                <div className="hm-proj-footer">
                  <div className="hm-proj-tags">
                    {HERO_PROJECTS[currentProjectIndex].tags.map((t) => (
                      <span key={t} className="hm-proj-tag">{t}</span>
                    ))}
                  </div>
                  {HERO_PROJECTS[currentProjectIndex].live && (
                    <a
                      href={HERO_PROJECTS[currentProjectIndex].live}
                      target="_blank"
                      rel="noreferrer"
                      className="hm-proj-link"
                    >
                      Live <ArrowIcon />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div ref={bottomRef} className="hm-bottom">
          {/* Left — icon links */}
          <div className="hm-icons">
            <a href="https://github.com/tarunagnihotri534" target="_blank" rel="noreferrer"
              className="hm-icon-btn" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/tarun-agnihotri69/" target="_blank"
              rel="noreferrer" className="hm-icon-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="mailto:tarunagnihotri534@gmail.com" className="hm-icon-btn" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
            <a href="https://x.com/tarunagnihotri_" target="_blank" rel="noreferrer"
              className="hm-icon-btn" aria-label="Twitter / X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.254 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Centre — resume */}
          <a href="/TARUN.pdf" download="TARUN.pdf" className="hm-resume-link">
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
    </div>
  );
}

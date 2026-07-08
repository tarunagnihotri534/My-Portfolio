import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Project data — same as ProjectsSection ─── */
const SHOWCASE_PROJECTS = [
  {
    id: '01',
    name: 'JanMitra',
    subtitle: 'AI-Powered Civic Support Platform',
    thumb: '/project-thumb.png',
    tags: ['React 18', 'Node JS', 'ML / OCR'],
    live: 'https://jan-mitra-tarun.vercel.app/',
    color: '#7c3aed',
  },
  {
    id: '02',
    name: 'CiviLedger',
    subtitle: 'Decentralized Public Policy Engine',
    thumb: '/Screenshot (1920).png',
    tags: ['Web3', 'ICP', 'Smart Contracts'],
    live: 'https://civic-ledger-new.vercel.app/',
    color: '#059669',
  },
  {
    id: '03',
    name: 'RoadSense',
    subtitle: 'Intelligent Road Condition Detection',
    thumb: '/roadsense-thumb.png',
    tags: ['React JS', 'Supabase', 'Sensors'],
    live: 'https://rsai.vercel.app/',
    color: '#ea580c',
  },
  {
    id: '04',
    name: 'r4venous',
    subtitle: 'Dark-themed Developer Tool',
    thumb: '/r4venous-thumb.png',
    tags: ['GSAP', 'Lenis', 'React'],
    live: null,
    color: '#dc2626',
  },
  {
    id: '05',
    name: '2yum',
    subtitle: 'Food Discovery Platform',
    thumb: '/2yum-thumb.png',
    tags: ['React', 'Node JS', 'Express'],
    live: null,
    color: '#d97706',
  },
];

/* ─── Arrow icon ─── */
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 7h10v10M7 17 17 7" />
  </svg>
);

export function ScrollShowcase() {
  const wrapperRef  = useRef(null); // outer scroll container
  const stickyRef   = useRef(null); // sticky viewport
  const cardsRef    = useRef([]);   // all card elements
  const progressRef = useRef(null); // thin progress line

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky  = stickyRef.current;
    const cards   = cardsRef.current.filter(Boolean);
    const n       = cards.length;
    if (!wrapper || !sticky || n === 0) return;

    // Each card occupies 1 "unit" of scroll distance
    // We add 0.5 units of padding at start (card-0 enters fully) and at end
    const SCROLL_PER_CARD = 1; // normalized 0-1 units per card
    const TOTAL_UNITS     = n * SCROLL_PER_CARD;

    /* ── Build GSAP master timeline scrubbed to scroll ── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger : wrapper,
        start   : 'top top',
        end     : `+=${TOTAL_UNITS * 100}%`,
        scrub   : 1.2,            // silky Lenis-compatible scrub
        pin     : sticky,         // pins sticky div, not the wrapper
        pinSpacing: false,        // wrapper provides the scroll height
        anticipatePin: 1,
        onUpdate(self) {
          if (progressRef.current) {
            progressRef.current.style.transform =
              `scaleX(${self.progress})`;
          }
        },
      },
    });

    cards.forEach((card, i) => {
      const start = i / n;           // 0, 1/n, 2/n …
      const mid   = (i + 0.5) / n;  // midpoint of card's slot
      const end   = (i + 1) / n;    // card exits as next enters

      /*
       * ENTER phase:  card glides in from depth (scale ↑, rotateZ → 0, opacity ↑)
       * EXIT  phase:  card zooms past camera  (scale ↑↑, rotateZ flips, opacity ↓)
       *
       * The total timeline is 1 unit wide (0 → 1). Each card occupies 1/n of that.
       */

      // Preposition — hidden behind (happens before this card's slot begins)
      gsap.set(card, {
        opacity      : i === 0 ? 0 : 0,
        scale        : 0.55,
        rotateZ      : i % 2 === 0 ? -12 : 12,
        rotateY      : i % 2 === 0 ? -8 : 8,
        y            : 60,
        z            : -400,
        transformPerspective: 1400,
      });

      // ENTER — scale up, rotate to 0, advance on Z
      tl.fromTo(card,
        {
          opacity : 0,
          scale   : 0.55,
          rotateZ : i % 2 === 0 ? -12 : 12,
          rotateY : i % 2 === 0 ? -8  :  8,
          y       : 60,
          z       : -400,
        },
        {
          opacity : 1,
          scale   : 1,
          rotateZ : 0,
          rotateY : 0,
          y       : 0,
          z       : 0,
          ease    : 'power2.out',
          duration: mid - start,
        },
        start // position in timeline
      );

      // EXIT — zoom past, rotate out, fade
      tl.to(card,
        {
          opacity : 0,
          scale   : 1.45,
          rotateZ : i % 2 === 0 ? 8 : -8,
          rotateY : i % 2 === 0 ? 6 : -6,
          y       : -40,
          z       : 350,
          ease    : 'power2.in',
          duration: end - mid,
        },
        mid // starts right after enter completes
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    /* Outer container — provides the scroll height */
    <div
      ref={wrapperRef}
      className="sc-wrapper"
      aria-label="Project Showcase"
    >
      {/* Sticky viewport — stays fixed while user scrolls through sc-wrapper */}
      <div ref={stickyRef} className="sc-sticky">

        {/* Thin progress bar at very top */}
        <div className="sc-progress-track" aria-hidden="true">
          <div ref={progressRef} className="sc-progress-fill" />
        </div>

        {/* ── Big bold name watermark ── */}
        <div className="sc-bg-text" aria-hidden="true">
          <span className="sc-bg-line">TARUN</span>
          <span className="sc-bg-line sc-bg-line--indent">KUMAR</span>
          <span className="sc-bg-line">AGNIHOTRI</span>
        </div>

        {/* ── Eyebrow label ── */}
        <p className="sc-eyebrow">— Selected Work / Scroll to explore</p>

        {/* ── Card stage ── */}
        <div className="sc-stage" style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
          {SHOWCASE_PROJECTS.map((proj, i) => (
            <article
              key={proj.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="sc-card"
              style={{ '--card-accent': proj.color }}
            >
              {/* Number badge */}
              <span className="sc-card-num">{proj.id}</span>

              {/* Thumbnail */}
              <div className="sc-card-img-wrap">
                <img
                  src={proj.thumb}
                  alt={proj.name}
                  className="sc-card-img"
                  loading="lazy"
                />
                {/* Shimmer overlay */}
                <div className="sc-card-shimmer" />
                {/* Colored accent bar at bottom */}
                <div className="sc-card-accent-bar" />
              </div>

              {/* Info */}
              <div className="sc-card-info">
                <div className="sc-card-meta">
                  <h3 className="sc-card-name">{proj.name}</h3>
                  <p className="sc-card-sub">{proj.subtitle}</p>
                </div>
                <div className="sc-card-footer">
                  <div className="sc-card-tags">
                    {proj.tags.map((t) => (
                      <span key={t} className="sc-card-tag">{t}</span>
                    ))}
                  </div>
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noreferrer"
                      className="sc-card-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live <ArrowIcon />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Bottom counter label (shows current project count) ── */}
        <div className="sc-bottom-bar">
          <span className="sc-count">
            {SHOWCASE_PROJECTS.length} Projects
          </span>
          <span className="sc-scroll-hint">↓ Keep scrolling</span>
        </div>
      </div>
    </div>
  );
}

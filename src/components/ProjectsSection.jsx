import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─── Project data from resume ─── */
const PROJECTS = [
  {
    id: '01',
    name: 'ClaimVertex',
    subtitle: 'Enterprise AI Insurance Claims & SIU Command Platform',
    description:
      'Autonomous, load-bearing Property & Casualty (P&C) claims intelligence platform built to eliminate administrative bottlenecks, slash Straight-Through Processing (STP) payout latency to under 0.9 seconds, and protect insurance carriers against syndicated fraud.',
    tags: ['RAG', 'Firebase', 'NextJS', 'Python'],
    thumb: '/Screenshot (3262).png',
    live: 'https://claim-pilot-orcin.vercel.app/',
    featured: true,
  },
  {
    id: '02',
    name: 'Jennie',
    subtitle: 'Autonomous Agentic AI Code Reviewer',
    description:
      'Jennie is an autonomous, agentic AI code review tool built for modern engineering workflows. Unlike traditional static linters (ESLint, SonarQube), Jennie deeply understands code context, multi-file changes, and architectural intent.',
    tags: ['AI Agent', 'Node JS', 'LLMs', 'Code Review', 'Automation'],
    thumb: '/Screenshot (3048).png',
    live: 'https://github.com/tarunagnihotri534/Jennie',
    featured: false,
  },
  {
    id: '03',
    name: 'CiviLedger',
    subtitle: 'Decentralized Public Policy Engine',
    description:
      'Web3 platform converting government policies into smart contracts on ICP. Citizen-triggered fund flows with real-time policy rollout dashboard.',
    tags: ['Web3', 'ICP', 'Smart Contracts', 'React', 'Tailwind'],
    thumb: '/Screenshot (1920).png',
    live: 'https://civic-ledger-new.vercel.app/',
    featured: false,
  },
  {
    id: '04',
    name: 'RoadSense',
    subtitle: 'Intelligent Road Condition Detection',
    description:
      'Uses smartphone sensors (accelerometer, GPS, gyroscope) to passively detect potholes, congestion, and accidents in real-time without manual input.',
    tags: ['React JS', 'Node JS', 'Supabase', 'Tailwind CSS'],
    thumb: '/roadsense-thumb.png',
    live: 'https://rsai.vercel.app/',
    featured: false,
  },
];

/* ─── Arrow icon ─── */
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 7h10v10M7 17 17 7" />
  </svg>
);

/* ─── Featured project (first card, full-width spotlight) ─── */
function FeaturedProject({ project, imgRef, infoRef }) {
  return (
    <div className="pv2-featured" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      overflow: 'hidden',
      padding: '1.5rem'
    }}>
      {/* Ghost number watermark */}
      <span className="pv2-ghost-num" style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        fontSize: '4rem',
        fontWeight: '700',
        color: 'rgba(255,255,255,0.05)',
        pointerEvents: 'none'
      }} aria-hidden="true">{project.id}</span>

      {/* Top — image */}
      <div ref={imgRef} className="pv2-featured-img-wrap" style={{
        position: 'relative',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <img
          src={project.thumb}
          alt={project.name}
          className="pv2-featured-img"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <span className="pv2-featured-badge" style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          padding: '0.25rem 0.75rem',
          backgroundColor: 'var(--accent)',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: '600',
          borderRadius: '9999px'
        }}>★ Featured</span>
      </div>

      {/* Bottom — info */}
      <div ref={infoRef} className="pv2-featured-info" style={{
        textAlign: 'left'
      }}>
        <p className="pv2-label" style={{
          fontSize: '0.75rem',
          fontWeight: '600',
          color: 'var(--accent)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>{project.id} / PROJECT</p>
        <h3 className="pv2-featured-name" style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          lineHeight: '1.2'
        }}>{project.name}</h3>
        <p className="pv2-featured-sub" style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          marginBottom: '0.75rem'
        }}>{project.subtitle}</p>
        <p className="pv2-featured-desc" style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          lineHeight: '1.6',
          marginBottom: '1rem'
        }}>{project.description}</p>
        <div className="pv2-tags" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          {project.tags.map(t => (
            <span key={t} className="pv2-tag" style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '9999px',
              color: 'var(--text-secondary)'
            }}>{t}</span>
          ))}
        </div>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="pv2-view-case" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--accent)',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}>
            View Project <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Grid card (remaining projects) ─── */
function ProjectCard({ project, cardRef }) {
  const localCardRef = useRef(null);

  useEffect(() => {
    const cardEl = localCardRef.current;
    if (!cardEl) return;

    // Simple hover scale effect
    const onEnter = () => {
      gsap.to(cardEl, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(cardEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    cardEl.addEventListener('mouseenter', onEnter);
    cardEl.addEventListener('mouseleave', onLeave);

    return () => {
      cardEl.removeEventListener('mouseenter', onEnter);
      cardEl.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div 
      ref={(el) => {
        localCardRef.current = el;
        if (typeof cardRef === 'function') cardRef(el);
        else if (cardRef) cardRef.current = el;
      }} 
      className="pv2-card" 
      style={{ 
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <div className="pv2-card-img-wrap" style={{ aspectRatio: '16/10', position: 'relative' }}>
        <span className="pv2-card-num" style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '0.75rem',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.5)',
          zIndex: 1
        }}>{project.id}</span>
        <img src={project.thumb} alt={project.name} className="pv2-card-img" style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }} />
      </div>
      <div className="pv2-card-body" style={{ padding: '1.25rem' }}>
        <h3 className="pv2-card-name" style={{
          fontSize: '1.1rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          lineHeight: '1.3'
        }}>{project.name}</h3>
        <p className="pv2-card-sub" style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          marginBottom: '0.75rem'
        }}>{project.subtitle}</p>
        <div className="pv2-tags" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '0.75rem'
        }}>
          {project.tags.slice(0, 3).map(t => (
            <span key={t} className="pv2-tag" style={{
              fontSize: '0.7rem',
              padding: '0.25rem 0.5rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '9999px',
              color: 'var(--text-secondary)'
            }}>{t}</span>
          ))}
        </div>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="pv2-card-link" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--accent)',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}>
            View Project <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Cursor-following floating thumbnail ─── */
function CursorThumb() {
  const thumbRef = useRef(null);
  const imgRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    const el = thumbRef.current;
    if (!el) return;

    xTo.current = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    yTo.current = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });

    const onMove = (e) => {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    };

    const cards = document.querySelectorAll('[data-cursor-thumb]');
    cards.forEach((card) => {
      const src = card.dataset.cursorThumb;
      card.addEventListener('mouseenter', () => {
        if (imgRef.current && src) imgRef.current.src = src;
        gsap.to(el, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.4)' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(el, { opacity: 0, scale: 0.85, duration: 0.25 });
      });
    });

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={thumbRef} className="pv2-cursor-thumb" aria-hidden="true">
      <img ref={imgRef} src={null} alt="" className="pv2-cursor-thumb-img" />
    </div>
  );
}

/* ─── Main component ─── */
export function ProjectsSection() {
  const sectionRef      = useRef(null);
  const pillRef         = useRef(null);
  const titleRef        = useRef(null);
  const subtitleRef     = useRef(null);
  const featImgRef      = useRef(null);
  const featInfoRef     = useRef(null);
  const cardRefs        = useRef([]);
  const ctaRef          = useRef(null);
  const projIconRef     = useRef(null);   // project-initiation.png

  const featured     = PROJECTS[0];
  const gridProjects = PROJECTS.slice(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      /* ── Master timeline triggered by section entering viewport ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 95%' : 'top 78%',
          once: true,
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      /* Eyebrow pill */
      tl.fromTo(pillRef.current,
        { y: -18, opacity: 0, scale: 0.88 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 },
        0
      );

      /* Giant PROJECTS title — char by char */
      const split = new SplitText(titleRef.current, { type: 'chars' });
      tl.fromTo(split.chars,
        { y: 90, opacity: 0, rotateX: -50 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.025, ease: 'back.out(1.5)' },
        0.1
      );

      /* Subtitle */
      tl.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.5
      );

      /* Featured image — clip reveal from bottom */
      if (featImgRef.current) {
        tl.fromTo(featImgRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.9, ease: 'power4.inOut' },
          0.55
        );
      }

      /* Featured info stagger */
      if (featInfoRef.current) {
        const infoChildren = Array.from(featInfoRef.current.children);
        tl.fromTo(infoChildren,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
          0.65
        );
      }

      /* Grid cards */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        tl.fromTo(card,
          { opacity: 0, rotateY: 90, z: -200 },
          { opacity: 1, rotateY: 0, z: 0, duration: 0.9, ease: 'power4.out' },
          0.75 + i * 0.15
        );
      });

      /* CTA row */
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          1.1
        );
      }

      /* ── project-initiation icon — spin + bounce loop ── */
      if (projIconRef.current) {
        tl.fromTo(projIconRef.current,
          { scale: 0, opacity: 0, rotation: -45 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' },
          0.4
        );
        const rocketTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        rocketTl
          .to(projIconRef.current, {
            y: -28, x: 8, rotation: 15,
            duration: 0.4, ease: 'power2.out',
          })
          .to(projIconRef.current, {
            y: -38, x: 14, rotation: 20,
            duration: 0.25, ease: 'power1.out',
          })
          .to(projIconRef.current, {
            y: -20, x: 8, rotation: 10,
            duration: 0.18, ease: 'power1.in',
          })
          .to(projIconRef.current, {
            y: 0, x: 0, rotation: 0,
            duration: 0.5, ease: 'bounce.out',
          });
      }

      /* Parallax on featured image */
      if (featImgRef.current) {
        gsap.to(featImgRef.current, {
          y: isMobile ? -25 : -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: isMobile ? 'bottom top' : 'center top',
            scrub: isMobile ? 1 : 1.4,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pv2-section section"
      id="projects-section"
      aria-label="Projects"
    >
      {/* Cursor follower */}
      <CursorThumb />

      {/* ── Header ── */}
      <div className="pv2-header">
        <span ref={pillRef} className="pv2-pill">
          <span className="pv2-pill-dot" />
          Selected Work
        </span>
        <div className="pv2-title-row">
          <h2 ref={titleRef} className="pv2-title">PROJECTS</h2>
          <img
            ref={projIconRef}
            src="/project-initiation.png"
            alt=""
            aria-hidden="true"
            className="pv2-title-icon"
          />
        </div>
        <p ref={subtitleRef} className="pv2-subtitle">
          A curated set of builds spanning AI platforms, Web3 infrastructure,
          and intelligent mobile experiences.
        </p>
      </div>

      {/* ── Featured spotlight ── */}
      <FeaturedProject
        key={featured.id}
        project={featured}
        imgRef={featImgRef}
        infoRef={featInfoRef}
      />

      {/* ── Project grid ── */}
      <div className="pv2-grid">
        {gridProjects.map((proj, i) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            cardRef={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
      </div>

      {/* ── CTA row / View All Projects button ── */}
      <div ref={ctaRef} className="pv2-cta" style={{ marginTop: '3rem' }}>
        <span className="pv2-cta-line" />
        <div className="pv2-cta-inner">
          <span className="pv2-cta-label">Explore More</span>
          <Link to="/projects" className="pv2-cta-btn">
            View All Projects <ArrowIcon />
          </Link>
        </div>
        <span className="pv2-cta-line" />
      </div>
    </section>
  );
}


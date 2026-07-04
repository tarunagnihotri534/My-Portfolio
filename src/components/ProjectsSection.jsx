import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─── Project data from resume ─── */
const PROJECTS = [
  {
    id: '01',
    name: 'JanMitra',
    subtitle: 'AI-Powered Civic Support Platform',
    description:
      'An AI-driven platform assisting citizens in resolving everyday civic issues — document verification, fraud detection, and government scheme guidance powered by OCR + NLP + ML.',
    tags: ['React 18', 'Vite 6', 'Node JS', 'Tailwind CSS', 'Framer Motion'],
    thumb: '/project-thumb.png',
    live: 'https://jan-mitra-tarun.vercel.app/',
    featured: true,
  },
  {
    id: '02',
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
    id: '03',
    name: 'RoadSense',
    subtitle: 'Intelligent Road Condition Detection',
    description:
      'Uses smartphone sensors (accelerometer, GPS, gyroscope) to passively detect potholes, congestion, and accidents in real-time without manual input.',
    tags: ['React JS', 'Node JS', 'Supabase', 'Tailwind CSS'],
    thumb: '/roadsense-thumb.png',
    live: 'https://rsai.vercel.app/',
    featured: false,
  },
  {
    id: '04',
    name: 'r4venous',
    subtitle: 'Dark-themed Developer Tool',
    description:
      'A high-performance, animation-driven esports landing page built with GSAP, Lenis, and modern web technologies. Designed with immersive scroll animations, cinematic transitions, and smooth interactions to deliver a bold, premium user experience while maintaining excellent performance and responsiveness.',
    tags: ['React', 'GSAP', 'Lenis', 'JavaScript', 'CSS'],
    thumb: '/r4venous-thumb.png',
    live: null,
    featured: false,
  },
  {
    id: '05',
    name: '2yum',
    subtitle: 'Food Discovery Platform',
    description:
      'A modern food discovery and ordering experience with curated restaurant recommendations, real-time menus, and a delightful UI.',
    tags: ['React', 'Tailwind CSS', 'Node JS', 'Express'],
    thumb: '/2yum-thumb.png',
    live: null,
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
    <div className="pv2-featured">
      {/* Ghost number watermark */}
      <span className="pv2-ghost-num" aria-hidden="true">01</span>

      {/* Left — image */}
      <div ref={imgRef} className="pv2-featured-img-wrap">
        <div className="pv2-featured-img-clip">
          <img
            src={project.thumb}
            alt={project.name}
            className="pv2-featured-img"
          />
        </div>
        <span className="pv2-featured-badge">★ Featured</span>
      </div>

      {/* Right — info */}
      <div ref={infoRef} className="pv2-featured-info">
        <p className="pv2-label">{project.id} / PROJECT</p>
        <h3 className="pv2-featured-name">{project.name}</h3>
        <p className="pv2-featured-sub">{project.subtitle}</p>
        <p className="pv2-featured-desc">{project.description}</p>
        <div className="pv2-tags">
          {project.tags.map(t => <span key={t} className="pv2-tag">{t}</span>)}
        </div>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="pv2-view-case">
            View case <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Grid card (remaining projects) ─── */
function ProjectCard({ project, cardRef }) {
  const innerRef = useRef(null);
  const localCardRef = useRef(null);

  useEffect(() => {
    const innerEl = innerRef.current;
    const cardEl = localCardRef.current;
    if (!innerEl || !cardEl) return;

    // Hover flip effect (on inner element)
    const onEnter = () => {
      gsap.to(innerEl, { rotationY: 180, duration: 0.6, ease: 'power2.inOut' });
    };
    const onLeave = () => {
      gsap.to(innerEl, { rotationY: 0, duration: 0.6, ease: 'power2.inOut' });
      // Reset tilt
      gsap.to(cardEl, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'power2.out' });
    };

    cardEl.addEventListener('mouseenter', onEnter);
    cardEl.addEventListener('mouseleave', onLeave);

    // Cursor tilt effect (on outer card element)
    const xTo = gsap.quickTo(cardEl, 'rotationY', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(cardEl, 'rotationX', { duration: 0.5, ease: 'power3' });

    const onMove = (e) => {
        const rect = cardEl.getBoundingClientRect();
        // Calculate mouse position relative to center of card (-1 to 1)
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        
        // Tilt range: 10 degrees max
        xTo(x * 10);
        yTo(-y * 10); // Negative so it tilts towards mouse
    };

    cardEl.addEventListener('mousemove', onMove);

    return () => {
      cardEl.removeEventListener('mouseenter', onEnter);
      cardEl.removeEventListener('mouseleave', onLeave);
      cardEl.removeEventListener('mousemove', onMove);
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
      style={{ perspective: '1200px', backgroundColor: 'transparent', border: 'none', overflow: 'visible' }}
    >
      <div 
        ref={innerRef} 
        className="pv2-card-inner" 
        style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative', 
            transformStyle: 'preserve-3d',
            transition: 'box-shadow 0.3s ease',
            borderRadius: '16px'
        }}
      >
          {/* Front Face */}
          <div className="pv2-card-face pv2-card-front" style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              overflow: 'hidden'
          }}>
            <div className="pv2-card-img-wrap" style={{ aspectRatio: '16/10', borderBottom: '1px solid var(--border-color)' }}>
                <span className="pv2-card-num">{project.id}</span>
                <img src={project.thumb} alt={project.name} className="pv2-card-img" />
            </div>
            <div className="pv2-card-body">
                <h3 className="pv2-card-name">{project.name}</h3>
                <p className="pv2-card-sub">{project.subtitle}</p>
            </div>
          </div>

          {/* Back Face */}
          <div className="pv2-card-face pv2-card-back" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1rem'
          }}>
            <h3 className="pv2-card-name" style={{ color: 'var(--accent)' }}>{project.name}</h3>
            <p className="pv2-card-desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{project.description}</p>
            <div className="pv2-tags pv2-tags--sm" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                {project.tags.map(t => <span key={t} className="pv2-tag">{t}</span>)}
            </div>
            {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="pv2-card-link" style={{ marginTop: '1rem' }}>
                    Live Project <ArrowIcon />
                </a>
            )}
          </div>
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
  const sectionRef   = useRef(null);
  const pillRef      = useRef(null);
  const titleRef     = useRef(null);
  const subtitleRef  = useRef(null);
  const featImgRef   = useRef(null);
  const featInfoRef  = useRef(null);
  const cardRefs     = useRef([]);
  const ctaRef       = useRef(null);

  const featured   = PROJECTS[0];
  const gridProjects = PROJECTS.slice(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Master timeline triggered by section entering viewport ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
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
      tl.fromTo(featImgRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.9, ease: 'power4.inOut' },
        0.55
      );

      /* Featured info stagger */
      const infoChildren = featInfoRef.current
        ? Array.from(featInfoRef.current.children)
        : [];
      tl.fromTo(infoChildren,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
        0.65
      );

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
      tl.fromTo(ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        1.1
      );

      /* Parallax on featured image */
      gsap.to(featImgRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'center top',
          scrub: 1.4,
        },
      });
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
        <h2 ref={titleRef} className="pv2-title">PROJECTS</h2>
        <p ref={subtitleRef} className="pv2-subtitle">
          A curated set of builds spanning AI platforms, Web3 infrastructure,
          and intelligent mobile experiences.
        </p>
      </div>

      {/* ── Featured spotlight ── */}
      <FeaturedProject
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


    </section>
  );
}

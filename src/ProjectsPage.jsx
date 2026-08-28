import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SiteFooter } from './components/SiteFooter';

const ALL_PROJECTS = [
  {
    id: '01',
    title: 'ClaimVertex',
    subtitle: 'Enterprise AI Insurance Claims & SIU Command Platform',
    desc: [
      'ClaimVertex is an autonomous, load-bearing Property & Casualty (P&C) claims intelligence platform built to eliminate administrative bottlenecks, slash Straight-Through Processing (STP) payout latency to under 0.9 seconds, and protect insurance carriers against syndicated fraud.',
      'Features sub-second deterministic coverage validation, multi-carrier duplicate billing detection, NOAA Doppler weather validation, and EXIF metadata audit.',
      'Built with RAG, Firebase, NextJS, and Python.'
    ],
    image: '/Screenshot (3262).png',
    tags: ['RAG', 'Firebase', 'NextJS', 'Python'],
    link: 'https://claim-pilot-orcin.vercel.app/'
  },
  {
    id: '02',
    title: 'Jennie',
    subtitle: 'Autonomous Agentic AI Code Reviewer',
    desc: [
      'Jennie is an autonomous, agentic AI code review tool built for modern engineering workflows.',
      'Unlike traditional static linters (ESLint, SonarQube), Jennie deeply understands code context, multi-file changes, and architectural intent.',
      'Built with AI Agents, Node JS, LLMs, and Automation pipelines.'
    ],
    image: '/Screenshot (3048).png',
    tags: ['AI Agent', 'Node JS', 'LLMs', 'Code Review', 'Automation'],
    link: 'https://github.com/tarunagnihotri534/Jennie'
  },
  {
    id: '03',
    title: 'CiviLedger',
    subtitle: 'Decentralized Public Policy Engine',
    desc: [
      'Web3 platform converting government policies into smart contracts on ICP.',
      'Citizen-triggered fund flows with real-time policy rollout dashboard.',
      'Built with Web3, ICP, Smart Contracts, React, and Tailwind CSS.'
    ],
    image: '/Screenshot (1920).png',
    tags: ['Web3', 'ICP', 'Smart Contracts', 'React', 'Tailwind'],
    link: 'https://civic-ledger-new.vercel.app/'
  },
  {
    id: '04',
    title: 'RoadSense',
    subtitle: 'Intelligent Road Condition Detection',
    desc: [
      'Uses smartphone sensors (accelerometer, GPS, gyroscope) to passively detect potholes, congestion, and accidents in real-time.',
      'Operates passively without requiring manual input from drivers.',
      'Built with React JS, Node JS, Supabase, and Tailwind CSS.'
    ],
    image: '/roadsense-thumb.png',
    tags: ['React JS', 'Node JS', 'Supabase', 'Tailwind CSS', 'Sensors'],
    link: 'https://rsai.vercel.app/'
  },
  {
    id: '05',
    title: 'r4venous',
    subtitle: 'Dark-themed Developer & Esports Platform',
    desc: [
      'A high-performance, animation-driven esports landing page built with GSAP, Lenis, and modern web technologies.',
      'Designed with immersive scroll animations, cinematic transitions, and smooth interactions to deliver a bold user experience.',
      'Built with React JS, GSAP, Lenis, JavaScript, and CSS.'
    ],
    image: '/r4venous-thumb.png',
    tags: ['React', 'GSAP', 'Lenis', 'JavaScript', 'CSS'],
    link: 'https://r4venous-esports-j2hlb7uov-darktarunyt-7908s-projects.vercel.app/'
  },
  {
    id: '06',
    title: '2YUM',
    subtitle: 'Food Discovery & Restaurant Platform',
    desc: [
      'A modern food discovery and ordering experience with curated restaurant recommendations, real-time menus, and delightful UI.',
      'Features smooth scroll animations, interactive menu sections, and fast performance.',
      'Built with React, Next.js, Tailwind CSS, Node JS, and Express.'
    ],
    image: '/2yum-thumb.png',
    tags: ['Next JS', 'React', 'Tailwind CSS', 'Node JS', 'Express'],
    link: 'https://2-yum-hamburgers-ogs8k80v0-darktarunyt-7908s-projects.vercel.app/'
  }
];

function ProjectsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <div className="vignette" />
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>

        {/* Back button pinned to top-left corner */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            zIndex: 50
          }}
        >
          <Link to="/" className="back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Project count indicator pinned to top-right corner */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: '2.5rem',
            right: '2rem',
            zIndex: 50
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {ALL_PROJECTS.length} Total Projects
          </span>
        </motion.div>

        <main className="projects-container" style={{ paddingTop: '5.5rem', paddingBottom: '6rem', flex: 1 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="projects-header"
            style={{ marginBottom: '3.5rem', textAlign: 'center' }}
          >
            <span className="projects-pill" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              color: 'var(--accent)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              marginBottom: '1rem'
            }}>
              ● Complete Archive
            </span>
            <h1 className="projects-mega-title" style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              ALL PROJECTS
            </h1>
          </motion.div>

          {/* Projects 3-Column Grid */}
          <div className="projects-grid">
            {ALL_PROJECTS.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="project-card"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <div className="project-image-container" style={{ position: 'relative', overflow: 'hidden' }}>
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.6rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(0,0,0,0.65)',
                    color: '#fff',
                    backdropFilter: 'blur(6px)',
                    zIndex: 2
                  }}>
                    {proj.id}
                  </span>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="project-image"
                    style={{
                      width: '100%',
                      aspectRatio: '16 / 9',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
                <div className="project-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 className="project-card-title" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    {proj.title}
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.9rem' }}>
                    {proj.subtitle}
                  </p>
                  <ul className="project-list" style={{ marginBottom: '1.25rem', flex: 1, paddingLeft: '1.1rem' }}>
                    {proj.desc.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ fontSize: '0.825rem', lineHeight: '1.55', marginBottom: '0.5rem' }}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="project-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {proj.tags.map((tag) => (
                      <span key={tag} className="project-tag" style={{ fontSize: '0.725rem', padding: '0.25rem 0.65rem' }}>{tag}</span>
                    ))}
                  </div>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="project-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1.15rem',
                        backgroundColor: 'var(--accent)',
                        color: '#ffffff',
                        borderRadius: '9999px',
                        fontWeight: 600,
                        fontSize: '0.825rem',
                        textDecoration: 'none',
                        marginTop: 'auto',
                        alignSelf: 'flex-start',
                        transition: 'transform 0.2s ease, opacity 0.2s ease'
                      }}
                    >
                      Visit Project
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7h10v10M7 17 17 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </main>

        {/* Full Footer */}
        <SiteFooter />
      </div>
    </>
  );
}

export default ProjectsPage;

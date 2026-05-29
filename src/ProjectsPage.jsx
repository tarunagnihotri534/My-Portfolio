import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ProjectsPage() {
  return (
    <>
      <div className="vignette" />
      <main className="container" style={{ paddingTop: '5rem' }}>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '3rem' }}
        >
          <Link to="/" className="back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="projects-header"
        >
          <span className="projects-pill">More Projects</span>
          <h1 className="projects-mega-title">More Project Work</h1>
          <p className="projects-subtitle">
            Here's another project I've built with modern web technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="projects-grid">

          {/* 2YUM */}
          <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="project-image-container">
              <img src="/2yum-thumb.png" alt="2YUM Preview" className="project-image" />
            </div>
            <div className="project-content">
              <h2 className="project-card-title">🍔 2YUM – Modern Burger Store</h2>
              <ul className="project-list">
                <li>2YUM is a modern burger restaurant website designed to deliver a premium and visually engaging fast-food experience.</li>
                <li>Features smooth scroll animations, interactive menu sections, and immersive transitions built with GSAP and Framer Motion.</li>
                <li>Built with Next.js for blazing-fast performance and a seamless, responsive user experience across all devices.</li>
              </ul>
              <div className="project-tags">
                <span className="project-tag">Next JS</span>
                <span className="project-tag">React JS</span>
                <span className="project-tag">GSAP</span>
                <span className="project-tag">Framer Motion</span>
              </div>
              <a href="https://2-yum-hamburgers-ogs8k80v0-darktarunyt-7908s-projects.vercel.app/" target="_blank" rel="noreferrer" className="project-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
                </svg>
                Visit Website
              </a>
            </div>
          </motion.div>

          {/* R4VENOUS Esports */}
          <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="project-image-container">
              <img src="/r4venous-thumb.png" alt="R4VENOUS Esports Preview" className="project-image" />
            </div>
            <div className="project-content">
              <h2 className="project-card-title">🎮 R4VENOUS Esports – Modern Esports Platform</h2>
              <ul className="project-list">
                <li>A modern gaming and esports website delivering an immersive, high-energy digital experience for esports audiences and gaming communities.</li>
                <li>Built a professional presence for esports teams, tournaments, and gaming brands through futuristic UI design and dynamic layouts.</li>
                <li>Implemented buttery-smooth scrolling with Lenis and engaging micro-animations for a premium, production-ready feel.</li>
              </ul>
              <div className="project-tags">
                <span className="project-tag">Next JS</span>
                <span className="project-tag">React JS</span>
                <span className="project-tag">Lucide</span>
                <span className="project-tag">Lenis</span>
              </div>
              <a href="https://r4venous-esports-j2hlb7uov-darktarunyt-7908s-projects.vercel.app/" target="_blank" rel="noreferrer" className="project-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
                </svg>
                Visit Website
              </a>
            </div>
          </motion.div>

        </div>

      </main>
    </>
  );
}

export default ProjectsPage;

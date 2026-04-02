import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const MailIcon = ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;

const ScrollReveal = ({ children, delay = 0, className = "" }) => (

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SkillItem = ({ src, alt, label, isSvg = false }) => (
  <div className="skill-item">
    {isSvg ? (
      <svg className="rest-api-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"/>
      </svg>
    ) : (
      <img src={src} alt={alt} />
    )}
    <span>{label}</span>
  </div>
);

function App() {
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (window.innerWidth / 2 - e.pageX) / 40,
        y: (window.innerHeight / 2 - e.pageY) / 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.section, #hero-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="vignette"></div>

      <main className="container" id="home">
        {/* HERO SECTION */}
        <section className="hero" id="hero-section">
          <div className="hero-text">
            <motion.h1 
              className="hero-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Hi, I'm Tarun<br/>Kumar Agnihotri
            </motion.h1>
            <motion.p 
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <strong>Full Stack Web Developer</strong> with hands-on experience in building scalable, modern web applications using React, Next.js, Node.js, and cutting-edge frontend technologies, passionate about clean code and impactful user experiences.
            </motion.p>
            <motion.div 
              className="hero-links"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <a href="/TARUN.pdf" download="Tarun_Agnihotri_Resume.pdf" className="hero-link">
                Download Resume
              </a>
              <a href="mailto:tarunagnihotri534@gmail.com" className="hero-link">
                tarunagnihotri534@gmail.com
              </a>
              <a href="tel:+919369803059" className="hero-link">
                8470981091
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, x: mousePosition.x, y: mousePosition.y }}
            transition={{ 
              opacity: { duration: 0.7, delay: 0.2 },
              scale: { duration: 0.7, delay: 0.2 },
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 }
            }}
          >
            <img src="/avatar.jpg" alt="Tarun Kumar Agnihotri" id="profile-image" />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section className="section" id="about-section">
          <ScrollReveal>
            <h2 className="section-title">About</h2>
            <p className="about-text">
              A results-driven <strong>Full Stack Web Developer</strong> with hands-on expertise in building
              scalable, impactful, and user-centric web applications using <strong>React, Next.js, Node.js</strong>,
              and modern frameworks. Experienced in crafting responsive UIs with <strong>Tailwind CSS</strong> and
              <strong>Framer Motion</strong>, building robust APIs, and working with <strong>MongoDB</strong>.
              Passionate about clean architecture, open-source contribution, and turning ideas into production-ready products.
            </p>
          </ScrollReveal>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="section" id="work-section">
          <ScrollReveal>
            <h2 className="section-title">Work Experience</h2>
            <div className="work-item">
              <div className="work-header">
                <div className="work-logo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                </div>
                <div className="work-info">
                  <h3 className="work-company">Community Leadership</h3>
                  <p className="work-role">Core Member & Organizer</p>
                </div>
                <span className="work-date">2024 - Present</span>
              </div>
              <ul className="work-details">
                <li>Organized events, workshops, and hackathons, boosting student engagement and technical awareness.</li>
                <li>Formerly served as Core Member & Secretary, managing workflows, communications, and member activities.</li>
                <li>Building a strong developer community and fostering innovation in cloud computing.</li>
              </ul>
            </div>
          </ScrollReveal>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills-section">
          <ScrollReveal>
            <h2 className="section-title">Skills</h2>
          </ScrollReveal>

          {/* Row 1 - Scrolling Left */}
          <ScrollReveal delay={0.1}>
            <div className="skills-marquee-wrapper">
              <div className="skills-marquee" data-direction="left">
                <div className="skills-track">
                  {[...Array(2)].map((_, i) => (
                    <React.Fragment key={i}>
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" label="HTML" />
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" label="CSS" />
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" label="JavaScript" />
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" label="TypeScript" />
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" label="Tailwind CSS" />
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="Vite" label="Vite" />
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" alt="Framer Motion" label="Framer Motion" />
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" label="React JS" />
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" label="Next JS" />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Row 2 - Scrolling Right */}
          <ScrollReveal delay={0.2}>
            <div className="skills-marquee-wrapper">
              <div className="skills-marquee" data-direction="right">
                <div className="skills-track skills-track-reverse">
                  {[...Array(3)].map((_, i) => (
                    <React.Fragment key={i}>
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node JS" label="Node JS" />
                      <SkillItem isSvg={true} label="REST API" />
                      <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" label="MongoDB" />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects-section">
          <ScrollReveal>
            <div className="projects-header">
              <span className="projects-pill">My Projects</span>
              <h2 className="projects-mega-title">Check out my project work</h2>
              <p className="projects-subtitle">
                I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
              </p>
            </div>
            <div className="projects-grid" id="projects-grid">
              <motion.div 
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="project-image-container">
                  <img src="/project-thumb.png" alt="Project Preview" className="project-image"/>
                </div>
                <div className="project-content">
                  <h3 className="project-card-title">JanMitra (AI-Powered Civic Support Platform)</h3>
                  <ul className="project-list">
                    <li>Built an AI-driven platform to assist citizens in resolving everyday civic issues such as document verification, fraud detection, and government scheme guidance.</li>
                    <li>Integrated AI tools (OCR + NLP + ML models) to analyze user queries, extract information from documents, and provide accurate, real-time responses.</li>
                    <li>Features smart chatbot support for answering queries related to government schemes, deadlines, and application processes.</li>
                  </ul>
                  <div className="project-tags">
                    <span className="project-tag">React 18</span>
                    <span className="project-tag">Vite 6</span>
                    <span className="project-tag">Node JS</span>
                    <span className="project-tag">Tailwind CSS</span>
                    <span className="project-tag">Framer Motion</span>
                  </div>
                  <a href="https://jan-mitra-tarun.vercel.app/" target="_blank" rel="noreferrer" className="project-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> Website
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="project-image-container">
                  <img src="/civiledger-thumb.png" alt="CiviLedger Preview" className="project-image"/>
                </div>
                <div className="project-content">
                  <h3 className="project-card-title">CiviLedger (Decentralized Public Policy Execution Engine)</h3>
                  <ul className="project-list">
                    <li>Web3 platform converting policies into smart contracts on ICP for transparent execution.</li>
                    <li>Enabled citizen-triggered fund flows with real-time policy rollout dashboard.</li>
                    <li>Decentralized platform for transparent public policy execution and citizen engagement.</li>
                  </ul>
                  <div className="project-tags">
                    <span className="project-tag">Web3</span>
                    <span className="project-tag">ICP</span>
                    <span className="project-tag">Smart Contracts</span>
                    <span className="project-tag">React</span>
                    <span className="project-tag">Tailwind</span>
                  </div>
                  <a href="https://civic-ledger-new.vercel.app/" target="_blank" rel="noreferrer" className="project-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> Website
                  </a>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </section>

        {/* CONTACT SECTION */}
        <section className="section contact-section" id="contact-section">
          <ScrollReveal>
            <div className="contact-header">
              <span className="projects-pill">Contact</span>
              <h2 className="projects-mega-title">Get in Touch</h2>
              <p className="contact-text">
                Would you like to get in touch? Just shoot me an <strong><a href="mailto:tarunagnihotri534@gmail.com">email here</a></strong> or contact me at <strong>9369803059</strong> and I'll respond you, surely.
              </p>
            </div>
          </ScrollReveal>
        </section>

      </main>

      {/* FLOATING DOCK */}
      <motion.nav 
        className="dock"
        initial={{ x: "-50%", y: 100, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', damping: 20 }}
      >
        <a href="#home" className={`dock-item ${activeSection === 'hero-section' ? 'active' : ''}`} title="Home">
          <HomeIcon />
        </a>
        <a href="https://github.com/tarunagnihotri534" target="_blank" rel="noreferrer" className="dock-item" title="GitHub">
          <GithubIcon />
        </a>
        <a href="https://www.linkedin.com/in/tarun-agnihotri69/" target="_blank" rel="noreferrer" className="dock-item" title="LinkedIn">
          <LinkedinIcon />
        </a>
        <a href="mailto:tarunagnihotri534@gmail.com" className="dock-item" title="Email">
          <MailIcon />
        </a>
        <button onClick={toggleTheme} className="dock-item" title="Toggle Theme">
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </button>
      </motion.nav>
    </>
  );
}

export default App;

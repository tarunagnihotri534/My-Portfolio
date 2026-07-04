import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger already registered in App.jsx

/* ─── Individual skill pill ─── */
const SkillItem = ({ src, alt, label, isSvg = false }) => (
  <div className="skill-item">
    {isSvg ? (
      /* REST API globe icon */
      <svg
        className="rest-api-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4a90d9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9" />
      </svg>
    ) : (
      <img src={src} alt={alt} loading="lazy" />
    )}
    <span>{label}</span>
  </div>
);

/* ─── Skill data ─── */
const ROW_1 = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',            alt: 'HTML',          label: 'HTML' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',              alt: 'CSS',           label: 'CSS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',  alt: 'JavaScript',    label: 'JavaScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',  alt: 'TypeScript',    label: 'TypeScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind CSS', label: 'Tailwind CSS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',   alt: 'Vite',          label: 'Vite' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', alt: 'Framer Motion', label: 'Framer Motion' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',            alt: 'React',         label: 'React JS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',          alt: 'Next.js',       label: 'Next JS' },
];

const ROW_2 = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',          alt: 'Node JS',       label: 'Node JS' },
  { isSvg: true,                                                                                    alt: 'REST API',      label: 'REST API' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',        alt: 'MongoDB',       label: 'MongoDB' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',     alt: 'Redis',         label: 'Redis' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',          alt: 'Docker',        label: 'Docker' },
  { src: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg',                               alt: 'GSAP',          label: 'GSAP' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', alt: 'Firebase',    label: 'Firebase' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', alt: 'Supabase',    label: 'Supabase' },
];

export function SkillsSection() {
  const sectionRef    = useRef(null);
  const titleRef      = useRef(null);
  const row1Ref       = useRef(null);
  const row2Ref       = useRef(null);
  const multitaskRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Section title reveal */
      gsap.fromTo(
        titleRef.current,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      /* Marquee rows fade in with slight upward slide */
      gsap.fromTo(
        [row1Ref.current, row2Ref.current],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        }
      );

      // ── Multitasking icon — circus juggle: toss up, spin slightly, land ─
      const juggleTl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
      juggleTl
        // toss up with slight spin left
        .to(multitaskRef.current, {
          y: -30, rotation: -18, scale: 1.12,
          duration: 0.3, ease: 'power2.out',
        })
        // peak — hang a moment
        .to(multitaskRef.current, {
          y: -38, rotation: -22, scale: 1.15,
          duration: 0.18, ease: 'power1.out',
        })
        // spin right on the way down
        .to(multitaskRef.current, {
          y: -18, rotation: 10, scale: 1.08,
          duration: 0.18, ease: 'power1.in',
        })
        // land with bounce
        .to(multitaskRef.current, {
          y: 0, rotation: 0, scale: 1,
          duration: 0.45, ease: 'bounce.out',
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      id="skills-section"
      aria-label="Skills"
    >
      {/* Section title */}
      <h2 ref={titleRef} className="section-title skills-section-title">
        SKILLS
        <img
          ref={multitaskRef}
          src="/multitasking.png"
          alt=""
          aria-hidden="true"
          className="skills-multitask-img"
        />
      </h2>

      {/* ── Row 1 — scrolls left ── */}
      <div ref={row1Ref} className="skills-marquee-wrapper">
        <div className="skills-marquee" aria-hidden="true">
          <div className="skills-track">
            {/* Duplicate the set twice for seamless infinite scroll */}
            {[0, 1].map((copy) => (
              <React.Fragment key={copy}>
                {ROW_1.map((skill) => (
                  <SkillItem key={`r1-${copy}-${skill.label}`} {...skill} />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2 — scrolls right ── */}
      <div ref={row2Ref} className="skills-marquee-wrapper">
        <div className="skills-marquee" aria-hidden="true">
          <div className="skills-track skills-track-reverse">
            {[0, 1].map((copy) => (
              <React.Fragment key={copy}>
                {ROW_2.map((skill) => (
                  <SkillItem key={`r2-${copy}-${skill.label}`} {...skill} />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

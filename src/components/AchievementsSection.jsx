import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger already registered in App.jsx

const achievements = [
  {
    id: 1,
    title: 'HACK WITH UTTAR PRADESH 2025',
    subtitle: 'National Hackathon • 1st Runner-Up',
    description:
      'Secured 1st Runner-Up at Hack with Uttar Pradesh 2025, a national-level hackathon, by developing an innovative Blockchain & Web3 solution under intense time constraints. Collaborated with a multidisciplinary team to design, build, and present a production-ready prototype, earning recognition for technical execution, innovation, and real-world impact.',
    date: '2025',
    image: '/HACKERS.jpeg',
    isTopHighlight: true,
  },
  {
    id: 2,
    title: 'CU FlowJam 2025',
    subtitle: 'Winner • Technical Innovation Competition',
    description:
      'Won Second Position at CU FlowJam 2025, an intra-department technical competition organized by the School of Computer Science & Engineering, Chandigarh University. The challenge required participants to design and implement optimized algorithms by creating logical flowcharts using RAPTOR to solve real-world programming problems.',
    date: '2025',
    image: '/CUFLOWJAM.jpeg',
    isTopHighlight: false,
  },
  {
    id: 3,
    title: 'INNOVATE X',
    subtitle: 'Winner • Intra-Department Project Showcase',
    description:
      'Won 1st Place at INNOVATE X 2026, an intra-department technical project showcase organized by the School of Computer Science & Engineering, Chandigarh University. Presented an innovative technology-driven solution, demonstrating strong technical implementation, problem-solving, and presentation skills.',
    date: '2026',
    image: '/innovatex.jpg',
    isTopHighlight: false,
  },
];

export function AchievementsSection() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.achievement-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="section"
      id="achievements-section"
      ref={sectionRef}
      style={{ padding: '4rem 1.5rem' }}
    >
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{
          display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px',
          backgroundColor: '#111', color: '#fff', fontSize: '0.75rem', fontWeight: '700',
          fontFamily: 'Orbitron, sans-serif', textTransform: 'uppercase', marginBottom: '1rem',
        }}>
          HIGHLIGHTS
        </span>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: '900', letterSpacing: '-0.02em',
          marginBottom: '1rem', fontFamily: 'ClashDisplay, sans-serif', textTransform: 'uppercase',
        }}>
          ACHIEVEMENTS
        </h2>
        <p style={{ fontSize: '1.125rem', color: '#555770', maxWidth: '600px', margin: '0 auto' }}>
          Hackathons, awards, recognitions, and milestones that shaped the work.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="achievement-card"
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem',
              marginBottom: '3rem', padding: '2rem', borderRadius: '1.5rem',
              backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.06)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <div>
              <img
                src={achievement.image}
                alt={achievement.title}
                style={{
                  width: '100%', borderRadius: '1rem', aspectRatio: '4/3',
                  objectFit: 'cover', border: '1px solid rgba(0,0,0,0.06)',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                {achievement.isTopHighlight && (
                  <span style={{
                    color: '#E8846B', fontSize: '0.75rem', fontWeight: '700',
                    fontFamily: 'Orbitron, sans-serif', textTransform: 'uppercase',
                  }}>
                    ★ TOP HIGHLIGHT
                  </span>
                )}
                <span style={{
                  backgroundColor: '#111', color: '#fff', padding: '0.25rem 0.5rem',
                  borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700',
                  fontFamily: 'Orbitron, sans-serif',
                }}>
                  {achievement.date}
                </span>
              </div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '900',
                letterSpacing: '-0.02em', marginBottom: '0.5rem',
                fontFamily: 'ClashDisplay, sans-serif', fontStyle: 'italic',
              }}>
                {achievement.title}
              </h3>
              {achievement.subtitle && (
                <p style={{
                  fontSize: '1rem', color: '#111', fontWeight: '700',
                  marginBottom: '1rem', fontFamily: 'Orbitron, sans-serif',
                }}>
                  {achievement.subtitle}
                </p>
              )}
              <p style={{ fontSize: '1rem', color: '#555770', lineHeight: '1.7', marginBottom: '1rem' }}>
                {achievement.description}
              </p>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                color: '#111', fontSize: '0.875rem', fontWeight: '700',
                fontFamily: 'Orbitron, sans-serif', textDecoration: 'none',
              }}>
                Read more ⟩
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

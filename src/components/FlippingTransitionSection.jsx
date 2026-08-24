import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FlippingTransitionSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const nameBgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const front = frontRef.current;
    const back = backRef.current;
    const nameBg = nameBgRef.current;

    const ctx = gsap.context(() => {
      // Main scroll timeline for the flip effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      // Scale down the background name as we scroll
      tl.to(nameBg, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0);

      // Card starts tilted and scales up
      gsap.set(card, {
        transformPerspective: 1000,
        rotateY: -15,
        rotateX: 10,
        scale: 0.8,
      });

      // Card rotates and scales to fill screen
      tl.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, 0);

      // Front face fades out, back face fades in (flip effect)
      tl.to(front, {
        opacity: 0,
        rotateY: -180,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 0.3);

      tl.to(back, {
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 0.3);

      // Back face content animations
      tl.fromTo(
        back.querySelectorAll('.flip-content-item'),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        },
        0.8
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flipping-transition-section"
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* Background name that scales down */}
      <div
        ref={nameBgRef}
        className="flip-name-bg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(4rem, 15vw, 12rem)',
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.03)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        TARUN AGNIHOTRI
      </div>

      {/* Flipping background image overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at center, rgba(10, 10, 10, 0.6) 0%, rgba(10, 10, 10, 0.95) 100%), url('/Screenshot (3048).png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      />

      {/* 3D Card Container */}
      <div
        ref={cardRef}
        className="flip-card-container"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80%',
          maxWidth: '900px',
          height: '70vh',
          transform: 'translate(-50%, -50%)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Face - Initial State */}
        <div
          ref={frontRef}
          className="flip-card-front"
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            backgroundImage: `linear-gradient(180deg, rgba(15, 15, 30, 0.78) 0%, rgba(10, 10, 20, 0.94) 100%), url('/Screenshot (3048).png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              padding: '0.35rem 1rem',
              backgroundColor: 'rgba(99, 102, 241, 0.9)',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '9999px',
              marginBottom: '1.25rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
            }}
          >
            ★ Featured Autonomous AI Agent
          </span>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '1rem',
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            Jennie — AI Code Reviewer
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.85)',
              textAlign: 'center',
              maxWidth: '680px',
              lineHeight: 1.6,
            }}
          >
            Jennie is an autonomous, agentic AI code review tool built for modern engineering workflows. Unlike traditional static linters (ESLint, SonarQube).
          </p>
        </div>

        {/* Back Face - Revealed Content */}
        <div
          ref={backRef}
          className="flip-card-back"
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
            borderRadius: '20px',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            opacity: 0,
            rotateY: 180,
          }}
        >
          <div className="flip-content-item" style={{ textAlign: 'center' }}>
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '1.5rem',
              }}
            >
              Jennie Architecture & Workflow
            </h3>
          </div>

          <div className="flip-content-item" style={{ width: '100%', maxWidth: '560px' }}>
            <div
              style={{
                padding: '1.25rem',
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '12px',
                marginBottom: '1rem',
                border: '1px solid rgba(99, 102, 241, 0.25)',
              }}
            >
              <h4 style={{ color: '#fff', marginBottom: '0.4rem', fontSize: '1.15rem' }}>
                Agentic Code Reasoning
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Jennie is an autonomous, agentic AI code review tool built for modern engineering workflows. Unlike traditional static linters (ESLint, SonarQube).
              </p>
            </div>
          </div>

          <div className="flip-content-item" style={{ width: '100%', maxWidth: '560px' }}>
            <div
              style={{
                padding: '1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                marginBottom: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h4 style={{ color: '#fff', marginBottom: '0.4rem', fontSize: '1.15rem' }}>
                Multi-File Context & Deep Insights
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                Analyzes repository architecture, cross-file dependencies, and code health in real-time.
              </p>
            </div>
          </div>

          <div className="flip-content-item" style={{ textAlign: 'center' }}>
            <a
              href="https://github.com/tarunagnihotri534/Jennie"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.5rem',
                backgroundColor: 'var(--accent, #6366f1)',
                color: '#fff',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
            >
              Explore Jennie Repository →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

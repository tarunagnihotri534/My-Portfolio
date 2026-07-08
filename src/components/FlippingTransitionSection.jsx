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
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderRadius: '20px',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            Full Stack AI Developer
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            Building intelligent digital platforms with modern technologies
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
                marginBottom: '2rem',
              }}
            >
              What I Build
            </h3>
          </div>

          <div className="flip-content-item" style={{ width: '100%', maxWidth: '500px' }}>
            <div
              style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                marginBottom: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                AI-Powered Applications
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
                Intelligent systems that learn and adapt
              </p>
            </div>
          </div>

          <div className="flip-content-item" style={{ width: '100%', maxWidth: '500px' }}>
            <div
              style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                marginBottom: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                Scalable Web Platforms
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
                Production-ready applications from concept to deployment
              </p>
            </div>
          </div>

          <div className="flip-content-item" style={{ width: '100%', maxWidth: '500px' }}>
            <div
              style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h4 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                Real-Time Systems
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
                Live data processing and interactive experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

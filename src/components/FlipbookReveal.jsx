import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Define the project data type (for clarity)
const defaultProjects = [
  {
    image: '/Screenshot (3262).png',
    title: 'ClaimVertex',
    category: 'AI Insurance Platform',
    link: 'https://claim-pilot-orcin.vercel.app/',
  },
  {
    image: '/Screenshot (3048).png',
    title: 'Jennie',
    category: 'AI Agent / Code Review',
    link: 'https://github.com/tarunagnihotri534/Jennie',
  },
  {
    image: '/Screenshot (1920).png',
    title: 'CiviLedger',
    category: 'Web3',
    link: 'https://civic-ledger-new.vercel.app/',
  },
  {
    image: '/roadsense-thumb.png',
    title: 'RoadSense',
    category: 'Mobile AI',
    link: 'https://rsai.vercel.app/',
  },
];

export function FlipbookReveal({ projects = defaultProjects }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const stackRef = useRef(null);
  const cardConfigsRef = useRef([]); // Store initial random configs per index

  useEffect(() => {
    // Step 1: Generate & store random (but deterministic per index) configs for each card
    cardConfigsRef.current = projects.map((_, i) => ({
      rotation: (Math.random() * 30 - 15), // -15° to +15°
      xOffset: (Math.random() * 60 - 30), // -30px to +30px
      yOffset: 20, // Slight downward offset for entry
    }));

    const ctx = gsap.context(() => {
      // Step 2: Create the master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true, // Pin the section during animation
          start: 'top top',
          end: `+=${projects.length * 400}%`, // Each card gets ~400% scroll distance
          scrub: 1, // 1s smoothing for scrub
          invalidateOnRefresh: true,
        },
      });

      // Step 3: Add cards to timeline (one by one)
      projects.forEach((_, i) => {
        const card = cardsRef.current[i];
        const config = cardConfigsRef.current[i];
        if (!card) return;

        // First, set initial state for the card
        gsap.set(card, {
          opacity: 0,
          scale: 0.8,
          y: config.yOffset,
          x: config.xOffset,
          rotation: config.rotation,
          zIndex: projects.length - i, // Reverse z-index for stacking
        });

        // Animate the card in (from stack state)
        tl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          i * 0.6 // Each card's animation starts 0.6s after previous
        );
      });

      // Step 4: Final resting layout (grid) animation
      // After all cards are stacked, animate them into grid
      tl.addLabel('final-layout', '+=0.5');
      projects.forEach((_, i) => {
        const card = cardsRef.current[i];
        if (!card) return;

        tl.to(
          card,
          {
            rotation: 0,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'power3.inOut',
          },
          'final-layout'
        );
      });
    }, sectionRef);

    // Step 5: Refresh ScrollTrigger after all images are loaded
    const images = cardsRef.current.map((card) => card.querySelector('img'));
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        ScrollTrigger.refresh();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener('load', checkAllLoaded);
      }
    });

    // Step 6: Cleanup on unmount
    return () => {
      ctx.revert();
      images.forEach((img) => img.removeEventListener('load', checkAllLoaded));
    };
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      className="flipbook-section"
      style={{
        position: 'relative',
        width: '100%',
        padding: '8rem 1rem',
      }}
    >
      <div
        ref={stackRef}
        className="flipbook-stack"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          height: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="flipbook-card"
            style={{
              position: 'absolute',
              width: '320px',
              aspectRatio: '16/10',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow:
                '0 10px 40px rgba(0, 0, 0, 0.15), 0 3px 10px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.25rem',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                color: '#fff',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
                {project.title}
              </h3>
              <p
                style={{
                  margin: '0.25rem 0 0 0',
                  fontSize: '0.875rem',
                  opacity: 0.8,
                }}
              >
                {project.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

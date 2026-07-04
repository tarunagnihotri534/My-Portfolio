/**
 * SkillCards — sticky scroll-stack
 *
 * Three cards (Frontend, Backend, UI/UX) sit inside a tall scroll
 * container.  Each card is position:sticky so it pins at the top of
 * the viewport while the user scrolls through its allocated "slot".
 * As the next card scrolls up it overlaps the previous one — exactly
 * the stacked effect from the reference screenshots.
 *
 * GSAP animation per card (ScrollTrigger, scrub:false, once only):
 *   • Card enters: y 80→0, opacity 0→1, scale 0.92→1, ease power3.out
 *   • Image: same entrance with 0.12 s stagger
 *
 * No parallax scrub — clean one-time reveal as each card enters.
 * Cleanup: gsap.context().revert() on unmount.
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger registered globally in App.jsx

const CARDS = [
  {
    id:       'frontend',
    label:    'Frontend Development',
    lines:    ['FRONTEND', 'DEVELOPMENT'],
    img:      '/frontend.jpg',
    imgAlt:   'Frontend development illustration',
    bgClass:  'skill-card--coral',   // #F0705C
  },
  {
    id:       'backend',
    label:    'Backend Development',
    lines:    ['BACKEND', 'DEVELOPMENT'],
    img:      '/backend.jpg',
    imgAlt:   'Backend development illustration',
    bgClass:  'skill-card--yellow',  // #E8E07A
  },
  {
    id:       'uiux',
    label:    'UI/UX Design',
    lines:    ['UI/UX', 'DESIGN'],
    img:      '/ui.jpg',
    imgAlt:   'UI/UX design illustration',
    bgClass:  'skill-card--teal',    // #8EC4BF
  },
  {
    id:       'auth',
    label:    'Authentications',
    lines:    ['AUTHENTICATIONS'],
    img:      '/authentications.jpg',
    imgAlt:   'Authentication illustration',
    bgClass:  'skill-card--green',   // #6BBF8E
  },
  {
    id:       'animations',
    label:    'Animations',
    lines:    ['ANIMATIONS'],
    img:      '/animations.jpg',
    imgAlt:   'Animations illustration',
    bgClass:  'skill-card--purple',  // #9B8EC4
  },
  {
    id:       'sysdesign',
    label:    'System Design Architecture',
    lines:    ['SYSTEM DESIGN', 'ARCHITECTURE'],
    img:      '/syetemDesign-removebg-preview.png',
    imgAlt:   'System design architecture illustration',
    bgClass:  'skill-card--orange',  // #E8A87C
  },
];

export function SkillCards() {
  const wrapperRef = useRef(null);
  const cardRefs   = useRef([]);   // array of { card, img }
  cardRefs.current = [];           // reset on each render

  function addCardRef(el, idx, type) {
    if (!cardRefs.current[idx]) cardRefs.current[idx] = {};
    cardRefs.current[idx][type] = el;
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach(({ card, img }, idx) => {
        if (!card) return;

        // ── Initial state ────────────────────────────────────────────────
        // First card starts visible (no entrance — it's the first thing seen)
        if (idx === 0) {
          gsap.set(card, { opacity: 1, scale: 1, y: 0 });
          gsap.set(img,  { opacity: 1, scale: 1, y: 0 });
          return;
        }

        gsap.set(card, { y: 60, opacity: 0, scale: 0.96 });
        gsap.set(img,  { y: 40, opacity: 0, scale: 0.96 });

        // ── Entrance timeline ────────────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start:   'top 90%',
            toggleActions: 'play none none none',
          },
          defaults: { ease: 'power3.out' },
        });

        tl.to(card, { y: 0, opacity: 1, scale: 1, duration: 0.6 });
        tl.to(img,  { y: 0, opacity: 1, scale: 1, duration: 0.55 }, '-=0.45');
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="skill-cards-stack">
      {CARDS.map((card, idx) => (
        <section
          key={card.id}
          className="skill-card-section"
          aria-label={card.label}
          style={{ '--stack-index': idx }}
        >
          <div
            ref={(el) => addCardRef(el, idx, 'card')}
            className={`skill-card ${card.bgClass}`}
          >

            {/* ── Left: heading ── */}
            <div className="skill-card-text">
              <h2 className="skill-card-heading">
                {card.lines.map((line) => (
                  <span key={line} className="skill-card-line">{line}</span>
                ))}
              </h2>
            </div>

            {/* ── Right: image ── */}
            <div
              ref={(el) => addCardRef(el, idx, 'img')}
              className="skill-card-img-wrap"
            >
              <img
                src={card.img}
                alt={card.imgAlt}
                className="skill-card-img"
                width="480"
                height="480"
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>
        </section>
      ))}
    </div>
  );
}

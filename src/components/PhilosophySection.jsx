import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger already registered in App.jsx

const PHILOSOPHY_TEXT =
  'I build intelligent, production ready systems where clean engineering meets considered design, and ship work that drives measurable impact.';

// Words that receive the coral accent when fully revealed
// idx:  0=I 1=build 2=intelligent, 3=production 4=ready 5=systems
//       6=where 7=clean 8=engineering 9=meets 10=considered
//       11=design, 12=and 13=ship 14=work 15=that 16=drives
//       17=measurable 18=impact.
const ACCENT_INDICES = new Set([2, 5, 8, 18]);

export function PhilosophySection() {
  const sectionRef = useRef(null);
  const innerRef   = useRef(null);
  const eyebrowRef = useRef(null);
  const wordsRef   = useRef([]);

  const words = PHILOSOPHY_TEXT.split(' ');

  useEffect(() => {
    // Wait one frame so DOM is painted before measuring
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const section = sectionRef.current;
        const inner   = innerRef.current;

        // ── 1. Pin the section while the scrub plays ──────────────────────
        // pinSpacing: true adds padding-bottom equal to the pin duration so
        // the next section doesn't jump up. The section stays fixed in the
        // viewport until the last word lights up, then page continues.
        const pinST = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${window.innerHeight * 1.5}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // ── 2. Eyebrow pill pops in at pin start ─────────────────────────
        gsap.fromTo(
          eyebrowRef.current,
          { y: -16, opacity: 0, scale: 0.88 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );

        // ── 3. Master timeline scrubbed over the pin distance ─────────────
        // Each word gets an equal slice of the total progress (0→1).
        // Words start as faded ghosts and colour in one by one.
        const totalWords = wordsRef.current.filter(Boolean).length;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${window.innerHeight * 1.5}`,
            scrub: 1.2,
          },
        });

        wordsRef.current.forEach((word, i) => {
          if (!word) return;
          const isAccent   = ACCENT_INDICES.has(i);
          const startPct   = i / totalWords;
          const endPct     = (i + 1) / totalWords;

          // Each word occupies its own slice of the timeline
          tl.fromTo(
            word,
            { color: 'rgba(20,20,20,0.1)' },
            {
              color: isAccent ? '#E8846B' : 'var(--text-primary)',
              ease: 'none',
              duration: endPct - startPct,
            },
            startPct   // position in the timeline (0–1 normalised)
          );
        });

      }, sectionRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="philosophy-section"
      id="philosophy-section"
      aria-label="Philosophy"
    >
      <div ref={innerRef} className="philosophy-inner">

        {/* Eyebrow pill */}
        <span ref={eyebrowRef} className="philosophy-eyebrow">
          <span className="philosophy-eyebrow-sparkle" aria-hidden="true">✦</span>
          Philosophy
        </span>

        {/* Giant scrubbed heading — Orbitron, italic, word-by-word reveal */}
        <h2 className="philosophy-heading" aria-label={PHILOSOPHY_TEXT}>
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="philosophy-word"
              aria-hidden="true"
            >
              {word}{' '}
            </span>
          ))}
        </h2>

      </div>
    </section>
  );
}

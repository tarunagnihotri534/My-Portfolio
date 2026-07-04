/**
 * SiteFooter
 *
 * Black rounded footer matching reference layout:
 * ┌─────────────────────────────────────────────────────┐
 * │  ● OPEN TO OPPORTUNITIES          BACK TO TOP ●     │
 * │  HAVE A PROJECT OR A ROLE IN MIND?                  │
 * │  [ LET'S GET IN TOUCH → ]                           │
 * │                                                     │
 * │           TARUN AGNIHOTRI                           │
 * │                                                     │
 * │  EXPLORE        CONNECT         SAY HELLO           │
 * │  Home           GitHub          tarunagnihotri534@  │
 * │  Projects       LinkedIn        gmail.com           │
 * │  Achievements   Email                               │
 * │  Contact                                            │
 * │                                                     │
 * │  ●                                              ●   │
 * │              © TARUN AGNIHOTRI                      │
 * └─────────────────────────────────────────────────────┘
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SiteFooter() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  function scrollToTop() {
    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', { detail: { el: document.body } })
    );
  }

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
      window.dispatchEvent(
        new CustomEvent('lenis-scroll-to', { detail: { el } })
      );
    }
  }

  return (
    <footer ref={footerRef} className="sf-footer" id="contact" aria-label="Site footer">

      {/* ── Top bar ── */}
      <div className="sf-topbar">
        <span className="sf-badge">
          <span className="sf-badge-dot" aria-hidden="true" />
          Open to Opportunities
        </span>
        <button className="sf-back-top" onClick={scrollToTop} aria-label="Back to top">
          Back to Top
          <span className="sf-badge-dot sf-badge-dot--right" aria-hidden="true" />
        </button>
      </div>

      {/* ── Headline + CTA ── */}
      <div className="sf-headline-wrap">
        <h2 className="sf-headline">Have a project or a role in mind?</h2>
        <a
          href="mailto:tarunagnihotri534@gmail.com"
          className="sf-cta-btn"
          aria-label="Send email to get in touch"
        >
          Let's Get In Touch →
        </a>
      </div>

      {/* ── Big name ── */}
      <div className="sf-name-wrap" aria-hidden="true">
        <span className="sf-name">TARUN AGNIHOTRI</span>
      </div>

      {/* ── Link columns ── */}
      <div className="sf-columns">

        <div className="sf-col">
          <p className="sf-col-title">Explore</p>
          <nav aria-label="Footer explore navigation">
            <ul className="sf-col-list">
              <li><button onClick={() => scrollTo('home')}         className="sf-link">Home</button></li>
              <li><button onClick={() => scrollTo('projects')}     className="sf-link">Projects</button></li>
              <li><button onClick={() => scrollTo('achievements')} className="sf-link">Achievements</button></li>
              <li><button onClick={() => scrollTo('contact')}      className="sf-link">Contact</button></li>
            </ul>
          </nav>
        </div>

        <div className="sf-col">
          <p className="sf-col-title">Connect</p>
          <ul className="sf-col-list">
            <li>
              <a href="https://github.com/tarunagnihotri534" target="_blank" rel="noreferrer" className="sf-link">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/tarun-agnihotri69/" target="_blank" rel="noreferrer" className="sf-link">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:tarunagnihotri534@gmail.com" className="sf-link">
                Email
              </a>
            </li>
          </ul>
        </div>

        <div className="sf-col">
          <p className="sf-col-title">Say Hello</p>
          <ul className="sf-col-list">
            <li>
              <a href="mailto:tarunagnihotri534@gmail.com" className="sf-link sf-link--email">
                tarunagnihotri534@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="sf-bottombar">
        <span className="sf-globe" aria-hidden="true">🌐</span>
        <p className="sf-copyright">© Tarun Agnihotri</p>
        <span className="sf-globe" aria-hidden="true">🌐</span>
      </div>

    </footer>
  );
}

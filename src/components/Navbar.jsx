import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'Home',         num: '01', id: 'home' },
  { label: 'About',        num: '02', id: 'about-section' },
  { label: 'Projects',     num: '03', id: 'projects-section' },
  { label: 'Achievements', num: '04', id: 'achievements-section' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const overlayRef = useRef(null);
  const listRef    = useRef(null);
  const footerRef  = useRef(null);
  const tlRef      = useRef(null);

  /* ── build overlay timeline once ── */
  useEffect(() => {
    const overlay   = overlayRef.current;
    const listItems = listRef.current
      ? Array.from(listRef.current.querySelectorAll('.nav-menu-item'))
      : [];
    const footer = footerRef.current;

    gsap.set(overlay,   { clipPath: 'inset(0 0 100% 0)' });
    gsap.set(listItems, { y: 60, opacity: 0 });
    gsap.set(footer,    { y: 24, opacity: 0 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });
    tl.to(overlay,   { clipPath: 'inset(0 0 0% 0)', duration: 0.65 }, 0);
    tl.to(listItems, { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out' }, 0.3);
    tl.to(footer,    { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 0.55);

    tlRef.current = tl;
    return () => tl.kill();
  }, []);

  /* ── toggle ── */
  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = 'hidden';
        tlRef.current?.play();
      } else {
        document.body.style.overflow = '';
        tlRef.current?.reverse();
      }
      return next;
    });
  }, []);

  /* ── escape key ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) toggle(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, toggle]);

  /* ── scroll via Lenis ── */
  const scrollTo = useCallback((id) => {
    toggle();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { el } }));
    }, 550);
  }, [toggle]);

  return (
    <>
      {/* ── Fixed top bar ── */}
      <header className="site-navbar" role="banner">
        {/* Menu button — only element in the bar now */}
        <div className="site-navbar-right">
          <button
            className={`site-navbar-menu-btn${isOpen ? ' is-open' : ''}`}
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="nav-menu-overlay"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="site-navbar-menu-label">{isOpen ? 'CLOSE' : 'MENU'}</span>
            <span className="site-navbar-menu-icon" aria-hidden="true">
              <span /><span />
            </span>
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay ── */}
      <div
        ref={overlayRef}
        className="nav-menu-overlay"
        id="nav-menu-overlay"
        role="navigation"
        aria-label="Site navigation"
        aria-hidden={!isOpen}
      >
        <div className="nav-menu-inner">
          <ul ref={listRef} className="nav-menu-list" role="list">
            {NAV_LINKS.map(({ label, num, id }) => (
              <li key={id} className="nav-menu-item" role="listitem">
                <span className="nav-menu-link-num" aria-hidden="true">{num}</span>
                <button
                  className="nav-menu-link"
                  onClick={() => scrollTo(id)}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {label}
                  <span className="nav-menu-arrow" aria-hidden="true">↗</span>
                </button>
              </li>
            ))}
          </ul>

          <footer ref={footerRef} className="nav-menu-footer">
            <div className="nav-menu-footer-col">
              <span className="nav-menu-footer-label">Socials</span>
              <div className="nav-menu-footer-links">
                <a href="https://github.com/tarunagnihotri534" target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1}>GitHub</a>
                <a href="https://www.linkedin.com/in/tarun-agnihotri69/" target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1}>LinkedIn</a>
              </div>
            </div>
            <div className="nav-menu-footer-col nav-menu-footer-col--center">
              <div className="nav-menu-status-pill">
                <span className="nav-menu-status-dot">●</span>
                Available for work
              </div>
            </div>
            <div className="nav-menu-footer-col nav-menu-footer-col--right">
              <span className="nav-menu-footer-label">Email</span>
              <a href="mailto:tarunagnihotri534@gmail.com" className="nav-menu-email" tabIndex={isOpen ? 0 : -1}>
                tarunagnihotri534@gmail.com
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

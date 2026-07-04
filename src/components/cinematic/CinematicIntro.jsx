import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CinematicIntro.css';

const INTRO_TIMEOUT_MS = 12000; // Max duration before force-skip
const VIDEO_SRC = '/landingg.mp4';
const VIDEO_FALLBACK = '/portfolio-start.mp4';
const LINES_Y = [20, 35, 50, 65, 80];

/**
 * CinematicIntro
 *
 * Plays landingg.mp4 fullscreen.
 * "NPM RUN DEV" types word-by-word as the video fades in.
 * After ~5s the intro slides up and reveals the portfolio.
 */
export function CinematicIntro({ onComplete }) {
  const wrapRef      = useRef(null);
  const videoRef     = useRef(null);
  const npmRef       = useRef(null);
  const promptRef    = useRef(null);
  const cursorRef    = useRef(null);
  const cornersRef   = useRef(null);
  const linesRef     = useRef(null);
  const progressRef  = useRef(null);
  const skipBtnRef   = useRef(null);

  const completedRef = useRef(false);
  const tlRef        = useRef(null);

  const [started, setStarted] = useState(false);

  /* ── Utility: call onComplete exactly once ── */
  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    document.body.style.overflow = '';
    onComplete?.();
  }, [onComplete]);

  /* ── Skip button / keyboard handler ── */
  const skip = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.progress(1, false);
    } else {
      finish();
    }
  }, [finish]);

  /* ── Reduced-motion / safety timeout ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(finish, INTRO_TIMEOUT_MS);

    const onKey = (e) => {
      if (['Enter', ' ', 'Escape', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [finish, skip]);

  /* ── Start video, fall back to portfolio-start.mp4 if missing ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onError = () => {
      if (video.src !== window.location.origin + VIDEO_FALLBACK) {
        video.src = VIDEO_FALLBACK;
        video.load();
        video.play().catch(() => {});
      }
    };

    video.addEventListener('error', onError);
    video.play().catch(() => {});

    // Start the GSAP timeline after a short delay regardless of video state
    const timer = setTimeout(() => setStarted(true), 400);
    return () => {
      video.removeEventListener('error', onError);
      clearTimeout(timer);
    };
  }, []);

  /* ── Main GSAP timeline — fires once started ── */
  useEffect(() => {
    if (!started) return;

    const allLetters = npmRef.current?.querySelectorAll('.cinematic-letter') ?? [];
    const lines    = linesRef.current?.querySelectorAll('.cinematic-line') ?? [];
    const corners  = cornersRef.current?.children ?? [];

    const tl = gsap.timeline({ onComplete: finish });
    tlRef.current = tl;

    /* 0.0s — video fades in */
    gsap.set(videoRef.current, { opacity: 0 });
    tl.to(videoRef.current, { opacity: 1, duration: 1.4, ease: 'power2.inOut' }, 0);

    /* 0.3s — scan lines grow */
    tl.fromTo(
      lines,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.4, stagger: 0.06, ease: 'power3.inOut' },
      0.3
    );

    /* 0.6s — corner labels */
    tl.fromTo(
      corners,
      { opacity: 0, y: -8 },
      { opacity: 0.7, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' },
      0.6
    );

    /* 1.0s — prompt "❯ terminal" */
    tl.to(promptRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.0);

    /* make container visible */
    tl.set(npmRef.current, { opacity: 1 }, 1.4);

    /* 1.5s — type all letters sequentially (n p m  r u n  d e v) */
    tl.fromTo(
      allLetters,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.12, stagger: 0.08, ease: 'power2.out' },
      1.5
    );

    /* 3.0s — cursor blinks in after all letters are typed */
    tl.to(cursorRef.current, { opacity: 1, duration: 0.2 }, 3.0);

    /* 1.5s — progress bar fills across 4s (synced with words) */
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 4.0, ease: 'none' },
      1.5
    );

    /* 2.0s — skip button appears */
    tl.to(skipBtnRef.current, { opacity: 1, duration: 0.4 }, 2.0);

    /* 4.5s — all text fades up & out */
    tl.to(
      [promptRef.current, npmRef.current, cursorRef.current, skipBtnRef.current],
      { opacity: 0, y: -24, duration: 0.55, ease: 'power2.in' },
      4.5
    );

    /* 4.8s — corners & lines fade */
    tl.to([cornersRef.current, linesRef.current], { opacity: 0, duration: 0.4 }, 4.8);

    /* 5.1s — whole intro slides up off-screen → portfolio revealed */
    tl.to(wrapRef.current, { yPercent: -100, duration: 0.9, ease: 'power3.inOut' }, 5.1);

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [started, finish]);

  // Helper function to split a word into letter spans
  const splitWord = (word) => {
    return word.split('').map((char, i) => (
      <span key={i} className="cinematic-letter">{char}</span>
    ));
  };

  return (
    <div
      className="cinematic-intro"
      ref={wrapRef}
      id="landing-section"
      aria-label="Portfolio intro"
    >
      {/* Video — landingg.mp4 with cinematic filter */}
      <video
        ref={videoRef}
        className="cinematic-video"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />

      {/* Overlays */}
      <div className="cinematic-overlay" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* Scan lines */}
      <div className="cinematic-lines" ref={linesRef} aria-hidden="true">
        {LINES_Y.map((top) => (
          <div key={top} className="cinematic-line" style={{ top: `${top}%` }} />
        ))}
      </div>

      {/* Corner labels */}
      <header className="cinematic-corners" ref={cornersRef}>
        <span className="cinematic-corner cinematic-corner--tl">Tarun Kumar Agnihotri</span>
        <span className="cinematic-corner cinematic-corner--tr">Portfolio © 2026</span>
      </header>

      {/* Center — NPM RUN DEV */}
      <div className="cinematic-center">
        <div className="cinematic-terminal">

          {/* Prompt line above */}
          <p ref={promptRef} className="cinematic-prompt" style={{ opacity: 0, transform: 'translateY(6px)' }}>
            ❯ terminal
          </p>

          {/* Big typing text */}
          <div ref={npmRef} className="cinematic-npm-text" aria-label="npm run dev" style={{ opacity: 0 }}>
            <span className="cinematic-npm-word cinematic-npm-word--npm">{splitWord('npm')}</span>
            <span className="cinematic-npm-word cinematic-npm-word--run">{splitWord('run')}</span>
            <span className="cinematic-npm-word cinematic-npm-word--dev">
              {splitWord('dev')}
              <span ref={cursorRef} className="cinematic-cursor" aria-hidden="true" />
            </span>
          </div>

        </div>
      </div>



      {/* Skip button */}
      <button
        ref={skipBtnRef}
        className="cinematic-skip"
        onClick={skip}
        aria-label="Skip intro"
        style={{ opacity: 0 }}
      >
        Skip ↵
      </button>
    </div>
  );
}

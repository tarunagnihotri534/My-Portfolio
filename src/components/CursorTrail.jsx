/**
 * CursorTrail
 *
 * Creates a chain of N square thumbnail tiles that follow the cursor
 * with staggered delay. When cursor stops moving they scale + fade out.
 * Pauses automatically when cursor enters the form, resumes on leave.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Project thumbnails — Screenshot (1920).png included directly
const THUMBS = [
  '/project-thumb.png',
  '/Screenshot (3048).png',
  '/Screenshot (1920).png',
  '/roadsense-thumb.png',
  '/project-thumb.png',
  '/Screenshot (3048).png',
  '/Screenshot (1920).png',
  '/roadsense-thumb.png',
];

const TILE_COUNT = 8;

export function CursorTrail() {
  const tilesRef   = useRef([]);
  const posHistory = useRef([]);
  const idleTimer  = useRef(null);
  const activeRef  = useRef(false);
  const pausedRef  = useRef(false); // true while cursor is over the form

  useEffect(() => {
    const container = document.createElement('div');
    container.className = 'ct-container';
    document.body.appendChild(container);

    tilesRef.current = Array.from({ length: TILE_COUNT }, (_, i) => {
      const tile = document.createElement('div');
      tile.className = 'ct-tile';

      const img = document.createElement('img');
      img.src = THUMBS[i % THUMBS.length];
      img.alt = '';
      img.draggable = false;
      tile.appendChild(img);

      container.appendChild(tile);
      gsap.set(tile, { opacity: 0, scale: 0, xPercent: -50, yPercent: -50 });
      return tile;
    });

    let frameId = null;
    const mousePos = { x: 0, y: 0 };

    function hideAll() {
      clearTimeout(idleTimer.current);
      activeRef.current = false;
      tilesRef.current.forEach((tile, i) => {
        gsap.to(tile, {
          opacity: 0, scale: 0,
          duration: 0.3, delay: i * 0.025, ease: 'power3.in',
          overwrite: true,
        });
      });
      posHistory.current = [];
    }

    function showAll() {
      if (pausedRef.current) return;
      activeRef.current = true;
      tilesRef.current.forEach((tile, i) => {
        gsap.to(tile, {
          opacity: 1, scale: 1,
          duration: 0.25, delay: i * 0.025, ease: 'back.out(1.5)',
          overwrite: true,
        });
      });
    }

    function onMove(e) {
      if (pausedRef.current) return;

      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (!activeRef.current) showAll();

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(hideAll, 600);

      if (!frameId) frameId = requestAnimationFrame(tick);
    }

    function tick() {
      frameId = null;
      if (pausedRef.current) return;

      posHistory.current.unshift({ x: mousePos.x, y: mousePos.y });
      if (posHistory.current.length > TILE_COUNT * 4) {
        posHistory.current.length = TILE_COUNT * 4;
      }

      tilesRef.current.forEach((tile, i) => {
        const idx = Math.min(Math.floor(i * 6), posHistory.current.length - 1);
        const pos = posHistory.current[idx] ?? posHistory.current[0];
        if (!pos) return;
        gsap.set(tile, {
          x: pos.x,
          y: pos.y,
          scale: gsap.getProperty(tile, 'opacity') > 0 ? 1 - i * 0.06 : 0,
        });
      });

      if (activeRef.current && !pausedRef.current) {
        frameId = requestAnimationFrame(tick);
      }
    }

    // ── Form pause / resume ──────────────────────────────────────────────
    // Target the cp-form — it exists in the DOM once ContactPage mounts
    function onFormEnter() {
      pausedRef.current = true;
      hideAll();
    }

    function onFormLeave() {
      pausedRef.current = false;
      // Don't show immediately — wait for first mouse move outside
    }

    // Poll for form element (mounts slightly after CursorTrail)
    let formEl = null;
    const formPollId = setInterval(() => {
      const found = document.querySelector('.cp-form');
      if (found && found !== formEl) {
        if (formEl) {
          formEl.removeEventListener('mouseenter', onFormEnter);
          formEl.removeEventListener('mouseleave', onFormLeave);
        }
        formEl = found;
        formEl.addEventListener('mouseenter', onFormEnter);
        formEl.addEventListener('mouseleave', onFormLeave);
        clearInterval(formPollId);
      }
    }, 100);

    document.addEventListener('mousemove', onMove);

    return () => {
      document.removeEventListener('mousemove', onMove);
      clearTimeout(idleTimer.current);
      clearInterval(formPollId);
      if (frameId) cancelAnimationFrame(frameId);
      if (formEl) {
        formEl.removeEventListener('mouseenter', onFormEnter);
        formEl.removeEventListener('mouseleave', onFormLeave);
      }
      container.remove();
    };
  }, []);

  return null;
}

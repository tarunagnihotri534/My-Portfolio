/**
 * BubbleCanvas
 *
 * Renders small translucent bubbles rising from the bottom of the page
 * to the top using a <canvas> element. Bubbles are clipped to the parent
 * container (position:absolute, inset:0, pointer-events:none).
 *
 * GSAP ticker drives the animation loop — cleans up on unmount.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BUBBLE_COUNT = 28;
const COLORS = [
  'rgba(140,196,191,0.35)',  // teal
  'rgba(248,112,96,0.25)',   // coral
  'rgba(255,255,255,0.22)',  // white
  'rgba(200,180,255,0.28)',  // soft purple
  'rgba(255,220,150,0.22)',  // warm yellow
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createBubble(canvasWidth, canvasHeight) {
  return {
    x:       randomBetween(0, canvasWidth),
    y:       canvasHeight + randomBetween(10, 80),  // start below viewport
    r:       randomBetween(4, 14),                  // radius 4–14px
    speed:   randomBetween(0.4, 1.2),               // px per frame
    drift:   randomBetween(-0.3, 0.3),              // horizontal sway
    opacity: randomBetween(0.3, 0.85),
    color:   COLORS[Math.floor(Math.random() * COLORS.length)],
    phase:   randomBetween(0, Math.PI * 2),         // sway phase offset
  };
}

export function BubbleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let bubbles = [];
    let frameCount = 0;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      bubbles = Array.from({ length: BUBBLE_COUNT }, () =>
        createBubble(canvas.width, canvas.height)
      );
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // GSAP ticker — runs every frame, GPU-synced
    function onTick() {
      if (!canvas.width || !canvas.height) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      bubbles.forEach((b, i) => {
        // Rise upward
        b.y -= b.speed;

        // Gentle horizontal sway
        b.x += Math.sin(frameCount * 0.018 + b.phase) * 0.45;

        // Reset when bubble exits top
        if (b.y + b.r < 0) {
          const fresh = createBubble(canvas.width, canvas.height);
          fresh.y = canvas.height + b.r + randomBetween(0, 60);
          bubbles[i] = fresh;
          return;
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // Glossy inner highlight
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${b.opacity * 0.5})`;
        ctx.fill();

        // Subtle border ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${b.opacity * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    }

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cp-bubbles"
      aria-hidden="true"
    />
  );
}

/**
 * bgCanvas.js — Ambient Background Particle System
 * Draws soft floating sparkles on a canvas for depth and atmosphere
 */

'use strict';

const BgCanvas = (() => {

  let canvas, ctx;
  let particles = [];
  let animId = null;
  let W, H;

  const PARTICLE_COUNT = 55;
  const COLORS = [
    'rgba(255,217,61,',
    'rgba(255,77,125,',
    'rgba(108,99,255,',
    'rgba(0,217,192,',
    'rgba(255,140,66,',
    'rgba(255,255,255,',
  ];

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x     = Math.random() * W;
      this.y     = init ? Math.random() * H : H + 20;
      this.size  = Math.random() * 3.5 + 0.8;
      this.speed = Math.random() * 0.4 + 0.15;
      this.opacity = Math.random() * 0.55 + 0.15;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = (Math.random() - 0.5) * 0.025;
      this.wobbleAmp   = Math.random() * 1.2 + 0.3;
      this.twinkleSpeed = Math.random() * 0.03 + 0.01;
      this.twinklePhase = Math.random() * Math.PI * 2;

      // Random shape: circle or cross/star
      this.shape = Math.random() > 0.8 ? 'star' : 'circle';
    }

    update() {
      this.y -= this.speed;
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * this.wobbleAmp;
      this.twinklePhase += this.twinkleSpeed;

      if (this.y < -20) this.reset();
    }

    draw() {
      const alpha = this.opacity * (0.6 + 0.4 * Math.sin(this.twinklePhase));
      ctx.fillStyle = `${this.color}${alpha.toFixed(2)})`;
      ctx.strokeStyle = `${this.color}${(alpha * 0.5).toFixed(2)})`;

      if (this.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Small 4-point star
        const s = this.size;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.wobble);
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          const outerX = Math.cos(angle) * s;
          const outerY = Math.sin(angle) * s;
          const innerX = Math.cos(angle + Math.PI / 4) * (s * 0.4);
          const innerY = Math.sin(angle + Math.PI / 4) * (s * 0.4);
          if (i === 0) ctx.moveTo(outerX, outerY);
          else ctx.lineTo(outerX, outerY);
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Seed particles at random positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    loop();
  }

  function destroy() {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
    particles = [];
  }

  return { init, destroy };

})();

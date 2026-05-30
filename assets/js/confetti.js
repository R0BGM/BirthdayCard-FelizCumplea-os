/**
 * confetti.js — Birthday Confetti System
 * Generates cascading confetti pieces with randomized shapes, colors & timing
 */

'use strict';

const ConfettiEngine = (() => {

  const COLORS = [
    '#FF4D7D', '#FFD93D', '#6C63FF', '#00D9C0',
    '#FF8C42', '#FF6B6B', '#A8FF78', '#FFFFFF',
    '#FFC3E1', '#B5EEFF', '#FFE066', '#CF9FFF'
  ];

  const SHAPES = ['rectangle', 'circle', 'triangle', 'star'];

  let layer = null;
  let pieces = [];
  let running = false;
  let burstCount = 0;

  function init() {
    layer = document.getElementById('confettiLayer');
  }

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Spawn a single confetti piece
   */
  function spawnPiece(opts = {}) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';

    const color    = opts.color   || randomItem(COLORS);
    const shape    = opts.shape   || randomItem(SHAPES);
    const size     = opts.size    || randomBetween(7, 16);
    const left     = opts.left    != null ? opts.left : randomBetween(0, 100);
    const duration = opts.duration || randomBetween(2.4, 4.2);
    const delay    = opts.delay   != null ? opts.delay : randomBetween(0, 0.8);

    el.setAttribute('data-shape', shape);
    el.style.cssText = `
      --color:    ${color};
      --size:     ${size}px;
      --left:     ${left}%;
      --duration: ${duration}s;
      --delay:    ${delay}s;
      --radius:   ${shape === 'rectangle' ? '2px' : shape === 'circle' ? '50%' : '2px'};
    `;

    layer.appendChild(el);
    pieces.push(el);

    // Clean up after animation ends
    const totalMs = (duration + delay) * 1000 + 200;
    setTimeout(() => {
      el.remove();
      const idx = pieces.indexOf(el);
      if (idx > -1) pieces.splice(idx, 1);
    }, totalMs);
  }

  /**
   * Fire a burst of confetti (concentrated near center)
   */
  function burst(count = 80, centerX = null) {
    if (!layer) init();
    burstCount++;

    const cx = centerX != null ? centerX : 50;

    for (let i = 0; i < count; i++) {
      const spread = randomBetween(20, 55);
      const left   = cx + randomBetween(-spread, spread);

      spawnPiece({
        left:     Math.max(2, Math.min(98, left)),
        delay:    randomBetween(0, 0.6),
        duration: randomBetween(2.2, 4.5),
        size:     randomBetween(8, 18),
      });
    }
  }

  /**
   * Continuous confetti rain (called in waves)
   */
  function startRain(duration = 8000, intensity = 12) {
    if (!layer) init();
    running = true;

    const startTime = Date.now();

    function wave() {
      if (!running || Date.now() - startTime > duration) {
        running = false;
        return;
      }
      for (let i = 0; i < intensity; i++) {
        spawnPiece({ delay: randomBetween(0, 0.3) });
      }
      // Next wave in 180–280ms
      setTimeout(wave, randomBetween(160, 280));
    }

    wave();
  }

  function stopRain() {
    running = false;
  }

  function clearAll() {
    running = false;
    pieces.forEach(p => p.remove());
    pieces = [];
  }

  return { init, burst, startRain, stopRain, clearAll };

})();

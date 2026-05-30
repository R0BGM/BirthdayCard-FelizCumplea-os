/**
 * balloons.js — Birthday Balloon System
 * Generates rising balloons with string trails and randomized properties
 */

'use strict';

const BalloonEngine = (() => {

  const BALLOON_COLORS = [
    { body: '#FF4D7D', shadow: '#C2185B' },
    { body: '#FFD93D', shadow: '#F9A825' },
    { body: '#6C63FF', shadow: '#3F3D9A' },
    { body: '#00D9C0', shadow: '#00897B' },
    { body: '#FF8C42', shadow: '#E64A19' },
    { body: '#FF6B9D', shadow: '#C2185B' },
    { body: '#A8FF78', shadow: '#558B2F' },
    { body: '#B5EEFF', shadow: '#0288D1' },
    { body: '#CF9FFF', shadow: '#6A1B9A' },
  ];

  let layer = null;
  let running = false;
  let balloons = [];

  function init() {
    layer = document.getElementById('balloonLayer');
  }

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Spawn a single balloon element
   */
  function spawnBalloon(opts = {}) {
    const colorPair = opts.color || randomItem(BALLOON_COLORS);
    const size      = opts.size  || randomBetween(50, 90);
    const left      = opts.left  != null ? opts.left : randomBetween(5, 92);
    const riseDur   = opts.riseDuration || randomBetween(5, 9);
    const delay     = opts.delay != null ? opts.delay : randomBetween(0, 2);
    const swayStart = randomBetween(-8, -3);
    const swayEnd   = randomBetween(3, 8);

    const wrapper = document.createElement('div');
    wrapper.className = 'balloon';
    wrapper.style.cssText = `
      --left:          ${left}%;
      --rise-duration: ${riseDur}s;
      --delay:         ${delay}s;
      --sway-start:    ${swayStart}deg;
      --sway-end:      ${swayEnd}deg;
    `;

    // Balloon body
    const body = document.createElement('div');
    body.className = 'balloon-body';
    body.style.cssText = `
      --balloon-size:   ${size}px;
      --balloon-color:  ${colorPair.body};
      --balloon-shadow: ${colorPair.shadow};
      width:  ${size}px;
      height: ${size * 1.2}px;
    `;

    // String
    const string = document.createElement('div');
    string.className = 'balloon-string';
    string.style.cssText = `
      --balloon-color: ${colorPair.body};
      height: ${size * 1.3}px;
    `;

    wrapper.appendChild(body);
    wrapper.appendChild(string);
    layer.appendChild(wrapper);
    balloons.push(wrapper);

    // Clean up after animation
    const totalMs = (riseDur + delay) * 1000 + 500;
    setTimeout(() => {
      wrapper.remove();
      const idx = balloons.indexOf(wrapper);
      if (idx > -1) balloons.splice(idx, 1);
    }, totalMs);
  }

  /**
   * Launch a batch of balloons from the bottom
   */
  function launch(count = 15, opts = {}) {
    if (!layer) init();

    for (let i = 0; i < count; i++) {
      spawnBalloon({
        delay: i * randomBetween(0.15, 0.45),
        left:  randomBetween(3, 94),
        size:  randomBetween(45, 88),
        riseDuration: randomBetween(5.5, 10),
      });
    }
  }

  /**
   * Continuous balloon shower
   */
  function startShower(duration = 10000, rate = 2500) {
    if (!layer) init();
    running = true;

    const startTime = Date.now();

    function emit() {
      if (!running || Date.now() - startTime > duration) {
        running = false;
        return;
      }
      spawnBalloon({
        delay: 0,
        left:  randomBetween(3, 94),
      });
      setTimeout(emit, randomBetween(rate * 0.7, rate * 1.3));
    }

    emit();
  }

  function stopShower() {
    running = false;
  }

  function clearAll() {
    running = false;
    balloons.forEach(b => b.remove());
    balloons = [];
  }

  return { init, launch, startShower, stopShower, clearAll };

})();

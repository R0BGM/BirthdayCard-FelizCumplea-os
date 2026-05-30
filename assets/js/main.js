/**
 * main.js — Application Entry Point
 * Bootstraps all modules after DOM is ready
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Initialize background canvas particle system
  BgCanvas.init();

  // Initialize balloon engine (ensure layer exists)
  BalloonEngine.init();

  // Initialize confetti engine
  ConfettiEngine.init();

  // Initialize card/envelope interaction
  CardController.init();

  // Gentle ambient sparkle on load (few balloons drifting)
  setTimeout(() => {
    BalloonEngine.launch(3, { riseDuration: 9 });
  }, 1800);

  // Log credit (polished touch)
  console.log(
    '%c🎉 Feliz Cumpleaños! %c — Diseñado con ❤️ ',
    'font-size:18px; font-weight:bold; color:#FF4D7D;',
    'font-size:14px; color:#FFD93D;'
  );

});

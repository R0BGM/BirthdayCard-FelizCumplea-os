/**
 * card.js — Envelope & Card Interaction Controller
 * Handles click state transitions, ARIA updates, and triggering celebration effects
 */

'use strict';

const CardController = (() => {

  let wrapper, envelope, card, seal;
  let opened = false;

  function init() {
    wrapper  = document.getElementById('envelopeWrapper');
    envelope = document.getElementById('envelope');
    card     = document.getElementById('birthdayCard');
    seal     = document.getElementById('envSeal');

    if (!wrapper) return;

    // Click & keyboard handler
    wrapper.addEventListener('click', onOpen);
    wrapper.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !opened) {
        e.preventDefault();
        onOpen();
      }
    });
  }

  function onOpen() {
    if (opened) return;
    opened = true;

    // Update ARIA
    wrapper.setAttribute('aria-expanded', 'true');
    wrapper.setAttribute('aria-label', 'Carta abierta con mensaje de cumpleaños');

    // Phase 1: Flap lifts + seal fades
    seal.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    seal.style.opacity    = '0';
    seal.style.transform  = 'scale(0.7)';

    // Phase 2: Envelope fades out after a beat
    setTimeout(() => {
      wrapper.classList.add('is-open');
    }, 350);

    // Phase 3: Card rises into view
    setTimeout(() => {
      card.setAttribute('aria-hidden', 'false');
      card.classList.add('is-visible');
      wrapper.style.cursor = 'default';
    }, 800);

    // Phase 4: Celebration begins!
    setTimeout(() => {
      celebrate();
    }, 900);
  }

  function celebrate() {
    // First big confetti burst
    ConfettiEngine.burst(120, 50);

    // Left & right bursts
    setTimeout(() => ConfettiEngine.burst(60, 20), 200);
    setTimeout(() => ConfettiEngine.burst(60, 80), 350);

    // Balloon launch wave 1
    BalloonEngine.launch(12);

    // Sustained confetti rain
    setTimeout(() => {
      ConfettiEngine.startRain(9000, 10);
    }, 600);

    // Balloon launch wave 2
    setTimeout(() => {
      BalloonEngine.launch(10);
    }, 1500);

    // Balloon shower
    setTimeout(() => {
      BalloonEngine.startShower(12000, 2200);
    }, 2000);
  }

  return { init };

})();

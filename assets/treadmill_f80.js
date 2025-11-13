/**
 * =============================================================
 * treadmill_f80.js — Enhanced Version (Final)
 * -------------------------------------------------------------
 * Handles:
 *  1️⃣ Athlete Slider      → sections/treadmill-f80-athlete-slider.liquid
 *  2️⃣ Reviews Slider      → sections/treadmill-f80-compare-feature.liquid
 *  3️⃣ Specifications Accordion → sections/treadmill-f80-specifications.liquid
 * 
 * Features:
 *  - Safe initialization and cleanup per Shopify section
 *  - Keyboard + Swipe + Autoplay controls
 *  - Defensive checks and console warnings
 *  - destroy() API for possible dynamic unloading
 *  - Fully scoped, no global leaks
 * =============================================================
 */

(function () {
  /* Utility: Safe integer parsing */
  function toInt(v, fallback) {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : fallback;
  }

  /* --------------------------------------------------------------------------
     1️⃣ ATHLETE SLIDER
  -------------------------------------------------------------------------- */

  /**
   * Initialize the Athlete Slider in a given section
   * @param {string} sectionId - DOM ID of the section
   * @returns {object|null} - Slider instance with destroy() or null if invalid
   */
  function createAthleteSliderInstance(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
      console.warn(`[F80 JS] Section not found: ${sectionId}`);
      return null;
    }

    const slider = section.querySelector('[data-slider="benefits"]');
    if (!slider) {
      console.warn(`[F80 JS] No athlete slider found in section ${sectionId}`);
      return null;
    }

    const slides = Array.from(slider.querySelectorAll('.pdp__slider-slide'));
    const dots = Array.from(slider.querySelectorAll('.pdp__slider-dot'));
    const prevBtn = slider.querySelector('.pdp__slider-arrow--prev');
    const nextBtn = slider.querySelector('.pdp__slider-arrow--next');
    const track = slider.querySelector('.pdp__slider-track');

    if (!slides.length) {
      console.warn(`[F80 JS] No slides found in athlete slider for ${sectionId}`);
      return null;
    }

    const config = {
      autoplay: slider.getAttribute('data-autoplay') === 'true',
      interval: toInt(slider.getAttribute('data-interval'), 5000),
      loop: slider.getAttribute('data-loop') === 'true'
    };

    const state = { current: 0, total: slides.length, timer: null, startX: 0, endX: 0 };

    function updateActive(i) {
      slides.forEach((s, idx) => {
        s.classList.toggle('pdp__slider-slide--active', i === idx);
        s.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
      });
      dots.forEach((d, idx) => {
        d.classList.toggle('pdp__slider-dot--active', i === idx);
        d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
    }

    function goTo(i) {
      if (i < 0) i = config.loop ? state.total - 1 : 0;
      if (i >= state.total) i = config.loop ? 0 : state.total - 1;
      state.current = i;
      updateActive(i);
      resetAuto();
    }

    const next = () => goTo(state.current + 1);
    const prev = () => goTo(state.current - 1);

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
      dot.addEventListener('keydown', (e) => {
        if (['Enter', ' '].includes(e.key)) goTo(i);
      });
    });

    track?.addEventListener('touchstart', (e) => {
      state.startX = e.touches[0].clientX;
      pauseAuto();
    }, { passive: true });

    track?.addEventListener('touchend', (e) => {
      state.endX = e.changedTouches[0].clientX;
      const diff = state.startX - state.endX;
      if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
      resumeAuto();
    }, { passive: true });

    function startAuto() {
      if (!config.autoplay || state.timer) return;
      state.timer = setInterval(next, config.interval);
    }
    function pauseAuto() { if (state.timer) clearInterval(state.timer); state.timer = null; }
    function resetAuto() { pauseAuto(); startAuto(); }
    function resumeAuto() { setTimeout(startAuto, 300); }

    slider.addEventListener('mouseenter', pauseAuto);
    slider.addEventListener('mouseleave', resumeAuto);

    updateActive(0);
    startAuto();

    return {
      destroy() {
        pauseAuto();
        [prevBtn, nextBtn, slider, track].forEach(el => {
          if (!el) return;
          const clone = el.cloneNode(true);
          el.replaceWith(clone);
        });
      }
    };
  }

  /* --------------------------------------------------------------------------
     2️⃣ REVIEWS SLIDER
  -------------------------------------------------------------------------- */

  /**
   * Initialize Reviews Slider for a given section
   * @param {Element} sectionEl
   */
  function initReviewsSlider(sectionEl) {
    const slider = sectionEl.querySelector('[data-slider="reviews"]');
    if (!slider) {
      console.warn(`[F80 JS] No reviews slider found in ${sectionEl.id}`);
      return;
    }

    const track = slider.querySelector('.pdp__reviews-track');
    const slides = Array.from(slider.querySelectorAll('.pdp__review-card'));
    const prevBtn = slider.querySelector('.pdp__reviews-arrow--prev');
    const nextBtn = slider.querySelector('.pdp__reviews-arrow--next');
    const dots = Array.from(slider.querySelectorAll('.pdp__reviews-dot'));

    if (!track || !slides.length) return;

    const config = {
      autoplay: slider.dataset.autoplay === 'true',
      interval: toInt(slider.dataset.interval, 6000),
      loop: slider.dataset.loop === 'true'
    };

    let current = 0;
    let timer = null;
    let startX = 0;
    let endX = 0;

    function update() {
      const offset = -current * 100;
      track.style.transform = `translateX(${offset}%)`;
      dots.forEach((d, i) => {
        d.classList.toggle('pdp__reviews-dot--active', i === current);
        d.setAttribute('aria-selected', i === current ? 'true' : 'false');
      });
    }

    function goTo(i) {
      const total = slides.length;
      if (i < 0) i = config.loop ? total - 1 : 0;
      if (i >= total) i = config.loop ? 0 : total - 1;
      current = i;
      update();
      resetAuto();
    }

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);

    dots.forEach((d, i) => {
      d.addEventListener('click', () => goTo(i));
      d.addEventListener('keydown', (e) => {
        if (['Enter', ' '].includes(e.key)) goTo(i);
      });
    });

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      pauseAuto();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
      resumeAuto();
    }, { passive: true });

    function startAuto() {
      if (!config.autoplay || timer) return;
      timer = setInterval(next, config.interval);
    }
    function pauseAuto() { if (timer) clearInterval(timer); timer = null; }
    function resetAuto() { pauseAuto(); startAuto(); }
    function resumeAuto() { setTimeout(startAuto, 300); }

    update();
    startAuto();
  }

  /* --------------------------------------------------------------------------
     3️⃣ SPECIFICATIONS ACCORDION
  -------------------------------------------------------------------------- */
  /**
   * Initialize accessible accordion inside the specifications section
   * @param {Element} sectionEl
   */
  function initSpecificationsAccordion(sectionEl) {
    const accordion = sectionEl.querySelector('.pdp__accordion');
    if (!accordion) return;
    const triggers = accordion.querySelectorAll('.pdp__accordion-trigger');
    const closeOthers = accordion.dataset.closeOthers === 'true';

    triggers.forEach(trigger => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      const toggle = () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          panel?.setAttribute('hidden', '');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          if (closeOthers) {
            triggers.forEach(t => {
              if (t !== trigger) {
                const id = t.getAttribute('aria-controls');
                document.getElementById(id)?.setAttribute('hidden', '');
                t.setAttribute('aria-expanded', 'false');
              }
            });
          }
          panel?.removeAttribute('hidden');
          trigger.setAttribute('aria-expanded', 'true');
        }
      };

      trigger.addEventListener('click', (e) => { e.preventDefault(); toggle(); });
      trigger.addEventListener('keydown', (e) => {
        if (['Enter', ' '].includes(e.key)) { e.preventDefault(); toggle(); }
      });
    });
  }

  /* --------------------------------------------------------------------------
     4️⃣ INITIALIZATION + SECTION EVENTS
  -------------------------------------------------------------------------- */
  function initAll() {
    document.querySelectorAll('section.treadmill-f80-athlete-slider').forEach(s => s.id && createAthleteSliderInstance(s.id));
    document.querySelectorAll('section.treadmill-f80-reviews').forEach(initReviewsSlider);
    document.querySelectorAll('section.treadmill-f80-specifications').forEach(initSpecificationsAccordion);
  }

  document.addEventListener('DOMContentLoaded', initAll);

  document.addEventListener('shopify:section:load', (e) => {
    const el = e.target;
    if (!el) return;
    if (el.classList.contains('treadmill-f80-athlete-slider')) el.id && createAthleteSliderInstance(el.id);
    if (el.classList.contains('treadmill-f80-reviews')) initReviewsSlider(el);
    if (el.classList.contains('treadmill-f80-specifications')) initSpecificationsAccordion(el);
  });
})();

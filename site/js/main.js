/* Wolf Nutrition — Bold Dark Theme
   Nav scroll, hours highlight, GSAP reveals, marquee, parallax
   Hours: Mon–Fri 6:00 AM – 5:30 PM, Sat 8:00 AM – 5:00 PM, Sun Closed
*/

(function () {
  'use strict';

  const HOURS = [
    { open: null,    close: null,    label: 'Closed',             closed: true  }, // Sun
    { open: '06:00', close: '17:30', label: '6:00 AM – 5:30 PM', closed: false }, // Mon
    { open: '06:00', close: '17:30', label: '6:00 AM – 5:30 PM', closed: false }, // Tue
    { open: '06:00', close: '17:30', label: '6:00 AM – 5:30 PM', closed: false }, // Wed
    { open: '06:00', close: '17:30', label: '6:00 AM – 5:30 PM', closed: false }, // Thu
    { open: '06:00', close: '17:30', label: '6:00 AM – 5:30 PM', closed: false }, // Fri
    { open: '08:00', close: '17:00', label: '8:00 AM – 5:00 PM', closed: false }  // Sat
  ];

  function minutesFromHHMM(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  }

  function formatLabel(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const mm = String(m).padStart(2, '0');
    return mm === '00' ? `${h12} ${period}` : `${h12}:${mm} ${period}`;
  }

  function updateTodayHighlight() {
    const now = new Date();
    const day = now.getDay();
    const today = HOURS[day];

    const row = document.querySelector(`#hoursTable tr[data-day="${day}"]`);
    if (row) row.classList.add('is-today');

    const badge = document.getElementById('todayHours');
    const dot = document.querySelector('.hero__badge-dot');
    if (!badge) return;

    if (today.closed) {
      badge.textContent = 'Closed Today';
      if (dot) dot.dataset.closed = '';
      return;
    }

    const minsNow = now.getHours() * 60 + now.getMinutes();
    const opens = minutesFromHHMM(today.open);
    const closes = minutesFromHHMM(today.close);

    if (minsNow >= opens && minsNow < closes) {
      badge.textContent = `Open Now · Closes ${formatLabel(today.close)}`;
      if (dot) dot.style.background = '#4ADE80';
    } else if (minsNow < opens) {
      badge.textContent = `Opens at ${formatLabel(today.open)}`;
      if (dot) dot.dataset.closed = '';
    } else {
      badge.textContent = 'Closed · Opens Tomorrow';
      if (dot) dot.dataset.closed = '';
    }
  }

  function setupNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    let ticking = false;
    function check() {
      nav.classList.toggle('is-scrolled', window.scrollY > 60);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(check);
        ticking = true;
      }
    }, { passive: true });
    check();

    // Smooth scroll for nav links
    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function setupYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  function setupGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax
    const heroImg = document.querySelector('.hero__bg-img');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    // Hero content stagger
    gsap.to('.hero [data-reveal]', {
      opacity: 1, y: 0,
      duration: 1, ease: 'power3.out',
      stagger: 0.15, delay: 0.2
    });

    // Gallery stagger reveal
    const galleryItems = document.querySelectorAll('.gallery__item[data-reveal]');
    if (galleryItems.length) {
      ScrollTrigger.batch(galleryItems, {
        interval: 0.08, start: 'top 92%',
        onEnter: batch => gsap.to(batch, {
          opacity: 1, y: 0,
          duration: 0.6, ease: 'power2.out',
          stagger: { each: 0.06, from: 'random' },
          overwrite: true
        })
      });
    }

    // Drink cards — slide in from alternating sides
    document.querySelectorAll('.drink[data-reveal]').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        {
          opacity: 1, x: 0,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });

    // Everything else — standard reveal
    const everywhere = document.querySelectorAll(
      'section:not(.hero) [data-reveal]:not(.gallery__item):not(.drink)'
    );
    everywhere.forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });

    // Vibe image scale-in
    const vibeImg = document.querySelector('.vibe__image');
    if (vibeImg) {
      gsap.fromTo(vibeImg.querySelector('img'),
        { scale: 1.1 },
        {
          scale: 1, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: vibeImg, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateTodayHighlight();
    setupNav();
    setupYear();
  });

  window.addEventListener('load', setupGSAP);
})();

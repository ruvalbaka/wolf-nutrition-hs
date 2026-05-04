/* Wolf Nutrition — Premium Revamp JS
   Menu tabs, shake sub-tabs, counter animations, lightbox,
   mobile nav, preloader, GSAP reveals, parallax
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

  // ===== HELPERS =====
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

  // ===== HOURS =====
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

  // ===== PRELOADER =====
  function setupPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('is-done');
      }, 1200);
    });
  }

  // ===== NAV =====
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

    // Smooth scroll
    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          closeMobileNav();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ===== MOBILE NAV =====
  function setupMobileNav() {
    const burger = document.getElementById('navBurger');
    const mobile = document.getElementById('navMobile');
    if (!burger || !mobile) return;

    mobile.setAttribute('aria-hidden', 'true');

    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('is-open');
      mobile.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      mobile.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
          }
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && burger.classList.contains('is-open')) {
        closeMobileNav();
        burger.focus();
      }
    });
  }

  function closeMobileNav() {
    const burger = document.getElementById('navBurger');
    const mobile = document.getElementById('navMobile');
    if (burger) {
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
    if (mobile) {
      mobile.classList.remove('is-open');
      mobile.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }


  // ===== LIGHTBOX =====
  function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lbImg = lightbox.querySelector('.lightbox__img');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');
    const focusable = [closeBtn, prevBtn, nextBtn];
    const items = document.querySelectorAll('.gallery__item');
    let currentIndex = 0;
    let openerEl = null;
    const srcs = [];

    function open(index, trigger) {
      openerEl = trigger;
      currentIndex = index;
      lbImg.src = srcs[currentIndex];
      lbImg.alt = items[currentIndex]?.querySelector('img')?.alt || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtn.focus(), 50);
    }

    items.forEach((item, i) => {
      const img = item.querySelector('img');
      if (img) {
        srcs.push(img.src);
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.addEventListener('click', () => open(i, item));
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i, item); }
        });
      }
    });

    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      if (openerEl) openerEl.focus();
    }

    function prev() {
      currentIndex = (currentIndex - 1 + srcs.length) % srcs.length;
      lbImg.src = srcs[currentIndex];
      lbImg.alt = items[currentIndex]?.querySelector('img')?.alt || '';
    }

    function next() {
      currentIndex = (currentIndex + 1) % srcs.length;
      lbImg.src = srcs[currentIndex];
      lbImg.alt = items[currentIndex]?.querySelector('img')?.alt || '';
    }

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowLeft') { prev(); return; }
      if (e.key === 'ArrowRight') { next(); return; }
      if (e.key === 'Tab') {
        e.preventDefault();
        const idx = focusable.indexOf(document.activeElement);
        const nextIdx = e.shiftKey
          ? (idx <= 0 ? focusable.length - 1 : idx - 1)
          : (idx >= focusable.length - 1 ? 0 : idx + 1);
        focusable[nextIdx].focus();
      }
    });
  }

  // ===== YEAR =====
  function setupYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(el => {
      const target = parseFloat(el.dataset.count);
      const isDecimal = target % 1 !== 0;
      const duration = 1500;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (isDecimal) {
          el.textContent = current.toFixed(1);
        } else {
          el.textContent = Math.round(current);
        }

        // Add suffix
        if (progress >= 1) {
          if (isDecimal) {
            el.textContent = target.toFixed(1) + '\u2605';
          } else if (target === 60) {
            el.textContent = target + '+';
          }
        }

        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }

  // ===== GSAP =====
  function setupGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      animateCounters();
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
      stagger: 0.15, delay: 1.6
    });

    // Counter animation after hero reveals
    setTimeout(animateCounters, 2200);

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

    // Menu image cards reveal
    const menuCards = document.querySelectorAll('.menu__image-card[data-reveal]');
    if (menuCards.length) {
      menuCards.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 0.8, ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
      });
    }

    // Vibe image scale-in
    const vibeImg = document.querySelector('.vibe__image');
    if (vibeImg) {
      gsap.fromTo(vibeImg.querySelector('img'),
        { scale: 1.15 },
        {
          scale: 1, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: vibeImg, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }

    // Reviews cards
    const reviewCards = document.querySelectorAll('.review[data-reveal]');
    if (reviewCards.length) {
      ScrollTrigger.batch(reviewCards, {
        interval: 0.1, start: 'top 90%',
        onEnter: batch => gsap.to(batch, {
          opacity: 1, y: 0,
          duration: 0.6, ease: 'power2.out',
          stagger: 0.1, overwrite: true
        })
      });
    }

    // Marquee parallax speed
    const marquee = document.querySelector('.marquee');
    if (marquee) {
      gsap.to(marquee, {
        scrollTrigger: {
          trigger: marquee,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        x: -50,
        ease: 'none'
      });
    }

    // Everything else — standard reveal
    const everywhere = document.querySelectorAll(
      'section:not(.hero) [data-reveal]:not(.gallery__item):not(.tea-card):not(.coffee-card):not(.nocaf-card):not(.review)'
    );
    everywhere.forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });
  }

  // ===== ORDER BUTTON PLACEHOLDER =====
  function setupOrderButtons() {
    const btns = document.querySelectorAll('#orderBtn, #orderBtnMobile');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Scroll to menu section as placeholder until online ordering link is provided
        const menu = document.getElementById('menu');
        if (menu) {
          closeMobileNav();
          menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', () => {
    setupPreloader();
    updateTodayHighlight();
    setupNav();
    setupMobileNav();
    setupLightbox();
    setupYear();
    setupOrderButtons();
  });

  window.addEventListener('load', setupGSAP);
})();

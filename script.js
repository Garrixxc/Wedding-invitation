/* ============================================================
   WEDDING WEBSITE JS — Neha & Prasad
   Animations, Countdown, Petals, RSVP, Scroll Reveal
   ============================================================ */

/* ---- PETAL RAIN ---- */
(function () {
  const petalEmojis = ['🌸', '🌺', '🌼', '🌻', '🏵️', '✿', '❀'];
  const container = document.getElementById('petalsContainer');
  const PETAL_COUNT = 22;

  function createPetal() {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

    const size = 16 + Math.random() * 18;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 12;

    el.style.cssText = `
      left: ${left}vw;
      font-size: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(el);
  }

  for (let i = 0; i < PETAL_COUNT; i++) createPetal();
})();

/* ---- CONFETTI (KIDS SECTION) ---- */
(function () {
  const container = document.getElementById('confettiContainer');
  const colors = ['#E8A020', '#6B1414', '#F4832A', '#F5DDD3', '#F5C518', '#FFB6C1', '#98FB98'];
  const COUNT = 30;

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(el);
  }
})();

/* ---- KIDS BADGE STAGGER DELAY ---- */
document.querySelectorAll('.kid-badge').forEach((badge, i) => {
  badge.style.setProperty('--delay', `${i * 0.15}s`);
});

/* ---- COUNTDOWN TIMER ---- */
(function () {
  const weddingDate = new Date('2025-04-22T11:00:00+05:30').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const sublabel = document.getElementById('countdown-sublabel');

  const daysCard = document.getElementById('days-card');
  const hoursCard = document.getElementById('hours-card');
  const minutesCard = document.getElementById('minutes-card');
  const secondsCard = document.getElementById('seconds-card');

  let prevValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };

  function flipAnimate(card) {
    card.style.transform = 'scale(1.15)';
    card.style.boxShadow = '0 0 20px rgba(232,160,32,0.6)';
    setTimeout(() => {
      card.style.transform = '';
      card.style.boxShadow = '';
    }, 200);
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = now - weddingDate; // Positive if past, negative if future
    const isAfter = diff >= 0;

    const absDiff = Math.abs(diff);
    const totalSeconds = Math.floor(absDiff / 1000);
    const secs = totalSeconds % 60;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const hrs = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 86400);

    const pad = n => String(n).padStart(2, '0');

    if (secs !== prevValues.seconds) {
      secondsEl.textContent = pad(secs);
      flipAnimate(secondsCard);
    }
    if (mins !== prevValues.minutes) {
      minutesEl.textContent = pad(mins);
      flipAnimate(minutesCard);
    }
    if (hrs !== prevValues.hours) {
      hoursEl.textContent = pad(hrs);
      flipAnimate(hoursCard);
    }
    if (days !== prevValues.days) {
      daysEl.textContent = pad(days);
      flipAnimate(daysCard);
    }

    prevValues = { days, hours: hrs, minutes: mins, seconds: secs };

    if (isAfter) {
      sublabel.textContent = 'The happy couple tied the knot! 🎉';
      document.querySelector('.countdown-label').textContent = '🕐 Since the Auspicious Day';
    } else {
      sublabel.textContent = 'Until forever begins…';
      document.querySelector('.countdown-label').textContent = 'Counting down to the wedding 💍';
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

/* ---- NAVBAR SCROLL EFFECT ---- */
(function () {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* ---- SMOOTH SCROLL NAV LINKS ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- HAMBURGER MENU ---- */
(function () {
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.cssText = isOpen
        ? ''
        : `
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          background: rgba(74,13,13,0.98);
          padding: 1.5rem 2rem;
          gap: 1.2rem;
          z-index: 999;
          border-bottom: 2px solid rgba(232,160,32,0.3);
        `;
    });
  }
})();

/* ---- SCROLL REVEAL ---- */
(function () {
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    reveals.forEach(el => el.classList.add('visible'));
  }
})();

/* ---- PARALLAX HERO ---- */
(function () {
  const hero = document.querySelector('.hero');
  const rangoli = document.querySelector('.rangoli-bg');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight * 1.5) {
      if (hero) {
        hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
      }
    }
  }, { passive: true });
})();

/* ---- RSVP FORM ---- */
(function () {
  const form = document.getElementById('rsvpForm');
  const successMsg = document.getElementById('rsvpSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.guestName.value.trim();
      const attendance = form.attendance ? form.attendance.value : '';
      const message = form.message.value.trim();

      if (!name) {
        form.guestName.focus();
        form.guestName.style.borderColor = '#E44';
        setTimeout(() => form.guestName.style.borderColor = '', 1500);
        return;
      }

      // Simulate submission
      const btn = document.getElementById('rsvpSubmit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send Blessings 🙏';
        btn.disabled = false;
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 5000);
      }, 1200);
    });
  }
})();

/* ---- CARD HOVER GLOW ---- */
document.querySelectorAll('.couple-card, .wedding-detail-card, .family-card, .bhojan-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = card.classList.contains('wedding-detail-card')
      ? `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.14), rgba(255,255,255,0.06))`
      : `radial-gradient(circle at ${x}% ${y}%, rgba(232,160,32,0.07), rgba(255,255,255,1))`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

/* ---- SHIMMER REVEAL: delay stagger for section headings ---- */
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});

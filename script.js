/* ============================================================
   WEDDING WEBSITE JS — Neha & Prasad
   Animations, Countdown, Petals, Blessings Wall, Scroll Reveal
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
  // Wedding date: Wednesday, 22 April 2026 at 11:00 AM IST (UTC+5:30)
  const weddingDate = new Date('2026-04-22T11:00:00+05:30').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const sublabel = document.getElementById('countdown-sublabel');
  const countdownLabel = document.querySelector('.countdown-label');

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
    const diff = weddingDate - now; // Positive if future
    const isUpcoming = diff > 0;

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

    if (isUpcoming) {
      sublabel.textContent = 'Until two hearts become one...';
      countdownLabel.textContent = 'Counting Down to the Big Day 💍';
    } else {
      sublabel.textContent = 'The happy couple tied the knot! 🎉';
      countdownLabel.textContent = '🕐 Since the Auspicious Day';
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
    reveals.forEach(el => el.classList.add('visible'));
  }
})();

/* ---- PARALLAX HERO ---- */
(function () {
  const hero = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight * 1.5) {
      if (hero) {
        hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
      }
    }
  }, { passive: true });
})();

/* ---- BLESSINGS WALL (localStorage) ---- */
(function () {
  const STORAGE_KEY = 'neha_prasad_blessings';
  const nameInput = document.getElementById('guestName');
  const msgInput = document.getElementById('message');
  const addBtn = document.getElementById('addBlessingBtn');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const grid = document.getElementById('blessingsGrid');
  const emptyMsg = document.getElementById('blessingsEmpty');

  function getBlessings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveBlessings(blessings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blessings));
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  function renderBlessings() {
    const blessings = getBlessings();
    grid.innerHTML = '';

    if (blessings.length === 0) {
      emptyMsg.style.display = 'block';
      return;
    }

    emptyMsg.style.display = 'none';

    // Show newest first
    blessings.slice().reverse().forEach(b => {
      const card = document.createElement('div');
      card.className = 'blessing-card';
      card.innerHTML = `
        <div class="blessing-card-name">🌸 ${escapeHTML(b.name)}</div>
        <div class="blessing-card-msg">"${escapeHTML(b.message)}"</div>
        <div class="blessing-card-time">${timeAgo(b.timestamp)}</div>
      `;
      grid.appendChild(card);
    });
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function shakeFeedback(el) {
    el.style.borderColor = '#F44';
    el.style.animation = 'none';
    el.offsetHeight; // trigger reflow
    el.style.animation = '';
    setTimeout(() => el.style.borderColor = '', 1200);
  }

  // Post blessing to wall
  addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const message = msgInput.value.trim();

    if (!name) { shakeFeedback(nameInput); nameInput.focus(); return; }
    if (!message) { shakeFeedback(msgInput); msgInput.focus(); return; }

    const blessings = getBlessings();
    blessings.push({ name, message, timestamp: Date.now() });
    saveBlessings(blessings);

    nameInput.value = '';
    msgInput.value = '';
    renderBlessings();

    // Quick visual feedback
    addBtn.textContent = '✅ Posted!';
    addBtn.disabled = true;
    setTimeout(() => {
      addBtn.textContent = '🌸 Post Blessing';
      addBtn.disabled = false;
    }, 1500);
  });

  // Send via WhatsApp
  whatsappBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const message = msgInput.value.trim();

    let text = `🌸 *Wedding Blessings for Neha & Prasad* 🌸\n\n`;
    if (name) text += `From: ${name}\n`;
    if (message) text += `Message: ${message}\n`;
    text += `\n💒 22 April 2026 · Suryamahal Hall, Goregaon East\n`;
    text += `🌺 Wishing the couple a lifetime of happiness!`;

    const waURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waURL, '_blank');
  });

  // Render on load
  renderBlessings();
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

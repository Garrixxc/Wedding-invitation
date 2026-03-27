/* ============================================================
   WEDDING WEBSITE JS — Neha & Prasad
   Firebase Firestore Blessings, Countdown, Admin, Animations
   ============================================================ */

/* ---- PETAL RAIN ---- */
(function () {
  const petalEmojis = ['✦', '✿', '❀', '✾', '❁', '❋'];
  const container = document.getElementById('petalsContainer');
  const PETAL_COUNT = 22;

  function createPetal() {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      font-size: ${Math.random() * 1 + 1}rem; /* Adjusted font size */
      animation-duration: ${Math.random() * 5 + 5}s; /* Adjusted animation duration */
      animation-delay: ${Math.random() * 5}s; /* Adjusted animation delay */
    `;
    container.appendChild(el);

    // Remove petal after animation
    setTimeout(() => {
      el.remove();
    }, 10000); // Petals removed after 10 seconds
  }

  // Create petals initially (Reduced on mobile)
  const petalCount = window.innerWidth < 768 ? 15 : 40; // Dynamic petal count based on screen width
  for(let i = 0; i < petalCount; i++) {
    setTimeout(createPetal, Math.random() * 5000); // Stagger initial petal creation
  }

  // Continuously create petals
  setInterval(() => {
    if (document.querySelectorAll('.petal').length < petalCount) {
      createPetal();
    }
  }, 300); // Create a new petal every 300ms if count is below limit
})();





/* ---- COUNTDOWN TIMER ---- */
(function () {
  const weddingDate = new Date('2026-04-22T11:00:00+05:30').getTime();

  const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };
  const cards = {
    days: document.getElementById('days-card'),
    hours: document.getElementById('hours-card'),
    minutes: document.getElementById('minutes-card'),
    seconds: document.getElementById('seconds-card'),
  };
  const sublabel = document.getElementById('countdown-sublabel');
  const countdownLabel = document.querySelector('.countdown-label');
  let prev = { days: -1, hours: -1, minutes: -1, seconds: -1 };

  function flip(card) {
    card.style.transform = 'scale(1.15)';
    card.style.boxShadow = '0 0 20px rgba(232,160,32,0.6)';
    setTimeout(() => { card.style.transform = ''; card.style.boxShadow = ''; }, 200);
  }

  function tick() {
    const diff = weddingDate - Date.now();
    const upcoming = diff > 0;
    const abs = Math.abs(diff);
    const s = Math.floor(abs / 1000) % 60;
    const m = Math.floor(abs / 60000) % 60;
    const h = Math.floor(abs / 3600000) % 24;
    const d = Math.floor(abs / 86400000);
    const pad = n => String(n).padStart(2, '0');

    if (s !== prev.seconds) { els.seconds.textContent = pad(s); flip(cards.seconds); }
    if (m !== prev.minutes) { els.minutes.textContent = pad(m); flip(cards.minutes); }
    if (h !== prev.hours) { els.hours.textContent = pad(h); flip(cards.hours); }
    if (d !== prev.days) { els.days.textContent = pad(d); flip(cards.days); }
    prev = { days: d, hours: h, minutes: m, seconds: s };

    sublabel.textContent = upcoming ? 'Until two hearts become one...' : 'The happy couple tied the knot!';
    countdownLabel.textContent = upcoming ? 'Counting Down to the Big Day' : 'Since the Auspicious Day';
  }

  tick();
  setInterval(tick, 1000);
})();

/* ---- NAVBAR SCROLL EFFECT ---- */
(function () {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ---- SMOOTH SCROLL NAV LINKS ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
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
      navLinks.style.cssText = isOpen ? '' : `
        display:flex; flex-direction:column; position:fixed; top:60px;
        left:0; right:0; background:rgba(74,13,13,0.98); padding:1.5rem 2rem;
        gap:1.2rem; z-index:999; border-bottom:2px solid rgba(232,160,32,0.3);
      `;
    });
  }
})();

/* ---- SCROLL REVEAL ---- */
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => obs.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
})();

/* ---- PARALLAX HERO ---- */
(function () {
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight * 1.5 && hero) {
      hero.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
    }
  }, { passive: true });
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
  card.addEventListener('mouseleave', () => { card.style.background = ''; });
});

/* ---- SHIMMER REVEAL STAGGER ---- */
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});


/* =============================================================
   FIREBASE BLESSINGS WALL
   ============================================================= */
(function () {
  const COLLECTION = 'blessings';
  const nameInput = document.getElementById('guestName');
  const msgInput = document.getElementById('message');
  const addBtn = document.getElementById('addBlessingBtn');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const grid = document.getElementById('blessingsGrid');
  const emptyMsg = document.getElementById('blessingsEmpty');
  const loadingEl = document.getElementById('blessingsLoading');
  const countEl = document.getElementById('blessingsCount');

  function escapeHTML(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function formatDate(ts) {
    if (!ts) return '';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  function timeAgo(ts) {
    if (!ts) return '';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return formatDate(ts);
  }

  // Render a single blessing card for the public wall
  function createBlessingCard(data) {
    const card = document.createElement('div');
    card.className = 'blessing-card';
    card.innerHTML = `
      <div class="blessing-card-name">🌸 ${escapeHTML(data.name)}</div>
      <div class="blessing-card-msg">"${escapeHTML(data.message)}"</div>
      <div class="blessing-card-time">${timeAgo(data.createdAt)}</div>
    `;
    return card;
  }

  // Render an admin card with delete button
  function createAdminCard(docId, data) {
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.id = `admin-${docId}`;
    card.innerHTML = `
      <div class="admin-card-top">
        <div class="admin-card-name">🌸 ${escapeHTML(data.name)}</div>
        <button class="admin-delete-btn" data-id="${docId}">🗑️ Delete</button>
      </div>
      <div class="admin-card-msg">"${escapeHTML(data.message)}"</div>
      <div class="admin-card-meta">
        <span>📅 ${formatDate(data.createdAt)}</span>
        <span>ID: ${docId.slice(0, 8)}...</span>
      </div>
    `;
    // Delete handler
    card.querySelector('.admin-delete-btn').addEventListener('click', async () => {
      if (confirm(`Delete blessing from "${data.name}"?`)) {
        try {
          await db.collection(COLLECTION).doc(docId).delete();
          card.style.animation = 'blessingAppear 0.3s ease reverse';
          setTimeout(() => card.remove(), 300);
        } catch (err) {
          alert('Failed to delete: ' + err.message);
        }
      }
    });
    return card;
  }

  // REAL-TIME LISTENER: Listen to Firestore for blessings
  function startListening() {
    if (typeof db === 'undefined') {
      // Firebase not configured yet, show placeholder message
      if (loadingEl) loadingEl.innerHTML = '<p style="color:rgba(255,255,255,0.5); font-style:italic;">🔧 Firebase not configured yet. Blessings will appear here once connected.</p>';
      return;
    }

    db.collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        // Hide loading
        if (loadingEl) loadingEl.style.display = 'none';

        grid.innerHTML = '';
        const adminBody = document.getElementById('adminBody');
        if (adminBody) adminBody.innerHTML = '';

        if (snapshot.empty) {
          emptyMsg.style.display = 'block';
          countEl.textContent = '';
          if (document.getElementById('adminBlessingCount')) {
            document.getElementById('adminBlessingCount').textContent = '0 blessings';
          }
          return;
        }

        emptyMsg.style.display = 'none';
        let count = 0;

        snapshot.forEach(doc => {
          const data = doc.data();
          count++;

          // Public wall
          grid.appendChild(createBlessingCard(data));

          // Admin panel
          if (adminBody) {
            adminBody.appendChild(createAdminCard(doc.id, data));
          }
        });

        countEl.textContent = `${count} blessing${count !== 1 ? 's' : ''} on the wall 🌸`;
        if (document.getElementById('adminBlessingCount')) {
          document.getElementById('adminBlessingCount').textContent = `${count} blessing${count !== 1 ? 's' : ''}`;
        }
      }, (err) => {
        console.error('Firestore error:', err);
        if (loadingEl) loadingEl.innerHTML = '<p style="color:#ff6b6b;">Could not load blessings. Please refresh.</p>';
      });
  }

  // Post a new blessing
  addBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const message = msgInput.value.trim();

    if (!name) { nameInput.focus(); nameInput.style.borderColor = '#F44'; setTimeout(() => nameInput.style.borderColor = '', 1200); return; }
    if (!message) { msgInput.focus(); msgInput.style.borderColor = '#F44'; setTimeout(() => msgInput.style.borderColor = '', 1200); return; }

    if (typeof db === 'undefined') {
      alert('Firebase is not configured yet. Please set up Firebase first.');
      return;
    }

    addBtn.disabled = true;
    addBtn.textContent = '✨ Posting...';

    try {
      await db.collection(COLLECTION).add({
        name,
        message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      nameInput.value = '';
      msgInput.value = '';
      addBtn.textContent = '✅ Posted!';
      setTimeout(() => { addBtn.textContent = '🌸 Post Blessing'; addBtn.disabled = false; }, 1500);
    } catch (err) {
      alert('Failed to post: ' + err.message);
      addBtn.textContent = '🌸 Post Blessing';
      addBtn.disabled = false;
    }
  });

  // WhatsApp share
  whatsappBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const message = msgInput.value.trim();
    let text = `🌸 *Wedding Blessings for Neha & Prasad* 🌸\n\n`;
    if (name) text += `From: ${name}\n`;
    if (message) text += `Message: ${message}\n`;
    text += `\n💒 22 April 2026 · Suryamahal Hall, Goregaon East\n`;
    text += `🌺 Wishing the couple a lifetime of happiness!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  });

  // Start listening
  startListening();
})();


/* =============================================================
   ADMIN PANEL
   ============================================================= */
(function () {
  const modal = document.getElementById('adminModal');
  const panel = document.getElementById('adminPanel');
  const toggleBtn = document.getElementById('adminToggleNav');
  const closeModalBtn = document.getElementById('adminModalClose');
  const loginBtn = document.getElementById('adminLoginBtn');
  const passwordInput = document.getElementById('adminPassword');
  const errorEl = document.getElementById('adminError');
  const closeBtn = document.getElementById('adminCloseBtn');

  let isAdmin = false;

  // Open admin modal
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAdmin) {
      panel.classList.toggle('active');
    } else {
      modal.classList.add('active');
      passwordInput.focus();
    }
  });

  // Close modal
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    errorEl.textContent = '';
    passwordInput.value = '';
  });

  // Close modal on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      errorEl.textContent = '';
      passwordInput.value = '';
    }
  });

  // Login
  loginBtn.addEventListener('click', () => {
    const pwd = passwordInput.value.trim();
    if (pwd === ADMIN_PASSWORD) {
      isAdmin = true;
      modal.classList.remove('active');
      panel.classList.add('active');
      toggleBtn.textContent = '🔓';
      toggleBtn.style.opacity = '1';
      passwordInput.value = '';
      errorEl.textContent = '';
    } else {
      errorEl.textContent = '❌ Wrong password. Try again.';
      passwordInput.value = '';
      passwordInput.focus();
    }
  });

  // Enter key in password field
  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loginBtn.click();
  });

  // Close admin panel
  closeBtn.addEventListener('click', () => {
    panel.classList.remove('active');
  });

  // MOBILE NAV SCROLL SPY
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    if (window.innerWidth > 768) return;
    
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector('.mobile-nav-item[href*=' + sectionId + ']')?.classList.add('active');
      } else {
        document.querySelector('.mobile-nav-item[href*=' + sectionId + ']')?.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);
})();

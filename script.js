/* ============================================================
   WEDDING WEBSITE JS — Neha & Prasad
   Firebase Firestore Blessings, Countdown, Admin, Animations
   ============================================================ */

/* ---- HERO VIDEO UPGRADE (auto-activates if NehaPrasad_video.mp4 exists) ---- */
(function () {
  const img = document.getElementById('heroCoupleImg');
  if (!img) return;

  const video = document.createElement('video');
  // Set as HTML attributes — required for iOS Safari autoplay
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.muted = true; // also set property for good measure
  video.className = 'hero-couple-video';

  const source = document.createElement('source');
  source.src = 'Animated_wedding_video_202604022117.mp4';
  source.type = 'video/mp4';
  video.appendChild(source);

  // Insert into DOM immediately (opacity:0) so browser starts loading/autoplay
  img.parentNode.insertBefore(video, img);

  function activateVideo() {
    video.style.opacity = '1';
    video.style.pointerEvents = 'auto';
    document.getElementById('hero')?.classList.add('hero-has-video');
  }

  video.addEventListener('canplay', () => {
    const p = video.play();
    if (p !== undefined) {
      p.then(activateVideo).catch(() => {
        // Autoplay still blocked — wait for first user touch then retry
        const onTouch = () => {
          video.play().then(activateVideo).catch(() => {});
          document.removeEventListener('touchstart', onTouch);
          document.removeEventListener('click', onTouch);
        };
        document.addEventListener('touchstart', onTouch, { once: true });
        document.addEventListener('click', onTouch, { once: true });
      });
    } else {
      activateVideo();
    }
  });

  // If video errors or takes >5s to get metadata, fall back to the photo
  const showPhoto = () => { img.style.display = 'block'; };
  video.addEventListener('error', showPhoto);
  setTimeout(() => { if (video.readyState < 1) showPhoto(); }, 5000);
})();

/* ---- HERO BOKEH ORBS ---- */
(function () {
  const container = document.getElementById('heroBokeh');
  if (!container) return;

  const colors = [
    'rgba(232, 160, 32,  0.28)',
    'rgba(248, 200, 64,  0.22)',
    'rgba(245, 166, 35,  0.20)',
    'rgba(255, 220, 100, 0.18)',
    'rgba(200, 110, 25,  0.24)',
    'rgba(255, 170,  50, 0.20)',
  ];

  // x%, y%, size px, duration s, delay s
  const orbs = [
    [8,  12, 130, 14, 0  ],
    [78, 18,  85, 18, 2.5],
    [52, 68, 105, 16, 4  ],
    [22, 58,  65, 20, 1  ],
    [88, 52,  95, 13, 5.5],
    [38, 28,  75, 17, 3  ],
    [68, 82,  55, 15, 6.5],
    [14, 78,  90, 19, 7  ],
    [93,  8,  70, 22, 2  ],
    [48, 48, 115, 25, 9  ],
    [60, 20,  50, 12, 1.5],
    [30, 90,  80, 21, 8  ],
  ];

  orbs.forEach(([x, y, size, dur, delay], i) => {
    const dot = document.createElement('div');
    dot.className = 'bokeh-dot';
    dot.style.cssText = `
      left:${x}%; top:${y}%;
      width:${size}px; height:${size}px;
      background:${colors[i % colors.length]};
      filter:blur(${Math.round(size * 0.22)}px);
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    container.appendChild(dot);
  });
})();

/* ---- HERO FLOWERS (🌸 🌼 🌺) ---- */
(function () {
  const heroContainer = document.getElementById('heroPetals');
  if (!heroContainer) return;

  const flowerEmojis = ['🌸', '🌼', '🌺'];
  const leftPositions = [5, 12, 20, 28, 35, 42, 50, 57, 63, 70, 76, 82, 88, 93, 97];

  leftPositions.forEach((left) => {
    const petal = document.createElement('span');
    petal.className = 'hero-petal';
    petal.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];

    // Randomized properties per spec
    const duration = 5 + Math.random() * 4; // 5s to 9s
    const delay = Math.random() * 7; // 0s to 7s
    const fontSize = 16 + Math.random() * 8; // 16px to 24px

    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.fontSize = `${fontSize}px`;
    petal.style.opacity = '0.8';

    heroContainer.appendChild(petal);
  });
})();





/* ---- COUNTDOWN TIMER ---- */
(function () {
  const weddingDate = new Date('2026-04-22T11:15:00+05:30').getTime();

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
    card.style.boxShadow = '0 0 20px rgba(232, 160, 32, 0.6)';
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
        left:0; right:0; background:rgba(74, 13, 13, 0.98); padding:1.5rem 2rem;
        gap:1.2rem; z-index:999; border-bottom:2px solid rgba(232, 160, 32, 0.3);
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
      : `radial-gradient(circle at ${x}% ${y}%, rgba(232, 160, 32, 0.07), rgba(255,255,255,1))`;
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
  const toggleBtnMobile = document.getElementById('adminToggleMobile');
  const closeModalBtn = document.getElementById('adminModalClose');
  const loginBtn = document.getElementById('adminLoginBtn');
  const passwordInput = document.getElementById('adminPassword');
  const errorEl = document.getElementById('adminError');
  const closeBtn = document.getElementById('adminCloseBtn');

  let isAdmin = false;

  const handleToggle = (e) => {
    e.preventDefault();
    if (isAdmin) {
      panel.classList.toggle('active');
    } else {
      modal.classList.add('active');
      passwordInput.focus();
    }
  };

  // Open admin modal
  toggleBtn.addEventListener('click', handleToggle);
  if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', handleToggle);

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

/* ===================== PHOTO GALLERY CAROUSEL ===================== */
(function () {
  const photos = [
    { src: 'pictures/Gemini_Generated_Image_pjln27pjln27pjln.png',   caption: 'Eternal Love',           location: 'Taj Mahal · Agra' },
    { src: 'pictures/Gemini_Generated_Image_1fsjao1fsjao1fsj.png',   caption: 'Above the City',         location: 'Amer Fort · Jaipur' },
    { src: 'pictures/Gemini_Generated_Image_sfmz13sfmz13sfmz.png',   caption: 'On Still Waters',        location: 'Dal Lake · Kashmir' },
    { src: 'pictures/Gemini_Generated_Image_k7rfj6k7rfj6k7rf.png',   caption: 'Where the Sky Meets the Lake', location: 'Pangong · Ladakh' },
    { src: 'pictures/Gemini_Generated_Image_nsovyhnsovyhnsov.png',   caption: 'Under the Full Moon',    location: 'Rann of Kutch' },
    { src: 'pictures/Gemini_Generated_Image_krnlc3krnlc3krnl.png',   caption: 'A View for Two',         location: 'Hampi · Karnataka' },
    { src: 'pictures/Gemini_Generated_Image_kfn4j0kfn4j0kfn4.png',   caption: 'Golden Archway',         location: 'Goa' },
    { src: 'pictures/Gemini_Generated_Image_c0owr4c0owr4c0ow.png',   caption: 'Ganga Aarti',            location: 'Dashashwamedh Ghat · Varanasi' },
    { src: 'pictures/Gemini_Generated_Image_uxssfeuxssfeuxss.png',   caption: 'The Sacred Flame',       location: 'Varanasi' },
    { src: 'pictures/Gemini_Generated_Image_7lgw8p7lgw8p7lgw.png',   caption: 'The Boatride',           location: 'Ganga · Varanasi' },
    { src: 'pictures/Gemini_Generated_Image_vypwy0vypwy0vypw.png',   caption: 'Dawn at the Ganga',      location: 'Varanasi' },
    { src: 'pictures/Gemini_Generated_Image_8wyv528wyv528wyv.png',   caption: 'Together at the Ghats',  location: 'Varanasi' },
    { src: 'pictures/Gemini_Generated_Image_s4owads4owads4ow.png',   caption: 'Golden Hour',            location: 'Varanasi Ghats' },
    { src: 'pictures/Gemini_Generated_Image_kkrhcxkkrhcxkkrh.png',   caption: 'A Quiet Morning',        location: 'Varanasi' },
  ];

  const track  = document.getElementById('galleryTrack');
  const dotsEl = document.getElementById('galleryDots');
  if (!track || !dotsEl) return;

  // Build slides
  photos.forEach((p, i) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide' + (i === 0 ? ' is-active' : '');
    slide.innerHTML =
      `<img src="${p.src}" alt="${p.caption}" loading="${i === 0 ? 'eager' : 'lazy'}" draggable="false">` +
      `<div class="gallery-caption">` +
        `<span class="gallery-location">${p.location}</span>` +
        `<span class="gallery-caption-text">${p.caption}</span>` +
      `</div>` +
      `<div class="gallery-counter">${i + 1} / ${photos.length}</div>`;
    track.appendChild(slide);
  });

  // Build dots
  photos.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Photo ' + (i + 1));
    dot.addEventListener('click', () => { clearAuto(); goTo(i); startAuto(); });
    dotsEl.appendChild(dot);
  });

  const dots   = dotsEl.querySelectorAll('.gallery-dot');
  const slides = track.querySelectorAll('.gallery-slide');
  let current  = 0;
  let autoTimer;

  function goTo(idx) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('active');
    current = (idx + photos.length) % photos.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides[current].classList.add('is-active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  document.getElementById('galleryNext')?.addEventListener('click', () => { clearAuto(); next(); startAuto(); });
  document.getElementById('galleryPrev')?.addEventListener('click', () => { clearAuto(); prev(); startAuto(); });

  // Touch swipe
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping   = false;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = false;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX);
    const dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (dx > dy && dx > 8) isSwiping = true;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!isSwiping) return;
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) { clearAuto(); (dx > 0 ? next : prev)(); startAuto(); }
    isSwiping = false;
  }, { passive: true });

  // Keyboard nav when gallery is visible
  document.addEventListener('keydown', e => {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    const rect = gallery.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    if (e.key === 'ArrowRight') { clearAuto(); next(); startAuto(); }
    if (e.key === 'ArrowLeft')  { clearAuto(); prev(); startAuto(); }
  });

  // Auto-advance
  function startAuto() { autoTimer = setInterval(next, 4500); }
  function clearAuto()  { clearInterval(autoTimer); }

  // Pause auto when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearAuto(); else startAuto();
  });

  startAuto();
})();

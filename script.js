
(() => {
  'use strict';

  // grab elements
  const $ = (s) => document.querySelector(s);
  const hero = $('#hero');
  const reveal = $('#reveal');
  const btnYes = $('#btn-yes');
  const btnNo = $('#btn-no');
  const cursorDot = $('.cursor__dot');
  const cursorRing = $('.cursor__ring');
  const particlesC = $('#particles');
  const burstC = $('#fx-burst');
  const confettiC = $('#fx-confetti');
  const credit = $('.credit');

  // no button state
  let noCount = 0;
  const noLabels = [
    'No thanks 🤍',
    'Are you sure? 🤔',
    'Think again… 💭',
    "I'd choose YES 😉",
    'Come on… 🥺',
    'Pretty please? 🌹',
    'One more try… 💫',
    'You know you want to 😏',
    'Don\'t break my heart 💔',
    'I\'ll wait forever… ⏳',
    'Say yes already! 🙏',
    'You\'re so close… 🫣',
    'My heart says YES 💓',
    'No is not an option 🚫',
    'FINAL chance… 💘'
  ];

  // custom cursor - dot snaps, ring follows with a delay
  let mx = 0, my = 0, dx = 0, dy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top = my + 'px';
  });

  function followRing() {
    dx += (mx - dx) * .15;
    dy += (my - dy) * .15;
    cursorRing.style.left = dx + 'px';
    cursorRing.style.top = dy + 'px';
    requestAnimationFrame(followRing);
  }
  followRing();

  // small hearts that follow the mouse
  let lastTrail = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 120) return;
    lastTrail = now;

    const h = document.createElement('span');
    h.className = 'trail-heart';
    h.textContent = '♥';
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 900);
  });

  // canvas heart particles in the background
  const pCtx = particlesC.getContext('2d');
  let particles = [];

  function sizeCanvas(c) {
    c.width = innerWidth;
    c.height = innerHeight;
  }

  function spawnParticles() {
    sizeCanvas(particlesC);
    particles = [];
    const n = Math.min(Math.floor(innerWidth / 35), 32);
    for (let i = 0; i < n; i++) particles.push(makeParticle());
  }

  function makeParticle() {
    return {
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: 5 + Math.random() * 9,
      vy: -(0.12 + Math.random() * .35),
      vx: (Math.random() - .5) * .2,
      a: .06 + Math.random() * .12,
      hue: 30 + Math.random() * 320
    };
  }

  // draws a heart shape on canvas
  function heartPath(ctx, x, y, s) {
    ctx.beginPath();
    const t = y - s / 2;
    ctx.moveTo(x, t + s / 4);
    ctx.bezierCurveTo(x, t, x - s / 2, t, x - s / 2, t + s / 4);
    ctx.bezierCurveTo(x - s / 2, t + s / 2, x, t + s, x, t + s);
    ctx.bezierCurveTo(x, t + s, x + s / 2, t + s / 2, x + s / 2, t + s / 4);
    ctx.bezierCurveTo(x + s / 2, t, x, t, x, t + s / 4);
    ctx.closePath();
    ctx.fill();
  }

  function tickParticles() {
    pCtx.clearRect(0, 0, particlesC.width, particlesC.height);
    for (const p of particles) {
      p.y += p.vy;
      p.x += p.vx;
      if (p.y < -20) { p.y = particlesC.height + 20; p.x = Math.random() * particlesC.width; }
      pCtx.fillStyle = `hsla(${p.hue}, 60%, 65%, ${p.a})`;
      heartPath(pCtx, p.x, p.y, p.r);
    }
    requestAnimationFrame(tickParticles);
  }

  spawnParticles();
  tickParticles();

  window.addEventListener('resize', () => {
    sizeCanvas(particlesC);
    sizeCanvas(burstC);
    sizeCanvas(confettiC);
  });

  // background glows follow the mouse slightly
  const ambient = $('.ambient');
  document.addEventListener('mousemove', (e) => {
    const px = (e.clientX / innerWidth - .5) * 18;
    const py = (e.clientY / innerHeight - .5) * 18;
    ambient.style.transform = `translate(${px}px, ${py}px)`;
  });

  // yes - fade out the hero and show the reveal card
  btnYes.addEventListener('click', () => {
    hero.style.transition = 'opacity 0.6s ease';
    hero.style.opacity = '0';
    hero.style.pointerEvents = 'none';
    setTimeout(() => {
      hero.style.display = 'none';
      reveal.classList.add('visible');
      burstHearts();
      showConfetti();
      if (credit) credit.classList.add('show');
    }, 650);
  });

  // no - button runs away and yes grows a little each time
  const noRect0 = btnNo.getBoundingClientRect();
  const noCx0 = noRect0.left + noRect0.width / 2;
  const noCy0 = noRect0.top + noRect0.height / 2;

  btnNo.addEventListener('click', () => {
    noCount++;

    if (noCount < noLabels.length) {
      btnNo.querySelector('span').textContent = noLabels[noCount];

      // take no out of the flex layout so yes stays centered
      if (noCount === 1) {
        btnNo.style.position = 'absolute';
      }

      const pad = 60;
      const bw = noRect0.width;
      const bh = noRect0.height;
      const targetX = pad + Math.random() * (window.innerWidth - bw - pad * 2);
      const targetY = pad + Math.random() * (window.innerHeight - bh - pad * 2);

      const dx = targetX - noCx0 + bw / 2;
      const dy = targetY - noCy0 + bh / 2;
      btnNo.style.transform = `translate(${dx}px, ${dy}px)`;

      // grow yes button a little from the center
      const scale = 1 + noCount * 0.06;
      btnYes.style.transition = 'transform 0.3s ease';
      btnYes.style.transform = `scale(${scale})`;
    }

    if (noCount >= noLabels.length - 1) {
      setTimeout(() => btnNo.classList.add('gone'), 400);
    }
  });

  // heart burst animation that plays when yes is clicked
  function burstHearts() {
    sizeCanvas(burstC);
    const ctx = burstC.getContext('2d');
    const cx = burstC.width / 2, cy = burstC.height / 2;
    const h = [];

    for (let i = 0; i < 55; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 2.5 + Math.random() * 5.5;
      h.push({
        x: cx, y: cy,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        s: 7 + Math.random() * 13,
        a: 1,
        hue: Math.random() > .5 ? (35 + Math.random() * 20) : (340 + Math.random() * 20),
        d: .01 + Math.random() * .012
      });
    }

    (function tick() {
      ctx.clearRect(0, 0, burstC.width, burstC.height);
      let alive = false;
      for (const p of h) {
        if (p.a <= 0) continue;
        alive = true;
        p.x += p.vx; p.y += p.vy; p.vy += .055; p.a -= p.d;
        ctx.fillStyle = `hsla(${p.hue}, 75%, 60%, ${Math.max(p.a, 0)})`;
        heartPath(ctx, p.x, p.y, p.s);
      }
      if (alive) requestAnimationFrame(tick);
    })();
  }

  // confetti that falls when yes is clicked
  function showConfetti() {
    sizeCanvas(confettiC);
    const ctx = confettiC.getContext('2d');
    const colors = ['#d4a853', '#f0d48a', '#c45b7c', '#e8839e', '#f4c2c2', '#ffffff'];
    const pcs = [];

    for (let i = 0; i < 130; i++) {
      pcs.push({
        x: Math.random() * confettiC.width,
        y: -10 - Math.random() * confettiC.height * .5,
        w: 3 + Math.random() * 5,
        h: 7 + Math.random() * 9,
        c: colors[Math.floor(Math.random() * colors.length)],
        sy: 1.2 + Math.random() * 2.8,
        sx: (Math.random() - .5) * 1.8,
        r: Math.random() * 360,
        rv: (Math.random() - .5) * 7,
        a: 1,
        d: .0025 + Math.random() * .003
      });
    }

    (function tick() {
      ctx.clearRect(0, 0, confettiC.width, confettiC.height);
      let alive = false;
      for (const p of pcs) {
        if (p.a <= 0) continue;
        alive = true;
        p.x += p.sx; p.y += p.sy; p.r += p.rv; p.a -= p.d;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r * Math.PI / 180);
        ctx.globalAlpha = Math.max(p.a, 0);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive) requestAnimationFrame(tick);
    })();
  }

})();

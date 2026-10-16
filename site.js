/* =========================================================
   Shared site script: nav, footer, pager, recording intro,
   live spiking network, axon timeline, reveals, lightbox.
   To add a page: create the HTML file, then add an entry below.
   ========================================================= */

const SITE = {
  name: "Kyle Klugewicz",
  email: "kyle.klugewicz@columbia.edu",
  linkedin: "https://www.linkedin.com/in/kyle-klugewicz/",
  github: "https://github.com/kklugewicz",
  resume: "assets/Klugewicz_Resume.pdf",
  projects: [
    { slug: "ecog-decoder",      title: "Edge ECoG Finger Decoder",     note: "Neural decoding research" },
    { slug: "eeg-headband",      title: "Portable EEG Headband",        note: "BCI hardware · junior design" },
    { slug: "battery-cycler",    title: "Lithium Battery Cycler",       note: "Power electronics · capstone" },
    { slug: "dual-band-antenna", title: "Dual-Band Patch Antenna",      note: "RF · 2.45 / 5 GHz" },
    { slug: "robotics-control",  title: "Sliding-Mode Robot Control",   note: "Nonlinear control · graduate" },
    { slug: "detection-system",  title: "Motorized Detection System",   note: "Embedded · sophomore design" },
  ],
  experience: [
    { slug: "utari",            title: "UTARI Hand Exoskeleton",        note: "Research Assistant · 2026" },
    { slug: "oncor",            title: "Oncor Electric Delivery",       note: "Asset Management Intern · 2026" },
    { slug: "power-engineers",  title: "POWER Engineers",               note: "Distribution Design Intern · 2025" },
    { slug: "misonix",          title: "Misonix (Bioventus)",           note: "R&D Engineering Intern · 2020–22" },
  ],
};

const ICONS = {
  github: '<svg viewBox="0 0 24 24"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  email: '<svg viewBox="0 0 24 24"><path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2 .9V18h16V6.4l-8 6.2-8-6.2ZM5.6 6l6.4 5 6.4-5H5.6Z"/></svg>',
  resume: '<svg viewBox="0 0 24 24"><path d="M6 2h8l6 6v12.5A1.5 1.5 0 0 1 18.5 22h-13A1.5 1.5 0 0 1 4 20.5v-17A1.5 1.5 0 0 1 5.5 2H6Zm7 1.5V9h5.5L13 3.5ZM7 12v1.6h10V12H7Zm0 3.4V17h10v-1.6H7Zm0 3.4v1.6h6.5v-1.6H7Z"/></svg>',
  // little ink neuron used as the logo
  neuron: '<svg viewBox="0 0 32 32" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M16 13V3M16 6l-3-3M16 8l4-4M13 18l-8 3M9 19.5l-4-3M19 18l5 6v5M24 24l4-1"/></g><path class="soma" d="M16 11.5c2.6 0 5 3.4 5 6.2 0 1.8-2.2 2.6-5 2.6s-5-.8-5-2.6c0-2.8 2.4-6.2 5-6.2Z" fill="currentColor"/></svg>',
};

const root = document.body.dataset.root || "";
const page = document.body.dataset.page || "home";
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function socialLinks() {
  const items = [
    SITE.github && [SITE.github, "GitHub", ICONS.github],
    [SITE.linkedin, "LinkedIn", ICONS.linkedin],
    ["mailto:" + SITE.email, "Email", ICONS.email],
    [root + SITE.resume, "Résumé (PDF)", ICONS.resume],
  ].filter(Boolean);
  return items.map(([href, label, svg]) =>
    `<li><a href="${href}" aria-label="${label}" title="${label}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${svg}</a></li>`
  ).join("");
}

function menu(label, folder, list) {
  const active = list.some(p => p.slug === page);
  const links = list.map(p =>
    `<a href="${root}${folder}/${p.slug}.html"${p.slug === page ? ' class="active"' : ""}>${p.title}<small>${p.note}</small></a>`
  ).join("");
  return `<li class="has-menu${active ? " current" : ""}">
    <button type="button" aria-expanded="false">${label}<span class="caret">▼</span></button>
    <div class="dropdown">${links}</div></li>`;
}

function renderNav() {
  const home = root + "index.html";
  const el = document.getElementById("site-nav");
  if (!el) return;
  el.outerHTML = `
  <nav class="site-nav" id="nav">
    <div class="inner">
      <a class="brand" href="${home}#top">${ICONS.neuron}<span>kyle klugewicz</span></a>
      <button class="menu-toggle" aria-label="Menu">menu</button>
      <ul>
        <li${page === "home" ? ' class="current"' : ""}><a href="${home}#top">home</a></li>
        <li><a href="${home}#about">about</a></li>
        ${menu("projects", "projects", SITE.projects)}
        ${menu("experience", "experience", SITE.experience)}
        <li><a href="${home}#contact">contact</a></li>
      </ul>
    </div>
  </nav>`;

  const nav = document.getElementById("nav");
  const toggle = nav.querySelector(".menu-toggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("menu-open");
    toggle.textContent = open ? "close" : "menu";
  });
  nav.querySelectorAll(".has-menu > button").forEach(btn => btn.addEventListener("click", () => {
    const li = btn.parentElement;
    const open = !li.classList.contains("open");
    nav.querySelectorAll(".has-menu").forEach(m => m.classList.remove("open"));
    li.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
  }));
  nav.querySelectorAll("ul a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("menu-open");
    toggle.textContent = "menu";
  }));
  document.addEventListener("click", e => {
    if (!nav.contains(e.target)) nav.querySelectorAll(".has-menu").forEach(m => m.classList.remove("open"));
  });
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.outerHTML = `
  <footer class="site-footer">
    <div class="inner">
      <ul class="social">${socialLinks()}</ul>
      <span class="flat">© ${new Date().getFullYear()} ${SITE.name} · New York, NY
        <svg viewBox="0 0 90 18" aria-hidden="true"><path d="M0 10h36l4-8 5 14 4-6h41"/></svg></span>
    </div>
  </footer>`;
  document.querySelectorAll("[data-social]").forEach(ul => ul.innerHTML = socialLinks());
}

// Previous / next links at the bottom of detail pages
function renderPager() {
  const el = document.getElementById("pager");
  if (!el) return;
  const folder = SITE.projects.some(p => p.slug === page) ? "projects" : "experience";
  const list = SITE[folder];
  const i = list.findIndex(p => p.slug === page);
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  const kind = folder === "projects" ? "project" : "role";
  el.outerHTML = `
  <nav class="pager">
    <a href="${prev.slug}.html"><small>← previous ${kind}</small><span>${prev.title}</span></a>
    <a href="${next.slug}.html"><small>next ${kind} →</small><span>${next.title}</span></a>
  </nav>`;
}

// Small seeded random generator so the drawn neurons look the same on every visit
function rng(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* ---------------------------------------------------------
   Opening "recording": an EEG chart recorder that scribbles
   eight channels, catches a burst, then peels away.
   Homepage only, once per visit, skippable.
   --------------------------------------------------------- */
function recordingIntro(onDone) {
  let seen = false;
  try { seen = sessionStorage.getItem("kk-intro") === "1"; } catch (e) {}
  if (page !== "home" || reducedMotion || seen || location.hash) { onDone(); return; }

  const box = document.createElement("div");
  box.className = "rec-intro";
  box.innerHTML = `
    <canvas></canvas>
    <div class="rec-head"><span><span class="rec-dot"></span>REC · session 001 · subject: kyle</span><span>8 ch · double-banana montage</span></div>
    <div class="rec-log" aria-live="polite"></div>
    <button class="skip" type="button">skip intro ⏭</button>`;
  document.body.appendChild(box);
  document.documentElement.style.overflow = "hidden";

  const canvas = box.querySelector("canvas"), ctx = canvas.getContext("2d");
  const log = box.querySelector(".rec-log");
  const labels = ["Fp1–F7", "F7–T3", "T3–T5", "T5–O1", "Fp2–F8", "F8–T4", "T4–T6", "T6–O2"];
  const R = rng(7);
  const seeds = labels.map(() => Array.from({ length: 4 }, () => [R() * 6, 0.5 + R() * 2.2]));
  let w, h, dpr, penX, labelW, hist, t = 0, frame = 0, finished = false;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    labelW = w < 640 ? 66 : 92;
    penX = Math.round(w * (w < 640 ? .9 : .8));
    hist = labels.map(() => new Array(Math.max(1, penX - labelW)).fill(0));
  }
  resize();
  addEventListener("resize", resize);

  const lines = [
    [0, "$ kk-eeg --subject kyle --loading education, work experience, projects...  "],
    [32, "› waking up the analog front end ...... <span class=ok>ok</span>"],
    [70, "› checking electrode contact .......... <span class=ok>ok</span>"],
    [108, "› streaming 8 channels"],
    [150, "› event detected: curiosity spike ⚡"],
    [196, "› opening kyle's notebook"],
  ];

  function sample(c, x) {
    const sec = frame / 60;
    let v = 0;
    for (const [ph, f] of seeds[c]) v += Math.sin(x * f * 0.09 + ph) / (1 + f);
    v += (R() - .5) * .35;
    let amp = Math.min(1, Math.max(0, (sec - .35) * 1.8));
    // the "event": a synchronized spike-and-wave burst on every channel
    const ev = sec - 2.55;
    if (ev > 0 && ev < .9) {
      const k = Math.sin(ev / .9 * Math.PI);
      v += k * (Math.sin(ev * 38 + c * .2) > .55 ? 1.9 : -.8);
    }
    if (sec > 3.5) amp *= Math.max(0, 1 - (sec - 3.5) * 2);
    return v * amp;
  }

  let t0 = null;
  function draw(now) {
    if (finished) return;
    if (t0 === null) t0 = now;
    // advance in 60 Hz ticks so 120 Hz screens don't play it double speed
    const target = Math.floor((now - t0) / (1000 / 60));
    if (target === frame) { requestAnimationFrame(draw); return; }
    const ticks = Math.min(target - frame, 4);
    frame = target;
    const speed = 3 * ticks;
    for (let c = 0; c < labels.length; c++) {
      const hc = hist[c];
      for (let s = 0; s < speed; s++) { hc.shift(); hc.push(sample(c, t + s)); }
    }
    t += speed;
    ctx.fillStyle = "#f7f1e3"; ctx.fillRect(0, 0, w, h);
    // moving chart paper
    const off = t % 40;
    for (let x = labelW - off + 40; x < w; x += 8) {
      const major = Math.round((x + off - labelW) / 8) % 5 === 0;
      ctx.strokeStyle = major ? "rgba(226,70,44,.20)" : "rgba(226,70,44,.08)";
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 8) {
      ctx.strokeStyle = y % 40 === 0 ? "rgba(226,70,44,.20)" : "rgba(226,70,44,.08)";
      ctx.beginPath(); ctx.moveTo(labelW, y); ctx.lineTo(w, y); ctx.stroke();
    }
    const top = box.querySelector(".rec-head").offsetHeight + 50, bottom = h - (w < 640 ? 230 : 170);
    const gap = (bottom - top) / (labels.length - 1);
    ctx.font = `500 ${w < 640 ? 10.5 : 12}px "IBM Plex Mono", monospace`;
    for (let c = 0; c < labels.length; c++) {
      const y0 = top + gap * c;
      ctx.fillStyle = "#463c33"; ctx.fillText(labels[c], 12, y0 + 4);
      ctx.beginPath();
      const hc = hist[c], n = hc.length;
      for (let i = 0; i < n; i++) {
        const x = labelW + i, y = y0 + Math.max(-1.4, Math.min(1.4, hc[i])) * gap * .32;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = c === 0 ? "#e2462c" : "#1f1a16"; ctx.lineWidth = 1.3; ctx.stroke();
      // the pen
      const py = y0 + Math.max(-1.4, Math.min(1.4, hc[n - 1])) * gap * .32;
      ctx.beginPath(); ctx.moveTo(penX, py); ctx.lineTo(penX + 26, py - 10);
      ctx.strokeStyle = "#7b6f62"; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(penX, py, 2.4, 0, 7); ctx.fillStyle = "#1f1a16"; ctx.fill();
    }
    // typed log
    let html = "";
    for (const [at, text] of lines) {
      if (frame < at) break;
      const plain = text.replace(/<[^>]+>/g, "");
      const shown = Math.min(plain.length, (frame - at) * 2);
      html += (shown >= plain.length ? text : plain.slice(0, shown)) + "\n";
    }
    log.innerHTML = html.trimEnd();
    if (frame > 236) return finish();
    requestAnimationFrame(draw);
  }

  function finish() {
    if (finished) return;
    finished = true;
    try { sessionStorage.setItem("kk-intro", "1"); } catch (e) {}
    box.classList.add("done");
    document.documentElement.style.overflow = "";
    removeEventListener("resize", resize);
    onDone();
    setTimeout(() => box.remove(), 1000);
  }
  box.querySelector(".skip").addEventListener("click", finish);
  addEventListener("keydown", function esc(e) { if (e.key === "Escape") { finish(); removeEventListener("keydown", esc); } });
  requestAnimationFrame(draw);
}

/* ---------------------------------------------------------
   Fig. 1: a small leaky integrate-and-fire network drawn in
   Cajal-style ink. Click/tap a neuron to fire it; hovering
   near one slowly charges it up.
   --------------------------------------------------------- */
function spikingNetwork() {
  const canvas = document.getElementById("network");
  if (!canvas) return { kick() {} };
  const raster = document.getElementById("raster");
  const ctx = canvas.getContext("2d"), rctx = raster.getContext("2d");
  const counter = document.getElementById("spike-count");
  const INK = "#1f1a16", SPIKE = css("--spike") || "#e2462c";
  let w, h, dpr, neurons = [], conns = [], spikes = [], events = [], layer, count = 0, frame = 0;
  let running = false, visible = true, pointer = null;

  function grow(R, list, x, y, ang, len, width, depth) {
    const steps = 5, pts = [[x, y]];
    for (let s = 0; s < steps; s++) {
      ang += (R() - .5) * .5;
      x += Math.cos(ang) * len / steps; y += Math.sin(ang) * len / steps;
      pts.push([x, y]);
    }
    list.push({ pts, w0: width, w1: width * .62 });
    if (depth > 0) {
      const spread = .35 + R() * .45;
      grow(R, list, x, y, ang - spread, len * (.62 + R() * .2), width * .62, depth - 1);
      grow(R, list, x, y, ang + spread, len * (.62 + R() * .2), width * .62, depth - 1);
    }
  }

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    raster.width = raster.clientWidth * dpr; raster.height = raster.clientHeight * dpr;
    const R = rng(42);
    const N = Math.max(8, Math.min(15, Math.round(w * h / 15000)));
    const minD = Math.sqrt(w * h / N) * .72;
    neurons = [];
    for (let tries = 0; neurons.length < N && tries < 4000; tries++) {
      const x = 34 + R() * (w - 68), y = 48 + R() * (h - 84);
      if (neurons.every(n => Math.hypot(n.x - x, n.y - y) > minD)) {
        const r = 5 + R() * 2.5, dend = [];
        grow(R, dend, x, y - r, -Math.PI / 2 + (R() - .5) * .5, 26 + R() * 22, 2.2, 2); // apical
        const basal = 3 + Math.floor(R() * 2);
        for (let b = 0; b < basal; b++) grow(R, dend, x, y + r * .4, Math.PI * (.15 + .7 * (b + R() * .6) / basal), 14 + R() * 12, 1.6, 1 + (R() > .5));
        neurons.push({ x, y, r, dend, v: R() * .5, refr: 0, flash: 0, wob: Array.from({ length: 8 }, () => .85 + R() * .3) });
      }
    }
    conns = [];
    neurons.forEach((a, i) => {
      const near = neurons.map((b, j) => [Math.hypot(a.x - b.x, a.y - b.y), j]).filter(([, j]) => j !== i).sort((p, q) => p[0] - q[0]);
      const k = 2 + (R() > .55 ? 1 : 0);
      near.slice(0, k).forEach(([d, j]) => {
        const b = neurons[j], mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const bend = (R() - .5) * .5 * d;
        conns.push({ a: i, b: j, cx: mx - (b.y - a.y) / d * bend, cy: my + (b.x - a.x) / d * bend, len: d * 1.1, wt: .3 + R() * .25 });
      });
    });
    neurons.forEach((n, i) => n.out = conns.filter(c => c.a === i));

    layer = document.createElement("canvas");
    layer.width = canvas.width; layer.height = canvas.height;
    const l = layer.getContext("2d");
    l.setTransform(dpr, 0, 0, dpr, 0, 0);
    l.lineCap = "round"; l.lineJoin = "round";
    l.strokeStyle = "rgba(31,26,22,.26)"; l.lineWidth = .9; l.setLineDash([2, 3]);
    conns.forEach(c => { const a = neurons[c.a], b = neurons[c.b]; l.beginPath(); l.moveTo(a.x, a.y); l.quadraticCurveTo(c.cx, c.cy, b.x, b.y); l.stroke(); });
    l.setLineDash([]);
    neurons.forEach(n => drawCell(l, n, "rgba(31,26,22,.88)"));
    if (reducedMotion) paint();
  }

  function drawCell(g, n, color) {
    g.strokeStyle = color; g.fillStyle = color;
    n.dend.forEach(seg => {
      const k = seg.pts.length - 1;
      for (let i = 0; i < k; i++) {
        g.lineWidth = seg.w0 + (seg.w1 - seg.w0) * i / k;
        g.beginPath(); g.moveTo(...seg.pts[i]); g.lineTo(...seg.pts[i + 1]); g.stroke();
      }
    });
    g.beginPath();
    n.wob.forEach((m, i) => {
      const a = i / n.wob.length * Math.PI * 2 - Math.PI / 2;
      const rr = n.r * m * (i === 0 ? 1.5 : 1); // pointy top like a pyramidal cell
      const x = n.x + Math.cos(a) * rr, y = n.y + Math.sin(a) * rr;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    });
    g.closePath(); g.fill();
  }

  function fire(n) {
    if (n.refr > 0) return;
    n.v = 0; n.refr = 34; n.flash = 1;
    count++; if (counter) counter.textContent = count;
    events.push({ i: neurons.indexOf(n), f: frame });
    n.out.forEach(c => spikes.push({ c, t: 0 }));
  }

  function pointAt(c, t) {
    const a = neurons[c.a], b = neurons[c.b], u = 1 - t;
    return [u * u * a.x + 2 * u * t * c.cx + t * t * b.x, u * u * a.y + 2 * u * t * c.cy + t * t * b.y];
  }

  function step() {
    frame++;
    neurons.forEach(n => {
      if (n.refr > 0) n.refr--;
      n.v *= .993;
      if (Math.random() < .0022) n.v += .55;
      if (pointer && Math.hypot(pointer[0] - n.x, pointer[1] - n.y) < 46) n.v += .03;
      n.flash = Math.max(0, n.flash - .028);
      if (n.v >= 1) fire(n);
    });
    spikes = spikes.filter(s => {
      s.t += 2.4 / s.c.len;
      if (s.t < 1) return true;
      const n = neurons[s.c.b];
      if (!n.refr) n.v += s.c.wt;
      return false;
    });
    events = events.filter(e => frame - e.f < 900);
  }

  function paint() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(layer, 0, 0, w, h);
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    neurons.forEach(n => {
      if (n.flash > 0) {
        ctx.globalAlpha = n.flash;
        drawCell(ctx, n, SPIKE);
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 6 + (1 - n.flash) * 26, 0, 7);
        ctx.strokeStyle = SPIKE; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.globalAlpha = 1;
      }
      if (n.v > .05) { // membrane charge
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 5, -Math.PI / 2, -Math.PI / 2 + Math.min(1, n.v) * Math.PI * 2);
        ctx.strokeStyle = "rgba(90,61,154,.75)"; ctx.lineWidth = 2; ctx.stroke();
      }
    });
    spikes.forEach(s => {
      for (let k = 3; k >= 0; k--) {
        const [x, y] = pointAt(s.c, Math.max(0, s.t - k * .035));
        ctx.globalAlpha = k ? .22 * (4 - k) / 3 : 1;
        ctx.beginPath(); ctx.arc(x, y, k ? 2.4 : 3.4, 0, 7); ctx.fillStyle = SPIKE; ctx.fill();
      }
      ctx.globalAlpha = 1;
    });
    // raster
    const rw = raster.width / dpr, rh = raster.height / dpr;
    rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rctx.clearRect(0, 0, rw, rh);
    const rowH = (rh - 16) / neurons.length;
    rctx.font = '500 10px "IBM Plex Mono", monospace'; rctx.fillStyle = "#7b6f62";
    rctx.fillText("raster · last 15 s", 10, rh - 4);
    events.forEach(e => {
      const x = rw - 8 - (frame - e.f) / 900 * (rw - 16), y = 6 + e.i * rowH;
      rctx.fillStyle = frame - e.f < 40 ? SPIKE : INK;
      rctx.fillRect(x, y, 1.6, Math.max(2, rowH - 1.5));
    });
  }

  let last = null, acc = 0;
  function loop(now) {
    if (!running) return;
    if (last !== null) acc += Math.min(now - last, 100);
    last = now;
    // fixed 60 Hz simulation steps, whatever the screen's refresh rate
    while (acc >= 1000 / 60) { step(); acc -= 1000 / 60; }
    paint();
    requestAnimationFrame(loop);
  }
  function start() {
    if (running || reducedMotion || !visible) return;
    running = true; last = null; requestAnimationFrame(loop);
  }

  build();
  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (canvas.clientWidth !== w) build(); }, 150); });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else running = false; }).observe(canvas);

  const pos = e => { const b = canvas.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
  canvas.addEventListener("pointermove", e => { if (e.pointerType === "mouse") pointer = pos(e); });
  canvas.addEventListener("pointerleave", () => pointer = null);
  canvas.addEventListener("pointerdown", e => {
    const [x, y] = pos(e);
    let best = null, bd = 70;
    neurons.forEach(n => { const d = Math.hypot(n.x - x, n.y - y); if (d < bd) { bd = d; best = n; } });
    if (best) { best.refr = 0; fire(best); if (reducedMotion) paint(); }
  });

  return {
    kick() {
      start();
      [0, 1].forEach(k => setTimeout(() => neurons[Math.floor(Math.random() * neurons.length)] && fire(neurons[Math.floor(Math.random() * neurons.length)]), 300 + k * 500));
    },
  };
}

// Experience timeline: each node "fires" as it scrolls into view
function axonTimeline() {
  const items = document.querySelectorAll(".tl > li");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) { items.forEach(li => li.classList.add("fired")); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("fired"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -35% 0px" });
  items.forEach(li => io.observe(li));
}

function reveals() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reducedMotion) { els.forEach(el => el.classList.add("in")); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach(el => io.observe(el));
}

// Click a gallery image to view it large
function lightbox() {
  const links = document.querySelectorAll(".gallery a, a.zoom");
  if (!links.length) return;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<button aria-label="Close">×</button><img alt=""><p></p>';
  document.body.appendChild(box);
  const img = box.querySelector("img"), cap = box.querySelector("p");
  const close = () => box.classList.remove("open");
  links.forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    img.src = a.href;
    img.alt = a.querySelector("img")?.alt || "";
    cap.textContent = a.parentElement.querySelector("figcaption")?.textContent || "";
    box.classList.add("open");
  }));
  box.addEventListener("click", e => { if (e.target !== img) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

renderNav();
renderFooter();
renderPager();
reveals();
axonTimeline();
lightbox();
const network = spikingNetwork();
recordingIntro(() => network.kick());

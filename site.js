/* =========================================================
   Shared site script: nav, footer, pager, hero animation, lightbox.
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
    { slug: "utari",            title: "UTARI Rehabilitation Robotics", note: "Research Assistant · 2026" },
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
};

const root = document.body.dataset.root || "";
const page = document.body.dataset.page || "home";

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
      <a class="brand" href="${home}#top">${SITE.name}</a>
      <button class="menu-toggle" aria-label="Menu">☰</button>
      <ul>
        <li${page === "home" ? ' class="current"' : ""}><a href="${home}#top">Home</a></li>
        <li><a href="${home}#about">About</a></li>
        ${menu("Projects", "projects", SITE.projects)}
        ${menu("Experience", "experience", SITE.experience)}
        <li><a href="${home}#contact">Contact</a></li>
      </ul>
    </div>
  </nav>`;

  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("solid", window.scrollY > 40 || page !== "home");
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  nav.querySelector(".menu-toggle").addEventListener("click", () => nav.classList.toggle("menu-open"));
  nav.querySelectorAll(".has-menu > button").forEach(btn => btn.addEventListener("click", () => {
    const li = btn.parentElement;
    const open = !li.classList.contains("open");
    nav.querySelectorAll(".has-menu").forEach(m => m.classList.remove("open"));
    li.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
  }));
  nav.querySelectorAll("ul a").forEach(a => a.addEventListener("click", () => nav.classList.remove("menu-open")));
  document.addEventListener("click", e => {
    if (!nav.contains(e.target)) nav.querySelectorAll(".has-menu").forEach(m => m.classList.remove("open"));
  });
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.outerHTML = `
  <footer class="site-footer">
    <ul class="social">${socialLinks()}</ul>
    <p>© ${new Date().getFullYear()} ${SITE.name} · New York, NY</p>
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
    <a href="${prev.slug}.html"><small>← Previous ${kind}</small><span>${prev.title}</span></a>
    <a href="${next.slug}.html"><small>Next ${kind} →</small><span>${next.title}</span></a>
  </nav>`;
}

// Animated multichannel "neural signal" traces behind the home hero
function heroSignals() {
  const canvas = document.getElementById("signals");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CH = 10;
  let w, h, dpr, t = 0;
  const seeds = Array.from({ length: CH }, () => Array.from({ length: 5 }, () => [Math.random() * 6, 0.6 + Math.random() * 5]));

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const gap = h / (CH + 1);
    for (let c = 0; c < CH; c++) {
      const y0 = gap * (c + 1);
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const u = x / w * 10 + t;
        let v = 0;
        for (const [ph, f] of seeds[c]) v += Math.sin(u * f + ph) / f;
        // occasional "burst" sweeping across, like a movement-related event
        const burst = Math.exp(-(((x / w) - ((t * 0.05 + c * 0.013) % 1.4) + 0.2) ** 2) / 0.004);
        v += burst * Math.sin(u * 14) * 0.9;
        const y = y0 + v * gap * 0.32;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = c === CH - 3 ? "rgba(240,96,0,0.55)" : "rgba(17,171,176,0.32)";
      ctx.lineWidth = c === CH - 3 ? 1.8 : 1.2;
      ctx.stroke();
    }
    t += 0.008;
    if (!still) requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener("resize", () => { resize(); if (still) draw(); });
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
heroSignals();
lightbox();

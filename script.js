/* ═══════════════════════════════════════════════════════════
   PILAR MARTÍNEZ — PORTFOLIO 2026 · Interacciones
   ═══════════════════════════════════════════════════════════ */
"use strict";

document.documentElement.classList.add("js");

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const lerp = (a, b, n) => a + (b - a) * n;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Tema (dark / light) ─────────────────────────────────── */
const themeToggle = $("#themeToggle");
const savedTheme = localStorage.getItem("pm-theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
  document.documentElement.dataset.theme = "dark";

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("pm-theme", next);
});

/* ── Split text (nombre hero) ────────────────────────────── */
$$(".split").forEach((el) => {
  const text = el.textContent;
  el.textContent = "";
  [...text].forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "char";
    span.style.transitionDelay = `${0.06 + i * 0.035}s`;
    span.textContent = ch === " " ? " " : ch;
    el.appendChild(span);
  });
});

/* ── Statement palabra por palabra ───────────────────────── */
const statement = $("#statement");
if (statement) {
  const words = statement.textContent.trim().split(/\s+/);
  statement.innerHTML = words
    .map((w) => `<span class="word">${w}</span>`)
    .join(" ");
}

/* ── Auto-ajuste del sello circular ──────────────────────── */
const ringPath = $("#circlePath");
const ringText = $("#ringTextPath");
if (ringPath && ringText) {
  const fitRingText = () => {
    try {
      const circumference = ringPath.getTotalLength();
      const chars = ringText.textContent.trim().length;
      const fs = parseFloat(getComputedStyle(ringText).fontSize) || 15.5;
      let ls = 0.2; // em
      for (let i = 0; i < 4; i++) {
        ringText.style.letterSpacing = `${ls}em`;
        const delta = circumference - ringText.getComputedTextLength();
        ls = Math.max(-0.04, ls + delta / chars / fs);
      }
      ringText.style.letterSpacing = `${ls}em`;
    } catch (e) {
      /* fallback: se mantiene el espaciado base del CSS */
    }
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitRingText);
  else setTimeout(fitRingText, 600);
}

/* ── Preloader ───────────────────────────────────────────── */
const preloader = $("#preloader");
const preCount = $("#preloaderCount");
let progress = 0;
const preTick = () => {
  progress = Math.min(100, progress + Math.random() * 16 + 4);
  preCount.textContent = Math.floor(progress);
  if (progress < 100) setTimeout(preTick, 90 + Math.random() * 120);
  else {
    preCount.textContent = "100";
    setTimeout(() => {
      preloader.classList.add("is-done");
      $("#hero").classList.add("is-in");
    }, 250);
  }
};
if (reduceMotion) {
  preloader.remove();
  $("#hero").classList.add("is-in");
} else {
  document.body.style.overflow = "hidden";
  preTick();
  preloader.addEventListener("animationend", (e) => {
    if (e.animationName === "preFade") document.body.style.overflow = "";
  });
  setTimeout(() => (document.body.style.overflow = ""), 1600);
}

/* ── Cursor personalizado ────────────────────────────────── */
const dot = $("#cursorDot");
const ring = $("#cursorRing");
if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  }, { passive: true });
  (function ringLoop() {
    rx = lerp(rx, mx, 0.16);
    ry = lerp(ry, my, 0.16);
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(ringLoop);
  })();
  $$("[data-hover]").forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
} else {
  dot.remove(); ring.remove();
}

/* ── Botones magnéticos ──────────────────────────────────── */
if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
  $$(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transition = "transform .5s cubic-bezier(.34,1.56,.64,1)";
      btn.style.transform = "";
      setTimeout(() => (btn.style.transition = ""), 500);
    });
  });
}

/* ── Tilt en la foto ─────────────────────────────────────── */
const tilt = $("#photoTilt");
if (tilt && window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
  tilt.addEventListener("mousemove", (e) => {
    const r = tilt.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${py * -10}deg)`;
  });
  tilt.addEventListener("mouseleave", () => {
    tilt.style.transition = "transform .8s cubic-bezier(.22,1,.36,1)";
    tilt.style.transform = "";
    setTimeout(() => (tilt.style.transition = ""), 800);
  });
}

/* ── Flip card de contacto ───────────────────────────────── */
const flipCard = $("#flipCard");
const flipBtn = $("#flipBtn");
const flipWrap = $("#photoTilt");
if (flipCard && flipWrap) {
  const toggleFlip = () => {
    const on = flipCard.classList.toggle("is-flipped");
    flipWrap.classList.toggle("is-flipped", on);
    flipCard.setAttribute("aria-pressed", String(on));
  };
  flipCard.addEventListener("click", (e) => {
    if (e.target.closest("a")) return; // los links del dorso funcionan normal
    toggleFlip();
  });
  flipCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  });
  if (flipBtn) flipBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFlip();
  });
}

/* ── Reveal on scroll (IntersectionObserver) ─────────────── */
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add("is-in");
      io.unobserve(en.target);
    }
  }),
  { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
);
$$(".reveal, .section__head").forEach((el) => io.observe(el));

/* ── Contadores ──────────────────────────────────────────── */
const counters = $$(".counter");
const cio = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const target = +el.dataset.target;
    const t0 = performance.now();
    const dur = 1400;
    (function tick(t) {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    cio.unobserve(el);
  }),
  { threshold: 0.6 }
);
counters.forEach((c) => cio.observe(c));

/* ── Scroll: progress, nav, timeline, statement ──────────── */
const nav = $("#nav");
const progressBar = $("#scrollProgress");
const timeline = $("#timeline");
const tlProgress = $("#timelineProgress");
const words = $$(".word", statement || document.createElement("div"));
let lastY = 0;
let ticking = false;

function onScroll() {
  const y = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;

  // Barra de progreso
  progressBar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

  // Nav: fondo + ocultar al bajar
  nav.classList.toggle("is-scrolled", y > 40);
  if (y > lastY && y > 300) nav.classList.add("is-hidden");
  else nav.classList.remove("is-hidden");
  lastY = y;

  // Línea de la timeline
  if (timeline) {
    const r = timeline.getBoundingClientRect();
    const start = innerHeight * 0.75;
    const p = Math.min(1, Math.max(0, (start - r.top) / r.height));
    tlProgress.style.transform = `scaleY(${p})`;
  }

  // Statement: iluminar palabras según scroll
  if (statement && words.length) {
    const r = statement.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
    const lit = Math.floor(p * words.length);
    words.forEach((w, i) => w.classList.toggle("is-lit", i <= lit));
  }
  ticking = false;
}
addEventListener("scroll", () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });
onScroll();

/* ── Menú mobile ─────────────────────────────────────────── */
const burger = $("#burger");
const mobileMenu = $("#mobileMenu");
burger.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("is-open");
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open);
  mobileMenu.setAttribute("aria-hidden", !open);
  document.body.style.overflow = open ? "hidden" : "";
});
$$(".mobile-menu__links a").forEach((a, i) => {
  a.style.transitionDelay = `${0.12 + i * 0.06}s`;
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

/* ── Volver arriba ───────────────────────────────────────── */
$("#toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

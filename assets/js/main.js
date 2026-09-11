/* ==========================================================================
   HERMELA — MAIN.JS
   Central motion engine, shared by all seven pages.
   No inline handlers anywhere — everything wires here via addEventListener,
   so this file maps 1:1 onto a future useEffect/hook layer.
   See /blueprint.md §2 "Motion System" for the intent behind each block.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     0. REDUCED MOTION GATE
     Runs first. Every other block below checks REDUCED before animating.
     ------------------------------------------------------------------------ */
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  let REDUCED = mql.matches;
  document.body.setAttribute("data-motion", REDUCED ? "reduced" : "enabled");
  mql.addEventListener("change", (e) => {
    REDUCED = e.matches;
    document.body.setAttribute("data-motion", REDUCED ? "reduced" : "enabled");
    location.reload();
  });

  const hasGSAP = typeof gsap !== "undefined";
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if (hasGSAP && window.Flip) gsap.registerPlugin(Flip);

  /* ------------------------------------------------------------------------
     1. LENIS SMOOTH SCROLL BOOT
     ------------------------------------------------------------------------ */
  let lenis = null;
  if (!REDUCED && typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenis.on("scroll", () => {
      if (window.ScrollTrigger) ScrollTrigger.update();
      handleVelocitySkew(lenis.velocity);
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (hasGSAP) gsap.ticker.add((time) => lenis.raf(time * 1000));
  }
  window.__lenis = lenis;

  /* ------------------------------------------------------------------------
     2. FILM GRAIN OVERLAY (animated SVG feTurbulence, ~4.5% opacity, fixed)
     ------------------------------------------------------------------------ */
  const grainHost = document.getElementById("film-grain");
  if (grainHost) {
    grainHost.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="grainFilter">
          <feTurbulence id="grainTurb" type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>`;
    if (!REDUCED) {
      let step = 0;
      setInterval(() => {
        step = (step + 1) % 6;
        const turb = document.getElementById("grainTurb");
        if (turb) turb.setAttribute("seed", String(step * 7 + 1));
      }, 130);
    }
  }

  /* ------------------------------------------------------------------------
     3. CUSTOM CURSOR — lerped follow + state morph
     ------------------------------------------------------------------------ */
  const cursor = document.getElementById("custom-cursor");
  if (cursor && !REDUCED && window.matchMedia("(hover: hover)").matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const state = el.getAttribute("data-cursor");
        cursor.setAttribute("data-state", state);
        const label = el.getAttribute("data-cursor-label");
        cursor.innerHTML = label ? `<span class="cursor-label">${label}</span>` : "";
      });
      el.addEventListener("mouseleave", () => {
        cursor.setAttribute("data-state", "default");
        cursor.innerHTML = "";
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. NAV — toggle + magnetic underline handled in §6
     ------------------------------------------------------------------------ */
  const navToggle = document.getElementById("nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = document.body.getAttribute("data-nav-state") === "open";
      document.body.setAttribute("data-nav-state", open ? "closed" : "open");
      if (lenis) open ? lenis.start() : lenis.stop();
    });
    document.querySelectorAll("#nav-overlay a").forEach((a) => {
      a.addEventListener("click", () => {
        document.body.setAttribute("data-nav-state", "closed");
        if (lenis) lenis.start();
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. CURTAIN PAGE TRANSITION (clip-path circle reveal from click origin)
     ------------------------------------------------------------------------ */
  const curtain = document.getElementById("curtain");
  document.querySelectorAll("a[data-transition]").forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = a.getAttribute("href");
      if (!href || a.target === "_blank" || REDUCED || !curtain) return;
      e.preventDefault();
      const rect = a.getBoundingClientRect();
      curtain.style.setProperty("--curtain-x", `${rect.left + rect.width / 2}px`);
      curtain.style.setProperty("--curtain-y", `${rect.top + rect.height / 2}px`);
      curtain.style.transition = "clip-path 0.7s cubic-bezier(0.16,1,0.3,1)";
      curtain.style.clipPath = `circle(150% at var(--curtain-x) var(--curtain-y))`;
      setTimeout(() => { window.location.href = href; }, 640);
    });
  });
  window.addEventListener("pageshow", () => {
    if (curtain) curtain.style.clipPath = "circle(0% at var(--curtain-x,50%) var(--curtain-y,50%))";
  });

  /* ------------------------------------------------------------------------
     6. MAGNETIC ELEMENTS
     ------------------------------------------------------------------------ */
  if (hasGSAP && !REDUCED) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.getAttribute("data-magnetic-strength") || "0.35");
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * strength);
        yTo((e.clientY - r.top - r.height / 2) * strength);
      });
      el.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });
  }

  /* ------------------------------------------------------------------------
     7. PER-CHARACTER / PER-WORD STAGGER REVEAL
     data-reveal="chars|words|lines", wrapped in overflow-hidden line spans
     ------------------------------------------------------------------------ */
  function splitReveal(el) {
    const mode = el.getAttribute("data-reveal");
    const text = el.textContent;
    el.textContent = "";
    const units = mode === "chars" ? text.split("") : text.split(/(\s+)/);
    units.forEach((unit) => {
      const line = document.createElement("span");
      line.className = "reveal-line";
      const inner = document.createElement("span");
      inner.textContent = unit === " " ? "\u00A0" : unit;
      line.appendChild(inner);
      el.appendChild(line);
    });
    return el.querySelectorAll(".reveal-line > span");
  }

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    el.style.opacity = 1;
    const spans = splitReveal(el);
    if (REDUCED || !hasGSAP) { gsap && gsap.set(spans, { y: 0 }); return; }
    gsap.set(spans, { y: "110%" });
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(spans, {
          y: "0%",
          duration: 0.8,
          ease: "power3.out",
          stagger: el.getAttribute("data-reveal") === "chars" ? 0.028 : 0.05,
        });
      },
    });
  });

  /* Generic fade-up for non-text blocks marked [data-fade] */
  document.querySelectorAll("[data-fade]").forEach((el) => {
    if (REDUCED || !hasGSAP) { el.style.opacity = 1; return; }
    gsap.set(el, { opacity: 0, y: 28 });
    ScrollTrigger.create({
      trigger: el, start: "top 88%", once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }),
    });
  });

  /* ------------------------------------------------------------------------
     8. VARIABLE FONT WEIGHT ON SCROLL (Fraunces axis interpolation)
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-variable-scroll]").forEach((el) => {
    if (REDUCED || !hasGSAP) return;
    ScrollTrigger.create({
      trigger: el, start: "top 90%", end: "bottom 10%", scrub: 0.6,
      onUpdate: (self) => {
        const wght = Math.round(300 + self.progress * 500);
        const opsz = Math.round(18 + self.progress * 100);
        el.style.fontVariationSettings = `"wght" ${wght}, "opsz" ${opsz}`;
      },
    });
  });

  /* ------------------------------------------------------------------------
     9. DEPTH-LAYERED Z-PARALLAX (three planes, far layer blurred)
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-parallax-scene]").forEach((scene) => {
    if (REDUCED || !hasGSAP) return;
    scene.querySelectorAll("[data-parallax-layer]").forEach((layer) => {
      const speed = parseFloat(layer.getAttribute("data-parallax-layer")) || 0.2;
      gsap.to(layer, {
        yPercent: speed * 40,
        ease: "none",
        scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  });

  /* ------------------------------------------------------------------------
     10. SCROLL-VELOCITY SKEW
     ------------------------------------------------------------------------ */
  const skewTargets = document.querySelectorAll("[data-velocity-skew]");
  let skewSetter = null;
  if (hasGSAP && skewTargets.length && !REDUCED) {
    skewSetter = gsap.quickTo(skewTargets, "skewY", { duration: 0.5, ease: "power3.out" });
  }
  function handleVelocitySkew(velocity) {
    if (!skewSetter) return;
    const clamped = Math.max(-6, Math.min(6, velocity * 0.6));
    skewSetter(clamped);
  }

  /* ------------------------------------------------------------------------
     11. STICKY STACKED SECTIONS (scale-down + shadow on the outgoing panel)
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-stack]").forEach((stack) => {
    const panels = stack.querySelectorAll(".stack-panel");
    if (REDUCED || !hasGSAP) return;
    panels.forEach((panel, i) => {
      if (i === panels.length - 1) return;
      gsap.to(panel, {
        scale: 0.92, opacity: 0.55, filter: "blur(2px)",
        ease: "none",
        scrollTrigger: { trigger: panels[i + 1], start: "top bottom", end: "top top", scrub: true },
      });
    });
  });

  /* ------------------------------------------------------------------------
     12. PINNED HORIZONTAL GALLERY
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-horizontal-scroll]").forEach((rail) => {
    const track = rail.querySelector("[data-horizontal-track]");
    if (!track) return;
    if (REDUCED || !hasGSAP) { track.style.overflowX = "auto"; return; }
    const getDistance = () => track.scrollWidth - rail.clientWidth;
    let tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: rail, start: "top top", end: () => `+=${getDistance()}`,
        scrub: 0.4, pin: true, invalidateOnRefresh: true,
      },
    });
  });

  /* ------------------------------------------------------------------------
     13. PERSPECTIVE TILT CARDS + specular highlight
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    if (REDUCED) return;
    const highlight = card.querySelector("[data-tilt-highlight]");
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -10;
      const ry = (px - 0.5) * 10;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      if (highlight) highlight.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(251,250,246,0.55), transparent 55%)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
      if (highlight) highlight.style.background = "transparent";
    });
  });

  /* ------------------------------------------------------------------------
     14. ODOMETER DIGIT-ROLL COUNTERS
     markup: <span data-odometer="2026">0000</span> -> builds digit reels
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-odometer]").forEach((el) => {
    const target = el.getAttribute("data-odometer");
    const digits = target.split("");
    el.textContent = "";
    const reels = [];
    digits.forEach((d) => {
      const wrap = document.createElement("span");
      wrap.className = "odometer-digit";
      const inner = document.createElement("span");
      inner.className = "odometer-digit-inner";
      if (/[0-9]/.test(d)) {
        for (let n = 0; n <= 9; n++) {
          const s = document.createElement("span");
          s.textContent = n;
          inner.appendChild(s);
        }
        reels.push({ inner, value: parseInt(d, 10) });
      } else {
        inner.textContent = d;
      }
      wrap.appendChild(inner);
      el.appendChild(wrap);
    });
    const run = () => {
      if (REDUCED || !hasGSAP) {
        reels.forEach((r) => { r.inner.style.transform = `translateY(-${r.value}em)`; });
        return;
      }
      reels.forEach((r, i) => {
        gsap.to(r.inner, { y: `-${r.value}em`, duration: 1.1, delay: i * 0.08, ease: "power3.out" });
      });
    };
    if (hasGSAP) {
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: run });
    } else { run(); }
  });

  /* ------------------------------------------------------------------------
     15. SHARED-ELEMENT (FLIP) — portfolio grid -> expanded frame
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-flip-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const id = trigger.getAttribute("data-flip-trigger");
      const target = document.querySelector(`[data-flip-target="${id}"]`);
      if (!target || !window.Flip) return;
      const state = Flip.getState(target);
      target.setAttribute("data-flip-open", target.getAttribute("data-flip-open") === "true" ? "false" : "true");
      Flip.from(state, { duration: 0.6, ease: "power3.inOut", absolute: true });
    });
  });

  /* ------------------------------------------------------------------------
     16. ACTIVE NAV STATE (adds .nav-current to the current page link)
     ------------------------------------------------------------------------ */
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#nav-overlay a[data-page]").forEach((a) => {
    if (a.getAttribute("data-page") === currentPath) a.classList.add("nav-current");
  });

  /* ------------------------------------------------------------------------
     17. PRELOADER — 0% to 100%, then dissolves. Reduced motion = instant skip.
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    const countEl = preloader.querySelector("[data-preloader-count]");
    if (REDUCED) {
      preloader.setAttribute("data-done", "true");
    } else {
      let pct = 0;
      const tick = () => {
        pct += Math.random() * 18 + 6;
        if (pct >= 100) {
          pct = 100;
          if (countEl) countEl.textContent = "100%";
          setTimeout(() => preloader.setAttribute("data-done", "true"), 260);
          if (hasGSAP && window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 700);
          return;
        }
        if (countEl) countEl.textContent = Math.floor(pct) + "%";
        setTimeout(tick, 90 + Math.random() * 90);
      };
      tick();
    }
    window.addEventListener("load", () => {
      if (!REDUCED) return;
      preloader.setAttribute("data-done", "true");
    });
  }

  /* ------------------------------------------------------------------------
     18. LIGHTBOX — click any [data-lightbox] image to open fullscreen
     ------------------------------------------------------------------------ */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    document.querySelectorAll("[data-lightbox]").forEach((el) => {
      el.addEventListener("click", () => {
        const src = el.getAttribute("data-lightbox") || el.querySelector("img")?.src;
        if (!src || !lightboxImg) return;
        lightboxImg.src = src;
        lightbox.setAttribute("data-open", "true");
        if (lenis) lenis.stop();
      });
    });
    const closeLightbox = () => {
      lightbox.setAttribute("data-open", "false");
      if (lenis) lenis.start();
    };
    lightbox.addEventListener("click", closeLightbox);
    document.querySelectorAll("[data-lightbox-close]").forEach((btn) => btn.addEventListener("click", (e) => { e.stopPropagation(); closeLightbox(); }));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
  }

  /* ------------------------------------------------------------------------
     19. CONTACT SUCCESS OVERLAY — generic, any form with [data-success-form]
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-success-form]").forEach((form) => {
    const overlay = document.querySelector(form.getAttribute("data-success-form"));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (overlay) overlay.setAttribute("data-open", "true");
    });
    if (overlay) {
      overlay.querySelectorAll("[data-success-close]").forEach((btn) => {
        btn.addEventListener("click", () => { overlay.setAttribute("data-open", "false"); form.reset(); });
      });
    }
  });

  /* ------------------------------------------------------------------------
     20. THEME TOGGLE — light/dark, persisted, OS-preference default
     ------------------------------------------------------------------------ */
  (function () {
    const stored = localStorage.getItem("hermela-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", initial);
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("hermela-theme", next);
      });
    });
  })();

  /* ------------------------------------------------------------------------
     21. CROSSFADING HERO — cycles [data-hero-crossfade] images every ~4.2s
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-hero-crossfade]").forEach((scene) => {
    const imgs = scene.querySelectorAll("img");
    if (imgs.length < 2) return;
    let i = 0;
    imgs[0].classList.add("is-active");
    if (REDUCED) return;
    setInterval(() => {
      imgs[i].classList.remove("is-active");
      i = (i + 1) % imgs.length;
      imgs[i].classList.add("is-active");
    }, 4200);
  });

  /* ------------------------------------------------------------------------
     22. CLICK-TO-REVEAL-COLOR — hero images default graded, click reveals full color
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-reveal-color]").forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("is-revealed");
      const scrim = el.closest("[data-parallax-scene], section")?.querySelector("[data-reveal-scrim]");
      if (scrim) scrim.classList.toggle("is-revealed");
    });
  });

  /* ------------------------------------------------------------------------
     23. AUTO-ADVANCING SWIPE RAIL — [data-auto-scroll-rail], pauses on interaction
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-auto-scroll-rail]").forEach((rail) => {
    if (REDUCED) return;
    let paused = false;
    let resumeTimer = null;
    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 4000);
    };
    ["touchstart", "mousedown", "wheel"].forEach((evt) => rail.addEventListener(evt, pause, { passive: true }));
    setInterval(() => {
      if (paused) return;
      const child = rail.querySelector(":scope > *");
      if (!child) return;
      const step = child.getBoundingClientRect().width + 12;
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
      rail.scrollTo({ left: atEnd ? 0 : rail.scrollLeft + step, behavior: "smooth" });
    }, 3000);
  });

  /* ------------------------------------------------------------------------
     24. UPGRADED VIDEO-SLOT — real <video> when [data-video-src] present.
     Autoplay, loop, muted by default; mute toggle button; click expands to
     fullscreen and unmutes. Falls back to the existing image+play-icon
     treatment (already handled in markup) when no source is provided.
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-video-src]").forEach((slot) => {
    const src = slot.getAttribute("data-video-src");
    if (!src) return;
    const img = slot.querySelector("img");
    const playIcon = slot.querySelector(".play-affordance");
    const video = document.createElement("video");
    video.src = src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("aria-label", img ? img.alt : "Video");
    if (img) img.replaceWith(video); else slot.prepend(video);
    if (playIcon) playIcon.remove();

    const muteBtn = document.createElement("button");
    muteBtn.className = "mute-toggle";
    muteBtn.type = "button";
    muteBtn.setAttribute("aria-label", "Toggle sound");
    muteBtn.textContent = "🔇";
    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      muteBtn.textContent = video.muted ? "🔇" : "🔊";
    });
    slot.appendChild(muteBtn);

    video.addEventListener("click", () => {
      video.muted = false;
      muteBtn.textContent = "🔊";
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    });
  });

  /* ------------------------------------------------------------------------
     25. TAROT FLIP CARDS — click [data-tarot-card] to flip and reveal the back
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-tarot-card]").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("is-flipped"));
  });

  /* ------------------------------------------------------------------------
     26. FONT-MOSAIC QUOTE — [data-font-mosaic] splits into words, each word
     rotating through the site's own type system (serif/display/body, various
     weights and italics) rather than one uniform style — used once, on Mind,
     as a deliberate echo of "beauty has no single standard."
     ------------------------------------------------------------------------ */
  const mosaicStyles = [
    "font-family:var(--font-wordmark); font-style:italic; font-weight:500;",
    "font-family:var(--font-display); font-weight:700;",
    "font-family:var(--font-body); font-weight:400;",
    "font-family:var(--font-display); font-style:italic; font-weight:300;",
    "font-family:var(--font-wordmark); font-weight:600;",
    "font-family:var(--font-display); font-weight:400; font-style:italic;",
  ];
  document.querySelectorAll("[data-font-mosaic]").forEach((el) => {
    const text = el.textContent.trim();
    el.textContent = "";
    text.split(/\s+/).forEach((word, i) => {
      const span = document.createElement("span");
      span.className = "font-mosaic-word";
      span.setAttribute("style", mosaicStyles[i % mosaicStyles.length]);
      span.textContent = word;
      el.appendChild(span);
      el.appendChild(document.createTextNode(" "));
    });
  });

  /* Refresh ScrollTrigger once fonts/images settle */
  window.addEventListener("load", () => { if (hasGSAP && window.ScrollTrigger) ScrollTrigger.refresh(); });
})();

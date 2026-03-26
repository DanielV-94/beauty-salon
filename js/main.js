/**
 * FC LUXE & BEAUTY — Main JavaScript
 * Skills: antigravity-design-expert + frontend-design
 * Animations: GSAP + ScrollTrigger + Custom Cursor
 */

// ─── GSAP SETUP ───────────────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── PAGE LOADER ──────────────────────────────────────────────────────────────
function initLoader() {
  const loader = document.querySelector(".page-loader");
  const logo = document.querySelector(".page-loader__logo");
  const barFill = document.querySelector(".page-loader__bar-fill");
  const barLine = document.querySelector(".page-loader__bar-line");
  const doorL = document.querySelector(".page-loader__door--left");
  const doorR = document.querySelector(".page-loader__door--right");
  const hero = document.querySelector(".hero");
  if (!loader) return;

  document.body.style.overflow = "hidden";

  // Hero empieza invisible; aparece cuando las puertas se abran
  if (hero) gsap.set(hero, { opacity: 0 });

  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = "none";
      document.body.style.overflow = "";
      initPageAnimations();
    },
  });

  // 1) Logo aparece con una respiración suave — fade puro, sin escala brusca
  tl.fromTo(
    logo,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" },
    0.4,
  )

    // 2) Línea decorativa gold bajo el logo aparece con un deslizamiento
    .fromTo(
      barLine || {},
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
        transformOrigin: "center",
      },
      1.0,
    )

    // 3) Barra de progreso avanza lentamente (3s — tiempo real para cargar assets)
    .fromTo(
      barFill,
      { width: "0%" },
      { width: "100%", duration: 3.0, ease: "power1.inOut" },
      1.2,
    )

    // 4) Logo se desvanece con delicadeza (no encoge, solo se eleva levemente y desaparece)
    .to(
      logo,
      {
        opacity: 0,
        y: -10,
        duration: 1.0,
        ease: "power2.inOut",
      },
      4.0,
    )
    .to(barLine || {}, { opacity: 0, duration: 0.6, ease: "power2.in" }, 4.0)
    .to(barFill, { opacity: 0, duration: 0.6, ease: "power2.in" }, 4.0)

    // 5) Las puertas se separan con calma ceremonial
    .to(
      doorL,
      {
        xPercent: -100,
        duration: 1.4,
        ease: "power2.inOut",
      },
      4.6,
    )
    .to(
      doorR,
      {
        xPercent: 100,
        duration: 1.4,
        ease: "power2.inOut",
      },
      4.6,
    )

    // 6) Hero aparece suavemente mientras las puertas aún se mueven
    .to(
      hero || {},
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      5.1,
    );
}

// ─── CURSOR PERSONALIZADO (Antigravity) ───────────────────────────────────────
function initCursor() {
  const dot = document.querySelector(".cursor-dot");
  if (!dot) return;

  let mouseX = 0,
    mouseY = 0;

  // Posición inicial fuera de pantalla
  gsap.set(dot, { x: -100, y: -100 });

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: "none" });
  });

  // Hover: scale-up con GSAP (como el anillo) + rotación leve
  const hoverEls = document.querySelectorAll(
    "a, button, .btn, .service-card, .gallery-item",
  );
  hoverEls.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(dot, { scale: 1.6, duration: 0.3, ease: "back.out(1.7)" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Ocultar cursor al salir de la ventana
  document.addEventListener("mouseleave", () => {
    gsap.to(dot, { opacity: 0, duration: 0.3 });
  });
  document.addEventListener("mouseenter", () => {
    gsap.to(dot, { opacity: 1, duration: 0.3 });
  });
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  // Cambio al hacer scroll: quitar --dark y poner .scrolled
  ScrollTrigger.create({
    start: "top -80",
    onEnter: () => {
      navbar.classList.add("scrolled");
      navbar.classList.remove("navbar--dark");
    },
    onLeaveBack: () => {
      navbar.classList.remove("scrolled");
      // Solo restaurar --dark si estamos en la home (hay hero)
      if (document.querySelector(".hero")) {
        navbar.classList.add("navbar--dark");
      }
    },
  });

  // Scroll progress bar
  const progressBar = document.querySelector(".scroll-progress");
  if (progressBar) {
    gsap.to(progressBar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }
}

// ─── MENÚ OVERLAY ─────────────────────────────────────────────────────────────
function initMenu() {
  const menuBtn = document.querySelector(".navbar__menu-btn");
  const closeBtn = document.querySelector(".nav-overlay__close");
  const overlay = document.querySelector(".nav-overlay");
  const navbar = document.querySelector(".navbar");

  if (!menuBtn || !overlay) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    overlay.classList.add("open");
    menuBtn.classList.add("active");
    if (navbar) navbar.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    isOpen = false;
    overlay.classList.remove("open");
    menuBtn.classList.remove("active");
    if (navbar) navbar.classList.remove("menu-open");
    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", () => (isOpen ? closeMenu() : openMenu()));
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMenu();
  });

  // Cerrar al hacer click en links de servicio
  const serviceLinks = document.querySelectorAll(
    ".nav-overlay__service-link, .nav-overlay__nav-link, .nav-overlay__booking-link",
  );
  serviceLinks.forEach((link) => link.addEventListener("click", closeMenu));

  // Preview de imagen al hover sobre cada servicio
  const serviceItems = document.querySelectorAll(
    ".nav-overlay__service-item[data-service]",
  );
  const previewImgs = document.querySelectorAll(".nav-overlay__preview-img");

  serviceItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const key = item.dataset.service;
      previewImgs.forEach((img) => {
        img.classList.toggle("active", img.dataset.service === key);
      });
    });
    item.addEventListener("mouseleave", () => {
      previewImgs.forEach((img) => img.classList.remove("active"));
    });
  });
}

// ─── ANIMACIONES DE ENTRADA (ScrollTrigger) ───────────────────────────────────
function initScrollAnimations() {
  // Reveal genérico (fade + slide up)
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // Reveal desde la izquierda
  gsap.utils.toArray(".reveal-left").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // Reveal desde la derecha
  gsap.utils.toArray(".reveal-right").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // Reveal con scale (Antigravity)
  gsap.utils.toArray(".reveal-scale").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.88 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // Stagger en grupos de cards
  gsap.utils.toArray(".stagger-group").forEach((group) => {
    const children = group.querySelectorAll(".stagger-item");
    gsap.fromTo(
      children,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}

// ─── PARALLAX HERO (Antigravity) ──────────────────────────────────────────────
function initHeroParallax() {
  const heroImg = document.querySelector(".hero__image");
  const heroText = document.querySelector(".hero__content");
  if (!heroImg) return;

  gsap.to(heroImg, {
    yPercent: 25,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  if (heroText) {
    gsap.to(heroText, {
      yPercent: 15,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "center top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

// ─── ANIMACIÓN HERO DE ENTRADA ────────────────────────────────────────────────
function initHeroEntrance() {
  // Establecemos estado inicial via JS (no CSS) para robustez
  gsap.set(".hero__label", { opacity: 0, y: 20 });
  gsap.set(".hero__title", { opacity: 0, y: 60 });
  gsap.set(".hero__subtitle", { opacity: 0, y: 30 });
  gsap.set(".hero__actions", { opacity: 0, y: 20 });
  gsap.set(".hero__scroll-hint", { opacity: 0 });
  gsap.set(".hero__eyebrow-line", {
    scaleX: 0,
    transformOrigin: "left center",
  });

  const tl = gsap.timeline({ delay: 0.15 });

  tl.to(".hero__eyebrow-line", {
    scaleX: 1,
    duration: 0.5,
    ease: "power3.out",
  })
    .to(
      ".hero__label",
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2",
    )
    .to(
      ".hero__title",
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.2",
    )
    .to(
      ".hero__subtitle",
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.4",
    )
    .to(
      ".hero__actions",
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3",
    )
    .to(".hero__scroll-hint", { opacity: 1, duration: 0.6 }, "-=0.2")
    .fromTo(
      ".hero__image",
      { scale: 1.06 },
      { scale: 1, duration: 1.4, ease: "power3.out" },
      0,
    );
}

// ─── NÚMEROS ANIMADOS ─────────────────────────────────────────────────────────
function initCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              el.textContent = Math.round(
                this.targets()[0].val,
              ).toLocaleString();
            },
          },
        );
      },
    });
  });
}

// ─── HOVER FLOTANTE EN CARDS (Antigravity) ────────────────────────────────────
function initCardHover() {
  document.querySelectorAll(".service-card, .gallery-item").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        boxShadow:
          "0 32px 80px rgba(220, 144, 174, 0.25), 0 8px 24px rgba(0,0,0,0.10)",
        duration: 0.4,
        ease: "power2.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });
}

// ─── DRAG SLIDER INFINITO DE SERVICIOS ───────────────────────────────────────
function initDragSlider() {
  const viewport = document.querySelector(".drag-slider__viewport");
  const track = document.querySelector(".drag-slider__track");
  if (!viewport || !track) return;

  // ── Loop infinito: clonar todas las cards y añadirlas al final ──
  const originalCards = Array.from(
    track.querySelectorAll(".drag-slider__card"),
  );
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    // quitar tabindex de links dentro del clon
    clone
      .querySelectorAll("a")
      .forEach((a) => a.setAttribute("tabindex", "-1"));
    track.appendChild(clone);
  });

  // Aplicar rotaciones desde data-rotate a TODAS las cards (originales + clones)
  track.querySelectorAll(".drag-slider__card").forEach((card) => {
    const deg = card.dataset.rotate || "0";
    card.style.setProperty("--card-rotate", `${deg}deg`);
  });

  // Estado del drag
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let velX = 0;
  let lastX = 0;
  let lastTime = 0;
  let rafId = null;
  let didDrag = false;

  // Ancho del set original (mitad del track duplicado)
  function getSetWidth() {
    return track.scrollWidth / 2;
  }

  function applyX(x) {
    currentX = x;
    track.style.transform = `translateX(${x}px)`;
  }

  // Wrap infinito: cuando pasa del set completo, saltamos sin transición
  function wrapInfinite() {
    const setW = getSetWidth();
    if (currentX < -setW) {
      currentX += setW;
      track.style.transform = `translateX(${currentX}px)`;
    } else if (currentX > 0) {
      currentX -= setW;
      track.style.transform = `translateX(${currentX}px)`;
    }
  }

  // Inercia suave + wrap infinito
  function inertiaLoop() {
    velX *= 0.92;
    if (Math.abs(velX) < 0.2) {
      velX = 0;
      return;
    }
    currentX += velX;
    wrapInfinite();
    track.style.transform = `translateX(${currentX}px)`;
    rafId = requestAnimationFrame(inertiaLoop);
  }

  // Pointer events
  function onPointerDown(e) {
    isDragging = true;
    didDrag = false;
    startX = (e.touches ? e.touches[0].clientX : e.clientX) - currentX;
    lastX = e.touches ? e.touches[0].clientX : e.clientX;
    lastTime = Date.now();
    velX = 0;
    if (rafId) cancelAnimationFrame(rafId);
    viewport.classList.add("is-dragging");
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const now = Date.now();
    const dt = Math.max(now - lastTime, 1);
    velX = ((clientX - lastX) / dt) * 14;
    lastX = clientX;
    lastTime = now;

    const next = clientX - startX;
    if (Math.abs(next - currentX) > 6) didDrag = true;
    currentX = next;
    wrapInfinite();
    track.style.transform = `translateX(${currentX}px)`;
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove("is-dragging");
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    if (Math.abs(clientX - (startX + currentX)) > 6) didDrag = true;
    rafId = requestAnimationFrame(inertiaLoop);
  }

  // Cancelar click si hubo drag
  viewport.addEventListener(
    "click",
    (e) => {
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
        didDrag = false;
      }
    },
    true,
  );

  viewport.addEventListener("mousedown", onPointerDown);
  viewport.addEventListener("touchstart", onPointerDown, { passive: false });
  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("touchmove", onPointerMove, { passive: false });
  window.addEventListener("mouseup", onPointerUp);
  window.addEventListener("touchend", onPointerUp);

  // Entrada con scroll-triggered reveal (solo originales)
  gsap.fromTo(
    originalCards,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".drag-slider",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    },
  );
}

// ─── ACORDEÓN FAQ ─────────────────────────────────────────────────────────────
function initAccordion() {
  document.querySelectorAll(".accordion__item").forEach((item) => {
    const btn = item.querySelector(".accordion__btn");
    const content = item.querySelector(".accordion__body");
    if (!btn || !content) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Cerrar todos
      document.querySelectorAll(".accordion__item.open").forEach((openItem) => {
        openItem.classList.remove("open");
        gsap.to(openItem.querySelector(".accordion__body"), {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      });

      // Abrir el actual si estaba cerrado
      if (!isOpen) {
        item.classList.add("open");
        gsap.fromTo(
          content,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
        );
      }
    });
  });
}

// ─── IMAGEN PARALLAX DECORATIVA ───────────────────────────────────────────────
function initImageParallax() {
  gsap.utils.toArray(".parallax-img").forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest("section") || img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

// ─── INICIALIZACIÓN PRINCIPAL ─────────────────────────────────────────────────
function initPageAnimations() {
  initNavbar();
  initScrollAnimations();
  initHeroParallax();
  initHeroEntrance();
  initCounters();
  initCardHover();
  initDragSlider();
  initAccordion();
  initImageParallax();
}

// ─── ARRANQUE ─────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initMenu();

  // Si no hay loader, iniciar animaciones directamente
  const loader = document.querySelector(".page-loader");
  if (!loader) {
    initPageAnimations();
  } else {
    initLoader();
  }
});

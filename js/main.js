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
  if (!loader) return;

  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = "none";
      document.body.style.overflow = "";
      initPageAnimations();
    },
  });

  document.body.style.overflow = "hidden";

  tl.to(".page-loader__bar-fill", {
    duration: 1.4,
    ease: "power2.inOut",
    // barra animada con CSS, GSAP solo espera
  }).to(".page-loader", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    delay: 0.2,
  });
}

// ─── CURSOR PERSONALIZADO (Antigravity) ───────────────────────────────────────
function initCursor() {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: "none" });
  });

  // Ring sigue con lag suave (antigravity lag)
  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  // Hover en links y botones
  const hoverEls = document.querySelectorAll(
    "a, button, .btn, .service-card, .gallery-item",
  );
  hoverEls.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });

  // Ocultar cursor al salir de la ventana
  document.addEventListener("mouseleave", () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
  });
  document.addEventListener("mouseenter", () => {
    gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
  });
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  // Cambio al hacer scroll
  ScrollTrigger.create({
    start: "top -80",
    onEnter: () => navbar.classList.add("scrolled"),
    onLeaveBack: () => navbar.classList.remove("scrolled"),
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
  const overlay = document.querySelector(".nav-overlay");
  const links = document.querySelectorAll(".nav-overlay__link");
  const subToggle = document.querySelectorAll(".nav-overlay__sub-toggle");

  if (!menuBtn || !overlay) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    overlay.classList.add("open");
    menuBtn.classList.add("active");
    document.body.style.overflow = "hidden";

    // Animar links de forma escalonada
    gsap.fromTo(
      links,
      { y: "110%" },
      {
        y: "0%",
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.3,
      },
    );
  }

  function closeMenu() {
    isOpen = false;
    gsap.to(links, {
      y: "110%",
      duration: 0.4,
      ease: "power2.in",
      stagger: 0.04,
      onComplete: () => {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
      },
    });
    menuBtn.classList.remove("active");
  }

  menuBtn.addEventListener("click", () => (isOpen ? closeMenu() : openMenu()));

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMenu();
  });

  // Submenu servicios
  subToggle.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const sub = toggle.nextElementSibling;
      if (sub) sub.classList.toggle("open");
    });
  });

  // Cerrar overlay al hacer click en link (que no sea el toggle)
  links.forEach((link) => {
    if (!link.classList.contains("nav-overlay__sub-toggle")) {
      link.addEventListener("click", closeMenu);
    }
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
  const tl = gsap.timeline({ delay: 1.8 }); // después del loader

  tl.fromTo(
    ".hero__label",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
  )
    .fromTo(
      ".hero__title",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.2",
    )
    .fromTo(
      ".hero__subtitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.4",
    )
    .fromTo(
      ".hero__actions",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3",
    )
    .fromTo(
      ".hero__scroll-hint",
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.2",
    )
    .fromTo(
      ".hero__image",
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
      0.4,
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

// ─── SCROLL HORIZONTAL DE SERVICIOS ──────────────────────────────────────────
function initServicesScroll() {
  const track = document.querySelector(".services-scroll__track");
  if (!track) return;

  const panels = gsap.utils.toArray(".services-scroll__panel");
  if (panels.length === 0) return;

  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".services-scroll",
      start: "top top",
      end: () => `+=${track.scrollWidth - window.innerWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Fade in de cada panel al entrar
  panels.forEach((panel, i) => {
    gsap.fromTo(
      panel.querySelector(".services-scroll__content"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: panel,
          containerAnimation: ScrollTrigger.getById("services-scroll"),
          start: "left 70%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
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
  initServicesScroll();
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

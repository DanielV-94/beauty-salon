/**
 * FC LUXE & BEAUTY — Main JavaScript
 * Skills: antigravity-design-expert + frontend-design
 * Animations: GSAP + ScrollTrigger + Custom Cursor
 */

// ─── GSAP SETUP ───────────────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── SISTEMA DE IDIOMAS ───────────────────────────────────────────────────────
const LANGUAGE_STORAGE_KEY = "fc-luxe-language";
const originalTranslationState = new Map();

let currentLanguage = "es";
let isLanguageModalOpen = false;

const EN_SERVICE_NAMES = [
  "Manicure",
  "Pedicure",
  "Lash Extensions",
  "Hair Extensions",
  "Facials",
  "Massages",
  "Smoothing",
  "Hair Color",
  "Brows",
];

const EN_FOOTER_SERVICE_NAMES = [
  "Manicure",
  "Pedicure",
  "Hair Extensions",
  "Massages",
  "Facials",
  "Smoothing",
  "Lash Extensions",
  "Hair Color",
  "Brows",
];

const LANGUAGE_UI_COPY = {
  es: {
    modalLabel: "Selector de idioma",
    modalTitle: "Elige cómo quieres ver la página",
    modalText:
      "Selecciona tu idioma favorito. Puedes cambiarlo nuevamente cuando quieras.",
    spanishLabel: "Español",
    spanishHint: "Continuar en español",
    englishLabel: "Inglés",
    englishHint: "Switch to English",
    closeLabel: "Cerrar selector de idioma",
    triggerLabel: "Cambiar idioma",
    triggerText: "ES",
    mobileServicesLabel: "Servicios",
    mobileBackLabel: "Volver al menú",
  },
  en: {
    modalLabel: "Language selector",
    modalTitle: "Choose how you'd like to view the website",
    modalText: "Pick your preferred language. You can switch it again anytime.",
    spanishLabel: "Spanish",
    spanishHint: "Continue in Spanish",
    englishLabel: "English",
    englishHint: "Continue in English",
    closeLabel: "Close language selector",
    triggerLabel: "Change language",
    triggerText: "EN",
    mobileServicesLabel: "Services",
    mobileBackLabel: "Back to menu",
  },
};

function textOp(id, selector, value) {
  return { kind: "text", id, selector, value };
}

function htmlOp(id, selector, value) {
  return { kind: "html", id, selector, value };
}

function textAllOp(id, selector, values) {
  return { kind: "textAll", id, selector, values };
}

function htmlAllOp(id, selector, values) {
  return { kind: "htmlAll", id, selector, values };
}

function attrOp(id, selector, attrs) {
  return { kind: "attrs", id, selector, attrs };
}

function attrAllOp(id, selector, attrsList) {
  return { kind: "attrsAll", id, selector, attrsList };
}

function titleOp(id, value) {
  return { kind: "title", id, value };
}

function metaOp(id, selector, value) {
  return { kind: "meta", id, selector, value };
}

const COMMON_TRANSLATIONS = [
  attrOp("common:navbarAria", ".navbar", { "aria-label": "Main navigation" }),
  attrOp("common:menuBtnAria", ".navbar__menu-btn", {
    "aria-label": "Open menu",
  }),
  attrOp("common:logoAria", ".navbar__logo-wrap", {
    "aria-label": "FC Luxe & Beauty home",
  }),
  textOp("common:navbarCta", ".navbar__cta", "Book now"),
  attrOp("common:overlayAria", ".nav-overlay", {
    "aria-label": "Navigation menu",
  }),
  attrOp("common:overlayCloseAria", ".nav-overlay__close", {
    "aria-label": "Close menu",
  }),
  textOp("common:overlayBrandTitle", ".nav-overlay__brand-title", "MENU"),
  textAllOp("common:overlayNav", ".nav-overlay__nav-link", [
    "/ Home",
    "/ Our Story",
    "/ Gallery",
    "/ Contact",
  ]),
  textOp(
    "common:overlayBookingLabel",
    ".nav-overlay__booking-label",
    "Reservations",
  ),
  textAllOp("common:overlayBookingLinks", ".nav-overlay__booking-link", [
    "/ WhatsApp",
    "/ Contact us",
  ]),
  textAllOp(
    "common:overlayServices",
    ".nav-overlay__service-link",
    EN_SERVICE_NAMES,
  ),
  attrAllOp(
    "common:overlayPreviewAlt",
    ".nav-overlay__preview-img",
    EN_SERVICE_NAMES.map((name) => ({ alt: name })),
  ),
  attrOp("common:footerAria", ".footer", { "aria-label": "Footer" }),
  textOp(
    "common:footerDesc",
    ".footer__desc",
    "A luxurious space dedicated to enhancing your natural beauty. Where every detail matters.",
  ),
  textAllOp("common:footerHeadings", ".footer__col h4", [
    "Services",
    "Navigation",
    "Contact",
  ]),
  textAllOp(
    "common:footerServiceLinks",
    ".footer__col:nth-child(2) ul li a",
    EN_FOOTER_SERVICE_NAMES,
  ),
  textAllOp("common:footerNavLinks", ".footer__col:nth-child(3) ul li a", [
    "Home",
    "Services",
    "Our Story",
    "Gallery",
    "Contact",
  ]),
  textOp(
    "common:footerAddress",
    ".footer__col:nth-child(4) ul li:nth-child(3) a",
    "Valle de Arce #143, Suite 4, Col. Valle Dorado, Bahía de Banderas, Nayarit",
  ),
  textOp(
    "common:footerHours",
    ".footer__col:nth-child(4) ul li:nth-child(4)",
    "Mon – Sat: 9:00 – 19:00",
  ),
  textOp(
    "common:footerCopy",
    ".footer__copy",
    "© 2026 FC Luxe & Beauty. All rights reserved.",
  ),
  htmlOp(
    "common:footerCredit",
    ".footer__credit",
    'Designed &amp; Developed by <a href="https://www.danielvelez-webdev.com" target="_blank" rel="noopener">Daniel Velez</a>',
  ),
];

const SERVICE_PAGE_CONTENT = {
  "servicios/manicure.html": {
    docTitle: "Manicure — FC Luxe & Beauty",
    metaDesc:
      "Professional manicure — FC Luxe & Beauty. Perfect nails with long-lasting finishes.",
    heroLabel: "Service 01",
    heroTitleHtml: 'Mani<em class="gold-accent">cure</em>',
    heroSubtitle:
      "Perfect nails, impeccable finishes that speak for themselves.",
    breadcrumbCurrent: "Manicure",
    detailLabel: "Manicure",
    detailTitleHtml: "Hands that <em>shine</em>",
    intro:
      "Our manicure treatments go beyond color. We care for the health of your nails and cuticles with premium products for an elegant, long-lasting result.",
    treatments: [
      "Classic Manicure",
      "Semi-Permanent Manicure",
      "Gel Manicure",
      "Custom Nail Art",
      "Spa Manicure (hydration)",
      "Acrylic Nail Removal",
    ],
    ctaTitleHtml: 'Ready for <em class="gold-accent">perfect nails</em>?',
    bookingMessage:
      "Hello! I'd like to book a manicure appointment at FC Luxe & Beauty.",
  },
  "servicios/pedicure.html": {
    docTitle: "Pedicure — FC Luxe & Beauty",
    metaDesc: "Professional pedicure — FC Luxe & Beauty.",
    heroLabel: "Service 02",
    heroTitleHtml: 'Pedi<em class="gold-accent">cure</em>',
    heroSubtitle: "A wellness ritual for your feet that lasts for weeks.",
    breadcrumbCurrent: "Pedicure",
    detailLabel: "Pedicure",
    detailTitleHtml: "Feet that <em>deserve</em> the best",
    intro:
      "We care for your feet with a complete ritual of hydration, exfoliation, and color. Because wellness starts from the ground up.",
    treatments: [
      "Classic Pedicure",
      "Semi-Permanent Pedicure",
      "Premium Spa Pedicure",
      "Exfoliating Pedicure",
      "Gel Pedicure",
      "Foot Nail Art",
    ],
    ctaTitleHtml: 'Ready for <em class="gold-accent">perfect feet</em>?',
    bookingMessage:
      "Hello! I'd like to book a pedicure appointment at FC Luxe & Beauty.",
  },
  "servicios/extensiones.html": {
    docTitle: "Hair Extensions — FC Luxe & Beauty",
    metaDesc: "Hair extensions — FC Luxe & Beauty.",
    heroLabel: "Service 03",
    heroTitleHtml: 'Hair <em class="gold-accent">Extensions</em>',
    heroSubtitle: "Natural-looking volume, length, and texture in an instant.",
    breadcrumbCurrent: "Hair Extensions",
    detailLabel: "Hair Extensions",
    detailTitleHtml: "Hair that <em>transforms</em>",
    intro:
      "We apply 100% natural hair extensions with techniques that ensure durability and a completely seamless finish. More volume, more length, more you.",
    treatments: [
      "Keratin Extensions",
      "Clip-In Extensions",
      "Sew-In Extensions",
      "Microring Extensions",
      "Maintenance & Touch-Ups",
      "Extension Removal",
    ],
    ctaTitleHtml: 'Ready for your <em class="gold-accent">dream hair</em>?',
    bookingMessage:
      "Hello! I'd like to book a hair extensions appointment at FC Luxe & Beauty.",
  },
  "servicios/masajes.html": {
    docTitle: "Massages — FC Luxe & Beauty",
    metaDesc: "Therapeutic massages — FC Luxe & Beauty.",
    heroLabel: "Service 04",
    heroTitleHtml: 'Massa<em class="gold-accent">ges</em>',
    heroSubtitle:
      "Rituals that release tension and restore your full sense of balance.",
    breadcrumbCurrent: "Massages",
    detailLabel: "Massages",
    detailTitleHtml: "Your body deserves to <em>rest</em>",
    intro:
      "We offer therapeutic rituals designed to release tension, improve circulation, and restore your physical and mental balance. A moment just for you.",
    treatments: [
      "Relaxing Massage",
      "Therapeutic Massage",
      "Hot Stone Massage",
      "Lymphatic Drainage Massage",
      "Slimming Massage",
      "Prenatal Massage",
    ],
    ctaTitleHtml: 'A moment of <em class="gold-accent">total peace</em>',
    bookingMessage:
      "Hello! I'd like to book a massage appointment at FC Luxe & Beauty.",
  },
  "servicios/faciales.html": {
    docTitle: "Facials — FC Luxe & Beauty",
    metaDesc: "Premium facials — FC Luxe & Beauty.",
    heroLabel: "Service 05",
    heroTitleHtml: 'Faci<em class="gold-accent">als</em>',
    heroSubtitle: "Radiant skin with next-generation treatments.",
    breadcrumbCurrent: "Facials",
    detailLabel: "Facials",
    detailTitleHtml: "Skin that <em>glows</em>",
    intro:
      "Our facial treatments combine advanced technology with high-quality products to rejuvenate, hydrate, and transform your skin. Visible results from the very first session.",
    treatments: [
      "Deep Cleansing Facial",
      "Premium Hydrating Facial",
      "Anti-Aging Facial",
      "Chemical Peel",
      "Microneedling",
      "Facial Radiofrequency",
    ],
    ctaTitleHtml: 'Ready for <em class="gold-accent">radiant skin</em>?',
    bookingMessage:
      "Hello! I'd like to book a facial appointment at FC Luxe & Beauty.",
  },
  "servicios/alisado.html": {
    docTitle: "Smoothing — FC Luxe & Beauty",
    metaDesc: "Professional smoothing — FC Luxe & Beauty.",
    heroLabel: "Service 06",
    heroTitleHtml: 'Hair <em class="gold-accent">Smoothing</em>',
    heroSubtitle: "Smooth, shiny hair that protects your hair health.",
    breadcrumbCurrent: "Smoothing",
    detailLabel: "Smoothing",
    detailTitleHtml: "Smooth hair you'll <em>love</em>",
    intro:
      "We use the best techniques and products to achieve perfectly smooth hair with natural shine while preserving the hair fiber. Results that last for months.",
    treatments: [
      "Brazilian Blowout",
      "Japanese Straightening",
      "Express Keratin",
      "Hair Nanoplasty",
      "Hair Botox",
      "Protein Smoothing",
    ],
    ctaTitleHtml: 'Ready for <em class="gold-accent">perfect hair</em>?',
    bookingMessage:
      "Hello! I'd like to book a smoothing appointment at FC Luxe & Beauty.",
  },
  "servicios/pestanas.html": {
    docTitle: "Lash Extensions — FC Luxe & Beauty",
    metaDesc: "Lash extensions — FC Luxe & Beauty.",
    heroLabel: "Service 07",
    heroTitleHtml: 'Lash <em class="gold-accent">Extensions</em>',
    heroSubtitle: "A gaze that says it all, effortlessly.",
    breadcrumbCurrent: "Lash Extensions",
    detailLabel: "Lash Extensions",
    detailTitleHtml: "A gaze that <em>captivates</em>",
    intro:
      "We apply lash extensions with expert, lash-by-lash technique to achieve either a natural or dramatic result based on your preference. Lightweight, long-lasting, and safe.",
    treatments: [
      "Classic Extensions",
      "Russian Volume Extensions",
      "Mega Volume Extensions",
      "Lash Lift",
      "Lash Tint",
      "Extension Touch-Up",
    ],
    ctaTitleHtml: 'An <em class="gold-accent">unforgettable look</em>',
    bookingMessage:
      "Hello! I'd like to book a lash extensions appointment at FC Luxe & Beauty.",
  },
  "servicios/colorimetria.html": {
    docTitle: "Hair Color — FC Luxe & Beauty",
    metaDesc: "Hair color services — FC Luxe & Beauty.",
    heroLabel: "Service 08",
    heroTitleHtml: 'Hair <em class="gold-accent">Color</em>',
    heroSubtitle:
      "Color that expresses your unique personality with expert technique.",
    breadcrumbCurrent: "Hair Color",
    detailLabel: "Hair Color",
    detailTitleHtml: "Color that <em>transforms</em>",
    intro:
      "Our color specialists analyze your skin tone and features to create the perfect shade for you. Modern techniques that protect and beautify your hair.",
    treatments: [
      "Full Color",
      "Balayage",
      "California Highlights",
      "Ombre & Sombre",
      "Bleaching with Treatment",
      "Color Correction",
    ],
    ctaTitleHtml: 'Ready for your <em class="gold-accent">new color</em>?',
    bookingMessage:
      "Hello! I'd like to book a hair color appointment at FC Luxe & Beauty.",
  },
  "servicios/cejas.html": {
    docTitle: "Brows — FC Luxe & Beauty",
    metaDesc:
      "Professional brow design and treatments — FC Luxe & Beauty. Perfect brows that frame your look.",
    heroLabel: "Service 09",
    heroTitleHtml: 'Bro<em class="gold-accent">ws</em>',
    heroSubtitle: "Perfect brows that frame and enhance your look.",
    breadcrumbCurrent: "Brows",
    detailLabel: "Brows",
    detailTitleHtml: "Looks that <em>captivate</em>",
    intro:
      "Well-designed brows can completely transform the face. At FC Luxe & Beauty we apply threading, lamination, and tinting techniques to create brows that highlight your natural beauty.",
    treatments: [
      "Threading Design & Shaping",
      "Wax Shaping",
      "Brow Lamination",
      "Brow Tint",
      "Brow Henna",
      "Micropigmentation",
    ],
    ctaTitleHtml: 'Ready for <em class="gold-accent">perfect brows</em>?',
    bookingMessage:
      "Hello! I'd like to book a brow appointment at FC Luxe & Beauty.",
  },
};

function buildServicePageTranslations(pageKey, content) {
  return [
    titleOp(`${pageKey}:title`, content.docTitle),
    metaOp(`${pageKey}:meta`, 'meta[name="description"]', content.metaDesc),
    attrOp(`${pageKey}:breadcrumbAria`, ".breadcrumb", {
      "aria-label": "Breadcrumb",
    }),
    textOp(
      `${pageKey}:heroLabel`,
      ".page-hero__content .section-label",
      content.heroLabel,
    ),
    htmlOp(
      `${pageKey}:heroTitle`,
      ".page-hero__content h1",
      content.heroTitleHtml,
    ),
    textOp(
      `${pageKey}:heroSubtitle`,
      ".page-hero__content p",
      content.heroSubtitle,
    ),
    textOp(
      `${pageKey}:breadcrumbHome`,
      ".breadcrumb__list li:nth-child(1) a",
      "Home",
    ),
    textOp(
      `${pageKey}:breadcrumbServices`,
      ".breadcrumb__list li:nth-child(3) a",
      "Services",
    ),
    textOp(
      `${pageKey}:breadcrumbCurrent`,
      ".breadcrumb__list li:nth-child(5) a",
      content.breadcrumbCurrent,
    ),
    textOp(
      `${pageKey}:detailLabel`,
      ".service-detail__text .section-label",
      content.detailLabel,
    ),
    htmlOp(
      `${pageKey}:detailTitle`,
      ".service-detail__text h1",
      content.detailTitleHtml,
    ),
    textOp(`${pageKey}:detailIntro`, ".service-detail__intro", content.intro),
    textOp(
      `${pageKey}:treatmentsTitle`,
      ".treatments h3",
      "Available treatments",
    ),
    textAllOp(
      `${pageKey}:treatments`,
      ".treatment-item__name",
      content.treatments,
    ),
    textOp(
      `${pageKey}:serviceCta`,
      ".service-detail__cta .btn--pink",
      "Book this service",
    ),
    htmlOp(
      `${pageKey}:serviceLink`,
      ".service-detail__cta .btn--ghost",
      'View all services <span class="btn__arrow"></span>',
    ),
    htmlOp(`${pageKey}:bottomTitle`, ".interior-cta h2", content.ctaTitleHtml),
    textOp(`${pageKey}:bottomButton`, ".interior-cta .btn--pink", "Book now"),
  ];
}

const PAGE_TRANSLATIONS = {
  "index.html": [
    titleOp("index:title", "FC Luxe & Beauty | Premium Beauty Salon"),
    metaOp(
      "index:meta",
      'meta[name="description"]',
      "FC Luxe & Beauty — Premium beauty salon. Manicure, hair extensions, massages, facials, lashes, and more.",
    ),
    attrOp("index:heroAria", ".hero", { "aria-label": "Cover" }),
    htmlOp(
      "index:heroTitle",
      ".hero__title",
      'Your moment of<br />glow<br /><em class="gold-accent">starts here</em>',
    ),
    htmlOp(
      "index:heroSubtitle",
      ".hero__subtitle",
      "Treatments designed for you. A space where<br />care and luxury meet.",
    ),
    textOp("index:heroPrimaryBtn", ".hero__actions .btn--pink", "Book now"),
    htmlOp(
      "index:heroSecondaryBtn",
      ".hero__actions .btn--ghost",
      'View services <span class="btn__arrow" aria-hidden="true"></span>',
    ),
    textAllOp("index:marquee", ".marquee__item", [
      "Manicure",
      "Pedicure",
      "Hair Extensions",
      "Massages",
      "Facials",
      "Smoothing",
      "Lashes",
      "Hair Color",
      "FC Luxe & Beauty",
      "Manicure",
      "Pedicure",
      "Hair Extensions",
      "Massages",
      "Facials",
      "Smoothing",
      "Lashes",
      "Hair Color",
      "FC Luxe & Beauty",
    ]),
    attrOp("index:servicesAria", ".drag-slider", {
      "aria-label": "Our services",
    }),
    textOp("index:servicesEyebrow", ".drag-slider__eyebrow", "What we do"),
    htmlOp(
      "index:servicesTitle",
      ".drag-slider__title",
      "Our <em>Services</em>",
    ),
    htmlOp(
      "index:servicesHint",
      ".drag-slider__hint",
      '<span class="drag-slider__hint-icon">⟵</span> Drag to explore <span class="drag-slider__hint-icon">⟶</span>',
    ),
    textAllOp("index:cardLabels", ".drag-slider__card-label", [
      "Manicure",
      "Pedicure",
      "Lashes",
      "Hair Extensions",
      "Facials",
      "Massages",
      "Smoothing",
      "Hair Color",
      "Brows",
    ]),
    textOp(
      "index:allServicesBtn",
      ".drag-slider__footer .btn--outline",
      "View all services",
    ),
    textOp("index:aboutLabel", ".about .section-label", "Our story"),
    htmlOp(
      "index:aboutTitle",
      "#about-title",
      'Beauty that<br /><em class="gold-accent">transforms,</em><br />care that lasts',
    ),
    textOp(
      "index:aboutText1",
      ".about__text p:nth-of-type(1)",
      "At FC Luxe & Beauty, we believe every person deserves to feel extraordinary. Our salon is a space where elegance, professional care, and human warmth come together to offer you a one-of-a-kind experience.",
    ),
    textOp(
      "index:aboutText2",
      ".about__text p:nth-of-type(2)",
      "We have certified specialists in every area, top-quality products, and an atmosphere designed to make you feel at home from the very first moment.",
    ),
    htmlOp(
      "index:aboutBtn",
      ".about__text .btn--ghost",
      'Discover our story <span class="btn__arrow" aria-hidden="true"></span>',
    ),
    textOp("index:galleryLabel", ".gallery__eyebrow", "Real results"),
    htmlOp(
      "index:galleryTitle",
      "#gallery-title",
      'Our <em class="gold-accent">clients</em>',
    ),
    textOp(
      "index:gallerySub",
      ".gallery__sub",
      "Real results. Real people. Experiences that transform.",
    ),
    htmlOp(
      "index:galleryBtn",
      ".gallery__cta",
      'View full gallery <span class="btn__arrow" aria-hidden="true"></span>',
    ),
    textOp(
      "index:testimonialsLabel",
      ".testimonials .section-label",
      "What they say",
    ),
    htmlOp(
      "index:testimonialsTitle",
      "#testimonials-title",
      'Voices that<br /><em class="gold-accent">inspire us</em>',
    ),
    attrAllOp(
      "index:testimonialsStars",
      ".testimonial-card__stars",
      Array.from({ length: 3 }, () => ({ "aria-label": "5 stars" })),
    ),
    textAllOp("index:testimonialsQuotes", ".testimonial-card blockquote p", [
      '"The best salon I have ever visited. The atmosphere is incredible and the results exceeded my expectations. My lashes turned out perfect."',
      '"I came for the first time and now I do not want to go anywhere else. My manicure lasted more than two flawless weeks. The team is incredibly professional."',
      '"The facial was a total luxury experience. My skin looked radiant. I will definitely come back every month. 100% recommended!"',
    ]),
    textAllOp("index:testimonialsServices", ".testimonial-card__service", [
      "Lash Extensions",
      "Semi-Permanent Manicure",
      "Hydrating Facial",
    ]),
    textOp(
      "index:finalCtaLabel",
      ".cta-section .section-label",
      "Ready to shine?",
    ),
    htmlOp(
      "index:finalCtaTitle",
      "#cta-title",
      'Book your appointment<br /><em class="gold-accent">today</em>',
    ),
    textOp(
      "index:finalCtaText",
      ".cta-section__content p",
      "Reserve your moment of wellness at FC Luxe & Beauty. We'll be waiting with open arms.",
    ),
    textOp(
      "index:finalCtaBtn",
      ".cta-section__content .btn--pink",
      "Book on WhatsApp",
    ),
  ],
  "servicios.html": [
    titleOp("services:title", "Services — FC Luxe & Beauty"),
    metaOp(
      "services:meta",
      'meta[name="description"]',
      "Beauty services in Bahía de Banderas, Nayarit: manicure, pedicure, brows, lashes, facials, massages, and more.",
    ),
    textOp(
      "services:heroLabel",
      ".page-hero__content .section-label",
      "What we offer",
    ),
    htmlOp(
      "services:heroTitle",
      ".page-hero__content h1",
      'Our<br /><em class="gold-accent">Services</em>',
    ),
    textOp(
      "services:heroText",
      ".page-hero__content p",
      "Every treatment designed with precision to enhance your natural beauty.",
    ),
    textAllOp("services:cardTitles", ".service-card__body h3", [
      "Manicure",
      "Pedicure",
      "Hair Extensions",
      "Massages",
      "Facials",
      "Smoothing",
      "Lash Extensions",
      "Hair Color",
      "Brows",
    ]),
    textAllOp("services:cardDescriptions", ".service-card__body p", [
      "Perfect nails with long-lasting finishes that speak for themselves.",
      "A wellness ritual for your feet that lasts for weeks.",
      "Natural volume and length applied with maximum precision.",
      "Rituals that release tension and restore total balance.",
      "Glowing skin with next-generation treatments.",
      "Smooth, soft, and shiny hair that protects your hair health.",
      "An unforgettable look with artistically applied lash extensions.",
      "Color that expresses your unique personality with expert technique.",
      "Perfect brows that frame and enhance your natural gaze.",
    ]),
    htmlAllOp(
      "services:cardButtons",
      ".service-card__body .btn--ghost",
      Array.from(
        { length: 9 },
        () => 'Learn more <span class="btn__arrow" aria-hidden="true"></span>',
      ),
    ),
    htmlOp(
      "services:ctaTitle",
      ".interior-cta h2",
      'Ready for your <em class="gold-accent">transformation</em>?',
    ),
    textOp("services:ctaButton", ".interior-cta .btn--pink", "Book now"),
  ],
  "historia.html": [
    titleOp("story:title", "Our Story — FC Luxe & Beauty"),
    metaOp(
      "story:meta",
      'meta[name="description"]',
      "Our story — FC Luxe & Beauty. Discover who we are and what inspires us.",
    ),
    textOp(
      "story:heroLabel",
      ".page-hero__content .section-label",
      "Who we are",
    ),
    htmlOp(
      "story:heroTitle",
      ".page-hero__content h1",
      'Our <em class="gold-accent">Story</em>',
    ),
    textOp(
      "story:heroText",
      ".page-hero__content p",
      "The beginning of a dream come true.",
    ),
    textAllOp("story:sectionLabels", ".historia-grid .section-label", [
      "Our beginnings",
      "Our philosophy",
    ]),
    htmlOp(
      "story:block1Title",
      ".historia-grid:nth-of-type(1) h2",
      'From a dream to <em class="gold-accent">reality</em>',
    ),
    textOp(
      "story:block1Text1",
      ".historia-grid:nth-of-type(1) p:nth-of-type(1)",
      "FC Luxe & Beauty was born from the passion for making every person who walks through our door feel extraordinary. What began as a vision became a benchmark beauty salon where luxury and warmth coexist.",
    ),
    textOp(
      "story:block1Text2",
      ".historia-grid:nth-of-type(1) p:nth-of-type(2)",
      "Every service we offer is the result of years of study, practice, and love for the art of beauty. Our team constantly trains and updates its skills so we can always bring you the latest techniques in the industry.",
    ),
    htmlOp(
      "story:block2Title",
      ".historia-grid:nth-of-type(2) h2",
      'Beauty that <em class="gold-accent">transforms</em>',
    ),
    textOp(
      "story:block2Text1",
      ".historia-grid:nth-of-type(2) p:nth-of-type(1)",
      "We believe outer beauty reflects inner well-being. That is why every treatment is designed not only to elevate your appearance, but also to leave you feeling renewed, confident, and radiant.",
    ),
    textOp(
      "story:block2Text2",
      ".historia-grid:nth-of-type(2) p:nth-of-type(2)",
      "We use only high-quality products that are safe for your skin and hair because your well-being is our number one priority.",
    ),
    textOp(
      "story:valuesLabel",
      ".valores-section .section-label",
      "What drives us",
    ),
    htmlOp(
      "story:valuesTitle",
      "#valores-title",
      'Our <em class="gold-accent">values</em>',
    ),
    textAllOp("story:valueTitles", ".valor-card h3", [
      "Excellence",
      "Trust",
      "Innovation",
    ]),
    textAllOp("story:valueTexts", ".valor-card p", [
      "Every detail matters. We work with precision and dedication in every service we provide.",
      "We build lasting relationships based on honesty and respect for every client.",
      "Always at the forefront of the latest beauty trends and techniques from around the world.",
    ]),
    htmlOp(
      "story:ctaTitle",
      ".interior-cta h2",
      'Come <em class="gold-accent">meet us</em>',
    ),
    textOp(
      "story:ctaText",
      ".interior-cta p",
      "We will be waiting with open arms to show you everything we can do for you.",
    ),
    textOp("story:ctaButton", ".interior-cta .btn--pink", "Book now"),
  ],
  "galeria.html": [
    titleOp("gallery:title", "Gallery — FC Luxe & Beauty"),
    metaOp(
      "gallery:meta",
      'meta[name="description"]',
      "FC Luxe & Beauty gallery — Explore our work and results.",
    ),
    textOp(
      "gallery:heroLabel",
      ".page-hero__content .section-label",
      "Our work",
    ),
    htmlOp(
      "gallery:heroTitle",
      ".page-hero__content h1",
      'Beauty <em class="gold-accent">Gallery</em>',
    ),
    textOp(
      "gallery:heroText",
      ".page-hero__content p",
      "Every photo tells a story of transformation.",
    ),
    htmlOp(
      "gallery:pageTitle",
      ".gallery-page__header h2",
      'Moments of <em class="gold-accent">Transformation</em>',
    ),
    textOp(
      "gallery:pageText",
      ".gallery-page__header p",
      "Each image reflects our dedication and passion for beauty.",
    ),
    htmlOp(
      "gallery:ctaTitle",
      ".interior-cta h2",
      'Ready for your <em class="gold-accent">transformation</em>?',
    ),
    textOp(
      "gallery:ctaText",
      ".interior-cta p",
      "Book now and let our magic speak for itself.",
    ),
    textOp("gallery:ctaButton", ".interior-cta .btn--pink", "Book now"),
  ],
  "contacto.html": [
    titleOp("contact:title", "Contact — FC Luxe & Beauty"),
    metaOp(
      "contact:meta",
      'meta[name="description"]',
      "Contact FC Luxe & Beauty in Bahía de Banderas, Nayarit, México. Book your appointment via WhatsApp.",
    ),
    textOp(
      "contact:heroLabel",
      ".page-hero__content .section-label",
      "We're here for you",
    ),
    htmlOp(
      "contact:heroTitle",
      ".page-hero__content h1",
      'Let\'s talk about your <em class="gold-accent">appointment</em>',
    ),
    textOp(
      "contact:heroText",
      ".page-hero__content p",
      "Message us and we'll be happy to help.",
    ),
    textOp("contact:infoLabel", ".contacto-info .section-label", "Information"),
    htmlOp(
      "contact:infoTitle",
      ".contacto-info h2",
      'We can <em class="gold-accent">help you</em>',
    ),
    textAllOp("contact:itemHeadings", ".contacto-info__text h4", [
      "WhatsApp",
      "Email",
      "Address",
      "Social media",
    ]),
    textOp(
      "contact:responseText",
      ".contacto-info__text p[style]",
      "Fast response during business hours",
    ),
    htmlOp(
      "contact:addressText",
      ".contacto-info__item:nth-of-type(3) .contacto-info__text p",
      "Valle de Arce #143, Suite 4<br />Col. Valle Dorado, Bahía de Banderas, Nayarit",
    ),
    attrOp("contact:mapAttrs", ".contacto-map iframe", {
      title: "FC Luxe & Beauty location",
      "aria-label": "FC Luxe & Beauty location map",
    }),
    textOp(
      "contact:stripEyebrow",
      ".wa-strip__eyebrow",
      "Ready for your appointment?",
    ),
    htmlOp(
      "contact:stripTitle",
      ".wa-strip h3",
      "Message us and we'll <em>assist you right away</em>",
    ),
    textOp(
      "contact:stripText",
      ".wa-strip p",
      "Our team is ready to help you choose the ideal service and schedule your visit.",
    ),
    htmlOp(
      "contact:stripBtn",
      ".wa-strip-btn",
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg> WhatsApp now',
    ),
  ],
};

Object.entries(SERVICE_PAGE_CONTENT).forEach(([pageKey, content]) => {
  PAGE_TRANSLATIONS[pageKey] = buildServicePageTranslations(pageKey, content);
});

function getPageKey() {
  const path = window.location.pathname.replace(/\\/g, "/");
  const parts = path.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "index.html";
  const prev = parts[parts.length - 2] || "";

  if (!last || !last.includes(".")) return "index.html";
  if (prev === "servicios") return `servicios/${last}`;
  return last;
}

function getStoredLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // noop
  }
}

function isLoaderVisible() {
  const loader = document.querySelector(".page-loader");
  return Boolean(loader && getComputedStyle(loader).display !== "none");
}

function syncBodyOverflow() {
  const menuIsOpen = Boolean(document.querySelector(".nav-overlay.open"));
  document.body.style.overflow =
    isLoaderVisible() || menuIsOpen || isLanguageModalOpen ? "hidden" : "";
}

function cacheOperationState(op, nodes) {
  if (originalTranslationState.has(op.id)) return;

  switch (op.kind) {
    case "text":
      originalTranslationState.set(op.id, nodes[0]?.textContent ?? null);
      break;
    case "html":
      originalTranslationState.set(op.id, nodes[0]?.innerHTML ?? null);
      break;
    case "textAll":
      originalTranslationState.set(
        op.id,
        nodes.map((node) => node.textContent),
      );
      break;
    case "htmlAll":
      originalTranslationState.set(
        op.id,
        nodes.map((node) => node.innerHTML),
      );
      break;
    case "attrs":
      originalTranslationState.set(
        op.id,
        Object.fromEntries(
          Object.keys(op.attrs).map((attrName) => [
            attrName,
            nodes[0]?.getAttribute(attrName),
          ]),
        ),
      );
      break;
    case "attrsAll":
      originalTranslationState.set(
        op.id,
        nodes.map((node, index) => {
          const attrs = op.attrsList[index] || {};
          return Object.fromEntries(
            Object.keys(attrs).map((attrName) => [
              attrName,
              node.getAttribute(attrName),
            ]),
          );
        }),
      );
      break;
    case "title":
      originalTranslationState.set(op.id, document.title);
      break;
    case "meta": {
      const meta = document.querySelector(op.selector);
      originalTranslationState.set(
        op.id,
        meta?.getAttribute("content") ?? null,
      );
      break;
    }
  }
}

function restoreAttributeValue(node, attrName, value) {
  if (value === null || typeof value === "undefined") {
    node.removeAttribute(attrName);
  } else {
    node.setAttribute(attrName, value);
  }
}

function applyOperation(op) {
  const nodes = op.selector
    ? Array.from(document.querySelectorAll(op.selector))
    : [];
  cacheOperationState(op, nodes);

  switch (op.kind) {
    case "text":
      if (nodes[0]) nodes[0].textContent = op.value;
      break;
    case "html":
      if (nodes[0]) nodes[0].innerHTML = op.value;
      break;
    case "textAll":
      nodes.forEach((node, index) => {
        if (typeof op.values[index] !== "undefined") {
          node.textContent = op.values[index];
        }
      });
      break;
    case "htmlAll":
      nodes.forEach((node, index) => {
        if (typeof op.values[index] !== "undefined") {
          node.innerHTML = op.values[index];
        }
      });
      break;
    case "attrs":
      if (nodes[0]) {
        Object.entries(op.attrs).forEach(([attrName, value]) => {
          restoreAttributeValue(nodes[0], attrName, value);
        });
      }
      break;
    case "attrsAll":
      nodes.forEach((node, index) => {
        const attrs = op.attrsList[index] || {};
        Object.entries(attrs).forEach(([attrName, value]) => {
          restoreAttributeValue(node, attrName, value);
        });
      });
      break;
    case "title":
      document.title = op.value;
      break;
    case "meta": {
      const meta = document.querySelector(op.selector);
      if (meta) meta.setAttribute("content", op.value);
      break;
    }
  }
}

function restoreOperation(op) {
  if (!originalTranslationState.has(op.id)) return;

  const originalValue = originalTranslationState.get(op.id);
  const nodes = op.selector
    ? Array.from(document.querySelectorAll(op.selector))
    : [];

  switch (op.kind) {
    case "text":
      if (nodes[0] && originalValue !== null)
        nodes[0].textContent = originalValue;
      break;
    case "html":
      if (nodes[0] && originalValue !== null)
        nodes[0].innerHTML = originalValue;
      break;
    case "textAll":
      nodes.forEach((node, index) => {
        if (typeof originalValue?.[index] !== "undefined") {
          node.textContent = originalValue[index];
        }
      });
      break;
    case "htmlAll":
      nodes.forEach((node, index) => {
        if (typeof originalValue?.[index] !== "undefined") {
          node.innerHTML = originalValue[index];
        }
      });
      break;
    case "attrs":
      if (nodes[0]) {
        Object.entries(originalValue || {}).forEach(([attrName, value]) => {
          restoreAttributeValue(nodes[0], attrName, value);
        });
      }
      break;
    case "attrsAll":
      nodes.forEach((node, index) => {
        const attrs = originalValue?.[index] || {};
        Object.entries(attrs).forEach(([attrName, value]) => {
          restoreAttributeValue(node, attrName, value);
        });
      });
      break;
    case "title":
      if (typeof originalValue === "string") document.title = originalValue;
      break;
    case "meta": {
      const meta = document.querySelector(op.selector);
      if (meta) restoreAttributeValue(meta, "content", originalValue);
      break;
    }
  }
}

function getTranslationOperations() {
  const pageKey = getPageKey();
  return [...COMMON_TRANSLATIONS, ...(PAGE_TRANSLATIONS[pageKey] || [])];
}

function getEnglishWhatsAppMessage(pageKey) {
  if (SERVICE_PAGE_CONTENT[pageKey]?.bookingMessage) {
    return SERVICE_PAGE_CONTENT[pageKey].bookingMessage;
  }

  const genericMessages = {
    "index.html": "Hello! I'd like to book an appointment at FC Luxe & Beauty.",
    "servicios.html": "Hello! I'd like to book a service at FC Luxe & Beauty.",
    "historia.html":
      "Hello! I'd like to book an appointment at FC Luxe & Beauty.",
    "galeria.html":
      "Hello! I'd like to book an appointment at FC Luxe & Beauty.",
    "contacto.html":
      "Hello! I'd like to book an appointment at FC Luxe & Beauty.",
  };

  return (
    genericMessages[pageKey] ||
    "Hello! I'd like to book an appointment at FC Luxe & Beauty."
  );
}

function updateWhatsAppLinks(language) {
  const pageKey = getPageKey();
  const englishMessage = getEnglishWhatsAppMessage(pageKey);

  document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
    if (!link.dataset.whatsappEs) {
      link.dataset.whatsappEs = link.getAttribute("href") || "";
    }

    if (!link.dataset.whatsappEn) {
      try {
        const url = new URL(link.dataset.whatsappEs, window.location.href);
        url.searchParams.set("text", englishMessage);
        link.dataset.whatsappEn = url.toString();
      } catch {
        link.dataset.whatsappEn = link.dataset.whatsappEs;
      }
    }

    link.setAttribute(
      "href",
      language === "en" ? link.dataset.whatsappEn : link.dataset.whatsappEs,
    );
  });
}

function updateLanguageUi(language) {
  const ui = LANGUAGE_UI_COPY[language] || LANGUAGE_UI_COPY.es;
  const modalCard = document.querySelector(".language-modal__card");

  if (modalCard) modalCard.setAttribute("aria-label", ui.modalLabel);

  document.querySelectorAll("[data-language-modal-label]").forEach((node) => {
    node.textContent = ui.modalLabel;
  });
  document.querySelectorAll("[data-language-title]").forEach((node) => {
    node.textContent = ui.modalTitle;
  });
  document.querySelectorAll("[data-language-text]").forEach((node) => {
    node.textContent = ui.modalText;
  });
  document.querySelectorAll("[data-language-spanish-label]").forEach((node) => {
    node.textContent = ui.spanishLabel;
  });
  document.querySelectorAll("[data-language-spanish-hint]").forEach((node) => {
    node.textContent = ui.spanishHint;
  });
  document.querySelectorAll("[data-language-english-label]").forEach((node) => {
    node.textContent = ui.englishLabel;
  });
  document.querySelectorAll("[data-language-english-hint]").forEach((node) => {
    node.textContent = ui.englishHint;
  });

  const closeBtn = document.querySelector(".language-modal__close");
  if (closeBtn) closeBtn.setAttribute("aria-label", ui.closeLabel);

  const trigger = document.querySelector(".language-switcher");
  if (trigger) trigger.setAttribute("aria-label", ui.triggerLabel);

  const triggerText = document.querySelector("[data-language-current]");
  if (triggerText) triggerText.textContent = ui.triggerText;

  document.querySelectorAll(".language-option").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === language);
    button.setAttribute(
      "aria-pressed",
      button.dataset.lang === language ? "true" : "false",
    );
  });

  document.querySelectorAll("[data-mobile-services-label]").forEach((node) => {
    node.textContent = ui.mobileServicesLabel;
  });

  document.querySelectorAll("[data-mobile-back-label]").forEach((node) => {
    node.textContent = ui.mobileBackLabel;
  });

  document
    .querySelectorAll(".nav-overlay__mobile-services-btn")
    .forEach((node) => {
      node.setAttribute("aria-label", ui.mobileServicesLabel);
    });

  document.querySelectorAll(".nav-overlay__mobile-back").forEach((node) => {
    node.setAttribute("aria-label", ui.mobileBackLabel);
  });
}

function setHtmlLanguage(language) {
  document.documentElement.lang = language;

  const localeMeta = document.querySelector('meta[property="og:locale"]');
  if (localeMeta) {
    localeMeta.setAttribute("content", language === "en" ? "en_US" : "es_MX");
  }
}

function applyLanguage(language, { persist = true } = {}) {
  const operations = getTranslationOperations();

  if (language === "en") {
    operations.forEach((operation) => applyOperation(operation));
  } else {
    operations.forEach((operation) => restoreOperation(operation));
  }

  currentLanguage = language;
  setHtmlLanguage(language);
  updateWhatsAppLinks(language);
  updateLanguageUi(language);

  if (persist) setStoredLanguage(language);
}

function openLanguageModal() {
  const modal = document.querySelector(".language-modal");
  if (!modal) return;

  modal.classList.add("is-visible");
  modal.setAttribute("aria-hidden", "false");
  isLanguageModalOpen = true;
  syncBodyOverflow();
}

function closeLanguageModal({ rememberCurrent = true } = {}) {
  const modal = document.querySelector(".language-modal");
  if (!modal) return;

  modal.classList.remove("is-visible");
  modal.setAttribute("aria-hidden", "true");
  isLanguageModalOpen = false;

  if (rememberCurrent && !getStoredLanguage()) {
    setStoredLanguage(currentLanguage);
  }

  syncBodyOverflow();
}

function buildLanguageInterface() {
  if (document.querySelector(".language-modal")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <button class="language-switcher" type="button" aria-label="Cambiar idioma">
        <span class="language-switcher__flag" aria-hidden="true">🌐</span>
        <span data-language-current>ES</span>
      </button>

      <div class="language-modal" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="language-modal__backdrop" data-language-close></div>
        <div class="language-modal__card" aria-label="Selector de idioma">
          <button class="language-modal__close" type="button" aria-label="Cerrar selector de idioma">✕</button>
          <p class="language-modal__eyebrow" data-language-modal-label>Selector de idioma</p>
          <h2 data-language-title>Elige cómo quieres ver la página</h2>
          <p class="language-modal__text" data-language-text>
            Selecciona tu idioma favorito. Puedes cambiarlo nuevamente cuando quieras.
          </p>

          <div class="language-modal__options">
            <button class="language-option" type="button" data-lang="es" aria-pressed="true">
              <span class="language-option__flag" aria-hidden="true">🇲🇽</span>
              <span class="language-option__content">
                <strong data-language-spanish-label>Español</strong>
                <span data-language-spanish-hint>Continuar en español</span>
              </span>
            </button>

            <button class="language-option" type="button" data-lang="en" aria-pressed="false">
              <span class="language-option__flag" aria-hidden="true">🇺🇸</span>
              <span class="language-option__content">
                <strong data-language-english-label>Inglés</strong>
                <span data-language-english-hint>Switch to English</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    `,
  );

  const trigger = document.querySelector(".language-switcher");
  const closeBtn = document.querySelector(".language-modal__close");
  const backdrop = document.querySelector("[data-language-close]");

  if (trigger) trigger.addEventListener("click", openLanguageModal);
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeLanguageModal());
  }
  if (backdrop) {
    backdrop.addEventListener("click", () => closeLanguageModal());
  }

  document.querySelectorAll(".language-option").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.lang || "es");
      closeLanguageModal({ rememberCurrent: true });
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isLanguageModalOpen) {
      closeLanguageModal();
    }
  });
}

function initLanguageSystem() {
  buildLanguageInterface();

  const storedLanguage = getStoredLanguage();
  applyLanguage(storedLanguage || "es", { persist: false });
}

function maybePromptLanguageSelection() {
  if (getStoredLanguage()) return;

  window.setTimeout(() => {
    openLanguageModal();
  }, 180);
}

// ─── PAGE LOADER ──────────────────────────────────────────────────────────────
function initLoader(onComplete) {
  const loader = document.querySelector(".page-loader");
  const logo = document.querySelector(".page-loader__logo");
  const barFill = document.querySelector(".page-loader__bar-fill");
  const barLine = document.querySelector(".page-loader__bar-line");
  const doorL = document.querySelector(".page-loader__door--left");
  const doorR = document.querySelector(".page-loader__door--right");
  const hero = document.querySelector(".hero");
  if (!loader) return;

  syncBodyOverflow();

  // Hero empieza invisible; aparece cuando las puertas se abran
  if (hero) gsap.set(hero, { opacity: 0 });

  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = "none";
      syncBodyOverflow();
      if (typeof onComplete === "function") onComplete();
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
  const servicesCol = document.querySelector(".nav-overlay__col--services");
  const navLinksWrap = document.querySelector(".nav-overlay__nav-links");

  if (!menuBtn || !overlay) return;

  let isOpen = false;
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  function toggleMobileServicesView(showServices) {
    if (!mobileQuery.matches) {
      overlay.classList.remove("mobile-services-open");
      return;
    }

    overlay.classList.toggle("mobile-services-open", Boolean(showServices));
  }

  function ensureMobileMenuToggleControls() {
    if (!navLinksWrap || !servicesCol) return;

    if (!overlay.querySelector(".nav-overlay__mobile-services-btn")) {
      const openServicesBtn = document.createElement("button");
      openServicesBtn.type = "button";
      openServicesBtn.className = "nav-overlay__mobile-services-btn";
      openServicesBtn.setAttribute("aria-label", "Mostrar servicios");
      openServicesBtn.innerHTML =
        '<span data-mobile-services-label>Servicios</span><span class="nav-overlay__mobile-services-arrow" aria-hidden="true">→</span>';

      navLinksWrap.insertAdjacentElement("afterend", openServicesBtn);

      openServicesBtn.addEventListener("click", () => {
        toggleMobileServicesView(true);
      });
    }

    if (!servicesCol.querySelector(".nav-overlay__mobile-back")) {
      const backBtn = document.createElement("button");
      backBtn.type = "button";
      backBtn.className = "nav-overlay__mobile-back";
      backBtn.setAttribute("aria-label", "Volver al menú");
      backBtn.innerHTML =
        '<span class="nav-overlay__mobile-back-arrow" aria-hidden="true">←</span><span data-mobile-back-label>Volver al menú</span>';

      servicesCol.insertAdjacentElement("afterbegin", backBtn);

      backBtn.addEventListener("click", () => {
        toggleMobileServicesView(false);
      });
    }
  }

  ensureMobileMenuToggleControls();
  updateLanguageUi(currentLanguage);

  function openMenu() {
    isOpen = true;
    overlay.classList.add("open");
    toggleMobileServicesView(false);
    menuBtn.classList.add("active");
    menuBtn.setAttribute("aria-expanded", "true");
    if (navbar) navbar.classList.add("menu-open");
    syncBodyOverflow();
  }

  function closeMenu() {
    isOpen = false;
    overlay.classList.remove("open");
    overlay.classList.remove("mobile-services-open");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    if (navbar) navbar.classList.remove("menu-open");
    syncBodyOverflow();
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

  mobileQuery.addEventListener("change", () => {
    if (!mobileQuery.matches) {
      overlay.classList.remove("mobile-services-open");
    }
  });

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
          toggleActions: "play none none reset",
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
          toggleActions: "play none none reset",
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
          toggleActions: "play none none reset",
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
          toggleActions: "play none none reset",
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
          toggleActions: "play none none reset",
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
  gsap.set(".hero__title", { opacity: 0, y: 60 });
  gsap.set(".hero__subtitle", { opacity: 0, y: 30 });
  gsap.set(".hero__actions", { opacity: 0, y: 20 });
  gsap.set(".hero__scroll-hint", { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.15 });

  tl.to(".hero__title", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
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
        toggleActions: "play none none reset",
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

// ─── PARALLAX HERO INTERIOR (page-hero) ───────────────────────────────────────
function initPageHeroParallax() {
  const hero = document.querySelector(".page-hero");
  const img = document.querySelector(".page-hero__bg img");
  const content = document.querySelector(".page-hero__content");
  if (!hero || !img) return;

  gsap.to(img, {
    yPercent: 14,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (reduceMotion || !finePointer) return;

  const imgXTo = gsap.quickTo(img, "x", {
    duration: 0.65,
    ease: "power3.out",
  });
  const imgYTo = gsap.quickTo(img, "y", {
    duration: 0.65,
    ease: "power3.out",
  });

  const contentXTo = content
    ? gsap.quickTo(content, "x", {
        duration: 0.8,
        ease: "power3.out",
      })
    : null;

  const contentYTo = content
    ? gsap.quickTo(content, "y", {
        duration: 0.8,
        ease: "power3.out",
      })
    : null;

  const onMove = (e) => {
    const rect = hero.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    imgXTo(px * 28);
    imgYTo(py * 22);

    if (contentXTo) contentXTo(px * -10);
    if (contentYTo) contentYTo(py * -8);
  };

  const reset = () => {
    imgXTo(0);
    imgYTo(0);
    if (contentXTo) contentXTo(0);
    if (contentYTo) contentYTo(0);
  };

  hero.addEventListener("mousemove", onMove);
  hero.addEventListener("mouseleave", reset);
  window.addEventListener("blur", reset);
}

function imageExists(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function getSequentialImages({
  folder,
  prefix,
  max = 120,
  stopAfterMisses = 8,
}) {
  const found = [];
  let misses = 0;

  for (let i = 1; i <= max && misses < stopAfterMisses; i++) {
    const src = `rsc/png/${folder}/${prefix} (${i}).png`;
    if (await imageExists(src)) {
      found.push(src);
      misses = 0;
    } else {
      misses += 1;
    }
  }

  return found;
}

function interleaveArrays(a, b) {
  const output = [];
  const maxLength = Math.max(a.length, b.length);

  for (let i = 0; i < maxLength; i++) {
    if (a[i]) output.push(a[i]);
    if (b[i]) output.push(b[i]);
  }

  return output;
}

function getImageNumericIndex(src) {
  const match = src.match(/\((\d+)\)\.png$/);
  return match ? Number(match[1]) : 0;
}

function orderGalleryImages(images, mode = "latest-first") {
  const ordered = [...images];

  if (mode === "latest-first") {
    ordered.sort((a, b) => getImageNumericIndex(b) - getImageNumericIndex(a));
  } else if (mode === "oldest-first") {
    ordered.sort((a, b) => getImageNumericIndex(a) - getImageNumericIndex(b));
  }

  return ordered;
}

async function initAutoGalleryMasonry() {
  const masonry = document.querySelector(
    '.gallery-masonry[data-auto-gallery="true"]',
  );
  if (!masonry || masonry.dataset.rendered === "true") return;
  const orderMode = masonry.dataset.galleryOrder || "latest-first";

  const [fernandaImages, clientasImages] = await Promise.all([
    getSequentialImages({ folder: "fernanda", prefix: "fer" }),
    getSequentialImages({ folder: "clientas", prefix: "clientas" }),
  ]);

  const orderedFernanda = orderGalleryImages(fernandaImages, orderMode);
  const orderedClientas = orderGalleryImages(clientasImages, orderMode);

  const orderedImages = interleaveArrays(orderedFernanda, orderedClientas);
  if (!orderedImages.length) return;

  masonry.innerHTML = orderedImages
    .map(
      (src) =>
        `<div class="g-item"><img src="${src}" alt="FC Luxe Beauty" loading="lazy" /></div>`,
    )
    .join("");

  masonry.dataset.rendered = "true";
  ScrollTrigger.refresh();
}

// ─── INICIALIZACIÓN PRINCIPAL ─────────────────────────────────────────────────
// ─── GALERÍA STICKY — PIN + ROTACIÓN FADE ──────────────────────────────────────
function initGallerySticky() {
  const section = document.querySelector(".gallery");
  const stickyWrap = document.querySelector(".gallery__sticky-wrap");
  const slots = document.querySelectorAll(".gallery__slot-img");
  if (!section || !stickyWrap || !slots.length) return;

  const fallbackImages = Array.from(
    { length: 32 },
    (_, i) => `rsc/png/clientas/clientas (${i + 1}).png`,
  );

  const bootStickyGallery = async () => {
    const discoveredClientImages = await getSequentialImages({
      folder: "clientas",
      prefix: "clientas",
    });
    const allImages = discoveredClientImages.length
      ? discoveredClientImages
      : fallbackImages;

    // Baraja el array con Fisher-Yates
    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    // Genera grupos de 3 sin repetir las del turno anterior
    let lastThree = [];
    function nextGroup() {
      const pool = allImages.filter((s) => !lastThree.includes(s));
      const shuffled = shuffle(pool);
      const group = shuffled.slice(0, 3);
      lastThree = group;
      return group;
    }

    // Aplica un grupo de imágenes con fade GSAP
    function applyGroup(group) {
      const tl = gsap.timeline();
      // Fade out de las imágenes actuales
      tl.to(slots, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        stagger: 0.08,
      });
      // Cambia src y hace fade in
      tl.call(() => {
        slots.forEach((img, i) => {
          img.src = group[i] || "";
        });
      });
      tl.to(slots, {
        opacity: 1,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.1,
      });
      return tl;
    }

    // Carga el primer grupo inmediatamente (sin animación)
    const first = nextGroup();
    slots.forEach((img, i) => {
      img.src = first[i] || "";
      gsap.set(img, { opacity: 1 });
    });

    // ── PIN con ScrollTrigger ──────────────────────────────────────────────────
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: stickyWrap,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // ── Rotación automática cada 3.5 s ────────────────────────────────────────
    let rotationInterval = null;

    function startRotation() {
      if (rotationInterval) return;
      rotationInterval = setInterval(() => {
        applyGroup(nextGroup());
      }, 3500);
    }

    function stopRotation() {
      clearInterval(rotationInterval);
      rotationInterval = null;
    }

    // Arranca/para la rotación cuando la sección entra/sale del viewport
    ScrollTrigger.create({
      trigger: section,
      start: "top 90%",
      end: "bottom 10%",
      onEnter: startRotation,
      onLeave: stopRotation,
      onEnterBack: startRotation,
      onLeaveBack: stopRotation,
    });
  };

  bootStickyGallery();
}

// ─── DESTELLOS TESTIMONIOS ────────────────────────────────────────────────────
function initTestimonialsSparkles() {
  const section = document.querySelector(".testimonials");
  if (!section) return;

  const sparks = section.querySelectorAll(".t-spark");
  if (!sparks.length) return;

  // Estado inicial: invisibles, pequeños
  gsap.set(sparks, { opacity: 0, scale: 0, rotation: 0 });

  // Entrada escalonada cuando la sección entra en viewport
  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    toggleActions: "play none none reset",
    onEnter: () => {
      gsap.to(sparks, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: { amount: 1.4, from: "random" },
      });
    },
    onLeaveBack: () => {
      gsap.to(sparks, {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        ease: "power2.in",
        stagger: { amount: 0.8, from: "random" },
      });
    },
  });
}

function initPageAnimations() {
  initNavbar();
  initScrollAnimations();
  initAutoGalleryMasonry();
  initHeroParallax();
  initHeroEntrance();
  initCounters();
  initCardHover();
  initDragSlider();
  initAccordion();
  initImageParallax();
  initPageHeroParallax();
  initGallerySticky();
  initTestimonialsSparkles();
}

// ─── ARRANQUE ─────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initLanguageSystem();
  initCursor();
  initMenu();

  const startPage = () => {
    initPageAnimations();
    maybePromptLanguageSelection();
  };

  // Si no hay loader, iniciar animaciones directamente
  const loader = document.querySelector(".page-loader");
  if (!loader) {
    startPage();
  } else {
    initLoader(startPage);
  }
});

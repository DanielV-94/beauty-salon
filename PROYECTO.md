# FC LUXE SPA & BEAUTY — Resumen del Proyecto

> Documento técnico-creativo de referencia para el equipo de desarrollo y diseño.

---

## 1. Identidad del proyecto

**Cliente:** FC LUXE SPA & BEAUTY  
**Tipo:** Salón de belleza premium  
**Ubicación:** Valle de Arce #143, Local 4, Col. Valle Dorado, Bahía de Banderas, Nayarit  
**Contacto:** +52 322 202 4062 · cergal.air30@gmail.com  
**Redes sociales:** Instagram + Facebook (links en contacto.html)

**Propuesta estética:** Lujo accesible con estética editorial. Glassmorphism, tipografía serif italiana, paleta rosa-dorado-carbón. Inspirada en revistas de moda europeas de alta gama.

---

## 2. Arquitectura CSS

### Jerarquía de archivos

```
global.css → Se carga en TODAS las páginas
home.css   → Solo index.html
interior.css → Todas las páginas excepto index.html
```

### Variables globales (`global.css`)

```css
--font-title: "Claire" /* Serif italic elegante — h1, h2, h3 */
  --font-subtitle: "Collingar" /* Uppercase tracking — labels, nav */
  --font-body: "BoilingBlack" /* Body text */ --charcoal: #111111
  --white: #ffffff --pink-mist: #ed5c9b /* PRIMARIO — botones, acentos */
  --rose-deep: #921947 /* Deep accent */ --soft-fawn: #dbac60
  /* Dorado — estrellas, destellos */ --lavender-blush: #fdf0f6
  /* Fondo suave secciones */ --section-padding: clamp(80px, 10vw, 140px)
  --container-pad: clamp(20px, 5vw, 80px) --duration-mid: 0.45s
  --ease-luxury: cubic-bezier(0.23, 1, 0.32, 1);
```

---

## 3. Componentes globales

### Navbar

- Fondo: glassmorphism (`backdrop-filter: blur(20px)`) + border bottom rosa
- Estado scroll: fondo semi-sólido activado por `ScrollTrigger`
- Variante oscura: clase `.navbar--dark` para páginas interiores
- Barra de progreso de scroll: `.scroll-progress` (línea rosa que crece con scroll)
- Menú overlay: 3 columnas (imagen izq. + links centro + previsualización derecha)

### Cursor personalizado

- `.cursor-dot`: imagen `pointer.svg` (manito dorada), 32×32px, `mix-blend-mode: difference`
- `.cursor-ring`: desactivado (`display: none`) — reservado para futuro

### Botones

| Clase           | Estilo                                      |
| --------------- | ------------------------------------------- |
| `.btn--pink`    | Fondo rosa sólido, blanco                   |
| `.btn--outline` | Borde oscuro, fondo transparente            |
| `.btn--ghost`   | Borde blanco semitransparente, texto blanco |
| `.btn__arrow`   | Círculo con flecha → (todos los botones)    |

### Animaciones de entrada (ScrollTrigger)

| Clase                | Efecto                    |
| -------------------- | ------------------------- |
| `.reveal`            | Fade up desde Y+40px      |
| `.reveal-left`       | Fade desde X-50px         |
| `.reveal-right`      | Fade desde X+50px         |
| `.reveal-scale`      | Fade + scale desde 0.92   |
| `.stagger-group > *` | Stagger de 0.12s por hijo |

### Marquee

- Banda horizontal de imágenes en bucle infinito (CSS `animation: marqueeScroll`)
- Presente en `index.html`

### Footer

- 4 columnas: Logo+desc / Servicios / Páginas / Contacto
- Responsive: 2 col en 1024px, 1 col en 768px

### Page Loader

- Solo en `index.html`
- Círculo animado + `.page-loader__brand` nombre
- Se desvanece al cargar con GSAP

---

## 4. Mapa de secciones por página

### `index.html` — Home

| Sección        | Clase           | Descripción                                                 |
| -------------- | --------------- | ----------------------------------------------------------- |
| Hero           | `.hero`         | Full-screen, parallax imagen, TextPlugin title              |
| Marquee        | `.marquee`      | Strip de imágenes en movimiento continuo                    |
| Drag Slider    | `.drag-slider`  | Cards de servicios arrastrables, inclinadas, con 130.png bg |
| Sobre nosotras | `.about`        | Grid 50/50: PNG modelo izq. + texto der. Con 130.png bg     |
| Galería sticky | `.gallery`      | GSAP pin con 3 slots que rotan imágenes al scroll           |
| Testimoniales  | `.testimonials` | 3 liquid-glass cards + 23 destellos `t-spark`               |
| CTA Final      | `.cta-section`  | 3 col: modelo izq. + texto center + modelo der.             |
| Footer         | `.footer`       | —                                                           |

### `servicios.html` — Catálogo de servicios

| Sección        | Clase                    | Descripción                                     |
| -------------- | ------------------------ | ----------------------------------------------- |
| Hero           | `.page-hero`             | 65vh, 097.png overlay + imagen de fondo         |
| Grid servicios | `.services-grid-section` | Off-white + overlay 097.png (0.33), 2 columnas  |
| Tarjetas       | `.service-card`          | Horizontal: 200px img + texto. Pink border-left |
| CTA            | `.interior-cta`          | 168.png fondo, overlay rosa, botón blanco       |

### `historia.html` — Historia de la marca

| Sección         | Clase               | Descripción                                          |
| --------------- | ------------------- | ---------------------------------------------------- |
| Hero            | `.page-hero`        | 65vh                                                 |
| Historia        | `.historia-section` | 084.png overlay (0.10), texto + imágenes alternadas  |
| Bloque historia | `.historia-grid`    | 2 col: imagen + texto (reverse en pares)             |
| Valores         | `.valores-section`  | Lavender-blush fondo, 4 liquid glass cards           |
| Cards valor     | `.valor-card`       | blur(28px) + specular ::before + pink border ::after |

**Iconos de valores (inline SVG):**

- 💎 Diamante → Excelencia
- 👑 Corona → Confianza
- ⭐ Estrella 5 puntas → Innovación
- 🌸 Flor de lis (o similar) → 4° valor

### `galeria.html` — Galería de trabajos

| Elemento     | Detalle                                      |
| ------------ | -------------------------------------------- |
| Fondo        | `position: fixed`, 088.png, opacidad 0.06    |
| Layout       | `columns: 3`, `column-gap: 18px`             |
| Imágenes     | 53 fotos (clientas/ + fernanda/) sin filtros |
| Efecto hover | Scale 1.04, z-index elevado                  |

### `contacto.html` — Contacto

| Sección       | Clase/Detalle                                          |
| ------------- | ------------------------------------------------------ |
| Hero          | `.page-hero` 65vh                                      |
| Contacto grid | CSS inline: 2 col `500px 1fr`, gap 50px                |
| Panel info    | 4 ítems con SVG inline (WhatsApp, email, pin, corazón) |
| Mapa          | `display:flex; flex:1` — se estira al alto del panel   |
| WA Strip      | Glassmorphism, centrado, link directo a WhatsApp       |

**Fondo:** 078.png vía `::before` inline, opacidad 0.08.

### `servicios/*.html` — Detalle de servicio

Estructura común:

1. `.page-hero` (hero con imagen)
2. `.service-detail` — grid 2 col: 3 imágenes reales + texto descriptivo
3. Lista de beneficios
4. `.interior-cta` — CTA de reserva

**Rutas de imágenes por servicio:**

```
alisado.html     → ../rsc/png/alasiado/
colorimetria.html → ../rsc/png/colorimetria/
extensiones.html  → ../rsc/png/hair_extension/
faciales.html     → ../rsc/png/faciales/
manicure.html     → ../rsc/png/nails/
masajes.html      → ../rsc/png/masajes/
pedicure.html     → ../rsc/png/pedi/
pestanas.html     → ../rsc/png/lashes/
```

---

## 5. Animaciones JavaScript (`main.js`)

| Función                      | Trigger                | Efecto                                                                             |
| ---------------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| `initLoader()`               | DOMContentLoaded       | Fade-out del loader de página                                                      |
| `initCursor()`               | mousemove              | Cursor personalizado (pointer.svg)                                                 |
| `initNavbar()`               | scroll (ScrollTrigger) | Estado glassmorphism activo + barra progreso                                       |
| `initMenu()`                 | click hamburger        | Overlay menu + preview de imagen por ítem                                          |
| `initScrollAnimations()`     | scroll                 | Revela `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, stagger groups |
| `initHeroParallax()`         | scroll                 | Parallax lento en `.hero__image` (solo home)                                       |
| `initHeroEntrance()`         | DOMContentLoaded       | Animación de entrada del hero (title + subtitle + CTA)                             |
| `initCardHover()`            | mousemove sobre card   | Tilt magnético en `.service-card`                                                  |
| `initDragSlider()`           | drag/touch             | Slider de servicios arrastrable con inercia                                        |
| `initPageHeroParallax()`     | scroll                 | Parallax en `.page-hero__bg img` (páginas interiores)                              |
| `initGallerySticky()`        | scroll (pin)           | Pin galería home + rotación de imágenes en slots                                   |
| `initCounters()`             | scroll                 | ⚠️ Sin HTML activo — función harmless                                              |
| `initAccordion()`            | click                  | ⚠️ Sin HTML activo — función harmless                                              |
| `initImageParallax()`        | scroll                 | ⚠️ Sin HTML activo — función harmless                                              |
| `initTestimonialsSparkles()` | scroll                 | ⚠️ Sin HTML activo — función harmless                                              |

> Las funciones marcadas con ⚠️ tienen guards de early-return y no generan errores. Se conservan para uso futuro.

---

## 6. Responsive

### Breakpoints definidos

```
≤ 1024px  → Tablet landscape / desktop pequeño
≤ 768px   → Tablet portrait / móvil grande
```

### Cambios por breakpoint

**`global.css`**

- `≤ 1024px`: Footer 2 columnas. Navbar-CTA oculto.
- `≤ 768px`: Footer 1 columna.

**`home.css`**

- `≤ 1024px`: Drag-slider cards más angostas. About grid 1 col. Testimoniales 1 col. CTA modelos ocultos.
- `≤ 768px`: Drag-slider mobile. About images responsivo. Gallery header apila.

**`interior.css`**

- `≤ 1024px`: Services full-grid 1 col. Service-card 180px img. Historia/service-detail grids 1 col. Valores 2 col.
- `≤ 768px`: Service-card completamente apilada vertical. Img card height:200px. Valores 1 col. Page-hero 50vh.

---

## 7. Assets: imágenes relevantes

### Texturas y decoración (`rsc/png/decor/`)

| Imagen    | Uso principal             | Técnica                                                                  |
| --------- | ------------------------- | ------------------------------------------------------------------------ |
| `130.png` | Fondo drag-slider y about | `::before` + `background-attachment: fixed` + `mix-blend-mode: multiply` |
| `078.png` | Fondo contacto            | `::before` inline style, opacidad 0.08                                   |
| `084.png` | Fondo historia            | `interior.css ::before`, opacidad 0.10                                   |
| `088.png` | Fondo galería             | `position: fixed`, opacidad 0.06                                         |
| `097.png` | Overlay servicios         | `::before`, opacidad 0.33                                                |
| `168.png` | Fondo CTA interior        | background-image, full opacity                                           |

### Modelos PNG (`rsc/png/modelos/`)

- Usadas en la sección About (home) y en el menú overlay de navegación

### Imágenes por servicio

- Localizadas en carpetas propias bajo `rsc/png/`
- Formato: `nombre (N).png` con espacios en el nombre de archivo

---

## 8. Notas para desarrollo futuro

### Optimizaciones pendientes

- [ ] Convertir todas las imágenes PNG a **WebP** (reducción estimada 40-60%)
- [ ] Agregar `loading="lazy"` a imágenes fuera del viewport inicial
- [ ] Implementar `<picture>` con `srcset` para imágenes responsivas
- [ ] Añadir meta tags SEO por página (title, description, og:image)
- [ ] Añadir `alt` descriptivos a todas las imágenes de servicio

### Extensiones posibles

- [ ] Galería con lightbox (click para ampliar imagen)
- [ ] Formulario de reserva (integración con WhatsApp Business API o Calendly)
- [ ] Sección de precios por servicio
- [ ] Blog / consejos de belleza
- [ ] Integración de reseñas de Google Business

### Consideraciones de mantenimiento

- Los íconos de contacto e historia son **SVG inline** — para cambiarlos, editar directamente el HTML
- Las imágenes de galería están hardcodeadas en `galeria.html` — para agregar nuevas, insertar un `<img>` en el masonry
- El slider de home referencia imágenes por ruta relativa en `main.js` — actualizar el array `galleryImages` al agregar nuevas fotos
- GSAP se carga desde `gsap-public/` local — no requiere CDN ni npm

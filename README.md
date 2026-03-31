# FC Luxe & Beauty — Sitio Web

Sitio web estático de alta gama para **FC Luxe & Beauty**, salón de belleza ubicado en Valle de Arce #143, Local 4, Col. Valle Dorado, Bahía de Banderas, Nayarit.

---

## 🚀 Cómo ejecutar

No requiere instalación de dependencias. Es un sitio HTML/CSS/JS estático.

**Opción 1 — VS Code Live Server:**

1. Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Clic derecho en `index.html` → **Open with Live Server**

**Opción 2 — Cualquier servidor local:**

```bash
# Python 3
python -m http.server 5500

# Node.js (npx)
npx serve .
```

Luego abre `http://localhost:5500` en tu navegador.

> ⚠️ Debe servirse desde un servidor local (no `file://`) porque las fuentes y animaciones GSAP requieren contexto HTTP.

---

## 🗂️ Estructura de archivos

```
beauty-salon/
│
├── index.html              # Página principal (Home)
├── servicios.html          # Catálogo de servicios
├── historia.html           # Historia de la marca + valores
├── galeria.html            # Galería masonry de trabajos
├── contacto.html           # Información de contacto + mapa
│
├── servicios/              # Páginas de detalle por servicio
│   ├── alisado.html
│   ├── colorimetria.html
│   ├── extensiones.html
│   ├── faciales.html
│   ├── manicure.html
│   ├── masajes.html
│   ├── pedicure.html
│   └── pestanas.html
│
├── css/
│   ├── global.css          # Variables, reset, navbar, footer, utilidades
│   ├── home.css            # Estilos exclusivos de index.html
│   └── interior.css        # Estilos para todas las páginas interiores
│
├── js/
│   └── main.js             # GSAP 3.12.5 + ScrollTrigger + TextPlugin
│
├── rsc/
│   ├── fonts/              # Fuentes locales (Claire, Collingar, BoilingBlack)
│   ├── png/                # Imágenes por categoría
│   │   ├── alasiado/
│   │   ├── cejas/
│   │   ├── clientas/
│   │   ├── colorimetria/
│   │   ├── decor/          # Texturas de fondo (130.png, 084.png, 088.png, 097.png…)
│   │   ├── extensiones/
│   │   ├── faciales/
│   │   ├── fernanda/
│   │   ├── hair_extension/
│   │   ├── lashes/
│   │   ├── marquee/
│   │   ├── masajes/
│   │   ├── modelos/
│   │   ├── nails/
│   │   ├── pedi/
│   │   └── pedicure/
│   └── svg/
│       └── pointer.svg     # Cursor personalizado
│
└── gsap-public/            # Librería GSAP (local, licencia gratuita)
    └── gsap-public/
        ├── esm/
        ├── minified/
        └── umd/
```

---

## 🛠️ Stack técnico

| Tecnología    | Versión | Uso                                                   |
| ------------- | ------- | ----------------------------------------------------- |
| HTML5         | —       | Estructura semántica de todas las páginas             |
| CSS3          | —       | Variables custom, Grid, Flexbox, backdrop-filter      |
| GSAP          | 3.12.5  | Animaciones de entrada, parallax, cursor, drag slider |
| ScrollTrigger | 3.12.5  | Activación de animaciones al hacer scroll             |
| TextPlugin    | 3.12.5  | Animación de texto en el hero                         |

> No hay frameworks JS (React/Vue/Svelte) ni preprocesadores CSS (Sass/Less). Vanilla HTML/CSS/JS puro.

---

## 📄 Páginas

### `index.html` — Home

- Hero full-screen con parallax y TextPlugin
- Drag slider de servicios (arrastrable, tarjetas inclinadas)
- Sección "Sobre nosotras" con imagen de modelo PNG
- Galería sticky con rotación de imágenes (JS)
- Testimoniales con liquid glass cards y destellos animados
- CTA final con layout de 3 columnas (modelos laterales)

### `servicios.html` — Catálogo

- Page hero con parallax
- Grid 2 columnas de tarjetas horizontales (imagen + texto)
- Fondo con overlay de textura 097.png (opacidad 0.33)
- CTA con fondo 168.png

### `historia.html` — Historia

- Page hero con parallax
- Sección historia con texto e imágenes alternadas (reverse en par)
- Fondo de historia: 084.png (opacidad 0.10)
- Valores: 4 cards con efecto liquid glass
- Iconos inline SVG: diamante, corona, estrella, flor de lis

### `galeria.html` — Galería

- Fondo fijo 088.png (opacidad 0.06)
- Layout masonry con `columns: 3`
- 53 imágenes reales de clientas y trabajos de Fernanda
- Sin filtros de categoría

### `contacto.html` — Contacto

- Fondo con textura 078.png (opacidad 0.08)
- Panel de información con iconos SVG inline:
  - WhatsApp: +52 322 202 4062
  - Email: cergal.air30@gmail.com
  - Dirección: Valle de Arce #143, Local 4
  - Redes sociales (Instagram / Facebook)
- Google Maps con iframe embebido
- Strip de WhatsApp con glassmorphism

### `servicios/*.html` — Detalle de servicio

Cada página tiene: hero, galería de 3 imágenes, texto descriptivo, beneficios, CTA.

- `alisado.html` — Alisado / keratina
- `colorimetria.html` — Colorimetría
- `extensiones.html` — Extensiones de cabello
- `faciales.html` — Tratamientos faciales
- `manicure.html` — Manicure
- `masajes.html` — Masajes relajantes
- `pedicure.html` — Pedicure
- `pestanas.html` — Extensiones de pestañas

---

## 🎨 Sistema de diseño

### Paleta de colores

| Variable           | Valor                 | Uso                               |
| ------------------ | --------------------- | --------------------------------- |
| `--charcoal`       | `#111111`             | Texto principal, fondos oscuros   |
| `--white`          | `#FFFFFF`             | Fondos claros, texto sobre oscuro |
| `--pink-mist`      | `#ed5c9b`             | Color primario de marca           |
| `--rose-deep`      | `#921947`             | Acento profundo                   |
| `--soft-fawn`      | `#dbac60`             | Acento dorado                     |
| `--mid-gray`       | `rgba(17,17,17,0.55)` | Overlays                          |
| `--lavender-blush` | `#fdf0f6`             | Fondos secciones valores          |

### Tipografía

| Variable          | Fuente       | Uso                            |
| ----------------- | ------------ | ------------------------------ |
| `--font-title`    | Claire       | Títulos principales (h1, h2)   |
| `--font-subtitle` | Collingar    | Labels, subtítulos, navegación |
| `--font-body`     | BoilingBlack | Texto de párrafo               |

### Imágenes clave de fondo/overlay

| Archivo         | Sección                          | Opacidad |
| --------------- | -------------------------------- | -------- |
| `decor/130.png` | `drag-slider`, `about` (textura) | 0.42     |
| `decor/078.png` | `contacto-section`               | 0.08     |
| `decor/084.png` | `historia-section`               | 0.10     |
| `decor/088.png` | `galeria.html` fondo fijo        | 0.06     |
| `decor/097.png` | `services-grid-section` overlay  | 0.33     |
| `decor/168.png` | `interior-cta` fondo             | full     |

---

## 📱 Breakpoints responsive

| Breakpoint | Cambios principales                                                                   |
| ---------- | ------------------------------------------------------------------------------------- |
| `≤ 1024px` | Navbar-CTA oculto, grids a 1 col, modelos CTA ocultos, valores 2 col                  |
| `≤ 768px`  | Service card apila vertical, hero 50vh, valores 1 col, drag-slider cards más angostas |

---

## ✅ Estado del proyecto

- [x] Diseño completo en todas las páginas
- [x] Animaciones GSAP funcionando
- [x] Imágenes reales en todas las páginas de servicio
- [x] Iconos SVG inline en contacto e historia
- [x] Google Maps embebido en contacto
- [x] CSS limpio (sin reglas muertas)
- [x] Media queries verificadas
- [ ] Formulario de contacto (removido por diseño — solo WhatsApp/Maps)
- [ ] SEO meta tags por página
- [ ] Optimización de imágenes (WebP)

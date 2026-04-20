# Emprende·Renacer — Resumen del proyecto

## Qué es

Landing page para la **Feria de Emprendimiento Emprende Renacer**, organizada por el Frente de Emprendimiento de una iglesia. Tercera edición: **1 de mayo de 2026**, CLL 168 #52-38, 10 AM.

---

## Stack técnico

| Capa | Herramienta | Costo |
|---|---|---|
| Hosting | Vercel (deploy automático desde GitHub) | Gratis |
| Código | HTML + CSS + JS vanilla (sin frameworks) | — |
| Datos | JSON en el repositorio (editables desde GitHub) | — |
| Imágenes | Cloudflare R2 (free tier 10 GB, egreso gratis) | Gratis |
| Formularios | Typeform embed via `<iframe>` (pendiente configurar) | Gratis |

**Costo total: $0/mes**

---

## Estructura de archivos

```
feria de emprendimiento/
├── index.html                        ← toda la página
├── styles.css                        ← estilos
├── data/
│   ├── ediciones.json                ← logos y datos de emprendimientos por año
│   ├── carrusel.json                 ← URLs completas de R2 para el carrusel hero
│   ├── cronograma.json               ← lineup público del 1 de mayo
│   └── config.json                   ← fecha, CTA link, textos editables
├── fotos-2025/                       ← fotos locales (también en R2)
├── logos emprendimientos feria/      ← logos locales (también en R2)
├── RESUMEN.md                        ← este archivo
├── DEPLOY.md                         ← guía de deploy, conexiones y arquitectura de producción
└── contexto/
    ├── feria-emprende-renacer.md     ← planificación y contenido editorial del evento
    └── arquitectura-feria-emprende-renacer.md ← arquitectura técnica detallada
```

---

## Secciones de la página

1. **Header/Nav** — Logo "Emprende·Renacer" (negro, dot naranja), links de navegación, botón "Inscríbete"
2. **Hero** — Carrusel de 112 fotos de la feria 2025 como fondo (avance cada 10s), scrim oscuro, título + botones a la izquierda, frase en cursiva a la derecha
3. **Marquee** — Banda animada con categorías de emprendimientos
4. **Info del evento** — "Más que una feria, un encuentro con propósito", Stand solidario, Fecha/Hora/Lugar
5. **Misión** — Texto sobre el propósito de la feria, quote destacada
6. **Perfiles** — Tabs JS: Emprendedor establecido / Por necesidad / Jóvenes y niños
7. **Cronograma** — Timeline público del 1 de mayo (carga desde `cronograma.json`)
8. **Directorio** — Grid de logos circulares (crop tipo avatar WhatsApp), modal al hacer clic, datos desde `ediciones.json`
9. **Formularios** — Typeform embeds para aplicación y talleres (pendiente configurar en `config.json`)
10. **Footer** — Logo, fecha, edición + créditos (Daniel Mayorga, email, LinkedIn)

---

## Paleta de colores

```css
--terracota:       #4E7DA6   /* azul — color principal, botones, acentos */
--terracota-dark:  #2F5F85   /* azul oscuro — hover */
--terracota-light: #7BAACB   /* azul claro */
--terracota-bg:    #EEF4FA   /* fondo azul muy suave */
--naranja:         #D4622A   /* naranja — subtítulos, labels, quotes, dot del logo */
--naranja-bg:      #FDF2EC   /* fondo naranja muy suave */
```

> El color principal fue cambiado de naranja/terracota original (#C85A1E) a azul (#4E7DA6) para coincidir con el afiche. El naranja quedó como acento para labels, subtítulos y el punto del logo.

---

## Tipografía

- **Display / títulos**: `Playfair Display` (serif elegante)
- **Cuerpo / UI**: `Inter` (sans-serif limpio, estilo Notion)

---

## Logo "Emprende·Renacer"

Wordmark en texto puro (HTML/CSS), sin imagen:

```html
Emprende<span class="logo-dot">·</span>Renacer
```

- **Header**: Inter 800, negro, dot naranja
- **Hero**: Playfair Display 900, blanco, dot blanco semitransparente

---

## Directorio de emprendimientos

- **35 emprendimientos** en `ediciones.json`
- Campos por emprendimiento: `archivo`, `categoria`, `descripcion`, `contacto_whatsapp`, `contacto_instagram`
- Los logos se muestran con **crop circular** (`border-radius: 50%` + `object-fit: cover`)
- El nombre del negocio se extrae automáticamente del nombre del archivo (sin extensión)
- Al hacer clic en una card se abre un **modal** con descripción y contactos
- La función `crearCard()` usa concatenación de strings (`+`) en lugar de template literals anidados para evitar bugs de parsing HTML

---

## Carrusel hero

- 112 fotos horizontales de la edición 2025 alojadas en **Cloudflare R2**
- `data/carrusel.json` contiene URLs completas de R2 (no nombres de archivo)
- Avance automático cada **10 segundos**
- Swipe táctil habilitado
- CSS: `position: absolute; inset: 0` dentro del `#hero`, imágenes con `object-fit: cover`
- Scrim oscuro con gradiente para legibilidad del texto

---

## Bugs resueltos durante el desarrollo

| Bug | Causa | Solución |
|---|---|---|
| Texto `'" />"` aparecía en las cards | Template literals anidados en JS causaban que el parser HTML rompiera la estructura | Reemplazar con concatenación de strings `+` |
| `onerror` inline rompía el HTML | Escaping de comillas en atributos inline | Usar `addEventListener('error', ...)` después de insertar el HTML |
| Servidor preview con PermissionError | `python3 -m http.server` fallaba en el directorio | Cambiar a `npx serve -p 3456` |
| "Invalid Date" en hero y footer | `config.json` tenía `"fecha": "1 de mayo de 2026"` — texto no parseable | Cambiar a `"2026-05-01"` (formato ISO) |
| Sección "¿Cómo puedes participar?" invisible | CSS usaba `.tab-panel.activo` pero HTML/JS usaban `.active` | Cambiar CSS a `.tab-panel.active` |

---

## Flujo de actualización (sin código)

Para agregar una nueva edición o emprendimiento:
1. Subir logos a Cloudflare R2 → carpeta `logos/` en el bucket `emprende-renacer`
2. Editar `data/ediciones.json` directamente desde GitHub (interfaz web)
3. Vercel detecta el cambio y hace deploy automático en ~30 segundos

---

## Créditos

Diseño y desarrollo: **Daniel Mayorga**
- danielmayorga.info@gmail.com
- [linkedin.com/in/dannielmayorga](https://www.linkedin.com/in/dannielmayorga/)

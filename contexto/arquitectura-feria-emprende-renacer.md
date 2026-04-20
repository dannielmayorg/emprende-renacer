# Arquitectura técnica — Landing Emprende Renacer

---

## Stack

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| Hosting | Vercel | Gratis, deploy automático desde GitHub, HTTPS incluido |
| Código | HTML + CSS + JavaScript vanilla | Sin frameworks — fácil de editar |
| Datos variables | JSON en el repositorio | Se edita en GitHub sin tocar el código |
| Imágenes | Cloudflare R2 | CDN rápido, URLs estables, free tier 10 GB |
| Formularios | Typeform embed via `<iframe>` | Sin backend propio (pendiente configurar) |

---

## Flujo de actualización (sin código)

```
Editar JSON en GitHub (navegador)
        ↓
Vercel detecta el cambio automáticamente
        ↓
Deploy en ~30 segundos
        ↓
La página se actualiza sola
```

---

## Estructura de archivos

```
emprende-renacer/
├── index.html              ← toda la página en un solo archivo
├── styles.css              ← estilos separados
├── data/
│   ├── ediciones.json      ← lista de ediciones y sus emprendimientos
│   ├── carrusel.json       ← URLs completas de R2 para el carrusel hero
│   ├── cronograma.json     ← lineup público del día del evento
│   └── config.json         ← datos generales: fecha, CTA link, textos editables
├── fotos-2025/             ← copia local de las fotos (fuente: R2)
└── logos emprendimientos feria/ ← copia local de los logos (fuente: R2)
```

---

## Estructura de los JSON

### `config.json` — datos generales
```json
{
  "nombre_evento": "Emprende Renacer",
  "edicion": "Tercera Edición",
  "fecha": "2026-05-01",
  "cta_link": "https://lu.ma/58rbu5xv",
  "cta_texto": "Quiero asistir",
  "typeform_aplicacion": "",
  "typeform_talleres": ""
}
```
> ⚠️ La fecha DEBE estar en formato ISO (`YYYY-MM-DD`). Si se escribe como texto ("1 de mayo de 2026") el JS muestra "Invalid Date".

### `ediciones.json` — directorio por año
```json
[
  {
    "año": 2025,
    "carpeta": "https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev/logos",
    "emprendimientos": [
      {
        "archivo": "Nombre del emprendimiento.jpeg",
        "categoria": "",
        "descripcion": "",
        "contacto_whatsapp": "",
        "contacto_instagram": ""
      }
    ]
  }
]
```
> El campo `carpeta` es la URL base de R2. El HTML construye la URL final como `carpeta + "/" + archivo`.  
> El nombre visible en pantalla se extrae automáticamente del nombre del archivo (sin extensión).

### `carrusel.json` — fotos del hero
```json
[
  "https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev/fotos-2025/emprenderenacer2025-9411.jpg",
  "https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev/fotos-2025/emprenderenacer2025-9413.jpg"
]
```
> Array de URLs completas de R2. El HTML las usa directamente como `src`.

### `cronograma.json` — lineup del día
```json
[
  { "hora": "9:50 AM", "actividad": "Oración de apertura" },
  { "hora": "10:00 AM", "actividad": "Apertura oficial de la feria" }
]
```

---

## Cloudflare R2 — Imágenes

**Bucket:** `emprende-renacer`  
**URL pública:** `https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev`  
**Account ID:** `a0ebaa4b8c94f25eb62b2133285d641f`

```
emprende-renacer/
├── fotos-2025/     ← 112 fotos para el carrusel hero
└── logos/          ← 35 logos de emprendimientos
```

Para subir imágenes nuevas: ver `DEPLOY.md`.

---

## Secciones de la página

1. **Hero** — Carrusel de 112 fotos (R2) + CTA "Quiero asistir" → lu.ma/58rbu5xv
2. **Misión y propósito** — Texto fijo en el HTML
3. **Perfiles de participante** — Tabs JS: Establecido / Por necesidad / Jóvenes
4. **Cronograma** — Carga desde `cronograma.json`
5. **Directorio por edición** — Carga desde `ediciones.json`, logos circulares, modal al clic
6. **Formularios** — Typeform embeds (pendiente — configurar IDs en `config.json`)
7. **Footer** — Logo, fecha, créditos (Daniel Mayorga)

---

## Lo que NO se hace en esta arquitectura

- No hay base de datos — todo vive en archivos JSON en GitHub
- No hay panel de administración — se edita directo en GitHub
- No hay autenticación — la página es completamente pública
- No hay backend propio — formularios via Typeform embed

---

## Pendientes

| # | Ítem | Estado |
|---|------|--------|
| 1 | Repositorio en GitHub | ✅ `dannielmayorg/emprende-renacer` |
| 2 | Conectar repo a Vercel | ⏳ Instalar GitHub App en vercel.com/new |
| 3 | Imágenes en Cloudflare R2 | ✅ 112 fotos + 35 logos subidos |
| 4 | Cronograma del 1 de mayo | ✅ Configurado en `cronograma.json` |
| 5 | Link CTA del hero | ✅ `lu.ma/58rbu5xv` |
| 6 | Formularios Typeform | ⏳ Pendiente — agregar IDs en `config.json` |

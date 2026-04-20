# Deploy & Arquitectura — Emprende·Renacer

## Stack en producción

| Capa | Servicio | Cuenta / ID |
|---|---|---|
| Hosting | Vercel | `danielmayorga-3914` · team `team_AFUGM19Cn7LFR7oBuGgkOWDj` |
| Código fuente | GitHub | [github.com/dannielmayorg/emprende-renacer](https://github.com/dannielmayorg/emprende-renacer) |
| Imágenes | Cloudflare R2 | Account ID: `a0ebaa4b8c94f25eb62b2133285d641f` · Bucket: `emprende-renacer` |

---

## Cloudflare R2 — Estructura del bucket

**Bucket:** `emprende-renacer`  
**URL pública base:** `https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev`

```
emprende-renacer/               ← bucket raíz
├── fotos-2025/                 ← 112 fotos del evento 2025 (carrusel hero)
│   ├── emprenderenacer2025-9411.jpg
│   └── ... (112 archivos .jpg)
└── logos/                      ← 35 logos de emprendimientos
    ├── 5 nueces.jpeg
    ├── Biblia Fest.png
    ├── Ciudad gospel.png
    ├── Misión Turquía.jpeg
    ├── la colmena artesanal.png
    └── ... (35 archivos .jpeg / .png)
```

**Acceso público activado:** sí (`r2.dev` subdomain habilitado vía API)

### Cómo construir una URL de imagen

```
https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev/fotos-2025/emprenderenacer2025-9411.jpg
https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev/logos/5 nueces.jpeg
```

> Los nombres de archivo con espacios funcionan en el navegador (los interpreta como `%20` automáticamente).

---

## Cómo se conectan los JSONs con R2

### `data/carrusel.json`
Contiene un array de **URLs completas** de R2 (no solo nombres de archivo):
```json
[
  "https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev/fotos-2025/emprenderenacer2025-9411.jpg",
  ...
]
```
El HTML en `index.html` usa el valor directamente como `src` de la imagen (sin prefijo adicional).

### `data/ediciones.json`
El campo `"carpeta"` apunta a la URL base de logos en R2:
```json
{
  "año": 2025,
  "carpeta": "https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev/logos",
  "emprendimientos": [{ "archivo": "5 nueces.jpeg", ... }]
}
```
El HTML construye la URL final como `carpeta + "/" + archivo`.

---

## GitHub — Repositorio

**Repo:** `dannielmayorg/emprende-renacer` (público)  
**Rama principal:** `main`  
**Flujo:** cada `git push origin main` → Vercel detecta el cambio y redeploys en ~30 segundos

### Cómo actualizar el sitio desde la terminal
```bash
cd "/Users/hellowpc/Documents/bichos dani/feria de emprendimiento"
git add .
git commit -m "descripción del cambio"
git push
```

---

## Vercel — Estado del deploy

El token de Vercel (`vck_...`) tiene scope **limitado** — puede leer pero **no crear proyectos vía API ni CLI**.  
La conexión con GitHub se hace desde el **dashboard web** de Vercel:

1. Instalar la GitHub App: [github.com/apps/vercel/installations/new](https://github.com/apps/vercel/installations/new) → seleccionar cuenta `dannielmayorg`
2. Importar repo: [vercel.com/new](https://vercel.com/new) → buscar `emprende-renacer` → Deploy

> **Importante:** el token de Vercel actual NO funciona en el CLI (`vercel deploy`). Si en el futuro necesitas un token funcional para CLI, genera uno nuevo en vercel.com/account/tokens con scope **"Full Account"**.

---

## `data/config.json` — Variables editables

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

> La fecha **debe estar en formato ISO** (`YYYY-MM-DD`). El JS la convierte a español con `toLocaleDateString('es-CO')`. Si se pone texto libre como `"1 de mayo de 2026"` aparece "Invalid Date".

---

## Bugs resueltos en este chat

| Bug | Causa | Solución |
|---|---|---|
| "Invalid Date" en hero y footer | `config.json` tenía fecha como texto libre | Cambiar a `"2026-05-01"` (ISO) |
| Sección "¿Cómo puedes participar?" invisible | CSS usaba `.tab-panel.activo` pero HTML/JS usaban `.active` | Cambiar CSS a `.tab-panel.active` |
| Token Vercel no funciona en CLI | El token `vck_` tiene scope limitado (`"limited": true` en la API) | Usar dashboard web para deploy |
| Token Cloudflare inválido (primera vez) | Token incompleto o copiado mal | Generar nuevo token con permiso R2:Edit |

---

## Subir nuevas imágenes a R2

### Opción A — Dashboard Cloudflare
1. Ir a [dash.cloudflare.com](https://dash.cloudflare.com) → R2 → bucket `emprende-renacer`
2. Subir archivos a `logos/` o `fotos-2025/`
3. La URL pública queda disponible de inmediato

### Opción B — Script Python (desde terminal)
```python
import urllib.request, urllib.parse, mimetypes

TOKEN = "cfat_..."   # token de Cloudflare con permiso R2:Edit
ACCOUNT = "a0ebaa4b8c94f25eb62b2133285d641f"
BUCKET = "emprende-renacer"

def upload(local_path, key):
    with open(local_path, "rb") as f:
        data = f.read()
    mime = mimetypes.guess_type(local_path)[0] or "application/octet-stream"
    req = urllib.request.Request(
        f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/r2/buckets/{BUCKET}/objects/{urllib.parse.quote(key, safe='/')}",
        data=data,
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": mime},
        method="PUT"
    )
    urllib.request.urlopen(req)

upload("mi-logo.jpeg", "logos/mi-logo.jpeg")
```

---

## Para agregar un emprendimiento nuevo

1. Copiar el logo a `logos emprendimientos feria/`
2. Subirlo a R2 con el script de arriba (carpeta `logos/`)
3. Agregar entrada en `data/ediciones.json`:
```json
{ "archivo": "Nombre del emprendimiento.jpeg", "categoria": "", "descripcion": "", "contacto_whatsapp": "", "contacto_instagram": "" }
```
4. `git add . && git commit -m "Agregar emprendimiento X" && git push`

---

## Para agregar una nueva edición (año futuro)

1. Subir logos a R2 en carpeta nueva (ej. `logos-2026/`)
2. En `data/ediciones.json` agregar un objeto nuevo:
```json
{
  "año": 2026,
  "carpeta": "https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev/logos-2026",
  "emprendimientos": [...]
}
```
3. `git push` → Vercel redeploys automático

---

## Servidor local (preview)

```bash
cd "/Users/hellowpc/Documents/bichos dani/feria de emprendimiento"
npx serve -p 3456
# Abrir: http://localhost:3456
```

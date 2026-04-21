export const config = { api: { bodyParser: { sizeLimit: '5mb' } } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { filename, data, contentType, folder, pin } = req.body;

  // Auth
  if (pin !== process.env.ADMIN_PIN) {
    return res.status(401).json({ error: 'PIN incorrecto' });
  }

  if (!filename || !data) {
    return res.status(400).json({ error: 'Faltan datos: filename y data son obligatorios' });
  }

  const token     = process.env.CLOUDFLARE_R2_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || 'a0ebaa4b8c94f25eb62b2133285d641f';
  const bucket    = 'emprende-renacer';
  const carpeta   = (folder || 'logos').replace(/\//g, '');
  const key       = carpeta + '/' + filename;

  if (!token) {
    return res.status(500).json({ error: 'CLOUDFLARE_R2_TOKEN no configurado en Vercel' });
  }

  try {
    const buffer  = Buffer.from(data, 'base64');
    const mime    = contentType || guessMime(filename);

    const r = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucket}/objects/${encodeURIComponent(key)}`,
      {
        method: 'PUT',
        headers: {
          Authorization:  `Bearer ${token}`,
          'Content-Type': mime,
          'User-Agent':   'emprende-renacer-admin'
        },
        body: buffer
      }
    );

    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      const msg = err.errors?.[0]?.message || err.message || `Error ${r.status}`;
      return res.status(r.status).json({ error: msg });
    }

    const publicUrl = `https://pub-d85456d79cef4d6d8a796e31c6360dac.r2.dev/${key}`;
    return res.status(200).json({ ok: true, url: publicUrl, filename, key });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

function guessMime(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const map = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
                webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' };
  return map[ext] || 'application/octet-stream';
}

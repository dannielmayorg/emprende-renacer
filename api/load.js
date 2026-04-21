export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { file } = req.query;
  const allowed = ['cronograma', 'config', 'carrusel', 'ediciones'];

  if (!allowed.includes(file)) {
    return res.status(400).json({ error: 'Archivo no válido' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN no configurado en Vercel' });
  }

  try {
    const r = await fetch(
      `https://api.github.com/repos/dannielmayorg/emprende-renacer/contents/data/${file}.json`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'emprende-renacer-admin'
        }
      }
    );

    if (!r.ok) {
      const err = await r.json();
      return res.status(r.status).json({ error: err.message || 'Error de GitHub' });
    }

    const data = await r.json();
    const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));

    return res.status(200).json({ sha: data.sha, content });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

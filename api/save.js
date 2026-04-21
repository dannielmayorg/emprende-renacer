export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { file, sha, content, pin } = req.body;

  // Validar PIN
  const adminPin = process.env.ADMIN_PIN;
  if (!adminPin) {
    return res.status(500).json({ error: 'ADMIN_PIN no configurado en Vercel' });
  }
  if (pin !== adminPin) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  // Validar archivo
  const allowed = ['cronograma', 'config', 'carrusel', 'ediciones'];
  if (!allowed.includes(file)) {
    return res.status(400).json({ error: 'Archivo no válido' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN no configurado en Vercel' });
  }

  try {
    // Si no viene sha, obtenerlo primero
    let fileSha = sha;
    if (!fileSha) {
      const getRes = await fetch(
        `https://api.github.com/repos/dannielmayorg/emprende-renacer/contents/data/${file}.json`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'emprende-renacer-admin'
          }
        }
      );
      if (getRes.ok) {
        const getData = await getRes.json();
        fileSha = getData.sha;
      }
    }

    const jsonStr = JSON.stringify(content, null, 2);
    const encoded = Buffer.from(jsonStr).toString('base64');

    const body = {
      message: `Admin: actualizar ${file}.json`,
      content: encoded,
      branch: 'main'
    };
    if (fileSha) body.sha = fileSha;

    const r = await fetch(
      `https://api.github.com/repos/dannielmayorg/emprende-renacer/contents/data/${file}.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'emprende-renacer-admin'
        },
        body: JSON.stringify(body)
      }
    );

    const result = await r.json();
    if (!r.ok) {
      return res.status(r.status).json({ error: result.message || 'Error al guardar en GitHub' });
    }

    return res.status(200).json({ ok: true, sha: result.content?.sha });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

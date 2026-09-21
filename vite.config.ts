import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import https from 'https';
import {defineConfig} from 'vite';

// Server-side memory cache for YouTube live view counts
const serverCache = new Map<string, { views: string; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

function fetchYouTubeViewServer(id: string): Promise<string | null> {
  return new Promise((resolve) => {
    const cached = serverCache.get(id);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return resolve(cached.views);
    }
    const req = https.get('https://www.youtube.com/watch?v=' + id, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const match = data.match(/videoViewCountRenderer\":\{\"viewCount\":\{\"simpleText\":\"([^\"]+)\"/);
        if (match && match[1]) {
          serverCache.set(id, { views: match[1], timestamp: Date.now() });
          return resolve(match[1]);
        }
        const match2 = data.match(/\"factoidRenderer\":\{\"value\":\{\"simpleText\":\"([^\"]+)\"/);
        if (match2 && match2[1]) {
          const val = match2[1].includes('view') ? match2[1] : `${match2[1]} views`;
          serverCache.set(id, { views: val, timestamp: Date.now() });
          return resolve(val);
        }
        resolve(null);
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(4000, () => {
      try { req.destroy(); } catch {}
      resolve(null);
    });
  });
}

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_PATH || './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'youtube-views-api',
        configureServer(server) {
          server.middlewares.use('/api/youtube-views', async (req, res) => {
            try {
              const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
              const singleId = url.searchParams.get('id');
              const batchIds = url.searchParams.get('ids');
              const ids = (batchIds ? batchIds.split(',') : [singleId]).filter(Boolean) as string[];

              if (ids.length === 0) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing id or ids parameter' }));
                return;
              }

              const results: Record<string, string> = {};
              await Promise.all(
                ids.slice(0, 15).map(async (id) => {
                  const cleanId = id.trim();
                  if (cleanId.length > 5) {
                    const count = await fetchYouTubeViewServer(cleanId);
                    if (count) results[cleanId] = count;
                  }
                })
              );

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify({ success: true, views: results }));
            } catch {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal error fetching YouTube views' }));
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

import Fastify from 'fastify';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const fastify = Fastify({ logger: true });
const PORT = Number(process.env.PORT || 3000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fastify.get('/api/health', async () => {
  return { ok: true };
});

fastify.get('/api/time', async () => {
  return { now: new Date().toISOString() };
});

fastify.get('/api/portfolio', async () => {
  const dataPath = path.join(__dirname, 'data', 'portfolio.json');
  const raw = await readFile(dataPath, 'utf-8');
  return JSON.parse(raw);
});

fastify.listen({ port: PORT, host: '0.0.0.0' });

import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureBoardTable, pool } from './db.mjs';

const fastify = Fastify({ logger: true });
const PORT = Number(process.env.PORT || 3000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fastify.register(cors, {
  origin: [
    'https://brian00uni.github.io',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

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

fastify.get('/api/board', async () => {
  const result = await pool.query(
    'SELECT id, title, content, created_at FROM board_posts ORDER BY id DESC',
  );
  return result.rows.map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
  }));
});

fastify.get('/api/board/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const result = await pool.query(
    'SELECT id, title, content, created_at FROM board_posts WHERE id = $1',
    [id],
  );
  if (result.rowCount === 0) {
    return reply.code(404).send({ message: 'Not found' });
  }
  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
  };
});

fastify.post('/api/board', async (request, reply) => {
  const { title, content } = request.body ?? {};
  if (!title || !content) {
    return reply.code(400).send({ message: 'title and content required' });
  }
  const result = await pool.query(
    'INSERT INTO board_posts (title, content) VALUES ($1, $2) RETURNING id, title, content, created_at',
    [title, content],
  );
  const row = result.rows[0];
  return reply.code(201).send({
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
  });
});

fastify.put('/api/board/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const { title, content } = request.body ?? {};
  const result = await pool.query(
    'UPDATE board_posts SET title = COALESCE($2, title), content = COALESCE($3, content) WHERE id = $1 RETURNING id, title, content, created_at',
    [id, title, content],
  );
  if (result.rowCount === 0) {
    return reply.code(404).send({ message: 'Not found' });
  }
  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
  };
});

fastify.addHook('onReady', async () => {
  await ensureBoardTable();
});

fastify.listen({ port: PORT, host: '0.0.0.0' });

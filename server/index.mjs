import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

fastify.get('/api/projects', async () => {
  const dataPath = path.join(__dirname, 'data', 'project.json');
  const raw = await readFile(dataPath, 'utf-8');
  return JSON.parse(raw);
});

fastify.get('/api/board', async () => {
  return memoryBoardItems
    .slice()
    .sort((a, b) => b.id - a.id)
    .map((item) => ({ ...item }));
});

fastify.get('/api/board/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const found = memoryBoardItems.find((item) => item.id === id);
  if (!found) {
    return reply.code(404).send({ message: 'Not found' });
  }
  return found;
});

fastify.post('/api/board', async (request, reply) => {
  const { title, content } = request.body ?? {};
  if (!title || !content) {
    return reply.code(400).send({ message: 'title and content required' });
  }
  const item = {
    id: memoryBoardNextId++,
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  memoryBoardItems.push(item);
  return reply.code(201).send(item);
});

fastify.put('/api/board/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const { title, content } = request.body ?? {};
  const index = memoryBoardItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return reply.code(404).send({ message: 'Not found' });
  }
  const updated = {
    ...memoryBoardItems[index],
    title: title ?? memoryBoardItems[index].title,
    content: content ?? memoryBoardItems[index].content,
  };
  memoryBoardItems[index] = updated;
  return updated;
});

const memoryBoardItems = [];
let memoryBoardNextId = 1;

fastify.listen({ port: PORT, host: '0.0.0.0' });

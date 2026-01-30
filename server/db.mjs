import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
const useMemoryDb = process.env.USE_MEMORY_DB === '1' || !connectionString;

export const pool = useMemoryDb
  ? null
  : new Pool({
      connectionString,
      ssl: connectionString?.includes('render.com')
        ? { rejectUnauthorized: false }
        : undefined,
    });
export { useMemoryDb };

export async function ensureBoardTable({ timeoutMs = 5000 } = {}) {
  if (useMemoryDb || !pool) return;
  const queryPromise = pool.query(`
      CREATE TABLE IF NOT EXISTS board_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('DB init timeout')), timeoutMs);
  });
  await Promise.race([queryPromise, timeoutPromise]);
}

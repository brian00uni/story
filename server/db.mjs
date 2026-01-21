import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
const useMemoryDb = process.env.USE_MEMORY_DB === '1';
if (!connectionString && !useMemoryDb) {
  throw new Error('DATABASE_URL is not set');
}

export const pool = useMemoryDb
  ? null
  : new Pool({
      connectionString,
      ssl: connectionString?.includes('render.com')
        ? { rejectUnauthorized: false }
        : undefined,
    });
export { useMemoryDb };

export async function ensureBoardTable() {
  if (useMemoryDb || !pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS board_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

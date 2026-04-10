const useMemoryDb = true;
export const pool = null;
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

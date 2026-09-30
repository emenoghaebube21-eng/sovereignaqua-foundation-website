import pg from "pg";

const { Pool } = pg;

let pool;

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool() {
  if (!databaseConfigured()) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: Number(process.env.DB_POOL_MAX || 10),
      idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 30000),
      connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT_MS || 5000),
      ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: true }
    });
  }
  return pool;
}

export async function checkDatabase() {
  const db = getPool();
  if (!db) return { configured: false, reachable: false };
  const result = await db.query("select 1 as ok");
  return { configured: true, reachable: result.rows[0]?.ok === 1 };
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPool, databaseConfigured, closeDatabase } from "./db.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDir = path.join(root, "db");

async function migrationFiles() {
  const entries = await fs.readdir(migrationsDir);
  return entries.filter(name => /^\\d+_.+\\.sql$/.test(name)).sort();
}

async function ensureTable(client) {
  await client.query(`
    create table if not exists schema_migrations (
      version varchar(255) primary key,
      applied_at timestamptz not null default now()
    )
  `);
}

async function migrate() {
  if (!databaseConfigured()) {
    throw new Error("DATABASE_URL is required to run migrations");
  }

  const db = getPool();
  const files = await migrationFiles();
  const client = await db.connect();

  try {
    await ensureTable(client);
    const appliedResult = await client.query("select version from schema_migrations");
    const applied = new Set(appliedResult.rows.map(row => row.version));

    for (const file of files) {
      if (applied.has(file)) continue;

      const sql = await fs.readFile(path.join(migrationsDir, file), "utf8");
      await client.query("begin");
      try {
        await client.query(sql);
        await client.query("insert into schema_migrations(version) values($1)", [file]);
        await client.query("commit");
        console.log("Applied migration:", file);
      } catch (error) {
        await client.query("rollback");
        throw new Error(`Migration failed: ${file}: ${error.message}`);
      }
    }
  } finally {
    client.release();
    await closeDatabase();
  }
}

migrate().catch(error => {
  console.error(error.message);
  process.exit(1);
});

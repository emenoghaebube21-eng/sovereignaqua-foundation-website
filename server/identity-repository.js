import { getPool } from "./db.js";

export async function findMemberByAuthUserId(authUserId) {
  const db = getPool();
  if (!db) {
    const error = new Error("database_not_configured");
    error.statusCode = 503;
    throw error;
  }

  const result = await db.query(
    `select m.id, m.auth_user_id, m.legal_name, m.preferred_name,
            m.email, m.jurisdiction, m.status,
            coalesce(r.name, 'member') as role
       from members m
       left join roles r on r.id = m.role_id
      where m.auth_user_id = $1
      limit 1`,
    [authUserId]
  );

  return result.rows[0] || null;
}

import { getPool } from "./db.js";

function requireDatabase() {
  const db = getPool();
  if (!db) {
    const error = new Error("database_not_configured");
    error.statusCode = 503;
    throw error;
  }
  return db;
}

export async function listPublicOrganizations({ limit = 50 } = {}) {
  const db = requireDatabase();
  const result = await db.query(
    `select o.id, coalesce(o.display_name, o.legal_name) as name,
            o.organization_type, o.jurisdiction, o.status,
            p.mission, p.official_website, p.country, p.region
       from organizations o
       left join organization_profiles p on p.organization_id = o.id
      where o.status = 'verified'
        and coalesce(p.public_profile_status, 'draft') = 'published'
      order by coalesce(o.display_name, o.legal_name)
      limit $1`,
    [Math.min(Math.max(Number(limit) || 50, 1), 100)]
  );
  return result.rows;
}

export async function listPublicProjects({ limit = 50 } = {}) {
  const db = requireDatabase();
  const result = await db.query(
    `select id, name, program_area, description, status, start_date, target_date
       from projects
      where status in ('proposed','active','completed')
      order by created_at desc
      limit $1`,
    [Math.min(Math.max(Number(limit) || 50, 1), 100)]
  );
  return result.rows;
}

export async function listPublicPartnerships({ limit = 50 } = {}) {
  const db = requireDatabase();
  const result = await db.query(
    `select id, partnership_type, status, start_date, end_date
       from partnerships
      where status in ('proposed','active')
      order by created_at desc
      limit $1`,
    [Math.min(Math.max(Number(limit) || 50, 1), 100)]
  );
  return result.rows;
}

export async function listImpactSummaries({ limit = 50 } = {}) {
  const db = requireDatabase();
  const result = await db.query(
    `select pr.id, pr.project_id, pr.report_type, pr.reporting_period_start,
            pr.reporting_period_end, pr.summary, pr.submitted_at
       from project_reports pr
       join projects p on p.id = pr.project_id
      where p.status in ('active','completed')
      order by pr.submitted_at desc
      limit $1`,
    [Math.min(Math.max(Number(limit) || 50, 1), 100)]
  );
  return result.rows;
}

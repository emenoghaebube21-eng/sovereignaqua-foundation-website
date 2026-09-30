# Database Migration Runbook

## Order

Apply migrations in this sequence:

1. db/001_initial.sql
2. db/002_entity_network.sql
3. db/003_global_network.sql
4. db/004_funding.sql
5. db/005_global_operations.sql

## Production requirements

- Run migrations from a controlled deployment job.
- Back up the database before schema changes.
- Record migration version and execution timestamp.
- Do not run destructive migrations automatically.
- Test migrations against a staging database first.
- Verify foreign-key integrity after migration.
- Keep rollback/recovery procedures documented.

## Environment

DATABASE_URL must be supplied through the deployment platform's secret manager and must never be committed to GitHub.

# SovereignAqua Imperium-Habour PMA — Database Blueprint

## members
id, auth_user_id, legal_name, preferred_name, email, phone, jurisdiction, status, role_id, joined_at, updated_at

## roles
id, name, description

## permissions
id, key, description

## role_permissions
role_id, permission_id

## membership_applications
id, applicant_auth_user_id, name, email, jurisdiction, interest_area, purpose, status, reviewer_id, submitted_at, reviewed_at, decision_note

## documents
id, title, document_type, version, visibility, storage_key, checksum, status, created_by, published_at, created_at, updated_at

## document_access
document_id, role_id, member_id, granted_at, expires_at

## projects
id, name, program_area, description, status, owner_member_id, start_date, target_date, created_at, updated_at

## project_members
project_id, member_id, project_role, joined_at

## requests
id, member_id, request_type, subject, description, status, assigned_to, created_at, updated_at, resolved_at

## governance_records
id, record_type, title, version, effective_date, status, storage_key, approved_by, created_at

## notices
id, title, body, audience_role, published_at, expires_at, created_by

## audit_events
id, actor_member_id, action, entity_type, entity_id, ip_hash, metadata_json, created_at

## Required database controls

- Foreign-key integrity
- Unique constraints for authentication identifiers and document versions
- Indexed status/date fields
- Server-side validation
- Soft deletion where records must be retained
- Audit logging for privileged changes

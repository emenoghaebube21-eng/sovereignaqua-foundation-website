-- SovereignAqua Imperium-Habour PMA
-- PostgreSQL-compatible baseline schema.
-- Run only through a controlled migration process.

create table if not exists roles (
  id bigserial primary key,
  name varchar(80) not null unique,
  description text
);

create table if not exists members (
  id uuid primary key,
  auth_user_id varchar(200) not null unique,
  legal_name varchar(200) not null,
  preferred_name varchar(200),
  email varchar(320) not null unique,
  jurisdiction varchar(120),
  status varchar(40) not null default 'applicant',
  role_id bigint references roles(id),
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists membership_applications (
  id uuid primary key,
  applicant_auth_user_id varchar(200) not null,
  name varchar(200) not null,
  email varchar(320) not null,
  jurisdiction varchar(120) not null,
  interest_area varchar(120) not null,
  purpose text not null,
  status varchar(40) not null default 'submitted',
  reviewer_id uuid references members(id),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  decision_note text
);

create table if not exists documents (
  id uuid primary key,
  title varchar(300) not null,
  document_type varchar(100) not null,
  version varchar(40) not null,
  visibility varchar(40) not null default 'member',
  storage_key varchar(1000) not null,
  checksum varchar(128),
  status varchar(40) not null default 'draft',
  created_by uuid references members(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(title, version)
);

create table if not exists projects (
  id uuid primary key,
  name varchar(300) not null,
  program_area varchar(120) not null,
  description text,
  status varchar(40) not null default 'proposed',
  owner_member_id uuid references members(id),
  start_date date,
  target_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_members (
  project_id uuid references projects(id) on delete cascade,
  member_id uuid references members(id) on delete cascade,
  project_role varchar(120),
  joined_at timestamptz not null default now(),
  primary key(project_id, member_id)
);

create table if not exists requests (
  id uuid primary key,
  member_id uuid not null references members(id),
  request_type varchar(100) not null,
  subject varchar(200) not null,
  description text not null,
  status varchar(40) not null default 'open',
  assigned_to uuid references members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists governance_records (
  id uuid primary key,
  record_type varchar(100) not null,
  title varchar(300) not null,
  version varchar(40) not null,
  effective_date date,
  status varchar(40) not null default 'draft',
  storage_key varchar(1000) not null,
  approved_by uuid references members(id),
  created_at timestamptz not null default now()
);

create table if not exists audit_events (
  id bigserial primary key,
  actor_member_id uuid references members(id),
  action varchar(120) not null,
  entity_type varchar(100) not null,
  entity_id varchar(200) not null,
  ip_hash varchar(128),
  metadata_json jsonb,
  created_at timestamptz not null default now()
);

insert into roles(name, description) values
('member','Approved PMA member'),
('project_manager','Delegated project management'),
('officer','Delegated operational authority'),
('administrator','Platform administration')
on conflict(name) do nothing;

create index if not exists idx_members_status on members(status);
create index if not exists idx_applications_status on membership_applications(status);
create index if not exists idx_requests_status on requests(status);
create index if not exists idx_audit_entity on audit_events(entity_type, entity_id);

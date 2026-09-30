-- Global nonprofit/humanitarian network extension

create table if not exists organization_verifications (
  id uuid primary key,
  organization_id uuid not null references organizations(id) on delete cascade,
  verification_type varchar(100) not null,
  evidence_reference varchar(1000),
  reviewer_id uuid references members(id),
  status varchar(40) not null default 'submitted',
  reviewed_at timestamptz,
  review_note text,
  created_at timestamptz not null default now()
);

create table if not exists programs (
  id uuid primary key,
  name varchar(300) not null,
  program_area varchar(120) not null,
  description text,
  status varchar(40) not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists organization_programs (
  organization_id uuid references organizations(id) on delete cascade,
  program_id uuid references programs(id) on delete cascade,
  participation_type varchar(100),
  status varchar(40) not null default 'active',
  joined_at timestamptz not null default now(),
  primary key (organization_id, program_id)
);

create table if not exists partnerships (
  id uuid primary key,
  initiating_entity_id varchar(200) not null,
  participating_entity_id varchar(200) not null,
  partnership_type varchar(120) not null,
  status varchar(40) not null default 'proposed',
  agreement_document_id uuid references documents(id),
  start_date date,
  end_date date,
  created_at timestamptz not null default now()
);

create table if not exists project_reports (
  id uuid primary key,
  project_id uuid not null references projects(id) on delete cascade,
  report_type varchar(100) not null,
  reporting_period_start date,
  reporting_period_end date,
  summary text,
  evidence_reference varchar(1000),
  submitted_by uuid references members(id),
  submitted_at timestamptz not null default now()
);

create table if not exists volunteer_applications (
  id uuid primary key,
  member_id uuid references members(id),
  name varchar(200) not null,
  email varchar(320) not null,
  skills text,
  interests text,
  availability text,
  status varchar(40) not null default 'submitted',
  created_at timestamptz not null default now()
);

create index if not exists idx_verification_org on organization_verifications(organization_id, status);
create index if not exists idx_program_area on programs(program_area);
create index if not exists idx_partnership_status on partnerships(status);
create index if not exists idx_project_reports_project on project_reports(project_id);

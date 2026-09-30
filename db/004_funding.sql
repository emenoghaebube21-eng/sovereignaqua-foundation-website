-- Donations, grants and humanitarian funding records

create table if not exists funding_records (
  id uuid primary key,
  funder_entity_type varchar(60) not null,
  funder_entity_id varchar(200) not null,
  recipient_entity_type varchar(60) not null,
  recipient_entity_id varchar(200) not null,
  funding_type varchar(80) not null,
  amount_numeric numeric(20,2),
  currency varchar(8),
  restriction_status varchar(40) not null default 'unrestricted',
  designated_project_id uuid references projects(id),
  purpose text,
  status varchar(40) not null default 'proposed',
  agreement_document_id uuid references documents(id),
  received_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists grant_milestones (
  id uuid primary key,
  funding_record_id uuid not null references funding_records(id) on delete cascade,
  title varchar(300) not null,
  due_date date,
  amount_numeric numeric(20,2),
  status varchar(40) not null default 'planned',
  completed_at timestamptz,
  report_reference varchar(1000)
);

create table if not exists funding_disbursements (
  id uuid primary key,
  funding_record_id uuid not null references funding_records(id) on delete cascade,
  project_id uuid references projects(id),
  amount_numeric numeric(20,2) not null,
  currency varchar(8) not null,
  disbursed_at timestamptz,
  reference_number varchar(200),
  status varchar(40) not null default 'planned'
);

create index if not exists idx_funding_recipient on funding_records(recipient_entity_type, recipient_entity_id);
create index if not exists idx_funding_project on funding_records(designated_project_id);
create index if not exists idx_funding_status on funding_records(status);

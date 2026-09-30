-- Unified participant/entity layer
-- PostgreSQL-compatible migration.

create table if not exists organizations (
  id uuid primary key,
  legal_name varchar(300) not null,
  display_name varchar(300),
  organization_type varchar(80) not null,
  jurisdiction varchar(160),
  registration_reference varchar(200),
  status varchar(40) not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists organization_representatives (
  organization_id uuid not null references organizations(id) on delete cascade,
  member_id uuid not null references members(id) on delete cascade,
  representative_role varchar(120) not null,
  authorization_reference varchar(300),
  status varchar(40) not null default 'active',
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  primary key (organization_id, member_id)
);

create table if not exists entity_relationships (
  id uuid primary key,
  source_entity_type varchar(60) not null,
  source_entity_id varchar(200) not null,
  relationship_type varchar(80) not null,
  target_entity_type varchar(60) not null,
  target_entity_id varchar(200) not null,
  status varchar(40) not null default 'proposed',
  effective_date date,
  end_date date,
  evidence_document_id uuid references documents(id),
  created_by uuid references members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists investment_interests (
  id uuid primary key,
  investor_entity_type varchar(60) not null,
  investor_entity_id varchar(200) not null,
  investee_entity_type varchar(60) not null,
  investee_entity_id varchar(200) not null,
  interest_type varchar(80) not null,
  quantity_numeric numeric,
  percentage_numeric numeric,
  reference_number varchar(200),
  status varchar(40) not null default 'recorded',
  evidence_document_id uuid references documents(id),
  effective_date date,
  created_at timestamptz not null default now()
);

create table if not exists entity_authorizations (
  id uuid primary key,
  member_id uuid not null references members(id) on delete cascade,
  entity_type varchar(60) not null,
  entity_id varchar(200) not null,
  permission_key varchar(160) not null,
  granted_by uuid references members(id),
  status varchar(40) not null default 'active',
  granted_at timestamptz not null default now(),
  expires_at timestamptz
);

create index if not exists idx_org_status on organizations(status);
create index if not exists idx_relationship_source on entity_relationships(source_entity_type, source_entity_id);
create index if not exists idx_relationship_target on entity_relationships(target_entity_type, target_entity_id);
create index if not exists idx_investment_investor on investment_interests(investor_entity_type, investor_entity_id);
create index if not exists idx_authorization_member on entity_authorizations(member_id, status);

-- Global operations: onboarding, partnerships and regional context

create table if not exists organization_profiles (
  organization_id uuid primary key references organizations(id) on delete cascade,
  mission text,
  official_website varchar(1000),
  primary_contact_email varchar(320),
  country varchar(160),
  region varchar(100),
  public_profile_status varchar(40) not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists partnership_requests (
  id uuid primary key,
  requesting_entity_id varchar(200) not null,
  target_entity_id varchar(200),
  project_id uuid references projects(id),
  request_type varchar(100) not null,
  message text not null,
  status varchar(40) not null default 'submitted',
  created_by uuid references members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists regions (
  id bigserial primary key,
  name varchar(120) not null unique
);

create table if not exists countries (
  id bigserial primary key,
  name varchar(160) not null,
  iso_code varchar(8) not null unique,
  region_id bigint references regions(id)
);

insert into regions(name) values
('Africa'),('Asia-Pacific'),('Europe'),('Middle East'),('North America'),('Latin America & Caribbean')
on conflict(name) do nothing;

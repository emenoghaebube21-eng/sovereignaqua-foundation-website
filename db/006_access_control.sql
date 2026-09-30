-- Access-control catalog for server-side authorization.
-- Applied after the existing five baseline migrations.

create table if not exists permissions (
  id bigserial primary key,
  permission_key varchar(160) not null unique,
  description text
);

create table if not exists role_permissions (
  role_id bigint not null references roles(id) on delete cascade,
  permission_id bigint not null references permissions(id) on delete cascade,
  primary key(role_id, permission_id)
);

insert into roles(name, description) values
('super_administrator','Platform and infrastructure administration')
on conflict(name) do nothing;

insert into permissions(permission_key, description) values
('member.profile.read','Read permitted member profile data'),
('member.profile.update','Update permitted member profile data'),
('membership.application.create','Create membership applications'),
('membership.application.read_own','Read own membership application'),
('membership.application.review','Review membership applications'),
('document.read_public','Read published public documents'),
('document.read_member','Read documents available to members'),
('document.publish','Publish approved documents'),
('project.read','Read permitted projects'),
('project.create','Create projects'),
('project.update','Update assigned projects'),
('project.assign','Assign project participants'),
('request.create','Create member requests'),
('request.read_own','Read own requests'),
('request.manage','Manage administrative requests'),
('governance.read','Read governance records'),
('governance.publish','Publish approved governance records'),
('audit.read','Read authorized audit records')
on conflict(permission_key) do nothing;

insert into role_permissions(role_id, permission_id)
select r.id, p.id
from roles r cross join permissions p
where r.name in ('member','project_manager','officer','administrator','super_administrator')
and (
  (r.name='member' and p.permission_key in (
    'member.profile.read','member.profile.update','membership.application.create',
    'membership.application.read_own','document.read_member','project.read',
    'request.create','request.read_own'))
  or (r.name='project_manager' and p.permission_key in (
    'member.profile.read','document.read_member','project.read','project.create',
    'project.update','project.assign','request.create','request.read_own'))
  or (r.name='officer' and p.permission_key in (
    'member.profile.read','document.read_member','document.publish','project.read',
    'project.update','request.manage','governance.read'))
  or (r.name='administrator' and p.permission_key in (
    'member.profile.read','member.profile.update','membership.application.review',
    'document.read_member','document.publish','project.read','project.create',
    'project.update','project.assign','request.manage','governance.read',
    'governance.publish','audit.read'))
)
on conflict do nothing;

create index if not exists idx_role_permissions_permission on role_permissions(permission_id);

-- Super administrators receive the complete permission catalog.
insert into role_permissions(role_id, permission_id)
select r.id, p.id
from roles r cross join permissions p
where r.name = 'super_administrator'
on conflict do nothing;

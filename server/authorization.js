const ROLE_PERMISSIONS = Object.freeze({
  member: new Set([
    "member.profile.read",
    "member.profile.update",
    "membership.application.create",
    "membership.application.read_own",
    "document.read_member",
    "project.read",
    "request.create",
    "request.read_own"
  ]),
  project_manager: new Set([
    "member.profile.read",
    "document.read_member",
    "project.read",
    "project.create",
    "project.update",
    "project.assign",
    "request.create",
    "request.read_own"
  ]),
  officer: new Set([
    "member.profile.read",
    "document.read_member",
    "document.publish",
    "project.read",
    "project.update",
    "request.manage",
    "governance.read"
  ]),
  administrator: new Set([
    "member.profile.read",
    "member.profile.update",
    "membership.application.review",
    "document.read_member",
    "document.publish",
    "project.read",
    "project.create",
    "project.update",
    "project.assign",
    "request.manage",
    "governance.read",
    "governance.publish",
    "audit.read"
  ]),
  super_administrator: new Set([
    "*"
  ])
});

export function hasPermission(role, permission) {
  const permissions = ROLE_PERMISSIONS[role];
  return Boolean(permissions && (permissions.has("*") || permissions.has(permission)));
}

export function requirePermission(auth, permission) {
  if (!auth?.ok) return auth;
  if (!hasPermission(auth.user.role, permission)) {
    return { ok: false, status: 403, error: "permission_denied" };
  }
  return auth;
}

export function rolePermissions(role) {
  return [...(ROLE_PERMISSIONS[role] || [])];
}

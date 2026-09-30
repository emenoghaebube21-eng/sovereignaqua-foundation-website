# Roles & Permissions

| Role | Primary scope |
|---|---|
| Public | Read public content |
| Applicant | Manage own application/status |
| Member | Manage own profile, documents, projects and requests permitted to members |
| Project Manager | Manage assigned projects and participants |
| Officer | Delegated operational functions |
| Administrator | Membership, documents, projects, requests and governance administration |
| Super Administrator | Platform/infrastructure administration |

## Permission examples

- member.profile.read
- member.profile.update
- membership.application.create
- membership.application.read_own
- membership.application.review
- document.read_public
- document.read_member
- document.publish
- project.read
- project.create
- project.update
- project.assign
- request.create
- request.read_own
- request.manage
- governance.read
- governance.publish
- audit.read

Never rely on hidden buttons, routes, or HTML to enforce these permissions. The API must authorize every protected operation.

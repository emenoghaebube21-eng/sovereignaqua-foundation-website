# Production Backend Contract

The current HTML/JS is intentionally non-authenticated. It must not be used to collect real passwords or sensitive member information until a secure backend is connected.

## Authentication
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh
- GET /api/auth/me
- Passwords must be handled only by the server-side identity provider.
- Use secure, HttpOnly, SameSite cookies or an appropriately secured token architecture.

## Membership
- POST /api/membership/applications
- GET /api/membership/me
- GET /api/admin/membership/applications
- PATCH /api/admin/membership/applications/:id

## Documents
- GET /api/documents
- GET /api/documents/:id
- POST /api/admin/documents
- PATCH /api/admin/documents/:id
- Access checks must be enforced server-side.

## Projects
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects
- PATCH /api/projects/:id
- POST /api/projects/:id/participants

## Requests
- POST /api/requests
- GET /api/requests/me
- GET /api/admin/requests
- PATCH /api/admin/requests/:id

## Governance
- GET /api/governance/records
- POST /api/admin/governance/records
- PATCH /api/admin/governance/records/:id

## Security baseline
- TLS in production.
- Server-side authorization on every protected route.
- Role-based access control.
- CSRF protection where cookie authentication is used.
- Rate limiting on authentication and intake endpoints.
- Input validation and output encoding.
- Encrypted storage for sensitive data where appropriate.
- Secrets only in server-side environment configuration.
- Audit events for privileged actions.
- No passwords, private keys, payment credentials, or secret tokens in the repository.

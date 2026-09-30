# API Route Map

## Health
GET /api/health

## Identity
GET /api/auth/me
POST /api/auth/logout

## Organizations
POST /api/organizations/onboard
GET /api/organizations
GET /api/organizations/:id
PATCH /api/organizations/:id

## Verification
POST /api/organizations/:id/verification
GET /api/organizations/:id/verification

## Membership
POST /api/membership/applications
GET /api/membership/me

## Projects
GET /api/projects
POST /api/projects
GET /api/projects/:id
PATCH /api/projects/:id

## Partnerships
POST /api/partnerships
GET /api/partnerships
PATCH /api/partnerships/:id

## Funding
POST /api/funding/intake
GET /api/funding/me
POST /api/projects/:id/funding-reports

## Documents
GET /api/documents
GET /api/documents/:id

## Administration
GET /api/admin/membership/applications
GET /api/admin/organizations/verification
GET /api/admin/funding
GET /api/admin/requests
GET /api/admin/audit

# Global Institute API Extensions

## Organizations
- POST /api/organizations/onboard
- GET /api/organizations
- GET /api/organizations/:id
- PATCH /api/organizations/:id

## Verification
- POST /api/organizations/:id/verification
- GET /api/organizations/:id/verification
- POST /api/admin/verifications/:id/decision

## Programs
- GET /api/programs
- POST /api/admin/programs
- PATCH /api/admin/programs/:id

## Projects
- POST /api/projects
- GET /api/projects
- GET /api/projects/:id
- PATCH /api/projects/:id

## Partnerships
- POST /api/partnerships
- GET /api/partnerships
- PATCH /api/partnerships/:id

## Impact reporting
- POST /api/projects/:id/reports
- GET /api/projects/:id/reports

## Volunteers
- POST /api/volunteer/applications
- GET /api/volunteer/me

All endpoints involving private organizational, donor, beneficiary, or project information require authentication and server-side authorization.

# Funding API

## Donations and grants

- POST /api/funding/intake
- GET /api/funding/me
- GET /api/admin/funding
- GET /api/admin/funding/:id
- PATCH /api/admin/funding/:id

## Grant milestones

- POST /api/admin/funding/:id/milestones
- PATCH /api/admin/funding/:id/milestones/:milestoneId

## Disbursements

- POST /api/admin/funding/:id/disbursements
- GET /api/admin/funding/:id/disbursements

## Project reporting

- POST /api/projects/:id/funding-reports
- GET /api/projects/:id/funding-reports

Payment provider webhooks must be authenticated and verified server-side. Do not trust client-supplied payment status.

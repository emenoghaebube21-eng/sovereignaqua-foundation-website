# SovereignAqua Imperium-Habour PMA — Production Architecture

## 1. Experience layers

### Public
- Home
- Charter
- Governance
- Research & Development
- Projects
- Membership overview
- Contact

### Applicant
- Membership application
- Application status
- Required acknowledgments
- Administrative communications

### Member
- Dashboard
- Profile
- Membership status
- Controlled documents
- Projects
- Participation
- Requests
- Notices

### Administration
- Member directory
- Application review
- Document publishing
- Project administration
- Governance records
- Request queue
- Audit log

## 2. Roles

- Public: anonymous visitor
- Applicant: submitted membership application
- Member: approved member
- Project Manager: project administration permissions
- Officer: delegated operational permissions
- Administrator: platform administration
- Super Administrator: infrastructure-level administration

Roles must be enforced server-side. UI visibility is not an authorization control.

## 3. Core workflow

Visitor → Application → Review → Verification → Approval/Decline → Member record → Member portal → Projects/Documents/Requests

## 4. Security boundary

The static frontend must never contain:
- passwords
- API secrets
- private keys
- payment credentials
- database credentials
- privileged authorization decisions

All protected operations must be performed by a server-side API or managed backend with authenticated requests.

## 5. Deployment

Recommended separation:
- Static frontend: CDN/static host
- API: serverless functions or managed application server
- Database: managed relational database
- Object storage: private document bucket
- Identity: managed authentication provider
- DNS: official domain with HTTPS

Official domain:
https://www.sovereignaquaresearchanddevelopment.online

# Official Domain Runbook

Canonical public URL:

https://www.sovereignaquaresearchanddevelopment.online/

## Required deployment relationship

www.sovereignaquaresearchanddevelopment.online
→ production frontend

www.sovereignaquaresearchanddevelopment.online/api
→ production API, or an equivalent API subdomain if the hosting architecture requires it.

## Before DNS cutover

- Production frontend deployed
- Production API deployed
- Database migrated
- Authentication configured
- Private storage configured
- Funding provider configured
- HTTPS active
- Environment variables configured
- Health endpoint responding
- Authorization tests passed

## After DNS cutover

- Test homepage
- Test public directory
- Test organization onboarding
- Test login redirect
- Test authenticated dashboard
- Test private document authorization
- Test funding intake
- Test webhook verification
- Test administrator authorization
- Confirm no staging URLs appear in production pages

Do not publish DNS credentials or deployment tokens in source control.

# Production Deployment Checklist

## Domain
- [ ] DNS configured for www.sovereignaquaresearchanddevelopment.online
- [ ] Apex redirect/canonicalization configured
- [ ] HTTPS certificate active
- [ ] Canonical URL verified

## Frontend
- [ ] Public pages load
- [ ] Mobile layout tested
- [ ] Accessibility review completed
- [ ] Forms point to production API
- [ ] No secrets embedded in source

## Authentication
- [ ] Identity provider configured
- [ ] Redirect URIs restricted to official domain
- [ ] MFA policy selected for privileged users
- [ ] Session expiration configured
- [ ] Logout and token revocation tested

## Database
- [ ] Production database provisioned
- [ ] Migrations applied
- [ ] Backups configured
- [ ] Restore tested
- [ ] Least-privilege database credentials configured

## Storage
- [ ] Private document bucket configured
- [ ] Public listing disabled
- [ ] Signed/authorized access implemented
- [ ] File-size/type limits enforced
- [ ] Malware/content scanning policy defined where required

## Funding
- [ ] Payment/grant provider selected
- [ ] Provider account verified
- [ ] Webhook signature verification enabled
- [ ] Idempotency implemented
- [ ] Refund/reversal workflow tested
- [ ] Donor privacy controls tested

## Security
- [ ] Rate limiting
- [ ] CSRF protection where applicable
- [ ] Input validation
- [ ] Authorization tests
- [ ] Dependency/security scan
- [ ] Secret scan
- [ ] Audit-log verification

## Launch
- [ ] Staging smoke test
- [ ] Production smoke test
- [ ] Monitoring/alerting
- [ ] Incident contact
- [ ] Backup recovery procedure

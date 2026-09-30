# Domain & Deployment Configuration

## Canonical site

https://www.sovereignaquaresearchanddevelopment.online/

## Required DNS

Configure the domain registrar/DNS provider according to the selected hosting platform's current DNS instructions.

Recommended records:
- apex/root → hosting provider
- www → hosting provider
- HTTPS certificate → hosting provider

Do not commit DNS credentials or deployment tokens.

## Environment variables

Production secrets should be supplied through the hosting provider's encrypted environment settings.

Examples:
- DATABASE_URL
- AUTH_PROVIDER_URL
- AUTH_PROVIDER_CLIENT_ID
- AUTH_PROVIDER_CLIENT_SECRET
- STORAGE_BUCKET
- STORAGE_ACCESS_KEY
- STORAGE_SECRET_KEY
- APP_BASE_URL

Never place real values in GitHub source files.

## Deployment acceptance checks

1. HTTPS works on apex and www.
2. Canonical URL resolves correctly.
3. Public pages load without authentication.
4. Protected routes reject anonymous requests.
5. Member authorization is server-side.
6. Admin authorization is server-side.
7. Documents are not publicly enumerable.
8. Audit events are recorded.
9. Error responses do not expose secrets.
10. Backup and recovery procedures are documented.

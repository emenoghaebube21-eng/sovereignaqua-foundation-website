# Security Baseline

## Authentication
Use a managed identity provider or a properly maintained server-side authentication implementation. Do not implement password hashing or session security in browser JavaScript.

## Authorization
Every protected API route must evaluate the authenticated identity and server-side role/permission set. Never rely on hidden navigation links.

## Documents
Private documents must use private object storage. The API should issue short-lived authorized access rather than exposing storage buckets publicly.

## Applications
Validate all fields server-side. Rate-limit submissions. Do not expose reviewer notes to applicants unless explicitly authorized.

## Administration
Privileged actions require explicit permissions and should create audit events.

## Secrets
No secrets in source control. Configure production secrets through encrypted hosting environment variables.

## Privacy
Collect only information necessary for the stated workflow. Define retention and deletion rules before production launch.

## Payments
Do not collect card numbers or banking credentials in this repository. If payments are introduced, use a compliant third-party payment processor and server-side webhook verification.

## Legal
PMA membership terms, governance instruments, privacy terms, and other legal documents must be reviewed and adopted through the PMA's appropriate governance process. Website copy should not represent legal conclusions as established merely because they appear on the site.

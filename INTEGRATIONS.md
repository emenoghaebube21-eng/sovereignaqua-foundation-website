# External Integration Boundaries

The repository defines integration contracts but does not contain provider credentials.

## Identity
The application can connect to a managed identity provider through OIDC/OAuth2 or an equivalent secure server-side integration.

## Database
Use a managed PostgreSQL-compatible service for production.

## Object storage
Use private object storage for member and organizational documents.

## Payments / donations
Use a compliant payment provider appropriate to the receiving entity and applicable jurisdictions.

## Email
Use a transactional email service for:
- application acknowledgments
- membership notifications
- project notifications
- funding receipts where appropriate
- administrative notices

## Maps / regional directory
A mapping/geocoding provider may be used for public organization/project locations, with privacy controls for sensitive sites.

## Analytics
Use privacy-conscious analytics. Do not collect unnecessary beneficiary or member-level sensitive information.

Each integration must have:
- documented purpose
- minimum required data
- authentication method
- failure handling
- privacy implications
- owner
- removal/revocation procedure

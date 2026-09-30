# SovereignAqua Imperium-Habour — Platform Integration Map

## Public entry points

- index.html — PMA and Global Institute landing experience
- global.html — Global Institute overview
- global-directory.html — organization/project/program directory
- donate.html — humanitarian donations and grant support
- impact.html — impact reporting overview
- apply.html — membership application

## Authenticated entry points

- login.html — authentication entry
- dashboard.html — member workspace
- portal.html — member portal architecture

## Administrative entry points

- admin.html — PMA administration architecture
- command-center.html — Global Institute command center

## Institutional layers

1. Identity and authentication
2. People and memberships
3. Organizations and entity relationships
4. Programs and projects
5. Partnerships
6. Donations and grants
7. Impact reporting
8. Documents and governance
9. Audit and compliance

## Recommended production sequence

1. Configure identity provider.
2. Provision PostgreSQL database.
3. Deploy API.
4. Connect API to database.
5. Configure private object storage.
6. Implement authorization middleware.
7. Connect application forms.
8. Connect donation/grant provider.
9. Configure webhooks and audit events.
10. Configure domain and HTTPS.
11. Run security, accessibility and mobile QA.
12. Launch in controlled phases.

## Canonical domain

https://www.sovereignaquaresearchanddevelopment.online/

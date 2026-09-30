# SovereignAqua Imperium-Habour PMA — Unified Entity Architecture

The platform is the central digital coordination layer for participating people and organizations. It distinguishes legal/organizational entities from individual users and does not itself create ownership, shareholder rights, membership, affiliation, or subsidiary status.

## 1. Platform participants

### Individual participants
- Members
- Investors
- Shareholders
- Directors/officers
- Authorized representatives
- Project participants
- Advisors/service providers

### Organization participants
- Affiliated companies
- Subsidiaries
- Portfolio/participating entities
- Research institutions
- Strategic partners
- Service providers

## 2. Entity hierarchy

Platform
├── PMA
├── Member entities
├── Investor entities
├── Shareholder interests
├── Affiliate organizations
├── Subsidiary organizations
├── Projects / programs
└── Authorized representatives

An organization may have multiple representatives. A representative may have delegated access to one or more organizations, subject to explicit authorization.

## 3. Core separation

### Person
Identity and authentication record.

### Organization
A legal or operational organization record.

### Relationship
A documented relationship between a person, organization, project, or platform role.

### Interest
A recorded ownership/investment/shareholding claim where supported by authoritative records. The platform should not infer ownership from account membership.

### Authorization
A permission grant defining what a user can view or perform for a particular entity.

## 4. Unified dashboard

The authenticated user should have an entity switcher when authorized for multiple entities:

- Personal workspace
- Member workspace
- Investor workspace
- Shareholder workspace
- Affiliate company workspace
- Subsidiary workspace
- Project workspace

Every action should display the active entity context.

## 5. Organization workspace

Each authorized organization can have:

- Organization profile
- Authorized representatives
- Governance documents
- Ownership/investment records where applicable
- Projects
- Contracts and agreements
- Documents
- Notices
- Requests
- Activity/audit history

## 6. Relationship types

Use explicit relationship records such as:

- member_of
- representative_of
- investor_in
- shareholder_of
- affiliate_of
- subsidiary_of
- director_of
- officer_of
- project_participant
- service_provider
- strategic_partner

Relationship status must be recorded as proposed, active, suspended, ended, or disputed where appropriate.

## 7. Governance boundary

The platform is a coordination and records system. Legal ownership, shareholding, subsidiary status, contractual rights, securities interests, membership rights, and fiduciary authority must be supported by authoritative instruments and applicable law; a database record alone does not create those rights.

## 8. Audit requirement

Sensitive entity and relationship changes must create immutable audit events recording:
- actor
- active entity
- action
- affected record
- timestamp
- reason/reference where required

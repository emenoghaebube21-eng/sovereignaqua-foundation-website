# Product Architecture — Global Institute

## Primary surfaces

### Public
- Global Institute
- Organization directory
- Programs
- Project opportunities
- Partnership exchange
- Donation/grant support
- Impact center

### Authenticated
- Personal/member workspace
- Organization workspace
- Investor/shareholder workspace where authorized
- Project workspace
- Funding records
- Documents
- Requests
- Notices

### Administration
- Global command center
- Organization verification
- Program administration
- Project moderation
- Partnership review
- Funding administration
- Impact review
- Governance and audit

## Entity-aware navigation

The application should resolve the active entity before loading protected information.

Example:

User
→ Authorized Organizations
→ Active Organization
→ Programs / Projects / Funding / Documents

## Public/private boundary

Public:
- approved organization profiles
- approved projects
- published calls
- public impact summaries
- public program information

Private:
- member records
- private documents
- donor personal information
- beneficiary information
- contracts
- internal governance records
- financial account information

## Funding transparency

Public project pages may show:
- funding goal where appropriate
- funding status
- project purpose
- aggregate funding received
- reporting status

They should not expose:
- payment credentials
- bank account credentials
- donor-sensitive information
- beneficiary personal information

## Release strategy

Launch in controlled stages:
1. Public information and directory
2. Organization onboarding
3. Authenticated workspaces
4. Project collaboration
5. Funding integrations
6. Impact reporting
7. Regional expansion
8. Advanced analytics

# Unified Network API

## Organizations
- POST /api/organizations
- GET /api/organizations
- GET /api/organizations/:id
- PATCH /api/organizations/:id

## Representatives
- POST /api/organizations/:id/representatives
- DELETE /api/organizations/:id/representatives/:memberId

## Relationships
- POST /api/relationships
- GET /api/relationships?entity_type=&entity_id=
- PATCH /api/relationships/:id

## Investment / shareholder records
- POST /api/interests
- GET /api/interests?investor_entity_id=
- GET /api/interests?investee_entity_id=
- PATCH /api/interests/:id

## Entity authorization
- POST /api/entity-authorizations
- GET /api/entity-authorizations/me
- DELETE /api/entity-authorizations/:id

Every endpoint must enforce authentication and entity-level authorization server-side.

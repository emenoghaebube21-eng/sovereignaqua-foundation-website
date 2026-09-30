# API Implementation Guide

## Runtime boundary

The browser is the presentation layer. It should call the API over HTTPS.

The API is responsible for:
1. Authenticating the request.
2. Loading the user identity.
3. Resolving the active entity context.
4. Checking role and entity permissions.
5. Validating request data.
6. Executing the database transaction.
7. Writing audit events for privileged actions.
8. Returning only authorized data.

## Request context

Every authenticated request should resolve:

- user_id
- member_id
- active_entity_type
- active_entity_id
- role
- permissions

Do not accept an arbitrary entity ID from the browser without verifying that the user is authorized for it.

## Transactions

Operations involving funding, disbursement, membership status, governance records or relationship changes should use database transactions.

## Webhooks

Payment/grant-provider webhooks must:
- verify the provider signature
- reject replayed events
- persist an idempotency key
- process the event transactionally
- record an audit event
- never trust client-submitted payment status

## Errors

Return safe structured errors. Do not return stack traces, database connection strings, secret values or internal infrastructure details.

## Observability

Production API should record:
- request ID
- timestamp
- route
- response status
- duration
- authenticated actor where available

Sensitive values must be excluded from logs.

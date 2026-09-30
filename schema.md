# PMA Portal Data Architecture

## Member
- id
- legal_name
- preferred_name
- contact_email
- status
- joined_at
- membership_term_id
- role_id

## Membership Application
- id
- applicant_member_id
- submitted_at
- status
- reviewer_id
- decision_at
- decision_note

## Document
- id
- title
- document_type
- version
- visibility
- storage_reference
- published_at
- created_by

## Project
- id
- name
- program_area
- description
- status
- owner_member_id
- start_date
- target_date

## Project Participation
- project_id
- member_id
- role
- joined_at

## Request
- id
- member_id
- request_type
- subject
- description
- status
- assigned_to
- created_at
- resolved_at

## Governance Record
- id
- record_type
- title
- effective_date
- version
- storage_reference
- approved_by

## Audit Event
- id
- actor_id
- action
- entity_type
- entity_id
- timestamp
- metadata

Production implementation should use authenticated access control, least-privilege roles, server-side authorization, encrypted transport, secure secret storage, and immutable audit logging. Never store passwords or payment credentials in client-side HTML.
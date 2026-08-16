# Audit and Security Log Tables

## Purpose

Auditability is required across the PetRx ecosystem, especially for clinical data, permissions, financial operations, and future research/government collaboration.

## audit_logs

- `id` UUID PK
- `organization_id` UUID nullable FK → organizations
- `user_id` UUID nullable FK → users
- `action` VARCHAR(100)
- `resource` VARCHAR(100)
- `resource_id` UUID/string nullable
- `old_values` JSONB nullable
- `new_values` JSONB nullable
- `ip_address` nullable
- `user_agent` nullable
- `created_at` TIMESTAMPTZ

## Security Event Logging

Authentication and security events may be represented in a dedicated security-event table or a controlled audit-log category, including:

- Login success/failure
- Session revocation
- Password reset
- Invitation acceptance
- Account lock/suspension
- Role/permission changes
- Sensitive data export

## Audit Requirements

Audit records should be append-oriented and protected from ordinary tenant users. Administrative access to audit records must itself be auditable.

## Tenant Rule

Tenant events contain `organization_id` wherever an organization context exists. Platform-level events may have a null organization ID and must be restricted to authorized platform administrators.

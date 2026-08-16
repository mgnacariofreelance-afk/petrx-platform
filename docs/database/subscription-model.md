# PetRx Subscription Model

## Purpose

PetRx is a multi-tenant SaaS. Subscription state belongs to an Organization and controls access to commercial plan capabilities.

## subscriptions

Core fields:

- `id` UUID PK
- `organization_id` UUID FK
- `plan_code`
- `status`
- `starts_at`
- `ends_at` nullable
- timestamps

## Plan Controls

The subscription layer may eventually control:

- Maximum users
- Maximum branches
- Storage allowance
- AI Clinical Evidence Search usage
- Knowledge-library capacity
- Website capabilities
- Advanced reporting
- API/integration access

Exact pricing and limits are commercial decisions and should not be hard-coded into domain tables.

## Tenant Rule

Subscription status must never be used as a substitute for authorization. It determines whether a capability is commercially enabled; RBAC determines whether a user is permitted to perform the action.

## Future Organization Types

The same subscription architecture can support clinics and future organization types, with plan entitlements varying by product/module.

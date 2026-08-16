# User and Identity Tables

## users

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| organization_id | UUID | FK → organizations |
| first_name | VARCHAR(100) | Required |
| last_name | VARCHAR(100) | Required |
| email | VARCHAR(255) | Login identifier; uniqueness policy must be tenant-aware |
| mobile | VARCHAR(50) | Optional |
| employee_number | VARCHAR(100) | Optional; HR-ready |
| job_title | VARCHAR(150) | Optional; HR-ready |
| hire_date | DATE | Optional; HR-ready |
| employment_type | VARCHAR(50) | Optional; e.g. regular, contractual |
| employment_status | VARCHAR(50) | Optional; e.g. active, on_leave |
| status | VARCHAR(30) | Pending/active/suspended/inactive/locked |
| last_login_at | TIMESTAMPTZ | Nullable |
| created_at | TIMESTAMPTZ | Required |
| updated_at | TIMESTAMPTZ | Required |

HR-ready fields intentionally stop short of implementing payroll, attendance, leave, recruitment, or performance management.

## user_roles

Many-to-many relationship between users and roles.

- `user_id` UUID FK
- `role_id` UUID FK
- composite PK `(user_id, role_id)`

A user can have multiple roles, e.g. Receptionist + Cashier + Pharmacy Assistant.

## user_branches

- `user_id` UUID FK
- `branch_id` UUID FK
- composite PK `(user_id, branch_id)`

Branch assignments limit access where a permission is branch-scoped.

## user_departments

- `user_id` UUID FK
- `department_id` UUID FK
- composite PK `(user_id, department_id)`

## user_invitations

- `id` UUID PK
- `organization_id` UUID FK
- `email`
- `invited_by` UUID FK → users
- `token_hash`
- `expires_at`
- `accepted_at` nullable
- `status`
- timestamps

Invitation tokens must be one-time, expiring, and stored only as secure hashes where practical.

## user_sessions

- `id` UUID PK
- `user_id` UUID FK
- `session_token_hash`
- `expires_at`
- `revoked_at` nullable
- `created_at`

## password_resets

- `id` UUID PK
- `user_id` UUID FK
- `token_hash`
- `expires_at`
- `used_at` nullable
- `created_at`

## User Lifecycle

1. Organization Administrator creates the staff record.
2. Assign one or more roles.
3. Assign permitted branches.
4. Assign permitted departments.
5. Send one-time invitation.
6. User verifies invitation.
7. User creates password.
8. Account becomes active.
9. Security events and important changes are audited.

## HR Expansion Rule

The identity schema is HR-ready, but PetRx Phase 1 does not include a full HR subsystem.

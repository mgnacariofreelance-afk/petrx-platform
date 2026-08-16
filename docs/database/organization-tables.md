# Organization, Branch, Department and Subscription Tables

## Design Principle

Organizations are the tenant boundary. Phase 1 enables veterinary clinics, while the same organization model supports future universities, research institutes, farms, government agencies, laboratories, and manufacturers.

## organization_types

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| code | VARCHAR(50) | UNIQUE; e.g. `clinic`, `university` |
| name | VARCHAR(100) | Display name |
| description | TEXT | Optional |

## organizations

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| organization_type_id | UUID | FK → organization_types |
| name | VARCHAR(255) | Required |
| code | VARCHAR(50) | Tenant business code; scoped unique |
| slug | VARCHAR(255) | Tenant URL identifier; scoped unique |
| status | VARCHAR(30) | active/suspended/archived |
| created_at | TIMESTAMPTZ | Required |
| updated_at | TIMESTAMPTZ | Required |

## branches

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| organization_id | UUID | FK → organizations |
| name | VARCHAR(255) | Required |
| address | TEXT | Optional |
| contact_no | VARCHAR(50) | Optional |
| status | VARCHAR(30) | Active/inactive |
| created_at | TIMESTAMPTZ | Required |
| updated_at | TIMESTAMPTZ | Required |

A user may be assigned to multiple branches through `user_branches`.

## departments

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| organization_id | UUID | FK → organizations |
| branch_id | UUID | Nullable FK → branches |
| name | VARCHAR(255) | Required |
| status | VARCHAR(30) | Active/inactive |
| created_at | TIMESTAMPTZ | Required |
| updated_at | TIMESTAMPTZ | Required |

Departments may be organization-wide or branch-specific.

## subscriptions

| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| organization_id | UUID | FK → organizations |
| plan_code | VARCHAR(50) | Required |
| status | VARCHAR(30) | Trial/active/past_due/cancelled/etc. |
| starts_at | TIMESTAMPTZ | Required |
| ends_at | TIMESTAMPTZ | Nullable |
| created_at | TIMESTAMPTZ | Required |
| updated_at | TIMESTAMPTZ | Required |

Subscription limits may later control users, branches, storage, and AI usage.

## Tenant Rules

- Organization IDs are never accepted as an authorization substitute.
- Every organization-owned child record must be tenant-scoped.
- Branches and departments cannot be assigned across organizations.
- Organization type controls which modules are exposed, not the physical tenant model.

# Sprint 2B — Department Foundation

## Objective
Establish the organization-scoped department layer beneath branches without introducing user assignment, workflow permissions, or clinical modules yet.

## Data model
`organizations` → `branches` → `departments`

Each department belongs to exactly one organization and exactly one branch. A database trigger rejects any department whose branch belongs to a different organization.

## Department fields
- `id`
- `organization_id`
- `branch_id`
- `code`
- `name`
- `description`
- `status` (`ACTIVE` / `INACTIVE`)
- `created_at`
- `updated_at`

## Constraints
- Department code is unique within an organization.
- Department name is unique within a branch.
- Branch and organization must match.
- Department status is constrained to `ACTIVE` or `INACTIVE`.

## Security
Row Level Security is enabled. Authenticated users can only read departments belonging to an organization in which they have an active membership. Inserts and updates require active organization membership and a branch belonging to the same organization.

## Out of scope
- User-to-department assignment
- Department-specific RBAC
- Department UI
- Clinical departments/workflows
- Cross-organization access

These belong to later Sprint 2 stages.

## Validation
- Migration applied to PetRx Production.
- Supabase Security Advisor: 0 security lints after migration.
- GitHub/Vercel CI must pass before Sprint 2B is marked final.

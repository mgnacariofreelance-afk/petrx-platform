# Sprint 2A — Branch Foundation

## Objective
Establish the first operational layer below the organization without changing PetRx's organization-based multi-tenant architecture.

## Data Model
Each branch belongs to exactly one organization. Branch records are organization-scoped and cannot be shared across organizations.

### Branch fields
- `id` — UUID primary key
- `organization_id` — owning organization
- `code` — unique within the organization
- `name` — unique within the organization
- `address` — optional branch address
- `contact_no` — optional branch contact number
- `email` — optional branch email
- `is_default` — one default branch per organization
- `status` — `ACTIVE` or `INACTIVE`
- `created_at`
- `updated_at`

## Security
Row Level Security is enabled on `public.branches`. Authenticated users may access branches only when their active organization membership belongs to the branch's organization. Insert and update operations are subject to the same organization boundary.

The organization boundary is resolved through the authenticated user's active `organization_memberships`.

## Constraints
- Branch code is unique per organization.
- Branch name is unique per organization.
- An organization may have at most one default branch.
- Deleting an organization cascades to its branches.
- Branches are not global records.

## Out of Scope
Sprint 2A does not yet implement departments, branch UI, branch switching, user-to-branch assignment, or branch-aware RBAC. Those are subsequent Sprint 2 stages.

## Validation
The migration has been applied to the PetRx Production Supabase project and the generated Supabase database types confirm the `branches` table and its organization foreign key.

# Database Decision 001 — Supabase as the Runtime Source of Truth

## Status

**Finalized**

## Decision

PetRx uses the connected **Supabase PostgreSQL project as the authoritative runtime database**.

Application database access is implemented through Supabase's server/client APIs, migrations, Row Level Security policies, and database functions.

Prisma is not the runtime ORM for the current PetRx application.

## Why

During Sprint 2A–2D, the active Supabase schema became the source of truth for:

- Organizations
- Branches
- Departments
- Organization memberships
- User roles and permissions
- Operational context
- Row Level Security

The repository also contained an older Prisma schema and seed workflow. Those files represented an earlier architecture and could diverge from the production Supabase schema. Keeping them as active database definitions would create two competing sources of truth.

## Rule going forward

1. New database schema changes must be implemented through Supabase migrations.
2. RLS policies must be defined and validated in Supabase.
3. Application queries must target the Supabase schema.
4. The repository must not introduce new Prisma models for PetRx runtime tables.
5. Any historical Prisma artifacts must be treated as archival/reference material only and must never be used as the basis for a production migration.

## Branch and Department terminology

The finalized hierarchy is:

```text
Organization
  └── Branch
       └── Department
```

A branch belongs to exactly one organization. A department belongs to one organization and may be attached to a branch. Cross-organization branch/department assignments are prohibited by database constraints and RLS.

## Validation requirement

Every future database stage must pass:

- migration/application validation
- constraint validation
- RLS/security validation
- GitHub build validation when repository code is affected
- Vercel deployment validation when applicable

No stage is considered final while a known database or security failure remains.

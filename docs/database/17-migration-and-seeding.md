# Database Migration and RBAC Seeding

## Purpose

PetRx uses Prisma with PostgreSQL. The Prisma schema is the canonical data model, while committed migrations are the deployable database history.

## Migration Lifecycle

1. Update `prisma/schema.prisma` manually.
2. Run Prisma formatting and validation.
3. Generate a migration from the schema.
4. Review the generated SQL before production deployment.
5. Apply migrations with `prisma migrate deploy`.
6. Generate Prisma Client.
7. Run the deterministic RBAC seed.

## Initial Migration

The Phase 1 baseline is stored under:

```text
prisma/migrations/20260817080600_initial_schema/migration.sql
```

The migration was generated from the validated Phase 1 schema using Prisma's migration diff process.

## RBAC Seed

`prisma/seed.js` creates the reusable permission catalog and system roles. It is designed to be idempotent so it can safely be executed again during development or deployment initialization.

The seed does **not** create a real clinic, real user, password, API credential, or production tenant. Production organization and user creation must go through the application onboarding flow.

## Phase 1 System Roles

The baseline roles are:

- Platform Administrator
- Clinic Owner
- Clinic Administrator
- Veterinarian
- Veterinary Technician
- Receptionist
- Cashier
- Pharmacist
- Records Officer
- Inventory Manager
- Finance Officer
- Research Contributor
- Client Portal User

Users may receive multiple roles. A staff member can therefore be both Receptionist + Cashier + Pharmacist without creating a combined job title or duplicating permissions.

## Operational Finance Boundary

The database supports clinic operational records for:

- Sales
- Payments
- Expenses
- Accounts Receivable
- Accounts Payable
- Inventory

It intentionally does not implement a general ledger, chart of accounts, journal-entry engine, or full accounting subsystem.

## CI Database Test

GitHub Actions provisions a temporary PostgreSQL instance and verifies:

```text
Prisma schema validation
        ↓
Migration deployment
        ↓
Prisma Client generation
        ↓
RBAC seed execution
```

This is the minimum database gate before application-layer development proceeds.

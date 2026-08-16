# Multi-Tenant Architecture

## Tenant Model

Organization
├── Branches
├── Users
├── Roles
└── Data

All business records contain organization_id.

Tenant isolation rules:
- One organization cannot access another organization's data.
- Research sharing requires explicit consent.
- Future ecosystem modules will use the same tenant model.

Phase 1 active tenant type: Clinic.
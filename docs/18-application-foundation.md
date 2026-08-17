# 18 — Application Foundation

## Purpose

The application foundation establishes the runtime boundaries used by every PetRx Phase 1 feature before production authentication and database access are enabled.

## Organization context

Every authenticated request must resolve an organization context before accessing tenant-owned resources. The context may also contain a branch and the authenticated user.

```text
User → Organization → Branch → Permission → Resource
```

The organization identifier must never be accepted solely as an arbitrary client-supplied value. The production authentication layer will derive it from the authenticated membership/session context.

## RBAC

PetRx uses permission-based authorization. A user may have multiple roles, and effective permissions are the union of permissions granted by those roles.

Example:

```text
Staff Member
├── Receptionist
├── Cashier
└── Pharmacist
       ↓
Effective permissions
```

UI visibility is not a security boundary. API/server-side authorization must enforce permissions for every protected operation.

## Current implementation

- `apps/web/lib/tenant.ts` — organization context contract and guard.
- `apps/web/lib/rbac.ts` — permission contract and authorization helpers.
- `apps/web/lib/navigation.ts` — Phase 1 clinic navigation metadata.

These modules are intentionally framework-light so the production authentication/session provider can be introduced without coupling authorization rules to a specific UI component.

## Next implementation stage

1. Connect the Prisma client to the web application.
2. Implement production authentication and sessions.
3. Resolve organization and branch membership from the authenticated user.
4. Load effective permissions from RBAC tables.
5. Protect server routes and mutations.
6. Replace page placeholders with database-backed queries.
7. Add automated tenant-isolation and permission tests.

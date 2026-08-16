# PetRx API Strategy

## 1. Principles

- API-first for application boundaries.
- Multi-tenant aware by design.
- Versioned endpoints.
- Server-side authorization on every protected operation.
- Consistent resource naming based on the domain model.
- Auditability for sensitive mutations and data access.
- Interoperability without weakening tenant isolation.

## 2. Domain Terminology

The API follows database/domain terminology rather than UI labels:

- `parties` — external people/organizations; Phase 1 Client UI maps to Party.
- `animals` — animal/patient records; Phase 1 Pet UI maps to Animal.
- `farms` — Farm Profile linked to a Party.
- `organizations` — tenants.

This prevents future Phase 3 animal-husbandry APIs from being constrained by clinic-specific names.

## 3. Example Resource Groups

```text
/api/v1/organizations
/api/v1/branches
/api/v1/departments
/api/v1/users
/api/v1/roles
/api/v1/permissions
/api/v1/parties
/api/v1/animals
/api/v1/farms
/api/v1/appointments
/api/v1/medical-records
/api/v1/clinical-cases
/api/v1/inventory
/api/v1/sales
/api/v1/accounts-receivable
/api/v1/accounts-payable
/api/v1/knowledge
/api/v1/ai/evidence-search
```

Actual route naming may be refined during implementation, but the conceptual boundary is fixed here.

## 4. Authentication and Tenant Context

Authenticated requests must resolve:

- User identity
- Organization/tenant
- Assigned roles
- Effective permissions
- Branch scope
- Department scope

Clients must not be able to select an arbitrary organization ID to bypass authorization.

## 5. Integrations

Future integrations may include:

- Clinic systems
- Research repositories
- University systems
- Laboratory systems
- Government reporting bridges
- Farm/animal-husbandry systems
- Manufacturer/R&D systems

Cross-organization integrations must use explicit contracts and controlled data-sharing mechanisms.

## 6. Interoperability Formats

Phase 1 should support practical exchange mechanisms such as:

- REST/JSON APIs
- CSV import/export
- Excel import/export where appropriate
- Webhooks for selected events

Future integrations may introduce sector-specific standards where justified by the target partner.

## 7. File and Evidence APIs

Document/video uploads and evidence retrieval must use controlled storage references rather than exposing raw storage credentials. API responses should preserve source metadata and permissions.

## 8. Financial API Scope

Operational APIs may support:

- Sales
- Payments
- Expenses
- AR invoices and payments
- AP bills and payments
- Inventory

PetRx does not expose a general-ledger or double-entry accounting API in Phase 1.

## 9. Versioning

Breaking changes require a new API version or a managed migration path. Internal domain changes must not silently break client integrations.

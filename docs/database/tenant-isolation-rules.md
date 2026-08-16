# PetRx Tenant Isolation Rules

## 1. Primary Boundary

`organization_id` is the primary tenant boundary for organization-owned data.

## 2. Required Rules

1. Every organization-owned record must be tenant-attributable.
2. API handlers must derive organization context from the authenticated session/token.
3. Client-supplied organization IDs are never sufficient authorization evidence.
4. Repository/database queries must apply tenant scope by default.
5. Foreign-key relationships between tenant-owned records must be validated to ensure both records belong to the same organization.
6. Branch and department assignments must belong to the same organization as the user.
7. Uploaded files must use tenant-scoped storage paths and authorization checks.
8. Background jobs must carry explicit tenant context.
9. Cache keys must include tenant identity where cached data is tenant-specific.
10. Audit records must retain organization context whenever an organization is involved.

## 3. Global Reference Data

Some tables may be platform-global, such as permission definitions or approved public knowledge-source metadata. Global records must never be mistaken for tenant-owned clinical or operational data.

## 4. Party Isolation

A Party named "Juan Dela Cruz" in Clinic A is not automatically the same Party as a similarly named person in Clinic B. Cross-tenant identity matching is disabled by default.

## 5. Clinical Case Isolation

Internal Clinical Cases remain private to the owning organization unless an explicit research-sharing workflow grants access. AI search must respect this boundary.

## 6. Financial Isolation

Sales, payments, expenses, AR, AP, suppliers, and inventory are tenant-scoped. A user in one clinic cannot query another clinic's financial data even if they know an invoice number.

## 7. Future Collaboration

Phase 2–5 collaboration is implemented through governed sharing, anonymization, APIs, and audit trails—not by granting a user unrestricted access to another organization's tenant.

## 8. Testing Requirements

Automated tests must include cross-tenant access attempts for:

- Users
- Parties/Clients
- Animals/Pets
- Medical records
- Clinical Cases
- Inventory
- Sales
- AR/AP
- Knowledge resources
- Files

Every attempt must be denied unless an explicit collaboration permission exists.

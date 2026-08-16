# PetRx System Architecture

## 1. Architectural Principle

PetRx uses an **Organization-Based, Multi-Tenant Architecture**. The system is not hard-coded around veterinary clinics even though clinics are the only active organization type in Phase 1.

The core boundary is:

```text
Platform
  └── Organization (Tenant)
       ├── Branches
       ├── Departments
       ├── Users
       ├── Roles / Permissions
       ├── Parties
       ├── Animals
       └── Organization-owned operational data
```

Every tenant-owned record is associated with an organization and is subject to tenant isolation.

## 2. Organization Types

The platform model supports:

- `clinic`
- `university`
- `research_institute`
- `farm`
- `government`
- `laboratory`
- `manufacturer`

Only `clinic` is exposed in Version 1. Other types are architectural capabilities reserved for later phases.

## 3. Core Domains

### Platform Foundation

- Organizations
- Organization types
- Branches
- Departments
- Subscriptions

### Identity and Access

- Users
- Roles
- Permissions
- Role permissions
- User-role assignments
- User-branch assignments
- User-department assignments
- Invitations and sessions

### Party and Animal Management

- Parties
- Farm profiles
- Animals
- Party-animal relationships

The database uses `parties` and `animals` while Phase 1 UI uses the familiar terms Client and Pet.

### Veterinary Operations

- Appointments
- Medical records
- SOAP notes
- Prescriptions
- Vaccinations
- Laboratory results
- Surgeries
- Attachments
- Clinical cases

### Commercial Operations

- Products
- Inventory
- Suppliers
- Sales
- Payments
- Expenses
- Accounts Receivable
- Accounts Payable

PetRx provides operational financial tracking, not full accounting.

### Knowledge and Evidence

- Knowledge sources
- Knowledge documents
- Knowledge categories/tags
- Symptoms and conditions
- Clinical cases and evidence references
- Search/index metadata

### Client Experience

- Client Portal
- Portal notifications
- Clinic website/profile content

### Compliance

- Audit logs
- Activity logs
- Login/security events

## 4. Cross-Domain Rules

1. Tenant-owned data must be scoped to an organization.
2. User access is resolved through role permissions plus tenant/branch/department scope.
3. Sensitive clinical and client information cannot be exposed to other organizations by default.
4. Research sharing requires explicit authorization and an anonymization/governance process.
5. Public evidence may be indexed only when its use is legally and technically permitted.
6. AI search results are evidence references and decision-support inputs, not diagnoses.

## 5. Phase Strategy

Phase 1 exposes the clinic domain while the platform core is built as a reusable ecosystem foundation. Future modules are added as organization-specific capabilities rather than by replacing the underlying tenant, identity, party, animal, RBAC, audit, and API layers.

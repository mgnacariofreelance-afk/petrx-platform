# PetRx Multi-Tenant Architecture

## 1. Tenant Model

An **Organization** is the primary tenant boundary.

```text
PetRx Platform
└── Organization
    ├── Branches
    ├── Departments
    ├── Users
    ├── Roles / Permissions
    ├── Parties
    ├── Animals
    └── Organization Data
```

Phase 1 tenant type: `clinic`.

The same tenant model is reserved for universities, research institutes, farms, government agencies, laboratories, and manufacturers in later phases.

## 2. Tenant Isolation

Every organization-owned record must be attributable to exactly one tenant unless the record is explicitly classified as platform-global reference data.

Application services must enforce:

- Organization context on every authenticated request.
- Server-side tenant authorization; tenant IDs must never be trusted from the client alone.
- Tenant-scoped queries by default.
- Tenant-scoped unique constraints where appropriate.
- Tenant-scoped storage paths for uploaded files.
- Tenant-aware audit logging.

Cross-tenant access is denied by default.

## 3. Global vs Tenant-Owned Data

### Platform-global

Examples:

- Organization type definitions
- Permission definitions
- Public knowledge-source metadata where appropriate
- System configuration

### Tenant-owned

Examples:

- Users and staff assignments
- Parties/clients
- Farm profiles owned by a tenant
- Animals and medical records
- Appointments
- Inventory and suppliers
- Sales, expenses, AR, and AP
- Internal clinical cases
- Tenant website content
- Tenant audit records

## 4. Party Ownership

The `party` model represents the person or organization interacting with a tenant. A Phase 1 clinic may use a Party as a Client. Future phases may use Parties for farms, companies, universities, laboratories, government agencies, and manufacturers.

A Farm Profile is a specialized record linked to a Party and contains farm-specific information without changing the core tenant model.

## 5. User Access

RBAC is cumulative:

```text
User
 ├── Roles → Permissions
 ├── Branch Assignments
 └── Department Assignments
```

A user may hold multiple roles, such as Receptionist + Cashier + Pharmacy Assistant. Permissions are combined, while branch and department assignments continue to constrain the scope of access.

## 6. Cross-Organization Collaboration

Future research and government workflows must not bypass tenant isolation. Collaboration is implemented through explicit sharing/consent records, controlled APIs, anonymization, and auditable access rather than direct access to another organization's database records.

## 7. Data Lifecycle

Tenant deletion, suspension, export, retention, and archival policies must preserve auditability and comply with applicable Philippine privacy requirements and contractual obligations.

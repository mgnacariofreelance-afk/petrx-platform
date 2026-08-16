# PetRx Phase 1 Permission Matrix

## 1. Permission Format

Permissions use:

```text
resource.action
```

Examples:

- `client.view`
- `client.create`
- `animal.view`
- `animal.create`
- `appointment.create`
- `medical_record.view`
- `medical_record.create`
- `prescription.create`
- `inventory.edit`
- `sales.create`
- `ar.view`
- `ap.collect`
- `research.search`
- `user.manage`

The UI may say Client/Pet while permission resources use the stable domain terms Party/Animal where appropriate. Permission aliases may be provided at the application layer for readability.

## 2. Core Phase 1 Matrix

| Permission | Owner | Admin | Vet | Assistant | Receptionist | Cashier | Inventory | Pharmacy |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| client.view | Y | Y | Y | Y | Y | N | N | N |
| client.create | Y | Y | Y | Y | Y | N | N | N |
| client.edit | Y | Y | Y | Y | Y | N | N | N |
| animal.view | Y | Y | Y | Y | Y | N | N | Y |
| animal.create | Y | Y | Y | Y | Y | N | N | N |
| animal.edit | Y | Y | Y | Y | Y | N | N | N |
| appointment.view | Y | Y | Y | Y | Y | N | N | N |
| appointment.create | Y | Y | Y | Y | Y | N | N | N |
| medical_record.view | Y | Y | Y | Y | N | N | N | Y |
| medical_record.create | Y | Y | Y | Y | N | N | N | N |
| medical_record.edit | Y | Y | Y | Y | N | N | N | N |
| prescription.view | Y | Y | Y | Y | N | N | N | Y |
| prescription.create | Y | Y | Y | N | N | N | N | N |
| medication.dispense | Y | Y | Y | Y | N | N | Y | Y |
| vaccination.manage | Y | Y | Y | Y | N | N | N | N |
| inventory.view | Y | Y | N | Y | N | N | Y | Y |
| inventory.edit | Y | Y | N | N | N | N | Y | Y |
| supplier.manage | Y | Y | N | N | N | N | Y | N |
| sales.view | Y | Y | N | N | Y | Y | N | N |
| sales.create | Y | Y | N | N | N | Y | N | N |
| payment.collect | Y | Y | N | N | N | Y | N | N |
| ar.view | Y | Y | N | N | Y | Y | N | N |
| ar.collect | Y | Y | N | N | N | Y | N | N |
| ap.view | Y | Y | N | N | N | N | Y | N |
| ap.manage | Y | Y | N | N | N | N | Y | N |
| expense.manage | Y | Y | N | N | N | N | N | N |
| research.search | Y | Y | Y | Y | N | N | N | N |
| clinical_case.view | Y | Y | Y | Y | N | N | N | N |
| clinical_case.create | Y | Y | Y | Y | N | N | N | N |
| user.manage | Y | Y | N | N | N | N | N | N |
| role.manage | Y | Y | N | N | N | N | N | N |
| branch.manage | Y | Y | N | N | N | N | N | N |
| department.manage | Y | Y | N | N | N | N | N | N |
| audit.view | Y | Y | N | N | N | N | N | N |

## 3. Scope Rules

A `Y` does not mean unrestricted access. The authorization engine additionally evaluates:

1. Organization/tenant.
2. Assigned branch.
3. Assigned department.
4. Resource ownership and relationships.
5. Record-specific restrictions.
6. Portal vs internal-user context.

## 4. Cumulative Permissions

If a user has Receptionist + Cashier + Pharmacy Assistant, their effective permission set is the union of the three roles, constrained by their organization/branch/department scope.

## 5. Future Ecosystem

Phase 2–5 roles and permissions are added without changing the RBAC architecture. Future permission groups may include Research, Farm Operations, Government Reporting, Laboratory Operations, and R&D.

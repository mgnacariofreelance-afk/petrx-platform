# PetRx Role Definitions and User Lifecycle

## 1. RBAC Model

PetRx uses **Hybrid RBAC + Permission-Based Access Control**.

A user is not limited to one job role. A user can have:

- Multiple roles
- Multiple branch assignments
- Multiple department assignments

Effective permissions are the cumulative permissions of all assigned roles, subject to tenant, branch, department, and resource-level restrictions.

## 2. Example: Multi-Function Staff

A clinic employee may be:

```text
Maria Santos
├── Receptionist
├── Cashier
└── Pharmacy Assistant
```

PetRx does not create a special `ReceptionistCashierPharmacist` role. Atomic roles are combined through `user_roles`.

## 3. User Creation Workflow

1. Organization Owner/Administrator opens User Management.
2. Creates the staff user's identity record.
3. Enters name, email, mobile, and optional HR-ready information such as employee number, job title, hire date, employment type, and employment status.
4. Assigns one or more roles.
5. Assigns one or more permitted branches.
6. Assigns one or more departments.
7. Reviews effective permissions.
8. Sends the one-time invitation.
9. User verifies the invitation.
10. User creates a password.
11. Account becomes active.

## 4. User Statuses

Recommended lifecycle states:

- Pending Invitation
- Active
- Suspended
- Inactive
- Locked

Employment status is separate from authentication status.

## 5. Phase 1 Roles

### PetRx Super Admin
Platform-level administration; not a normal clinic role.

### Organization Owner
Full control over the organization subject to platform restrictions.

### Organization Administrator
Operational administration, users, branches, departments, and configuration.

### Veterinarian
Clinical workflows, medical records, prescriptions, vaccinations, and AI Clinical Evidence Search according to assigned permissions.

### Veterinary Assistant
Clinical support and permitted patient/record operations.

### Receptionist
Client/Party registration, Animal/Pet registration, appointments, and permitted front-desk operations.

### Cashier
Sales, payments, and permitted AR collection workflows.

### Inventory Officer
Products, inventory movements, suppliers, and stock controls.

### Pharmacy Assistant
Prescription fulfillment, medication dispensing, and permitted inventory operations.

### Pet Owner / Client Portal User
External portal access limited to the linked Party and authorized Animals/Pets. This is not an internal clinic staff role.

## 6. Future Role Compatibility

Future organizations can introduce roles such as:

- Researcher
- Research Reviewer
- Student Researcher
- Farm Manager
- Veterinary Field Officer
- Disease Surveillance Officer
- Laboratory Technician
- Laboratory Manager
- R&D Officer

These roles use the same permission model.

## 7. Required Tables

- users
- roles
- permissions
- permission_groups
- role_permissions
- user_roles
- user_branches
- user_departments
- user_invitations
- user_sessions
- password_resets

## 8. HR Boundary

PetRx is HR-ready but does not implement payroll, attendance, leave, recruitment, or performance management in Phase 1.

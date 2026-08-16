# RBAC Architecture

## Core Roles

- PetRx Super Admin
- Organization Owner
- Organization Administrator
- Veterinarian
- Veterinary Assistant
- Receptionist
- Inventory Officer
- Pet Owner

## Permission Model

Examples:
- patient.view
- patient.create
- patient.edit
- appointment.manage
- inventory.manage
- research.search

Permissions are assigned to roles and roles are assigned to users.

RBAC is designed to support all future organization types.
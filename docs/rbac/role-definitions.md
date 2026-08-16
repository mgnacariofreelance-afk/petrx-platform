# PetRx Role Definitions

## Core Principle
Users may have multiple roles, multiple branch assignments, and multiple department assignments.

## User Lifecycle
1. Organization Admin creates user
2. Assign roles
3. Assign branches
4. Assign departments
5. Send invitation email
6. User activates account
7. User creates password

## Roles
- PetRx Super Admin
- Organization Owner
- Organization Administrator
- Veterinarian
- Veterinary Assistant
- Receptionist
- Cashier
- Inventory Officer
- Pharmacy Assistant
- Pet Owner

## Required Tables
- users
- user_roles
- user_branches
- user_departments
- user_invitations
- user_sessions
- password_resets

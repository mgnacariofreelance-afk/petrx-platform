# User Tables

## users
- id UUID PK
- organization_id UUID FK
- first_name
- last_name
- email UNIQUE
- mobile
- status

## user_roles
- user_id FK
- role_id FK

## user_branches
- user_id FK
- branch_id FK

## user_departments
- user_id FK
- department_id FK

## user_invitations
## user_sessions
## password_resets

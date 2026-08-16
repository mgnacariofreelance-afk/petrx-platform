# Audit Log Tables

## audit_logs
- id UUID PK
- organization_id UUID FK
- user_id UUID FK
- action
- resource
- old_values JSONB
- new_values JSONB
- created_at

Tracks all critical system activity.
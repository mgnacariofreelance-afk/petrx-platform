# PetRx Master ERD v1.1

This document is the conceptual database contract for Phase 1. It is designed to support the future ecosystem without prematurely exposing future modules.

## 1. Platform and Tenant Foundation

### organization_types
- `id` UUID PK
- `code` VARCHAR(50) UNIQUE
- `name` VARCHAR(100)

Seed types: clinic, university, research_institute, farm, government, laboratory, manufacturer.

### organizations
- `id` UUID PK
- `organization_type_id` UUID FK
- `name` VARCHAR(255)
- `code` VARCHAR(50)
- `slug` VARCHAR(255)
- `status` VARCHAR(30)
- timestamps

### branches
- `id` UUID PK
- `organization_id` UUID FK
- `name` VARCHAR(255)
- `address` TEXT
- `status`
- timestamps

### departments
- `id` UUID PK
- `organization_id` UUID FK
- `branch_id` UUID nullable FK
- `name` VARCHAR(255)
- `status`
- timestamps

### subscriptions
- `id` UUID PK
- `organization_id` UUID FK
- `plan_code`
- `status`
- `starts_at`
- `ends_at`

## 2. Identity and RBAC

### users
- `id` UUID PK
- `organization_id` UUID FK
- `first_name`
- `last_name`
- `email`
- `mobile`
- `employee_number` nullable
- `job_title` nullable
- `hire_date` nullable
- `employment_type` nullable
- `employment_status`
- `status`
- timestamps

The HR-ready fields do not constitute a Phase 1 HR/payroll module.

### roles
- `id` UUID PK
- `organization_id` UUID nullable FK for organization-defined roles
- `name`
- `description`
- `is_system_role`

### permissions
- `id` UUID PK
- `permission_group_id` FK
- `code` UNIQUE
- `description`

### permission_groups
- `id` UUID PK
- `name`

### role_permissions
- `role_id` FK
- `permission_id` FK
- composite PK

### user_roles
- `user_id` FK
- `role_id` FK
- composite PK

### user_branches
- `user_id` FK
- `branch_id` FK
- composite PK

### user_departments
- `user_id` FK
- `department_id` FK
- composite PK

### user_invitations / user_sessions / password_resets
Authentication lifecycle support tables with tenant-aware ownership where applicable.

## 3. Party and Animal Model

### parties
A generic counterparty/client entity. The Phase 1 UI labels appropriate Party records as **Clients**.

- `id` UUID PK
- `organization_id` UUID FK
- `party_type` ENUM/reference: individual, farm, company, university, laboratory, government, manufacturer
- `name`
- `first_name` nullable
- `last_name` nullable
- `email` nullable
- `contact_no` nullable
- `address` nullable
- `status`
- timestamps

### farms
A specialized Farm Profile linked to a Party.

- `id` UUID PK
- `party_id` UUID FK UNIQUE where one Party represents one farm profile
- `organization_id` UUID FK
- `farm_name`
- `farm_owner`
- `address`
- `contact_no`
- `farm_type`
- `farm_size` nullable
- `farm_size_unit` nullable
- timestamps

Required Phase 3-facing farm fields are Farm Name, Farm Owner, Address, Contact Number, and Farm Type.

### animals
The generic animal/patient entity. Phase 1 UI labels companion-animal records as **Pets**.

- `id` UUID PK
- `organization_id` UUID FK
- `party_id` UUID FK
- `name`
- `species`
- `breed` nullable
- `sex`
- `birth_date` nullable
- `identification_no` nullable
- `status`
- timestamps

Phase 1 supports companion animals. Phase 3 can add production-animal workflows without renaming the core entity.

## 4. Appointments

### appointments
- `id` UUID PK
- `organization_id` UUID FK
- `animal_id` UUID FK
- `party_id` UUID FK
- `veterinarian_id` UUID FK to users
- `appointment_type_id` FK
- `scheduled_at`
- `status`
- `notes`
- timestamps

## 5. Clinical Records

### medical_records
- `id` UUID PK
- `organization_id` UUID FK
- `animal_id` UUID FK
- `appointment_id` nullable FK
- `recorded_by` FK to users
- `recorded_at`
- status

### soap_notes
- `id` UUID PK
- `medical_record_id` UUID FK
- `subjective`
- `objective`
- `assessment`
- `plan`

### prescriptions
- `id` UUID PK
- `organization_id` UUID FK
- `medical_record_id` UUID FK
- `prescribed_by` FK to users
- status

### vaccinations
- `id` UUID PK
- `organization_id` UUID FK
- `animal_id` UUID FK
- `medical_record_id` nullable FK
- vaccine/product reference
- administered_at
- administered_by

### lab_results
- `id` UUID PK
- `organization_id` UUID FK
- `medical_record_id` UUID FK
- result metadata / values
- attachment reference

### surgeries
- `id` UUID PK
- `organization_id` UUID FK
- `medical_record_id` UUID FK
- procedure metadata
- performed_at
- performed_by

### attachments
- `id` UUID PK
- `organization_id` UUID FK
- entity_type
- entity_id
- storage_key
- file metadata

## 6. Clinical Cases

### clinical_cases
- `id` UUID PK
- `organization_id` UUID FK
- `medical_record_id` nullable FK
- title
- case_summary
- outcome
- visibility_scope
- consent_status
- created_by
- timestamps

### clinical_case_symptoms
- `clinical_case_id` FK
- `symptom_id` FK

### clinical_case_conditions
- `clinical_case_id` FK
- `condition_id` FK

### clinical_case_attachments
- `clinical_case_id` FK
- `attachment_id` FK

### clinical_case_references
- `clinical_case_id` FK
- `knowledge_document_id` FK

Clinical cases remain tenant-private unless explicitly approved for governed research sharing.

## 7. Inventory and Suppliers

### suppliers
- `id` UUID PK
- `organization_id` UUID FK
- `party_id` nullable FK when supplier is also represented as a Party
- name/contact fields
- status

### product_categories
- `id` UUID PK
- `organization_id` UUID FK
- name

### products
- `id` UUID PK
- `organization_id` UUID FK
- `product_category_id` FK
- sku
- name
- unit
- sale_price
- cost_price
- status

### inventory
- `id` UUID PK
- `organization_id` UUID FK
- `branch_id` FK
- `product_id` FK
- quantity
- reorder_level

### inventory_movements
- `id` UUID PK
- `organization_id` UUID FK
- `branch_id` FK
- `product_id` FK
- movement_type
- quantity
- reference_type
- reference_id
- created_by
- created_at

## 8. Operational Finance

PetRx tracks operational financial activity needed by clinics, but does not implement a full accounting ledger.

### sales / sale_items
Sales and line items for consultations, procedures, products, and other clinic charges.

### payments
Payments applied to sales and/or receivable invoices.

### expenses
Operational expense records.

### ar_invoices / ar_invoice_items / ar_payments
Accounts Receivable for credit/term transactions and partial settlements.

### ap_bills / ap_bill_items / ap_payments
Accounts Payable for supplier obligations and partial settlements.

Full accounting tables such as chart of accounts, journal entries, general ledger, trial balance, and financial statements are outside Phase 1.

## 9. Client Portal

### portal_accounts
- `id` UUID PK
- `organization_id` UUID FK
- `user_id` UUID FK
- `party_id` UUID FK
- status

### portal_notifications
Tenant-scoped client notifications.

## 10. AI Knowledge Library

### knowledge_sources
- `id` UUID PK
- source_type
- source_name
- publisher
- public_or_authorized status

### knowledge_documents
- `id` UUID PK
- `knowledge_source_id` FK
- title
- document_type
- publication metadata
- file/storage reference
- search/index status

### knowledge_categories / knowledge_tags
Classification and retrieval metadata.

### knowledge_symptoms / knowledge_conditions
Controlled searchable concepts used by evidence retrieval.

### knowledge_document_matches
Search/index metadata connecting evidence to searchable concepts and ranking signals.

The library may contain research papers, clinical cases, veterinary journals, conference materials, public educational videos, and other legally usable sources.

## 11. Audit and Security

### audit_logs
- `id` UUID PK
- `organization_id` UUID FK nullable for platform events
- `user_id` UUID FK nullable for system events
- `action`
- `resource`
- `resource_id`
- `old_values` JSONB nullable
- `new_values` JSONB nullable
- `ip_address` nullable
- `created_at`

## 12. ERD Rules

1. Tenant-owned records contain `organization_id` unless ownership is inherited through a strictly controlled relationship and the service layer can enforce the tenant boundary.
2. Foreign keys cannot cross organization boundaries unless the relationship is explicitly a governed collaboration mechanism.
3. User roles, branches, and departments are many-to-many assignments.
4. Party is the generic external-person/entity model; Animal is the generic patient/animal model.
5. Phase 1 UI terminology may differ from database terminology without changing the underlying model.
6. AI evidence and internal clinical cases have separate ownership and sharing controls.
7. Financial tables support operational AR/AP, not double-entry accounting.
8. This ERD is the conceptual baseline for the production Prisma schema and migrations.

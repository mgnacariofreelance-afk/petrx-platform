# PetRx Master ERD v1.0

## Core Multi-Tenant Tables

### organization_types
- id (PK)
- code
- name

### organizations
- id (PK)
- organization_type_id (FK)
- name
- slug
- status
- created_at

### branches
- id (PK)
- organization_id (FK)
- name
- address

### departments
- id (PK)
- organization_id (FK)
- branch_id (FK)
- name

### subscriptions
- id (PK)
- organization_id (FK)
- plan
- status

## Identity & RBAC

### users
- id (PK)
- organization_id (FK)
- email
- password_hash
- status

### roles
- id (PK)
- organization_id (FK)
- name

### permissions
- id (PK)
- code
- description

### role_permissions
- role_id (FK)
- permission_id (FK)

### user_roles
- user_id (FK)
- role_id (FK)

## Client & Pet Management

### clients
- id (PK)
- organization_id (FK)
- first_name
- last_name
- email
- mobile

### pets
- id (PK)
- organization_id (FK)
- client_id (FK)
- name
- species
- breed
- sex
- birth_date

## Appointments

### appointments
- id (PK)
- organization_id (FK)
- pet_id (FK)
- veterinarian_id (FK)
- appointment_date
- status

## Medical Records

### medical_records
- id (PK)
- organization_id (FK)
- pet_id (FK)
- appointment_id (FK)

### soap_notes
- id (PK)
- medical_record_id (FK)
- subjective
- objective
- assessment
- plan

### prescriptions
- id (PK)
- medical_record_id (FK)

### vaccinations
- id (PK)
- pet_id (FK)

### lab_results
- id (PK)
- medical_record_id (FK)

### surgeries
- id (PK)
- medical_record_id (FK)

## Operations

### suppliers
### products
### inventory_transactions
### sales
### expenses
### accounts_receivable
### accounts_payable

All operational tables must contain organization_id.

## AI Knowledge Library

### knowledge_sources
- id (PK)
- source_type
- source_name

### knowledge_documents
- id (PK)
- knowledge_source_id (FK)
- title
- document_type
- file_url

### knowledge_tags
- id (PK)
- name

### knowledge_document_tags
- document_id (FK)
- tag_id (FK)

### knowledge_symptoms
- id (PK)
- symptom_name

### document_symptoms
- document_id (FK)
- symptom_id (FK)

## Internal Case Intelligence

### case_index
- id (PK)
- organization_id (FK)
- medical_record_id (FK)
- searchable_symptoms
- outcome

## Audit & Compliance

### audit_logs
- id (PK)
- organization_id (FK)
- user_id (FK)
- action
- entity
- created_at

Rule: Every tenant-owned table contains organization_id for isolation and future ecosystem expansion.
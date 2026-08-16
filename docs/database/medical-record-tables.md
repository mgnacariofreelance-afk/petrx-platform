# Medical Record Tables

## Domain Rule

The database entity is `animals`; the Phase 1 UI calls these records Pets. Medical records belong to an Animal and its organization tenant.

## medical_records

- `id` UUID PK
- `organization_id` UUID FK
- `animal_id` UUID FK
- `appointment_id` nullable FK
- `recorded_by` UUID FK → users
- `recorded_at`
- `status`
- timestamps

## soap_notes

- `id` UUID PK
- `medical_record_id` UUID FK
- `subjective` TEXT
- `objective` TEXT
- `assessment` TEXT
- `plan` TEXT
- timestamps

## vaccinations

- `id` UUID PK
- `organization_id` UUID FK
- `animal_id` UUID FK
- `medical_record_id` nullable FK
- `product_id` nullable FK
- `administered_at`
- `administered_by` UUID FK
- certificate/reference metadata

## prescriptions

- `id` UUID PK
- `organization_id` UUID FK
- `medical_record_id` UUID FK
- `prescribed_by` UUID FK
- status
- timestamps

Prescription line details may reference products and dosage/instruction data.

## lab_results

- `id` UUID PK
- `organization_id` UUID FK
- `medical_record_id` UUID FK
- test metadata
- result data
- reference ranges where applicable
- attachment reference
- timestamps

## surgeries

- `id` UUID PK
- `organization_id` UUID FK
- `medical_record_id` UUID FK
- procedure
- performed_at
- performed_by
- preoperative/recovery metadata

## attachments

- `id` UUID PK
- `organization_id` UUID FK
- `entity_type`
- `entity_id`
- storage key
- file metadata
- uploaded_by
- timestamps

## Clinical Cases

Clinical Cases are a related Phase 1 resource and should be modeled separately from routine medical-record storage so that a case can have its own sharing, indexing, evidence references, and consent status.

## Privacy Rule

Medical records are tenant-owned confidential data. Client/Party and Animal/Pet information must not be exposed to other organizations without an explicit authorized sharing workflow.

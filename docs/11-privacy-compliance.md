# PetRx Privacy & Compliance Foundation

## 1. Scope

PetRx will be designed to operate in accordance with applicable Philippine privacy, cybersecurity, contractual, and sector-specific requirements. The Data Privacy Act of 2012 (Republic Act No. 10173) is a core design consideration, but this document is an architecture baseline and not legal advice.

Production deployment must be reviewed against current legal and regulatory requirements and the obligations of each participating organization.

## 2. Data Ownership

Each organization remains the primary controller/owner of its tenant data according to its agreements and applicable law. PetRx must not treat tenant data as a platform-wide public dataset.

## 3. Tenant Isolation

Clinical, client, animal, financial, staff, and internal case data must remain isolated by organization.

A user's authentication does not by itself grant access to every record in the organization. Authorization must consider:

- Organization
- Role/permission
- Branch assignment
- Department assignment
- Record-specific permissions where required

## 4. Client / Party Data

Phase 1 client information may include names, contact information, addresses, portal credentials, and records associated with their Animals/Pets. This information is protected tenant data.

The database uses `parties` as the generic domain entity while the clinic UI uses Client.

## 5. Clinical Data

Clinical records, prescriptions, laboratory results, surgery records, vaccination records, and Clinical Cases are sensitive organizational information.

Raw identifiable clinical records must not be exposed to other organizations through the AI research network by default.

## 6. AI Evidence Library

Public or authorized documents may be indexed subject to licensing and lawful use. Source attribution must be preserved.

The AI search service must not expose private tenant clinical information when answering searches against the public evidence library.

## 7. Research and Case Sharing

Future cross-organization research requires a governed process that may include:

1. Explicit organization authorization.
2. Appropriate consent where required.
3. De-identification/anonymization.
4. Data-minimization review.
5. Access-control policy.
6. Audit logging.
7. Revocation/retention rules where applicable.

A research user should receive only the minimum dataset necessary for the approved purpose.

## 8. Farm and Future Ecosystem Data

Farm records may contain commercially sensitive information such as farm location, ownership, production type, and operational metrics. Phase 3 must treat these as tenant-owned/confidential by default.

## 9. Security Principles

- Least privilege
- Secure authentication
- Strong password hashing
- Encryption in transit
- Encryption at rest where supported by the infrastructure
- Tenant-scoped storage
- Audit logging
- Secure backups
- Secret management
- Controlled administrative access

## 10. Auditability

Sensitive actions must be auditable, including:

- Login/security events
- User and role changes
- Access to sensitive clinical records
- Prescription changes
- Financial transaction changes
- Inventory adjustments
- Data exports
- Research sharing approvals

## 11. Retention and Deletion

Retention periods must be configurable according to applicable law, clinic policy, contractual obligations, and future sector requirements. Deletion must not silently remove required audit evidence.

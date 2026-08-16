# PetRx Client Portal

## 1. Purpose

The Client Portal is the external-facing portal for a clinic's Clients. In the domain model, a Client is represented by a Party and is associated with one or more Animals/Pets.

## 2. Account Activation

The workflow is invitation-based; the clinic does not create or know the client's permanent password.

1. Clinic staff creates or selects the Client/Party.
2. Staff nominates the client's email address and enables portal access.
3. PetRx creates a pending portal account/invitation.
4. PetRx sends a one-time verification email.
5. Client clicks **Verify Account**.
6. PetRx verifies the invitation and redirects the client to the Client Portal account setup flow.
7. Client creates a new password.
8. Portal account becomes active.

The nominated email functions as the portal username/login identifier.

## 3. Phase 1 Features

Subject to clinic configuration and permission:

- View personal/client profile information
- View linked Animals/Pets
- View appointment history and upcoming appointments
- View vaccination records
- View prescriptions
- View applicable clinical documents/certificates
- View billing history and outstanding operational balances
- Receive portal notifications
- Download permitted documents

## 4. Data Boundary

A client may access only:

- The clinic organization that issued the portal account.
- The Party record linked to that portal account.
- Animals/Pets explicitly linked to that Party.
- Documents and transactions explicitly authorized for portal visibility.

The portal cannot be used to browse another client's records or another organization's data.

## 5. Multiple Animals/Pets

A single Client/Party may have multiple Animals/Pets. The portal should present them as separate patient profiles while maintaining the common Party relationship.

## 6. Security

Required controls include:

- One-time invitation token with expiration.
- Email verification.
- Password hashing using a modern password-hashing algorithm.
- Password reset workflow.
- Session management and revocation.
- Rate limiting and account lockout controls where appropriate.
- Tenant and Party authorization on every protected resource.
- Audit logging for security-sensitive actions.

## 7. Future Compatibility

The Party-based architecture allows future organization types to interact with the platform without turning the Client Portal into a clinic-specific identity system. Future portals should be implemented as separate capabilities with explicit permissions rather than weakening the Phase 1 clinic tenant boundary.

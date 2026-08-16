# Phase 1 Clinic Workflows

## 1. Terminology Rule

The Phase 1 interface uses **Client** and **Pet** because those are familiar to veterinary clinics. The underlying domain model uses **Party** and **Animal**.

- Client UI → Party record
- Pet UI → Animal record

This is a terminology mapping, not two separate data models.

## 2. Staff User Setup

Before clinic operations begin, an Organization Administrator can:

1. Create a staff user.
2. Assign one or more roles.
3. Assign one or more branches.
4. Assign one or more departments.
5. Send the one-time invitation.
6. Staff verifies the invitation and creates a password.

A staff member may have multiple roles, for example Receptionist + Cashier + Pharmacy Assistant.

## 3. New Client / Party Registration

1. Staff selects **New Client**.
2. PetRx creates a Party with type `individual` unless another supported party type is selected.
3. Record name, contact number, email, and address.
4. Add one or more companion Animals/Pets.
5. Record species, breed, sex, birth date, identification number, and relevant profile information.
6. Optionally enable Client Portal access.
7. PetRx sends the one-time verification invitation to the nominated email.

## 4. Farm-Related Party Preparation

Farm management is not exposed as the Phase 1 clinic operating module, but the domain model supports a Farm Profile linked to a Party.

Farm-specific fields are:

- Farm Name
- Farm Owner
- Address
- Contact Number
- Farm Type

This becomes the basis for Phase 3 animal-husbandry workflows.

## 5. Appointment Workflow

1. Client/Party contacts the clinic or uses an enabled booking channel.
2. Staff selects the Animal/Pet.
3. Select veterinarian, appointment type, branch, and schedule.
4. Confirm appointment.
5. Check in the Animal/Pet.
6. Open or create the clinical record.
7. Complete consultation.
8. Proceed to checkout/billing as applicable.

## 6. Consultation Workflow

1. Open the Animal/Pet record.
2. Review relevant history, vaccinations, prescriptions, and prior clinical cases.
3. Record SOAP notes.
4. Record the veterinarian's clinical assessment/diagnosis.
5. Create prescription and/or treatment orders when appropriate.
6. Record laboratory requests/results or procedures.
7. Use AI Clinical Evidence Search as decision-support evidence when needed.
8. Schedule follow-up.
9. Save and audit the record.

PetRx AI does not independently diagnose the patient.

## 7. AI Clinical Evidence Search Workflow

1. Veterinarian opens AI Clinical Evidence Search.
2. Enters symptoms and relevant clinical findings.
3. Search engine retrieves matching evidence across indexed public/authorized sources and governed internal clinical cases.
4. Results are ranked by match/relevance.
5. Results are displayed in a table containing Match %, Condition Found, Source Type, and a clickable reference/source.
6. Veterinarian opens the underlying evidence for review.
7. The veterinarian remains responsible for clinical interpretation and decision-making.

## 8. Vaccination Workflow

1. Select Animal/Pet.
2. Select vaccine/product.
3. Record administration details.
4. Save vaccination to the medical record.
5. Generate/download certificate where configured.
6. Schedule the next reminder.

## 9. Surgery Workflow

1. Schedule procedure.
2. Record pre-operative information and consent.
3. Create surgery record.
4. Record procedure details.
5. Record recovery monitoring.
6. Record discharge instructions.
7. Add follow-up schedule.

## 10. Inventory and Pharmacy Workflow

1. Product is received from a supplier.
2. Inventory movement is recorded against the appropriate branch.
3. Product availability is updated.
4. During consultation, veterinarian may issue a prescription.
5. Authorized pharmacy/inventory staff dispense the product.
6. Stock movement and sale/charge are recorded.

## 11. Sales / AR Workflow

PetRx supports immediate payment and credit/term transactions.

### Immediate Payment

1. Create sale.
2. Add line items.
3. Record payment.
4. Close transaction.

### Credit / Term Sale

1. Create sale/invoice.
2. Associate the receivable with the Party/Client.
3. Set due date/terms.
4. Record partial or full payments.
5. Keep the remaining balance visible until settled.

## 12. Supplier / AP Workflow

### Immediate Supplier Payment

1. Record supplier bill/purchase.
2. Record payment.
3. Close payable.

### Supplier Terms

1. Record supplier bill.
2. Set due date/terms.
3. Record partial or full settlements.
4. Keep outstanding balance visible until settled.

## 13. Client Portal Workflow

1. Clinic creates/updates the Party record.
2. Clinic enables portal access.
3. PetRx sends one-time verification email.
4. Client verifies account.
5. Client creates password.
6. Client accesses only authorized clinic records for their Party and Animals/Pets.

## 14. Audit Requirement

Material actions such as record creation, edits, access to sensitive records, prescription changes, payments, inventory adjustments, role changes, and portal security events must be auditable.

# Phase 1 Clinic Operational Tables

## Scope

This document defines the Phase 1 clinic-facing operational tables. The platform foundation remains organization-based and uses the generic Party/Animal model.

## parties

The Phase 1 UI calls appropriate Party records **Clients**.

Core fields:

- `id` UUID PK
- `organization_id` UUID FK
- `party_type`
- `name`
- `first_name` nullable
- `last_name` nullable
- `email` nullable
- `contact_no` nullable
- `address` nullable
- `status`
- timestamps

## farms

Farm profiles are future-facing and are linked to a Party. They are not a required Phase 1 clinic workflow.

- `id` UUID PK
- `organization_id` UUID FK
- `party_id` UUID FK
- `farm_name`
- `farm_owner`
- `address`
- `contact_no`
- `farm_type`
- optional farm size fields

## animals

The Phase 1 UI calls Animals **Pets**.

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

## appointments

- `id` UUID PK
- `organization_id` UUID FK
- `animal_id` UUID FK
- `party_id` UUID FK
- `veterinarian_id` UUID FK → users
- scheduled date/time
- appointment type/status
- notes

## consultation_rooms

Optional clinic resource table for room/resource scheduling.

## products / product_categories

Products represent medicines, vaccines, supplies, procedures/service items, and other sellable operational items as configured by the clinic.

## inventory / inventory_movements

Inventory is branch-aware and organization-scoped. Every adjustment should have a reason/reference and responsible user.

## suppliers

Supplier records are organization-scoped. A supplier may optionally reference a Party when the supplier also participates in the broader Party model.

## sales / sale_items / payments

Sales support:

- Consultation/service charges
- Procedure charges
- Product/medicine sales
- Vaccine charges
- Immediate payment
- Credit/term transactions

## expenses

Operational expenses needed by the clinic. This is not a general ledger.

## Accounts Receivable

Use:

- `ar_invoices`
- `ar_invoice_items`
- `ar_payments`

Supports due dates, partial payments, outstanding balances, and settlement status.

## Accounts Payable

Use:

- `ap_bills`
- `ap_bill_items`
- `ap_payments`

Supports supplier terms, due dates, partial payments, outstanding balances, and settlement status.

## Explicitly Out of Scope

PetRx Phase 1 does not implement:

- Chart of accounts
- General ledger
- Journal entries
- Trial balance
- Full financial statements
- Bank reconciliation
- Payroll

Clinics may continue using a dedicated accounting system alongside PetRx.

## Tenant Rule

All clinic operational records are organization-scoped. Branch-specific resources must also carry or inherit a validated branch context.

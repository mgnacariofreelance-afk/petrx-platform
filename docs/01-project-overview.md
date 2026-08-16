# PetRx Project Overview

## 1. Purpose

PetRx is a multi-tenant Veterinary Clinic Management SaaS and Clinical Decision Support System (CDSS) designed to become the operational foundation of a broader Philippine animal-health, research, agriculture, laboratory, and government collaboration ecosystem.

Phase 1 is deliberately focused on revenue-generating veterinary clinic operations while the platform foundation is designed for later organization types without requiring a fundamental database or identity redesign.

## 2. Phase 1 Scope

PetRx Version 1 exposes only Veterinary Clinic functionality:

- Multi-tenant Veterinary Clinic Management
- Client and companion-animal management
- Appointments and clinical workflows
- Medical records, SOAP notes, prescriptions, vaccinations, laboratory results, and surgery records
- Inventory and supplier management
- Sales, expenses, Accounts Receivable (AR), and Accounts Payable (AP)
- Client Portal
- Clinic website/profile capabilities
- AI Clinical Evidence Search using public and authorized veterinary evidence
- Clinical Cases as a first-class Phase 1 resource
- PWA-first deployment
- Organization-based RBAC and multi-user access

PetRx is **not** intended to replace full accounting software. AR/AP and operational financial records are included because they are part of normal clinic operations; general ledger, chart of accounts, journal entries, trial balance, and full financial reporting are outside Phase 1 scope.

## 3. Final Terminology

The platform uses two terminology layers:

| User-facing term | Domain/database concept | Purpose |
|---|---|---|
| Client | Party | Person or organization interacting with a clinic |
| Pet | Animal | Individual companion or production animal record |
| Farm | Farm Profile linked to a Party | Structured farm information for future animal-husbandry workflows |
| Clinic | Organization of type `clinic` | Phase 1 tenant |
| Staff | User | Authenticated system identity |

The UI may continue to use familiar veterinary terminology such as **Client** and **Pet**, while the underlying model uses **Party** and **Animal** so the platform can expand beyond companion animals.

## 4. Organization-Based Architecture

The tenant boundary is an **Organization**, not a clinic-specific hard-coded architecture.

Supported organization types are defined now for the future ecosystem:

- Clinic
- University
- Research Institute
- Farm / Animal Husbandry Organization
- Government Agency
- Laboratory
- Manufacturer

Only `clinic` organizations are enabled for operational features in Phase 1.

## 5. Party and Animal Model

A Party may represent an individual, farm, company, university, laboratory, government agency, or manufacturer. A Farm Profile is attached to a Party and contains:

- Farm Name
- Farm Owner
- Address
- Contact Number
- Farm Type

Animals are modeled independently from the Party concept. Phase 1 exposes companion animals, while the same animal model can later support production animals and other species.

## 6. RBAC

PetRx uses hybrid RBAC with permission-based access control:

- One user may have multiple roles.
- One user may be assigned to multiple branches.
- One user may belong to multiple departments.
- Effective permissions are the cumulative permissions of the user's assigned roles.
- Tenant, branch, and department scope are enforced independently of the role definition.

This supports real clinic staffing patterns such as a single employee serving as Receptionist + Cashier + Pharmacy Assistant.

## 7. Client Portal

A clinic registers a Client/Party and nominates an email address. PetRx sends a one-time verification invitation. The client verifies the account and creates a password before accessing the Client Portal.

The portal is restricted to records explicitly associated with that client/party and the clinic tenant.

## 8. AI Clinical Evidence Search

PetRx AI is positioned as a **Clinical Evidence Search / Clinical Decision Support System**, not a diagnostic engine.

A veterinarian enters symptoms and relevant clinical findings. The search engine retrieves matching evidence across indexed public or authorized documents and clinical cases, then returns ranked results such as:

| Match % | Condition Found | Source |
|---:|---|---|
| 95% | Canine Parvovirus | Research Paper |
| 91% | Hemorrhagic Gastroenteritis | Clinical Case |
| 82% | Intestinal Parasites | Veterinary Journal |
| 77% | Giardia Infection | Conference Material |

The source/reference column is actionable so the veterinarian can inspect the underlying evidence.

## 9. Future Ecosystem

The long-term roadmap expands the same foundation into:

1. Phase 1 — Veterinary Clinics and companion-animal operations
2. Phase 2 — Universities and research institutes, including digital research and clinical-case collaboration
3. Phase 3 — Farms and animal husbandry
4. Phase 4 — Government agencies and reporting/research bridges
5. Phase 5 — Public/private laboratories and manufacturers for R&D

Expansion is governed by explicit data ownership, consent, anonymization, security, and interoperability rules.

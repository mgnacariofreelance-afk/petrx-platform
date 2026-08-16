# PetRx AI Clinical Evidence Search

## 1. Positioning

PetRx AI is a **Clinical Evidence Search and Clinical Decision Support System (CDSS)**.

It is **not a diagnostic AI** and must not be represented as a system that independently diagnoses an animal, prescribes treatment, or replaces a veterinarian's professional judgment.

## 2. Phase 1 Search Sources

The initial evidence library may contain legally usable public or authorized material, including:

- Public veterinary research papers
- University research publications
- Public clinical case reports
- Veterinary journals
- Treatment and clinical protocols where permitted
- Conference materials
- Educational veterinary videos
- Other authorized veterinary evidence

The system must retain source metadata and the original reference/location so users can inspect the evidence.

## 3. Search Input

The veterinarian may enter:

- Species
- Breed where relevant
- Symptoms
- Clinical findings
- Duration/onset
- Relevant patient context
- Optional keywords

The core search objective is symptom/evidence matching across indexed resources rather than generating an unsupported diagnosis.

## 4. Search Workflow

```text
Veterinarian enters symptoms/findings
            ↓
Normalize/search clinical concepts
            ↓
Search indexed documents and governed clinical cases
            ↓
Rank evidence matches
            ↓
Populate result list
            ↓
Veterinarian opens source/reference
            ↓
Veterinarian evaluates evidence clinically
```

## 5. Result Format

The result table should be actionable:

| Match % | Condition Found | Source |
|---:|---|---|
| 95% | Canine Parvovirus | Research Paper |
| 91% | Hemorrhagic Gastroenteritis | Clinical Case |
| 82% | Intestinal Parasites | Veterinary Journal |
| 77% | Giardia Infection | Conference Material |

The Source column/reference is clickable and opens the permitted source result, document metadata, or internal evidence viewer.

The Match % is a **retrieval/relevance score**, not a probability that the animal has the condition.

## 6. Internal Clinical Cases

Clinical Cases are a Phase 1 resource. A clinic may search its own historical cases for similar symptoms/findings while maintaining tenant isolation.

A Clinical Case can include:

- Case summary
- Symptoms
- Clinical findings
- Assessment/outcome
- Attachments
- References
- Relevant medical record linkage
- Consent/sharing status

Internal cases remain private to the owning organization unless an explicit governed-sharing process is completed.

## 7. Evidence Detail View

Opening a result should expose, where available:

- Title
- Authors
- Publication/source
- Date
- Source type
- Abstract or permitted excerpt
- Relevant matched concepts
- Reference/link or document viewer
- Related clinical cases

Copyright restrictions and source licensing must be respected; PetRx should not reproduce protected documents beyond permitted use.

## 8. AI Safety and Governance

The system must:

- Clearly identify AI-generated ranking or summaries.
- Preserve source attribution.
- Avoid presenting retrieval scores as diagnostic certainty.
- Encourage professional clinical judgment.
- Log sensitive internal-case access.
- Respect tenant and sharing permissions.

## 9. Future Research Network

Phase 2 can introduce governed cross-institution research search. The platform should use explicit consent, anonymization/de-identification, access policies, and auditable sharing rather than allowing direct cross-tenant clinical-record access.

# AI Clinical Evidence Library Tables

## Purpose

The Phase 1 AI Library supports evidence retrieval across public or authorized veterinary documents and governed internal Clinical Cases.

The library is an evidence retrieval system, not a diagnostic database.

## knowledge_sources

- `id` UUID PK
- `source_type`
- `source_name`
- `publisher`
- `country` nullable
- `public_or_authorized` BOOLEAN
- `license_notes` nullable
- `created_at`

Examples include research institutions, veterinary journals, conference collections, and public repositories.

## knowledge_documents

- `id` UUID PK
- `knowledge_source_id` UUID FK
- `title`
- `document_type`
- `authors` nullable
- `publication_date` nullable
- `abstract` nullable
- `source_url` nullable
- `storage_key` nullable
- `mime_type`
- `index_status`
- `created_at`
- `updated_at`

Documents may include PDFs and authorized compressed video resources. Raw media is stored through controlled storage, not exposed directly by the search service.

## knowledge_categories

- `id` UUID PK
- `name`
- `description`

## knowledge_tags

- `id` UUID PK
- `name`

## knowledge_document_tags

- `document_id` FK
- `tag_id` FK
- composite PK

## knowledge_symptoms

- `id` UUID PK
- `symptom_name`
- normalized search terms

## knowledge_conditions

- `id` UUID PK
- `condition_name`
- normalized search terms

## knowledge_document_matches

- `id` UUID PK
- `knowledge_document_id` FK
- `symptom_id` nullable FK
- `condition_id` nullable FK
- relevance metadata
- indexing metadata

The relevance score returned to a veterinarian is a retrieval score, not diagnostic probability.

## Clinical Case Integration

Clinical Cases are Phase 1 resources and should have separate tenant ownership and consent controls. They may reference library documents through `clinical_case_references`.

Internal cases can be searched by the owning clinic without exposing them to other organizations. Future research sharing requires explicit governance and anonymization.

## Source Access Rule

Every result must retain enough metadata to let the user identify the source. The clickable source/reference must enforce the source's permission and licensing rules.

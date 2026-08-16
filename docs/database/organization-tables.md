# Organization Tables

## organization_types
- id UUID PK
- code VARCHAR(50) UNIQUE
- name VARCHAR(100)

## organizations
- id UUID PK
- organization_type_id UUID FK
- name VARCHAR(255)
- code VARCHAR(50) UNIQUE
- status VARCHAR(20)

## branches
- id UUID PK
- organization_id UUID FK
- name VARCHAR(255)
- address TEXT

## departments
- id UUID PK
- organization_id UUID FK
- name VARCHAR(255)

# Party and Animal Domain Model

## 1. Why Party Instead of Client

The Phase 1 UI uses **Client**, but the database uses `parties` because the platform must eventually support people and organizations beyond pet owners.

A Party may represent:

- Individual
- Farm
- Company
- University
- Laboratory
- Government agency
- Manufacturer

The same Party can participate in operational, research, or commercial workflows subject to organization and permission boundaries.

## 2. Party Types

```text
individual
farm
company
university
laboratory
government
manufacturer
```

## 3. Phase 1 Client Mapping

```text
Clinic
  └── Party (individual)
       └── Animal(s)
```

The clinic user sees:

```text
Client
 ├── Pet 1
 ├── Pet 2
 └── Pet 3
```

The database stores:

```text
Party
 ├── Animal 1
 ├── Animal 2
 └── Animal 3
```

## 4. Farm Model

A Farm is not merely a renamed Client. It has a dedicated Farm Profile linked to a Party.

Required farm information:

- Farm Name
- Farm Owner
- Address
- Contact Number
- Farm Type

Optional future fields:

- Farm size
- Farm size unit
- Geographic coordinates/boundary
- Production capacity
- Production system
- Biosecurity information

## 5. Animal Model

`animals` is the stable patient/animal entity across phases.

Phase 1 examples:

- Dog
- Cat
- Rabbit
- Bird
- Other supported companion animals

Phase 3 can extend the same entity for:

- Swine
- Cattle
- Carabao
- Goat
- Sheep
- Poultry
- Other production animals

## 6. Ownership / Association

An Animal is associated with a Party through `party_id` in Phase 1. Future versions may introduce richer ownership, custody, herd/flock, or facility relationships without changing the core identity model.

## 7. Tenant Rule

Party and Animal records are organization-owned. A Party with the same name in two clinics does not create a cross-tenant identity by default. Cross-organization matching or collaboration requires an explicit governed process.

## 8. UI Rule

Do not expose technical terms such as Party or Animal to Phase 1 users unless useful. The clinic UI should remain familiar:

- Clients
- Pets
- Farm Profiles only when the relevant future module is enabled

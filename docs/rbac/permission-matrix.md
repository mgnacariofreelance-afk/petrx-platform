# PetRx Permission Matrix

## Permission Format
resource.action

Examples:
- patient.view
- patient.create
- appointment.create
- inventory.edit
- research.search

| Permission | Owner | Admin | Vet | Assistant | Receptionist | Cashier | Pharmacy |
|------------|-------|-------|-----|-----------|--------------|----------|----------|
| patient.view | Y | Y | Y | Y | Y | N | N |
| patient.create | Y | Y | Y | Y | Y | N | N |
| appointment.create | Y | Y | Y | Y | Y | N | N |
| sales.create | Y | Y | N | N | N | Y | N |
| prescription.view | Y | Y | Y | Y | N | N | Y |
| medication.dispense | Y | Y | Y | Y | N | N | Y |
| research.search | Y | Y | Y | Y | N | N | N |

Permissions are cumulative across all assigned roles.
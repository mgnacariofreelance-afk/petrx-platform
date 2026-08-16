# Prisma Validation Gate

The repository requires Prisma schema validation before database migration work proceeds.

Validation command:

```bash
npx prisma validate --schema=prisma/schema.prisma
```

Do not treat the schema as migration-ready until this command passes against the current repository state.

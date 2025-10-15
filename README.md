# Ecom Starter Local — No Docker

A local-dev scaffold for an e-commerce app:
- Frontend: Next.js + Apollo Client + TailwindCSS
- Backend: NestJS + Apollo GraphQL + TypeORM (Postgres)
- Auth: GraphQL JWT auth with NestJS GqlAuthGuard (Authorization: Bearer <token>)
- Seed script to populate sample users/products
- Swagger UI available at /api/docs (for REST endpoints if added)

## Quick start (Local PostgreSQL)
1. Install PostgreSQL locally and create a database (example `ecom_dev`).
2. Backend:
   ```bash
   cd apps/backend
   npm install
   cp .env.example .env
   # edit .env if needed
   npm run seed      # creates schema & seed data
   npm run start:dev
   ```
   Backend GraphQL: http://localhost:4000/graphql  
   Swagger UI: http://localhost:4000/api/docs

3. Frontend:
   ```bash
   cd apps/frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
   Frontend: http://localhost:3000

## Notes
- Replace JWT_SECRET and DB credentials in `.env`.
- TypeORM `synchronize: true` used for convenience. Use migrations for production.

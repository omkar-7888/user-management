# User Management App

A simple full-stack User Management CRUD application.

The project contains only the application layer.

## Architecture

```text
React
  |
  | HTTP REST API
  v
Node.js + Express
  |
  | Prisma ORM
  v
PostgreSQL

3. Runtime Versions

Frontend:

- Node.js 24 LTS
- npm 11.x

Backend:

- Node.js 24 LTS
- npm 11.x

Database:

- PostgreSQL 17.x

- user_management
---

# 4. Application Ports

| Component | Port |
|-----------|------|
| React Frontend | 5173 |
| Node.js Backend | 5000 |
| PostgreSQL | 5432 |

Local URLs:

Frontend:

http://localhost:5173

Backend:

http://localhost:5000

Backend API:

http://localhost:5000/api


---

# 5. Health Endpoint

Health Check:

GET /api/health

Full URL:

http://localhost:5000/api/health

Expected response:

{
 "success": true,
 "status": "ok"
}

This endpoint can be used for:

- Docker health checks
- Kubernetes readiness probe
- Kubernetes liveness probe
- Load balancer health checks
- Application monitoring


---

# 6. API Endpoints

## Get All Users

GET /api/users

7. Database Environment Variable

Backend requires:

DATABASE_URL

Example local format:

DATABASE_URL=postgresql://postgres:<PASSWORD>@localhost:5433/user_management?schema=public


8.Database Migration

Database uses Prisma ORM.

-Prisma schema:

backend/prisma/schema.prisma


-Development migration:

npx prisma migrate dev


-Generate Prisma client:

npx prisma generate

Production deployment must use the appropriate Prisma production migration command.

Do not run development migrations against production databases.
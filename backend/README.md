# College Discovery Platform Backend

NestJS + TypeScript + PostgreSQL + Prisma backend for a college discovery platform similar to Careers360 or Collegedunia.

## Features

- JWT authentication with signup and login
- Password hashing using bcrypt
- College listing, search, filters, pagination, and details
- College comparison by fees, rating, placements, and location
- Authenticated saved-colleges workflow
- Prisma PostgreSQL schema with relations and indexes
- DTO validation using `class-validator`
- Global validation pipe and exception response format
- Swagger API documentation
- Seed script with sample colleges
- Railway-ready deployment setup

## Folder Structure

```text
src/
  auth/
    dto/
    interfaces/
    auth.controller.ts
    auth.module.ts
    auth.service.ts
    jwt.strategy.ts
  colleges/
    dto/
    colleges.controller.ts
    colleges.module.ts
    colleges.service.ts
  compare/
    dto/
    compare.controller.ts
    compare.module.ts
    compare.service.ts
  saved/
    dto/
    saved.controller.ts
    saved.module.ts
    saved.service.ts
  prisma/
    prisma.module.ts
    prisma.service.ts
  common/
    decorators/
    filters/
    utils/
  guards/
  app.module.ts
  main.ts
prisma/
  schema.prisma
  seed.ts
```

## Architecture Decisions

- Each feature has its own module, controller, service, and DTOs.
- Controllers only handle HTTP routing and validation binding.
- Services contain business logic and database access.
- PrismaService is global so modules can reuse one database client cleanly.
- `SavedCollege` uses a unique `(userId, collegeId)` constraint to prevent duplicate saves.
- Filters and pagination are reusable utilities under `src/common`.

## Environment Variables

Copy `.env.example` to `.env`.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/college_discovery?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1d"
PORT=3000
```

## Local Setup

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

API base URL:

```text
http://localhost:3000/api
```

Swagger docs:

```text
http://localhost:3000/api/docs
```

## API Examples

### Auth

```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Manjeet Singh",
  "email": "manjeet@example.com",
  "password": "StrongPass123"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "manjeet@example.com",
  "password": "StrongPass123"
}
```

### Colleges

```http
GET /api/colleges?page=1&limit=10
GET /api/colleges?location=Delhi
GET /api/colleges?minFees=100000
GET /api/colleges?rating=4
GET /api/colleges?search=engineering
GET /api/colleges/1
```

### Compare

```http
GET /api/compare?id=1&id=2
```

### Saved Colleges

Use the JWT from signup/login.

```http
POST /api/saved
Authorization: Bearer <token>
Content-Type: application/json

{
  "collegeId": 1
}
```

```http
GET /api/saved
Authorization: Bearer <token>
```

```http
DELETE /api/saved/1
Authorization: Bearer <token>
```

## Response Shape

Validation and runtime errors use a consistent format:

```json
{
  "success": false,
  "statusCode": 400,
  "path": "/api/colleges",
  "timestamp": "2026-05-26T10:00:00.000Z",
  "error": "Validation error details"
}
```

Paginated college responses include:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

## Railway Deployment

1. Push the project to GitHub.
2. Create a new Railway project from the GitHub repository.
3. Add a PostgreSQL database in Railway.
4. Set environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `PORT`
5. Set the build command:

```bash
npm install && npx prisma generate && npm run build
```

6. Set the start command:

```bash
npx prisma migrate deploy && npm run start:prod
```

7. After deployment, seed sample colleges once from Railway shell:

```bash
npm run prisma:seed
```

## Main API Routes

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/colleges` | No | List/search/filter colleges |
| GET | `/api/colleges/:id` | No | College details |
| GET | `/api/compare?id=1&id=2` | No | Compare two colleges |
| POST | `/api/saved` | Yes | Save a college |
| GET | `/api/saved` | Yes | Get saved colleges |
| DELETE | `/api/saved/:collegeId` | Yes | Remove saved college |

## Interview Notes

- The project avoids hardcoded API data; colleges are read from PostgreSQL through Prisma.
- JWT payload stores only the user id and email.
- Passwords are never returned from API responses.
- Prisma indexes support common search and filtering fields.
- The global validation pipe strips unknown fields and transforms query strings into typed DTO values.

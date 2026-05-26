# College Comparison Platform

A full-stack college comparison project built to demonstrate backend API integration with a clean frontend.

The backend is a NestJS API with Prisma, PostgreSQL, and JWT authentication. The frontend is a lightweight Next.js App Router application using Tailwind CSS, Axios, and TypeScript.

## Project Structure

```text
.
+-- backend/
|   +-- src/
|   +-- prisma/
|   +-- package.json
|   +-- .env
+-- frontend/
    +-- src/
    +-- package.json
    +-- .env
```

## Tech Stack

**Backend**
- NestJS
- Prisma
- PostgreSQL
- JWT authentication
- Swagger decorators

**Frontend**
- Next.js App Router
- TypeScript
- Tailwind CSS
- Axios
- LocalStorage JWT handling

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create or update `backend/.env`:

```env
DATABASE_URL="your-postgresql-url"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1d"
PORT=3000
```

Run Prisma migrations:

```bash
npm run prisma:migrate
```

Seed sample colleges:

```bash
npm run prisma:seed
```

Start the backend:

```bash
npm run start:dev
```

Backend runs at:

```text
http://localhost:3000/api
```

## Frontend Setup

Open a second terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create or update `frontend/.env`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Frontend Pages

- `/login` - Login with email and password
- `/signup` - Create an account
- `/colleges` - View college cards
- `/colleges/[id]` - View college details
- `/compare?id1=1&id2=2` - Compare two colleges
- `/saved` - Protected saved colleges page

## API Endpoints Used

Authentication:

```text
POST /api/auth/signup
POST /api/auth/login
```

Colleges:

```text
GET /api/colleges
GET /api/colleges/:id
```

Compare:

```text
GET /api/compare?id=1&id=2
```

Saved colleges:

```text
POST /api/saved
GET /api/saved
DELETE /api/saved/:collegeId
```

## Auth Flow

1. User logs in or signs up from the frontend.
2. Backend returns an `accessToken`.
3. Frontend stores the JWT in `localStorage`.
4. Axios automatically attaches the token as:

```text
Authorization: Bearer <token>
```

5. Protected pages redirect to `/login` if no token exists.

## Dummy College Fallback

The frontend includes sample college data so the UI can still be tested if the backend database has not been seeded yet.

Use:

```text
http://localhost:5173/compare?id1=1&id2=2
```

The frontend translates this into the backend format:

```text
/api/compare?id=1&id=2
```

## Useful Commands

Backend:

```bash
cd backend
npm run start:dev
npm run build
npm run prisma:seed
```

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run lint
```

## Notes

- Keep backend and frontend running in separate terminals.
- If the colleges page is empty, run `npm run prisma:seed` from the backend folder.
- If `next build` fails because `.next` is locked on Windows, stop the frontend dev server and rerun the build.

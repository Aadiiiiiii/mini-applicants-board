# Mini Applicants Board

Full-stack Mini Applicants Board assignment. The application allows a recruiter to add applicants, view a paginated and filterable list, update applicant status, and soft-delete applicants.

## Live URLs

Frontend URL:   http://localhost:3000/applicants
Backend Health URL:  http://localhost:5000/api/v1

Example:

```txt
Frontend: https://your-frontend-url.vercel.app
Backend Health: https://your-backend-url.onrender.com/api/v1/health
```

## Tech Stack

### Frontend

- Next.js 15
- TypeScript
- App Router
- Tailwind CSS
- TanStack Query
- Zustand
- Axios

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

### Database

- PostgreSQL using Neon

## Features

- Add a new applicant
- View applicants in a table
- Filter applicants by status
- Paginated applicant list
- Inline applicant status update
- Soft-delete applicant
- Loading, empty, and error states
- Backend health-check endpoint
- Seed data with sample applicants

## Structure

mini-applicants-board/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── applicants/
│   │   │   ├── dto/
│   │   │   │   ├── create-applicant.dto.ts
│   │   │   │   └── update-applicant-status.dto.ts
│   │   │   ├── applicants.controller.ts
│   │   │   ├── applicants.module.ts
│   │   │   └── applicants.service.ts
│   │   │
│   │   ├── health/
│   │   │   ├── health.controller.ts
│   │   │   └── health.module.ts
│   │   │
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── applicants/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   │
│   ├── components/
│   │   └── applicants/
│   │       └── AddApplicantModal.tsx
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   └── types.ts
│   │
│   ├── store/
│   │   └── applicants-store.ts
│   │
│   ├── .env.example
│   └── package.json
│
├── README.md


## Backend Setup

Go to the backend folder:

'''bash
cd backend

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

Run Prisma migration:

```bash
npx prisma migrate dev --name init
```

Generate Prisma client:

```bash
npx prisma generate
```
Run seed data:

```bash
npm run seed
```

Start backend:

```bash
npm run start:dev
```

Backend runs on:

```txt
http://localhost:5000/api/v1
```

Health check:

```txt
http://localhost:5000/api/v1/health
```

## Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file inside the `frontend` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

If port 3000 is busy, Next.js may run on:

```txt
http://localhost:3001
```

Open the applicants page:

```txt
http://localhost:3000/applicants
```

## API Endpoints

Base path:

```txt
/api/v1
```

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/applicants` | Create applicant |
| GET | `/applicants` | List applicants |
| PATCH | `/applicants/:id` | Update applicant status |
| DELETE | `/applicants/:id` | Soft delete applicant |

## Applicant Model

```ts
{
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  status: 'applied' | 'shortlisted' | 'rejected';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## List Response Shape

```json
{
  "data": [],
  "page": 1,
  "limit": 10,
  "total": 0
}
```

## Example Requests

### Create Applicant

```bash
POST /api/v1/applicants
```

Body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "jobTitle": "Frontend Developer",
  "status": "applied"
}
```

### List Applicants

```bash
GET /api/v1/applicants?page=1&limit=10
```

### Filter Applicants

```bash
GET /api/v1/applicants?status=shortlisted&page=1&limit=10
```

### Update Status

```bash
PATCH /api/v1/applicants/:id
```

Body:

```json
{
  "status": "shortlisted"
}
```

### Soft Delete

```bash
DELETE /api/v1/applicants/:id
```

This does not remove the applicant from the database. It only sets:

```ts
isDeleted: true
```

## Architecture Decisions

I used a monorepo structure with separate `backend` and `frontend` folders. This keeps the project easy to review while still separating frontend and backend code clearly.

On the backend, I used NestJS modules, controllers, and services to keep the code organized. The controller handles API requests, the service handles business logic, and Prisma handles database access.

On the frontend, I used TanStack Query for server state such as applicants data, create applicant, update status, and delete applicant. I used Zustand only for client-side UI state such as the selected filter, current page, and modal open state. This avoids duplicating server data in the client store.

Implemented Soft delete using an `isDeleted` field. This keeps the applicant record in the database while hiding it from the default applicants list.

## Seed Data

The backend includes a seed script that inserts sample applicants into the database.

Run:

```bash
npm run seed
```

This inserts sample applicants so the application is not empty when opened.


Example note:

```txt
The trickiest part was connecting the frontend state and backend API cleanly without duplicating server data. I solved this by using TanStack Query for all API data and mutations, while using Zustand only for UI state such as filters, pagination, and modal visibility. I also implemented soft delete through the isDeleted field so deleted applicants remain in the database but are hidden from the default list.
```


ScreenShots:
Inside the folder as ScreenShots.

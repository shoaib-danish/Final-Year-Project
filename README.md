# Campus Placement and Recruitment Management System

A full-stack platform for campus placement and recruitment management.

## Tech Stack

- **Frontend**: Next.js App Router, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: Supabase PostgreSQL (via `pg` connection pool)
- **Architecture**: Monorepo with independent `frontend`, `backend`, and `database` directories.

## Project Structure

```text
Full-Stack-Journey/
├── .gitignore
├── .env.example
├── README.md
├── backend/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts
│       ├── index.ts
│       ├── config/
│       │   ├── db.ts
│       │   └── env.ts
│       └── routes/
│           └── health.ts
├── frontend/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.mjs
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── src/
│       └── app/
│           ├── globals.css
│           ├── layout.tsx
│           └── page.tsx
└── database/
    ├── README.md
    ├── migrations/
    │   └── 001_initial_schema.sql
    └── seeds/
        └── 001_seed_data.sql
```

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.
Health Check endpoint: `http://localhost:5000/api/health`.

### 2. Frontend Setup

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

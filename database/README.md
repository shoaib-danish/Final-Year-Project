# Database Setup & Migrations

This folder organizes database schemas, SQL migrations, and seed scripts for the **Campus Placement and Recruitment Management System**.

## Stack
- **Database**: Supabase PostgreSQL
- **Backend Driver**: `pg` (node-postgres connection pool)

## Folder Structure
- `migrations/`: Numbered, immutable SQL migration files (e.g., `001_initial_schema.sql`, `002_create_users_table.sql`).
- `seeds/`: Repeatable seed data scripts for local development and initial testing (e.g., `001_seed_data.sql`).

## Guidelines
1. All schema modifications should be authored as sequential SQL files in `migrations/`.
2. Do not modify existing migrations once applied in shared or production environments; author a new migration file instead.
3. Keep test fixtures and sample data isolated in `seeds/`.


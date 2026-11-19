CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'recruiter', 'admin')),
    approval_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (
        approval_status IN ('pending', 'approved', 'rejected')
    ),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- UPDATE PASSOWRD
CREATE EXTENSION IF NOT EXISTS pgcrypto;
UPDATE public.users
SET password_hash = crypt('Jane@123', gen_salt('bf'))
WHERE email = 'jane20@gmail.com'
    AND role = 'recruiter';
-- RCERUITER PROFILE
CREATE TABLE IF NOT EXISTS public.recruiter_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    company_name VARCHAR(150) NOT NULL,
    designation VARCHAR(100),
    website VARCHAR(255),
    contact_number VARCHAR(20),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
# Firebase to Supabase Migration Guide

This document outlines the steps taken to migrate GT4 from Firebase to Supabase.

## Migration Steps

### 1. Set Up Supabase Project

1. Created a Supabase project at [supabase.com](https://supabase.com)
2. Obtained project URL and anon key from Settings > API
3. Added these credentials to `.env` file

### 2. Created Supabase Client

1. Installed Supabase client library: `npm install @supabase/supabase-js`
2. Created `src/supabase.ts` to initialize the Supabase client
3. Configured the client to use environment variables

### 3. Database Schema Setup

1. Created SQL script in `supabase/setup.sql` to set up the database schema
2. Created the following tables:
   - `profiles`: User profiles with display names and creator status
   - `system_settings`: System-wide settings, including creator account information
   - `artworks`: Artwork metadata
   - `collaborators`: Tracks collaborators on artworks
3. Set up Row Level Security (RLS) policies
4. Created triggers and functions for data integrity

### 4. Authentication Implementation

1. Created `SupabaseAuthContext.tsx` to handle authentication
2. Implemented sign up, sign in, and sign out functionality
3. Created user profiles in Supabase on registration
4. Added session management

### 5. Creator Account Management

1. Created `supabaseInitCreatorAccount.ts` utility
2. Implemented creator account initialization
3. Added functions to check if creator account exists
4. Created utility to fix creator account issues

### 6. UI Components

1. Created `SupabaseInitCreator.tsx` page for initializing creator account
2. Created `SupabaseConnectionTest.tsx` page for testing Supabase connection
3. Added routes to `App.tsx`
4. Added links to footer

### 7. Documentation

1. Updated README with Supabase setup instructions
2. Created detailed Supabase setup guide in `supabase/README.md`
3. Created `.env.example` template
4. Created this migration guide

## Key Differences Between Firebase and Supabase

### Authentication

- Firebase: Uses `getAuth()`, `createUserWithEmailAndPassword()`, etc.
- Supabase: Uses `supabase.auth.signUp()`, `supabase.auth.signInWithPassword()`, etc.

### Database

- Firebase: Uses Firestore with document-based NoSQL structure
- Supabase: Uses PostgreSQL with relational database structure

### Security Rules

- Firebase: Uses Firestore security rules
- Supabase: Uses PostgreSQL Row Level Security (RLS) policies

### Storage

- Firebase: Uses Firebase Storage
- Supabase: Uses Storage buckets (not implemented in this migration)

## Next Steps

1. Test all functionality with Supabase
2. Migrate existing data from Firebase to Supabase (if needed)
3. Update storage functionality to use Supabase Storage
4. Remove Firebase dependencies once migration is complete

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
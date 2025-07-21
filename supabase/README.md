# Supabase Setup for GT4

This guide will help you set up Supabase for the GT4 application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project

## Setup Steps

### 1. Create a new Supabase project

1. Log in to your Supabase account
2. Click "New Project"
3. Enter a name for your project
4. Choose a database password
5. Select a region close to your users
6. Click "Create new project"

### 2. Get your Supabase credentials

1. In your Supabase project dashboard, go to Settings > API
2. Copy the "Project URL" and "anon public" key
3. Update these values in `src/supabase.ts`

### 3. Set up the database schema

1. In your Supabase project dashboard, go to SQL Editor
2. Create a new query
3. Copy and paste the contents of `supabase/setup.sql`
4. Run the query

### 4. Enable Email Auth

1. In your Supabase project dashboard, go to Authentication > Providers
2. Make sure Email provider is enabled
3. Configure the settings as needed (e.g., enable "Confirm email")

### 5. Initialize the Creator Account

1. In your GT4 application, navigate to `/supabase-test` to test your connection
2. If all tests pass, navigate to `/supabase-init-creator`
3. Create the Prime creator account

## Database Schema

The Supabase setup creates the following tables:

- `profiles`: User profiles with display names and creator status
- `system_settings`: System-wide settings, including creator account information
- `artworks`: Artwork metadata
- `collaborators`: Tracks collaborators on artworks

## Row Level Security (RLS)

The setup includes Row Level Security policies to ensure data is properly protected:

- Profiles are viewable by everyone, but users can only update their own profiles
- System settings are viewable by everyone, but only creators can modify them
- Artworks are viewable by everyone, but only creators and owners can modify them
- Collaborators are viewable by everyone, but only artwork owners and creators can manage them

## Triggers and Functions

The setup includes several triggers and functions:

- Automatically create a profile when a new user signs up
- Update artwork and collaboration counts when artworks or collaborators are added/removed

## Troubleshooting

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Supabase credentials in `src/supabase.ts`
3. Make sure all tables were created successfully
4. Check that Row Level Security is properly configured
5. Use the `/supabase-test` page to diagnose connection issues
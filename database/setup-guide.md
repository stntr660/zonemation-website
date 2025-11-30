# Supabase Database Setup Guide

This guide will help you set up the Supabase database for the Zonemation CMS system.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization
4. Give your project a name (e.g., "zonemation-cms")
5. Set a database password (save this securely)
6. Choose a region closest to your users
7. Click "Create new project"

## 2. Configure Environment Variables

After your project is created:

1. Go to Settings → API in your Supabase dashboard
2. Copy the Project URL and Anon key
3. Update `.env.local` with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_DB_URL=postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres
```

## 3. Apply Database Schema

1. Go to SQL Editor in your Supabase dashboard
2. Copy the contents of `database/schema.sql`
3. Paste and execute the schema
4. Copy the contents of `database/seed-data.sql`
5. Paste and execute the seed data

## 4. Verify Setup

After applying the schema and seed data, you should see these tables:
- industries
- capabilities
- content
- authors
- tags
- case_study_details
- admin_users
- site_settings
- Various relationship tables

## 5. Test Connection

Run the development server to test the connection:

```bash
npm run dev
```

The application should start without errors. Check the browser console for any Supabase connection issues.

## BCG Capabilities Structure

The seed data includes BCG's complete capability framework:

### Main Categories (10):
1. Strategy & Purpose
2. Artificial Intelligence
3. Digital Transformation
4. Operations Excellence
5. Marketing & Sales
6. People & Organization
7. Technology & Data
8. Sustainability & ESG
9. Mergers & Acquisitions
10. Risk & Compliance

### Sub-capabilities (30+):
Each main category has 4-5 specialized sub-capabilities covering the full spectrum of BCG's consulting services.

### Industries (40+):
Comprehensive industry taxonomy including main sectors and sub-industries.

## Next Steps

1. Complete the environment setup
2. Build the admin panel for content management
3. Create dynamic API routes
4. Update existing components to use dynamic data
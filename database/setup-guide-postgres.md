# PostgreSQL Database Setup Guide

This guide will help you set up a local PostgreSQL database for the Zonemation CMS system.

## 1. Install PostgreSQL

### macOS (using Homebrew):
```bash
brew install postgresql
brew services start postgresql
```

### Create Database:
```bash
createdb zonemation_cms
```

### Set Password (optional):
```bash
psql postgres
\password postgres
\q
```

## 2. Configure Environment

Update `.env.local` with your database credentials:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/zonemation_cms
```

## 3. Setup Database Schema

Run the setup script:
```bash
node scripts/setup-db.js
```

This will create all necessary tables:
- capabilities
- industries  
- content
- content_capabilities (relationship)
- content_industries (relationship)

## 4. Verify Setup

Connect to your database:
```bash
psql zonemation_cms
\dt
```

You should see all the tables listed.

## 5. Test the Application

Start the development server:
```bash
npm run dev
```

The API endpoints should now work with PostgreSQL:
- `/api/capabilities`
- `/api/industries`
- `/api/content`

## Next Steps

Once the database is working:
1. Copy BCG capabilities from their website
2. Populate the capabilities table
3. Build simple admin interface
4. Connect frontend to dynamic data
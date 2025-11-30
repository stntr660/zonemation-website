# PostgreSQL Database Setup

This project uses PostgreSQL with all BCG capabilities copied from their official website.

## Quick Setup

### 1. Install PostgreSQL (macOS)
```bash
brew install postgresql
brew services start postgresql
createdb zonemation_cms
```

### 2. Configure Database
```bash
# Set your database URL in .env.local
echo "DATABASE_URL=postgresql://postgres:password@localhost:5432/zonemation_cms" > .env.local
```

### 3. Setup Everything
```bash
npm run db:reset
```

This single command will:
- Create all database tables
- Populate 20 main BCG capabilities with 60+ sub-capabilities  
- Add 8 industry categories with 32 sub-industries

## Available Scripts

```bash
npm run setup-db              # Create tables only
npm run populate-capabilities # Add BCG capabilities
npm run populate-industries   # Add sample industries
npm run db:reset              # Do everything above
```

## BCG Capabilities Included

✅ **20 Main Categories:**
- Artificial Intelligence (AI Agents, Generative AI, Responsible AI)
- Business Transformation
- Climate Change & Sustainability  
- Corporate Finance & Strategy
- Digital, Technology & Data
- Marketing & Sales
- Operations
- People Strategy
- Risk Management & Compliance
- And 11 more...

✅ **60+ Sub-capabilities** covering BCG's complete consulting services

## Verify Setup

```bash
# Check if database is working
psql zonemation_cms -c "\dt"

# Test API endpoints
curl http://localhost:3000/api/capabilities
curl http://localhost:3000/api/industries
```

## Next Steps

1. Start development server: `npm run dev`
2. Visit admin panel: `http://localhost:3000/admin`
3. Test API endpoints to see BCG capabilities
4. Begin building content management features

The database now contains BCG's real capability structure ready for dynamic content management!
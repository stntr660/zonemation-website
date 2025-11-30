const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function setupDatabase() {
  try {
    console.log('Setting up database...')
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, '..', 'database', 'simple-schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    await pool.query(schema)
    console.log('✅ Database schema created successfully')
    
    // Check if tables exist
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `)
    
    console.log('📋 Created tables:', result.rows.map(row => row.table_name).join(', '))
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message)
  } finally {
    await pool.end()
  }
}

setupDatabase()
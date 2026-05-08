// Idempotent SQL migration runner.
// Reads .sql files from ./migrations in alphabetical order and applies any
// that have not yet been recorded in the schema_migrations table.
// Designed to run on every container start; safe to invoke repeatedly.

const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations')

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log('[migrate] DATABASE_URL not set, skipping')
    return
  }

  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.log('[migrate] no migrations directory, skipping')
    return
  }

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  if (files.length === 0) {
    console.log('[migrate] no migration files found')
    return
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()

  try {
    await client.query(
      'CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())',
    )

    for (const file of files) {
      const { rows } = await client.query(
        'SELECT 1 FROM schema_migrations WHERE name = $1',
        [file],
      )
      if (rows.length > 0) {
        console.log(`[migrate] skip ${file} (already applied)`)
        continue
      }

      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8')
      console.log(`[migrate] apply ${file}`)

      await client.query('BEGIN')
      try {
        await client.query(sql)
        await client.query(
          'INSERT INTO schema_migrations (name) VALUES ($1)',
          [file],
        )
        await client.query('COMMIT')
        console.log(`[migrate] done ${file}`)
      } catch (err) {
        await client.query('ROLLBACK')
        throw new Error(`Migration ${file} failed: ${err.message}`)
      }
    }
  } finally {
    await client.end()
  }
}

main().catch((err) => {
  console.error('[migrate] FAILED:', err.message)
  process.exit(1)
})

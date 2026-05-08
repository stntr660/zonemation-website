#!/bin/sh
set -e

export NODE_OPTIONS='--require ./polyfill.cjs'

# Apply pending SQL migrations before booting the app.
# Idempotent: skips migrations already recorded in schema_migrations.
node scripts/migrate.js

exec node_modules/.bin/next start

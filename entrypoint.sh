#!/bin/sh
# Patch @payloadcms/db-postgres to allow schema push in production.
# Payload blocks push:true when NODE_ENV=production, but in a Docker
# deployment the build stage can't reach the database, so push never
# runs. This one-liner removes the NODE_ENV guard so the schema gets
# created on first request.

CONNECT_FILE="node_modules/@payloadcms/db-postgres/dist/connect.js"

if [ -f "$CONNECT_FILE" ]; then
  sed -i "s/process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_MIGRATING !== 'true' && this.push !== false/process.env.PAYLOAD_MIGRATING !== 'true' \&\& this.push !== false/" "$CONNECT_FILE"
  echo "[entrypoint] Patched connect.js to allow schema push in production"
fi

export NODE_OPTIONS='--require ./polyfill.cjs'
exec node_modules/.bin/next start

#!/bin/sh
set -e

# aplicar migraciones en prod
npx prisma migrate deploy

# arranca Next
node server.js

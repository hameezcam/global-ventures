#!/usr/bin/env bash
# Builds the app, starts it against a DISPOSABLE local Postgres, and runs the
# HTTP integration tests. The tests TRUNCATE the enquiry tables, so this script
# refuses to run against anything that is not on localhost.
set -euo pipefail
: "${DATABASE_URL:?Set DATABASE_URL to a disposable local test database}"
host=$(node -e 'console.log(new URL(process.env.DATABASE_URL).hostname)')
if [[ "$host" != "127.0.0.1" && "$host" != "localhost" ]]; then
  echo "Refusing to run destructive integration tests against non-local host." >&2
  exit 1
fi

PORT=${PORT:-3100}
BROKEN_PORT=${BROKEN_PORT:-3101}
node scripts/migrate.mjs
[[ "${SKIP_BUILD:-0}" == "1" ]] || npx next build >/dev/null

for port in "$PORT" "$BROKEN_PORT"; do
  if curl -s -o /dev/null "http://127.0.0.1:$port/"; then echo "Port $port is already in use; stop that server first." >&2; exit 1; fi
done
exec_next() { node node_modules/next/dist/bin/next start "$@"; }
exec_next -p "$PORT" >/tmp/gv-next.log 2>&1 &
P1=$!
DATABASE_URL="postgres://nobody@127.0.0.1:1/none" DATABASE_URL_POOLED="" exec_next -p "$BROKEN_PORT" >/tmp/gv-next-broken.log 2>&1 &
P2=$!
trap 'pkill -P $P1 2>/dev/null; pkill -P $P2 2>/dev/null; kill $P1 $P2 2>/dev/null; true' EXIT
for port in "$PORT" "$BROKEN_PORT"; do
  for _ in $(seq 1 60); do curl -sf "http://127.0.0.1:$port/" >/dev/null && break; sleep 0.5; done
done

BASE_URL="http://127.0.0.1:$PORT" BROKEN_DB_BASE_URL="http://127.0.0.1:$BROKEN_PORT" \
  node --test --test-concurrency=1 tests/integration/*.test.mjs

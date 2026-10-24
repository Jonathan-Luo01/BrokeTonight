#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$DIR")"

echo "=== BrokeTonight Cloudflare Worker Deployment ==="

# 1. Check if authenticated
if ! npx wrangler whoami > /dev/null 2>&1; then
  echo "⚠️ Cloudflare login required. Please authorize Wrangler in your open browser window."
  exit 1
fi

echo "✅ Cloudflare account authenticated."

# 2. Deploy Worker first to create/update the Worker instance
echo "🚀 Deploying Worker to Cloudflare..."
DEPLOY_OUTPUT=$(npx wrangler deploy)
echo "$DEPLOY_OUTPUT"

# 3. Extract GEMINI_API_KEY from server/.env if available and configure secret
if [ -f "$ROOT_DIR/server/.env" ]; then
  GEMINI_KEY=$(grep -E "^GEMINI_API_KEY=" "$ROOT_DIR/server/.env" | cut -d '=' -f2- | tr -d ' "' || true)
  if [ -n "$GEMINI_KEY" ]; then
    echo "🔑 Storing GEMINI_API_KEY secret in Cloudflare..."
    echo "$GEMINI_KEY" | npx wrangler secret put GEMINI_API_KEY
    echo "✅ Secret GEMINI_API_KEY securely configured in Cloudflare."
  fi
fi

# Extract deployed URL
WORKER_URL=$(echo "$DEPLOY_OUTPUT" | grep -oE "https://[a-zA-Z0-9.-]+\.workers\.dev" | head -n 1 || true)

if [ -n "$WORKER_URL" ]; then
  echo ""
  echo "🎉 Worker deployed successfully at: $WORKER_URL"
  echo "Linking frontend to Worker URL..."
  echo "VITE_API_URL=$WORKER_URL" > "$ROOT_DIR/client/.env.production"
  echo "✅ Updated client/.env.production with VITE_API_URL=$WORKER_URL"

  echo "Building production frontend bundle..."
  cd "$ROOT_DIR"
  npm run build
  echo "✅ Built and synced frontend with Worker API!"
  echo ""
  echo "Your Cloudflare Worker backend is live: $WORKER_URL"
else
  echo "⚠️ Could not parse Worker URL. Please check wrangler deploy output above."
fi

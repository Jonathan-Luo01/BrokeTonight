# BrokeTonight Cloudflare Worker Backend

Serverless AI scout backend running on **Cloudflare Workers**. Connects to **Google Gemini** (`gemini-flash-lite`) and **Parallel Search MCP** with CORS enabled for GitHub Pages.

---

## 1. Prerequisites

- A free [Cloudflare Account](https://dash.cloudflare.com/)
- Node.js 18+

---

## 2. Deploy to Cloudflare Workers

From the root of `BrokeTonight`:

```bash
cd worker
npm install
```

### Step 1: Set Secret Key Securely in Cloudflare
Store your Gemini API key in Cloudflare's encrypted secrets store (never committed or exposed):

```bash
npx wrangler secret put GEMINI_API_KEY
```
*(Paste your Gemini API key when prompted).*

*(Optional) If you have a Parallel Search MCP API key:*
```bash
npx wrangler secret put PARALLEL_API_KEY
```

### Step 2: Deploy Worker

```bash
npx wrangler deploy
```

Wrangler will output your live worker URL:
```
https://broketonight-api.<your-subdomain>.workers.dev
```

---

## 3. Connect Frontend to the Worker

Once deployed, set `VITE_API_URL` to your Worker URL in `client/.env.production`:

```env
VITE_API_URL=https://broketonight-api.<your-subdomain>.workers.dev
```

Rebuild the client for GitHub Pages:
```bash
npm run build
```

Your GitHub Pages deployment at `https://jonathan-luo01.github.io/BrokeTonight/` will now automatically connect to your live Cloudflare Worker!

---

## 4. Test Locally

You can test the worker locally anytime:

```bash
cd worker
source ../server/.env
npx wrangler dev --port 8787 --var "GEMINI_API_KEY:${GEMINI_API_KEY}"
```

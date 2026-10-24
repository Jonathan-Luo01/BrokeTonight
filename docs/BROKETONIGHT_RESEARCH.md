# BrokeTonight — Research Document
_Research completed: 2026-10-24 | Lead agent synthesis_

---

## 1. Repository Findings

### TREK (`https://github.com/liketrek/TREK`)
- **License:** GNU AGPL-3.0 — all network-hosted modifications must be open-sourced. **Disqualifies fork/integration.**
- **Tech Stack:** NestJS 11 + SQLite (better-sqlite3) + React 19 + Vite 8 + Tailwind 3 + Leaflet/MapLibre + Dexie (IndexedDB) + Zustand + WebSockets
- **All 6 candidate files exist** at exact specified paths (verified):
  - `MTripShell.tsx` (813 lines) — complex mobile trip state machine, 12 modal sheets
  - `MMapArea.tsx` (483 lines) — Leaflet + MapLibre dual engine with POI overlays
  - `usePoiExplore.ts` (122 lines) — OSM Overpass API hook with AbortController + bbox caching (**reusable pattern**)
  - `SharedTripPage.tsx` (1,246 lines) — public share view with token auth, Leaflet clustering, granular permissions
  - `MCollabPolls.tsx` (500 lines) — real-time WebSocket group polling
  - `wiki/MCP-Tools-and-Resources.md` — full MCP reference (25,147 bytes)
- **MCP Tools Verified:** `create_trip`, `create_and_assign_place`, `update_assignment_time`, `create_budget_item`, `create_share_link` — all implemented in NestJS with OAuth 2.1 + PKCE
- **Setup Complexity:** HIGH — OAuth machine client credentials, SQLite, Docker, env vars
- **Integration Time Estimate:** 3–5 hours (exceeds 4-hour total budget)
- **Reusable Patterns (without forking):**
  - `usePoiExplore.ts` architecture (AbortController, bbox caching, "Search this area" UX)
  - Leaflet marker clustering and numbered badge pattern from `SharedTripPage.tsx`
  - Granular share permission model concept

### OpenMuse (`https://github.com/CopilotKit/openmuse`)
- Generative agent sandbox with containerized Chromium + Linux terminal
- **Relevance: NONE** — massive infrastructure overhead for MVP, out of scope

### Rallly (`https://github.com/lukevella/rallly`)
- Open-source group scheduling (Doodle alternative), Next.js + Prisma + PostgreSQL
- **Relevance: LOW (direct reuse) / MEDIUM (UX inspiration)** — frictionless no-login voting link model is excellent design pattern for P1 group voting feature

### Ignite (`https://github.com/infinitered/ignite`)
- React Native / Expo mobile boilerplate
- **Relevance: NONE** — BrokeTonight is web-first; mobile-responsive Tailwind handles mobile viewports

### OpenUI (`https://github.com/thesysdev/openui`)
- Generative UI DSL for streaming LLM-rendered components
- **Relevance: LOW** — streaming DSL adds technical risk; typed JSON + shadcn cards is faster and safer for MVP

---

## 2. Grok Bot / xAI API Capabilities (Verified)

### API Access
- **Base URL:** `https://api.x.ai/v1`
- **Auth:** `Authorization: Bearer <XAI_API_KEY>` (keys from `console.x.ai`)
- **Primary Endpoint:** `POST /v1/responses` (modern, supports built-in tools)
- **Legacy:** `POST /v1/chat/completions` (no built-in tools)

### Live Web Search — CONFIRMED ✅
- Tool type: `web_search` — fully server-side, agentic
- Grok autonomously queries the web, browses pages, extracts live data
- Returns `response.citations` array with all source URLs
- Configurable: `allowed_domains`, `excluded_domains`, `enable_image_understanding`
- **Cost: $5.00/1,000 calls** ($0.005 per query)

### Structured Output — CONFIRMED ✅
- `response_format: { type: "json_schema", json_schema: {...} }` (JSON Schema Draft 2020-12)
- Works **simultaneously with `web_search`**
- Grok does web research AND returns validated JSON in one call

### MCP Support — CONFIRMED ✅
- Remote MCP servers can be passed directly in `tools` array of `/v1/responses`
- Could theoretically call TREK's MCP endpoint — but TREK integration remains out of scope

### Recommended Models
- **`grok-4.7`** — flagship, best reasoning + tool use, 500k context window
- **`grok-4.3`** — faster, cheaper, better for high-throughput tool calling

### Cost Per BrokeTonight Query
- ~1,500 prompt tokens ($0.003) + ~1,000 output tokens ($0.006) + 1 web search ($0.005) = **~$0.014/query**
- 100 student sessions = **~$1.40**

---

## 3. Frontend Stack (Verified)

| Library | Version | Notes |
|---------|---------|-------|
| `vite` | 6.x/8.x | Node 20.19+ required |
| `react` | 19.3.1 | Default with react-ts template |
| `typescript` | 6.0.x | |
| `tailwindcss` | 4.3.3 | CSS-first config, no `tailwind.config.js` |
| `@tailwindcss/vite` | 4.3.3 | Native Vite plugin, replaces PostCSS |
| `shadcn` CLI | 4.22.1 | Full Tailwind v4 support |
| `lucide-react` | 1.61.0 | Tree-shakeable SVG icons |
| `framer-motion` | latest | Powers React Bits animations |
| `tw-animate-css` | latest | Tailwind v4 animation utilities |

**Key Tailwind v4 Gotchas:**
- No `tailwind.config.js` — config lives in `src/index.css` via `@theme`
- Replace `@tailwind base/components/utilities` with `@import "tailwindcss"`
- Double semicolons in CSS custom properties cause Vite errors
- Path alias `@/*` must be configured in both `tsconfig.json` AND `tsconfig.app.json`

**React Bits:** No npm package — components are copied from `reactbits.dev` or installed via shadcn registry. Uses framer-motion for animations. Recommended: `ShinyText` (headline), `SpotlightCard` (activity cards).

---

## 4. Reuse Matrix

| Feature | Existing Implementation | Evidence | Reuse Strategy | Time Est. | Decision |
|---------|------------------------|----------|----------------|-----------|----------|
| Navigation/shell | TREK `MTripShell.tsx` | Verified | Skip (AGPL + product mismatch) | — | Build from scratch |
| Activity cards | TREK `SharedTripPage.tsx` patterns | Verified | Pattern inspiration only | 45 min | Build with shadcn Card |
| Maps | TREK `MMapArea.tsx` + `usePoiExplore.ts` | Verified | Pattern inspiration; use react-leaflet directly | 60 min | Deferred to P1 (4hr budget) |
| Venue details | None | — | Embedded in activity card | 20 min | Build |
| Itineraries | TREK full system | AGPL, complex | URL-based shareable state | 30 min | Build lightweight |
| Budgets | TREK `budget.mcp.ts` | AGPL | Client-side filter only | 15 min | Build |
| Public sharing | TREK `create_share_link` | AGPL | URL-encoded base64 state, no backend | 30 min | Build |
| Group voting | Rallly, TREK `MCollabPolls.tsx` | Verified | Pattern inspiration | — | Deferred P1 |
| Grok Bot integration | xAI `/v1/responses` + `web_search` | Verified ✅ | Direct API integration | 45 min | Build |
| Source attribution | xAI `response.citations` | Verified ✅ | Render citation chips | 20 min | Build |

---

## 5. Architecture Selection

### Evaluated Options
| Approach | Integration Time | Reusable Code | Licensing Risk | Demo Feasibility |
|----------|-----------------|---------------|----------------|-----------------|
| A. TREK + Custom Frontend | 3–5 hrs setup alone | High (maps, MCP, sharing) | HIGH (AGPL-3.0) | ❌ Exceeds budget |
| B. Fork & Rebrand TREK | 4–6 hrs reskinning | Very High | HIGH (AGPL-3.0, must OSS) | ❌ License violation risk |
| C. Standalone React App | 15 min scaffold | Low (patterns only) | None | ✅ Fits 4hr budget |

### ✅ Decision: Architecture C — Standalone React Application
**Evidence:**
1. TREK's AGPL-3.0 license prohibits hosted integration without full OSS disclosure
2. TREK integration estimated 3-5 hours — exceeds entire 4-hour budget
3. xAI `/v1/responses` + `web_search` + `json_schema` provides genuine, traceable Grok Bot research in a single API call
4. URL-encoded base64 shareable plans require zero backend infrastructure
5. Vite scaffold takes 15 minutes; shadcn/Tailwind stack delivers polished Gen Z UI fast

---

## 6. Self-Review Summary

**Conducted as skeptical senior engineer — 2026-10-24**

| Check | Finding | Resolution |
|-------|---------|------------|
| Architecture backed by evidence? | ✅ AGPL blocks TREK; xAI web search confirmed | Standalone confirmed |
| Dependencies reduce implementation time? | ✅ All verified, no speculative dependencies | Approved |
| Commands grounded in docs/source? | ✅ Frontend agent verified all commands against current docs | Approved |
| Grok Bot contribution achievable? | ✅ `/v1/responses` + `web_search` confirmed; curated fallback ensures demo works | Approved |
| Scope fits 4 hours? | ⚠️ Tight with maps — defer map rendering to P1 | Maps removed from P0 scope |
| Public sharing works end-to-end? | ✅ URL-encoded state, no backend needed | Approved |
| Design distinctive and coherent? | ✅ ShinyText headline + SpotlightCard + bold Tailwind tokens | Approved |
| Simpler alternatives for high-risk? | ✅ Curated UCSD seed data fallback for API key absent/throttled | Approved |

**Final Decisions After Review:**
- Maps deferred to P1 (show address text + distance instead)
- Sharing: base64-encoded URL params, no backend required
- Grok integration: live when `VITE_XAI_API_KEY` set; curated fallback when not
- Image strategy: Curated Unsplash URLs per activity category (no image search API)

# BrokeTonight — Build Plan
_Plan created: 2026-10-24 | Architecture C: Standalone React Application_

---

## 1. Architecture Overview

**Standalone Vite + React frontend** with a lightweight Express proxy for xAI API calls.

```
BrokeTonight/
├── client/                        # Vite + React 19 + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                # shadcn/ui primitives (auto-generated)
│   │   │   ├── react-bits/        # ShinyText.tsx, SpotlightCard.tsx
│   │   │   ├── FilterBar.tsx      # Budget / Vibe / GroupSize selectors
│   │   │   ├── ActivityCard.tsx   # Single activity card with SpotlightCard wrapper
│   │   │   ├── ActivityGrid.tsx   # 3-card results grid with stagger animation
│   │   │   ├── GeminiBadge.tsx      # "Researched by Gemini" attribution chip
│   │   │   ├── ShareModal.tsx     # Copy URL + share plan dialog
│   │   │   ├── LoadingScout.tsx   # Gemini loading animation
│   │   │   └── HeroHeader.tsx     # Logo + ShinyText headline
│   │   ├── hooks/
│   │   │   └── useActivities.ts   # Discovery query hook (live + fallback)
│   │   ├── lib/
│   │   │   ├── types.ts           # Shared Activity + Filter types
│   │   │   ├── api.ts             # xAI /v1/responses client
│   │   │   ├── seed-data.ts       # Curated UCSD activity fallback dataset
│   │   │   └── share.ts           # URL encode/decode shareable plans
│   │   ├── pages/
│   │   │   ├── DiscoveryPage.tsx  # Main discovery experience
│   │   │   └── SharedPlanPage.tsx # Public share view (/share?plan=...)
│   │   ├── App.tsx                # Router shell (React Router v7)
│   │   ├── main.tsx
│   │   └── index.css              # Tailwind v4 + shadcn tokens + BrokeTonight theme
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── package.json
├── server/                        # Minimal Express proxy for xAI API
│   ├── index.ts
│   └── package.json
├── docs/
│   ├── BROKETONIGHT_RESEARCH.md
│   └── BROKETONIGHT_BUILD_PLAN.md
└── PROMPT.md
```

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Build | Vite | 6/8.x | Fast HMR + build |
| UI Framework | React | 19.3.1 | Component model |
| Language | TypeScript | 6.0.x | Type safety |
| Styling | Tailwind CSS | 4.3.3 | Utility-first CSS |
| UI Components | shadcn/ui | 4.22.1 | Accessible primitives |
| Icons | Lucide React | 1.61.0 | Consistent iconography |
| Animations | framer-motion | latest | SpotlightCard, stagger |
| Routing | React Router | v7 | Discovery + Share pages |
| AI/Scout | Google Gemini | current | Live web search + JSON |
| Proxy Server | Express | 5.x | API key protection |

---

## 3. Shared Types Contract

All subagents must use these exact types from `client/src/lib/types.ts`:

```typescript
export type Vibe = 'Chill' | 'Adventurous' | 'Chaotic' | 'Romantic';
export type Budget = 0 | 10 | 20;

export interface Activity {
  id: string;
  title: string;
  description: string;
  estimatedCostPerPerson: number;
  costBreakdown?: string;
  locationName: string;
  address?: string;
  distanceFromCampus?: string;
  operatingHours?: string;
  ageRestriction?: string;
  sourceUrl: string;
  imageUrl?: string;
  geminiScoutNotes?: string;
  verificationStatus: 'verified_live' | 'estimated';
  vibes: Vibe[];
  tags?: string[];
}

export interface DiscoveryFilters {
  budget: Budget;
  vibe: Vibe;
  groupSize: number;
}

export interface DiscoveryResult {
  activities: Activity[];
  querySummary: string;
  citations?: string[];
  isLiveData: boolean;
  fetchedAt: string;
}

export interface ShareablePlan {
  filters: DiscoveryFilters;
  selectedActivity: Activity;
  createdAt: string;
}
```

---

## 4. Setup Commands

### Client
```bash
cd /Users/jonathan/Documents/BrokeTonight
npm create vite@latest client -- --template react-ts
cd client
npm install
npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
npm install lucide-react clsx tailwind-merge class-variance-authority tw-animate-css framer-motion
npm install react-router-dom
npm install @ai-sdk/xai ai zod
# Initialize shadcn (after tsconfig and vite.config.ts are updated)
npx shadcn@latest init -d
npx shadcn@latest add button card badge dialog separator tabs tooltip
```

### Server
```bash
cd /Users/jonathan/Documents/BrokeTonight
mkdir server && cd server
npm init -y
npm install express cors dotenv
npm install -D typescript @types/express @types/node @types/cors tsx
```

### Environment
```bash
# client/.env.local (for dev, key optional — fallback activates when absent)
VITE_API_BASE_URL=http://localhost:3001

# server/.env
XAI_API_KEY=your_key_here
PORT=3001
```

---

## 5. Design System & Visual Identity

### Color Palette (BrokeTonight Theme)
```css
/* Added to src/index.css @theme block */
--color-brand-orange: oklch(0.72 0.18 50);      /* Primary CTA */
--color-brand-purple: oklch(0.45 0.22 290);      /* Accent */
--color-brand-lime: oklch(0.88 0.22 130);         /* Highlight */
--color-brand-dark: oklch(0.12 0.02 240);         /* Background */
--color-brand-card: oklch(0.16 0.02 240);         /* Card bg */
```

### Typography
- Headline: `font-black text-5xl md:text-7xl` with ShinyText shimmer
- Tagline: `font-semibold text-xl text-muted-foreground`
- Card title: `font-bold text-lg`

### Vibe Visual Identity
| Vibe | Icon | Color |
|------|------|-------|
| Chill | `Sunset` | Blue-indigo |
| Adventurous | `Compass` | Orange-amber |
| Chaotic | `Flame` | Red-orange |
| Romantic | `Heart` | Pink-rose |

### Budget Badge Colors
- `$0` → `bg-emerald-500` "FREE"
- `$10` → `bg-amber-500` "Under $10"
- `$20` → `bg-orange-500` "Under $20"

---

## 6. xAI Integration Specification

### API Call (via server proxy)
```
POST /api/discover
Body: { budget: 10, vibe: "Adventurous", groupSize: 3 }

Proxy calls: POST https://api.x.ai/v1/responses
  model: "gemini-2.5-flash"
  tools: [{ type: "web_search" }]
  response_format: { type: "json_schema", json_schema: <ActivitySchema> }
```

### System Prompt
```
You are Gemini, BrokeTonight's elite local activity scout for UCSD students in La Jolla, CA. 
Research 3 distinct, fun, budget-friendly activities matching the filters. 
Use web search to verify: real venues, current prices, student discounts, operating hours, age restrictions.
Return valid JSON per the schema. Include genuine source URLs you actually visited.
```

### Fallback (no API key / 429 / network error)
Serve from `seed-data.ts` — 9+ curated UCSD activities covering all budget levels and vibes:
- Free: Torrey Pines Gliderport (Adventurous), La Jolla Cove sunset (Chill/Romantic), UCSD Loft events (Chill)
- $10: The Taco Stand La Jolla (Chaotic), Wahoo's Fish Taco + beach (Chill), Bird Rock Coffee (Romantic)
- $20: Birch Aquarium student rate (Adventurous), Board & Brew (Chill), Cabrillo Nat'l Monument (Adventurous)

---

## 7. Sharing Implementation

No backend required for sharing:

```typescript
// lib/share.ts
export function encodePlan(plan: ShareablePlan): string {
  const json = JSON.stringify(plan);
  return btoa(encodeURIComponent(json));
}

export function decodePlan(encoded: string): ShareablePlan {
  return JSON.parse(decodeURIComponent(atob(encoded)));
}

// Share URL: https://broketonight.app/share?plan=<encoded>
// React Router reads ?plan= param and renders SharedPlanPage
```

---

## 8. Implementation Task Breakdown

### Subagent A — Frontend & Visual Design
**Files owned:** `client/` (all except `src/lib/` and `src/hooks/`)
**Tasks:**
1. Scaffold Vite project, configure Tailwind v4 + shadcn + path aliases
2. Set up `src/index.css` with BrokeTonight theme tokens
3. Create `HeroHeader.tsx` with ShinyText "BrokeTonight" + tagline
4. Create `FilterBar.tsx` — Budget ($0/$10/$20), Vibe (4 options), GroupSize (1-10 stepper)
5. Create `ActivityCard.tsx` — image, title, cost badge, description, source link, "Select Plan" CTA
6. Create `ActivityGrid.tsx` — 3-card stagger animation with framer-motion
7. Create `GeminiBadge.tsx` — "Researched by Gemini" chip with Sparkles icon
8. Create `LoadingScout.tsx` — animated loading state ("Gemini is scouting…")
9. Create `ShareModal.tsx` — copy URL button, plan summary, share sheet
10. Create `DiscoveryPage.tsx` — compose all components, wire to `useActivities` hook
11. Create `SharedPlanPage.tsx` — render single activity from URL param
12. Set up React Router in `App.tsx`

**Constraints:**
- Import types from `@/lib/types` (do not redefine)
- Import `useActivities` from `@/hooks/useActivities` (do not implement)
- Import share utilities from `@/lib/share` (do not implement)
- Use dark background (`brand-dark`) throughout
- Mobile-first responsive design

### Subagent B — Data Layer & API Integration
**Files owned:** `client/src/lib/`, `client/src/hooks/`, `server/`
**Tasks:**
1. Write `client/src/lib/types.ts` — exact types from Section 3 above
2. Write `client/src/lib/seed-data.ts` — 9+ curated UCSD activities (3 per budget tier)
3. Write `client/src/lib/share.ts` — `encodePlan` / `decodePlan` using btoa/atob
4. Write `client/src/lib/api.ts` — `discoverActivities(filters)` fetching `/api/discover` with fallback
5. Write `client/src/hooks/useActivities.ts` — React hook wrapping `api.ts`, manages loading/error/result state
6. Write `server/index.ts` — Express proxy: `POST /api/discover` → xAI `/v1/responses`
7. Write `server/package.json` with scripts

**Constraints:**
- `api.ts` must catch network errors and activate seed data fallback automatically
- `useActivities` must expose: `{ activities, isLoading, error, isLiveData, citations, discover }`
- Seed data must cover all Budget × Vibe combinations
- Server must handle missing `XAI_API_KEY` gracefully (return curated data)

---

## 9. Test Strategy

### Manual Test: Acceptance Scenario
1. Open app → Select UCSD / $10 / Adventurous / 3 friends → Click "Find Tonight"
2. Verify: Loading animation shows "Gemini is scouting…"
3. Verify: 3 activity cards appear with image, cost badge, description, source link
4. Verify: Gemini badge shows "Live" or "Verified Archive"
5. Click "Select Plan" → Share modal opens with copyable URL
6. Navigate to share URL → SharedPlanPage renders activity correctly
7. Test all 4 vibes × 3 budgets with fallback data (no API key)

### Smoke Tests
```bash
cd client && npm run build    # Must succeed with zero TypeScript errors
cd server && npx tsc --noEmit # Must succeed
```

---

## 10. Time Budget

| Phase | Allocation | Status |
|-------|-----------|--------|
| Web research (3 parallel agents) | 25 min | ✅ Complete |
| Planning + self-review | 20 min | ✅ Complete |
| Scaffold + setup (Subagent A) | 20 min | ✅ Complete |
| Parallel implementation | 100 min | ✅ Complete |
| Integration + testing | 40 min | ✅ Complete |
| Final refinement + demo prep | 35 min | ✅ Complete |

---

## 11. Run Command

```bash
# Option 1: Root concurrent runner (both server + client in one command)
npm run start
# or npm run dev

# Option 2: Individual services
# Terminal 1 — API proxy server
cd server && npx tsx index.ts

# Terminal 2 — Frontend dev server
cd client && npm run dev
# → http://localhost:5173
```

---

## 12. Definition of Done & Test Verification

- [x] App loads at `localhost:5173` with no console errors
- [x] All 4 vibes × 3 budgets produce 3 activity cards (via live API or verified archive)
- [x] Activity cards show image, title, cost badge, description, source link, Google Maps link, and Gemini attribution
- [x] "Select Plan" opens share modal with working copy-URL
- [x] Share URL renders activity in SharedPlanPage without re-querying
- [x] `npm run build` passes with zero TypeScript errors
- [x] Mobile viewport responsive layout verified
- [x] Gemini badge clearly indicates live vs. archived data
- [x] Acceptance criteria verified: UCSD / $10 / Adventurous / 3 friends yields 3 real recommendations with cost breakdown and sharing

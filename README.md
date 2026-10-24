# BrokeTonight 🌙

> Bored? Broke? Real-time budget activity scout for college students.

BrokeTonight helps students find real, open, and verified things to do tonight without breaking the bank. Powered by **Google Gemini** and **Parallel Search MCP**, it scouts live venue hours, schedules, and costs across San Diego (La Jolla, Convoy District, Pacific Beach, Downtown, and Balboa Park).

---

## Features

- **OpenUI Route & Live Chat**: Conversational activity planner generating full evening itineraries with an interactive Leaflet route map, time badges, and verified venue links.
- **Strict Budget Ceiling**: Cumulative multi-stop cost calculation guarantees that group and per-person totals never exceed your requested budget.
- **Accurate Grounding**: Validates real operating hours and eliminates ticketed venues masquerading as free, automatically filtering out spots that close early or are closed on weekends.
- **Interactive Discover Feed**: Filter activities by neighborhood, budget slider ($0–$50 with selectable $5 increments), group size (1–8), and vibe (*Chill*, *Adventurous*, *Chaotic*, *Romantic*).
- **Plan Sharing**: Generate shareable plan links with group cost breakdowns.
- **Mobile & PWA Ready**: Optimized for mobile browsers with full-screen "Add to Home Screen" web app support.

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Leaflet, Lucide Icons
- **Backend**: Node.js, Express, TypeScript (`tsx`)
- **AI & Live Search**: Google Gemini API (`gemini-flash-lite`), Parallel Search MCP
- **Code Quality**: Biome (Linting & Formatting)

---

## Getting Started

### 1. Prerequisites
- Node.js 18+
- npm or pnpm

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:Jonathan-Luo01/BrokeTonight.git
cd BrokeTonight
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 3. Environment Variables

Create a `.env` file in the `server` directory (see `server/.env.example`):

```bash
cp server/.env.example server/.env
```

Add your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PARALLEL_API_KEY=your_parallel_api_key_here # optional
PORT=3001
```

### 4. Running Locally

Run both the backend API and frontend dev server simultaneously:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3001`

### 5. GitHub Pages Deployment

The repository includes an automated GitHub Actions workflow (`.github/workflows/deploy.yml`) configured with client-side routing and fallback support:

1. In your GitHub repository, go to **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push changes to `main` (or manually trigger the *Deploy to GitHub Pages* workflow in the Actions tab).
4. The web app is automatically deployed to `https://<username>.github.io/BrokeTonight/`.

---

## Scripts

- `npm run dev` - Start both server and client with concurrently
- `npm run dev:client` - Start Vite dev server only
- `npm run dev:server` - Start Express API server only
- `npm run build` - Build client for production
- `npm run lint` - Run Biome linter check
- `npm run format` - Format code with Biome

---

## License

MIT

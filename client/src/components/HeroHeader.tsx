import { Compass, Globe, Sparkles } from 'lucide-react';

export function HeroHeader() {
  return (
    <header className="text-center pt-8 pb-6 px-4 space-y-3">
      {/* Top OpenUI Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>BrokeTonight · Gemini & Parallel Search MCP</span>
      </div>

      <h1 className="font-extrabold text-5xl md:text-7xl tracking-tight text-neutral-950">
        BrokeTonight
      </h1>

      <p className="text-lg md:text-xl text-neutral-600 font-medium max-w-xl mx-auto">
        Bored? Broke? <span className="text-neutral-950 font-bold">Let's go.</span>
      </p>

      {/* Context Badges Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium border border-neutral-200/60">
          <Compass className="w-3 h-3 text-neutral-500" /> UCSD & Greater San Diego
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200/60">
          <Globe className="w-3 h-3 text-emerald-600" /> Live Search Grounded
        </span>
      </div>
    </header>
  );
}

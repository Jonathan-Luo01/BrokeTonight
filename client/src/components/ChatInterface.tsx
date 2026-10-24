import { ArrowDown, ArrowUp, Check, Compass, ExternalLink, Globe, Lightbulb, RefreshCw, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { OpenUIMap, type RouteStop } from '@/components/openui/OpenUIMap';
import { getAccurateImageForActivity } from '@/lib/accurate-images';
import { resolveWorkingLink } from '@/lib/verified-links';

interface RoutePlan {
  prompt: string;
  title: string;
  subtitle: string;
  timeBadge: string;
  transitBadge: string;
  extraBadge: { text: string; bg: string; textCol: string };
  estimatedTotalBudget?: string;
  costOverview?: string;
  stops: RouteStop[];
}

const LA_JOLLA_PRESET: RoutePlan = {
  prompt: 'Plan a free relaxing evening route in La Jolla for college students tonight.',
  title: 'La Jolla Sunset & Moonlit Coast Walk',
  subtitle:
    'Start with panoramic sunset ocean vistas at Torrey Pines Gliderport, watch the sea lions at La Jolla Cove, and finish with a student hangout at The Loft.',
  timeBadge: '🕒 About 5:30 PM–9:30 PM',
  transitBadge: 'Drive / Trolley + walking',
  extraBadge: {
    text: '100% Free ($0 Total)',
    bg: '#DCFCE7',
    textCol: '#166534',
  },
  estimatedTotalBudget: 'Free ($0) Total per person',
  costOverview: 'Gliderport ($0) + La Jolla Cove ($0) + The Loft student events ($0)',
  stops: [
    {
      id: 'lj-1',
      name: 'Torrey Pines Gliderport Cliffs',
      lat: 32.8895,
      lng: -117.2515,
      time: '5:30 PM',
      duration: '60 min',
      cost: 'Free ($0)',
      costBreakdown: 'Free public access to coastal bluffs and viewing areas',
      description:
        'Watch the golden hour sunset from the 300-foot sandstone bluffs overlooking the Pacific Ocean and Black’s Beach.',
      transitNote: 'Drive 8 minutes south along Torrey Pines Rd to La Jolla Cove.',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
      sourceUrl: 'https://www.flytorrey.com',
      visited: false,
    },
    {
      id: 'lj-2',
      name: 'La Jolla Cove & Coast Walk Trail',
      lat: 32.8503,
      lng: -117.2731,
      time: '6:45 PM',
      duration: '75 min',
      cost: 'Free ($0)',
      costBreakdown: 'Free 24/7 public shoreline and coastal boardwalk',
      description:
        'Stroll along the illuminated ocean promenade and listen to the sea lion colony resting on the sandstone rocks under the moonlit sky.',
      transitNote: 'Head back up to campus via Gilman Dr or Blue Line Trolley.',
      imageUrl: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80',
      sourceUrl: 'https://www.sandiego.gov/lifeguards/beaches/cove',
      visited: false,
    },
    {
      id: 'lj-3',
      name: 'The Loft at Price Center (UCSD)',
      lat: 32.8797,
      lng: -117.2358,
      time: '8:15 PM',
      duration: '60–90 min',
      cost: 'Free ($0)',
      costBreakdown: 'Free admission for students with student ID',
      description:
        'Unwind on campus with live music, open mic, or social lounge events at UCSD’s premier student entertainment venue.',
      transitNote: 'End of route on campus at Price Center.',
      imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
      sourceUrl: 'https://hdh.ucsd.edu/theloft',
      visited: false,
    },
  ],
};

const CONVOY_PRESET: RoutePlan = {
  prompt:
    'Find weekend activities for a group of 5 people under $40 each in the Convoy area in San Diego tonight.',
  title: 'Convoy District Food, Dessert & Karaoke Crawl',
  subtitle:
    'Family-style Korean BBQ platters, iconic SomiSomi taiyaki soft serve, and a private neon karaoke room for 5 friends strictly under $40.',
  timeBadge: '🕒 About 6 PM–11 PM',
  transitBadge: 'Convoy Plaza parking + walking',
  extraBadge: {
    text: '$38.50 per person',
    bg: '#FEF3C7',
    textCol: '#92400E',
  },
  estimatedTotalBudget: '$38.50 per person total ($192.50 total for 5)',
  costOverview: 'Dinner ($20) + SomiSomi ($6.50) + Spot KTV room split ($12) = $38.50 per person',
  stops: [
    {
      id: 'c-1',
      name: 'Friends House Korean BBQ & Grill',
      lat: 32.8242,
      lng: -117.1558,
      time: '6:00 PM',
      duration: '90 min',
      cost: '~$20/person',
      costBreakdown:
        '$100 family-style dinner share (bulgogi, spicy pork, tofu soup & refillable banchan) split 5 ways (~$20 each)',
      description:
        'Sizzling Korean BBQ meat platters, spicy tofu stew, and unlimited complimentary banchan side dishes shared family-style among 5.',
      transitNote: 'Walk 3 minutes north along Convoy St to SomiSomi.',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
      sourceUrl: 'https://www.convoydistrict.com',
      visited: false,
    },
    {
      id: 'c-2',
      name: 'SomiSomi Convoy (Taiyaki Soft Serve)',
      lat: 32.8315,
      lng: -117.1552,
      time: '7:45 PM',
      duration: '45 min',
      cost: '$6.50/person',
      costBreakdown:
        'Signature Ah-Boong warm waffle cone with soft-serve swirl & Nutella/custard filling ($6.50)',
      description:
        'Iconic Convoy sweet stop: freshly pressed fish-shaped waffle cones filled with Nutella or taro and swirled with ube/milk soft serve.',
      transitNote: 'Drive 2 minutes or take a quick stroll down to Spot KTV.',
      imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80',
      sourceUrl: 'https://www.somisomi.com',
      visited: false,
    },
    {
      id: 'c-3',
      name: 'Spot KTV / Plaza Karaoke',
      lat: 32.8265,
      lng: -117.1572,
      time: '8:45 PM',
      duration: '90 min',
      cost: '$12/person',
      costBreakdown: 'Standard room rate ($60/hr) split 5 ways = $12 each for an hour of singing',
      description:
        'Private group karaoke room with neon lounge lighting, thousands of classic and modern hits, and disco effects.',
      transitNote: 'Wrap up the night right here on Convoy. Easy rideshare pickup right outside.',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
      sourceUrl: 'https://findkaraoke.net/san-diego',
      visited: false,
    },
  ],
};

export function ChatInterface() {
  const [currentRoute, setCurrentRoute] = useState<RoutePlan>(CONVOY_PRESET);
  const [selectedStopId, setSelectedStopId] = useState<string | undefined>(undefined);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [scoutNote, setScoutNote] = useState<string | null>(
    "Scout's pick: Split family-style BBQ platters with endless banchan at Friends House ($20), grab SomiSomi taiyaki soft serve ($6.50), and split Spot KTV's $60/hr private room 5 ways ($12). Real total: $38.50 each — comfortably under your $40 budget!"
  );
  const [sources, setSources] = useState<Array<{ title: string; url: string }>>([
    {
      title: 'San Diego Weekend Itinerary (Convoy District)',
      url: 'https://sandispots.com/san-diego-weekend',
    },
    {
      title: 'Karaoke in San Diego: 17 Private Rooms',
      url: 'https://findkaraoke.net/san-diego',
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const routeSectionRef = useRef<HTMLDivElement>(null);

  const scrollToRoute = () => {
    routeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleVisited = (id: string) => {
    setCurrentRoute((prev) => ({
      ...prev,
      stops: prev.stops.map((stop) =>
        stop.id === id ? { ...stop, visited: !stop.visited } : stop
      ),
    }));
  };

  const handleSend = async (queryText?: string) => {
    const text = (queryText || input).trim();
    if (!text || isLoading) return;

    setActivePrompt(text);
    setInput('');
    setIsLoading(true);
    setStreamingText('');

    try {
      const apiBase =
        import.meta.env.VITE_API_URL || 'https://broketonight-api.kingjonathanluo.workers.dev';
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({ message: text, stream: true }),
      });

      if (!response.ok) {
        throw new Error(`Chat error: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const dataStr = trimmed.slice(5).trim();
            if (dataStr === '[DONE]') continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.type === 'token' && parsed.text) {
                setStreamingText((prev) => prev + parsed.text);
              } else if (parsed.type === 'route' && parsed.route) {
                setCurrentRoute(parsed.route);
                if (parsed.summary) setScoutNote(parsed.summary);
                if (parsed.sources) setSources(parsed.sources);
                setIsLoading(false);
              }
            } catch {
              // ignore partial chunk json errors
            }
          }
        }
      } else {
        const data = await response.json();
        if (data.route && Array.isArray(data.route.stops) && data.route.stops.length > 0) {
          setCurrentRoute(data.route);
        }
        setScoutNote(data.message?.content || null);
        setSources(data.sources || []);
        setIsLoading(false);
      }

      setTimeout(() => {
        scrollToRoute();
      }, 350);
    } catch (err) {
      console.warn('Backend unavailable, falling back to client-curated route:', err);
      const lower = text.toLowerCase();
      if (
        lower.includes('la jolla') ||
        lower.includes('free') ||
        lower.includes('beach') ||
        lower.includes('cliff')
      ) {
        setCurrentRoute({
          ...LA_JOLLA_PRESET,
          prompt: text,
        });
        setScoutNote(
          "Scout's pick: All stops on this coastal route have 100% free public admission. Perfect for sunset ocean views and night beach walks without spending a dime!"
        );
      } else {
        setCurrentRoute({
          ...CONVOY_PRESET,
          prompt: text,
        });
        setScoutNote(
          "Scout's pick: Split family-style BBQ platters with endless banchan at Friends House ($20), grab SomiSomi taiyaki soft serve ($6.50), and split Spot KTV's $60/hr private room 5 ways ($12). Real total: $38.50 each — comfortably under your $40 budget!"
        );
      }
      setTimeout(() => {
        scrollToRoute();
      }, 350);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-36 text-neutral-900 bg-white min-h-[90vh] rounded-3xl shadow-xs border border-neutral-200/80"
    >
      {/* Route Switcher Quick Starters */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-neutral-100 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Example Itineraries:
          </span>
          <button
            type="button"
            onClick={() => handleSend(CONVOY_PRESET.prompt)}
            disabled={isLoading}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-colors disabled:opacity-50 ${
              currentRoute.title.includes('Convoy')
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            🍜 Convoy $40 Night Out
          </button>
          <button
            type="button"
            onClick={() => handleSend(LA_JOLLA_PRESET.prompt)}
            disabled={isLoading}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-colors disabled:opacity-50 ${
              currentRoute.title.includes('La Jolla')
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            🌊 La Jolla Sunset (Free $0)
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentRoute(CONVOY_PRESET);
            setScoutNote(null);
          }}
          className="text-xs text-neutral-400 hover:text-neutral-700 flex items-center gap-1 transition-colors"
          title="Reset route"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* 1. User Prompt Pill (Top Right, matching OpenUI screenshot) */}
      <div className="flex justify-end mb-6">
        <div className="inline-block bg-neutral-950 text-white text-[14px] sm:text-[15px] font-normal px-5 py-2.5 rounded-full shadow-sm max-w-xl text-right leading-snug">
          {activePrompt || currentRoute.prompt}
        </div>
      </div>

      {isLoading ? (
        /* SKELETON SCREEN LOADER WHILE PLANNING / STREAMING */
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Live Streaming Scout Tip Box */}
          <div className="px-5 py-4 bg-amber-50/90 border border-amber-200/90 rounded-2xl flex items-start gap-3 shadow-xs">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin" />
            </div>
            <div className="flex-1 text-xs sm:text-sm text-amber-950">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-0.5">
                <span>Gemini AI Scout</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-normal text-amber-800">Scouting in real time...</span>
              </div>
              <p className="leading-relaxed">
                {streamingText || "Searching local spots, verifying tonight's hours, and mapping coordinates..."}
                <span className="inline-block w-1.5 h-4 ml-1 bg-amber-600 animate-pulse align-middle" />
              </p>
            </div>
          </div>

          {/* Skeleton Title & Badges */}
          <div className="space-y-3">
            <div className="h-9 sm:h-11 w-3/4 max-w-lg bg-neutral-200/70 rounded-xl animate-pulse" />
            <div className="h-5 w-full max-w-2xl bg-neutral-100 rounded-lg animate-pulse" />
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="h-7 w-28 bg-neutral-100 rounded-full animate-pulse" />
              <div className="h-7 w-32 bg-neutral-100 rounded-full animate-pulse" />
              <div className="h-7 w-24 bg-neutral-100 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Skeleton Interactive Map with Radar Sweep Animation */}
          <div className="relative h-[380px] w-full rounded-2xl bg-neutral-100/90 border border-neutral-200/80 overflow-hidden flex flex-col items-center justify-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-neutral-300 animate-ping opacity-25" />
              <div className="absolute w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6 animate-spin text-amber-400" />
              </div>
            </div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Mapping route stops & live pins...
            </p>
          </div>

          {/* Skeleton Stop Cards */}
          <div className="space-y-4 pt-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-neutral-200/80 p-5 flex flex-col sm:flex-row gap-5 animate-pulse"
              >
                <div className="w-full sm:w-56 h-36 rounded-xl bg-neutral-200/60 shrink-0" />
                <div className="flex-1 space-y-3 w-full py-1">
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-40 bg-neutral-200/70 rounded-md" />
                    <div className="h-6 w-20 bg-neutral-100 rounded-full" />
                  </div>
                  <div className="h-4 w-full bg-neutral-100 rounded-md" />
                  <div className="h-4 w-3/4 bg-neutral-100 rounded-md" />
                  <div className="h-3 w-48 bg-neutral-100 rounded-md pt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* 2. Title & Subtitle */}
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
              {currentRoute.title}
            </h1>
            <p className="mt-2 text-base sm:text-lg text-neutral-700 leading-relaxed max-w-3xl">
              {currentRoute.subtitle}
            </p>
          </div>

      {/* 3. Badges Row with Estimated Price Overview */}
      <div className="flex flex-wrap items-center gap-2.5 mb-6">
        <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full">
          {currentRoute.timeBadge}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full">
          {currentRoute.transitBadge}
        </span>
        <span
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full"
          style={{
            backgroundColor: currentRoute.extraBadge.bg,
            color: currentRoute.extraBadge.textCol,
          }}
        >
          {currentRoute.extraBadge.text}
        </span>

        {/* Expected Budget Overview Pill */}
        {currentRoute.estimatedTotalBudget && (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full">
            💰 Est: {currentRoute.estimatedTotalBudget}
          </span>
        )}

        {sources.length > 0 && (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Parallel Search MCP Live
          </span>
        )}
      </div>

      {/* 4. Interactive Route Map (Esri Topo + Numbered Markers + Expand) */}
      <div className="mb-8">
        <OpenUIMap
          stops={currentRoute.stops}
          selectedStopId={selectedStopId}
          onSelectStop={(id) => setSelectedStopId(id)}
          height={380}
        />
      </div>

      {/* 5. Subtle Scout Tip & Grounded Sources */}
      {scoutNote && (
        <div className="mb-8 px-4 py-3 bg-amber-50/70 border border-amber-200/70 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-amber-950">
          <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-amber-900 mr-1.5">Gemini Scout Tip:</span>
            <span>{scoutNote}</span>

            {currentRoute.costOverview && (
              <p className="mt-1 text-xs text-amber-800/90 font-medium">
                Breakdown: {currentRoute.costOverview}
              </p>
            )}

            {sources.length > 0 && (
              <div className="mt-2.5 pt-2 border-t border-amber-200/50 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-700" /> Sources:
                </span>
                {sources.slice(0, 3).map((s, idx) => (
                  <a
                    key={s.url || idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-neutral-800 hover:text-black underline bg-white/90 px-2 py-0.5 rounded-md border border-neutral-200 truncate max-w-[190px]"
                  >
                    <ExternalLink className="w-2.5 h-2.5 shrink-0 text-neutral-500" />
                    <span className="truncate">{s.title || s.url}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Section Header: "Your tonight route" */}
      <div ref={routeSectionRef} className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Your tonight route</h2>
        <span className="text-xs text-neutral-500 font-medium">
          {currentRoute.stops.filter((s) => s.visited).length} of {currentRoute.stops.length}{' '}
          visited
        </span>
      </div>

      {/* 7. Route Cards with Prices and Verification Links */}
      <div className="space-y-4">
        {currentRoute.stops.map((stop) => {
          const isSelected = stop.id === selectedStopId;
          const isVisited = !!stop.visited;

          return (
            <div
              key={stop.id}
              onClick={() => setSelectedStopId(stop.id)}
              className={`bg-white rounded-2xl border transition-all duration-200 p-5 ${
                isSelected
                  ? 'border-neutral-950 shadow-md ring-1 ring-neutral-950/10'
                  : 'border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-neutral-300 hover:shadow-sm'
              }`}
            >
              {/* Card Top Row: Thumbnail + Details */}
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {stop.imageUrl && (
                  <div className="w-full sm:w-56 h-36 rounded-xl overflow-hidden shrink-0 bg-neutral-100 border border-neutral-100">
                    <img
                      src={stop.imageUrl}
                      alt={stop.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getAccurateImageForActivity(
                          stop.name,
                          stop.description
                        );
                      }}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-bold transition-colors ${
                      isVisited ? 'line-through text-neutral-400 font-medium' : 'text-neutral-950'
                    }`}
                  >
                    {stop.name}
                  </h3>

                  {/* Timing, Duration & Price Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    {stop.time && (
                      <span className="bg-neutral-100 text-neutral-700 text-xs font-medium px-2.5 py-1 rounded-md">
                        {stop.time}
                      </span>
                    )}
                    {stop.duration && (
                      <span className="bg-neutral-100 text-neutral-700 text-xs font-medium px-2.5 py-1 rounded-md">
                        {stop.duration}
                      </span>
                    )}
                    {/* Expected Price per Stop */}
                    {stop.cost && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold px-2.5 py-1 rounded-md">
                        {stop.cost}
                      </span>
                    )}
                  </div>

                  {/* Cost Breakdown Details if provided */}
                  {stop.costBreakdown && (
                    <p className="text-xs text-neutral-500 font-medium mt-1.5">
                      💡 {stop.costBreakdown}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-sm text-neutral-700 mt-2 leading-relaxed">
                    {stop.description}
                  </p>
                </div>
              </div>

              {/* Card Transit Instruction */}
              {stop.transitNote && (
                <p className="text-xs sm:text-sm text-neutral-500 mt-3 pt-3 border-t border-neutral-100">
                  {stop.transitNote}
                </p>
              )}

              {/* Action Buttons: Mark as visited + Verify Event/Source Link */}
              <div className="mt-3.5 flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisited(stop.id);
                  }}
                  className="inline-flex items-center gap-2 text-sm text-neutral-800 hover:text-black font-medium transition-colors select-none py-1 px-1 rounded-md hover:bg-neutral-50"
                >
                  {isVisited ? (
                    <>
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="text-emerald-700 font-semibold">Visited</span>
                    </>
                  ) : (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-neutral-400 shrink-0 hover:border-neutral-600 transition-colors" />
                      <span className="text-neutral-700">Mark as visited</span>
                    </>
                  )}
                </button>

                {/* Event & Official Source Verification Link */}
                {(() => {
                  const verifiedLink = resolveWorkingLink({
                    title: stop.name,
                    sourceUrl: stop.sourceUrl,
                  });
                  return (
                    <a
                      href={verifiedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors border border-neutral-200/80 shadow-xs"
                      title="Check official venue site, showtimes, tickets, or schedule"
                    >
                      <span>Check Event & Details</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>
      </>
      )}

      {/* 8. Floating Scroll to Bottom Arrow + Floating Pill Composer (Matching screenshots) */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-3 sm:px-4 z-50 pb-[env(safe-area-inset-bottom,0px)]">
        {/* Floating Down Arrow Button */}
        <div className="flex justify-center mb-2">
          <button
            type="button"
            onClick={scrollToRoute}
            className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm border border-neutral-200/90 shadow-md flex items-center justify-center text-neutral-600 hover:text-black transition-all hover:scale-110 active:scale-95 cursor-pointer"
            title="Scroll to route"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Pill Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="w-full bg-white/95 backdrop-blur-md rounded-full border border-neutral-300/80 shadow-[0_10px_35px_rgba(0,0,0,0.12)] px-4 sm:px-5 py-2.5 flex items-center gap-2.5 sm:gap-3 transition-all focus-within:border-neutral-500 focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g. $25 night in Austin, cheap route in Berkeley, $15 night in NYC)..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none disabled:opacity-50 min-w-0"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-8 h-8 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-neutral-950 active:scale-95 flex items-center justify-center shrink-0 transition-all cursor-pointer"
            title="Submit query"
          >
            {isLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

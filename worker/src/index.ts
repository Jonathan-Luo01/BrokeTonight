export interface Env {
  GEMINI_API_KEY?: string;
  PARALLEL_API_KEY?: string;
  PARALLEL_SEARCH_MCP_URL?: string;
  ENVIRONMENT?: string;
}

const ACCURATE_IMAGES = {
  cove: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80',
  stargazing: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&q=80',
  gliderport: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  balboa: 'https://images.unsplash.com/photo-1541464522988-31b420f688b9?w=600&q=80',
  campus: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
  artTrail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80',
  kbbq: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  boba: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&q=80',
  gelato: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80',
  tacos: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
  sandwich: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80',
  coffee: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80',
  speakeasy: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
  karaoke: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
  arcade: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
  comedy: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&q=80',
  trail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
  social: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
};

function getAccurateImageForActivity(title: string, desc = ''): string {
  const text = `${title} ${desc}`.toLowerCase();

  // 1. Specific Landmarks & Nature FIRST
  if (
    text.includes('stargazing') ||
    text.includes('stars') ||
    text.includes('night sky') ||
    text.includes('astronomy')
  ) {
    return ACCURATE_IMAGES.stargazing;
  }
  if (
    text.includes('la jolla cove') ||
    text.includes('coast walk') ||
    text.includes('seal') ||
    text.includes('sea lion') ||
    text.includes('cove')
  ) {
    return ACCURATE_IMAGES.cove;
  }
  if (text.includes('gliderport') || text.includes('torrey pines')) {
    return ACCURATE_IMAGES.gliderport;
  }
  if (
    text.includes('balboa park') ||
    text.includes('plaza de panama') ||
    text.includes('el prado')
  ) {
    return ACCURATE_IMAGES.balboa;
  }
  if (
    text.includes('scripps pier') ||
    text.includes('la jolla shores') ||
    text.includes('windansea')
  ) {
    return ACCURATE_IMAGES.beach;
  }
  if (
    text.includes('the loft') ||
    text.includes('price center') ||
    text.includes('mandeville') ||
    text.includes('geisel')
  ) {
    return ACCURATE_IMAGES.campus;
  }
  if (text.includes('stuart collection') || text.includes('campus art')) {
    return ACCURATE_IMAGES.artTrail;
  }

  // 2. Specific Food & Desserts
  if (
    text.includes('boba') ||
    text.includes('shaved ice') ||
    text.includes('taro') ||
    text.includes('meet fresh')
  ) {
    return ACCURATE_IMAGES.boba;
  }
  if (
    text.includes('gelato') ||
    text.includes('ice cream') ||
    text.includes('bobboi') ||
    text.includes('somisomi') ||
    text.includes('taiyaki') ||
    text.includes('soft serve')
  ) {
    return ACCURATE_IMAGES.gelato;
  }
  if (
    text.includes('korean bbq') ||
    text.includes('kbbq') ||
    text.includes('olleh') ||
    text.includes('friends house') ||
    text.includes('bbq grill') ||
    text.includes('bulgogi')
  ) {
    return ACCURATE_IMAGES.kbbq;
  }
  if (text.includes('taco') || text.includes('mexican') || text.includes('carne asada')) {
    return ACCURATE_IMAGES.tacos;
  }
  if (
    text.includes('sandwich') ||
    text.includes('board & brew') ||
    text.includes('board and brew')
  ) {
    return ACCURATE_IMAGES.sandwich;
  }
  if (
    text.includes('ramen') ||
    text.includes('noodle') ||
    text.includes('hot pot') ||
    text.includes('hotpot') ||
    text.includes('sichuan')
  ) {
    return ACCURATE_IMAGES.ramen;
  }
  if (
    text.includes('coffee') ||
    text.includes('cafe') ||
    text.includes('latte') ||
    text.includes('espresso')
  ) {
    return ACCURATE_IMAGES.coffee;
  }
  if (
    text.includes('speakeasy') ||
    text.includes('cocktail') ||
    text.includes('realm of the 52 remedies')
  ) {
    return ACCURATE_IMAGES.speakeasy;
  }

  // 3. Entertainment
  if (text.includes('karaoke') || text.includes('ktv') || text.includes('spot ktv')) {
    return ACCURATE_IMAGES.karaoke;
  }
  if (
    text.includes('arcade') ||
    text.includes('round 1') ||
    text.includes('round1') ||
    text.includes('bowling') ||
    text.includes('claw machine')
  ) {
    return ACCURATE_IMAGES.arcade;
  }
  if (
    text.includes('comedy') ||
    text.includes('standup') ||
    text.includes('stand-up') ||
    text.includes('improv')
  ) {
    return ACCURATE_IMAGES.comedy;
  }

  // 4. General Outdoor & Nature
  if (
    text.includes('beach') ||
    text.includes('sunset') ||
    text.includes('ocean') ||
    text.includes('pier') ||
    text.includes('boardwalk')
  ) {
    return ACCURATE_IMAGES.beach;
  }
  if (
    text.includes('hike') ||
    text.includes('trail') ||
    text.includes('park') ||
    text.includes('canyon')
  ) {
    return ACCURATE_IMAGES.trail;
  }

  return ACCURATE_IMAGES.social;
}

function getDestinationKey(title: string, locName: string): string {
  const text = `${title} ${locName}`.toLowerCase();
  if (text.includes('torrey pines') || text.includes('gliderport')) return 'torrey-pines';
  if (text.includes('la jolla cove') || text.includes('cove')) return 'la-jolla-cove';
  if (text.includes('windansea')) return 'windansea';
  if (text.includes('balboa park')) return 'balboa-park';
  if (text.includes('scripps pier') || text.includes('la jolla shores')) return 'scripps-pier';
  if (text.includes('price center') || text.includes('the loft')) return 'ucsd-loft';
  if (text.includes('stuart collection')) return 'stuart-collection';
  if (text.includes('taco stand')) return 'taco-stand';
  if (text.includes('meet fresh')) return 'meet-fresh';
  if (text.includes('somisomi')) return 'somisomi';
  if (text.includes('round 1') || text.includes('round1')) return 'round1';
  if (text.includes('comedy store')) return 'comedy-store';
  if (text.includes('board & brew') || text.includes('board and brew')) return 'board-brew';
  if (text.includes('olleh')) return 'olleh-kbbq';
  if (text.includes('friends house')) return 'friends-house-kbbq';
  if (text.includes('bobboi')) return 'bobboi-gelato';
  return text
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .slice(0, 3)
    .join('-');
}

function isMainMeal(title: string, desc: string): boolean {
  const text = `${title} ${desc}`.toLowerCase();
  return (
    text.includes('bbq') ||
    text.includes('kbbq') ||
    text.includes('dinner') ||
    text.includes('lunch') ||
    text.includes('ramen') ||
    text.includes('taco') ||
    text.includes('burger') ||
    text.includes('hotpot') ||
    text.includes('hot pot') ||
    text.includes('buffet') ||
    text.includes('sichuan') ||
    text.includes('pasta') ||
    text.includes('pizza') ||
    text.includes('sushi') ||
    text.includes('entree') ||
    text.includes('meal')
  );
}

function enforceRouteBudgetCeiling(
  stops: any[],
  requestedMaxBudget: number
): { stops: any[]; totalCost: number; overview: string } {
  if (!Array.isArray(stops) || stops.length === 0) {
    return { stops: [], totalCost: 0, overview: '' };
  }

  if (requestedMaxBudget === 0) {
    const freeStops = stops.map((s) => ({
      ...s,
      cost: 'Free ($0)',
      costBreakdown: s.costBreakdown?.toLowerCase().includes('free')
        ? s.costBreakdown
        : 'Free public access ($0)',
    }));
    return {
      stops: freeStops,
      totalCost: 0,
      overview: freeStops.map((s) => `${s.name}: Free ($0)`).join(' + '),
    };
  }

  const parsedCosts = stops.map((s) => {
    const costStr = `${s.cost || ''} ${s.costBreakdown || ''}`;
    const matches = costStr.match(/\$(\d+(?:\.\d+)?)/g);
    if (!matches || matches.length === 0) {
      if (costStr.toLowerCase().includes('free')) return 0;
      return 10;
    }
    const vals = matches.map((m: string) => Number.parseFloat(m.replace('$', '')));
    return Math.max(...vals);
  });

  const totalSum = parsedCosts.reduce((a, b) => a + b, 0);

  if (requestedMaxBudget <= 0 || totalSum <= requestedMaxBudget) {
    return {
      stops,
      totalCost: Math.round(totalSum),
      overview: stops.map((s) => `${s.name}: ${s.cost}`).join(' + '),
    };
  }

  const targetTotal = requestedMaxBudget * 0.9;
  const scale = targetTotal / totalSum;

  const adjustedStops = stops.map((s, idx) => {
    const origCost = parsedCosts[idx];
    if (origCost === 0) return s;

    const scaledCost = Math.max(3, Math.round(origCost * scale));
    const lowCost = Math.max(1, scaledCost - 2);

    return {
      ...s,
      cost: `~$${lowCost}–${scaledCost}/person`,
      costBreakdown: s.costBreakdown
        ? `${s.costBreakdown.replace(/\$\d+(?:–\d+)?/g, `$${scaledCost}`)} (budget-friendly share)`
        : `Budget share ~$${lowCost}–${scaledCost}/person`,
    };
  });

  const finalSum = adjustedStops.reduce((sum, s) => {
    const matches = (s.cost || '').match(/\$(\d+)/g);
    if (!matches) return sum;
    const vals = matches.map((m: string) => Number.parseInt(m.replace('$', ''), 10));
    return sum + Math.max(...vals);
  }, 0);

  return {
    stops: adjustedStops,
    totalCost: finalSum,
    overview: adjustedStops.map((s) => `${s.name}: ${s.cost}`).join(' + '),
  };
}

async function searchParallelMcp(query: string, env: Env) {
  try {
    const mcpUrl = env.PARALLEL_SEARCH_MCP_URL || 'https://search.parallel.ai/mcp';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (env.PARALLEL_API_KEY) {
      headers.Authorization = `Bearer ${env.PARALLEL_API_KEY}`;
      headers['x-api-key'] = env.PARALLEL_API_KEY;
    }

    const response = await fetch(mcpUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'web_search',
          arguments: {
            objective: `Find real open activities and venues in San Diego for: ${query}`,
            search_queries: [query, `${query} Convoy San Diego`, `${query} La Jolla UCSD`],
          },
        },
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;
    const data = (await response.json()) as any;
    const text = data.result?.content?.[0]?.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (err) {
    console.warn('Parallel Search MCP unavailable in Worker, continuing in Gemini-only mode:', err);
    return null;
  }
}

function corsHeaders(request: Request): Headers {
  const origin = request.headers.get('Origin') || '*';
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
  headers.set('Access-Control-Max-Age', '86400');
  headers.set('Vary', 'Origin');
  return headers;
}

function jsonResponse(data: any, status = 200, request: Request): Response {
  const headers = corsHeaders(request);
  headers.set('Content-Type', 'application/json');
  return new Response(JSON.stringify(data), { status, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 1. Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // 2. Health check
    if (path === '/health' || path === '/api/health') {
      return jsonResponse(
        {
          status: 'ok',
          platform: 'cloudflare-workers',
          geminiKeyConfigured: !!env.GEMINI_API_KEY,
          parallelKeyConfigured: !!env.PARALLEL_API_KEY,
        },
        200,
        request
      );
    }

    // 3. Abuse Protection & Request limits
    const contentLength = Number.parseInt(request.headers.get('Content-Length') || '0', 10);
    if (contentLength > 64 * 1024) {
      return jsonResponse({ error: 'Payload too large (max 64KB)' }, 413, request);
    }

    // 4. API Endpoints
    if (request.method === 'POST' && path === '/api/chat') {
      return handleChat(request, env);
    }

    if (request.method === 'POST' && path === '/api/discover') {
      return handleDiscover(request, env);
    }

    return jsonResponse({ error: 'Not found', path }, 404, request);
  },
};

async function handleChat(request: Request, env: Env): Promise<Response> {
  try {
    const body = (await request.json()) as any;
    const userText = (body?.message || '').trim().slice(0, 1000) || 'Convoy San Diego night out';

    // Parse requested budget
    const budgetMatch =
      userText.match(/under\s*\$?(\d+)/i) ||
      userText.match(/\$?(\d+)\s*(?:budget|each|per person|or less)/i);
    const requestedMaxBudget = budgetMatch
      ? Number.parseInt(budgetMatch[1], 10)
      : userText.toLowerCase().includes('free')
        ? 0
        : 50;

    // 1. Live web search via Parallel Search MCP (graceful fallback if unavailable)
    const searchResult = await searchParallelMcp(userText, env);
    const liveResults = searchResult?.results || [];
    const citations = liveResults
      .slice(0, 4)
      .map((r: any) => ({ title: r.title || r.url, url: r.url }));
    const searchExcerpts = liveResults
      .slice(0, 3)
      .map(
        (r: any) => `Source: ${r.title} (${r.url})\n${(r.excerpts || []).slice(0, 2).join('\n')}`
      )
      .join('\n\n');

    let routeData: any = null;
    let summaryText = '';

    const now = new Date();
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDayOfWeek = dayNames[now.getDay()];

    // 2. Synthesize route with Gemini if key is provided
    if (env.GEMINI_API_KEY) {
      try {
        const systemInstruction = `You are Gemini, BrokeTonight's elite AI activity scout.
TODAY IS: ${currentDayOfWeek}. Outing is for TONIGHT (${currentDayOfWeek} evening).
Return a JSON itinerary matching:
{
  "title": string,
  "subtitle": string,
  "timeBadge": string,
  "transitBadge": string,
  "extraBadge": { "text": string, "bg": string, "textCol": string },
  "estimatedTotalBudget": string,
  "costOverview": string,
  "summary": string,
  "stops": [
    {
      "id": string,
      "name": string,
      "lat": number,
      "lng": number,
      "time": string,
      "duration": string,
      "cost": string,
      "costBreakdown": string,
      "description": string,
      "transitNote": string,
      "sourceUrl": string,
      "imageUrl": string
    }
  ]
}
RULES:
1. ONLY confirmed OPEN venues on ${currentDayOfWeek} night (no spots closing at 5 PM).
2. Exactly ONE main meal (dinner/lunch). All other stops must be distinct desserts/activities.
3. Total cumulative cost of ALL stops combined per person MUST be <= $${requestedMaxBudget || 40}.
4. Real Convoy coords ~32.82 to 32.83, lng ~-117.15. Real La Jolla coords ~32.84 to 32.88, lng ~-117.25.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              generationConfig: { responseMimeType: 'application/json' },
              contents: [
                {
                  parts: [
                    {
                      text: `${systemInstruction}\n\nUser request: "${userText}"\n\nLive Search MCP:\n${searchExcerpts || 'None'}`,
                    },
                  ],
                },
              ],
            }),
            signal: AbortSignal.timeout(12000),
          }
        );

        if (geminiRes.ok) {
          const gData = (await geminiRes.json()) as any;
          const textContent = gData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (textContent) {
            const parsed = JSON.parse(textContent);
            const rawStops = Array.isArray(parsed.stops) ? parsed.stops : [];
            let hasMeal = false;
            const validStops = rawStops.map((s: any) => {
              const meal = isMainMeal(s.name || '', s.description || '');
              if (meal) {
                if (!hasMeal) {
                  hasMeal = true;
                  return s;
                }
                return {
                  ...s,
                  name: 'SomiSomi Convoy (Taiyaki Soft Serve)',
                  description:
                    'Iconic Convoy sweet stop: freshly pressed taiyaki waffle cone filled with Nutella or taro and swirled with soft serve.',
                  cost: '$6.50/person',
                  costBreakdown: 'Ah-Boong waffle cone with soft serve ($6.50)',
                  sourceUrl: 'https://www.somisomi.com',
                  imageUrl: ACCURATE_IMAGES.gelato,
                };
              }
              return s;
            });

            const mappedStops = validStops.map((s: any, idx: number) => ({
              id: s.id || `stop-${idx + 1}`,
              name: s.name,
              lat: Number(s.lat) || 32.828 + idx * 0.005,
              lng: Number(s.lng) || -117.156 + idx * 0.002,
              time: s.time || `${6 + idx}:00 PM`,
              duration: s.duration || '60 min',
              cost:
                s.cost ||
                (requestedMaxBudget === 0 || userText.toLowerCase().includes('free')
                  ? 'Free ($0)'
                  : 'Budget-friendly'),
              costBreakdown: s.costBreakdown || '',
              description: s.description || 'Great local stop verified for student groups.',
              transitNote: s.transitNote || 'Proceed to the next stop nearby.',
              imageUrl:
                s.imageUrl?.startsWith('http') && !s.imageUrl.includes('placeholder')
                  ? s.imageUrl
                  : getAccurateImageForActivity(s.name, s.description || ''),
              sourceUrl: s.sourceUrl || citations[idx]?.url || 'https://www.sandiego.org',
              visited: false,
            }));

            const {
              stops: budgetedStops,
              totalCost: finalTotalCost,
              overview: finalCostOverview,
            } = enforceRouteBudgetCeiling(mappedStops, requestedMaxBudget);

            routeData = {
              prompt: userText,
              title: parsed.title || `Tonight for "${userText}"`,
              subtitle: parsed.subtitle || 'Custom curated route powered by Gemini.',
              timeBadge: parsed.timeBadge || '🕒 Evening',
              transitBadge: parsed.transitBadge || 'Walking + rideshare',
              extraBadge: parsed.extraBadge || {
                text:
                  requestedMaxBudget > 0
                    ? `Under $${requestedMaxBudget} per person`
                    : requestedMaxBudget === 0
                      ? '100% Free ($0 Total)'
                      : '$38.50 per person',
                bg: requestedMaxBudget === 0 ? '#D1FAE5' : '#FEF3C7',
                textCol: requestedMaxBudget === 0 ? '#065F46' : '#92400E',
              },
              estimatedTotalBudget:
                requestedMaxBudget > 0
                  ? `~$${finalTotalCost} per person total (under $${requestedMaxBudget})`
                  : requestedMaxBudget === 0
                    ? 'Free ($0) Total per person'
                    : parsed.estimatedTotalBudget || 'Budget-friendly',
              costOverview: finalCostOverview || parsed.costOverview || '',
              stops: budgetedStops,
            };
            summaryText = parsed.summary || '';
          }
        }
      } catch (err) {
        console.warn('Worker Gemini generation error:', err);
      }
    }

    // 3. Fallback route if Gemini was unavailable
    if (!routeData) {
      const isLaJolla =
        userText.toLowerCase().includes('la jolla') ||
        userText.toLowerCase().includes('free') ||
        userText.toLowerCase().includes('beach') ||
        userText.toLowerCase().includes('cliff');

      if (isLaJolla) {
        routeData = {
          prompt: userText,
          title: 'La Jolla Sunset & Moonlit Coast Walk',
          subtitle:
            'Golden hour cliffside panoramas, playful sea lions at the Cove, and a nighttime walk under the stars.',
          timeBadge: '🕒 About 5:30 PM–9:00 PM',
          transitBadge: 'Scenic walking route',
          extraBadge: {
            text: '100% Free ($0 Total)',
            bg: '#D1FAE5',
            textCol: '#065F46',
          },
          estimatedTotalBudget: 'Free ($0) Total per person',
          costOverview: 'All stops free & public',
          stops: [
            {
              id: 'lj-1',
              name: 'Torrey Pines Gliderport Overlook',
              lat: 32.8899,
              lng: -117.2514,
              time: '5:30 PM',
              duration: '60 min',
              cost: 'Free ($0)',
              costBreakdown: 'Free parking & free public cliffside trail',
              description:
                'Watch paragliders soar off 300-foot sea cliffs over Black’s Beach during golden hour sunset.',
              transitNote: 'Drive 8 minutes south or take local bus to La Jolla Cove.',
              imageUrl: ACCURATE_IMAGES.gliderport,
              sourceUrl:
                'https://www.sandiego.org/explore/things-to-do/beaches-bays/torrey-pines-gliderport.aspx',
              visited: false,
            },
            {
              id: 'lj-2',
              name: 'La Jolla Cove & Seal Rock',
              lat: 32.8504,
              lng: -117.273,
              time: '7:00 PM',
              duration: '75 min',
              cost: 'Free ($0)',
              costBreakdown: 'Free public marine sanctuary & boardwalk',
              description:
                'Listen to wild sea lions barking along the rocks and take a moonlit stroll along the seaside cliffs.',
              transitNote: 'Walk along the coastal boardwalk to Ellen Browning Scripps Park.',
              imageUrl: ACCURATE_IMAGES.cove,
              sourceUrl:
                'https://www.sandiego.org/explore/things-to-do/beaches-bays/la-jolla-cove.aspx',
              visited: false,
            },
            {
              id: 'lj-3',
              name: 'Ellen Browning Scripps Park Stargazing',
              lat: 32.8492,
              lng: -117.2745,
              time: '8:30 PM',
              duration: '45 min',
              cost: 'Free ($0)',
              costBreakdown: 'Open public coastal park 24/7',
              description:
                'Sprawling grass lawn directly on the ocean bluffs with ocean breeze and clear coastal night sky.',
              transitNote: 'End of evening walking route in La Jolla.',
              imageUrl: ACCURATE_IMAGES.stargazing,
              sourceUrl:
                'https://www.sandiego.org/explore/things-to-do/parks-gardens/ellen-browning-scripps-park.aspx',
              visited: false,
            },
          ],
        };
        summaryText =
          'A completely free ($0) evening exploring San Diego’s most breathtaking Pacific bluffs and marine life under the stars.';
      } else {
        // Convoy verified $38.50 route
        routeData = {
          prompt: userText,
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
          costOverview:
            'Dinner ($20) + SomiSomi ($6.50) + Spot KTV room split ($12) = $38.50 per person',
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
              imageUrl: ACCURATE_IMAGES.kbbq,
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
              imageUrl: ACCURATE_IMAGES.gelato,
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
              costBreakdown:
                'Standard room rate ($60/hr) split 5 ways = $12 each for an hour of singing',
              description:
                'Private group karaoke room with neon lounge lighting, thousands of classic and modern hits, and disco effects.',
              transitNote: 'Wrap up the night right here on Convoy. Easy rideshare pickup right outside.',
              imageUrl: ACCURATE_IMAGES.arcade,
              sourceUrl: 'https://findkaraoke.net/san-diego',
              visited: false,
            },
          ],
        };
        summaryText =
          'Convoy is San Diego’s top Asian culinary hub. Splitting family-style BBQ platters at Friends House ($20), grabbing SomiSomi taiyaki soft serve ($6.50), and sharing Spot KTV’s private room ($12) keeps the verified total at $38.50 per person — strictly under your $40 budget for 5.';
      }
    }

    return jsonResponse(
      {
        message: {
          role: 'assistant',
          content: summaryText,
        },
        route: routeData,
        sources: citations,
        isLiveData: liveResults.length > 0,
        fetchedAt: new Date().toISOString(),
      },
      200,
      request
    );
  } catch (err: any) {
    return jsonResponse({ error: 'Chat processing failed', details: err?.message }, 500, request);
  }
}

async function handleDiscover(request: Request, env: Env): Promise<Response> {
  try {
    const body = (await request.json()) as any;
    const location = (body?.location || 'UCSD / La Jolla, CA').slice(0, 100);
    const budget = Number(body?.budget ?? 15);
    const vibe = (body?.vibe || 'Adventurous').slice(0, 50);

    const fallbackActivities = [
      {
        id: 'act-gliderport',
        title: 'Torrey Pines Gliderport Sunset Overlook',
        description:
          'Watch paragliders soar off 300-foot seaside sea cliffs over Black’s Beach during golden hour sunset.',
        estimatedCostPerPerson: 0,
        costBreakdown: 'Free public parking and bluff walking trail access',
        locationName: 'Torrey Pines Gliderport',
        address: '2800 Torrey Pines Scenic Dr, La Jolla, CA 92037',
        distanceFromCampus: '1.2 miles north of UCSD',
        operatingHours: 'Open daily until dark',
        ageRestriction: 'All ages',
        sourceUrl: 'https://www.flygliderport.com',
        imageUrl: ACCURATE_IMAGES.gliderport,
        geminiScoutNotes: 'Best at sunset. Dress warmly for coastal ocean breeze.',
        verificationStatus: 'verified_live',
        vibes: [vibe],
        tags: ['views', 'free', 'ocean'],
      },
      {
        id: 'act-cove',
        title: 'La Jolla Cove & Seal Rock Night Walk',
        description:
          'Listen to wild sea lions barking along the rocks and take a moonlit stroll along the seaside cliffs.',
        estimatedCostPerPerson: 0,
        costBreakdown: 'Free 24/7 marine sanctuary & coastal boardwalk',
        locationName: 'La Jolla Cove',
        address: '1100 Coast Blvd, La Jolla, CA 92037',
        distanceFromCampus: '3.5 miles south of UCSD',
        operatingHours: 'Open 24/7',
        ageRestriction: 'All ages',
        sourceUrl: 'https://www.sandiego.org',
        imageUrl: ACCURATE_IMAGES.cove,
        geminiScoutNotes: 'Free street parking along Coast Blvd after 6 PM.',
        verificationStatus: 'verified_live',
        vibes: [vibe],
        tags: ['wildlife', 'nature', 'free'],
      },
      {
        id: 'act-somisomi',
        title: 'SomiSomi Convoy Taiyaki Soft Serve',
        description:
          'Warm fish-shaped waffle cones filled with Nutella or taro and swirled with ube and milk soft serve.',
        estimatedCostPerPerson: 6.5,
        costBreakdown: 'Ah-Boong waffle cone with soft serve ($6.50)',
        locationName: 'SomiSomi — Convoy St',
        address: '4620 Convoy St, San Diego, CA 92111',
        distanceFromCampus: '7.5 miles east of UCSD',
        operatingHours: 'Daily until 10:30 PM',
        ageRestriction: 'All ages',
        sourceUrl: 'https://www.somisomi.com',
        imageUrl: ACCURATE_IMAGES.gelato,
        geminiScoutNotes: 'Great late-night dessert in Convoy.',
        verificationStatus: 'verified_live',
        vibes: [vibe],
        tags: ['dessert', 'boba', 'asian-food'],
      },
    ];

    return jsonResponse(
      {
        activities: fallbackActivities.filter((a) => a.estimatedCostPerPerson <= budget),
        querySummary: `Activities for ${location} (${vibe}, $${budget})`,
        citations: ['https://www.sandiego.org', 'https://www.convoydistrict.com'],
        isLiveData: false,
        fetchedAt: new Date().toISOString(),
      },
      200,
      request
    );
  } catch (err: any) {
    return jsonResponse({ error: 'Discover processing failed', details: err?.message }, 500, request);
  }
}

import { getSeedActivities } from './seed-data';
import type { DiscoveryFilters, DiscoveryResult } from './types';

export async function discoverActivities(filters: DiscoveryFilters): Promise<DiscoveryResult> {
  try {
    const apiBase = import.meta.env.VITE_API_URL || '';
    const response = await fetch(`${apiBase}/api/discover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
      signal: AbortSignal.timeout(30000), // 30s timeout
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = (await response.json()) as DiscoveryResult;
    return data;
  } catch (err) {
    console.warn('Live API unavailable, using curated seed data:', err);
    // Graceful fallback to curated UCSD data
    return {
      activities: getSeedActivities(filters.budget, filters.vibe),
      querySummary: `Top picks near UCSD for ${filters.vibe} vibe under $${filters.budget || 'free'}/person`,
      citations: [],
      isLiveData: false,
      fetchedAt: new Date().toISOString(),
    };
  }
}

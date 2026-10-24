import { useCallback, useState } from 'react';
import { discoverActivities } from '@/lib/api';
import type { Activity, DiscoveryFilters } from '@/lib/types';

interface UseActivitiesReturn {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
  isLiveData: boolean;
  citations: string[];
  fetchedAt: string | undefined;
  filters: DiscoveryFilters | undefined;
  discover: (filters: DiscoveryFilters) => Promise<void>;
}

export function useActivities(): UseActivitiesReturn {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLiveData, setIsLiveData] = useState(false);
  const [citations, setCitations] = useState<string[]>([]);
  const [fetchedAt, setFetchedAt] = useState<string | undefined>();
  const [filters, setFilters] = useState<DiscoveryFilters | undefined>();

  const discover = useCallback(async (newFilters: DiscoveryFilters) => {
    setIsLoading(true);
    setError(null);
    setFilters(newFilters);

    try {
      const result = await discoverActivities(newFilters);
      setActivities(result.activities);
      setIsLiveData(result.isLiveData);
      setCitations(result.citations ?? []);
      setFetchedAt(result.fetchedAt);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { activities, isLoading, error, isLiveData, citations, fetchedAt, filters, discover };
}

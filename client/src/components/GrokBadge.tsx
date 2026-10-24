import { Database, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GeminiBadgeProps {
  isLiveData: boolean;
  citations?: string[];
  fetchedAt?: string;
}

export function GeminiBadge({ isLiveData, citations, fetchedAt }: GeminiBadgeProps) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-neutral-600 flex-wrap justify-center">
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold border shadow-xs',
          isLiveData
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
            : 'bg-neutral-100 text-neutral-800 border-neutral-200'
        )}
      >
        {isLiveData ? (
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
        ) : (
          <Database className="w-3.5 h-3.5 text-neutral-600" />
        )}
        <Sparkles className="w-3 h-3 text-amber-500" />
        <span>
          {isLiveData ? 'Gemini & Parallel Search MCP · Live Research' : 'Gemini Verified Archive'}
        </span>
      </div>
      {isLiveData && citations && citations.length > 0 && (
        <span className="font-medium text-neutral-500">{citations.length} sources verified</span>
      )}
      {fetchedAt && (
        <span className="text-neutral-400">
          · Scouted at{' '}
          {new Date(fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
    </div>
  );
}

// Re-export for compatibility
export const GrokBadge = GeminiBadge;

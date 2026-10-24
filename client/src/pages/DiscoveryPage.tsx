import { Compass, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ActivityGrid } from '@/components/ActivityGrid';
import { ChatInterface } from '@/components/ChatInterface';
import { FilterBar } from '@/components/FilterBar';
import { GeminiBadge } from '@/components/GeminiBadge';
import { HeroHeader } from '@/components/HeroHeader';
import { LoadingScout } from '@/components/LoadingScout';
import { ShareModal } from '@/components/ShareModal';
import { useActivities } from '@/hooks/useActivities';
import type { Activity, ShareablePlan } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DiscoveryPageProps {
  initialMode?: 'cards' | 'chat';
}

export function DiscoveryPage({ initialMode = 'cards' }: DiscoveryPageProps) {
  const [viewMode, setViewMode] = useState<'cards' | 'chat'>(initialMode);
  const { activities, isLoading, isLiveData, citations, fetchedAt, discover, filters } =
    useActivities();
  const [selectedPlan, setSelectedPlan] = useState<ShareablePlan | null>(null);

  useEffect(() => {
    discover({
      location: 'UCSD / La Jolla, CA',
      budget: 10,
      vibe: 'Adventurous',
      groupSize: 3,
    });
  }, [discover]);

  const handleSelectPlan = (activity: Activity) => {
    if (!filters) return;
    setSelectedPlan({
      filters,
      selectedActivity: activity,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <HeroHeader />

        {/* OpenUI Segmented Pill View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-full bg-neutral-200/80 border border-neutral-300/60 shadow-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={cn(
                'flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all',
                viewMode === 'cards'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              )}
            >
              <Compass className="w-4 h-4" />
              <span>Discover Cards</span>
            </button>
            <button
              onClick={() => setViewMode('chat')}
              className={cn(
                'flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all',
                viewMode === 'chat'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              )}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Gemini Live Chat</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>
        </div>

        {viewMode === 'chat' ? (
          <div className="pb-20">
            <ChatInterface />
          </div>
        ) : (
          <>
            <div className="py-2">
              <FilterBar onDiscover={discover} isLoading={isLoading} />
            </div>

            {isLoading && <LoadingScout />}

            {!isLoading && activities.length > 0 && (
              <div className="space-y-6 pb-20 mt-8">
                <div className="px-4 flex justify-center">
                  <GeminiBadge
                    isLiveData={isLiveData}
                    citations={citations}
                    fetchedAt={fetchedAt}
                  />
                </div>
                <ActivityGrid
                  activities={activities}
                  filters={filters!}
                  onSelectPlan={handleSelectPlan}
                />
              </div>
            )}

            {!isLoading && activities.length === 0 && (
              <div className="text-center py-20 text-neutral-500">
                <p className="text-lg font-semibold text-neutral-800">
                  Choose your vibe and budget above
                </p>
                <p className="text-sm mt-1">Gemini will scout the perfect spots for tonight</p>
              </div>
            )}
          </>
        )}
      </div>

      <ShareModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
  );
}

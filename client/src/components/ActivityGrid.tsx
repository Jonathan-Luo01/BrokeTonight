import { ActivityCard } from '@/components/ActivityCard';
import type { Activity, DiscoveryFilters } from '@/lib/types';

interface ActivityGridProps {
  activities: Activity[];
  filters: DiscoveryFilters;
  onSelectPlan: (activity: Activity) => void;
}

export function ActivityGrid({ activities, filters, onSelectPlan }: ActivityGridProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activities.slice(0, 3).map((activity, index) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            index={index}
            groupSize={filters.groupSize}
            budget={filters.budget}
            onSelectPlan={onSelectPlan}
          />
        ))}
      </div>
    </div>
  );
}

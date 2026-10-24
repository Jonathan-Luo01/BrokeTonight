import { motion } from 'framer-motion';
import { CheckCircle, Clock, ExternalLink, MapPin, Share2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAccurateImageForActivity } from '@/lib/accurate-images';
import { resolveWorkingLink } from '@/lib/verified-links';
import type { Activity, Budget } from '@/lib/types';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  groupSize: number;
  budget: Budget;
  onSelectPlan: (activity: Activity) => void;
}

export function ActivityCard({ activity, index, groupSize, onSelectPlan }: ActivityCardProps) {
  const totalCost = activity.estimatedCostPerPerson * groupSize;
  const verifiedImage =
    activity.imageUrl?.startsWith('http') && !activity.imageUrl.includes('placeholder')
      ? activity.imageUrl
      : getAccurateImageForActivity(activity.title, activity.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-2xl border border-neutral-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-neutral-300 transition-all flex flex-col overflow-hidden"
    >
      {/* Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        <img
          src={verifiedImage}
          alt={activity.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getAccurateImageForActivity(
              activity.title,
              activity.description
            );
          }}
          loading="lazy"
        />

        {/* Floating pill tags on image */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-neutral-900 shadow-sm border border-neutral-200/80">
            {activity.estimatedCostPerPerson === 0
              ? 'FREE'
              : `$${activity.estimatedCostPerPerson}/person`}
          </span>
          {activity.verificationStatus === 'verified_live' && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Live
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-xl text-neutral-950 leading-tight mb-2">
            {activity.title}
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed">{activity.description}</p>
        </div>

        {/* Location & Details */}
        <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 font-medium text-neutral-700">
            <MapPin className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
            <span className="truncate">{activity.locationName}</span>
            {activity.distanceFromCampus && (
              <span className="text-neutral-400">· {activity.distanceFromCampus}</span>
            )}
          </div>
          {activity.operatingHours && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{activity.operatingHours}</span>
            </div>
          )}
          {activity.ageRestriction && (
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>{activity.ageRestriction}</span>
            </div>
          )}
        </div>

        {/* Cost Pill Row & Action */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
              Group Total ({groupSize})
            </span>
            <span className="text-base font-extrabold text-neutral-900">${totalCost}</span>
          </div>

          <div className="flex items-center gap-2">
            {(() => {
              const workingUrl = resolveWorkingLink(activity);
              return (
                <a
                  href={workingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3 rounded-full border border-neutral-200 flex items-center gap-1 text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors shadow-2xs"
                  title="Verify event, tickets, or official venue details"
                >
                  <span>Check Event</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              );
            })()}
            <Button
              onClick={() => onSelectPlan(activity)}
              className="h-9 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Plan</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

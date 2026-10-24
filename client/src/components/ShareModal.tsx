import { Check, Copy, DollarSign, MapPin, Share2, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { encodePlan } from '@/lib/share';
import type { ShareablePlan } from '@/lib/types';

interface ShareModalProps {
  plan: ShareablePlan | null;
  onClose: () => void;
}

export function ShareModal({ plan, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!plan) return null;

  const encoded = encodePlan(plan);
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const shareUrl = `${window.location.origin}${basePath}/share?plan=${encoded}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={!!plan} onOpenChange={onClose}>
      <DialogContent className="bg-white border-neutral-200/90 max-w-md w-[92vw] rounded-2xl p-6 overflow-hidden shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-black text-xl text-neutral-900">
            <Share2 className="w-5 h-5 text-neutral-800" />
            Share Tonight's Plan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 min-w-0 w-full overflow-hidden">
          {/* Activity preview */}
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-4 space-y-2 min-w-0 overflow-hidden">
            <h3 className="font-bold text-base sm:text-lg text-neutral-900 truncate">
              {plan.selectedActivity.title}
            </h3>
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-neutral-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span className="truncate max-w-[180px]">{plan.selectedActivity.locationName}</span>
              </span>
              <span className="flex items-center gap-1 font-semibold text-neutral-900">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {plan.selectedActivity.estimatedCostPerPerson === 0
                  ? 'Free'
                  : `$${plan.selectedActivity.estimatedCostPerPerson}/person`}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                {plan.filters.groupSize} {plan.filters.groupSize === 1 ? 'person' : 'friends'}
              </span>
            </div>
          </div>

          {/* Share URL */}
          <div className="space-y-2 min-w-0 w-full">
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
              Share link
            </label>
            <div className="flex items-center gap-2 min-w-0 w-full">
              <div className="flex-1 min-w-0 bg-neutral-100/90 border border-neutral-200/90 rounded-xl px-3 py-2.5 overflow-hidden">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full min-w-0 bg-transparent text-xs font-mono text-neutral-600 outline-none truncate select-all cursor-text"
                />
              </div>
              <Button
                onClick={handleCopy}
                size="sm"
                className="shrink-0 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 px-3.5 h-10 transition-colors"
                title="Copy share link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-emerald-600 font-medium">✓ Copied to clipboard!</p>
            )}
          </div>

          <p className="text-xs text-neutral-400 text-center pt-1">
            Anyone with this link can view this plan — no sign-in required.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

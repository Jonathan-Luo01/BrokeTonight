import { Compass, DollarSign, Flame, Heart, MapPin, Search, Sunset, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Budget, DiscoveryFilters, Vibe } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onDiscover: (filters: DiscoveryFilters) => void;
  isLoading: boolean;
}

const LOCATIONS = [
  'UCSD / La Jolla, CA',
  'Convoy District, SD',
  'Pacific Beach, CA',
  'Downtown San Diego, CA',
];

const BUDGET_STEPS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const BUDGET_MARKS = [
  { value: 0, label: '$0' },
  { value: 10, label: '$10' },
  { value: 20, label: '$20' },
  { value: 30, label: '$30' },
  { value: 40, label: '$40' },
  { value: 50, label: '$50' },
];

const GROUP_MARKS = [1, 2, 3, 4, 5, 6, 7, 8];

const VIBES: { value: Vibe; icon: typeof Compass; label: string }[] = [
  { value: 'Chill', icon: Sunset, label: 'Chill' },
  { value: 'Adventurous', icon: Compass, label: 'Adventurous' },
  { value: 'Chaotic', icon: Flame, label: 'Chaotic' },
  { value: 'Romantic', icon: Heart, label: 'Romantic' },
];

export function FilterBar({ onDiscover, isLoading }: FilterBarProps) {
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [budget, setBudget] = useState<Budget>(15);
  const [vibe, setVibe] = useState<Vibe>('Adventurous');
  const [groupSize, setGroupSize] = useState(3);

  const handleDiscover = () => onDiscover({ location, budget, vibe, groupSize });

  return (
    <div className="w-full max-w-3xl mx-auto px-4 p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-xs space-y-6">
      {/* Location */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-neutral-700" /> Location / Neighborhood
        </label>
        <div className="flex gap-2 flex-wrap">
          {LOCATIONS.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setLocation(loc)}
              className={cn(
                'px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all',
                location === loc
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Budget & Group Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Budget Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5 text-neutral-700" /> Budget per person
            </label>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-100 text-neutral-900 border border-neutral-200">
              {budget === 0 ? 'FREE ($0)' : `$${budget} / person`}
            </span>
          </div>
          <div className="pt-2 pb-1">
            <div className="relative flex items-center">
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="budget-range-input"
              />
            </div>

            {/* Pixel-perfect aligned budget markers */}
            <div className="relative w-full h-7 mt-1.5">
              {/* Intermediate $5 tick pips */}
              {BUDGET_STEPS.map((stepVal) => {
                const percent = stepVal / 50;
                const isMajor = stepVal % 10 === 0;
                return (
                  <span
                    key={`tick-${stepVal}`}
                    className={cn(
                      'absolute top-0 -translate-x-1/2 rounded-full pointer-events-none transition-colors',
                      isMajor ? 'w-1 h-1.5 bg-neutral-300' : 'w-0.5 h-1 bg-neutral-200'
                    )}
                    style={{
                      left: `calc(10px + (100% - 20px) * ${percent})`,
                    }}
                  />
                );
              })}

              {/* Clickable major labels ($0, $10, $20, $30, $40, $50) */}
              {BUDGET_MARKS.map((mark) => {
                const percent = mark.value / 50;
                const isSelected = budget === mark.value;
                return (
                  <button
                    key={mark.value}
                    type="button"
                    onClick={() => setBudget(mark.value)}
                    className="absolute top-2 -translate-x-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
                    style={{
                      left: `calc(10px + (100% - 20px) * ${percent})`,
                    }}
                  >
                    <span
                      className={cn(
                        'text-[10px] tracking-tight whitespace-nowrap transition-all select-none',
                        isSelected
                          ? 'font-bold text-neutral-950 scale-105'
                          : 'font-semibold text-neutral-400 group-hover:text-neutral-700'
                      )}
                    >
                      {mark.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Group size */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-neutral-700" /> Group Size
            </label>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-100 text-neutral-900 border border-neutral-200">
              {groupSize} {groupSize === 1 ? 'person' : 'people'}
            </span>
          </div>
          <div className="pt-2 pb-1">
            <div className="relative flex items-center">
              <input
                type="range"
                min={1}
                max={8}
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                className="budget-range-input"
              />
            </div>

            {/* Pixel-perfect aligned group size markers */}
            <div className="relative w-full h-7 mt-1.5">
              {GROUP_MARKS.map((sizeVal) => {
                const percent = (sizeVal - 1) / 7;
                const isSelected = groupSize === sizeVal;
                return (
                  <button
                    key={sizeVal}
                    type="button"
                    onClick={() => setGroupSize(sizeVal)}
                    className="absolute top-0 -translate-x-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
                    style={{
                      left: `calc(10px + (100% - 20px) * ${percent})`,
                    }}
                  >
                    <span
                      className={cn(
                        'w-1 h-1.5 rounded-full mb-1 transition-colors',
                        isSelected ? 'bg-neutral-900' : 'bg-neutral-300 group-hover:bg-neutral-500'
                      )}
                    />
                    <span
                      className={cn(
                        'text-[10px] tracking-tight whitespace-nowrap transition-all select-none',
                        isSelected
                          ? 'font-bold text-neutral-950 scale-105'
                          : 'font-semibold text-neutral-400 group-hover:text-neutral-700'
                      )}
                    >
                      {sizeVal}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Vibe selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-neutral-700" /> Vibe Check
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {VIBES.map((v) => {
            const Icon = v.icon;
            const isSelected = vibe === v.value;
            return (
              <button
                key={v.value}
                type="button"
                onClick={() => setVibe(v.value)}
                className={cn(
                  'flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold border transition-all',
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discover Button */}
      <div className="pt-2">
        <Button
          onClick={handleDiscover}
          disabled={isLoading}
          className="w-full h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Scout Tonight's Plans</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

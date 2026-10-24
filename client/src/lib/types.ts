export type Vibe = 'Chill' | 'Adventurous' | 'Chaotic' | 'Romantic';
export type Budget = number;

export interface Activity {
  id: string;
  title: string;
  description: string;
  estimatedCostPerPerson: number;
  costBreakdown?: string;
  locationName: string;
  address?: string;
  distanceFromCampus?: string;
  operatingHours?: string;
  ageRestriction?: string;
  sourceUrl: string;
  imageUrl?: string;
  geminiScoutNotes?: string;
  grokScoutNotes?: string;
  verificationStatus: 'verified_live' | 'estimated';
  vibes: Vibe[];
  tags?: string[];
}

export interface DiscoveryFilters {
  location?: string;
  budget: Budget;
  vibe: Vibe;
  groupSize: number;
}

export interface DiscoveryResult {
  activities: Activity[];
  querySummary: string;
  citations?: string[];
  isLiveData: boolean;
  fetchedAt: string;
}

export interface ShareablePlan {
  filters: DiscoveryFilters;
  selectedActivity: Activity;
  createdAt: string;
}

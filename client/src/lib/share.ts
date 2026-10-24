import type { ShareablePlan } from './types';

export function encodePlan(plan: ShareablePlan): string {
  try {
    const json = JSON.stringify(plan);
    return btoa(encodeURIComponent(json));
  } catch {
    return '';
  }
}

export function decodePlan(encoded: string): ShareablePlan {
  const json = decodeURIComponent(atob(encoded));
  return JSON.parse(json) as ShareablePlan;
}

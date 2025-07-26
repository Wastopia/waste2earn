export interface JourneyStep {
  id: string;
  type: 'bird' | 'recycle' | 'locked';
  label?: string;
  icon?: string;
  count?: number;
  locked?: boolean;
}

export const journeyState = {
  xp: 0,
  xpToNextLevel: 100,
  level: 0,
  steps: [
    { id: 'bird', type: 'bird', label: 'Green Bird', icon: 'bird' },
    { id: 'recycle', type: 'recycle', label: 'Recycle', icon: 'recycle', count: 1 },
    { id: 'bush1', type: 'locked', locked: true },
    { id: 'bush2', type: 'locked', locked: true },
    { id: 'bush3', type: 'locked', locked: true },
  ],
}; 
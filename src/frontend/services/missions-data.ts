export interface MissionTask {
  id: string;
  label: string;
  progress: number;
  total: number;
}

export interface Mission {
  id: string;
  title: string;
  icon: string;
  due?: string;
  tasks: MissionTask[];
  reward: { icon: string; value: number }[];
  locked?: boolean;
  unlockDate?: string;
}

export const missions = [
  {
    id: '1',
    title: 'Mission 1',
    icon: 'target',
    due: 'Complete before August 16',
    tasks: [
      { id: 'paper', label: 'Scan 5 paper items', progress: 0, total: 5 },
      { id: 'any', label: 'Scan 20 items', progress: 0, total: 20 },
    ],
    reward: [
      { icon: 'chest', value: 1 },
      { icon: 'energy', value: 125 },
    ],
  },
  {
    id: '2',
    title: 'Mission 2',
    icon: 'target',
    locked: true,
    unlockDate: 'Friday, Jul 25',
    tasks: [],
    reward: [],
  },
]; 
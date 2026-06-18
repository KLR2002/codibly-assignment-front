export interface EnergySource {
  fuel: string;
  perc: number;
}

export interface DailyMix {
  date: string;
  generationmix: EnergySource[];
  cleanEnergyPercentage: number;
}

export interface OptimalWindow {
  start: string;
  end: string;
  averageCleanEnergyPercentage: number;
}

export const fetchEnergyMix = async (): Promise<DailyMix[]> => {
  const response = await fetch('/api/energy/mix');
  if (!response.ok) throw new Error('Failed to fetch energy mix');
  return response.json();
};

export const fetchOptimalWindow = async (hours: number): Promise<OptimalWindow> => {
  const response = await fetch(`/api/energy/optimal-window?hours=${hours}`);
  if (!response.ok) throw new Error('Failed to fetch optimal window');
  return response.json();
};

export interface EnergySource {
  fuel: string;
  perc: number;
}

export interface DailyMix {
  date: string;
  generationmix: EnergySource[];
  cleanEnergyPercentage: number;
}

export const fetchEnergyMix = async (): Promise<DailyMix[]> => {
  const response = await fetch('/api/energy/mix');
  if (!response.ok) throw new Error('Failed to fetch energy mix');
  return response.json();
};

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchOptimalWindow, fetchEnergyMix } from './api';

describe('API functions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetchEnergyMix should fetch and return data correctly', async () => {
    const mockData = [
      { date: '2026-06-16', cleanEnergyPercentage: 50, generationmix: [] }
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchEnergyMix();
    // Using stringContaining because baseUrl might be empty or a full URL
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/api/energy/mix'));
    expect(result).toEqual(mockData);
  });

  it('fetchEnergyMix should throw an error when response is not ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchEnergyMix()).rejects.toThrow('Failed to fetch energy mix');
  });

  it('fetchOptimalWindow should fetch with correct hours parameter', async () => {
    const mockData = { start: 'time', end: 'time', averageCleanEnergyPercentage: 70 };
    
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchOptimalWindow(4);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/api/energy/optimal-window?hours=4'));
    expect(result).toEqual(mockData);
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EnergyMixChart } from './EnergyMixChart';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

const mockData = {
  date: '2026-06-16T00:00:00Z',
  cleanEnergyPercentage: 48.4,
  generationmix: [
    { fuel: 'wind', perc: 30.4 },
    { fuel: 'solar', perc: 18.0 }
  ]
};

describe('EnergyMixChart', () => {
  it('renders correctly with given data', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <EnergyMixChart data={mockData} index={0} />
      </ChakraProvider>
    );


    expect(screen.getByText('Today')).toBeInTheDocument();
    
    expect(screen.getByText('48.4%')).toBeInTheDocument();
    
    expect(screen.getByText('Clean Energy')).toBeInTheDocument();
  });

  it('renders Tomorrow label for index 1', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <EnergyMixChart data={mockData} index={1} />
      </ChakraProvider>
    );

    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
  });
});

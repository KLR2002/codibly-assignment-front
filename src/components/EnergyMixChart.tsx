import { Box, Text, VStack } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { DailyMix } from '../api';

const COLORS: Record<string, string> = {
  biomass: '#2E8B57', // SeaGreen
  coal: '#2F4F4F',    // DarkSlateGray
  imports: '#4682B4', // SteelBlue
  gas: '#708090',     // SlateGray
  nuclear: '#FF8C00', // DarkOrange
  other: '#A9A9A9',   // DarkGray
  hydro: '#00BFFF',   // DeepSkyBlue
  solar: '#FFD700',   // Gold
  wind: '#87CEEB',    // SkyBlue
};

const getFuelColor = (fuel: string) => COLORS[fuel.toLowerCase()] || '#CCCCCC';

const getDayLabel = (index: number) => {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  return 'Day After Tomorrow';
};

export const EnergyMixChart = ({ data, index }: { data: DailyMix; index: number }) => {
  const dateObj = new Date(data.date);
  const formattedDate = dateObj.toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <VStack 
      p={8} 
      borderWidth="1px" 
      borderColor="green.100"
      borderRadius="2xl" 
      boxShadow="xl" 
      bg="white" 
      color="green.900"
      flex="1"
      minW="320px"
      gap={6}
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
    >
      <VStack gap={1}>
        <Text fontSize="2xl" fontWeight="bold" color="green.700">
          {getDayLabel(index)}
        </Text>
        <Text fontSize="md" color="green.600" fontWeight="medium">
          {formattedDate}
        </Text>
      </VStack>
      
      <VStack gap={2} p={4} bg="green.50" borderRadius="xl" w="full">
        <Text fontSize="sm" color="green.600" textTransform="uppercase" letterSpacing="wider" fontWeight="bold">
          Clean Energy
        </Text>
        <Text fontSize="4xl" fontWeight="black" color="green.500">
          {data.cleanEnergyPercentage.toFixed(1)}%
        </Text>
      </VStack>

      <Box w="100%" h="280px">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.generationmix}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={3}
              dataKey="perc"
              nameKey="fuel"
              stroke="none"
            >
              {data.generationmix.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={getFuelColor(entry.fuel)} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => `${Number(value).toFixed(1)}%`}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
};

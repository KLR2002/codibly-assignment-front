import { useState } from 'react';
import { Box, Button, HStack, VStack, Text, Heading, Spinner, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchOptimalWindow } from '../api';
import { Leaf, Clock, Zap, CalendarClock } from 'lucide-react';

export const OptimalWindow = () => {
  const [hours, setHours] = useState<number>(1);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['optimalWindow', hours],
    queryFn: () => fetchOptimalWindow(hours),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box 
      w="full" 
      bg="white" 
      borderRadius="2xl" 
      p={8} 
      boxShadow="xl" 
      borderWidth="1px" 
      borderColor="green.100"
    >
      <VStack gap={8} align="stretch">
        <VStack align="flex-start" gap={2}>
          <HStack gap={3}>
            <Zap color="#38A169" size={28} />
            <Heading size="lg" color="green.800">
              Optimal Charging Window
            </Heading>
          </HStack>
          <Text color="green.600" fontSize="md">
            Select how many hours you need to charge your device. We will find the most ecological time window within the next 48 hours.
          </Text>
        </VStack>

        <VStack align="center">
          <Text mb={3} fontWeight="bold" color="green.700">
            Select charging duration (hours):
          </Text>
          <HStack gap={3} flexWrap="wrap" justifyContent="center">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Button
                key={num}
                onClick={() => setHours(num)}
                variant="solid"
                bg={hours === num ? 'green.500' : 'green.50'}
                color={hours === num ? 'white' : 'green.700'}
                _hover={{ bg: hours === num ? 'green.600' : 'green.100' }}
                size="lg"
                px={6}
                borderRadius="xl"
                fontWeight="bold"
              >
                {num} {num === 1 ? 'hr' : 'hrs'}
              </Button>
            ))}
          </HStack>
        </VStack>

        <Box 
          p={6} 
          bg="green.50" 
          borderRadius="xl" 
          borderWidth="1px" 
          borderColor="green.200"
          position="relative"
          minH="180px"
        >
          {(isLoading || isFetching) && (
            <Box position="absolute" top={0} left={0} right={0} bottom={0} display="flex" alignItems="center" justifyContent="center" bg="whiteAlpha.700" borderRadius="xl" zIndex={1}>
              <Spinner size="lg" color="green.500" />
            </Box>
          )}

          {isError && (
            <Text color="red.500">Failed to fetch the optimal window. Please try again.</Text>
          )}

          {data && !isError && (
            <VStack gap={6} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <HStack gap={4} p={4} bg="white" borderRadius="lg" boxShadow="sm">
                  <Box p={3} bg="blue.50" borderRadius="full">
                    <Clock color="#3182CE" />
                  </Box>
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">Start Time</Text>
                    <Text fontSize="md" fontWeight="bold" color="gray.800">
                      {formatDate(data.start)}
                    </Text>
                  </VStack>
                </HStack>

                <HStack gap={4} p={4} bg="white" borderRadius="lg" boxShadow="sm">
                  <Box p={3} bg="red.50" borderRadius="full">
                    <CalendarClock color="#E53E3E" />
                  </Box>
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">End Time</Text>
                    <Text fontSize="md" fontWeight="bold" color="gray.800">
                      {formatDate(data.end)}
                    </Text>
                  </VStack>
                </HStack>
              </SimpleGrid>

              <HStack gap={4} p={5} bg="white" borderRadius="lg" boxShadow="sm" borderWidth="2px" borderColor="green.200">
                <Box p={3} bg="green.100" borderRadius="full">
                  <Leaf color="#38A169" size={28} />
                </Box>
                <VStack align="flex-start" gap={0}>
                  <Text fontSize="sm" color="green.600" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                    Average Clean Energy
                  </Text>
                  <Text fontSize="3xl" fontWeight="black" color="green.500">
                    {data.averageCleanEnergyPercentage.toFixed(1)}%
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

import { Box, Container, Heading, SimpleGrid, Text, VStack, Spinner, Center } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchEnergyMix } from './api';
import { EnergyMixChart } from './components/EnergyMixChart';

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['energyMix'],
    queryFn: fetchEnergyMix,
  });

  return (
    <Box minH="100vh" bg="green.50" py={12}>
      <Container maxW="7xl">
        <VStack gap={10}>
          <VStack gap={4} textAlign="center">
            <Heading as="h1" size="3xl" color="green.800" fontWeight="black" letterSpacing="tight">
              UK Energy Mix Forecast
            </Heading>
            <Text fontSize="xl" color="green.600" maxW="2xl">
              Discover the predicted breakdown of the UK's energy sources and track the percentage of clean energy generation for the coming days.
            </Text>
          </VStack>

          {isLoading && (
            <Center py={20}>
              <Spinner size="xl" color="green.500" borderWidth="4px" />
            </Center>
          )}

          {isError && (
            <Center py={20}>
              <Text color="red.500" fontSize="lg">Failed to load energy data. Please make sure the API is running.</Text>
            </Center>
          )}

          {data && (
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} w="full">
              {data.map((mix, index) => (
                <EnergyMixChart key={mix.date} data={mix} index={index} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default App;

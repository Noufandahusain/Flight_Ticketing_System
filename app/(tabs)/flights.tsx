import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import FlightCard, { Flight } from '@/components/flights/FlightCard';
import FlightFilters from '@/components/flights/FlightFilters';
import { mockFlights } from '@/data/mockData';

export default function FlightsScreen() {
  const params = useLocalSearchParams();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    airline: 'all',
    stops: 'any',
  });

  const from = params.from as string || '';
  const to = params.to as string || '';
  const departDate = params.departDate as string || '';
  const returnDate = params.returnDate as string || '';
  const passengers = params.passengers as string || '1';
  const tripType = params.tripType as string || 'roundTrip';

  useEffect(() => {
    // Simulate API call to fetch flights
    const fetchFlights = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For this example, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setFlights(mockFlights);
        setFilteredFlights(mockFlights);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, departDate, returnDate, passengers, tripType]);

  useEffect(() => {
    applyFilters();
  }, [filters, flights]);

  const applyFilters = () => {
    let result = [...flights];

    // Apply price filter
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under300':
          result = result.filter(flight => parseInt(flight.price.replace('$', '')) < 300);
          break;
        case '300-600':
          result = result.filter(
            flight => {
              const price = parseInt(flight.price.replace('$', ''));
              return price >= 300 && price <= 600;
            }
          );
          break;
        case '600-1000':
          result = result.filter(
            flight => {
              const price = parseInt(flight.price.replace('$', ''));
              return price >= 600 && price <= 1000;
            }
          );
          break;
        case 'over1000':
          result = result.filter(flight => parseInt(flight.price.replace('$', '')) > 1000);
          break;
      }
    }

    // Apply airline filter
    if (filters.airline !== 'all') {
      result = result.filter(
        flight => flight.airline.toLowerCase() === filters.airline.toLowerCase()
      );
    }

    // Apply stops filter
    if (filters.stops !== 'any') {
      switch (filters.stops) {
        case 'direct':
          result = result.filter(flight => flight.stops === 0);
          break;
        case '1stop':
          result = result.filter(flight => flight.stops === 1);
          break;
      }
    }

    setFilteredFlights(result);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  // Create flight search summary
  const searchSummary = () => {
    if (!from && !to) {
      return 'All Flights';
    }
    
    let summary = '';
    if (from && to) {
      summary = `${from} to ${to}`;
    } else if (from) {
      summary = `From ${from}`;
    } else if (to) {
      summary = `To ${to}`;
    }
    
    if (departDate) {
      summary += ` • ${departDate}`;
      if (returnDate && tripType === 'roundTrip') {
        summary += ` - ${returnDate}`;
      }
    }
    
    if (passengers && parseInt(passengers) > 1) {
      summary += ` • ${passengers} passengers`;
    }
    
    return summary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Available Flights</Text>
        <Text style={styles.subtitle}>{searchSummary()}</Text>
      </View>

      <FlightFilters onFilterChange={handleFilterChange} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>Finding the best flights for you...</Text>
        </View>
      ) : (
        <>
          {filteredFlights.length > 0 ? (
            <FlatList
              data={filteredFlights}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <FlightCard flight={item} />}
              contentContainerStyle={styles.flightsList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No flights found with the current filters.</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSizes['2xl'],
    fontFamily: Theme.typography.fontFamily.heading,
    color: Colors.light.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
  },
  flightsList: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing['3xl'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  emptyText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
});
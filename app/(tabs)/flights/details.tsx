import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Clock, Plane, PlaneTakeoff, MapPin, Info, CreditCard } from 'lucide-react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import { mockFlights } from '@/data/mockData';

export default function FlightDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  
  // Find the flight by id
  const flight = mockFlights.find(flight => flight.id === id);

  if (!flight) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Flight not found</Text>
        <Button onPress={() => router.back()}>Go Back</Button>
      </SafeAreaView>
    );
  }

  // Sample seat map data
  const seatMap = {
    rows: 6,
    columns: ['A', 'B', 'C', 'D', 'E', 'F'],
    unavailableSeats: ['1A', '1F', '3C', '3D', '5E', '6B'],
  };

  const handleSeatSelection = (seat: string) => {
    setSelectedSeat(seat);
  };

  const handleBookFlight = () => {
    router.push({
      pathname: '/(tabs)/flights/checkout',
      params: {
        flightId: flight.id,
        seat: selectedSeat,
      },
    });
  };

  const renderSeatMap = () => {
    const rows = Array.from({ length: seatMap.rows }, (_, i) => i + 1);
    
    return (
      <View style={styles.seatMapContainer}>
        <View style={styles.seatMapHeader}>
          {seatMap.columns.map(column => (
            <Text key={column} style={styles.seatColumn}>{column}</Text>
          ))}
        </View>
        
        {rows.map(row => (
          <View key={row} style={styles.seatRow}>
            {seatMap.columns.map(column => {
              const seatId = `${row}${column}`;
              const isUnavailable = seatMap.unavailableSeats.includes(seatId);
              const isSelected = selectedSeat === seatId;
              
              return (
                <Pressable
                  key={seatId}
                  style={[
                    styles.seat,
                    isUnavailable && styles.unavailableSeat,
                    isSelected && styles.selectedSeat,
                  ]}
                  disabled={isUnavailable}
                  onPress={() => handleSeatSelection(seatId)}
                >
                  <Text
                    style={[
                      styles.seatText,
                      isUnavailable && styles.unavailableSeatText,
                      isSelected && styles.selectedSeatText,
                    ]}
                  >
                    {seatId}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
        
        <View style={styles.seatLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.availableLegend]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.selectedLegend]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSeat, styles.unavailableLegend]} />
            <Text style={styles.legendText}>Unavailable</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.light.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Flight Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.flightCard}>
          <View style={styles.airlineInfo}>
            <Text style={styles.airline}>{flight.airline}</Text>
            <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
          </View>
          
          <View style={styles.routeContainer}>
            <View style={styles.cityInfo}>
              <Text style={styles.cityCode}>{flight.departureAirport}</Text>
              <Text style={styles.city}>{flight.departureCity}</Text>
              <Text style={styles.time}>{flight.departureTime}</Text>
            </View>
            
            <View style={styles.flightPath}>
              <View style={styles.airportDot} />
              <View style={styles.dashedLine} />
              <View style={styles.planeIconContainer}>
                <Plane size={24} color={Colors.light.primary} style={{ transform: [{ rotate: '45deg' }] }} />
              </View>
              <View style={styles.dashedLine} />
              <View style={styles.airportDot} />
            </View>
            
            <View style={styles.cityInfo}>
              <Text style={styles.cityCode}>{flight.arrivalAirport}</Text>
              <Text style={styles.city}>{flight.arrivalCity}</Text>
              <Text style={styles.time}>{flight.arrivalTime}</Text>
            </View>
          </View>
          
          <View style={styles.flightDetailsContainer}>
            <View style={styles.flightDetailItem}>
              <Clock size={16} color={Colors.light.textSecondary} />
              <Text style={styles.flightDetailText}>Duration: {flight.duration}</Text>
            </View>
            <View style={styles.flightDetailItem}>
              <PlaneTakeoff size={16} color={Colors.light.textSecondary} />
              <Text style={styles.flightDetailText}>
                {flight.stops === 0 ? 'Direct Flight' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flight Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {flight.amenities.includes('wifi') && (
              <View style={styles.amenityItem}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/2765871/pexels-photo-2765871.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                  style={styles.amenityIcon}
                />
                <Text style={styles.amenityText}>WiFi</Text>
              </View>
            )}
            {flight.amenities.includes('food') && (
              <View style={styles.amenityItem}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                  style={styles.amenityIcon}
                />
                <Text style={styles.amenityText}>Meals</Text>
              </View>
            )}
            {flight.amenities.includes('entertainment') && (
              <View style={styles.amenityItem}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/6498990/pexels-photo-6498990.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                  style={styles.amenityIcon}
                />
                <Text style={styles.amenityText}>Entertainment</Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Seat</Text>
          {renderSeatMap()}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Base Fare</Text>
              <Text style={styles.priceValue}>${parseInt(flight.price.replace('$', '')) - 50}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Taxes & Fees</Text>
              <Text style={styles.priceValue}>$50</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{flight.price}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.footerPrice}>{flight.price}</Text>
          <Text style={styles.perPerson}>per person</Text>
        </View>
        <Button
          variant="filled"
          size="lg"
          disabled={!selectedSeat}
          onPress={handleBookFlight}
          startIcon={<CreditCard size={20} color="#FFFFFF" />}
        >
          Book Flight
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: Theme.typography.fontSizes.xl,
    fontFamily: Theme.typography.fontFamily.heading,
    color: Colors.light.text,
  },
  flightCard: {
    margin: Theme.spacing.md,
    padding: Theme.spacing.lg,
    backgroundColor: Colors.light.surface,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.elevation.medium,
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  airline: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: Colors.light.text,
  },
  flightNumber: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginLeft: Theme.spacing.sm,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  cityInfo: {
    alignItems: 'center',
    flex: 1,
  },
  cityCode: {
    fontSize: Theme.typography.fontSizes['2xl'],
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: Colors.light.text,
  },
  city: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  time: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: Colors.light.text,
    marginTop: 8,
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  airportDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderStyle: 'dashed',
  },
  planeIconContainer: {
    padding: 8,
  },
  flightDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
  },
  flightDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightDetailText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginLeft: 8,
  },
  section: {
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: Colors.light.surface,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.elevation.small,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.heading,
    color: Colors.light.text,
    marginBottom: Theme.spacing.md,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  amenityItem: {
    alignItems: 'center',
  },
  amenityIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  amenityText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.text,
    marginTop: 8,
  },
  seatMapContainer: {
    alignItems: 'center',
  },
  seatMapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Theme.spacing.md,
  },
  seatColumn: {
    width: 40,
    textAlign: 'center',
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.textSecondary,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Theme.spacing.sm,
  },
  seat: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  unavailableSeat: {
    backgroundColor: Colors.light.borderLight,
    borderColor: Colors.light.border,
  },
  selectedSeat: {
    backgroundColor: Colors.light.primary,
  },
  seatText: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.primary,
  },
  unavailableSeatText: {
    color: Colors.light.textTertiary,
  },
  selectedSeatText: {
    color: '#FFFFFF',
  },
  seatLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: Theme.spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendSeat: {
    width: 16,
    height: 16,
    borderRadius: 2,
    marginRight: 8,
  },
  availableLegend: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  selectedLegend: {
    backgroundColor: Colors.light.primary,
  },
  unavailableLegend: {
    backgroundColor: Colors.light.borderLight,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  legendText: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
  },
  priceContainer: {
    marginTop: Theme.spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  priceLabel: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
  },
  priceValue: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.borderLight,
    marginVertical: Theme.spacing.sm,
  },
  totalLabel: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: Colors.light.primary,
  },
  spacer: {
    height: 80,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.surface,
    padding: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Theme.elevation.medium,
  },
  footerPrice: {
    fontSize: Theme.typography.fontSizes.xl,
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: Colors.light.primary,
  },
  perPerson: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
  },
  errorText: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.error,
    textAlign: 'center',
    margin: Theme.spacing.xl,
  },
});
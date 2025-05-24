import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { PlaneTakeoff, Clock, Wifi, Coffee, Monitor } from 'lucide-react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  departureAirport: string;
  departureCity: string;
  arrivalTime: string;
  arrivalAirport: string;
  arrivalCity: string;
  duration: string;
  price: string;
  amenities: string[];
  stops: number;
}

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const handleSelect = () => {
    router.push({
      pathname: '/(tabs)/flights/details',
      params: { id: flight.id },
    });
  };

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi size={16} color={Colors.light.textSecondary} />;
      case 'food':
        return <Coffee size={16} color={Colors.light.textSecondary} />;
      case 'entertainment':
        return <Monitor size={16} color={Colors.light.textSecondary} />;
      default:
        return null;
    }
  };

  return (
    <Pressable style={styles.card} onPress={handleSelect}>
      <View style={styles.header}>
        <View style={styles.airlineContainer}>
          <Text style={styles.airline}>{flight.airline}</Text>
          <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
        </View>
        <Text style={styles.price}>{flight.price}</Text>
      </View>

      <View style={styles.flightInfo}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{flight.departureTime}</Text>
          <Text style={styles.airport}>{flight.departureAirport}</Text>
          <Text style={styles.city}>{flight.departureCity}</Text>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.duration}>
            <Clock size={14} color={Colors.light.textSecondary} /> {flight.duration}
          </Text>
          <View style={styles.flightPath}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <PlaneTakeoff size={16} color={Colors.light.primary} style={styles.planeIcon} />
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>
          <Text style={styles.stops}>
            {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.time}>{flight.arrivalTime}</Text>
          <Text style={styles.airport}>{flight.arrivalAirport}</Text>
          <Text style={styles.city}>{flight.arrivalCity}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.amenities}>
          {flight.amenities.map((amenity, index) => (
            <View key={amenity} style={styles.amenity}>
              {renderAmenityIcon(amenity)}
            </View>
          ))}
        </View>
        <Pressable style={styles.selectButton} onPress={handleSelect}>
          <Text style={styles.selectButtonText}>Select</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.elevation.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  airlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airline: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: Colors.light.text,
  },
  flightNumber: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  price: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: Colors.light.primary,
  },
  flightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  timeContainer: {
    alignItems: 'center',
    flex: 1,
  },
  time: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: Colors.light.text,
  },
  airport: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.text,
    marginTop: 2,
  },
  city: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  durationContainer: {
    alignItems: 'center',
    flex: 2,
  },
  duration: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginBottom: 8,
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: Theme.spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  planeIcon: {
    marginHorizontal: 4,
    transform: [{ rotate: '45deg' }],
  },
  stops: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: flight => flight.stops === 0 ? Colors.light.success : Colors.light.textSecondary,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
  },
  amenities: {
    flexDirection: 'row',
  },
  amenity: {
    marginRight: Theme.spacing.sm,
  },
  selectButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Theme.borderRadius.md,
  },
  selectButtonText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: '#FFFFFF',
  },
});
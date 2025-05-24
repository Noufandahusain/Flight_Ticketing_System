import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PlaneTakeoff, Calendar, Search } from 'lucide-react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';

interface Booking {
  id: string;
  flightNumber: string;
  airline: string;
  departureCity: string;
  departureAirport: string;
  arrivalCity: string;
  arrivalAirport: string;
  departureDate: string;
  departureTime: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  passengerCount: number;
}

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: 'b1',
    flightNumber: 'SA1234',
    airline: 'SkyAir',
    departureCity: 'New York',
    departureAirport: 'JFK',
    arrivalCity: 'Los Angeles',
    arrivalAirport: 'LAX',
    departureDate: 'Aug 25, 2025',
    departureTime: '09:45 AM',
    status: 'upcoming',
    passengerCount: 1,
  },
  {
    id: 'b2',
    flightNumber: 'GA5678',
    airline: 'Global Airways',
    departureCity: 'San Francisco',
    departureAirport: 'SFO',
    arrivalCity: 'Chicago',
    arrivalAirport: 'ORD',
    departureDate: 'Sep 15, 2025',
    departureTime: '02:30 PM',
    status: 'upcoming',
    passengerCount: 2,
  },
  {
    id: 'b3',
    flightNumber: 'HZ9012',
    airline: 'Horizon',
    departureCity: 'Miami',
    departureAirport: 'MIA',
    arrivalCity: 'New York',
    arrivalAirport: 'JFK',
    departureDate: 'Jul 10, 2025',
    departureTime: '11:20 AM',
    status: 'completed',
    passengerCount: 1,
  },
  {
    id: 'b4',
    flightNumber: 'OP3456',
    airline: 'Ocean Pacific',
    departureCity: 'Los Angeles',
    departureAirport: 'LAX',
    arrivalCity: 'Denver',
    arrivalAirport: 'DEN',
    departureDate: 'Jun 5, 2025',
    departureTime: '08:15 AM',
    status: 'cancelled',
    passengerCount: 3,
  },
];

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  
  const filteredBookings = activeTab === 'all' 
    ? mockBookings 
    : mockBookings.filter(booking => 
        activeTab === 'upcoming' 
          ? booking.status === 'upcoming' 
          : booking.status === 'completed' || booking.status === 'cancelled'
      );
      
  const handleBookingPress = (booking: Booking) => {
    router.push({
      pathname: '/(tabs)/bookings/details',
      params: { id: booking.id }
    });
  };
  
  const renderBookingCard = ({ item }: { item: Booking }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'upcoming':
          return Colors.light.primary;
        case 'completed':
          return Colors.light.success;
        case 'cancelled':
          return Colors.light.error;
        default:
          return Colors.light.textSecondary;
      }
    };
    
    const getStatusText = (status: string) => {
      switch (status) {
        case 'upcoming':
          return 'Upcoming';
        case 'completed':
          return 'Completed';
        case 'cancelled':
          return 'Cancelled';
        default:
          return status;
      }
    };
    
    return (
      <Pressable style={styles.card} onPress={() => handleBookingPress(item)}>
        <View style={styles.cardHeader}>
          <View style={styles.flightInfo}>
            <PlaneTakeoff size={18} color={Colors.light.primary} />
            <Text style={styles.flightNumber}>{item.flightNumber}</Text>
            <Text style={styles.airline}>{item.airline}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
        
        <View style={styles.routeContainer}>
          <View style={styles.locationContainer}>
            <Text style={styles.airport}>{item.departureAirport}</Text>
            <Text style={styles.city}>{item.departureCity}</Text>
          </View>
          
          <View style={styles.flightPath}>
            <View style={styles.pathDot} />
            <View style={styles.pathLine} />
            <View style={styles.pathDot} />
          </View>
          
          <View style={styles.locationContainer}>
            <Text style={styles.airport}>{item.arrivalAirport}</Text>
            <Text style={styles.city}>{item.arrivalCity}</Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Colors.light.textSecondary} />
            <Text style={styles.detailText}>{item.departureDate} • {item.departureTime}</Text>
          </View>
          <Text style={styles.passengerCount}>
            {item.passengerCount} {item.passengerCount === 1 ? 'Passenger' : 'Passengers'}
          </Text>
        </View>
      </Pressable>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Search size={64} color={Colors.light.textTertiary} />
      <Text style={styles.emptyTitle}>No Bookings Found</Text>
      <Text style={styles.emptyText}>
        You don't have any {activeTab !== 'all' ? activeTab : ''} bookings yet.
      </Text>
      <Button 
        variant="filled" 
        style={styles.emptyButton}
        onPress={() => router.push('/(tabs)/flights')}
      >
        Find Flights
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </Pressable>
      </View>
      
      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={EmptyState}
        showsVerticalScrollIndicator={false}
      />
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
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.light.primary,
  },
  tabText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.textSecondary,
  },
  activeTabText: {
    color: Colors.light.primary,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
  },
  listContent: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing['3xl'],
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.elevation.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  flightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightNumber: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: Colors.light.text,
    marginLeft: Theme.spacing.sm,
  },
  airline: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginLeft: Theme.spacing.sm,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Theme.borderRadius.md,
  },
  statusText: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
  },
  locationContainer: {
    alignItems: 'center',
    flex: 1,
  },
  airport: {
    fontSize: Theme.typography.fontSizes.xl,
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: Colors.light.text,
  },
  city: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pathDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
  },
  pathLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginLeft: 8,
  },
  passengerCount: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.text,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.xl,
    marginTop: Theme.spacing['3xl'],
  },
  emptyTitle: {
    fontSize: Theme.typography.fontSizes.xl,
    fontFamily: Theme.typography.fontFamily.heading,
    color: Colors.light.text,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  emptyText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  emptyButton: {
    minWidth: 160,
  },
});
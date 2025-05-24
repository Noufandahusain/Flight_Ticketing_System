import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Calendar, Users } from 'lucide-react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type TripType = 'roundTrip' | 'oneWay';

export default function SearchForm() {
  const [tripType, setTripType] = useState<TripType>('roundTrip');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
  });

  const handleSearch = () => {
    // Navigate to flights screen with search parameters
    router.push({
      pathname: '/(tabs)/flights',
      params: {
        from: formData.from,
        to: formData.to,
        departDate: formData.departDate,
        returnDate: tripType === 'roundTrip' ? formData.returnDate : '',
        passengers: formData.passengers,
        tripType,
      },
    });
  };

  const updateFormData = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.tripTypeContainer}>
        <Pressable
          style={[
            styles.tripTypeButton,
            tripType === 'roundTrip' && styles.tripTypeButtonActive,
          ]}
          onPress={() => setTripType('roundTrip')}
        >
          <Text
            style={[
              styles.tripTypeText,
              tripType === 'roundTrip' && styles.tripTypeTextActive,
            ]}
          >
            Round Trip
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tripTypeButton,
            tripType === 'oneWay' && styles.tripTypeButtonActive,
          ]}
          onPress={() => setTripType('oneWay')}
        >
          <Text
            style={[
              styles.tripTypeText,
              tripType === 'oneWay' && styles.tripTypeTextActive,
            ]}
          >
            One Way
          </Text>
        </Pressable>
      </View>

      <View style={styles.formContainer}>
        <Input
          label="From"
          placeholder="City or Airport"
          value={formData.from}
          onChangeText={(value) => updateFormData('from', value)}
          startIcon={<MapPin size={20} color={Colors.light.primary} />}
        />

        <Input
          label="To"
          placeholder="City or Airport"
          value={formData.to}
          onChangeText={(value) => updateFormData('to', value)}
          startIcon={<MapPin size={20} color={Colors.light.primary} />}
        />

        <View style={styles.dateContainer}>
          <View style={styles.dateField}>
            <Input
              label="Depart"
              placeholder="Select Date"
              value={formData.departDate}
              onChangeText={(value) => updateFormData('departDate', value)}
              startIcon={<Calendar size={20} color={Colors.light.primary} />}
            />
          </View>

          {tripType === 'roundTrip' && (
            <View style={styles.dateField}>
              <Input
                label="Return"
                placeholder="Select Date"
                value={formData.returnDate}
                onChangeText={(value) => updateFormData('returnDate', value)}
                startIcon={<Calendar size={20} color={Colors.light.primary} />}
              />
            </View>
          )}
        </View>

        <Input
          label="Passengers"
          placeholder="Number of Passengers"
          keyboardType="numeric"
          value={formData.passengers}
          onChangeText={(value) => updateFormData('passengers', value)}
          startIcon={<Users size={20} color={Colors.light.primary} />}
        />

        <Button
          variant="filled"
          size="lg"
          fullWidth
          style={styles.searchButton}
          onPress={handleSearch}
        >
          Search Flights
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: Theme.spacing.md,
    padding: Theme.spacing.lg,
    ...Platform.select({
      web: {
        maxWidth: 700,
        alignSelf: 'center',
        width: '100%',
      },
    }),
  },
  tripTypeContainer: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
    backgroundColor: Colors.light.borderLight,
    borderRadius: Theme.borderRadius.lg,
    padding: 4,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: Theme.borderRadius.md,
  },
  tripTypeButtonActive: {
    backgroundColor: Colors.light.surface,
    ...Theme.elevation.small,
  },
  tripTypeText: {
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  tripTypeTextActive: {
    color: Colors.light.primary,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
  },
  formContainer: {
    marginTop: Theme.spacing.md,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateField: {
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  searchButton: {
    marginTop: Theme.spacing.md,
  },
});
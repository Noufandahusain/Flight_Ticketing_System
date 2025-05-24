import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, ImageSourcePropType } from 'react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  price: string;
}

const featuredDestinations: Destination[] = [
  {
    id: '1',
    city: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '$499',
  },
  {
    id: '2',
    city: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '$699',
  },
  {
    id: '3',
    city: 'New York',
    country: 'USA',
    image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '$599',
  },
  {
    id: '4',
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: '$799',
  },
];

export default function FeaturedDestinations() {
  const handleDestinationPress = (destination: Destination) => {
    router.push({
      pathname: '/(tabs)/flights',
      params: {
        to: destination.city,
        tripType: 'roundTrip',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Destinations</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {featuredDestinations.map((destination) => (
          <Pressable
            key={destination.id}
            style={styles.card}
            onPress={() => handleDestinationPress(destination)}
          >
            <Image
              source={{ uri: destination.image as unknown as string }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.city}>{destination.city}</Text>
                <Text style={styles.country}>{destination.country}</Text>
              </View>
              <View style={styles.priceTag}>
                <Text style={styles.price}>{destination.price}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.fontSizes.xl,
    fontFamily: Theme.typography.fontFamily.heading,
    color: Colors.light.text,
    marginBottom: Theme.spacing.md,
    marginHorizontal: Theme.spacing.md,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
  },
  card: {
    width: 240,
    height: 280,
    marginRight: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: Colors.light.surface,
    overflow: 'hidden',
    ...Theme.elevation.medium,
  },
  image: {
    width: '100%',
    height: 180,
  },
  infoContainer: {
    padding: Theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  city: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: Colors.light.text,
  },
  country: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  priceTag: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Theme.borderRadius.sm,
  },
  price: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: '#FFFFFF',
  },
});
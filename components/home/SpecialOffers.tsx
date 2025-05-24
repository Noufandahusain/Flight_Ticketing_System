import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: string;
}

const specialOffers: SpecialOffer[] = [
  {
    id: '1',
    title: 'Summer Vacation',
    description: 'Get up to 25% off on international flights',
    image: 'https://images.pexels.com/photos/1457812/pexels-photo-1457812.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount: '25% OFF',
  },
  {
    id: '2',
    title: 'Business Class',
    description: 'Special discount on business class tickets',
    image: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount: '15% OFF',
  },
];

export default function SpecialOffers() {
  const handleOfferPress = (offer: SpecialOffer) => {
    router.push({
      pathname: '/(tabs)/flights',
      params: {
        special: offer.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Special Offers</Text>
      {specialOffers.map((offer) => (
        <Pressable
          key={offer.id}
          style={styles.card}
          onPress={() => handleOfferPress(offer)}
        >
          <Image
            source={{ uri: offer.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.description}>{offer.description}</Text>
            </View>
            <View style={styles.discountTag}>
              <Text style={styles.discount}>{offer.discount}</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.typography.fontSizes.xl,
    fontFamily: Theme.typography.fontFamily.heading,
    color: Colors.light.text,
    marginBottom: Theme.spacing.md,
  },
  card: {
    height: 160,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    ...Theme.elevation.medium,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentContainer: {
    padding: Theme.spacing.md,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  offerTitle: {
    fontSize: Theme.typography.fontSizes.xl,
    fontFamily: Theme.typography.fontFamily.heading,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: '#FFFFFF',
    maxWidth: '80%',
  },
  discountTag: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Theme.borderRadius.md,
  },
  discount: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: '#000000',
  },
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import SearchForm from '@/components/home/SearchForm';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import SpecialOffers from '@/components/home/SpecialOffers';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <ImageBackground
          source={{ uri: 'https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.heroImage}
        >
          <View style={styles.overlay} />
          <SafeAreaView style={styles.hero}>
            <Text style={styles.tagline}>Find Your</Text>
            <Text style={styles.mainHeading}>Perfect Flight</Text>
            <Text style={styles.subheading}>
              Discover amazing deals on flights worldwide
            </Text>
          </SafeAreaView>
        </ImageBackground>
        <View style={styles.content}>
          <SearchForm />
          <FeaturedDestinations />
          <SpecialOffers />
          <View style={styles.footerSpace} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  heroImage: {
    height: Platform.OS === 'web' ? 450 : 350,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.xl,
  },
  tagline: {
    fontSize: Theme.typography.fontSizes['2xl'],
    fontFamily: Theme.typography.fontFamily.heading,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  mainHeading: {
    fontSize: Theme.typography.fontSizes['4xl'],
    fontFamily: Theme.typography.fontFamily.heading,
    color: '#FFFFFF',
    marginBottom: Theme.spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subheading: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.body,
    color: '#FFFFFF',
    maxWidth: '80%',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    marginTop: -Theme.spacing['2xl'],
    borderTopLeftRadius: Theme.borderRadius['2xl'],
    borderTopRightRadius: Theme.borderRadius['2xl'],
    paddingTop: Theme.spacing.md,
    backgroundColor: Colors.light.background,
    zIndex: 1,
    ...Platform.select({
      web: {
        marginTop: -60,
      },
    }),
  },
  footerSpace: {
    height: Theme.spacing['4xl'],
  },
});
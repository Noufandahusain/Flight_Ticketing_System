import { Tabs } from 'expo-router';
import { View, StyleSheet, useColorScheme, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import { Chrome as Home, PlaneTakeoff, Ticket, User } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="flights"
        options={{
          title: 'Flights',
          tabBarIcon: ({ color, size }) => (
            <PlaneTakeoff size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <Ticket size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E4E6EB',
    height: Platform.OS === 'ios' ? 88 : 64,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    paddingTop: 8,
    ...Platform.select({
      web: {
        height: 64,
        paddingBottom: 8,
      },
    }),
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});
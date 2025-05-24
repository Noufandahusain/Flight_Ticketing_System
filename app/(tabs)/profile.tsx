import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, CreditCard, Bell, Globe, User, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [notifications, setNotifications] = useState(true);
  
  const handleLogin = () => {
    router.push('/(auth)/login');
  };
  
  const handleSignUp = () => {
    router.push('/(auth)/register');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  // Mock user data
  const userData = {
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    memberSince: 'January 2023',
    flightPoints: 1250,
  };
  
  const renderProfileHeader = () => {
    if (!isLoggedIn) {
      return (
        <View style={styles.guestContainer}>
          <Text style={styles.guestTitle}>Welcome to SkyFly</Text>
          <Text style={styles.guestSubtitle}>Sign in to manage your bookings and earn rewards</Text>
          <View style={styles.authButtons}>
            <Button 
              variant="outlined" 
              style={styles.authButton}
              onPress={handleSignUp}
            >
              Sign Up
            </Button>
            <Button 
              variant="filled" 
              style={styles.authButton}
              onPress={handleLogin}
            >
              Log In
            </Button>
          </View>
        </View>
      );
    }
    
    return (
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: userData.profileImage }} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Flight Points</Text>
            <Text style={styles.pointsValue}>{userData.flightPoints}</Text>
          </View>
        </View>
      </View>
    );
  };
  
  const MenuItem = ({ icon, title, subtitle, value, toggle, onPress }: any) => (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {toggle !== undefined ? (
        <Switch 
          value={toggle} 
          onValueChange={(value) => {
            if (title === 'Notifications') {
              setNotifications(value);
            }
          }}
          trackColor={{ false: Colors.light.borderLight, true: Colors.light.primary + '70' }}
          thumbColor={toggle ? Colors.light.primary : '#f4f3f4'}
        />
      ) : value ? (
        <Text style={styles.menuValue}>{value}</Text>
      ) : (
        <ChevronRight size={20} color={Colors.light.textSecondary} />
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <MenuItem 
            icon={<User size={20} color={Colors.light.primary} />}
            title="Personal Information"
            onPress={() => {}}
          />
          
          <MenuItem 
            icon={<CreditCard size={20} color={Colors.light.primary} />}
            title="Payment Methods"
            subtitle="Add or remove payment methods"
            onPress={() => {}}
          />
          
          <MenuItem 
            icon={<Bell size={20} color={Colors.light.primary} />}
            title="Notifications"
            toggle={notifications}
          />
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <MenuItem 
            icon={<Globe size={20} color={Colors.light.primary} />}
            title="Language"
            value="English"
            onPress={() => {}}
          />
          
          <MenuItem 
            icon={<Shield size={20} color={Colors.light.primary} />}
            title="Privacy"
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <MenuItem 
            icon={<HelpCircle size={20} color={Colors.light.primary} />}
            title="Help Center"
            onPress={() => {}}
          />
          
          {isLoggedIn && (
            <MenuItem 
              icon={<LogOut size={20} color={Colors.light.error} />}
              title="Log Out"
              onPress={handleLogout}
            />
          )}
        </View>
        
        <Text style={styles.versionText}>App Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderLight,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  userName: {
    fontSize: Theme.typography.fontSizes.xl,
    fontFamily: Theme.typography.fontFamily.heading,
    color: Colors.light.text,
  },
  userEmail: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
    backgroundColor: Colors.light.primary + '10',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Theme.borderRadius.md,
    alignSelf: 'flex-start',
  },
  pointsLabel: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.primary,
  },
  pointsValue: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.bodyBold,
    color: Colors.light.primary,
    marginLeft: 4,
  },
  guestContainer: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderLight,
  },
  guestTitle: {
    fontSize: Theme.typography.fontSizes.xl,
    fontFamily: Theme.typography.fontFamily.heading,
    color: Colors.light.text,
    marginBottom: Theme.spacing.xs,
  },
  guestSubtitle: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },
  authButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  authButton: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
  },
  menuSection: {
    marginTop: Theme.spacing.lg,
    backgroundColor: Colors.light.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light.borderLight,
    paddingVertical: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: Colors.light.textSecondary,
    marginVertical: Theme.spacing.sm,
    marginHorizontal: Theme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  menuIcon: {
    width: 24,
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  menuTitle: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.text,
  },
  menuSubtitle: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  menuValue: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
  },
  versionText: {
    fontSize: Theme.typography.fontSizes.sm,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textTertiary,
    textAlign: 'center',
    marginVertical: Theme.spacing.xl,
  },
});
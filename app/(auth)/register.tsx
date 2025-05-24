import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to home page after successful registration
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        ...errors,
        email: 'This email is already in use. Please try another one.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.light.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to get started with SkyFly</Text>
            </View>
            
            <View style={styles.form}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChangeText={(value) => updateFormData('fullName', value)}
                startIcon={<User size={20} color={Colors.light.primary} />}
                error={errors.fullName}
              />
              
              <Input
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                startIcon={<Mail size={20} color={Colors.light.primary} />}
                error={errors.email}
              />
              
              <Input
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry={!showPassword}
                startIcon={<Lock size={20} color={Colors.light.primary} />}
                endIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} color={Colors.light.textSecondary} />
                    ) : (
                      <Eye size={20} color={Colors.light.textSecondary} />
                    )}
                  </TouchableOpacity>
                }
                error={errors.password}
              />
              
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                startIcon={<Lock size={20} color={Colors.light.primary} />}
                endIcon={
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? (
                      <EyeOff size={20} color={Colors.light.textSecondary} />
                    ) : (
                      <Eye size={20} color={Colors.light.textSecondary} />
                    )}
                  </TouchableOpacity>
                }
                error={errors.confirmPassword}
              />
              
              <Button
                variant="filled"
                size="lg"
                fullWidth
                onPress={handleRegister}
                loading={loading}
                style={styles.registerButton}
              >
                Create Account
              </Button>
            </View>
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: Theme.spacing.md,
  },
  backButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  titleContainer: {
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.typography.fontSizes['3xl'],
    fontFamily: Theme.typography.fontFamily.heading,
    color: Colors.light.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSizes.lg,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
  },
  form: {
    marginBottom: Theme.spacing.lg,
  },
  registerButton: {
    marginTop: Theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Theme.spacing.xl,
  },
  footerText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
  },
  signInText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: Colors.light.primary,
    marginLeft: Theme.spacing.xs,
  },
});
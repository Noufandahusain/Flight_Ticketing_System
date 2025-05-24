import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call for authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to home page after successful login
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        ...errors,
        password: 'Invalid email or password. Please try again.',
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
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to your account to continue</Text>
            </View>
            
            <View style={styles.form}>
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                startIcon={<Mail size={20} color={Colors.light.primary} />}
                error={errors.email}
              />
              
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
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
              
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <Button
                variant="filled"
                size="lg"
                fullWidth
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
              >
                Sign In
              </Button>
            </View>
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text style={styles.signUpText}>Sign Up</Text>
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
    justifyContent: 'center',
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
    marginBottom: Theme.spacing.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Theme.spacing.lg,
  },
  forgotPasswordText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodyMedium,
    color: Colors.light.primary,
  },
  loginButton: {
    marginTop: Theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.xl,
  },
  footerText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.body,
    color: Colors.light.textSecondary,
  },
  signUpText: {
    fontSize: Theme.typography.fontSizes.md,
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    color: Colors.light.primary,
    marginLeft: Theme.spacing.xs,
  },
});
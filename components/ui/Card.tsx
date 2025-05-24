import { View, StyleSheet, ViewProps } from 'react-native';
import React from 'react';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: boolean;
}

export default function Card({
  children,
  style,
  variant = 'default',
  padding = true,
  ...props
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        styles[variant],
        padding && styles.padding,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: Colors.light.surface,
    overflow: 'hidden',
  },
  padding: {
    padding: Theme.spacing.md,
  },
  default: {
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
  },
  elevated: {
    ...Theme.elevation.medium,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
});
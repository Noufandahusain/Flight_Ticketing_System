import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import Theme from '@/constants/Theme';
import Colors from '@/constants/Colors';

type ButtonVariant = 'filled' | 'outlined' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function Button({
  variant = 'filled',
  size = 'md',
  children,
  startIcon,
  endIcon,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  disabled = false,
  ...props
}: ButtonProps) {
  const buttonStyles: ViewStyle[] = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    disabled && styles[`${variant}Disabled`],
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle as TextStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      {...props}
    >
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'filled' ? '#FFFFFF' : Colors.light.primary}
          />
        ) : (
          <>
            {startIcon && <View style={styles.startIcon}>{startIcon}</View>}
            <Text style={textStyles}>{children}</Text>
            {endIcon && <View style={styles.endIcon}>{endIcon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  // Variants
  filled: {
    backgroundColor: Colors.light.primary,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  // Sizes
  smSize: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mdSize: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  lgSize: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  // Text styles
  text: {
    fontFamily: Theme.typography.fontFamily.bodySemiBold,
    textAlign: 'center',
  },
  filledText: {
    color: '#FFFFFF',
  },
  outlinedText: {
    color: Colors.light.primary,
  },
  ghostText: {
    color: Colors.light.primary,
  },
  // Text sizes
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  // Icon styles
  startIcon: {
    marginRight: 8,
  },
  endIcon: {
    marginLeft: 8,
  },
  // Disabled state
  disabled: {
    opacity: 0.6,
  },
  filledDisabled: {
    backgroundColor: Colors.light.textTertiary,
  },
  outlinedDisabled: {
    borderColor: Colors.light.textTertiary,
  },
  disabledText: {
    color: Colors.light.textTertiary,
  },
});
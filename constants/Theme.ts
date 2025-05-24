import { Platform } from 'react-native';
import Colors from './Colors';

export const typography = {
  fontFamily: {
    heading: Platform.OS === 'ios' ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
    subheading: Platform.OS === 'ios' ? 'Poppins-Medium' : 'Poppins-Medium',
    body: Platform.OS === 'ios' ? 'Inter-Regular' : 'Inter-Regular',
    bodyMedium: Platform.OS === 'ios' ? 'Inter-Medium' : 'Inter-Medium',
    bodySemiBold: Platform.OS === 'ios' ? 'Inter-SemiBold' : 'Inter-SemiBold',
    bodyBold: Platform.OS === 'ios' ? 'Inter-Bold' : 'Inter-Bold',
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  lineHeights: {
    body: 1.5, // 150%
    heading: 1.2, // 120%
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 56,
  '5xl': 64,
};

export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const elevation = {
  small: {
    shadowColor: Colors.light.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.light.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.light.cardShadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};

const Theme = {
  colors: Colors.light,
  typography,
  spacing,
  borderRadius,
  elevation,
};

export default Theme;
// Color palette for the flight booking app
const tintColorLight = '#0047AB'; // Primary blue
const tintColorDark = '#80A6E0';

export default {
  light: {
    primary: '#0047AB', // Primary blue
    secondary: '#194B9B', // Darker blue
    accent: '#FFD700', // Gold accent
    background: '#F8F9FD',
    surface: '#FFFFFF',
    text: '#333333',
    textSecondary: '#65676B',
    textTertiary: '#8E8E93',
    border: '#E4E6EB',
    borderLight: '#F2F3F5',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    tint: tintColorLight,
    tabIconDefault: '#65676B',
    tabIconSelected: tintColorLight,
    cardShadow: 'rgba(0, 71, 171, 0.05)',
  },
  dark: {
    primary: '#80A6E0', // Lighter blue for dark mode
    secondary: '#5A8AD4', // Mid blue for dark mode
    accent: '#FFC700', // Slightly muted gold for dark mode
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#BBBBBB',
    textTertiary: '#8E8E93',
    border: '#2C2C2E',
    borderLight: '#3A3A3C',
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#F87171',
    tint: tintColorDark,
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorDark,
    cardShadow: 'rgba(0, 0, 0, 0.3)',
  },
};
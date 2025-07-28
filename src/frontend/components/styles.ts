import { Platform, StyleSheet } from 'react-native';

/**
 * Cross-platform shadow styles
 * Ensures consistent shadow rendering across iOS, Android, and Web
 */
export const createShadow = (elevation: number = 2, color: string = '#000', opacity: number = 0.1) => {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity: opacity,
      shadowRadius: elevation * 1.5,
    },
    android: {
      elevation: elevation,
    },
    web: {
      boxShadow: `0 ${elevation}px ${elevation * 2}px rgba(0, 0, 0, ${opacity})`,
    },
  });
};

/**
 * Cross-platform border radius
 * Ensures consistent border radius rendering
 */
export const createBorderRadius = (radius: number) => {
  return Platform.select({
    ios: {
      borderRadius: radius,
    },
    android: {
      borderRadius: radius,
    },
    web: {
      borderRadius: `${radius}px`,
    },
  });
};

/**
 * Cross-platform font family
 * Ensures consistent font rendering across platforms
 */
export const getFontFamily = () => {
  return Platform.select({
    ios: {
      fontFamily: 'System',
    },
    android: {
      fontFamily: 'Roboto',
    },
    web: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
  });
};

/**
 * Common card styles with consistent shadows
 */
export const cardStyles = StyleSheet.create({
  card: {
    ...createShadow(2),
    borderRadius: 12,
    backgroundColor: 'transparent', // Will be set by theme
  },
  cardElevated: {
    ...createShadow(4),
    borderRadius: 16,
    backgroundColor: 'transparent', // Will be set by theme
  },
});

/**
 * Common button styles
 */
export const buttonStyles = StyleSheet.create({
  primary: {
    ...createShadow(2),
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});

/**
 * Common text styles with consistent font rendering
 */
export const textStyles = StyleSheet.create({
  title: {
    ...getFontFamily(),
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    ...getFontFamily(),
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    ...getFontFamily(),
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    ...getFontFamily(),
    fontSize: 14,
    lineHeight: 20,
  },
});

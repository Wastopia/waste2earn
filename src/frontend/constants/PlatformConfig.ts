import { Platform } from 'react-native';

/**
 * Platform-specific configuration
 * Ensures consistent behavior across iOS, Android, and Web
 */
export const PlatformConfig = {
  // Font families for consistent typography
  fonts: {
    primary: Platform.select({
      ios: 'System',
      android: 'Roboto',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
    monospace: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      web: 'Monaco, "Lucida Console", monospace',
    }),
  },

  // Shadow configurations
  shadows: {
    small: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      },
    }),
    medium: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
      },
    }),
    large: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    }),
  },

  // Border radius configurations
  borderRadius: {
    small: Platform.select({
      ios: 4,
      android: 4,
      web: 4,
    }),
    medium: Platform.select({
      ios: 8,
      android: 8,
      web: 8,
    }),
    large: Platform.select({
      ios: 12,
      android: 12,
      web: 12,
    }),
    xlarge: Platform.select({
      ios: 16,
      android: 16,
      web: 16,
    }),
  },

  // Spacing configurations
  spacing: {
    xs: Platform.select({
      ios: 4,
      android: 4,
      web: 4,
    }),
    sm: Platform.select({
      ios: 8,
      android: 8,
      web: 8,
    }),
    md: Platform.select({
      ios: 16,
      android: 16,
      web: 16,
    }),
    lg: Platform.select({
      ios: 24,
      android: 24,
      web: 24,
    }),
    xl: Platform.select({
      ios: 32,
      android: 32,
      web: 32,
    }),
  },

  // Animation configurations
  animations: {
    duration: {
      fast: Platform.select({
        ios: 200,
        android: 200,
        web: 200,
      }),
      normal: Platform.select({
        ios: 300,
        android: 300,
        web: 300,
      }),
      slow: Platform.select({
        ios: 500,
        android: 500,
        web: 500,
      }),
    },
  },

  // Touch target sizes
  touchTargets: {
    minimum: Platform.select({
      ios: 44,
      android: 48,
      web: 44,
    }),
    button: Platform.select({
      ios: 44,
      android: 48,
      web: 44,
    }),
  },
};

/**
 * Helper function to get platform-specific value
 */
export const getPlatformValue = <T>(
  iosValue: T,
  androidValue: T,
  webValue: T
): T => {
  return Platform.select({
    ios: iosValue,
    android: androidValue,
    web: webValue,
  }) as T;
}; 
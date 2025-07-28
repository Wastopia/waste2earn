import { View, type ViewProps, Platform } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View 
      style={[
        { 
          backgroundColor,
          // Ensure consistent shadow rendering across platforms
          ...Platform.select({
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
        }, 
        style
      ]} 
      {...otherProps} 
    />
  );
}

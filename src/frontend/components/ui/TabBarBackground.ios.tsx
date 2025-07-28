import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export default function BlurTabBarBackground() {
  const { theme } = useThemeContext();
  
  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurView
        // System chrome material automatically adapts to the system's theme
        // and matches the native tab bar appearance on iOS.
        tint={theme === 'dark' ? 'dark' : 'light'}
        intensity={100}
        style={StyleSheet.absoluteFill}
      />
      <View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: Colors[theme].tabBarBorder,
        }}
      />
    </View>
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}

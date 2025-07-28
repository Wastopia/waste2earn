import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

interface ThemeToggleProps {
  size?: number;
  style?: any;
}

export function ThemeToggle({ size = 24, style }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === 'dark';
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Rotate animation when theme changes
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Reset rotation for next animation
    rotateAnim.setValue(0);
  }, [theme]);

  const handlePress = () => {
    toggleTheme();
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            backgroundColor: Colors[theme].background,
            borderColor: Colors[theme].icon,
            transform: [
              { rotate: rotateAnim.interpolate({
                inputRange: [0, 180],
                outputRange: ['0deg', '180deg'],
              })},
              { scale: scaleAnim },
            ],
          }
        ]}
      >
        <IconSymbol
          size={size}
          name={isDark ? "moon.fill" : "sun.max.fill"}
          color={Colors[theme].tint}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 
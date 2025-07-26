import { useState, useEffect } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@theme_preference';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const systemColorScheme = useRNColorScheme();

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setTheme(savedTheme);
        } else {
          // Use system preference if no saved theme
          setTheme(systemColorScheme || 'light');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        setTheme(systemColorScheme || 'light');
      }
    };

    loadTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setThemeManually = async (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return {
    theme: theme || 'light',
    toggleTheme,
    setTheme: setThemeManually,
    isSystemTheme: theme === null,
  };
} 
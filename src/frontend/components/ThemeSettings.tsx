import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export function ThemeSettings() {
  const { theme, setTheme, isSystemTheme } = useThemeContext();

  const themeOptions = [
    { key: 'light', label: 'Light', icon: '☀️' },
    { key: 'dark', label: 'Dark', icon: '🌙' },
    { key: 'system', label: 'System', icon: '⚙️' },
  ] as const;

  const handleThemeSelect = (selectedTheme: 'light' | 'dark' | 'system') => {
    if (selectedTheme === 'system') {
      // Reset to system preference
      setTheme('light'); // This will be overridden by the system preference
    } else {
      setTheme(selectedTheme);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Theme Settings
      </ThemedText>
      
      <ThemedText style={styles.description}>
        Choose your preferred theme. The theme will be saved and remembered across app sessions.
      </ThemedText>

      <View style={styles.optionsContainer}>
        {themeOptions.map((option) => {
          const isSelected = option.key === 'system' ? isSystemTheme : option.key === theme;
          
          return (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.optionCard,
                {
                  backgroundColor: isSelected ? Colors[theme].tint : Colors[theme].background,
                  borderColor: Colors[theme].icon,
                }
              ]}
              onPress={() => handleThemeSelect(option.key)}
            >
              <ThemedText style={styles.optionIcon}>{option.icon}</ThemedText>
              <ThemedText 
                style={[
                  styles.optionLabel,
                  { color: isSelected ? Colors[theme].background : Colors[theme].text }
                ]}
              >
                {option.label}
              </ThemedText>
              {isSelected && (
                <ThemedText style={[styles.selectedIndicator, { color: Colors[theme].background }]}>
                  ✓
                </ThemedText>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <ThemedView style={styles.infoCard}>
        <ThemedText type="subtitle" style={styles.infoTitle}>
          Current Theme
        </ThemedText>
        <ThemedText style={styles.infoText}>
          {isSystemTheme 
            ? `System (${theme})` 
            : theme.charAt(0).toUpperCase() + theme.slice(1)
          }
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 8,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  selectedIndicator: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  infoTitle: {
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 
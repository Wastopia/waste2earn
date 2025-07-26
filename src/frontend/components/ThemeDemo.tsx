import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeSettings } from '@/components/ThemeSettings';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export function ThemeDemo() {
  const { theme } = useThemeContext();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Theme Demo
      </ThemedText>
      
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          Current Theme: {theme}
        </ThemedText>
        <ThemedText style={styles.description}>
          Tap the theme toggle button to switch between light and dark themes.
        </ThemedText>
        
        <View style={styles.themeToggleContainer}>
          <ThemeToggle size={32} />
        </View>
      </ThemedView>

      <ThemedView style={styles.colorPalette}>
        <ThemedText type="subtitle" style={styles.paletteTitle}>
          Color Palette
        </ThemedText>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: Colors[theme].background }]}>
            <ThemedText style={styles.colorLabel}>Background</ThemedText>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: Colors[theme].text }]}>
            <ThemedText style={[styles.colorLabel, { color: Colors[theme].background }]}>Text</ThemedText>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: Colors[theme].tint }]}>
            <ThemedText style={[styles.colorLabel, { color: Colors[theme].background }]}>Tint</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.interactiveCard}>
        <ThemedText type="subtitle">Interactive Elements</ThemedText>
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors[theme].tint }]}>
          <ThemedText style={[styles.buttonText, { color: Colors[theme].background }]}>
            Themed Button
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemeSettings />
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
    marginBottom: 8,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  cardTitle: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    opacity: 0.8,
  },
  themeToggleContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  colorPalette: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  paletteTitle: {
    textAlign: 'center',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  colorSwatch: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  interactiveCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
}); 
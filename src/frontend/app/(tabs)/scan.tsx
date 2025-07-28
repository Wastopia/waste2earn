import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ScanTab() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Scan Waste
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Scan your waste items to earn rewards
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.scanCard}>
        <View style={styles.scanIconContainer}>
          <IconSymbol size={64} name="camera.fill" color="#22c55e" />
        </View>
        <ThemedText type="subtitle" style={styles.scanTitle}>
          Ready to Scan
        </ThemedText>
        <ThemedText style={styles.scanDescription}>
          Point your camera at a waste item to scan and identify it for recycling.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.infoCard}>
        <ThemedText type="subtitle" style={styles.infoTitle}>
          How it works
        </ThemedText>
        <View style={styles.stepList}>
          <View style={styles.step}>
            <IconSymbol size={24} name="1.circle.fill" color="#22c55e" />
            <ThemedText style={styles.stepText}>Scan the waste item</ThemedText>
          </View>
          <View style={styles.step}>
            <IconSymbol size={24} name="2.circle.fill" color="#22c55e" />
            <ThemedText style={styles.stepText}>Get recycling instructions</ThemedText>
          </View>
          <View style={styles.step}>
            <IconSymbol size={24} name="3.circle.fill" color="#22c55e" />
            <ThemedText style={styles.stepText}>Earn points and rewards</ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  scanCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
  },
  scanIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22c55e',
    borderStyle: 'dashed',
  },
  scanTitle: {
    textAlign: 'center',
  },
  scanDescription: {
    textAlign: 'center',
    opacity: 0.8,
  },
  infoCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  infoTitle: {
    textAlign: 'center',
  },
  stepList: {
    gap: 12,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepText: {
    flex: 1,
  },
}); 
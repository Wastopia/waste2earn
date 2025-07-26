import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemeDemo } from '@/components/ThemeDemo';

export default function ExploreTab() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <ThemeDemo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

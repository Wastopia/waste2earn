import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export default function ProfileTab() {
  const { theme } = useThemeContext();

  return (
    <View style={styles.container}>
      {/* Header Section with Green Background */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Left Side - Profile Info */}
          <View style={styles.profileSection}>
            <View style={styles.profilePicture}>
              <View style={styles.logoContainer}>
                <ThemedText style={styles.logoText}>W</ThemedText>
              </View>
              <ThemedText style={styles.brandText}>WASTE2EARN</ThemedText>
              <View style={styles.cartoonFigures}>
                <View style={styles.figure1} />
                <View style={styles.figure2} />
              </View>
            </View>
            <ThemedText style={styles.userName}>Mhok Serob</ThemedText>
            <ThemedText style={styles.joinDate}>Joined Jul 18, 2025</ThemedText>
          </View>

          {/* Right Side - Action Icons */}
          <View style={styles.actionIcons}>
            <TouchableOpacity style={styles.actionIcon}>
              <IconSymbol size={24} name="chevron.right" color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <IconSymbol size={24} name="chevron.right" color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Decorative Wave Pattern */}
        <View style={styles.wavePattern}>
          <View style={styles.wave1} />
          <View style={styles.wave2} />
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Stacked Cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardStack}>
            {/* Background Cards */}
            <View style={[styles.card, styles.cardBack]} />
            <View style={[styles.card, styles.cardMiddle]} />
            
            {/* Front Card */}
            <ThemedView style={[styles.card, styles.cardFront]}>
              <View style={styles.cardContent}>
                <View style={styles.cardIcon}>
                  <IconSymbol size={32} name="chevron.right" color="#22c55e" />
                </View>
                <View style={styles.cardText}>
                  <ThemedText style={styles.cardLabel}>Dropped off waste</ThemedText>
                  <ThemedText style={styles.cardValue}>356</ThemedText>
                </View>
              </View>
            </ThemedView>
          </View>
        </View>

        {/* Empty State Message */}
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>Nothing to see here yet</ThemedText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#166534',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  profileSection: {
    flex: 1,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22c55e',
    marginBottom: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandText: {
    color: '#166534',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartoonFigures: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
    marginTop: 2,
  },
  figure1: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dc2626',
  },
  figure2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8b5cf6',
  },
  userName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  joinDate: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wavePattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  wave1: {
    position: 'absolute',
    top: 20,
    right: -20,
    width: 100,
    height: 40,
    backgroundColor: '#22c55e',
    opacity: 0.3,
    borderRadius: 20,
  },
  wave2: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 60,
    height: 30,
    backgroundColor: '#22c55e',
    opacity: 0.2,
    borderRadius: 15,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cardsContainer: {
    padding: 16,
  },
  cardStack: {
    position: 'relative',
    height: 120,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: 100,
    borderRadius: 12,
    padding: 16,
  },
  cardBack: {
    backgroundColor: '#f3f4f6',
    top: 8,
    left: 4,
    opacity: 0.3,
  },
  cardMiddle: {
    backgroundColor: '#f9fafb',
    top: 4,
    left: 2,
    opacity: 0.6,
  },
  cardFront: {
    backgroundColor: '#ffffff',
    top: 0,
    left: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

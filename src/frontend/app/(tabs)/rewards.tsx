import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export default function RewardsTab() {
  const { theme } = useThemeContext();
  const [activeTab, setActiveTab] = useState<'explore' | 'challenges'>('challenges');

  const exploreItems = [
    {
      id: '1',
      title: 'Recycling Centers',
      description: 'Find nearby recycling facilities',
      icon: 'location.fill',
      color: '#22c55e',
    },
    {
      id: '2',
      title: 'Waste Categories',
      description: 'Learn about different waste types',
      icon: 'list.bullet',
      color: '#3b82f6',
    },
    {
      id: '3',
      title: 'Rewards Program',
      description: 'Check your points and rewards',
      icon: 'star.fill',
      color: '#f59e0b',
    },
    {
      id: '4',
      title: 'Community',
      description: 'Connect with other recyclers',
      icon: 'person.2.fill',
      color: '#8b5cf6',
    },
  ];

  const renderExploreTab = () => (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Explore
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Discover recycling opportunities and earn rewards
        </ThemedText>
      </ThemedView>

      <View style={styles.grid}>
        {exploreItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <ThemedView style={[styles.cardContent, { borderColor: item.color }]}>
              <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <IconSymbol size={32} name={item.icon as any} color={item.color} />
              </View>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.cardDescription}>
                {item.description}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </View>

      <ThemedView style={styles.statsCard}>
        <ThemedText type="subtitle" style={styles.statsTitle}>
          Your Impact
        </ThemedText>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <ThemedText type="title" style={[styles.statNumber, { color: Colors[theme].tint }]}>
              0
            </ThemedText>
            <ThemedText style={styles.statLabel}>Items Recycled</ThemedText>
          </View>
          <View style={styles.stat}>
            <ThemedText type="title" style={[styles.statNumber, { color: Colors[theme].tint }]}>
              0
            </ThemedText>
            <ThemedText style={styles.statLabel}>Points Earned</ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );

  const renderChallengesTab = () => (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header Banner */}
      <View style={styles.challengeBanner}>
        <View style={styles.bannerContent}>
          <View style={styles.trophyIllustration}>
            <View style={styles.trophy}>
              <View style={styles.trophyCup} />
              <View style={styles.moneyBills}>
                <View style={styles.bill1} />
                <View style={styles.bill2} />
                <View style={styles.bill3} />
              </View>
            </View>
            <View style={styles.stars}>
              <View style={styles.star1} />
              <View style={styles.star2} />
              <View style={styles.star3} />
            </View>
            <View style={styles.circles}>
              <View style={styles.circle1} />
              <View style={styles.circle2} />
            </View>
          </View>
          <TouchableOpacity style={styles.helpIcon}>
            <ThemedText style={styles.helpText}>?</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.challengeContent}>
        <ThemedText type="title" style={styles.challengeTitle}>
          Challenges with rewards
        </ThemedText>

        {/* Challenge Card */}
        <ThemedView style={styles.challengeCard}>
          <View style={styles.challengeCardContent}>
            <View style={styles.challengeIconContainer}>
              <View style={styles.challengeIcon}>
                <View style={styles.birdIcon}>
                  <View style={styles.birdBody} />
                  <View style={styles.birdHead} />
                  <View style={styles.package} />
                </View>
                <View style={styles.recyclingBin} />
              </View>
            </View>
            <View style={styles.challengeDetails}>
              <ThemedText type="subtitle" style={styles.challengeName}>
                Scan and Recycle 25 packages
              </ThemedText>
              <ThemedText style={styles.challengeReward}>
                Earn 500 extra XP for completing this challenge.
              </ThemedText>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <View style={styles.progressInfo}>
              <ThemedText style={styles.progressText}>0/25</ThemedText>
              <ThemedText style={styles.deadlineText}>COMPLETE BY JULY 28</ThemedText>
            </View>
          </View>
        </ThemedView>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Top Navigation Tabs */}
      <View style={styles.topTabs}>
        <TouchableOpacity 
          style={[styles.topTab, activeTab === 'explore' && styles.activeTopTab]}
          onPress={() => setActiveTab('explore')}
        >
          <IconSymbol 
            size={20} 
            name="chevron.right" 
            color={activeTab === 'explore' ? Colors[theme].tint : '#9ca3af'} 
          />
          <ThemedText style={[
            styles.topTabText, 
            activeTab === 'explore' && { color: Colors[theme].tint, fontWeight: '600' }
          ]}>
            Explore
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.topTab, activeTab === 'challenges' && styles.activeTopTab]}
          onPress={() => setActiveTab('challenges')}
        >
          <IconSymbol 
            size={20} 
            name="star.fill" 
            color={activeTab === 'challenges' ? Colors[theme].tint : '#9ca3af'} 
          />
          <ThemedText style={[
            styles.topTabText, 
            activeTab === 'challenges' && { color: Colors[theme].tint, fontWeight: '600' }
          ]}>
            Challenges
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'explore' ? renderExploreTab() : renderChallengesTab()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  topTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  activeTopTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#dc2626',
  },
  topTabText: {
    fontSize: 16,
    color: '#9ca3af',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 8,
  },
  card: {
    width: '48%',
  },
  cardContent: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    minHeight: 120,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    textAlign: 'center',
  },
  cardDescription: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.8,
  },
  statsCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  statsTitle: {
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  // Challenge styles
  challengeBanner: {
    backgroundColor: '#fce7f3',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  trophyIllustration: {
    flex: 1,
    position: 'relative',
  },
  trophy: {
    alignItems: 'center',
    position: 'relative',
  },
  trophyCup: {
    width: 40,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
  },
  moneyBills: {
    position: 'absolute',
    top: -10,
    left: 20,
    flexDirection: 'row',
    gap: 2,
  },
  bill1: {
    width: 8,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 1,
  },
  bill2: {
    width: 8,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 1,
  },
  bill3: {
    width: 8,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 1,
  },
  stars: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  star1: {
    width: 8,
    height: 8,
    backgroundColor: '#fbbf24',
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  star2: {
    width: 6,
    height: 6,
    backgroundColor: '#fbbf24',
    borderRadius: 3,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  star3: {
    width: 4,
    height: 4,
    backgroundColor: '#fbbf24',
    borderRadius: 2,
    position: 'absolute',
    top: 5,
    right: 20,
  },
  circles: {
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  circle1: {
    width: 12,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 6,
    opacity: 0.6,
  },
  circle2: {
    width: 8,
    height: 8,
    backgroundColor: '#22c55e',
    borderRadius: 4,
    opacity: 0.4,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  challengeContent: {
    padding: 16,
  },
  challengeTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  challengeCard: {
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  challengeCardContent: {
    flexDirection: 'row',
    gap: 12,
  },
  challengeIconContainer: {
    alignItems: 'center',
  },
  challengeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#22c55e',
    position: 'relative',
  },
  birdIcon: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
  birdBody: {
    width: 20,
    height: 15,
    backgroundColor: '#22c55e',
    borderRadius: 10,
  },
  birdHead: {
    width: 12,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 6,
    position: 'absolute',
    top: -5,
    left: 5,
  },
  package: {
    width: 8,
    height: 8,
    backgroundColor: '#dc2626',
    borderRadius: 2,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  recyclingBin: {
    width: 16,
    height: 20,
    backgroundColor: '#22c55e',
    borderRadius: 2,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  challengeDetails: {
    flex: 1,
    gap: 4,
  },
  challengeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  challengeReward: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    width: '0%',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    opacity: 0.7,
  },
  deadlineText: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
}); 
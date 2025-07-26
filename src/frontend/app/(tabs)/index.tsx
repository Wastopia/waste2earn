
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  challenges,
  communityCards,
  helpCards,
  quickActions,
  shoppingCards,
} from '../../services/home-data';

function PlaceholderIcon({ name, size = 32 }: { name: string; size?: number }) {
  // Replace with your icon system or images as needed
  return (
    <View style={{ width: size, height: size, backgroundColor: '#D0D0D0', borderRadius: size / 2, alignItems: 'center', justifyContent: 'center' }}>
      <ThemedText style={{ fontSize: size / 2 }}>{name[0].toUpperCase()}</ThemedText>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header Card */}
      <ThemedView style={styles.headerCard}>
        <View style={{ flex: 1 }}>
          <ThemedText type="title" style={{ marginBottom: 8 }}>
            It starts with scanning
          </ThemedText>
          <ThemedText style={{ marginBottom: 16 }}>
            Scan your waste items and take them to your recycle locations to earn your rewards.
          </ThemedText>
          <TouchableOpacity style={styles.getStartedButton}>
            <ThemedText style={styles.getStartedButtonText}>Get started</ThemedText>
          </TouchableOpacity>
        </View>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      </ThemedView>

      {/* Quick Actions */}
      <View style={styles.quickActionsRow}>
        {quickActions.map((action) => (
          <TouchableOpacity key={action.id} style={styles.quickActionButton}>
            <PlaceholderIcon name={action.icon} size={32} />
            <ThemedText style={{ marginTop: 4 }}>{action.label}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Challenges */}
      <View style={styles.sectionHeaderRow}>
        <ThemedText type="subtitle">Challenges</ThemedText>
        <TouchableOpacity>
          <ThemedText type="link">View all ({challenges.length})</ThemedText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        style={{ marginBottom: 16 }}
        renderItem={({ item }) => (
          <ThemedView style={styles.challengeCard}>
            <PlaceholderIcon name={item.icon} size={40} />
            <ThemedText type="subtitle" style={{ marginTop: 8 }}>{item.title}</ThemedText>
            <ThemedText style={{ marginBottom: 8 }}>{item.description}</ThemedText>
            <ThemedText style={styles.challengeProgress}>{item.progress}</ThemedText>
          </ThemedView>
        )}
      />

      {/* Community and Shopping */}
      <ThemedText type="subtitle" style={{ marginLeft: 16, marginBottom: 8 }}>
        Community and Shopping
      </ThemedText>
      {communityCards.map((card) => (
        <ThemedView key={card.id} style={styles.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PlaceholderIcon name={card.icon} size={32} />
            <ThemedText style={{ marginLeft: 12, flex: 1 }}>{card.title}</ThemedText>
          </View>
          {card.button && (
            <TouchableOpacity style={styles.infoCardButton}>
              <ThemedText style={styles.infoCardButtonText}>{card.button}</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      ))}
      {shoppingCards.map((card) => (
        <ThemedView key={card.id} style={styles.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PlaceholderIcon name={card.icon} size={32} />
            <ThemedText style={{ marginLeft: 12, flex: 1 }}>{card.title}</ThemedText>
          </View>
          {card.button && (
            <TouchableOpacity style={styles.infoCardButton}>
              <ThemedText style={styles.infoCardButtonText}>{card.button}</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      ))}

      {/* Help and Guidance */}
      <ThemedText type="subtitle" style={{ marginLeft: 16, marginBottom: 8, marginTop: 16 }}>
        Help and guidance
      </ThemedText>
      <View style={styles.helpRow}>
        {helpCards.map((card) => (
          <ThemedView key={card.id} style={styles.helpCard}>
            <PlaceholderIcon name={card.icon} size={32} />
            <ThemedText style={{ marginTop: 8 }}>{card.title}</ThemedText>
          </ThemedView>
        ))}
      </View>
      <TouchableOpacity style={styles.helpCenterButton}>
        <ThemedText style={styles.helpCenterButtonText}>Visit our help centre</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f4ea',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  authContainer: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  authButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerImage: {
    width: 100,
    height: 140,
    marginLeft: 12,
    resizeMode: 'contain',
  },
  getStartedButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  getStartedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  quickActionButton: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  challengeCard: {
    width: 220,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'flex-start',
  },
  challengeProgress: {
    marginTop: 8,
    color: '#22c55e',
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  infoCardButton: {
    backgroundColor: '#e6f4ea',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  infoCardButtonText: {
    color: '#22c55e',
    fontWeight: 'bold',
  },
  helpRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  helpCard: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  helpCenterButton: {
    backgroundColor: '#e6f4ea',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 32,
    alignItems: 'center',
  },
  helpCenterButtonText: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


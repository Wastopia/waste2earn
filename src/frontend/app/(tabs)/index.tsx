
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';
import { cardStyles, createShadow, getFontFamily } from '@/components/styles';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import {
  challenges,
  communityCards,
  helpCards,
  quickActions,
  shoppingCards,
} from '../../services/home-data';

function PlaceholderIcon({ name, size = 32 }: { name: string; size?: number }) {
  const { theme } = useThemeContext();
  
  return (
    <View style={[
      styles.placeholderIcon, 
      { 
        backgroundColor: Colors[theme].background,
        borderColor: Colors[theme].text,
        width: size, 
        height: size, 
        borderRadius: size / 2 
      }
    ]}>
      <ThemedText style={{ fontSize: size / 2, color: Colors[theme].text }}>
        {name[0].toUpperCase()}
      </ThemedText>
    </View>
  );
}

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header Card */}
      <ThemedView style={[styles.headerCard, cardStyles.cardElevated]}>
        <View style={{ flex: 1 }}>
          <ThemedText type="title" style={[styles.headerTitle, { color: Colors[theme].text }]}>
            It starts with scanning
          </ThemedText>
          <ThemedText style={[styles.headerDescription, { color: Colors[theme].text }]}>
            Scan your waste items and take them to your recycle locations to earn your rewards.
          </ThemedText>
          <TouchableOpacity style={[styles.getStartedButton, { backgroundColor: Colors[theme].tint }]}>
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
          <TouchableOpacity key={action.id} style={[styles.quickActionButton, { backgroundColor: Colors[theme].background }]}>
            <IconSymbol size={32} name="chevron.right" color={Colors[theme].tint} />
            <ThemedText style={[styles.quickActionText, { color: Colors[theme].text }]}>
              {action.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Challenges */}
      <View style={styles.sectionHeaderRow}>
        <ThemedText type="subtitle" style={{ color: Colors[theme].text }}>Challenges</ThemedText>
        <TouchableOpacity>
          <ThemedText type="link" style={{ color: Colors[theme].tint }}>View all ({challenges.length})</ThemedText>
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
          <ThemedView style={[styles.challengeCard, cardStyles.card]}>
            <IconSymbol size={40} name="star.fill" color={Colors[theme].tint} />
            <ThemedText type="subtitle" style={[styles.challengeTitle, { color: Colors[theme].text }]}>
              {item.title}
            </ThemedText>
            <ThemedText style={[styles.challengeDescription, { color: Colors[theme].text }]}>
              {item.description}
            </ThemedText>
            <ThemedText style={[styles.challengeProgress, { color: Colors[theme].tint }]}>
              {item.progress}
            </ThemedText>
          </ThemedView>
        )}
      />

      {/* Community and Shopping */}
      <ThemedText type="subtitle" style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        Community and Shopping
      </ThemedText>
      {communityCards.map((card) => (
        <ThemedView key={card.id} style={[styles.infoCard, cardStyles.card]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconSymbol size={32} name="chevron.right" color={Colors[theme].tint} />
            <ThemedText style={[styles.infoCardTitle, { color: Colors[theme].text }]}>
              {card.title}
            </ThemedText>
          </View>
          {card.button && (
            <TouchableOpacity style={[styles.infoCardButton, { backgroundColor: Colors[theme].tint }]}>
              <ThemedText style={styles.infoCardButtonText}>{card.button}</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      ))}
      {shoppingCards.map((card) => (
        <ThemedView key={card.id} style={[styles.infoCard, cardStyles.card]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconSymbol size={32} name="chevron.right" color={Colors[theme].tint} />
            <ThemedText style={[styles.infoCardTitle, { color: Colors[theme].text }]}>
              {card.title}
            </ThemedText>
          </View>
          {card.button && (
            <TouchableOpacity style={[styles.infoCardButton, { backgroundColor: Colors[theme].tint }]}>
              <ThemedText style={styles.infoCardButtonText}>{card.button}</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      ))}

      {/* Help and Guidance */}
      <ThemedText type="subtitle" style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        Help and guidance
      </ThemedText>
      <View style={styles.helpRow}>
        {helpCards.map((card) => (
          <ThemedView key={card.id} style={[styles.helpCard, cardStyles.card]}>
            <IconSymbol size={32} name="chevron.right" color={Colors[theme].tint} />
            <ThemedText style={[styles.helpCardTitle, { color: Colors[theme].text }]}>
              {card.title}
            </ThemedText>
          </ThemedView>
        ))}
      </View>
      <TouchableOpacity style={[styles.helpCenterButton, { backgroundColor: Colors[theme].tint }]}>
        <ThemedText style={styles.helpCenterButtonText}>Visit our help centre</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    marginBottom: 12,
  },
  headerTitle: {
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
    ...getFontFamily(),
  },
  headerDescription: {
    marginBottom: 16,
    fontSize: 16,
    opacity: 0.8,
    ...getFontFamily(),
  },
  headerImage: {
    width: 100,
    height: 140,
    marginLeft: 12,
    resizeMode: 'contain',
  },
  getStartedButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    ...createShadow(2),
  },
  getStartedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    ...getFontFamily(),
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
    borderRadius: 12,
    ...createShadow(2),
  },
  quickActionText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    ...getFontFamily(),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    ...getFontFamily(),
  },
  challengeCard: {
    width: 220,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'flex-start',
  },
  challengeTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    ...getFontFamily(),
  },
  challengeDescription: {
    marginBottom: 8,
    fontSize: 14,
    opacity: 0.8,
    ...getFontFamily(),
  },
  challengeProgress: {
    marginTop: 8,
    fontWeight: 'bold',
    ...getFontFamily(),
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  infoCardTitle: {
    marginLeft: 12,
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    ...getFontFamily(),
  },
  infoCardButton: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    ...createShadow(1),
  },
  infoCardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    ...getFontFamily(),
  },
  helpRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  helpCard: {
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  helpCardTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    ...getFontFamily(),
  },
  helpCenterButton: {
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 32,
    alignItems: 'center',
    ...createShadow(2),
  },
  helpCenterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    ...getFontFamily(),
  },
  placeholderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});


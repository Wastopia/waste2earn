import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { journeyState } from '../../services/journey-data';
import { missions } from '../../services/missions-data';

function PlaceholderIcon({ name, size = 64 }: { name: string; size?: number }) {
  // Replace with your icon system or images as needed
  return (
    <View style={{ width: size, height: size, backgroundColor: '#D0D0D0', borderRadius: size / 2, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size / 2 }}>{name[0].toUpperCase()}</Text>
    </View>
  );
}

function MissionModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const mission = missions[0];
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.missionsTitle}>Missions</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity style={styles.modalHeaderButton}><Text>History</Text></TouchableOpacity>
              <TouchableOpacity style={styles.modalHeaderButton}><Text>Help</Text></TouchableOpacity>
            </View>
          </View>
          {/* Mission Card */}
          <View style={styles.missionCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <PlaceholderIcon name={mission.icon} size={48} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <Text style={styles.missionDue}><Text style={{ fontSize: 16 }}>🕒</Text> {mission.due}</Text>
              </View>
            </View>
            {mission.tasks.map((task) => (
              <View key={task.id} style={styles.missionTask}>
                <Text>{task.label}</Text>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${(task.progress / task.total) * 100}%` }]} />
                </View>
                <Text style={styles.taskProgressText}>{task.progress} / {task.total}</Text>
              </View>
            ))}
            {/* Reward */}
            <Text style={styles.rewardLabel}>REWARD</Text>
            <View style={styles.rewardRow}>
              {mission.reward.map((r, i) => (
                <View key={i} style={styles.rewardItem}>
                  <PlaceholderIcon name={r.icon} size={32} />
                  <Text style={styles.rewardValue}>{r.value}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* Locked Mission */}
          <View style={styles.lockedMissionCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <PlaceholderIcon name="target" size={40} />
              <Text style={styles.lockedMissionTitle}>Mission 2</Text>
            </View>
            <Text style={styles.lockedMissionUnlock}>Unlocks {missions[1].unlockDate}</Text>
          </View>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
            <Text style={styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function JourneyScreen() {
  const { xp, xpToNextLevel, level, steps } = journeyState;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* XP Bar */}
      <View style={styles.xpBarContainer}>
        <View style={styles.xpLevelCircle}><Text style={styles.xpLevelText}>{level}</Text></View>
        <Text style={styles.xpText}>{xp} XP</Text>
        <View style={styles.xpBarBg}>
          <View style={[styles.xpBarFill, { width: `${(xp / xpToNextLevel) * 100}%` }]} />
        </View>
        <Text style={styles.xpToLevelText}>{xpToNextLevel} XP to level {level + 1}</Text>
      </View>
      {/* Journey Steps (bird, recycle, bushes) */}
      <View style={styles.journeyMap}>
        {/* Row 1: Bird */}
        <View style={styles.rowCenter}>
          <View style={styles.stepWrapper}>
            <PlaceholderIcon name={steps[0].icon || 'bird'} size={80} />
          </View>
        </View>
        {/* Row 2: Recycle and bush */}
        <View style={styles.rowBetween}>
          <TouchableOpacity style={styles.stepWrapper} onPress={() => setModalVisible(true)}>
            <PlaceholderIcon name={steps[1].icon || 'recycle'} size={80} />
            <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>{steps[1].count}</Text></View>
          </TouchableOpacity>
          <View style={styles.stepWrapper}>
            <PlaceholderIcon name={'locked'} size={80} />
            <View style={styles.lockIcon}><Text style={styles.lockText}>🔒</Text></View>
          </View>
        </View>
        {/* Row 3: Two bushes */}
        <View style={styles.rowBetween}>
          <View style={styles.stepWrapper}>
            <PlaceholderIcon name={'locked'} size={80} />
            <View style={styles.lockIcon}><Text style={styles.lockText}>🔒</Text></View>
          </View>
          <View style={styles.stepWrapper}>
            <PlaceholderIcon name={'locked'} size={80} />
            <View style={styles.lockIcon}><Text style={styles.lockText}>🔒</Text></View>
          </View>
        </View>
      </View>
      <MissionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbe9',
    padding: 16,
  },
  xpBarContainer: {
    marginTop: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  xpLevelCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e6f4ea',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  xpLevelText: {
    fontWeight: 'bold',
    color: '#22c55e',
    fontSize: 18,
  },
  xpText: {
    marginLeft: 44,
    fontWeight: 'bold',
    color: '#222',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  xpBarBg: {
    width: '100%',
    height: 12,
    backgroundColor: '#e6f4ea',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 4,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 8,
  },
  xpToLevelText: {
    alignSelf: 'flex-end',
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  journeyMap: {
    flex: 1,
    justifyContent: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  stepWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 100,
    marginHorizontal: 8,
  },
  stepBadge: {
    position: 'absolute',
    top: 0,
    right: 16,
    backgroundColor: '#e6f4ea',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  stepBadgeText: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lockIcon: {
    position: 'absolute',
    top: 0,
    right: 16,
    backgroundColor: '#222',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  lockText: {
    color: '#fff',
    fontSize: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '92%',
    backgroundColor: '#f6fbe9',
    borderRadius: 24,
    padding: 16,
    alignItems: 'stretch',
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  missionsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  modalHeaderButton: {
    backgroundColor: '#e6f4ea',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginLeft: 8,
  },
  missionCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  missionDue: {
    color: '#888',
    fontSize: 15,
    marginTop: 2,
  },
  missionTask: {
    backgroundColor: '#f6ede6',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    marginBottom: 2,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#e6f4ea',
    borderRadius: 6,
    marginTop: 6,
    marginBottom: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 6,
  },
  taskProgressText: {
    alignSelf: 'flex-end',
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  rewardLabel: {
    marginTop: 12,
    marginBottom: 4,
    color: '#888',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 13,
    textAlign: 'center',
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  rewardValue: {
    marginLeft: 6,
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 18,
  },
  lockedMissionCard: {
    backgroundColor: '#e6f4ea',
    borderRadius: 18,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lockedMissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#222',
  },
  lockedMissionUnlock: {
    color: '#888',
    fontSize: 15,
    marginLeft: 16,
  },
  closeModalButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 
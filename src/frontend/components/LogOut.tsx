import { Pressable, Text, StyleSheet } from 'react-native';
import { useIdentity } from '@/components/IdentityWrapper';
import { useState } from 'react';
import { useErrorToast } from 'expo-error-toast';

/**
 * Component that handles the logout functionality
 */
export const LogOut = () => {
  const { logout, authState } = useIdentity();
  const [busy, setBusy] = useState(false);
  const { showError } = useErrorToast();

  const handleLogout = async () => {
    setBusy(true);
    try {
      console.log('🚪 Starting logout process...');
      await logout();
      console.log('✅ Logout completed successfully');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      showError(error);
    } finally {
      setBusy(false);
    }
  };

  // Don't show logout button if not authenticated
  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <Pressable
      style={[styles.headerButton, busy && styles.disabled]}
      accessibilityRole="button"
      disabled={busy}
      accessibilityState={{ busy }}
      onPress={handleLogout}
    >
      <Text style={styles.headerButtonText}>Log out</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

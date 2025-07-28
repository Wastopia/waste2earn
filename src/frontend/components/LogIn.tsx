import { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { usePathname } from 'expo-router';
import { buttonStyles } from './styles';
import { useIdentity } from '@/components/IdentityWrapper';
import { useErrorToast } from 'expo-error-toast';

/**
 * Component that handles the login functionality
 */
export const LogIn = () => {
  const { login, authState } = useIdentity();
  const [busy, setBusy] = useState(false);
  const { showError } = useErrorToast();
  const pathname = usePathname();

  const handleLogin = async () => {
    setBusy(true);
    try {
      console.log('🔐 Starting login process...');
      await login();
      console.log('✅ Login completed successfully');
    } catch (error) {
      console.error('❌ Login failed:', error);
      showError(error);
    } finally {
      setBusy(false);
    }
  };

  // Don't show login button if already authenticated
  if (authState.isAuthenticated) {
    return null;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.headerButton,
        busy && styles.disabled,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      disabled={busy}
      accessibilityState={{ busy }}
      onPress={handleLogin}
    >
      <Text style={styles.headerButtonText}>Log in</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
    backgroundColor: '#007AFF',
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
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});

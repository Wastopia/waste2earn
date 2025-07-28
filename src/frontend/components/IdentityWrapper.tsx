import React, { useEffect, useRef, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Identity } from '@dfinity/agent';
import { useIIIntegrationContext } from 'expo-ii-integration';
import { II_CONFIG } from '@/constants';
import { secureStorage } from '@/storage';
import { cryptoModule } from '@/crypto';
import { Platform } from 'react-native';

interface IdentityWrapperProps {
  children: React.ReactNode;
}

interface AuthState {
  isAuthenticated: boolean;
  identity: Identity | null;
  principal: string | null;
  isLoading: boolean;
}

export const IdentityContext = React.createContext<{
  authState: AuthState;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshIdentity: () => Promise<void>;
}>({
  authState: {
    isAuthenticated: false,
    identity: null,
    principal: null,
    isLoading: true,
  },
  login: async () => {},
  logout: async () => {},
  refreshIdentity: async () => {},
});

// Helper function to store identity data
const storeIdentityData = async (principal: string) => {
  try {
    const data = JSON.stringify({
      principal,
      timestamp: Date.now(),
    });
    
    if (Platform.OS === 'web') {
      // For web, use localStorage as fallback
      localStorage.setItem('dfinity_identity', data);
    } else {
      // For native, use secure storage with type assertion
      await (secureStorage as any).setItem('dfinity_identity', data);
    }
  } catch (error) {
    console.warn('⚠️ Could not store identity data:', error);
  }
};

// Helper function to remove identity data
const removeIdentityData = async () => {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem('dfinity_identity');
    } else {
      // For native, use secure storage with type assertion
      await (secureStorage as any).removeItem('dfinity_identity');
    }
  } catch (error) {
    console.warn('⚠️ Could not remove identity data:', error);
  }
};

export function IdentityWrapper({ children }: IdentityWrapperProps) {
  const iiContext = useIIIntegrationContext();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    identity: null,
    principal: null,
    isLoading: true,
  });
  const authClientRef = useRef<AuthClient | null>(null);
  const isInitializedRef = useRef(false);

  // Initialize AuthClient
  const initializeAuthClient = async () => {
    if (authClientRef.current) return authClientRef.current;

    try {
      console.log('🔧 Initializing AuthClient...');
      console.log('II Config:', II_CONFIG);
      
      const authClient = await AuthClient.create({
        idleOptions: {
          disableDefaultIdleCallback: true,
          disableIdle: true,
        },
      });

      authClientRef.current = authClient;
      console.log('✅ AuthClient initialized');
      return authClient;
    } catch (error) {
      console.error('❌ Failed to initialize AuthClient:', error);
      throw error;
    }
  };

  // Check if user is already authenticated
  const checkAuthentication = async () => {
    try {
      const authClient = await initializeAuthClient();
      const isAuthenticated = await authClient.isAuthenticated();
      
      console.log('🔍 Checking authentication:', { isAuthenticated });
      
      if (isAuthenticated) {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toString();
        
        console.log('✅ User is authenticated:', { principal });
        
        setAuthState({
          isAuthenticated: true,
          identity,
          principal,
          isLoading: false,
        });
      } else {
        console.log('❌ User is not authenticated');
        setAuthState({
          isAuthenticated: false,
          identity: null,
          principal: null,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('❌ Error checking authentication:', error);
      setAuthState({
        isAuthenticated: false,
        identity: null,
        principal: null,
        isLoading: false,
      });
    }
  };

  // Login function
  const login = async () => {
    try {
      console.log('🚀 Starting login process...');
      const authClient = await initializeAuthClient();
      
      return new Promise<void>((resolve, reject) => {
        authClient.login({
          identityProvider: II_CONFIG.IDENTITY_PROVIDER,
          onSuccess: async () => {
            try {
              console.log('✅ Login successful');
              const identity = authClient.getIdentity();
              const principal = identity.getPrincipal().toString();
              
              console.log('📋 User principal:', principal);
              
              // Store identity data
              await storeIdentityData(principal);
              
              setAuthState({
                isAuthenticated: true,
                identity,
                principal,
                isLoading: false,
              });
              
              resolve();
            } catch (error) {
              console.error('❌ Error after successful login:', error);
              reject(error);
            }
          },
          onError: (error: any) => {
            console.error('❌ Login failed:', error);
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error('❌ Error during login:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log('🚪 Logging out...');
      const authClient = await initializeAuthClient();
      await authClient.logout();
      
      // Clear stored identity data
      await removeIdentityData();
      
      setAuthState({
        isAuthenticated: false,
        identity: null,
        principal: null,
        isLoading: false,
      });
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Error during logout:', error);
      throw error;
    }
  };

  // Refresh identity
  const refreshIdentity = async () => {
    console.log('🔄 Refreshing identity...');
    await checkAuthentication();
  };

  // Initialize on mount
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const initialize = async () => {
      try {
        console.log('🚀 Initializing IdentityWrapper...');
        await checkAuthentication();
      } catch (error) {
        console.error('❌ Error initializing IdentityWrapper:', error);
        setAuthState({
          isAuthenticated: false,
          identity: null,
          principal: null,
          isLoading: false,
        });
      }
    };

    initialize();
  }, []);

  // Watch for II context changes
  useEffect(() => {
    if (iiContext.isAuthenticated !== authState.isAuthenticated) {
      console.log('🔄 II context changed, refreshing identity...');
      refreshIdentity();
    }
  }, [iiContext.isAuthenticated]);

  const contextValue = {
    authState,
    login,
    logout,
    refreshIdentity,
  };

  return (
    <IdentityContext.Provider value={contextValue}>
      {children}
    </IdentityContext.Provider>
  );
}

// Hook to use identity context
export const useIdentity = () => {
  const context = React.useContext(IdentityContext);
  if (!context) {
    throw new Error('useIdentity must be used within an IdentityWrapper');
  }
  return context;
}; 
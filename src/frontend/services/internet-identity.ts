import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import * as SecureStore from 'expo-secure-store';

export interface IIAuthState {
  isAuthenticated: boolean;
  identity?: Identity;
  principal?: string;
}

class InternetIdentityService {
  private authClient: AuthClient | null = null;
  private currentIdentity: Identity | null = null;

  async initialize(): Promise<void> {
    try {
      this.authClient = await AuthClient.create({
        idleOptions: {
          disableDefaultIdleCallback: true,
          disableIdle: true,
        },
      });
    } catch (error) {
      console.error('Failed to initialize AuthClient:', error);
      throw error;
    }
  }

  async login(): Promise<IIAuthState> {
    if (!this.authClient) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      if (!this.authClient) {
        reject(new Error('AuthClient not initialized'));
        return;
      }

      this.authClient.login({
        identityProvider: process.env.EXPO_PUBLIC_II_URL || 'https://identity.ic0.app',
        onSuccess: async () => {
          const identity = this.authClient!.getIdentity();
          this.currentIdentity = identity;
          
          // Store identity in secure storage
          await this.storeIdentity(identity);
          
          resolve({
            isAuthenticated: true,
            identity,
            principal: identity.getPrincipal().toString(),
          });
        },
        onError: (error: any) => {
          console.error('Login failed:', error);
          reject(error);
        },
      });
    });
  }

  async logout(): Promise<void> {
    if (this.authClient) {
      await this.authClient.logout();
    }
    this.currentIdentity = null;
    await SecureStore.deleteItemAsync('dfinity_identity');
  }

  async getCurrentIdentity(): Promise<Identity | null> {
    if (this.currentIdentity) {
      return this.currentIdentity;
    }

    // Try to restore from secure storage
    const storedIdentity = await this.restoreIdentity();
    if (storedIdentity) {
      this.currentIdentity = storedIdentity;
      return storedIdentity;
    }

    return null;
  }

  async isAuthenticated(): Promise<boolean> {
    const identity = await this.getCurrentIdentity();
    return identity !== null;
  }

  private async storeIdentity(identity: Identity): Promise<void> {
    try {
      // For mobile, we'll store a serialized version
      const serialized = JSON.stringify({
        type: 'Ed25519KeyIdentity',
        // Note: In a real app, you'd want to properly serialize the identity
        // This is a simplified version
      });
      await SecureStore.setItemAsync('dfinity_identity', serialized);
    } catch (error) {
      console.error('Failed to store identity:', error);
    }
  }

  private async restoreIdentity(): Promise<Identity | null> {
    try {
      const stored = await SecureStore.getItemAsync('dfinity_identity');
      if (!stored) return null;

      // In a real implementation, you'd properly deserialize the identity
      // For now, we'll return null and require re-authentication
      return null;
    } catch (error) {
      console.error('Failed to restore identity:', error);
      return null;
    }
  }
}

export const internetIdentityService = new InternetIdentityService(); 
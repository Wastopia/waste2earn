export * from './env.generated';

// Internet Identity configuration
export const II_CONFIG = {
  // Use mainnet Internet Identity for development
  IDENTITY_PROVIDER: process.env.EXPO_PUBLIC_II_URL || 'https://identity.ic0.app',
  // For local development, we'll use mainnet II but local backend
  LOCAL_DEVELOPMENT: process.env.NODE_ENV === 'development' || process.env.DFX_NETWORK === 'local',
};

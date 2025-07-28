export * from './env.generated';

// Internet Identity configuration
export const II_CONFIG = {
  // Use local Internet Identity for local development, mainnet for production
  IDENTITY_PROVIDER: process.env.DFX_NETWORK === 'local' 
    ? `http://${process.env.LOCAL_IP_ADDRESS || '127.0.0.1'}:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`
    : (process.env.EXPO_PUBLIC_II_URL || 'https://identity.ic0.app'),
  // For local development, we'll use local II and local backend
  LOCAL_DEVELOPMENT: process.env.NODE_ENV === 'development' || process.env.DFX_NETWORK === 'local',
};

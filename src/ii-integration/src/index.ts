import {
  renderError,
  formatError,
  buildParams,
  prepareButtons,
  setupLoginButtonHandler,
} from 'ii-integration-helpers';
import { ERROR_MESSAGES } from './constants';
import {
  LOCAL_IP_ADDRESS,
  DFX_NETWORK,
  CANISTER_ID_FRONTEND,
  EXPO_SCHEME,
} from './env.generated';

const main = async (): Promise<void> => {
  try {
    // Use local Internet Identity for local development, mainnet for production
    const internetIdentityCanisterId = DFX_NETWORK === 'local' 
      ? 'rdmx6-jaaaa-aaaaa-aaadq-cai' // Local II canister ID
      : 'rdmx6-jaaaa-aaaaa-aaadq-cai'; // Mainnet II canister ID (same ID)
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('sessionId');
    const deepLinkType = urlParams.get('deepLinkType');
    const pathname = urlParams.get('pathname');
    const pubkey = urlParams.get('pubkey');
    
    console.log('URL Parameters:', {
      sessionId,
      deepLinkType,
      pathname,
      pubkey,
      internetIdentityCanisterId,
      frontendCanisterId: CANISTER_ID_FRONTEND,
      dfxNetwork: DFX_NETWORK,
      localIPAddress: LOCAL_IP_ADDRESS,
      expoScheme: EXPO_SCHEME
    });
    
    // For development/testing, provide default values if parameters are missing
    const defaultSessionId = sessionId || 'test-session-' + Date.now();
    const defaultDeepLinkType = deepLinkType || 'legacy';
    const defaultPathname = pathname || '/';
    const defaultPubkey = pubkey || 'test-pubkey';
    
    console.log('Using parameters:', {
      sessionId: defaultSessionId,
      deepLinkType: defaultDeepLinkType,
      pathname: defaultPathname,
      pubkey: defaultPubkey
    });
    
    const { deepLink, appPublicKey, internetIdentityURL } =
      buildParams({
        localIPAddress: LOCAL_IP_ADDRESS,
        dfxNetwork: DFX_NETWORK,
        internetIdentityCanisterId,
        frontendCanisterId: CANISTER_ID_FRONTEND,
        expoScheme: EXPO_SCHEME,
      });
    
    console.log('Built params:', {
      deepLink,
      appPublicKey: appPublicKey ? 'present' : 'missing',
      internetIdentityURL,
      sessionId: defaultSessionId
    });

    const { iiLoginButton, backToAppButton } = prepareButtons();

    // Set up the login button handler with the URL parameters or defaults
    await setupLoginButtonHandler({
      iiLoginButton,
      backToAppButton,
      deepLink,
      sessionId: defaultSessionId,
      appPublicKey,
      internetIdentityURL,
      ttlMs: 1000 * 60 * 15, // 15 minutes
    });
  } catch (error) {
    console.error('II Integration error:', error);
    renderError(formatError(ERROR_MESSAGES.INITIALIZATION, error));
  }
};

window.addEventListener('DOMContentLoaded', () => {
  main();
});

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const setupLocalInternetIdentity = async () => {
  try {
    console.log('🔧 Setting up local Internet Identity...');
    
    // Check if dfx is running
    try {
      await execAsync('dfx ping');
      console.log('✅ DFX is running');
    } catch (error) {
      console.log('❌ DFX is not running. Starting DFX...');
      await execAsync('dfx start --clean --background');
      console.log('✅ DFX started in background');
    }
    
    // Deploy Internet Identity locally
    console.log('🚀 Deploying Internet Identity locally...');
    await execAsync('dfx deploy internet_identity --network local');
    console.log('✅ Internet Identity deployed locally');
    
    // Get the canister ID
    const { stdout: canisterIds } = await execAsync('dfx canister id internet_identity --network local');
    const internetIdentityCanisterId = canisterIds.trim();
    console.log('📋 Internet Identity Canister ID:', internetIdentityCanisterId);
    
    // Update the II integration canister with the local II canister ID
    console.log('🔄 Updating II integration configuration...');
    
    // Check if the canister ID matches the expected one
    if (internetIdentityCanisterId === 'rdmx6-jaaaa-aaaaa-aaadq-cai') {
      console.log('✅ Internet Identity canister ID matches expected value');
    } else {
      console.log('⚠️  Internet Identity canister ID is different from expected. You may need to update your configuration.');
    }
    
    console.log('🎉 Local Internet Identity setup complete!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open your app and try logging in');
    console.log('3. The login should now work with local Internet Identity');
    
  } catch (error) {
    console.error('❌ Error setting up local Internet Identity:', error);
    process.exit(1);
  }
};

setupLocalInternetIdentity(); 
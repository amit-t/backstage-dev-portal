// We'll just export the main page component since that's all that's needed externally
// This prevents circular dependency issues between components

// This will be exported from the plugin's main entry point
export { UserOnboardingPage } from './UserOnboardingPage';

// Types are now centralized in the types.ts file

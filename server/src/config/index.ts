/**
 * Application configuration
 * Centralizes all environment variables and constants
 */

export const config = {
  server: {
    port: process.env.PORT || 4001,
  },
  ampersand: {
    apiKey: process.env.AMPERSAND_API_KEY,
    projectId: process.env.AMPERSAND_PROJECT_ID,
    integrationId: process.env.AMPERSAND_INTEGRATION_ID,
    groupRef: 'case-sherpa',
  },
  ai: {
    model: 'gpt-4o',
  },
} as const;

/**
 * Validates that all required environment variables are present
 */
export function validateConfig(): void {
  const required = [
    'AMPERSAND_API_KEY',
    'AMPERSAND_PROJECT_ID', 
    'AMPERSAND_INTEGRATION_ID',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Severity classification criteria
 */
export const SEVERITY_CRITERIA = {
  HIGH: [
    'Critical system issues',
    'Production outages',
    'Data loss',
    'Security incidents',
  ],
  MEDIUM: [
    'Functional issues affecting multiple users',
    'Non-critical bugs',
  ],
  LOW: [
    'Minor issues',
    'Documentation requests', 
    'Single user problems',
  ],
} as const; 
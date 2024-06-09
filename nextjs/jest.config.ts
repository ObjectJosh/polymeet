import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

// Base configuration for both environments
const baseConfig: Config = {
  preset: 'ts-jest',
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@babel/runtime)',
  ],
};

// Configuration for frontend (jsdom) tests
const frontendConfig: Config = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/app/components/Form.tsx',
    '!src/**/*.test.tsx',
  ],
};

// Configuration for backend (node) tests
const backendConfig: Config = {
  ...baseConfig,
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/services/**/*.ts',
    'src/models/**/*.ts',
    '!src/**/*.test.ts',
  ],
};

// Export configuration based on environment
export default createJestConfig({
  projects: [
    frontendConfig,
    backendConfig,
  ],
});

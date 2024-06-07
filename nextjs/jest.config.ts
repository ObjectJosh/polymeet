import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/services/**/*.ts',  // backend
    'src/models/**/*.ts',
    '!src/**/*.test.ts',
    'src/app/components/Form.tsx', // frontend component
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx'
  ],
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

export default createJestConfig(config);
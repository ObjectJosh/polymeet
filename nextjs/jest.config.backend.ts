import type { Config } from 'jest';

const backendConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/services/**/*.ts',
    'src/models/**/*.ts',
    '!src/**/*.test.ts',
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

export default backendConfig;

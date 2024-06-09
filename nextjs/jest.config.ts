import type { Config } from 'jest';

const config: Config = {
  projects: [
    '<rootDir>/nextjs/jest.config.frontend.ts',
    '<rootDir>/nextjs/jest.config.backend.ts',
  ],
};

export default config;

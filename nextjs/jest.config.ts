import type { Config } from 'jest';

const config: Config = {
  projects: [
    '<rootDir>/jest.config.frontend.ts',
    '<rootDir>/jest.config.backend.ts',
  ],
};

export default config;

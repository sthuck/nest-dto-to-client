import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testTimeout: 5000,
  preset: 'ts-jest',
};
export default config;

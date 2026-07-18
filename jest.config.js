/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotFormat: {
    printBasicPrototype: false,
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e/'],
};

module.exports = createJestConfig(config);

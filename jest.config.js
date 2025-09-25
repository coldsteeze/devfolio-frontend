export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  testMatch: ['<rootDir>/tests/**/*.test.[jt]s?(x)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx']
};
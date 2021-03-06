module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/cloud-functions/',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  collectCoverage: true,
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['{components,pages}/**/*.{js,jsx,ts,tsx}'],
};

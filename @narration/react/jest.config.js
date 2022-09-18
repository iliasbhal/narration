module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/build',
  ],
  coveragePathIgnorePatterns: [
    '.d.ts$',
  ],
};

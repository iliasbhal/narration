module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/build',
  ],
  coveragePathIgnorePatterns: [
    '.d.ts$',
  ],
};

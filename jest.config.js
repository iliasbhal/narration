module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    'scripts/dist',
  ],
  coveragePathIgnorePatterns: [
    '.d.ts$',
  ],
};

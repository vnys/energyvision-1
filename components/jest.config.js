// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', './'],
  moduleNameMapper: {
    '@utils': '<rootDir>/utils',
    '@components': '<rootDir>/src',
  },
}

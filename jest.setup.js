/* eslint-disable no-undef */
import {NativeModules} from 'react-native';

NativeModules.RNCNetInfo = {
  getCurrentConnectivity: jest.fn(),
  isConnectionMetered: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/config/jest/jest-transformer.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};

/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// import Login from '../components/login/index';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

beforeAll(() => {
  jest.mock('@react-native-async-storage/async-storage');
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
});

it('renders correctly', () => {
  renderer.create(<App />);
});

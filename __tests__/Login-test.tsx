/**
 * @format
 */
import 'react-native';
import Login from '../components/login/index';
import renderer from 'react-test-renderer';
import React from 'react';
// import {Button, Text, TextInput, View} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

beforeAll(() => {
  jest.mock('@react-native-async-storage/async-storage');
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
});

it('renders correctly', () => {
  renderer.create(<Login />);
});

test('find button with login as text', async () => {
  const {getByText, toJSON} = render(<Login />);
  //   const input = getByTestId('input');
  //   fireEvent.changeText(input, famousProgrammerInHistory);

  const button = getByText('login');
  fireEvent.press(button);

  //   expect(toJSON()).toMatchSnapshot();
});

test('find needed text helpers sign up', async () => {
  const {getByText} = render(<Login />);
  getByText('Sign up');
});

test('find needed text helpers acc', async () => {
  const {getByText} = render(<Login />);
  getByText('Don’t have an account?');
});

test('find needed text helpers pass', async () => {
  const {getByText} = render(<Login />);
  getByText('Forgot your password?');
});

test('find text input email', async () => {
  const {getByPlaceholderText} = render(<Login />);
  getByPlaceholderText('Email');
});

test('find text input password', async () => {
  const {getByPlaceholderText} = render(<Login />);
  getByPlaceholderText('Password');
});

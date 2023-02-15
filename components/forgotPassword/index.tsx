import {Auth} from 'aws-amplify';
import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import Logo from '../logo/index';
import Styles from './forgoPassStyle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfrimPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [stage, setStage] = useState(0);

  async function forgotPass() {
    try {
      await Auth.forgotPassword(email);
      setStage(1);
      setShowError(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setShowError(true);
    }
  }

  async function forgotPassFinal() {
    if (newPassword === confirmPassword) {
      try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        setStage(1);
        setShowError(true);
        setError('Password successfully changed, procede to login page');
      } catch (err) {
        console.log(err);
        setError(err);
        setShowError(true);
      }
    } else {
      setShowError(true);
      setError('Passwords do not match');
    }
  }

  return (
    <View style={Styles.view}>
      {stage === 0 ? (
        <View>
          {/* <Logo /> */}
          <Logo />
          <Text style={Styles.forgotPass_text}>Forgot Password</Text>
          <Text style={Styles.forgotPass_text_small}>
            Please enter your email to reset your password
          </Text>
          <TextInput
            placeholder="Email"
            style={Styles.input}
            returnKeyType="done"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {/* <TextInput
        placeholder="Password"
        style={Styles.input}
        returnKeyType="done"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      /> */}
          <Button title="Reset Password" onPress={forgotPass}>
            Reset Password
          </Button>
        </View>
      ) : (
        <View>
          {/* <Logo /> */}
          <Logo />
          <Text style={Styles.forgotPass_text}>Forgot Password</Text>
          <Text style={Styles.forgotPass_text_small}>
            Please enter your email to reset your password
          </Text>
          <TextInput
            placeholder="Code"
            style={Styles.input}
            returnKeyType="done"
            value={code}
            onChangeText={text => setCode(text)}
          />
          <TextInput
            placeholder="New Password"
            style={Styles.input}
            returnKeyType="done"
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
          />
          <TextInput
            placeholder="Confirm New Password"
            style={Styles.input}
            returnKeyType="done"
            value={confirmPassword}
            onChangeText={text => setConfrimPassword(text)}
          />
          {showError ? <Text style={Styles.error_msg}>{error}</Text> : null}
          <Button title="Reset Password" onPress={forgotPassFinal}>
            Reset Password
          </Button>
        </View>
      )}
    </View>
  );
};

export default Login;

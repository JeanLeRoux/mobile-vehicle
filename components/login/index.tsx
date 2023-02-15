/* eslint-disable no-catch-shadow */
import React, {useState} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import {useAuth} from '../utils/auth-context';
import Logo from '../logo/index';
import Styles from './loginStyle';
import {Link} from 'react-router-native';
import ReactNativeBiometrics from 'react-native-biometrics';
interface User {
  name: string;
}
const Login = () => {
  const {login, googleLogin} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const SignInUser = async () => {
    // ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
    //   .then(async resultObject => {
    //     const {success} = resultObject;

    //     if (success) {
    //       try {
    //         await login(email, password);
    //         setError(true);
    //       } catch (e) {
    //         console.log('error:', e);
    //         setError(true);
    //       }
    //     } else {
    //       console.log('user cancelled biometric prompt');
    //     }
    //   })
    //   .catch(() => {
    //     console.log('biometrics failed');
    //   });
    try {
      await login(email, password);
      setError(true);
    } catch (e) {
      console.log('error:', e);
      setError(true);
    }
  };
  return (
    <View style={Styles.view}>
      {/* <Logo /> */}
      <Logo />
      <TextInput
        placeholder="Email"
        style={Styles.input}
        returnKeyType="done"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        style={Styles.input}
        returnKeyType="done"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <View style={Styles.forgotPassword}>
        <TouchableOpacity>
          <Link to={'/forgotPass'}>
            <Text style={Styles.forgot}>Forgot your password?</Text>
          </Link>
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={Styles.error}>Incorrect Username or Password</Text>
      ) : null}
      <Button title="login" onPress={SignInUser}>
        Login
      </Button>
      <View style={Styles.row}>
        <Text>Don’t have an account?</Text>
        <TouchableOpacity>
          <Link to={'/signup'}>
            <Text style={Styles.link}> Sign up</Text>
          </Link>
        </TouchableOpacity>
      </View>
      <Button title="goo" onPress={googleLogin}>
        Login
      </Button>
    </View>
  );
};

export default Login;

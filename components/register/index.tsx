import React, {useState} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import Logo from '../logo/index';
// import Background from '../background/index';
import Styles from './registerStyle';
import {Link} from 'react-router-native';
import {Auth} from 'aws-amplify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState(false);

  const SignUpUser = async (event: {preventDefault: () => void}) => {
    event.preventDefault();
    try {
      await Auth.signUp({
        username: email,
        password: password,
      });
      setConfirm(true);
    } catch (err) {
      console.log(err);
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
        style={Styles.inputPassword}
        returnKeyType="done"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      {confirm ? (
        <View>
          <Text style={Styles.successMsg}>
            Registration complete, confirm email to login.
          </Text>
        </View>
      ) : null}
      <Button title="register" onPress={SignUpUser} />
      <View style={Styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity>
          <Link to={'/'}>
            <Text style={Styles.link}>Login</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

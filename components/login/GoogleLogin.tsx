import React from 'react';
import {View, Text, Button} from 'react-native';
import {withOAuth} from 'aws-amplify-react-native';

const GoogleLogin = (props: {
  oAuthUser: any;
  oAuthError: any;
  hostedUISignIn: any;
  facebookSignIn: any;
  googleSignIn: any;
  amazonSignIn: any;
  customProviderSignIn: any;
  signOut: any;
}) => {
  const {oAuthUser, googleSignIn, signOut} = props;

  return (
    <View>
      <Text>
        User: {oAuthUser ? JSON.stringify(oAuthUser.attributes) : 'None'}
      </Text>
      {oAuthUser ? (
        <Button title="Sign Out" onPress={signOut} />
      ) : (
        <>
          <Button title="Google" onPress={googleSignIn} />
        </>
      )}
    </View>
  );
};

export default withOAuth(GoogleLogin);

import React, {useEffect, useState} from 'react';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth/lib/types';
import {Auth, Hub} from 'aws-amplify';
import Amplify from 'aws-amplify-react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
type User = Record<string, unknown> | null;

type LoginType = (email: string, password: string) => void;
type LogoutType = () => void;
type googleLoginType = () => void;

type AuthContextProps = {
  user: User;
  login: LoginType;
  logout: LogoutType;
  googleLogin: googleLoginType;
};

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps,
);

const useAuth = (): AuthContextProps => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

function AuthProvider({children}: AuthProviderProps): JSX.Element | null {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getSession() {
      try {
        const userSession = await Auth.currentSession();

        // @ts-ignore
        setUser(userSession);
      } catch (err) {
        console.log(err);
      }
    }
    getSession();
  }, []);

  useEffect(() => {
    Hub.listen('auth', data => {
      const {payload} = data;
      console.log('A new auth event has happened: ', data);
      if (payload.event === 'signIn') {
        console.log('a user has signed in!');
        setUser(true);
      }
      if (payload.event === 'signOut') {
        console.log('a user has signed out!');
      }
    });
  }, []);

  async function logout() {
    try {
      // TODO: handle logout of user
      await Auth.signOut();
      setUser(null);
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject();
    }
  }

  async function login(email: string, password: string) {
    try {
      // TODO: handle login of user
      await Auth.signIn(email, password);
      const userSession = await Auth.currentSession();
      // @ts-ignore
      setUser(userSession);
      return Promise.resolve();
    } catch (error) {
      console.log(error);
    }
  }

  const googleLogin = async () => {
    try {
      await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
      Auth.currentAuthenticatedUser()
        .then(user => console.log({user}))
        .catch(err => console.log(err));
      return Promise.resolve();
    } catch (err) {
      console.log(err);
    }
    // ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
    //   .then(async resultObject => {
    //     const {success} = resultObject;

    //     if (success) {
    //       try {
    //         await Auth.federatedSignIn({
    //           provider: CognitoHostedUIIdentityProvider.Google,
    //         });
    //         Auth.currentAuthenticatedUser()
    //           .then(user => console.log({user}))
    //           .catch(err => console.log(err));
    //         return Promise.resolve();
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     } else {
    //       console.log('user cancelled biometric prompt');
    //     }
    // })
    // .catch(() => {
    //   console.log('biometrics failed');
    // });
  };

  return (
    <AuthContext.Provider value={{user: user, login, logout, googleLogin}}>
      {children}
    </AuthContext.Provider>
  );
}
export {AuthProvider, useAuth};

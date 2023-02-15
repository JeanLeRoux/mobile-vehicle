import React, {useContext} from 'react';
import Dashboard from './components/dashboard/index';
import {AuthProvider, useAuth} from './components/utils/auth-context';
import {StyleSheet, Text, View, NativeModules, Platform} from 'react-native';
import {useEffect} from 'react';
import {NativeRouter, Route} from 'react-router-native';
import Login from './components/login/index';
import SignUp from './components/register/index';
import Profile from './components/profile/index';
import ForgotPassword from './components/forgotPassword/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import MyCar from './components/myCar/index';
import {createStackNavigator} from '@react-navigation/stack';
import CarList from './components/carlist/index';
import DataContext from './contexts/TheDataContext';
import Services from './components/serviceDetails/index';
import PushNotification from '@aws-amplify/pushnotification';
import {localNotification} from './localNotification';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

PushNotification.onRegister(token => {
  console.log('in app registration', token);
  PushNotification.updateEndpoint(token);
});

NativeModules.RNPushNotification.getToken(token => {
  console.log(`PushToken: ${token}`);
});

PushNotification.onNotification(notification => {
  localNotification('e', 'e');
  console.log('in app notification', notification);
});

PushNotification.onNotificationOpened(notification => {
  console.log('the notification is opened', notification);
});

const App = () => {
  return (
    <AuthProvider>
      <AppAuth />
    </AuthProvider>
  );
};
const AppAuth = () => {
  const {user, data} = useAuth();
  console.log('the dataaaa', data);

  if (user) {
    console.log(data);

    return (
      <DataContext>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={{
              activeTintColor: '#e91e63',
            }}
            tabBarOptions={{
              activeTintColor: '#fff',
              inactiveTintColor: 'lightgray',
              activeBackgroundColor: '#333',
              inactiveBackgroundColor: '#444',
            }}>
            <Tab.Screen
              name="Feed"
              component={Dashboard}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="My Car"
              component={MyCar}
              options={{
                tabBarLabel: 'My Car',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name="pin"
                    color={color}
                    size={size}
                  />
                ),
                tabBarBadge: 2,
              }}
            />
            <Tab.Screen
              name="Car"
              component={CarList}
              options={{
                tabBarLabel: 'Car',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name="car"
                    color={color}
                    size={size}
                  />
                ),
                tabBarBadge: 2,
              }}
            />
            <Tab.Screen
              name="Services"
              component={Services}
              options={{
                tabBarLabel: 'Services',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name="wrench"
                    color={color}
                    size={size}
                  />
                ),
                tabBarBadge: 2,
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </DataContext>
    );
  }
  return (
    <NativeRouter>
      <View>
        <Route exact path="/" component={Login} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/forgotPass" component={ForgotPassword} />
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    borderColor: 'grey',
    borderWidth: 1.5,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    marginRight: 5,
  },
  imageArrow: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
export default App;

import Amplify, {API, Auth} from 'aws-amplify';
import React, {useContext} from 'react';
import {
  Button,
  Image,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {View, Text, SafeAreaView} from 'react-native';
import {useAuth} from '../utils/auth-context';
import styles from './profileStyle';
import {getUserData} from '../graphql/queries';
import {updateUserData} from '../graphql/mutations';
import {useEffect} from 'react';
import {useState} from 'react';
import Modal from 'react-native-modal';
import {ActivityIndicator} from 'react-native';
import awsmobile from '../../aws-exports';
import {DataContext} from '../../contexts/TheDataContext';
import messaging from '@react-native-firebase/messaging';

Auth.configure(awsmobile);
API.configure(awsmobile.Api);

const Profile = () => {
  const {logout} = useAuth();
  const [userData, setUserData] = useState<any[]>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [smsSet, setSmsSet] = useState(false);
  const [notiSet, setNotiSet] = useState(false);
  const [mfa, setMFA] = useState(false);
  const [emailSet, setEmailSet] = useState(false);
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cell, setCell] = useState('');
  const [phone, setPhone] = useState('');
  const user = useContext(DataContext);
  let dark = user.dark;

  // ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
  //   const {available, biometryType} = resultObject;

  //   if (available && biometryType === ReactNativeBiometrics.TouchID) {
  //     console.log('TouchID is supported');
  //   } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
  //     console.log('FaceID is supported');
  //   } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
  //     console.log('Biometrics is supported');
  //   } else {
  //     console.log('Biometrics not supported');
  //   }
  // });

  // ReactNativeBiometrics.createKeys('Confirm fingerprint').then(resultObject => {
  //   const {publicKey} = resultObject;
  //   console.log(publicKey);
  //   // sendPublicKeyToServer(publicKey);
  // });

  // ReactNativeBiometrics.biometricKeysExist().then(resultObject => {
  //   const {keysExist} = resultObject;

  //   if (keysExist) {
  //     console.log('Keys exist');
  //   } else {
  //     console.log('Keys do not exist or were deleted');
  //   }
  // });

  function changeTheme() {
    console.log(dark);
    user.toggleDark(!dark);
  }

  const setDarkAsync = async () => {
    const value = await AsyncStorage.getItem('darkMode');
    if (value === 'true') {
      try {
        await AsyncStorage.setItem('darkMode', 'false');
        user.toggleDark(false);
        console.log(value);
      } catch (e) {
        // saving error
      }
    } else {
      try {
        await AsyncStorage.setItem('darkMode', 'true');
        user.toggleDark(true);
        console.log(value);
      } catch (e) {
        // saving error
      }
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const toggleSwitchSMS = () => setSmsSet(previousState => !previousState);
  const toggleSwitchNoti = () => setNotiSet(previousState => !previousState);
  const toggleSwitchEmail = () => setEmailSet(previousState => !previousState);
  const toggleSwitchMFA = () => setMFA(previousState => !previousState);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const token = await messaging().getToken();
        console.log('fcm token.......', token);
        const result: any = await API.graphql({query: getUserData});
        setUserData(result.data.getUserDetails);
        setSmsSet(result.data.getUserDetails.preferences.sendSms);
        setEmailSet(result.data.getUserDetails.preferences.sendEmail);
        setNotiSet(result.data.getUserDetails.preferences.sendAppNotification);
        setMFA(result.data.getUserDetails.preferences.mfa);
        setName(result.data.getUserDetails.firstname);
        setSurname(result.data.getUserDetails.lastname);
        setCell(result.data.getUserDetails.contact.phoneNumber);
        setPhone(result.data.getUserDetails.contact.telephoneNumber);
        console.log('data', result.data.getUserDetails);
      } catch (e) {
        console.log(e);
      }
    };

    const checkAsync = async () => {
      try {
        const value = await AsyncStorage.getItem('darkMode');
        if (value !== null) {
          console.log('async', value);
        }
      } catch (e) {
        // error reading value
      }
    };

    fetcher();
    checkAsync();
  }, []);

  const refreshData = async () => {
    try {
      const result: any = await API.graphql({query: getUserData});
      setUserData(result.data.getUserDetails);
      setSmsSet(result.data.getUserDetails.preferences.sendSms);
      setEmailSet(result.data.getUserDetails.preferences.sendEmail);
      setNotiSet(result.data.getUserDetails.preferences.sendAppNotification);
      setMFA(result.data.getUserDetails.preferences.mfa);
      setName(result.data.getUserDetails.firstname);
      setSurname(result.data.getUserDetails.lastname);
      setCell(result.data.getUserDetails.contact.phoneNumber);
      setPhone(result.data.getUserDetails.contact.telephoneNumber);
      console.log('data', result.data.getUserDetails);
    } catch (e) {
      console.log(e);
    }
  };

  async function editNotifications() {
    setLoader(true);
    try {
      const data = {
        preferences: {
          mfa: mfa,
          sendEmail: emailSet,
          sendSms: smsSet,
          sendAppNotification: notiSet,
        },
      };
      await API.graphql({query: updateUserData, variables: data});
      setLoader(false);
      toggleModal();
      console.log('success');
    } catch (err) {
      console.log(err);
    }
  }

  async function updateProfileData() {
    setLoader(true);
    console.log(cell);
    try {
      const data = {
        firstname: name,
        lastname: surname,
        contact: {
          phoneNumber: cell,
          telephoneNumber: phone,
        },
      };
      await API.graphql({query: updateUserData, variables: data});
      setLoader(false);
      refreshData();
      toggleModal2();
      console.log('success');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={!dark ? styles.entireArea : styles.entireArea_dark}>
      <SafeAreaView>
        <ScrollView>
          {!userData ? (
            <View style={styles.horizontal}>
              <ActivityIndicator size="large" color="#333" />
            </View>
          ) : (
            <View>
              <View
                style={!dark ? styles.profileArea : styles.profileArea_dark}>
                <Text style={!dark ? styles.userName : styles.userName_dark}>
                  Profile Page
                </Text>
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/75.jpg',
                  }}
                  style={styles.profile_img}
                  resizeMode="contain"
                />
              </View>
              <View
                style={
                  !dark ? styles.profile_details : styles.profile_details_dark
                }
                onPress={logout}>
                <Text
                  style={
                    !dark
                      ? styles.userDetails_heading
                      : styles.userDetails_heading_dark
                  }>
                  Name
                </Text>
                <Text
                  style={
                    !dark
                      ? styles.userDetails_info
                      : styles.userDetails_heading_dark
                  }>
                  {' '}
                  {userData.firstname + ' ' + userData.lastname}
                </Text>
              </View>
              <View
                style={
                  !dark ? styles.profile_details : styles.profile_details_dark
                }>
                <Text
                  style={
                    !dark
                      ? styles.userDetails_heading
                      : styles.userDetails_heading_dark
                  }>
                  Cell Number
                </Text>
                <Text
                  style={
                    !dark
                      ? styles.userDetails_info
                      : styles.userDetails_heading_dark
                  }>
                  {userData.contact.phoneNumber}
                </Text>
              </View>
              <View
                style={
                  !dark ? styles.profile_details : styles.profile_details_dark
                }>
                <Text
                  style={
                    !dark
                      ? styles.userDetails_heading
                      : styles.userDetails_heading_dark
                  }>
                  Province
                </Text>
                <Text
                  style={
                    !dark
                      ? styles.userDetails_info
                      : styles.userDetails_heading_dark
                  }>
                  {userData.address ? userData.address.province : ''}
                </Text>
              </View>
              <TouchableOpacity onPress={toggleModal}>
                <View
                  style={
                    !dark ? styles.profile_details : styles.profile_details_dark
                  }>
                  <Text
                    style={
                      !dark
                        ? styles.userDetails_heading
                        : styles.userDetails_heading_dark
                    }>
                    Notifications
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal2}>
                <View
                  style={
                    !dark ? styles.profile_details : styles.profile_details_dark
                  }>
                  <Text
                    style={
                      !dark
                        ? styles.userDetails_heading
                        : styles.userDetails_heading_dark
                    }>
                    Edit Profile
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDarkAsync()}>
                <View
                  style={
                    !dark ? styles.profile_details : styles.profile_details_dark
                  }>
                  <Text
                    style={
                      !dark
                        ? styles.userDetails_heading
                        : styles.userDetails_heading_dark
                    }>
                    Enable Dark Mode
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeTheme()}>
                <View
                  style={
                    !dark ? styles.profile_details : styles.profile_details_dark
                  }>
                  <Text
                    style={
                      !dark
                        ? styles.userDetails_heading
                        : styles.userDetails_heading_dark
                    }>
                    Enable MFA When Logging In
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <Modal isVisible={isModalVisible}>
                  <View style={!dark ? styles.modal : styles.modal_dark}>
                    <View
                      style={
                        !dark
                          ? styles.profile_details
                          : styles.profile_details_dark
                      }>
                      <Text
                        style={
                          !dark
                            ? styles.userDetails_heading
                            : styles.userDetails_heading_dark
                        }>
                        MFA
                      </Text>
                      <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={notiSet ? '#fff' : '#fff'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitchMFA()}
                        value={mfa}
                      />
                    </View>
                    <View
                      style={
                        !dark
                          ? styles.profile_details
                          : styles.profile_details_dark
                      }>
                      <Text
                        style={
                          !dark
                            ? styles.userDetails_heading
                            : styles.userDetails_heading_dark
                        }>
                        Notifications
                      </Text>
                      <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={notiSet ? '#fff' : '#fff'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitchNoti()}
                        value={notiSet}
                      />
                    </View>

                    <View
                      style={
                        !dark
                          ? styles.profile_details
                          : styles.profile_details_dark
                      }>
                      <Text
                        style={
                          !dark
                            ? styles.userDetails_heading
                            : styles.userDetails_heading_dark
                        }>
                        Email
                      </Text>
                      <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={emailSet ? '#fff' : '#fff'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitchEmail()}
                        value={emailSet}
                      />
                    </View>

                    <View
                      style={
                        !dark
                          ? styles.profile_details
                          : styles.profile_details_dark
                      }>
                      <Text
                        style={
                          !dark
                            ? styles.userDetails_heading
                            : styles.userDetails_heading_dark
                        }>
                        SMS
                      </Text>
                      <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={smsSet ? '#fff' : '#fff'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitchSMS()}
                        value={smsSet}
                      />
                    </View>

                    {loader ? (
                      <View style={styles.modalLoader}>
                        <ActivityIndicator size="large" color="#333" />
                      </View>
                    ) : (
                      <View style={styles.modalButton}>
                        <Button title="Update" onPress={editNotifications} />
                        <Button title="Close Modal" onPress={toggleModal} />
                      </View>
                    )}
                  </View>
                </Modal>
              </View>

              <View style={{flex: 1}}>
                <Modal isVisible={isModalVisible2}>
                  <View style={!dark ? styles.modal : styles.modal_dark}>
                    <View
                      style={
                        !dark
                          ? styles.profile_details
                          : styles.profile_details_dark
                      }>
                      <Text
                        style={
                          !dark
                            ? styles.userDetails_heading
                            : styles.userDetails_heading_dark
                        }>
                        Name
                      </Text>
                      <TextInput
                        style={
                          !dark ? styles.profileInput : styles.profileInput_dark
                        }
                        onChangeText={setName}
                        value={name}
                      />
                    </View>
                    <View
                      style={
                        !dark
                          ? styles.profile_details
                          : styles.profile_details_dark
                      }>
                      <Text
                        style={
                          !dark
                            ? styles.userDetails_heading
                            : styles.userDetails_heading_dark
                        }>
                        Surname
                      </Text>
                      <TextInput
                        style={
                          !dark ? styles.profileInput : styles.profileInput_dark
                        }
                        onChangeText={setSurname}
                        value={surname}
                      />
                    </View>

                    <View
                      style={
                        !dark
                          ? styles.profile_details
                          : styles.profile_details_dark
                      }>
                      <Text
                        style={
                          !dark
                            ? styles.userDetails_heading
                            : styles.userDetails_heading_dark
                        }>
                        Cell Number
                      </Text>
                      <TextInput
                        style={
                          !dark ? styles.profileInput : styles.profileInput_dark
                        }
                        onChangeText={setCell}
                        value={cell}
                      />
                    </View>
                    <View
                      style={
                        !dark
                          ? styles.profile_details
                          : styles.profile_details_dark
                      }>
                      <Text
                        style={
                          !dark
                            ? styles.userDetails_heading
                            : styles.userDetails_heading_dark
                        }>
                        Phone Number
                      </Text>
                      <TextInput
                        style={
                          !dark ? styles.profileInput : styles.profileInput_dark
                        }
                        onChangeText={setPhone}
                        value={phone}
                      />
                    </View>
                    {loader ? (
                      <View style={styles.modalLoader}>
                        <ActivityIndicator size="large" color="#333" />
                      </View>
                    ) : (
                      <View style={styles.modalButton}>
                        <Button title="Update" onPress={updateProfileData} />
                        <Button title="Close Modal" onPress={toggleModal2} />
                      </View>
                    )}
                  </View>
                </Modal>
              </View>
            </View>
          )}
          <TouchableOpacity onPress={logout}>
            <View
              style={
                !dark ? styles.profile_details : styles.profile_details_dark
              }>
              <Text
                style={
                  !dark
                    ? styles.userDetails_heading
                    : styles.userDetails_heading_dark
                }>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

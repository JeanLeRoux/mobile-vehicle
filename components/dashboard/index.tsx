import {API} from 'aws-amplify';
import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {View, Text, SafeAreaView} from 'react-native';
import {DataContext} from '../../contexts/TheDataContext';
import {getVehicleModels, getVehicleDetails} from '../graphql/queries';
import styles from './dashboardStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const user = useContext(DataContext);
  let CarNumber = user.carNumber;
  let dark = user.dark;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // var valueAtIndex1 = myValues[1];

  useEffect(() => {
    console.log('ehsjdhkjdsahfhfdkjew');
    const checkAsync = async () => {
      const value = await AsyncStorage.getItem('darkMode');
      console.log(value);
      if (value === 'true') {
        try {
          user.toggleDark(true);
        } catch (e) {
          // saving error
        }
      } else {
        try {
          user.toggleDark(false);
        } catch (e) {
          // saving error
        }
      }
    };

    checkAsync();
  }, []);

  useEffect(() => {
    const fetcher = async () => {
      try {
        // const vehicleModelQueryResults: any = await API.graphql({
        //   query: getVehicleModels,
        // });
        const result: any = await API.graphql({query: getVehicleDetails});
        setData(result.data.getVehicleDetails);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    fetcher();
  }, []);

  // DeviceInfo.getBatteryLevel().then(batteryLevel => {
  //   console.log(batteryLevel);
  // });

  // DeviceInfo.isCameraPresent()
  //   .then(isCameraPresent => {
  //     console.log('camera?', isCameraPresent);
  //   })
  //   .catch(cameraAccessException => {
  //     // is thrown if a camera device could not be queried or opened by the CameraManager on Android
  //   });

  // let deviceId = DeviceInfo.getDeviceId();
  // let brand = DeviceInfo.getBrand();
  // console.log(deviceId);

  // DeviceInfo.getFreeDiskStorage().then(freeDiskStorage => {
  //   console.log(freeDiskStorage);
  // });

  // setCurrentCar(data[CarNumber]);

  if (!loading) {
    return (
      <View style={dark ? styles.entirePage_dark : styles.entirePage}>
        <SafeAreaView>
          {/* <View>
          <Text>Dashboard</Text>
          <Button
            onPress={logout}
            title="Logout"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View> */}
          {/* <Text>{CarNumber}</Text>
        <Text>test</Text> */}
          <View style={!dark ? styles.carArea : styles.carArea_dark}>
            <Text style={!dark ? styles.carName : styles.carName_dark}>
              My {data[CarNumber].model}
            </Text>
            <Text style={!dark ? styles.quickInfo : styles.quickInfo_dark}>
              {data[CarNumber].year +
                ' ' +
                data[CarNumber].model +
                ' ' +
                data[CarNumber].trim}
            </Text>
            <Image
              source={{uri: data[CarNumber].model_url}}
              style={styles.car_img}
              resizeMode="contain"
            />
          </View>

          <View
            style={
              !dark ? styles.carArea_details : styles.carArea_details_dark
            }>
            <Text style={!dark ? styles.carDetails : styles.carDetails_dark}>
              Kilometers:
            </Text>
            <Text
              style={
                !dark ? styles.carDetails_right : styles.carDetails_right_dark
              }>
              62 487
            </Text>
          </View>

          <View
            style={
              !dark ? styles.carArea_details : styles.carArea_details_dark
            }>
            <Text style={!dark ? styles.carDetails : styles.carDetails_dark}>
              Next Service:
            </Text>
            <Text
              style={
                !dark ? styles.carDetails_right : styles.carDetails_right_dark
              }>
              75 000
            </Text>
          </View>

          <View
            style={
              !dark ? styles.carArea_details : styles.carArea_details_dark
            }>
            <Text style={!dark ? styles.carDetails : styles.carDetails_dark}>
              Service Interval:
            </Text>
            <Text
              style={
                !dark ? styles.carDetails_right : styles.carDetails_right_dark
              }>
              20 000
            </Text>
          </View>

          <View
            style={
              !dark ? styles.carArea_details : styles.carArea_details_dark
            }>
            <Text style={!dark ? styles.carDetails : styles.carDetails_dark}>
              Trade In Value:
            </Text>
            <Text
              style={
                !dark ? styles.carDetails_right : styles.carDetails_right_dark
              }>
              R180 000
            </Text>
          </View>

          <View
            style={
              !dark ? styles.carArea_details : styles.carArea_details_dark
            }>
            <Text style={!dark ? styles.carDetails : styles.carDetails_dark}>
              Current Location:
            </Text>
            <Text
              style={
                !dark ? styles.carDetails_right : styles.carDetails_right_dark
              }>
              At Home
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

Login.defaultProps = {
  title: 'Car App',
};

export default Login;

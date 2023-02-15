import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './serviceStyles';
import {API} from 'aws-amplify';
import {getVehicleModels, getVehicleDetails} from '../graphql/queries';
import {DataContext} from '../../contexts/TheDataContext';

const ServiceDetails = () => {
  const user = useContext(DataContext);
  let CarNumber = user.carNumber;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let dark = user.dark;
  // var valueAtIndex1 = myValues[1];

  useEffect(() => {
    const fetcher = async () => {
      try {
        const vehicleModelQueryResults: any = await API.graphql({
          query: getVehicleModels,
        });
        const result: any = await API.graphql({query: getVehicleDetails});
        setData(result.data.getVehicleDetails);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    fetcher();
  }, []);

  if (!loading) {
    return (
      <View style={!dark ? styles.entireArea : styles.entireArea_dark}>
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

          <View style={!dark ? styles.carArea : styles.carArea_dark}>
            <Text style={!dark ? styles.carName : styles.carName_dark}>
              My Service Information
            </Text>
            <Text style={!dark ? styles.quickInfo : styles.quickInfo_dark}>
              {' '}
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
              View service history
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
              June 2022
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
              !dark ? styles.carArea_detailsBig : styles.carArea_detailsBig_dark
            }>
            <Image
              source={require('../img/calendar.png')}
              style={[
                styles.calendar_img,
                !dark ? styles.carDetails : styles.carDetails_dark,
              ]}
              resizeMode="contain"
            />

            <Text
              style={
                !dark
                  ? styles.carDetails_right_booking
                  : styles.carDetails_right_dark
              }>
              Book your next service
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

export default ServiceDetails;

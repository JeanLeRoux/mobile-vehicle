import {API} from 'aws-amplify';
import React, {useContext, useEffect, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {View, Text, SafeAreaView} from 'react-native';
import {getVehicleDetails, getVehicleModelTrims} from '../graphql/queries';
import {getVehicleModels} from '../graphql/queries';
import styles from './carListStyles';
import {DataContext} from '../../contexts/TheDataContext';
import {addNewVehicle} from '../graphql/mutations';
import DropDownPicker from 'react-native-dropdown-picker';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
const CarList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(DataContext);
  let dark = user.dark;
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [model, setModal] = useState('');
  const [registration, setRegistration] = useState('');
  const [vin, setVin] = useState('');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [modelDropdownValue, setModelDropdownValue] = useState(null);
  const [vehicleModels, setVehicleModels] = useState([]);

  const [trimDropdownOpen, setTrimDropdownOpen] = useState(false);
  const [trimDropdownValue, setTrimDropdownValue] = useState(null);
  const [vehicleTrims, setVehicleTrims] = useState([]);

  const [engineDropdownOpen, setEngineDropdownOpen] = useState(false);
  const [engineDropdownValue, setEngineDropdownValue] = useState(null);
  const [vehicleEngines, setVehicleEngines] = useState([]);

  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [yearDropdownValue, setYearDropdownValue] = useState(null);
  const [vehicleYears, setVehicleYears] = useState([]);

  DropDownPicker.setListMode('SCROLLVIEW');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    const fetcher = async () => {
      try {
        const vehicleModelQueryResults: any = await API.graphql({
          query: getVehicleModels,
        });
        const result: any = await API.graphql({query: getVehicleDetails});
        setData(result.data.getVehicleDetails);
        setVehicleModels(vehicleModelQueryResults.data.getVehicleModels);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetcher();
  }, []);

  const getModelTrimsTrim = async (modelName: null | String) => {
    try {
      const data = {modelName: modelName};
      const vehicleModelTrimsQueryResult: any = await API.graphql({
        query: getVehicleModelTrims,
        variables: data,
      });
      setVehicleTrims(vehicleModelTrimsQueryResult.data.getVehicleModelTrims);
    } catch (e) {
      console.log(e);
    }
  };

  async function changeTheValue(num: number) {
    user.toggleCar(num);
  }
  async function addNewCar() {
    setLoader(true);
    try {
      const data = {
        model: model,
        regestrationNumber: registration,
        vinNumber: vin,
      };
      await API.graphql({query: addNewVehicle, variables: data});
      setLoader(false);
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  }
  function printData() {
    return data.map((data, index) => {
      return (
        <SafeAreaView key={index}>
          <View style={styles.card} key={index}>
            <Image
              style={styles.image}
              source={{uri: data.model_url}}
              resizeMode={'cover'} // cover or contain its upto you view look
            />
            <Text style={styles.text}>
              {data.model} {data.trim} {data.year}
            </Text>
            <Image
              style={styles.imageArrow}
              source={require('../img/right.svg')}
              resizeMode={'cover'} // cover or contain its upto you view look
            />
            {/* <Text>{user.carNumber}</Text>
            <Button title="gfs" onPress={() => changeTheValue(index)}>
              Change Context
            </Button> */}
          </View>
          {/* <View style={styles.card}>
          <Text style={styles.text}>Add A New Car</Text>
          <Image
            style={styles.imageArrow}
            source={require('../img/right.svg')}
            resizeMode={'cover'} // cover or contain its upto you view look
          />
        </View>  */}
        </SafeAreaView>
      );
    });
  }
  if (!loading) {
    return (
      <SafeAreaView>
        {printData()}
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          style={styles.card}
          onPress={() => {
            toggleModal();
          }}>
          <View style={styles.buttonCardSub}>
            <Text style={styles.text}>Add A New Car</Text>
            <Image
              style={styles.imageArrow}
              source={require('../img/right.svg')}
              resizeMode={'cover'} // cover or contain its upto you view look
            />
          </View>
        </TouchableHighlight>
        <View style={{flex: 1}}>
          <Modal visible={isModalVisible}>
            <ScrollView>
              <View style={styles.modalBackground}>
                <View style={styles.modalCard}>
                  <View style={styles.profile_details}>
                    <Text style={styles.userDetails_heading}>Model</Text>
                    <DropDownPicker
                      open={modelDropdownOpen}
                      value={modelDropdownValue}
                      items={vehicleModels}
                      setOpen={setModelDropdownOpen}
                      setValue={setModelDropdownValue}
                      containerStyle={styles.profileInputSelect}
                      onChangeValue={value => {
                        getModelTrimsTrim(value);
                      }}
                    />
                  </View>
                  <View style={styles.profile_details}>
                    <Text style={styles.userDetails_heading}>Trim</Text>
                    <DropDownPicker
                      open={trimDropdownOpen}
                      value={trimDropdownValue}
                      items={vehicleTrims}
                      setOpen={setTrimDropdownOpen}
                      setValue={setTrimDropdownValue}
                      containerStyle={styles.profileInputSelect}
                      style={{zIndex: 4000}}
                    />
                  </View>
                  <View style={styles.profile_details}>
                    <Text style={styles.userDetails_heading}>Engine</Text>
                    <DropDownPicker
                      open={engineDropdownOpen}
                      value={engineDropdownValue}
                      items={vehicleEngines}
                      setOpen={setEngineDropdownOpen}
                      setValue={setEngineDropdownValue}
                      containerStyle={styles.profileInputSelect}
                      style={{zIndex: 3000}}
                    />
                  </View>
                  <View style={styles.profile_details}>
                    <Text style={styles.userDetails_heading}>Year</Text>
                    <DropDownPicker
                      open={yearDropdownOpen}
                      value={yearDropdownValue}
                      items={vehicleYears}
                      setOpen={setYearDropdownOpen}
                      setValue={setYearDropdownValue}
                      containerStyle={styles.profileInputSelect}
                      style={{zIndex: 2000}}
                    />
                  </View>
                  <View style={styles.profile_details}>
                    <Text style={styles.userDetails_heading}>Registration</Text>
                    <TextInput
                      style={styles.profileInput}
                      onChangeText={setRegistration}
                      value={registration}
                    />
                  </View>
                  <View style={styles.profile_details}>
                    <Text style={styles.userDetails_heading}>VIN</Text>
                    <TextInput
                      style={styles.profileInput}
                      onChangeText={setVin}
                      value={vin}
                    />
                  </View>
                  {loader ? (
                    <View style={styles.modalLoader}>
                      <ActivityIndicator size="large" color="#333" />
                    </View>
                  ) : (
                    <View style={styles.modalButton}>
                      <Button title="Update" onPress={addNewCar} />
                      <Button title="Close Modal" onPress={toggleModal} />
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};
export default CarList;

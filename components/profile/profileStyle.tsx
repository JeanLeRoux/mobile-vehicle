/* eslint-disable @typescript-eslint/no-unused-vars */
const React = require('react-native');

const {StyleSheet} = React;

export default {
  profileArea: {
    backgroundColor: '#fff',
    height: 250,
    margin: 15,
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#ddd',
  },
  profile_img: {
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 100,
  },
  userName: {
    fontSize: 20,
    color: 'black',
  },
  profile_details: {
    backgroundColor: '#fff',
    height: 60,
    margin: 15,
    marginBottom: 0,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails_heading: {
    fontSize: 16,
    color: 'black',
  },
  userDetails_info: {
    fontSize: 16,
    color: 'green',
  },
  modal: {
    backgroundColor: '#ddd',
    padding: 10,
  },
  modalButton: {
    marginTop: 20,
  },
  horizontal: {
    justifyContent: 'center',
    top: '80%',
    flexDirection: 'row',
  },
  modalLoader: {
    padding: 10,
  },
  profileInput: {
    height: 40,
    margin: 12,
    width: '65%',
    borderWidth: 1,
  },
  entireArea: {},
  entireArea_dark: {
    flex: 1,
    backgroundColor: '#222',
  },
  profileArea_dark: {
    backgroundColor: '#111',
    height: 250,
    margin: 15,
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#ddd',
  },
  userName_dark: {
    fontSize: 20,
    color: '#fff',
  },
  profile_details_dark: {
    backgroundColor: '#111',
    height: 60,
    margin: 15,
    marginBottom: 0,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails_heading_dark: {
    fontSize: 16,
    color: '#fff',
  },
  modal_dark: {
    backgroundColor: '#222',
    padding: 10,
  },
  profileInput_dark: {
    height: 40,
    margin: 12,
    width: '65%',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
};

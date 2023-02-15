/* eslint-disable @typescript-eslint/no-unused-vars */
const React = require('react-native');

const {StyleSheet} = React;

export default {
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
    height: 90,
  },
  buttonCardSub: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 60,
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
  modalCard: {
    backgroundColor: '#fff',
    // padding: 10,
    // height: '100%',
    margin: 10,
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1.5,
    height: 'auto',
  },
  modalBackground: {
    backgroundColor: '#DDD',
    height: '100%',
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
    backgroundColor: '#fff',
  },
  profileInputSelect: {
    height: 40,
    margin: 12,
    width: '65%',
  },
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
  },
  profile_details: {
    // backgroundColor: '#fff',
    height: 80,
    margin: 15,
    marginBottom: 0,
    padding: 15,
    // borderRadius: 10,
    // borderWidth: 2.5,
    // borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails_heading: {
    fontSize: 16,
  },
  userDetails_info: {
    fontSize: 16,
    color: 'green',
  },
  entireCard: {
    flex: 1,
  },
  entireCard_dark: {
    backgroundColor: '#222',
    flex: 1,
  },
  card_dark: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    borderColor: '#fff',
    borderWidth: 1,
    height: 90,
    backgroundColor: '#111',
  },

  text_dark: {
    fontSize: 16,
    marginRight: 5,
    color: '#fff',
  },
  modalCard_dark: {
    backgroundColor: '#222',
    // padding: 10,
    // height: '100%',
    margin: 10,
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1.5,
    height: '97%',
  },
  modalBackground_dark: {
    backgroundColor: '#333',
    height: '100%',
  },
  userDetails_heading_dark: {
    fontSize: 16,
    color: '#fff',
  },
};

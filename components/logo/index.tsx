import React from 'react';
import {View} from 'react-native';
import {Image, StyleSheet} from 'react-native';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image source={require('../img/logofull.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});

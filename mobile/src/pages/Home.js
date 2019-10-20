import React from 'react';
import { SafeAreaView, Image, StyleSheet, ScrollView} from 'react-native';

import logo from '../assets/logo.png';
import SpotList from '../components/ReactHome';

export default function List() {

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      <ScrollView>
      <SpotList></SpotList>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 10,
  },
});
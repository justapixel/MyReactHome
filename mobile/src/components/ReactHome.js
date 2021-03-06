import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import socketio from 'socket.io-client';
import api from '../services/api';

function ReactHome() {
  const [sensors, setSensors] = useState([]);

  async function loadSensors() {
    const response = await api.get('/sensor');
    setSensors(response.data);
  };
  
  
  useEffect(() => {    

    loadSensors();

    const socket = socketio('http://10.42.0.1:3000')
    socket.on('sensorUpdate', socketdata => {
      setSensors(socketdata);
    })

  }, []);
  
  async function handleSubmit(id, state) {
    let set = '';
    state == 'off' ? set = 'on' : set = 'off';

    await api.post(`/sensor/update`, {
      id: `${id}`,
      state: `${set}`
    });
  }
  


  return (
    <View style={styles.container}>
      <FlatList
        data={sensors}
        keyExtractor={key => key.id}
        numColumns = {2}
        columnWrapperStyle={{justifyContent:'space-between', }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => handleSubmit(item.id, item.state)}>
            <View style={styles.listItem}>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.location}>Temp {item.value}ºC</Text>
              <View style={item.state == 'off' ? styles.stateoff : styles.stateon}>
                <Text style={styles.statetext}>{item.state == 'off' ? 'SWITCH OFF' : 'SWITCH ON'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
let width = Dimensions.get('screen').width/2 - 8;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },

  title:{
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  bold: {
    fontWeight: 'bold',
  },

  listItem: {
    backgroundColor: '#272822', 
    width:width, 
    height:width, 
    margin: 4,
  },

  thumbnail: {
    width: 160,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  
  location: {
    flex: 1,
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  stateoff: {
    height: 32,
    backgroundColor: '#ff3618',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },

  stateon: {
    height: 32,
    backgroundColor: '#77b900',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },

  statetext: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default withNavigation(ReactHome);
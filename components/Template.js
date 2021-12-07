import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  Dimensions,
  ImageBackground
} from 'react-native';

const { width, height } = Dimensions.get('window')

import Draggable from 'react-native-draggable';

const Template = (props) => {


  return (
    <View>
      <ImageBackground
        resizeMode='cover'
        style={{ height: 0.9 * width, width: width * 0.8 }}
        source={{
          uri: props.url,
        }}>
        <View style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
          <Draggable x={30} y={70}>
            <Text style={{
              fontSize: 25,
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              maxWidth: 120,
            }}>{props.deal}</Text>
          </Draggable>

          <Draggable x={200} y={200}>
            <Text style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              maxWidth: 120,
            }}>{props.store_details}</Text>
          </Draggable>

        </View>
      </ImageBackground>
    </View>
  )
}

export default Template

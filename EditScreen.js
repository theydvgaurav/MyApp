import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { captureRef } from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';

import Template from './components/Template';



const EditScreen = ({ route, navigation }) => {
  // create a ref
  const viewRef = useRef();

  const [text, settext] = useState(route.params.data.deal);
  const [details, setdetails] = useState(route.params.data.store_details);



  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{ text: 'OK', onPress: () => { } }],
        { cancelable: false },
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo');
      if (image) {
        Alert.alert(
          '',
          'Image saved successfully.',
          [{ text: 'OK', onPress: () => { } }],
          { cancelable: false },
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const shareImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });
      console.log('uri', uri);
      const shareResponse = await Share.open({ url: uri });
      console.log('shareResponse', shareResponse);
    } catch (error) {
      console.log('error', error);
    }
  };


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.body}>
            <Text style={styles.title} > Create a Banner </Text>
            <View style={styles.savedComponent} ref={viewRef}>
              <Template url={route.params.data.url} deal={text} store_details={details} />
            </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder=""
              value={text}
              placeholderTextColor="#BABABA"
              autoCapitalize="none"
              onChangeText={(input) => settext(input)}

            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder=""
              value={details}
              placeholderTextColor="#BABABA"
              autoCapitalize="none"
              onChangeText={(input) => setdetails(input)}

            />

            <View style={styles.row}>
              <TouchableOpacity style={styles.button1} onPress={shareImage}>
                <Text style={{
                  fontSize: 20,
                  color: '#889aea'
                }} >Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={downloadImage}>
                <Text style={{
                  fontSize: 20,
                  color: '#889aea'
                }}  >Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

  body: {
    marginTop: 20,
    alignItems: 'center',
  },
  savedComponent: {
    backgroundColor: 'white',
    padding: 20,

  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 260,
    height: 260,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 5,
  },
  row: {
    marginTop: 35,
    marginBottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  button1: {
    borderWidth: 2,
    borderColor: "#889aea",
    padding: 10,
    borderRadius: 20,
    paddingLeft: 35,
    paddingRight: 35,
  },
  button2: {
    borderWidth: 2,
    borderColor: "#889aea",
    padding: 10,
    borderRadius: 20,
    paddingLeft: 35,
    paddingRight: 35,

  },
  input: {
    width: '80%',
    height: 50,
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#BABABA"
  },
  mediumFont: {
    fontSize: 20,
    color: '#ffffff'
  },
  fontcolor: {
    height: 15,
    width: 15,
    borderColor: "#bababa",
    borderWidth: 2,
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },

});

export default EditScreen;

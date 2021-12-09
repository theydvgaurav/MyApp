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
  TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { captureRef } from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import {launchImageLibrary } from 'react-native-image-picker';

import Template from './components/Template';



const EditScreen = ({ route, navigation }) => {
  // create a ref
  const viewRef = useRef();

  // local states for input boxes 
  const [text, settext] = useState(route.params.data.deal);
  const [details, setdetails] = useState(route.params.data.store_details);

  // local state for image
  const [userImage, setUserImage] = useState(null);



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
        quality: 1,
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


  // pick image from gallery
  const openGallery = () => {
    const option = {
      mediaType: 'photo',
      quality: 1
    }

    launchImageLibrary(option, (res) => {
      if (res.didCancel) {
        alert("User Cancelled image pick");
      } else if (res.errorCode) {
        alert(res.errorMessage)
      } else {
        const data = res.assets[0];
        setUserImage(data);
      }
    })
  }

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
      marginTop: 15,
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
    row2: {
      marginTop: 5,
      marginBottom: 5,
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: userImage != null ? 'space-between' : 'center',
      width: '80%'
    },
    button: {
      marginTop: 10,
      backgroundColor: "#889aea",
      padding: 10,
      borderRadius: 20,
      paddingLeft: 15,
      paddingRight: 15,
      justifyContent: 'center'
    },
    input: {
      width: '80%',
      height: 50,
      marginTop: 13,
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
    textColored: {
      fontSize: 20,
      color: '#889aea'
    },
    textWhite: {
      fontSize: 20,
      color: '#ffffff'
    }

  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.body}>
            <Text style={styles.title} > Create a Banner </Text>
            <View style={styles.savedComponent} ref={viewRef}>
              <Template url={route.params.data.url} deal={text} store_details={details} userImage={userImage} />
            </View>
            <View style={styles.row2}>
              <TouchableOpacity style={styles.button} onPress={openGallery}>
                <Text style={styles.textWhite} > Add Image </Text>
              </TouchableOpacity>
              {userImage != null &&
                <TouchableOpacity style={styles.button} onPress={() => { setUserImage(null) }}>
                  <Text style={styles.textWhite} > Delete Image </Text>
                </TouchableOpacity>
              }
            </View>
            <TextInput
              multiline={true}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder=""
              value={text}
              placeholderTextColor="#BABABA"
              autoCapitalize="none"
              onChangeText={(input) => settext(input)}

            />
            <TextInput
              multiline={true}
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
                <Text style={styles.textColored}> Share </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={downloadImage}>
                <Text style={styles.textColored}> Save </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


export default EditScreen;

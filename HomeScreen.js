import * as React from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground,
    BackHandler, 
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window')
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({navigation, route}) => {

    // backhandler
    useEffect(() => {
        const backAction = () => {
            if (!navigation.canGoBack()) {
                Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            }

            return false
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    return (
        <>
            <SafeAreaView> 
                    <View style={styles.view} >
                        <TouchableOpacity style={styles.touchableOpacity} onPress={()=>(navigation.push('Templates'))} >
                            <Text style={styles.text} >Create a New Template</Text>
                        </TouchableOpacity>
                    </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    view:{
        flexDirection : 'row',
        justifyContent : 'center'
    },
    touchableOpacity:{
        position : 'relative',
        marginTop : '65%',
        borderColor : '#ffffff',
        borderWidth : 2,
        backgroundColor : '#889aea',
        justifyContent : 'center',
        borderRadius : 100,
        height : 200,
        textAlign : 'center',
        width : 200,

    },
    text :{
        fontSize : 30,
        fontWeight : '500',
        textAlign : 'center',
        color : '#ffffff'

    }
});

export default HomeScreen;

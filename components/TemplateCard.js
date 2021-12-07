import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';

const { width, height } = Dimensions.get('window')
import { useRoute, useNavigation } from '@react-navigation/native';

const TemplateCard = (props) => {

    const navigation = useNavigation();
    const route = useRoute();

    return (
        <>
            <TouchableOpacity onPress={() => { navigation.push('EditScreen', { data: { url: props.url, deal: props.deal, store_details: props.store_details } }) }} >
                <ImageBackground
                    resizeMode='cover'
                    style={styles.coverImage}
                    source={{
                        uri: props.url,
                    }}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{props.deal}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    coverImage: {
        height: width * 0.8,
        width: width * 0.9,
        marginTop: 5,
        opacity: 0.6,
        marginLeft: width * 0.03,
        marginRight: 10,
        marginBottom: 5
    },
    textView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    text: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: '#ffffff',
        textShadowRadius: 10
    }
});

export default TemplateCard;

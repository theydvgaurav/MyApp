import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window')
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TemplateCard from './components/TemplateCard';

const Templates = ({ navigation, route }) => {

    const [data, setdata] = useState([{
        id: 1,
        deal: "Happy Diwali Flat 50% Off",
        store_details: 'XYZ Seller/Store',
        url: 'https://images.pexels.com/photos/5650037/pexels-photo-5650037.jpeg?cs=srgb&dl=pexels-karolina-grabowska-5650037.jpg&fm=jpg',
    },
    {
        id: 2,
        deal: "Flat XX% Off",
        url: 'https://images.pexels.com/photos/1111316/pexels-photo-1111316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        store_details: 'XYZ Seller/Store'
    },
    {
        id: 3,
        deal: "Flat XX% Off",
        url: 'https://images.pexels.com/photos/5625130/pexels-photo-5625130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        store_details: 'XYZ Seller/Store'
    },
    {
        id: 4,
        deal: "Flat XX% Off",
        url: 'https://images.pexels.com/photos/5650017/pexels-photo-5650017.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        store_details: 'XYZ Seller/Store'
    },
    {
        id: 5,
        deal: "Flat XX% Off",
        url: 'https://images.unsplash.com/photo-1607083207685-aaf05f2c908c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        store_details: 'XYZ Seller/Store'
    },
    {
        id: 6,
        deal: "Flat XX% Off",
        url: 'https://images.unsplash.com/photo-1459257831348-f0cdd359235f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        store_details: 'XYZ Seller/Store'
    }]);

    return (
        <>
            <SafeAreaView  >
                <View style={styles.container} >
                    <Text style={styles.title} > Choose a Template </Text>
                    <ScrollView>
                        <View style={styles.view} >
                            {data.map((item) => (
                                <TemplateCard deal={item.deal} url={item.url} key={item.id} store_details={item.store_details} />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    view: {
        paddingBottom: height * 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold'
    },
    container: {
        padding: 10,
    }
});

export default Templates;

import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EditScreen from './EditScreen'
import HomeScreen from './HomeScreen'
import Templates from './Templates';


const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
					headerShown: false,
          animation : 'none'
				}} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Templates" component={Templates} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
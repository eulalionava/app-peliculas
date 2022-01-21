import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { Movie } from '../interfaces/movieInterface';

export type RootStackParam = {
  Home:undefined;
  Detalle:Movie
}

const Stack = createStackNavigator<RootStackParam>();

export const StackNavigator = ()=> {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown:false,
            cardStyle:{
                // backgroundColor:'white'
            }
        }}
    >
      <Stack.Screen name="Home" component={ HomeScreen } />
      <Stack.Screen name="Detalle" component={ DetailScreen } />
    </Stack.Navigator>
  );
}
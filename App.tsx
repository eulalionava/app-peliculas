import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigation/Navigation'
import { GradientProvider } from './src/context/GradientContext';

const AppState = ({children}:any)=>{
  return(
    <GradientProvider>
      { children }
    </GradientProvider>
  )
}

export const App = ()=> {

  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator/>
      </AppState>
      {/* <FadeScreen/> */}
    </NavigationContainer>
  )
}

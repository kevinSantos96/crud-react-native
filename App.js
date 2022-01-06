import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';// el navigation container
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme,Provider as PaperProvaider } from 'react-native-paper'


import { Inicio } from './views/Inicio';
import { NuevoCliente } from './views/NuevoCliente';
import { DetallesCliente } from './views/DetallesCliente';


const Stack = createStackNavigator();

//Definir tema
const theme ={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#2D83ED'
  }
}


const App = () => {
  

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: theme.colors.primary
            },
            headerTintColor:theme.colors.surface,
            headerTitleStyle:{
              fontWeight:'bold'
            }
          }}
        >
          <Stack.Screen 
            name="Inicio"
            component={Inicio}
            // options={({navigation,route})=>({
            //   // headerLeft: (props)=><Barra {...props} 
            //   //                     navigation={navigation}
            //   //                     route={route}
            //   //                 />
            // })}
          />
          <Stack.Screen 
            name="NuevoCliente"
            component={NuevoCliente}
            options={{
              title: 'Nuevo Cliente'
            }}
          />
          <Stack.Screen 
            name="DetallesCliente"
            component={DetallesCliente}
            options={{
              title: 'Detalles Cliente'
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;

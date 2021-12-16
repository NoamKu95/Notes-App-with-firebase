import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavDrawer from './Routes/drawer';


export default function App() {

  return (
  
      <NavigationContainer>
        <NavDrawer />
      </NavigationContainer>
  );
}
//Outer Imports:
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Inner Imports:
import MainPage from '../Main_Screens/MainPage';
import ViewEditNote from '../Main_Screens/ViewEditNote';




export default class MainPagesStack extends React.Component {

    render() {
        const Stack = createStackNavigator();

        return (
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainPage">
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="ViewEditNote" component={ViewEditNote} />
            </Stack.Navigator>
        )
    }
}
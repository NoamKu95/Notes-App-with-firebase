//Outer Imports:
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';

import AdministrationStack from './administrationStack';
import MainPagesStack from './mainPagesStack';

const Drawer = createDrawerNavigator();
export default function NavDrawer() {


    return (

        <Drawer.Navigator
            initialRouteName="AdministrationStack"
            drawerPosition='right'
            keyboardDismissMode='on-drag'
            screenOptions={{
                activeTintColor: 'white',
                inactiveTintColor: 'white',
                activeBackgroundColor: '#3a3b40',
            }}
            keyboardDismissMode
            screenOptions={{ headerShown: false }}
        >

            <Drawer.Screen
                name="AdministrationStack"
                component={AdministrationStack}
                options={{
                    swipeEnabled: false,
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.navigate('AdministrationStack');
                    },
                })}
            />

            < Drawer.Screen
                name="MainPagesStack"
                component={MainPagesStack}
                options={{
                    swipeEnabled: false,
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.navigate('MainPagesStack');
                    },
                })}
            />

        </Drawer.Navigator>
    );
}
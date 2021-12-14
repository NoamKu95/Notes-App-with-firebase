//#region Imports -

//Outer Imports:
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

//Inner Imports:
import ListMode from '../Main_Screens/ListMode';
import MapMode from '../Main_Screens/MapMode';

// Icons:
import { Feather } from '@expo/vector-icons';

//#endregion

const Tab = createBottomTabNavigator();

export default function App(props) {

    const navigation = useNavigation();

    const createNewNote = () => {

        let n = {
            id: null,
            date: { seconds: null },
            title: null,
            text: null
        }

        navigation.navigate('ViewEditNote', { isNew: true, note: n })
    }


    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                //Tabs design -
                tabBarIcon: ({ focused }) => {
                    let iconName; let color;

                    if (route.name === 'Map Mode') {
                        iconName = 'map';
                        color = focused ? '#3f6bc0' : '#436ab5'
                    } else if (route.name === 'List Mode') {
                        iconName = 'list';
                        color = focused ? '#3f6bc0' : '#436ab5'
                    }

                    return <Feather name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: '#3f6bc0', // text color of selected tab
                tabBarInactiveTintColor: '#436ab5', // text color of not selected tab
                tabBarStyle: {
                    backgroundColor: 'white'
                },
                tabBarActiveBackgroundColor: '#eff5ff'
            })}
        >

            <Tab.Screen name="List Mode" children={() => <ListMode createNewNote={createNewNote} />} />
            <Tab.Screen name="Map Mode" children={() => <MapMode createNewNote={createNewNote} />} />

        </Tab.Navigator>
    );
}
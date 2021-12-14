//#region Imports -
//Outer Imports:
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

//#endregion


export default function WelcomeMessage({name, pressLogout}) {

    return (

        <View style={styles.upperLine}>
            <Text style={styles.welcomeMessage}>Welcome back, {name}</Text>

            <TouchableOpacity style={styles.logout} onPress={() => pressLogout()}>
                <AntDesign name="logout" size={24} color="#1a3d60" />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({

    upperLine: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',

        top:10,
        paddingHorizontal: 15,
        paddingBottom: 5
    },
    welcomeMessage: {
        color: '#1a3d60',
        fontSize: 16,
    },

});
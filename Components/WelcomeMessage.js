//Outer Imports:
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
//Inner Imports:




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

    //Top texts:
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
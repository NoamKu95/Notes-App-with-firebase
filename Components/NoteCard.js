//#region Imports -

//Outer Imports:
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

//#endregion


export default function NoteCard({ note }) {

    return (

        <View style={styles.noteContainer}>

            <Text style={styles.cardTitle}>{note.title}</Text>

            <Text style={styles.cardText}>
                {note.text.length >= 130 ? note.text.substring(0, 134) + '...' : note.text}
            </Text>

        </View>

    );
}


const styles = StyleSheet.create({

    //Container:
    noteContainer: {
        maxHeight: Dimensions.get('window').height / 6,
        backgroundColor: 'white',
        flex: 1,
        marginVertical: 10,
        marginHorizontal: Dimensions.get('window').width * 0.03,
        padding: 15,
        direction: 'ltr',

        //Card border -
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'transparent',


        //Card shadow -
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    //Texts:
    cardTitle: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#588ae9',
    },
    cardText: {
        marginVertical: 7,
        color: 'black',
        fontSize: 14,
    }
});
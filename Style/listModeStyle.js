import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


const listModeStyle = StyleSheet.create({

    //Containers:
    mainContainer: {
        minHeight: Dimensions.get('window').height - 25,
        backgroundColor: '#fafafa',
        flex: 1,
        paddingBottom: 30
    },
    noNotesContainer:
    {
        alignItems: 'center',
        marginTop: '50%'
    },

    //Headers:
    mainHeading:
    {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#1a3d60',
    },
    noNotesYet:
    {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        paddingBottom: 15
    },

    //Sticky Button:
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 10,
        bottom: 30,
    },
});

export default listModeStyle;
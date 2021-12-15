import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


const signupStyle = StyleSheet.create({

    //Containers:
    mainContainer:
    {
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    viewContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    //Headers:
    mainHeading:
    {
        color: '#3f6ac4',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 45
    },
    fieldText: {
        flex: 1,
        alignSelf: 'center',
    },

    //Text Inputs:
    txtInput: {
        paddingHorizontal: 20,
        marginVertical: 25,
        minWidth: 190,
        backgroundColor: 'white',
        borderWidth: 1,
        flex: 1,
        textAlign: 'left',
        backgroundColor: 'white',
        borderColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: '#3f6ac4',
    },

    //Button:
    signUpButton: {
        backgroundColor: '#3f6ac4',
        borderRadius: 50,
        padding: 7,
        width: Dimensions.get('window').width * 0.9,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 30
    },
    signUpButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold'
    },

});

export default signupStyle;
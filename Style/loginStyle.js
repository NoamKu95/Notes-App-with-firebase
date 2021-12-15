import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


const loginStyle = StyleSheet.create({

    //Containers:
    mainContainer:
    {
        backgroundColor: 'white',
        height: Dimensions.get('window').height
    },
    viewContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.9
    },
    //Checkbox Container:
    bottomContainerStyle: {
        alignSelf: 'center',
        alignItems: 'center',
    },

    //Headings:
    appName: {
        color: '#3f6ac4',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height / 5
    },


    //Icons:
    iconStyle: {
        backgroundColor: 'white',
        paddingRight: 15,
        paddingTop: 11,
        height: 50,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#3f6ac4',
        borderLeftColor: '#3f6ac4'
    },


    //Text Inputs:
    txtInputWithIcon:
    {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 15,
        height: 50,
        backgroundColor: 'white',
        borderColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: '#3f6ac4',
        flex: 1,
        textAlign: 'center',
        paddingRight: 50,
    },


    //Button:
    loginButton: {
        backgroundColor: '#3f6ac4',
        borderRadius: 50,
        padding: 7,
        width: Dimensions.get('window').width * 0.9,
        height: 55,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 18
    },
    loginButtonText:
    {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold'
    },


    //Checkbox:
    chTextStyle: {
        color: '#3f6ac4',
        fontSize: 15
    },
    chContainerStyle: {
        backgroundColor: 'white',
        borderWidth: 0,
    },


    //Forgot Pass:
    textStyle: {
        color: '#3f6ac4',
        fontSize: 15,
        fontWeight: 'bold'
    },

    //Signup text:
    signupText:
    {
        color: '#3f6ac4',
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },

});

export default loginStyle;
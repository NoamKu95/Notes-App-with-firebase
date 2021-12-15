import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


const specificNoteStyle = StyleSheet.create({

    //Container:
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        minHeight: Dimensions.get('window').height - 45
    },
    viewContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },

    //Headings:
    mainHeader: {
        color: '#3f6ac4',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    fieldText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 20
    },
    fromGallery:
    {
        marginVertical: 15,
        fontWeight: 'bold'
    },


    //Inputs:
    txtInput: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 15,
        width: Dimensions.get('window').width * 0.85,
        height: 50,
        backgroundColor: '#dfe0e4',
        borderRadius: 20,
        flex: 1,
        textAlign: 'left',

    },
    editableTxtInput: {
        paddingHorizontal: 20,
        marginVertical: 25,
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: 'white',
        borderWidth: 1,
        flex: 1,
        textAlign: 'left',
        backgroundColor: 'white',
        borderColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: '#3f6ac4',
        color: 'black'
    },
    multilineInput: {

        paddingVertical: 15,
        paddingHorizontal: 20,
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: '#dfe0e4',
        borderRadius: 20,
        flex: 1,
        textAlign: 'left',
        textAlignVertical: 'top',
        borderColor: 'transparent',
        borderWidth: 1,
        maxHeight: Dimensions.get('window').height * 0.7,
        minHeight: Dimensions.get('window').height * 0.20,
        color: 'black'
    },
    editableMultilineInput: {

        paddingHorizontal: 20,
        marginVertical: 25,
        width: Dimensions.get('window').width * 0.85,
        minHeight: Dimensions.get('window').height * 0.07,
        backgroundColor: 'white',
        flex: 1,
        textAlign: 'left',
        borderColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: '#3f6ac4',
        textAlignVertical: 'center',
        color: 'black'
    },

    galleryPhoto:
    {
        borderRadius: 20,
        alignSelf: 'center',
        width: '100%',
        height: Dimensions.get('window').height / 4
    },

    //Save Button:
    saveButton: {
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
    saveButtonText:
    {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold'
    },

    //Button:
    pickDateButton: {
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: 'white',
        flex: 1,
        textAlign: 'left',
        borderColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: '#3f6ac4',
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    //Sticky Button:
    stickyLow: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 35,
        zIndex: 2,
        backgroundColor: '#588ae9',
        borderRadius: 50
    },
    stickyHigh: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 85,
        zIndex: 2,
        backgroundColor: '#588ae9',
        borderRadius: 50
    },

});

export default specificNoteStyle;
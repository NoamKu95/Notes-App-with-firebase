import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


const mapModeStyle = StyleSheet.create({

    //Containers:
    upSectionContainer:
    {
        flexDirection: 'row',
        backgroundColor: '#fafafa',
        height: 45,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    swichableContainer:
    {
        flexDirection: 'row',
    },


    //Button:
    buttonStyle:
    {
        backgroundColor: '#3a3b40',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 50,
        padding: 5,
        width: 120,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonTextStyle:
    {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        alignSelf: 'center',
        fontWeight: 'bold'
    },


    //Sticky Button:
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 10,
        bottom: 6,
        zIndex: 2
    },


    //Map:
    mapGeneralStyle:
    {
        flex: 0.7,
        width: Dimensions.get('window').width,
        minHeight: Dimensions.get('window').height - 25
    },


    //Tooltip:
    tooltipBubble:
    {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 180
    },
    bubbleArrow:
    {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: 'white',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    bubbleArrowBorder:
    {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    },
    tooltipTitle:
    {
        fontSize: 17,
        fontWeight: 'bold'
    },
    tooltipContent:
    {
        marginVertical: 3,
        lineHeight: 14
    },

});

export default mapModeStyle;
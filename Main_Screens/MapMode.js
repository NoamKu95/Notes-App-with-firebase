//#region Imports -

//Outer Imports:
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import MapView, { Callout, Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import { collection, getDocs } from 'firebase/firestore';

//Inner Imports:
import { db } from '../Firebase/firebase';

//Icons:
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

//#endregion

export default function MapMode(props) {

    const navigation = useNavigation();
    const notesColletionRef = collection(db, "notes");  // bring the notes collection from the firestore

    //The center of the map:
    const [focusRegion, setFocusRegion] = useState({
        latitude: 32.114236,
        longitude: 34.878466,
        latitudeDelta: 1.4122,
        longitudeDelta: 1.4121
    });

    //Notes:
    const [notes, setNotes] = useState([]);

    // Map Styles:
    const [mapStyleToDisplay, setMapStyleToDisplay] = useState('Light Mode');

    const [lightMapStyle, setLightMapStyle] = useState([
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "stylers": [
                {
                    "lightness": 20
                },
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ])
    const [darkMapStyle, setDarkMapStyle] = useState([
        {
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#757575"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#181818"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#1b1b1b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#2c2c2c"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8a8a8a"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#373737"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#3c3c3c"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#3d3d3d"
                }
            ]
        }
    ]);


    // Alerts:
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');


    //Loading animation:
    const [spinner, setSpinner] = useState(true);


    // ======================================================================================



    //Fetch markers (notes) everytime user focuses on this screen:
    useEffect(() => {

        const checkFocus = navigation.addListener('focus', () => {

            fetchNotesLocations();
        });

        return checkFocus;
    }, []);


    //Fetch notes from firestore DB:
    const fetchNotesLocations = async () => {

        setSpinner(true);

        const data = await getDocs(notesColletionRef); // actually get all the notes into a variable
        let notesArr = [];
        data.docs.map((doc) => (notesArr.push({ ...doc.data(), id: doc.id }))); //put each note (and its properties) into an array

        setNotes(notesArr);

        setSpinner(false);
    }


    //Center the map in zoom and location:
    const resetMap = () => {

        setFocusRegion({
            latitude: 32.114236,
            longitude: 34.878466,
            latitudeDelta: 1.4122,
            longitudeDelta: 1.4121
        })
    }


    //Toggle the color of the map:
    const changeMapStyle = () => {

        mapStyleToDisplay == 'Dark Mode' ? setMapStyleToDisplay('Light Mode') : setMapStyleToDisplay('Dark Mode');
    }


    //A tooltip was pressed - move user to view note:
    const viewNotePressed = (pressedNote) => {

        navigation.navigate('ViewEditNote', { isNew: false, note: pressedNote })
    }


    // ======================================================================================


    return (
        <>
            <StatusBar backgroundColor='#fafafa' barStyle='dark-content' />

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={alertTitle}
                message={alertMessage}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="confirm"
                confirmButtonColor="#3f6ac4"
                onConfirmPressed={() => { setShowAlert(false) }}
                messageStyle={styles.alertMessageStyle}
                titleStyle={styles.alertTitleStyle}
                overlayStyle={{ backgroundColor: 'rgba(76, 76, 76, 0.69)' }}
                confirmButtonStyle={styles.alertConfirmBtnStyle}
                confirmButtonTextStyle={styles.alertConfirmBtnTxtStyle}
                contentContainerStyle={styles.alertContentContainerStyle}
            />

            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
                color={'white'}
                animation={'fade'}
                overlayColor={'rgba(58, 59, 64, 0.65)'}
            />

            <View style={styles.upSectionContainer}>

                <View style={styles.swichableContainer}>

                    <MaterialIcons name="keyboard-arrow-right" size={25} color="#3f6ac4" onPress={() => changeMapStyle()} />
                    <Text style={{ color: '#3f6ac4', fontSize: 17 }}>{mapStyleToDisplay}</Text>
                    <MaterialIcons name="keyboard-arrow-left" size={25} color="#3f6ac4" onPress={() => changeMapStyle()} />

                </View>


                <TouchableOpacity onPress={() => resetMap()} style={{ flex: 1 }}>
                    <MaterialIcons name="my-location" size={24} color="#3f6ac4" />
                </TouchableOpacity>

            </View>


            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => props.createNewNote()}
                style={styles.touchableOpacityStyle}>
                <AntDesign name="pluscircle" size={45} color="#588ae9" />
            </TouchableOpacity>



            <MapView
                style={styles.mapGeneralStyle}
                region={focusRegion}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyleToDisplay == 'Light Mode' ? lightMapStyle : darkMapStyle}
                showsCompass={false}
                showsScale={true}
                zoomTapEnabled={false}
                zoomControlEnabled={true}
                rotateEnabled={false}
                loadingEnabled={true}
            >
                {
                    notes.length != 0 ?
                        notes.map((marker) => (
                            marker.latlng.latitude == null ?
                                <></>
                                :
                                <Marker
                                    key={marker.date.seconds}
                                    coordinate={marker.latlng}
                                    title={marker.title}
                                    description={marker.description}
                                    opacity={0.7}
                                >
                                    <Callout tooltip onPress={() => viewNotePressed(marker)}>
                                        <View>
                                            <View style={styles.tooltipBubble}>
                                                <Text style={styles.tooltipTitle}>
                                                    {marker.title.length > 15 ? marker.title.substring(0, 12) + '...' : marker.title}
                                                </Text>
                                                <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'baseline' }}>
                                                    <AntDesign name="right" size={15} color="#3a3b40" />
                                                    <Text style={styles.tooltipContent}>
                                                        {marker.text.length > 18 ? marker.text.substring(0, 15) + '...' : marker.text}
                                                    </Text>

                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.bubbleArrowBorder} />
                                            <View style={styles.bubbleArrow} />
                                        </View>
                                    </Callout>

                                </Marker>
                        ))
                        : <></>
                }

            </MapView>
        </>
    );
}


const styles = StyleSheet.create({

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

    //Spinner:
    spinnerTextStyle:
    {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold'
    },

    //Alerts:
    alertMessageStyle: {
        fontSize: 20, color: '#3a3b40', textAlign: 'right'
    },
    alertTitleStyle: {
        fontSize: 22, color: '#3a3b40', textAlign: 'center', fontWeight: 'bold'
    },
    alertConfirmBtnStyle: {
        borderRadius: 50, width: 180
    },
    alertConfirmBtnTxtStyle: {
        fontSize: 17, padding: 5, textAlign: 'center', fontWeight: 'bold'
    },
    alertContentContainerStyle: {
        borderRadius: 15, width: 300
    },
});
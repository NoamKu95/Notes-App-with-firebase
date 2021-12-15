//#region Imports

//Outer Imports -
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
// import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';

//Inner Imports -
import NoteCard from '../Components/NoteCard';
import WelcomeMessage from '../Components/WelcomeMessage';
import { db } from '../Firebase/firebase';
import Spinner from '../Components/Spinner';
import AlertPopup from '../Components/AlertPopup';

//Icons:
import { AntDesign } from '@expo/vector-icons';

//#endregion


export default function NotificationsList(props) {

    const navigation = useNavigation();
    const notesColletionRef = collection(db, "notes");  // bring the notes collection from the firestore

    //User name:
    const [userName, setUserName] = useState('');

    //Notes:
    const [notes, setNotes] = useState([]);

    //Alerts:
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    //Loading animation:
    const [spinner, setSpinner] = useState(true);


    // ======================================================================================


    //Fetch the notes everytime we focus on this page:
    useEffect(() => {

        const checkFocus = navigation.addListener('focus', () => {

            getUserDetails();
        });

        return checkFocus;
    }, []);



    //Get the user's details from the Async Storage:
    const getUserDetails = async () => {
        try {

            const jsonValue = await AsyncStorage.getItem('userDetails')

            if (jsonValue != null) {

                let user = JSON.parse(jsonValue);
                if (user != null) {

                    setUserName(`${user.u_FirstName} ${user.u_LastName}`);
                    fetchMyNotes();    //Get this user's notes from the DB
                }
                else
                    setSpinner(false);
            }
            else {

                setSpinner(false);
                setAlertTitle("Error");
                setAlertMessage("An error occurred when pulling the user's data from the local storage");
                setShowAlert(true);
            }
        }
        catch {

            setSpinner(false);
            setAlertTitle("Error");
            setAlertMessage("An error occurred when accessing the lcoal storage");
            setShowAlert(true);
        }
    }


    //Get the user's notes from the DB:
    const fetchMyNotes = async () => {

        setSpinner(true);

        const data = await getDocs(notesColletionRef); // actually get all the notes into a variable
        let notesArr = [];
        data.docs.map((doc) => (notesArr.push({ ...doc.data(), id: doc.id }))); //put each note (and its properties) into an array

        //Order the notes by date (newest to oldes):
        notesArr.sort(function (a, b) {
            var keyA = a.date.seconds,
                keyB = b.date.seconds;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
        setNotes(notesArr);

        setSpinner(false);
    }


    //User clicked the logout button:
    const logUserOut = async () => {

        //Update the "remember me" in the local storage:
        await AsyncStorage.setItem('rememberUser', 'false');

        //Move the user back to the login page:
        navigation.navigate('AdministrationStack', { screen: 'Login' });
    }


    // ======================================================================================



    return (
        <>
            <StatusBar backgroundColor='#fafafa' barStyle='dark-content' />

            <AlertPopup showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={alertMessage} alertTitle={alertTitle}/>

            <Spinner visibility={spinner} />

            <View style={styles.mainContainer}>


                <WelcomeMessage name={userName} pressLogout={() => logUserOut()} />

                {
                    notes.length == 0 ?
                        <></>
                        :
                        <Text style={styles.mainHeading}>My Notes</Text>
                }


                <ScrollView>
                    {
                        notes.length == 0 ?
                            <View style={styles.noNotesContainer}>
                                <Text style={styles.noNotesYet}>No notes yet!</Text>
                                <Text>Click the (+) button to create a new note</Text>
                            </View>
                            :
                            notes.map((item, key) => {

                                return <TouchableOpacity key={key}
                                    style={{ height: Dimensions.get('window').height / 6 }}
                                    onPress={() => navigation.navigate('ViewEditNote', { isNew: false, note: item })}
                                >
                                    <NoteCard note={item} />
                                </TouchableOpacity>
                            })
                    }
                </ScrollView>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => props.createNewNote()}
                    style={styles.touchableOpacityStyle}>
                    <AntDesign name="pluscircle" size={45} color="#588ae9" />
                </TouchableOpacity>
            </View>
        </>
    );
}




const styles = StyleSheet.create({

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
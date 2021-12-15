//#region Imports -

//Outer Imports:
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, StatusBar, Platform, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AutoGrowTextInput } from 'react-native-auto-grow-textinput';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import * as Location from 'expo-location';

//Inner Imports:
import Header from '../Components/Header';
import { db } from '../Firebase/firebase';
import Spinner from '../Components/Spinner';
import AlertPopup from '../Components/AlertPopup';

//Icons:
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


//#endregion 

export default function ViewEditNote(props) {

    const notesCollectionRef = collection(db, "notes");
    const navigation = useNavigation();

    //Page states:
    const [isNewNote, setIsNewNote] = useState(props.route.params.isNew);    //true if adding a new note ; false if existing note
    const [isEditing, setIsEditing] = useState(false);                      //true if editing existing note ; false if just viewing existing note

    //Note properties:
    const [noteDate, setNoteDate] = useState(props.route.params.note.date.seconds);
    const [noteTitle, setNoteTitle] = useState(props.route.params.note.title);
    const [noteBody, setNoteBody] = useState(props.route.params.note.text);
    const [noteId, setNoteId] = useState(props.route.params.note.id);

    // Date:
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //Loading animation:
    const [spinner, setSpinner] = useState(false);

    //Alerts:
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');


    // ==================================================================================



    //Get today's date when whenever screen is focused:
    useEffect(() => {
        const checkFocus = props.navigation.addListener('focus', () => {
            if (isNewNote) {
                //Put default readable string date of today:
                setNoteDate(formatDate(new Date()));
            }
            else {
                //Turn the database's timestamp to a readable date:
                setNoteDate(formatDate(new Date(props.route.params.note.date.seconds)));
            }
        });

        return checkFocus;
    }, []);


    //Get a date and turn it to dd/mm/yyyy:
    const formatDate = (date) => {

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return (day + '/' + month + '/' + year);
    }


    //A new date was picked with the DatePicker:
    const onChange = (event, selectedDate) => {

        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        //Turn time to readable string date:
        setNoteDate(formatDate(currentDate));
    };


    //Hide or show the DatePicker:
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };


    //Check all fields are correctly filled before saving:
    const validateFields = (action) => {

        if (noteDate == '' || noteDate == null) {

            setSpinner(false);
            setAlertMessage("Please select a date");
            setAlertTitle("Oops");
            setShowAlert(true);
        }
        else {
            if (noteTitle == '' || noteTitle == null) {

                setSpinner(false);
                setAlertMessage('Please enter a title');
                setAlertTitle('Oops');
                setShowAlert(true);
            }
            else {
                if (noteBody == '' || noteBody == null) {

                    setSpinner(false);
                    setAlertMessage('Please enter description');
                    setAlertTitle('Oops');
                    setShowAlert(true);
                }
                else {

                    getUsersLocation(action)
                }
            }
        }
    }


    //Get the user's current location and save it to the note:
    const getUsersLocation = async (action) => {

        //Get a timestamp of the date chosen for the note:
        var myDate = noteDate.split("/");
        var newDate = Math.round(new Date(myDate[2], myDate[1] - 1, myDate[0], new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()));

        //Prepare the object to be added to the firestore DB -
        var note = {
            date: { seconds: newDate }, //according to firebase's build - put timestamp under "seconds"
            title: noteTitle,
            text: noteBody,
            latlng: {
                latitude: null,
                longitude: null
            }
        }

        //Get user's corrent location:
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {

            let location = await Location.getCurrentPositionAsync({});
            note.latlng.latitude = location.coords.latitude;
            note.latlng.longitude = location.coords.longitude;
        }

        action == 'save' ? saveNewNote(note) : updateNote(note);
    }


    //Save button was pressed to save new note:
    const saveNewNote = async (note) => {

        setSpinner(true);

        //Save new note to the firestore database:
        await addDoc(notesCollectionRef, note);

        setSpinner(false);

        //Move the user back to the notes' page:
        navigation.navigate('MainPagesStack', { screen: 'MainPage' });
    }


    //Save button was pressed to update existing note:
    const updateNote = async (note) => {

        setSpinner(true);

        //Send updated note to the firestore database:
        let noteDoc = doc(db, "notes", noteId); // focus on the right note to update in the firestore db
        const newFields = { title: note.title, text: note.text, date: note.date }; // we want to update specific fields
        await updateDoc(noteDoc, newFields);

        setIsEditing(false);
        setSpinner(false);
    }


    //Delete icon was pressed to delete existing note:
    const deleteNote = async () => {

        setSpinner(true);

        //Delete requested nte from the firestore database
        let noteDoc = doc(db, "notes", noteId); // focus on the right note to delete from the firestore db
        await deleteDoc(noteDoc);

        setSpinner(false);
        //Move the user back to the notes screen
        navigation.navigate('MainPagesStack', { screen: 'MainPage' });
    }


    // ==================================================================================

    return (

        <>
            <StatusBar backgroundColor='#3f6ac4' barStyle='light-content' />

            <Header navigation={props.navigation} showArrow={true} showMenu={true} />

            <AlertPopup showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={alertMessage} alertTitle={alertTitle}/>

            <Spinner visibility={spinner} />

            <ScrollView>
                <View style={styles.mainContainer}>

                    {/* Buttons */}
                    {
                        !isNewNote && !isEditing ?
                            <View style={{ alignSelf: 'flex-start' }}>
                                <TouchableOpacity
                                    onPress={() => { setIsEditing(true) }}
                                    style={{ flexDirection: 'column', marginTop: 10, marginLeft: 0, }}
                                >
                                    <MaterialCommunityIcons name="pencil-circle" size={40} color="#3f6ac4" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { deleteNote() }}
                                    style={{ flexDirection: 'column', marginTop: 10, marginLeft: 0, }}
                                >
                                    <MaterialCommunityIcons name="delete-circle" size={40} color="#3f6ac4" />
                                </TouchableOpacity>
                            </View>
                            :
                            isNewNote ?
                                <></>
                                :
                                <TouchableOpacity
                                    onPress={() => { setIsEditing(false) }}
                                    style={{ flexDirection: 'row', marginTop: 10, marginLeft: 0 }}
                                >
                                    <AntDesign name="closecircle" size={33} color="#3f6ac4" />
                                </TouchableOpacity>

                    }



                    {/* Title */}
                    {
                        isNewNote ?
                            <Text style={styles.mainHeader}>Create Note</Text>
                            :
                            isEditing ?
                                <Text style={styles.mainHeader}>Edit Note</Text>
                                :
                                <Text style={styles.mainHeader}>{noteTitle}</Text>
                    }


                    {/* Date */}
                    {
                        !isNewNote && !isEditing ?
                            <View style={{ justifyContent: 'center', marginBottom: 20 }}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', textAlign: 'center', alignSelf: 'center' }}>{noteDate}</Text>
                            </View>
                            :
                            <TouchableOpacity style={styles.viewContainer} onPress={() => showMode('date')}>
                                <TextInput
                                    editable={false}
                                    style={styles.editableTxtInput}
                                    placeholder='Pick Date'
                                    defaultValue={noteDate}
                                ></TextInput>

                                <Text style={styles.fieldText}>Date:</Text>

                            </TouchableOpacity>
                    }


                    {/* Date Picker */}
                    {
                        show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )
                    }


                    {/* Title Textbox */}
                    {
                        isNewNote || isEditing ?
                            <View style={styles.viewContainer}>

                                <TextInput
                                    editable={isNewNote || isEditing ? true : false}
                                    style={isNewNote || isEditing ? styles.editableTxtInput : styles.txtInput}
                                    onChangeText={(e) => setNoteTitle(e)}
                                    defaultValue={isNewNote ? '' : noteTitle}
                                ></TextInput>

                                <Text style={styles.fieldText}>Title:</Text>

                            </View>
                            :
                            <></>
                    }


                    {/* Date */}
                    {
                        isNewNote || isEditing ?
                            <View style={styles.viewContainer}>

                                <AutoGrowTextInput
                                    defaultValue={isNewNote ? '' : noteBody}
                                    onChangeText={(e) => setNoteBody(e)}
                                    editable={true}
                                    style={styles.editableMultilineInput}
                                />

                                <Text style={styles.fieldText}>Text:</Text>

                            </View>
                            :
                            <View style={styles.viewContainer}>
                                <AutoGrowTextInput
                                    defaultValue={noteBody}
                                    editable={false}
                                    style={styles.multilineInput}
                                />
                            </View>
                    }


                    {
                        isNewNote ?
                            <TouchableOpacity onPress={() => validateFields('save')} style={styles.saveButton}>
                                <Text style={styles.saveButtonText}> save new note </Text>
                            </TouchableOpacity>
                            :
                            isEditing ?
                                <TouchableOpacity onPress={() => validateFields('update')} style={styles.saveButton}>
                                    <Text style={styles.saveButtonText}> save changes </Text>
                                </TouchableOpacity>
                                :
                                <></>
                    }

                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({

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
        minHeight: Dimensions.get('window').height * 0.10,
        backgroundColor: 'white',
        flex: 1,
        textAlign: 'left',
        borderColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: '#3f6ac4',
        textAlignVertical: 'center',
        color: 'black'
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
});
//#region Imports -

//Outer Imports:
import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, KeyboardAvoidingView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { collection, addDoc } from 'firebase/firestore';

//Inner Imports:
import Header from '../Components/Header';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase'
import { db } from '../Firebase/firebase';

//#endregion


export default function Signup(props) {

    const usersCollectionRef = collection(db, "users");

    //Fields:
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    //Alerts:
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');


    //Loading animation:
    const [spinner, setSpinner] = useState(false);


    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;      //Lift the screen when keyboard is open
    const navigation = useNavigation();


    // ==================================================================================================



    // Check all fields have valid content in them:
    const validateInputs = () => {

        if (firstName == null || firstName == '') {

            setAlertMessage('Please fill in your first name');
            setAlertTitle('Oops');
            setShowAlert(true);
        }
        else if (firstName.length < 3) {

            setAlertMessage('Your first name should be at least 3 letters long');
            setAlertTitle('Oops');
            setShowAlert(true);
        }
        else {

            if (lastName == null || lastName == '') {

                setAlertMessage('Please fill in your last name');
                setAlertTitle('Oops');
                setShowAlert(true);
            }
            else if (lastName.length < 3) {

                setAlertMessage('Your last name should be at least 3 letters long');
                setAlertTitle('Oops');
                setShowAlert(true);
            }
            else {

                if (email == null || email == '') {

                    setAlertMessage('Please fill in your email address');
                    setAlertTitle('oops');
                    setShowAlert(true);
                }
                else {

                    let reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //email pattern xxx@xx.xx
                    let e = email;
                    if (reg.test(e) === false) {

                        setAlertMessage('Please enter a valid email address');
                        setAlertTitle('Oops');
                        setShowAlert(true);
                    }
                    else {

                        if (password == null || password == '') {

                            setAlertMessage('Please fill in a password');
                            setAlertTitle('Oops');
                            setShowAlert(true);
                        }
                        else {

                            if (password.length < 7) {

                                setAlertMessage('Password must contain at least 7 characters');
                                setAlertTitle('Oops');
                                setShowAlert(true);
                            }
                            else
                                handleSignUp();
                        }
                    }
                }
            }
        }
    }


    //Create a new user in Firebase's authentication + user's colelction:
    const handleSignUp = async () => {

        setSpinner(true);
        try {

            //Authentication service:
            const user = await createUserWithEmailAndPassword(auth, email, password);

            //Users' collection:
            newUser = {
                firstName: firstName,
                lastName: lastName,
                emailAdress: email,
                password: password
            }
            await addDoc(usersCollectionRef, newUser);


            //Clear fields:
            setEmail(null);
            setFirstName(null);
            setLastName(null);
            setPassword(null)

            setSpinner(false);

            //Send user back to login screen:
            navigation.goBack();
        }
        catch (error) {

            if (error.message.includes("email-already-in-use")) {

                setSpinner(false);
                setAlertMessage("This email adress is already registered in the system");
                setAlertTitle("Oops");
                setShowAlert(true);
            }
            else {
                setSpinner(false);
                setAlertMessage(error.message);
                setAlertTitle("Oops");
                setShowAlert(true);
            }
        }
    }


    // ==================================================================================================

    return (
        <>
            <StatusBar backgroundColor='#3f6ac4' barStyle='dark-content' />

            <Header navigation={navigation} showArrow={true} showMenu={true} />

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


            <ScrollView style={{ backgroundColor: 'white', minHeight: Dimensions.get('window').height - 45 }}>

                <View style={styles.mainContainer}>


                    <Text style={styles.mainHeading}>Signup</Text>

                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

                        <View style={styles.viewContainer}>
                            <TextInput
                                defaultValue={firstName}
                                onChangeText={(e) => setFirstName(e)}
                                maxLength={70} style={styles.txtInput}
                            ></TextInput>
                            <Text style={styles.fieldText}>First Name:</Text>

                        </View>


                        <View style={styles.viewContainer}>
                            <TextInput
                                defaultValue={lastName}
                                onChangeText={(e) => setLastName(e)}
                                scrollEnabled
                                style={styles.txtInput}
                            >
                            </TextInput>
                            <Text style={styles.fieldText}>Last Name:</Text>

                        </View>

                        <View style={styles.viewContainer}>
                            <TextInput
                                defaultValue={email}
                                onChangeText={(e) => setEmail(e)}
                                maxLength={70} style={styles.txtInput}
                            >
                            </TextInput>
                            <Text style={styles.fieldText}>Email:</Text>

                        </View>

                        <View style={styles.viewContainer}>
                            <TextInput
                                defaultValue={password}
                                onChangeText={(e) => setPassword(e)}
                                maxLength={70} style={styles.txtInput}
                            >
                            </TextInput>
                            <Text style={styles.fieldText}>Password:</Text>

                        </View>

                    </KeyboardAvoidingView>


                    <TouchableOpacity
                        onPress={validateInputs}
                        style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>
                            sign me up
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({

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
        marginTop: Dimensions.get('window').height / 7
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
    saveButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold'
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
    }
});
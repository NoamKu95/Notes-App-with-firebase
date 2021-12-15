//#region Imports -

//Outer Imports:
import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, StatusBar, KeyboardAvoidingView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';

//Inner Imports:
import signupStyle from '../Style/signupStyle';
import Header from '../Components/Header';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase'
import { db } from '../Firebase/firebase';
import Spinner from '../Components/Spinner';
import AlertPopup from '../Components/AlertPopup';

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
            let newUser = {
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

            <AlertPopup showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={alertMessage} alertTitle={alertTitle}/>

            <Spinner visibility={spinner} />

            <ScrollView style={{ backgroundColor: 'white', minHeight: Dimensions.get('window').height - 45 }}>

                <View style={signupStyle.mainContainer}>


                    <Text style={signupStyle.mainHeading}>Signup</Text>

                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

                        <View style={signupStyle.viewContainer}>
                            <TextInput
                                defaultValue={firstName}
                                onChangeText={(e) => setFirstName(e)}
                                maxLength={70} style={signupStyle.txtInput}
                            ></TextInput>
                            <Text style={signupStyle.fieldText}>First Name:</Text>

                        </View>


                        <View style={signupStyle.viewContainer}>
                            <TextInput
                                defaultValue={lastName}
                                onChangeText={(e) => setLastName(e)}
                                scrollEnabled
                                style={signupStyle.txtInput}
                            >
                            </TextInput>
                            <Text style={signupStyle.fieldText}>Last Name:</Text>

                        </View>

                        <View style={signupStyle.viewContainer}>
                            <TextInput
                                defaultValue={email}
                                onChangeText={(e) => setEmail(e)}
                                maxLength={70} style={signupStyle.txtInput}
                                autoCapitalize = 'none'
                            >
                            </TextInput>
                            <Text style={signupStyle.fieldText}>Email:</Text>

                        </View>

                        <View style={signupStyle.viewContainer}>
                            <TextInput
                                defaultValue={password}
                                onChangeText={(e) => setPassword(e)}
                                maxLength={70} style={signupStyle.txtInput}
                            >
                            </TextInput>
                            <Text style={signupStyle.fieldText}>Password:</Text>

                        </View>

                    </KeyboardAvoidingView>


                    <TouchableOpacity
                        onPress={validateInputs}
                        style={signupStyle.signUpButton}>
                        <Text style={signupStyle.signUpButtonText}>
                            sign me up
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </>
    );
}
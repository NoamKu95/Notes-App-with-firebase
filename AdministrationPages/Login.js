//#region Imports -
//Outer Imports:
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, TextInput, StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, doc } from 'firebase/firestore';

//Inner Imports:
import loginStyle from '../Style/loginStyle';
import { auth } from '../Firebase/firebase'
import { db } from '../Firebase/firebase';
import Spinner from '../Components/Spinner';
import AlertPopup from '../Components/AlertPopup';

//Icons:
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//#endregion


export default function Login(props) {

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;      // Lift the screen when keyboard is open
    const usersCollectionRef = collection(db, "users");

    //Remember me Checkbox:
    const [checkedRemember, setCheckedRemember] = useState(true);      // Does the user want to be auto-logged next time?

    //Credentials:
    const [userEmail, setUserEmail] = useState(null);
    const [userPass, setUserPass] = useState(null);

    //Show / Hide password being typed in:
    const [showPassword, setShowPassword] = useState(false);

    //Alerts:
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    //Loading animation:
    const [spinner, setSpinner] = useState(false);


    // ======================================================================================



    //Check if to auto-login everytime user focuses on this screen:
    useEffect(() => {

        const checkFocus = props.navigation.addListener('focus', () => {

            setShowPassword(false);
            checkIfUnknownUser();
        });

        return checkFocus;
    }, []);


    // Check in the Async Storage if they user asked to be remembered:
    const checkIfUnknownUser = async () => {

        try {
            const value = await AsyncStorage.getItem('rememberUser');

            if (value !== null) {
                if (value === 'true')
                    props.navigation.navigate('AdministrationStack', { screen: 'MainPage' });  //automatically move the user into the app
            }
        }
        catch (e) {

            setAlertMessage('An error occured while accessing the local storage');
            setAlertTitle('Error');
            setShowAlert(true);
        }
    }


    //check both fields have content & that email is in valid structure:
    const validateFields = () => {

        if (userEmail == '' || userEmail == null) {

            setAlertMessage('Please enter an email address');
            setAlertTitle('Error');
            setShowAlert(true);
        }
        else {

            let reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //email pattern xxx@xx.xx
            let email = userEmail;
            if (reg.test(email) === false) {

                setAlertMessage('Email address is not valid');
                setAlertTitle('Error');
                setShowAlert(true);
            }
            else {

                if (userPass == '' || userPass == null) {

                    setAlertMessage('Please enter a password');
                    setAlertTitle('Error');
                    setShowAlert(true);
                }
                else {

                    if (userPass.length < 7) {
                        setAlertMessage('Password is too short');
                        setAlertTitle('Error');
                        setShowAlert(true);
                    }
                    else {

                        handleLogin();
                    }
                }
            }
        }
    }



    //Authenticate the credentials against firebase:
    const handleLogin = async () => {

        setSpinner(true);

        try {

            //Confirm credentials:
            const user = await signInWithEmailAndPassword(auth, userEmail, userPass);

            //Pull user's name from the database:
            const data = await getDocs(usersCollectionRef);
            let usersArr = [];
            data.docs.map((doc) => (usersArr.push({ ...doc.data() })));
            let thisUser = usersArr.find(x => x.emailAdress === userEmail);

            //Save data on the user to the Async Storage:
            await AsyncStorage.setItem('userDetails', JSON.stringify({ u_FirstName: thisUser.firstName, u_LastName: thisUser.lastName }));

            //Save the "remember me" descision to the Async Storage:
            await AsyncStorage.setItem('rememberUser', JSON.stringify(checkedRemember));

            //Clear fields:
            setUserEmail(null);
            setUserPass(null);

            setSpinner(false);

            //Move user into the app:
            props.navigation.navigate('MainPagesStack', { screen: 'MainPage' });
        }
        catch (error) {

            if (error.message.includes("user-not-found")) {

                setSpinner(false);
                setShowAlert(true);
                setAlertTitle("Oops");
                setAlertMessage("Couldn't find a match in the database for these credentials");
            }
            else {
                setSpinner(false);
                setShowAlert(true);
                setAlertTitle("Oops");
                setAlertMessage(error.messag);
            }
        }
    }


    // ======================================================================================


    return (
        <>
            <View style={loginStyle.mainContainer}>

                <StatusBar backgroundColor='white' barStyle='dark-content' />

                <AlertPopup showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={alertMessage} alertTitle={alertTitle}/>

                <Spinner visibility={spinner} />

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

                    <Text style={loginStyle.appName}>Notes App</Text>

                    <View style={loginStyle.viewContainer}>

                        <Ionicons name="at" size={28} color="black" style={loginStyle.iconStyle} />

                        <TextInput
                            style={loginStyle.txtInputWithIcon}
                            placeholder={'email'}
                            onChangeText={(e) => setUserEmail(e)}
                            keyboardType='email-address'
                            defaultValue={userEmail}
                            autoCapitalize = 'none'
                        >
                        </TextInput>

                    </View>

                    {
                        showPassword ?
                            <View style={loginStyle.viewContainer}>

                                <MaterialCommunityIcons name="eye-outline" size={24} color="#3a3b40" style={loginStyle.iconStyle} onPress={() => { setShowPassword(false) }} />

                                <TextInput
                                    style={loginStyle.txtInputWithIcon}
                                    placeholder={'password'}
                                    onChangeText={(e) => setUserPass(e)}
                                    defaultValue={userPass}
                                >
                                </TextInput>

                            </View>
                            :
                            <View style={loginStyle.viewContainer}>

                                <MaterialCommunityIcons name="eye-off-outline" size={24} color="#3a3b40" style={loginStyle.iconStyle} onPress={() => { setShowPassword(true) }} />

                                <TextInput secureTextEntry
                                    style={loginStyle.txtInputWithIcon}
                                    placeholder={'password'}
                                    onChangeText={(e) => setUserPass(e)}
                                    defaultValue={userPass}
                                >
                                </TextInput>

                            </View>
                    }
                </KeyboardAvoidingView>

                <TouchableOpacity
                    onPress={() => validateFields()}
                    style={loginStyle.loginButton}
                >
                    <Text
                        style={loginStyle.loginButtonText}>
                        Login
                    </Text>
                </TouchableOpacity>


                <View style={loginStyle.bottomContainerStyle}>

                    <TouchableOpacity>
                        <CheckBox
                            onPress={() => checkedRemember ? setCheckedRemember(false) : setCheckedRemember(true)}
                            title='Remember me'
                            checked={checkedRemember}
                            checkedColor='#3f6ac4'
                            containerStyle={loginStyle.chContainerStyle}
                            textStyle={loginStyle.chTextStyle}
                        />
                    </TouchableOpacity>

                </View>


            </View>
            <View>
                <Text
                    onPress={() => {
                        //Clear fields:
                        setUserEmail(null); setUserPass(null);
                        props.navigation.navigate('Signup')
                    }}
                    style={loginStyle.signupText}
                >
                    Don't have an account yet?
                </Text>
            </View>
        </>
    );
}
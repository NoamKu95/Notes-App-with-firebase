//#region Imports -
//Outer Imports:
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, doc } from 'firebase/firestore';

//Inner Imports:
import { auth } from '../Firebase/firebase'
import { db } from '../Firebase/firebase';
import Spinner from '../Components/Spinner';

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
            <View style={styles.mainContainer}>

                <StatusBar backgroundColor='white' barStyle='dark-content' />

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

                <Spinner visibility={spinner} />

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

                    <Text style={styles.appName}>Notes App</Text>

                    <View style={styles.viewContainer}>

                        <Ionicons name="at" size={28} color="black" style={styles.iconStyle} />

                        <TextInput
                            style={styles.txtInputWithIcon}
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
                            <View style={styles.viewContainer}>

                                <MaterialCommunityIcons name="eye-outline" size={24} color="#3a3b40" style={styles.iconStyle} onPress={() => { setShowPassword(false) }} />

                                <TextInput
                                    style={styles.txtInputWithIcon}
                                    placeholder={'password'}
                                    onChangeText={(e) => setUserPass(e)}
                                    defaultValue={userPass}
                                >
                                </TextInput>

                            </View>
                            :
                            <View style={styles.viewContainer}>

                                <MaterialCommunityIcons name="eye-off-outline" size={24} color="#3a3b40" style={styles.iconStyle} onPress={() => { setShowPassword(true) }} />

                                <TextInput secureTextEntry
                                    style={styles.txtInputWithIcon}
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
                    style={styles.loginButton}
                >
                    <Text
                        style={styles.loginButtonText}>
                        Login
                    </Text>
                </TouchableOpacity>


                <View style={styles.bottomContainerStyle}>

                    <TouchableOpacity>
                        <CheckBox
                            onPress={() => checkedRemember ? setCheckedRemember(false) : setCheckedRemember(true)}
                            title='Remember me'
                            checked={checkedRemember}
                            checkedColor='#3f6ac4'
                            containerStyle={styles.chContainerStyle}
                            textStyle={styles.chTextStyle}
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
                    style={styles.signupText}
                >
                    Don't have an account yet?
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({

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
})
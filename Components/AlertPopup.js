//#region Imports -

//Outer Imports:
import * as React from 'react';
import { StyleSheet } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

//#endregion

export default function AlertPopup({ showAlert, setShowAlert, alertTitle, alertMessage }) {


    return (

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
    );
}


const styles = StyleSheet.create({

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
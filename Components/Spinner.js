import * as React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function SpinnerLoading({ visibility }) {

    return (
        <Spinner
            visible={visibility}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            color={'white'}
            animation={'fade'}
            overlayColor={'rgba(58, 59, 64, 0.65)'}
        />
    );
}


const styles = StyleSheet.create({
    //Spinner:
    spinnerTextStyle:
    {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold'
    },
})
//Outer Imports:
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';



export default function Header(props) {

  return (
    <Appbar.Header style={styles.headerContainer}>
      <Appbar.Action />

      <Appbar.Content title="" />

      {
        props.showArrow ?
          <Appbar.Action icon="arrow-left-thick" size={27} onPress={() => props.navigation.goBack()} style={{ marginRight: 10 }} />
          :
          <Appbar.Action />
      }

    </Appbar.Header>
  );
};

const styles = StyleSheet.create({

  headerContainer:
  {
    backgroundColor: '#3f6ac4',
    height: 25,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 0.14,
    elevation: 4,
  }
});

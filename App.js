import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import NavDrawer from './Routes/drawer';

// import { NotesContext } from './Context/context';

export default function App() {

  // const [notes, setNotes] = useState([
  //   {
  //     id: 1,
  //     date: '15/05/2020',
  //     title: 'Note1',
  //     text: 'description of Note1',
  //     latlng: {
  //       latitude: 32.049454,
  //       longitude: 34.792475
  //     }
  //   },
  //   {
  //     id: 2,
  //     date: '29/02/2021',
  //     title: 'Note2',
  //     text: 'description of Note2',
  //     latlng: {
  //       latitude: 32.143887,
  //       longitude: 34.845747
  //     }
  //   },
  //   {
  //     id: 3,
  //     date: '25/07/2021',
  //     title: 'Note3',
  //     text: 'description of Note3',
  //     latlng: {
  //       latitude: 32.149454,
  //       longitude: 34.792575
  //     }
  //   },
  //   {
  //     id: 4,
  //     date: '24/04/2024',
  //     title: 'Note4',
  //     text: 'that bustard needs to eat Note4',
  //     latlng: {
  //       latitude: 32.043887,
  //       longitude: 34.845747
  //     }
  //   },
  //   {
  //     id: 5,
  //     date: '03/03/2023',
  //     title: 'Note5',
  //     text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
  //     latlng: {
  //       latitude: 31.795127,
  //       longitude: 34.696614
  //     }
  //   }
  // ]);
  // const [user, setUser] = useState({});


  return (
    // <NotesContext.Provider value={{ notes, setNotes, user, setUser }}>
      <NavigationContainer>
        <NavDrawer />
      </NavigationContainer>
    // </NotesContext.Provider>
  );
}
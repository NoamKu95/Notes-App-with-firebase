import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from '@firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDYU9knatJu3QJcTAQn4_HguZLGCDaDTNY",
    authDomain: "moveo-notes-app.firebaseapp.com",
    projectId: "moveo-notes-app",
    storageBucket: "moveo-notes-app.appspot.com",
    messagingSenderId: "40688182564",
    appId: "1:40688182564:web:ffe9794915c0b219147fb1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


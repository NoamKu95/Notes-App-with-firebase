import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from '@firebase/firestore'


const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


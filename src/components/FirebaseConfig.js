import firebase from 'firebase/app'; // doing import firebase from 'firebase' or import * as firebase from firebase is not good practice. 
import 'firebase/auth';
import 'firebase/firestore';
import { secredCodes } from './Config'

// Initialize Firebase
const config = secredCodes;

/* secredCodes has the following data for Firebase authentication:
const secredCodes = {
    apiKey: "xxxxxxxxxxx",
    authDomain: "xxxxxxxxxxx",
    projectId: "xxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxx",
    appId: "xxxxxxxxxxxx"
}
*/

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export { auth, firebase, db, googleAuthProvider, emailAuthProvider };


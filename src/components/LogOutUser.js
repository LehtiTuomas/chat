import './LogOutUser-style.css';
import React from 'react';

//import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';

const LogOutUser = (props) => {

    // Log user out
    const singOut = () => {
        // setUserOffline()
        auth.signOut().then(() => {
            props.authentication(false)
        });

    };

    /*
    
        // Log user out from firebase
        const setUserOffline = async () => {
            const { uid } = auth.currentUser;
            const onlineRef = firebase.firestore().collection('onlineUsers');
    
            await onlineRef.doc(uid).set({
                online: false,
            }, { merge: true });
        };
    
    */

    return <div onClick={singOut} className="logOut-button">Kirjaudu ulos</div>
};



export default LogOutUser;
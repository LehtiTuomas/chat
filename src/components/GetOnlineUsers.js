import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';

const getOnlineUsers = () => {

    return async (dispatch) => {

        dispatch({ type: 'getRealtimeUsers' });

        const onlineRef = firebase.firestore().collection('onlineUsers')

        onlineRef.onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function (doc) {
                users.push(doc.data());
            });
            console.log(users)
        })


    }
}


export default getOnlineUsers;
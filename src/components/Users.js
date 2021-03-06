import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const Users = (props) => {
    // get all user names and userID from firebase
    const nameRef = firebase.firestore().collection('userName');
    const query = nameRef
    const [userName] = useCollectionData(query);
    const users = userName



    /*
    
        nameRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
                const testi = doc.data()
                // props.setNewUser(testi)
            });
        });
    
    
    */






    console.log(users)
    // Get user ID
    const { uid } = auth.currentUser;

    if (!users) {
        console.log('Ei vielä käyttäjiä')
    } else {
        // search if user allready has alias name in firebase
        const allUsers = users.map(e => e.uid);
        const userIs = allUsers.includes(uid) // true or false

        if (userIs) {
            // props.setNewUser(userIs) ei toimi, tulee looppi!!

        } else {
            return
        }
    }

    return <div></div>


}


export default Users
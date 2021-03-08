import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const Menu = (props) => {

    const [name, setName] = useState('');
    const [newUser, setNewUser] = useState(true)
    const [alias, setAlias] = useState('Uusi käyttäjä');


    //let newUser = true // prevent users to make multiple alias names
    const { uid } = auth.currentUser; // user id from firebase


    // get all user names and userID from firebase
    const nameRef = firebase.firestore().collection('userName');
    const query = nameRef
    const [userName] = useCollectionData(query);
    const users = userName

    console.log(users, 'users')
    console.log(props.avatars, 'AVATARS!!')

    useEffect(() => {


        if (!users) {
            console.log('Ei vielä käyttäjiä')
        } else {
            // search if user allready has alias name in firebase
            const allUsers = users.map(e => e.uid);
            const userIs = allUsers.includes(uid) // true or false

            if (userIs) {
                const currentUserIndex = allUsers.indexOf(uid)
                const currentUser = users[currentUserIndex].text
                setAlias(currentUser)
                setNewUser(false)
            } else {
                return
            }
        }



    }, [uid, users])



    console.log(alias, 'Alias')


    /*
    
    
    
    
    
        if (!users) {
            console.log('Loading...')
        } else {
            // search user name from users array
    
            // search if user allready has alias name in firebase
            const allUsers = users.map(e => e.uid);
            const userIs = allUsers.includes(uid) // true or false
            newUser = userIs
            //setNewUser(userIs)
    
    
    
            //const currentUserIndex = allUsers.indexOf(uid)
    
    
            if (!userIs) {
                //setAlias('Käyttäjä')
                console.log('nimeä ei löydy')
            } else {
                const currentUserIndex = allUsers.indexOf(uid)
                const currentUser = users[currentUserIndex].text
                //setAlias(currentUser)
                //let index = users.indexOf(uid);
                console.log(currentUser)
                //console.log('nimi löytyy')
            }
    
    
        }
    
    */

    const newUserName = async (event) => {
        event.preventDefault()

        const isNameOk = () => {
            // Check if the name is allready in use
            const allUsers = users.map(e => e.text);
            const nameIsOk = allUsers.includes(name) // true if name founds or false if not

            return nameIsOk
        }

        //isNameOk()


        if (name === '' || !newUser) {
            return
        } else if (isNameOk() === true) {
            console.log('nimi on jo varattu')
        } else {
            // get all user names from firebase
            const nameRef = firebase.firestore().collection('userName');

            // sent new user name to firebase
            await nameRef.add({
                text: name,
                uid
            })
        }



        // Empty namefield after submit
        setName('');
    };


    return (
        <div>
            <form onSubmit={newUserName}>
                <p>Osallistuaksesi keskusteluun sinun täytyy luoda käyttäjänimi. Huomaa, että nimen voi luoda vain kerran, eikä sitä voi jälkeenpäin enää muuttaa.</p>
                <label htmlFor="name">Nimi:</label><br />
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <button onClick={newUserName}>Tallenna nimi</button>
            </form>

        </div>
    )
}


export default Menu;
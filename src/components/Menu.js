import './RequestNewPassword-styles.css';
import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const Menu = (props) => {

    const [name, setName] = useState('');
    const [newUser, setNewUser] = useState(true)
    const [alias, setAlias] = useState('Uusi käyttäjä');
    const [message, setMessage] = useState('');

    const singOut = () => {
        // setUserOffline()
        auth.signOut().then(() => {
            //props.authentication(false)
        });

    };

    //let newUser = true // prevent users to make multiple alias names
    const { uid } = auth.currentUser; // user id from firebase


    // get all user names and userID from firebase
    const nameRef = firebase.firestore().collection('userName');
    const query = nameRef
    const [userName] = useCollectionData(query);
    const users = userName

    // console.log(users, 'users')
    // console.log(props.avatars, 'AVATARS!!')

    useEffect(() => {


        if (!users) {
            //console.log('Ei vielä käyttäjiä')
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





    const newUserName = async (event) => {
        event.preventDefault()

        const isNameOk = () => {
            // Check if the name is allready in use
            const allUsers = users.map(e => e.text.toLowerCase());
            const lowName = name.toLocaleLowerCase()
            const nameIsOk = allUsers.includes(lowName) // true if name founds or false if not

            return nameIsOk
        }

        //isNameOk()


        if (name === '' || !newUser) {
            return
        } else if (isNameOk() === true) {
            setMessage('Nimi on jo käytössä')
        } else {
            // get all user names from firebase
            const nameRef = firebase.firestore().collection('userName');

            // referense to set new dataplace for determining if user is online or not
            //const onlineRef = firebase.firestore().collection('onlineUsers');

            // sent new user name to firebase
            await nameRef.add({
                text: name,
                uid
            })

            // set APP avatarOk state to true
            props.setAvatarOk(true)

            // sent user id to firebase database and set it to true
            /*
            await onlineRef.doc(uid).set({
                online: true,
            });
            */





        }



        // Empty namefield after submit
        setName('');
    };


    return (
        <div className="container">
            <div className="box">
                <h2>Melkein valmista!</h2>
                <form onSubmit={newUserName}>
                    <p>Luo vielä käyttäjänimi, joka näkyy muille keskustelijoille.<br /><br /><span style={{ fontWeight: '600' }}>Nimen voi luoda vain kerran,</span><br />eikä sitä voi jälkeenpäin muuttaa.</p>

                    <input className="input-field" placeholder="Nimimerkki" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <p style={{ color: 'red' }}>{message}</p>

                    <div className="button-send" onClick={newUserName}>Tallenna nimi</div>
                    <div className="button-out" onClick={singOut}>Kirjaudu ulos</div>
                </form>
            </div>
        </div>
    )
}


export default Menu;
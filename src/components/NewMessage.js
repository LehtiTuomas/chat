import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';

const NewMessage = (props) => {

    const [text, setText] = useState('')

    const singOut = () => {
        //setUserOffline();
        auth.signOut().then(() => {
            props.authentication(false)
        });

    };

    const setUserOffline = async () => {
        const { uid } = auth.currentUser;
        const onlineRef = firebase.firestore().collection('onlineUsers');

        await onlineRef.doc(uid).set({
            online: false,
        }, { merge: true });
    }

    const sendMessage = async (event) => {
        // Prevent default form action
        event.preventDefault();

        // Send text to server
        if (text === '') {
            return
        } else {
            const { uid, photoURL } = auth.currentUser;
            const messagesRef = firebase.firestore().collection('messages');

            await messagesRef.add({
                text: text,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL
            })
        }

        // Empty messagebar after submit
        setText('');

        // Close mobile devises keyboard after submit
        // document.activeElement.blur();
    };

    //console.log(auth.currentUser)

    const togleInput = window.matchMedia("(max-width: 768px)")

    if (togleInput.matches) { // if phone or tablet
        return (
            <div>
                <button onClick={singOut}>Kirjaudu ulos</button><br /><br />
                <form onSubmit={sendMessage}>
                    <p>Kännykkä:</p>
                    <textarea rows="3" cols="30" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={sendMessage}>Send</button>
                </form>

            </div>
        )
    } else {
        return (
            <div>
                <button onClick={singOut}>Kirjaudu ulos</button><br /><br />
                <form onSubmit={sendMessage}>
                    <p>Tietokone</p>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </form>

            </div>
        )
    }

}



export default NewMessage;
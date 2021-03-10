import './NewMessage-styles.css'
import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';

const NewMessage = (props) => {

    const [text, setText] = useState('')



    const enterPressed = (event) => {
        if (event.keyCode === 13) {
            sendMessage();
        }
    };



    const sendMessage = async (event) => {
        // Prevent default form action
        //event.preventDefault();

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
                <form onSubmit={sendMessage}>
                    <p>Kännykkä:</p>
                    <textarea rows="3" cols="30" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={sendMessage}>Send</button>
                </form>

            </div>
        )
    } else {
        return (

            <div className="container-send">
                {/*<button onClick={singOut}>Kirjaudu ulos</button><br /><br />*/}
                <form className="sendMessage-form" onSubmit={sendMessage}>
                    <textarea rows="2" placeholder="Kirjoita jotain..." className="sendMessage-input" type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => enterPressed(e)} />
                </form>
            </div>

        )
    }

}



export default NewMessage;
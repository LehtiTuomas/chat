import './NewMessage-styles.css'
import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';

import Arrow from '../arrow.svg';

const NewMessage = (props) => {

    const [text, setText] = useState('')



    const enterPressed = (event) => {
        if (event.keyCode === 13) {
            sendMessage();
        }
    };

    const sendMessageFromPhone = (event) => {
        // Prevent default form action
        event.preventDefault();
        sendMessage()

    };


    const sendMessage = async (event) => {
        // Send text to server
        if (text === '') {
            return
        } else {
            const { uid } = auth.currentUser;
            const messagesRef = firebase.firestore().collection('messages');

            await messagesRef.add({
                text: text,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                time: Date.now()
            })
        }

        // Empty messagebar after submit
        setText('');

    };


    const togleInput = window.matchMedia("(max-width: 768px)")

    if (togleInput.matches) { // if phone or tablet
        return (
            <div className="container-send-phone">
                <form className="sendMessage-phone" onSubmit={sendMessageFromPhone}>
                    <textarea rows="4" cols="30" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <div className="button-send-mobile" onClick={sendMessageFromPhone}>
                        <img src={Arrow} alt="Send" className="arrow" />
                    </div>
                </form>

            </div>
        )
    } else {
        return (

            <div className="container-send">
                <form className="sendMessage-form" onSubmit={sendMessage}>
                    <textarea rows="2" placeholder="Kirjoita jotain..." className="sendMessage-input" type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => enterPressed(e)} />
                </form>
            </div>

        )
    }

}



export default NewMessage;
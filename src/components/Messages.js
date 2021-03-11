import './Messages-style.css';
import React, { useEffect, useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Messages = (props) => {

    const messagesRef = firebase.firestore().collection('messages');
    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });


    // Scroll messagebar to down after receaving or sent message
    const dummy = useRef();

    useEffect(() => {

        // autoscroll to the bottom if new messages
        dummy.current.scrollIntoView();
        //console.log(messages)

    }, [messages])


    return (<>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <div ref={dummy} ></div>

        </main >

    </>)
}



const ChatMessage = (props) => {
    const { text, uid, createdAt, time } = props.message;


    // get all user names and userID's from firebase

    const nameRef = firebase.firestore().collection('userName');
    const query = nameRef
    const [userName] = useCollectionData(query);
    const users = userName

    const aliasName = () => {

        if (users) {
            // But all user alias in allUsers array
            const allUsers = users.map(e => e.uid);
            // Search with messages uid what is index of user alias
            const messageUserIndex = allUsers.indexOf(uid)
            // Get the alias
            const alias = users[messageUserIndex].text


            return alias


        }

    };


    const timeSend = () => {
        if (users) {

            const seconds = time
            const sendTime = new Date(seconds)
            const hours = sendTime.getHours()
            const minutes = sendTime.getMinutes()

            const date = sendTime.getDate()
            const month = sendTime.getMonth() + 1
            const year = sendTime.getFullYear()

            // add 0 in front if minutes is less than 10
            const addZero = () => {

                if (minutes < 10) {
                    return '0' + minutes
                } else {
                    return minutes
                }
            }

            return <div>{date}.{month}.{year} kello: {hours}:{addZero()}</div>
        }
    }


    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message${messageClass}`}>
            <div className={`message-background-${messageClass}`} >
                <div className="message-info">
                    <div style={{ color: '#379187', fontSize: '12px', fontWeight: '600' }}>{aliasName()}</div>
                    <span style={{ color: '#379187', fontSize: '12px', fontWeight: '400' }}>{timeSend()}</span>
                </div>
                <div className="message-text">{text}</div>

            </div >
        </div >
    )
}





export default Messages;
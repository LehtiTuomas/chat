import './Messages-style.css';
import React, { useEffect, useRef } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Messages = () => {

    const messagesRef = firebase.firestore().collection('messages');
    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });


    // Scroll messagebar to down after receaving or sent message
    const dummy = useRef();

    useEffect(() => {
        dummy.current.scrollIntoView();
    }, [messages])

    const onScroll = () => {
        console.log('scrolling')
        /*
        if (dummy.current) {
            const { scrollTop, scrollHeight, clientHeight } = dummy.current;
            if (scrollTop + clientHeight === scrollHeight) {
                // TO SOMETHING HERE
                console.log('Reached bottom')
            }*/
    };



    return (<>
        <main>
            <div className="onScroll" onScroll={onScroll}>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                {/*<div onScroll={() => onScroll()} ref={dummy}></div>*/}
            </div>
            <div ref={dummy} ></div>

        </main >

    </>)
}



const ChatMessage = (props) => {
    const { text, uid } = props.message;


    // get all user names and userID's from firebase

    const nameRef = firebase.firestore().collection('userName');
    const query = nameRef
    const [userName] = useCollectionData(query);
    const users = userName

    const aliasName = () => {

        if (!users) {
            console.log('Loading...')
        } else {
            // But all user alias in allUsers array
            const allUsers = users.map(e => e.uid);
            // Search with messages uid what is index of user alias
            const messageUserIndex = allUsers.indexOf(uid)
            // Get the alias
            const alias = users[messageUserIndex].text


            return alias
        }

    }

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message${messageClass}`}>
            <div className={`message-background-${messageClass}`} >
                <p style={{ color: '#379187', fontSize: '12px' }}>{aliasName()}</p>

                <p>{text}</p>
            </div >
        </div >
    )
}





export default Messages;
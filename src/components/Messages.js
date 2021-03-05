import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Messages = () => {

    const messagesRef = firebase.firestore().collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(25);

    const [messages] = useCollectionData(query, { idField: 'id' });


    return (<>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </main>

    </>)
}



const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img alt="" src={photoURL} />
            <p>{text}</p>
        </div>
    </>)
}





export default Messages;
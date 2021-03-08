import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Messages = () => {

    const messagesRef = firebase.firestore().collection('messages');
    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });

    /*
    const nameRef = firebase.firestore().collection('userName');
    const search = nameRef
    const [userName] = useCollectionData(search);
    */


    return (<>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </main>

    </>)
}



const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message;


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

    return (<>
        <div className={`message ${messageClass}`}>
            <p style={{ color: 'red' }}>{aliasName()}</p>
            {/*<img alt="" src={photoURL} />*/}
            <p>{text}</p>
        </div>
    </>)
}





export default Messages;
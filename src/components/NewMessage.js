import React from 'react';

import 'firebase/auth'
import { auth } from './FirebaseConfig';

const NewMessage = (props) => {

    const singOut = () => {
        auth.signOut().then(() => {
            props.authentication(false)
        });

    };



    return (
        <div>
            <h1>Tervettuloa chattiin!</h1><button onClick={singOut}>Kirjaudu ulos</button>
        </div>
    )
}

export default NewMessage;
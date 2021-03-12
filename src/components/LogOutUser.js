import './LogOutUser-style.css';
import React from 'react';

import 'firebase/auth'
import { auth } from './FirebaseConfig';

const LogOutUser = (props) => {

    // Log user out
    const singOut = () => {
        // setUserOffline()
        auth.signOut().then(() => {
            props.authentication(false)
        });

    };


    return <div onClick={singOut} className="logOut-button">Kirjaudu ulos</div>
};



export default LogOutUser;
import React, { useState } from 'react';

import 'firebase/auth'
import { auth, googleAuthProvider } from './FirebaseConfig';

import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';


const SingUpp = () => {

    const [user] = useAuthState(auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const signInWithGoogle = () => {
        const provider = googleAuthProvider;
        auth.signInWithPopup(provider)
    };


    const createNewAccount = () => {
        // Create new account with email and password
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                //let user = userCredential.user;
                // ...
            })
            .catch((error) => {
                let errorMessage = error.message;
                setMessage(errorMessage)
            });
    }

    const signInWithEmail = () => {
        //  Sign in with email and password
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                //let user = userCredential.user;
            })
            .catch((error) => {
                let errorMessage = error.message;
                setMessage(errorMessage)
            });

    };


    const SingOut = () => {
        auth.signOut()
        setMessage('')
    }


    return (
        <div>
            {user ? <div><h1>Tervettuloa chattiin!</h1><button onClick={SingOut}>Kirjaudu ulos</button></div> :
                <div>
                    <h1>Kirjaudu keskusteluun</h1>
                    <p>Täytä alla olevat kohdat luodaksesi uuden tilin tai kirjautuaksesi sisään.</p>
                    <div>
                        <input placeholder="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <br />
                    <div>
                        <input placeholder="Salasana" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <br />
                    <button onClick={signInWithEmail}>Kirjaudu</button>  <button onClick={createNewAccount}>Luo tili</button>
                    <br /><br />
                    <h4>Tai kirjaudu Google tililläsi</h4>
                    <button onClick={signInWithGoogle}>Google kirjautuminen</button>
                    <p style={{ color: 'red' }}>{message}</p>
                </div>}
        </div>
    );


}


export default SingUpp;
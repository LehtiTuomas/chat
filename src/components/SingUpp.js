import './SingUpp.styles.css'

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import 'firebase/auth'
import { auth } from './FirebaseConfig';
import 'firebase/auth'


const SingUpp = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');



    const createNewAccount = () => {
        // Create new account with email and password
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                props.authentication(true)
                // Signed in 
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
                props.setAvatars(false)
                props.authentication(true)
                props.setUserInIfName()

                // Signed in

            })
            .catch((error) => {
                let errorMessage = error.message;
                setMessage(errorMessage)
            });

    };




    return (
        <div>

            <div className="container">
                <div className="login">
                    <h1>Kirjaudu</h1>
                    <p>Täytä alla olevat kohdat luodaksesi uuden tilin tai kirjautuaksesi sisään.</p>
                    <div>
                        <input className="input-field" placeholder="Sähköposti" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <br />
                    <div>
                        <input placeholder="Salasana" className="input-field" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <br />
                    <span className="button-login" onClick={signInWithEmail}>Kirjaudu</span>  <span className="button-makeAccount" onClick={createNewAccount}>Luo tili</span>
                    <br /><br />
                    <Link to="/Request-password">Unohtuiko salasana?</Link>
                    <p style={{ color: 'red' }}>{message}</p>
                </div>
            </div>
        </div>
    );


}


export default SingUpp;
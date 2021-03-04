import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import 'firebase/auth'
import { auth } from './FirebaseConfig';

const RequestNewPassword = () => {
    const [email, setEmail] = useState('');
    const [EmailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [Error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);


    const Send = () => {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                setTimeout(() => {
                    setEmailHasBeenSent(false)
                    setRedirect(true)
                }, 4000);
            }).catch(() => {
                setError("Salasanan vaihtaminen ei onnistu.");
            });
    }

    const Text = () => {
        if (EmailHasBeenSent) {
            return 'Sähköpostiisi on lähetetty linkki salasanan vaihtamiseksi.'
        } else {
            return <Link to="/">Takaisin etusivulle.</Link>
        }

    }

    return (
        redirect ? <Redirect to="/" /> :
            <div>
                <h2>Vaihda salasana</h2>
                <p>Kirjoita alla olevaan kenttään sähköpostiosoitteesi ja paina lähetä.<br />
            Saat hetken kuluttua sähköpostiisi linkin salasanan vaihtamiseksi.</p>
                <input placeholder="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <button onClick={Send}>Lähetä</button>
                <br /><br />
                <div>{Text()}</div>
                <p style={{ color: 'red' }}>{Error}</p>
            </div>
    )
}


export default RequestNewPassword;
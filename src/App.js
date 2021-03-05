import React from 'react';

import SingUpp from './components/SingUpp';
import NewMessage from './components/NewMessage';
import Messages from './components/Messages';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './components/FirebaseConfig';
import RequestNewPassword from './components/RequestNewPassword';


class App extends React.Component {
    state = {
        authenticated: false
    };


    componentDidMount = () => {

        const logBagIn = () => {
            this.setState({ authenticated: true })
        };

        const logUserOut = () => {
            this.setState({ authenticated: false })
        };

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                logBagIn()
            } else {
                // No user is signed in.
                logUserOut()
            }
        });

    };


    onAuthentication = (e) => {
        this.setState({ authenticated: e })
    };

    SingOut = () => {
        auth.signOut().then(() => {
            this.setState({ authenticated: false })
        });

    };


    render() {
        return (
            <Router>
                <Route exact path="/">
                    <div>
                        {this.state.authenticated ?
                            <div>
                                <Messages />
                                <NewMessage authentication={this.onAuthentication} />
                            </div> :
                            <SingUpp authentication={this.onAuthentication} />}
                    </div>
                </Route>
                <Route path="/Request-password"><RequestNewPassword /></Route>
            </Router>
        )
    };
};



export default App;
import React from 'react';

import SingUpp from './components/SingUpp';
import NewMessage from './components/NewMessage';
import Messages from './components/Messages';
import Menu from './components/Menu';
import Users from './components/Users';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './components/FirebaseConfig';
import RequestNewPassword from './components/RequestNewPassword';


class App extends React.Component {
    state = {
        authenticated: false,
        avatars: [],
        newUser: []
    };


    componentDidMount = () => {

        const logBagIn = () => {
            this.onAuthentication(true)
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

    setAvatars = (e) => {
        this.setState({ avatars: e })
    };

    setNewUser = (e) => {
        this.setState({ newUser: e })
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
                                <Messages setAvatars={this.setAvatars} />
                                <NewMessage authentication={this.onAuthentication} />
                                <br />
                                <Menu setNewUser={this.setNewUser} />

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
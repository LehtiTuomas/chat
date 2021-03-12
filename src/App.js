import './App-styles.css';
import React from 'react';

import SingUpp from './components/SingUpp';
import NewMessage from './components/NewMessage';
import Messages from './components/Messages';
import Menu from './components/Menu';
import LogOutUser from './components/LogOutUser';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './components/FirebaseConfig';
import RequestNewPassword from './components/RequestNewPassword';


class App extends React.Component {
    state = {
        authenticated: false,
        avatars: [],
        newUser: [],
        avatarOk: false,
        bottom: true
    };



    aliasOk = async () => {
        // check if the user has alias name

        const { uid } = auth.currentUser; // user id from firebase
        const allUsersID = this.state.avatars.map(e => e.uid);

        const aliasIsOk = allUsersID.includes(uid) // true if id found, false if not

        this.setState({ avatarOk: aliasIsOk })


    }



    componentDidMount = () => {

        const nameRef = firebase.firestore().collection('userName');
        nameRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                const data = doc.data()
                allUsers.push(data)
                this.setState({ avatars: allUsers })

                this.aliasOk()

            });

        });


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

        let allUsers = []

    };

    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            this.setState({ bottom: true })

        } else {
            this.setState({ bottom: false })
        }
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

    setAvatarOk = (e) => {
        this.setState({ avatarOk: e })
    };





    togleInput = () => {
        const togleInput = window.matchMedia("(max-width: 768px)")
        return togleInput.matches
    }



    render() {

        return (
            <Router>
                <Route exact path="/">
                    <div>
                        {this.state.authenticated ?
                            <div>
                                {this.state.avatarOk ?
                                    <div className="app-container">
                                        <div className="data-container">
                                            <div className="logOutNow" >
                                                <LogOutUser authentication={this.onAuthentication} />
                                            </div>
                                        </div>
                                        <div className="data-container">
                                            <div className="message-container" onScroll={this.handleScroll}>
                                                <Messages setAvatars={this.setAvatars} bottom={this.state.bottom} />
                                            </div>
                                        </div>

                                        <div className="data-container input">
                                            <NewMessage authentication={this.onAuthentication} />

                                        </div>
                                    </div> :
                                    <div>
                                        <Menu setNewUser={this.setNewUser} avatar={this.state.avatars} setAvatarOk={this.setAvatarOk} />
                                    </div>
                                }
                            </div> :
                            <SingUpp authentication={this.onAuthentication} setAvatars={this.setAvatars} setAvatarOk={this.setAvatarOk} />}
                    </div>
                </Route>
                <Route path="/Request-password"><RequestNewPassword /></Route>
            </Router>
        )
    };
};



export default App;
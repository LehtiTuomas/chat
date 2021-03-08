import React from 'react';

import SingUpp from './components/SingUpp';
import NewMessage from './components/NewMessage';
import Messages from './components/Messages';
import Menu from './components/Menu';
import Users from './components/Users';
import GetOnlineUsers from './components/GetOnlineUsers';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth'
import { auth } from './components/FirebaseConfig';
import RequestNewPassword from './components/RequestNewPassword';


class App extends React.Component {
    state = {
        authenticated: false,
        testi: [],
        avatars: [],
        newUser: [],
        avatarOk: false
    };



    aliasOk = async () => {
        // check if the user has alias name
        //let userArray = []
        //userArray.push(this.state.avatars)
        //const allUsersID = userArray.map(e => e.uid);


        const { uid } = auth.currentUser; // user id from firebase
        const allUsersID = this.state.avatars.map(e => e.uid);


        const aliasIsOk = allUsersID.includes(uid) // true if id found, false if not

        this.setState({ avatarOk: aliasIsOk })

        console.log(aliasIsOk, 'alias ok')

        console.log()


        //Update firebase that user is online
        const onlineRef = firebase.firestore().collection('onlineUsers');

        console.log(this.state.avatars, ' all avatars')


        await onlineRef.doc(uid).set({
            online: true,
        }, { merge: true });

    }


    componentDidMount = () => {

        const logBagIn = () => {
            // console.log(this.state.avatars)
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

        const nameRef = firebase.firestore().collection('userName');
        nameRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.data());
                //let kokeilu = []
                const data = doc.data()
                allUsers.push(data)
                this.setState({ avatars: allUsers })
                //console.log(allUsers, 'testitestinen')

                //const allUsersID = this.state.avatars.map(e => e.uid);
                //console.log(allUsersID)

                this.aliasOk()

            });

        });

        //this.setState({ avatars: allUsers })
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

    setAvatarOk = () => {
        this.setState({ avatarOk: true })
    };


    render() {
        return (
            <Router>
                <Route exact path="/">
                    <div>
                        {this.state.authenticated ?
                            <div>
                                {this.state.avatarOk ?
                                    <div>
                                        <Messages setAvatars={this.setAvatars} />
                                        <NewMessage authentication={this.onAuthentication} />
                                        <br />
                                    </div> :
                                    <div>
                                        <Menu setNewUser={this.setNewUser} avatar={this.state.avatars} setAvatarOk={this.setAvatarOk} />
                                    </div>
                                }
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
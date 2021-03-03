import React from 'react';

import SingUpp from './components/SingUpp';
import { db } from './components/FirebaseConfig';

class App extends React.Component {
    state = {
        authenticated: false,
        loading: true,
    };



    render() {
        return (
            <SingUpp />
        )
    }
}

export default App;
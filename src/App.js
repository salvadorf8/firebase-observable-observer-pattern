import React from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        // observer will always trigger a listener to the auth, user will always be sent to page until they sign out
        // below is an example of - observable/observer pattern - using the firebase library
        // onAuthStateChanged is known as an observable - which continuously fires off events that occur
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            // the function code here is our subscription asking the observable to fire when a particular event occurs
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot((snapShot) => {
                    console.log('your user id: ', snapShot.id);
                    console.log('rest of data: ', snapShot.data());

                    // here you can call an action creator to set the user in the Redux store
                    // this.props.setCurrentUser({id: snapShot.id, ...snapShot.data()});
                });
            } else {
                // this.props.setCurrentUser(userAuth);
            }
        });
    }

    componentWillUnmount() {
        // unsubscribing here is basically saying: observable, we no longer need the subscription, lets get rid of it
        this.unsubscribeFromAuth();
    }

    render() {
        return <div>hello</div>;
    }
}

export default App;

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase';

const config = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
    databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }

    const userDocRef = firestore.doc(`users/${userAuth.uid}`);
    const userDocSnapshot = await userDocRef.get();

    if (userDocSnapshot.exists) {
        return userDocRef;
    }

    // const { displayName, email } = userAuth; //temporary commented to test

    // ** start of test code
    const displayName = 'aztec';
    const email = 'aztec@gmail.com';
    // ** end of test code

    const created = new Date();

    try {
        await userDocRef.set({ displayName, email, created, ...additionalData });
    } catch (error) {
        console.log('error creating user in DB: ', error.message);
    }

    return userDocRef;
};

export default firebase;

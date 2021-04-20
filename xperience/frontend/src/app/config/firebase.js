import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyB-l5dVEkZMWlteqlQPurLdOj63anitU1U",
    authDomain: "xperince-c85b0.firebaseapp.com",
    projectId: "xperince-c85b0",
    storageBucket: "xperince-c85b0.appspot.com",
    messagingSenderId: "432825110620",
    appId: "1:432825110620:web:498ccee698968b96d21699"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
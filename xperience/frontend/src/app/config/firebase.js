import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyAz4iq5FK4GfJiu9GO75k5w5QvtwgrEPc4",
    authDomain: "xperiencenew.firebaseapp.com",
    projectId: "xperiencenew",
    storageBucket: "xperiencenew.appspot.com",
    messagingSenderId: "1004632287878",
    appId: "1:1004632287878:web:988fe7e7a39a40d14d3f07"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
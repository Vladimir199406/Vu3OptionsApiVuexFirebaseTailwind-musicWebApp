import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA0FypMdUQFN4C4ua2T_02BgB0nW4h_KPw',
  authDomain: 'music-f3afa.firebaseapp.com',
  projectId: 'music-f3afa',
  storageBucket: 'music-f3afa.appspot.com',
  messagingSenderId: '384027139011',
  appId: '1:384027139011:web:9a6985fb57398589f57b76',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  storage,
};

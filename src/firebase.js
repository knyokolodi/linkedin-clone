import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBgoQcklNgIS80QF0mwB75Mz2gA-B9wR5w',
  authDomain: 'linkedin-clone-a5c8b.firebaseapp.com',
  projectId: 'linkedin-clone-a5c8b',
  storageBucket: 'linkedin-clone-a5c8b.appspot.com',
  messagingSenderId: '814868742667',
  appId: '1:814868742667:web:a6a7a15c44c126b7257d0e',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

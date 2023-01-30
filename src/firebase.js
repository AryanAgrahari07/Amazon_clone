// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBKG648z7SpGBOhIvxm01dTG82FXADr_1E",
    authDomain: "clone-43d00.firebaseapp.com",
    projectId: "clone-43d00",
    storageBucket: "clone-43d00.appspot.com",
    messagingSenderId: "171447083482",
    appId: "1:171447083482:web:0187e71ff8de42477660e3",
    measurementId: "G-WH2GX9XW57"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig); 

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};
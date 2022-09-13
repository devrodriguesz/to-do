import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyBeluvNZ5oRNu4YmwpB2PlTykpHB7d2i88",
    authDomain: "todo-fd6a4.firebaseapp.com",
    projectId: "todo-fd6a4",
    storageBucket: "todo-fd6a4.appspot.com",
    messagingSenderId: "1085033896332",
    appId: "1:1085033896332:web:f85bb3eb64267b77fc1ea9"
  };
  
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;


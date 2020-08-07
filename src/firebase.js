// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhHYw5IjygrnYi6FY6YbxBMJyVJWeaTw0",
  authDomain: "maxbank-98.firebaseapp.com",
  databaseURL: "https://maxbank-98.firebaseio.com",
  projectId: "maxbank-98",
  storageBucket: "maxbank-98.appspot.com",
  messagingSenderId: "283085309999",
  appId: "1:283085309999:web:96dcc12a2728c79e3fdeda",
};

// Initialize Firebase
const myFirebase = firebase.initializeApp(firebaseConfig);

export default myFirebase;

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "./config";

// Initialize Firebase
const myFirebase = firebase.initializeApp(firebaseConfig);

const auth = myFirebase.auth();
const db = myFirebase.firestore();

export { auth, db };

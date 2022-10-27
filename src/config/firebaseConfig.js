// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from 'firebase/messaging'
import { getDatabase } from "firebase/database";
import { getFirestore } from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIP65m7y0mQOjcmY0ekn2c3qDnErSYU34",
  authDomain: "be-oes.firebaseapp.com",
  databaseURL: "https://be-oes-default-rtdb.firebaseio.com",
  projectId: "be-oes",
  storageBucket: "be-oes.appspot.com",
  messagingSenderId: "205072498150",
  appId: "1:205072498150:web:1ded7cd26db7a8b24e2a27"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const database = getDatabase(app)
export const messaging = getMessaging(app)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from 'firebase/messaging'
import { getDatabase } from "firebase/database";
import { getFirestore } from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "be-oes.firebaseapp.com",
  databaseURL: "https://be-oes-default-rtdb.firebaseio.com",
  projectId: "be-oes",
  storageBucket: "be-oes.appspot.com",
  messagingSenderId: "205072498150",
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const database = getDatabase(app)
export const messaging = getMessaging(app)

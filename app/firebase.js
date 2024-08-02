// Import the functions you need from the SDKs you need
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
// Required for side-effects

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_K-mVYheWZJEU8UEf07-Y-37fPk_BRg4",
  authDomain: "pantry-tracker-a963f.firebaseapp.com",
  projectId: "pantry-tracker-a963f",
  storageBucket: "pantry-tracker-a963f.appspot.com",
  messagingSenderId: "748736756771",
  appId: "1:748736756771:web:83e5d40fad9585e5888596",
  measurementId: "G-R1447MPRT7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

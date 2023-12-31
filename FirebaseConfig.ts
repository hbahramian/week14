// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXVgh5GgeRwHyohyx9Mb_oVqFBlBtYZSw",
  authDomain: "week14-fedeb.firebaseapp.com",
  projectId: "week14-fedeb",
  storageBucket: "week14-fedeb.appspot.com",
  messagingSenderId: "954421047990",
  appId: "1:954421047990:web:cf81a1d4794839436b2c17",
  measurementId: "G-MP9LZCXZWD"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
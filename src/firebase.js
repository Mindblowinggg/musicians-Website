// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4IhHl1M4jinF4wRIrUufz_8pOHqvIE3I",
  authDomain: "musicians-website-9c78b.firebaseapp.com",
  projectId: "musicians-website-9c78b",
  storageBucket: "musicians-website-9c78b.firebasestorage.app",
  messagingSenderId: "93747266708",
  appId: "1:93747266708:web:b9dfa8b8b97512aa6ba081",
  measurementId: "G-HTEE8DZVXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

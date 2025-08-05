// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage";   // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4IhHl1M4jinF4wRIrUufz_8pOHqvIE3I",
  authDomain: "musicians-website-9c78b.firebaseapp.com",
  projectId: "musicians-website-9c78b",
  storageBucket: "musicians-website-9c78b.appspot.com", // Corrected bucket URL
  messagingSenderId: "93747266708",
  appId: "1:93747266708:web:b9dfa8b8b97512aa6ba081",
  measurementId: "G-HTEE8DZVXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);     // Initialize and export Firestore
export const storage = getStorage(app);  // Initialize and export Storage
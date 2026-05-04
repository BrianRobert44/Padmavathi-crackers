// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD88EQLWFE0MvmjDKdL0KcMB4lHOoD3OkI",
  authDomain: "sri-padmavathi-crackers.firebaseapp.com",
  projectId: "sri-padmavathi-crackers",
  storageBucket: "sri-padmavathi-crackers.firebasestorage.app",
  messagingSenderId: "716641445570",
  appId: "1:716641445570:web:70c4e6dc527b9e196d7d5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
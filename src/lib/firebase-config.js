
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcKkxj1zw-9o1Tnrstnjp20xXIZH9G8yY",
  authDomain: "login-a2d77.firebaseapp.com",
  projectId: "login-a2d77",
  storageBucket: "login-a2d77.firebasestorage.app",
  messagingSenderId: "73245268893",
  appId: "1:73245268893:web:923076b54f57cc250bad74",
  measurementId: "G-T0Z5PGPWC7", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
// const app = initializeApp(firebaseConfig);
export { app };

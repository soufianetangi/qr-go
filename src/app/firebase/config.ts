// Import necessary Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // Ensure environment variables are properly set
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "", // Optional, can omit if not using Analytics
};

// Initialize Firebase app
const app = !getApps().length 
  ? initializeApp(firebaseConfig) // Initialize Firebase only if no app exists
  : getApp(); // Use the existing app

// Initialize Firebase Auth and Firestore
const auth = getAuth(app); // Authentication instance
const db = getFirestore(app); // Firestore database instance

// Export initialized modules for use in other parts of the app
export {
  app,
  auth,
  db,
};

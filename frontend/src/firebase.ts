// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDK9X8PIbJ7IzmUmtMt4rPcC3NHs6O2MNA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "career-saathi-60edd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "career-saathi-60edd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "career-saathi-60edd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "840694094752",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:840694094752:web:e5751e2ea4d8c16dc6e2c5",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BSFVM6P38F"
};

// Validate Firebase configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Firebase configuration is incomplete. Check your environment variables.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// For development debugging
if (import.meta.env.DEV) {
  console.log('🔥 Firebase initialized with project:', firebaseConfig.projectId);
  console.log('📋 Firestore initialized');
}

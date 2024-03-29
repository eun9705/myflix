import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const { VITE_APP_FIREBASE_API_KEY,VITE_APP_FIREBASE_AUTH_DOMAIN,VITE_APP_FIREBASE_PROJECT_ID,VITE_APP_FIREBASE_STORAGE_BUCKET,VITE_APP_FIREBASE_MESSAGING_SENDER_ID,VITE_APP_FIREBASE_APP_ID  } = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_APP_FIREBASE_API_KEY,
  authDomain: VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_APP_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const db = getFirestore(app);
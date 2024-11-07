import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwmjcf8Smo-W3Gdpox_ZE4DOp1FAjlDKE",
  authDomain: "flash-language-2e46c.firebaseapp.com",
  projectId: "flash-language-2e46c",
  storageBucket: "flash-language-2e46c.firebasestorage.app",
  messagingSenderId: "623196403904",
  appId: "1:623196403904:web:3a85eebc42e36d24375525",
  measurementId: "G-6MBPEEEB8T"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp); //not used

export default firebaseApp;
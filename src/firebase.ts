import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk4WcAc5g-fkl2gapQUGfqzmvfb7EQLXU",
  authDomain: "gt4-accoun.firebaseapp.com",
  projectId: "gt4-accoun",
  storageBucket: "gt4-accoun.firebasestorage.app",
  messagingSenderId: "987883146099",
  appId: "1:987883146099:web:81acb00373df2711621306",
  measurementId: "G-F2LZJDD3EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
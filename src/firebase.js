import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCD19s5igUtSoMyLPoQhia1vvs3IRzbu-0",
    authDomain: "aleen-a02da.firebaseapp.com",
    projectId: "aleen-a02da",
    storageBucket: "aleen-a02da.firebasestorage.app",
    messagingSenderId: "658986722156",
    appId: "1:658986722156:web:1e62b8e800341814e24949",
    measurementId: "G-P74VFWC8JG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "******",
    projectId: "********",
    storageBucket: "*******com",
    messagingSenderId: "*******",
    appId: "******
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

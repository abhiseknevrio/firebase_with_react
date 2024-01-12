import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "fir-poc-with-react.firebaseapp.com",
    projectId: "fir-poc-with-react",
    storageBucket: "fir-poc-with-react.appspot.com",
    messagingSenderId: "112042490837",
    appId: "1:112042490837:web:5616d11898e90b1d8b1b5c",
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
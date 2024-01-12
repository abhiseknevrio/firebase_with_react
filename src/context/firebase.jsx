import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL // interacting with database
};

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const database = getDatabase(firebaseApp)
const dbFirestore = getFirestore(firebaseApp)
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null)

// useFirebase custom hook
export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null)

    const signupUserWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            setUser({
                email: userCredential.user.email
            });
        } catch (error) {
            console.error('Signup error:', error);
            setUser(null)
        }
    }

    const signInUserWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password
            );
            setUser({
                email: userCredential.user.email
            });
        } catch (error) {
            console.error('SignIn error:', error);
            setUser(null)
        }
    }

    const signupWithGoogle = async () => {
        try {
            await signInWithPopup(firebaseAuth, googleProvider);
        } catch (error) {
            console.error('Google signup error:', error);
        }
    }

    const putData = (key, data) => set(ref(database, key), data).catch(error => console.error('Database error:', error));

    const writeDataOnfirestore = async (key, data) => {
        try {
            const docRef = await addDoc(collection(dbFirestore, key), data)
            console.log("Document written with ID: ", docRef)
        } catch (error) {
            console.log("Error adding document: ", error)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser({
                    email: user.email
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const signOutHandler = async () => {
        try {
            await signOut(firebaseAuth);
            console.log('Sign-out successful');
        } catch (error) {
            console.error('Sign-out error:', error);
        }
    };

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signInUserWithEmailAndPassword, putData, signupWithGoogle, user, signOutHandler, writeDataOnfirestore }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
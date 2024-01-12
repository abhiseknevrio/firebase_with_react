import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { database, firebaseAuth, googleProvider } from "../firebase";
import { ref, set } from "firebase/database";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

    const signupUserWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            setUser({
                email: userCredential.user.email
            });
        } catch (error) {
            console.error('Signup error:', error);
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser({
                    email: user.email
                });
            } else {
                console.log("You are Logged out!");
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
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData, signupWithGoogle, user, signOutHandler }}>
            {props.children}
        </FirebaseContext.Provider>
    );
}
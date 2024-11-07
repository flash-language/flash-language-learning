/* eslint-disable react-refresh/only-export-components */
import React, {useContext, useEffect, useState} from "react"
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail, 
    updateEmail as fbUpdateEmail, 
    updatePassword as fbUpdatePassword } from "firebase/auth";

import { db } from "./firebase"; // Import Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { createOrUpdateUser } from "../assets/firestoreUtils";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
        }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function updateEmail(email) {
        if (currentUser) {
            return fbUpdateEmail(currentUser, email);
        }
    }

    function updatePassword(password) {
        if (currentUser) {
            return fbUpdatePassword(currentUser, password);
        }
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            setLoading(false);
    
            if (user) {
                try {
                    await createOrUpdateUser(user);
                } catch (error) {
                    console.error("Error updating user:", error);
                }
            }
        });
        return unsubscribe;
    }, []);

    
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
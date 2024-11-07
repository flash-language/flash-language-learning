/* eslint-disable react-refresh/only-export-components */
import React, {useContext, useEffect, useState} from "react"
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail, 
    updateEmail as fbUpdateEmail, 
    updatePassword as fbUpdatePassword, deleteUser } from "firebase/auth";

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
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    async function deleteAccount() {
        if (currentUser) {
            try {
                await deleteUser(currentUser);
                setCurrentUser(null); 
            } catch (error) {
                console.error("Error deleting user:", error);
                throw error; 
            }
        }
    }
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        deleteAccount,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
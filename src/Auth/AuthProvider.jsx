import React, { createContext, useContext, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    updateProfile,
    signInWithEmailAndPassword
} from 'firebase/auth';
 // Make sure you have this
import { toast } from 'react-hot-toast';

import auth from '../Firebase/firebase.config';

const myContext = createContext();

export const useFirebaseAuth = () => {
    return useContext(myContext);
}

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    // Register with email/password
    const registerUser = async (email, password, name, photoURL) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, {
                displayName: name,
                photoURL: photoURL
            });
            setUser(result.user);
            return result.user;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Google Sign in
    const googleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            return result.user;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Login with email/password
    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            return result.user;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Add useEffect to monitor auth state
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Add logout function
    const logOut = async () => {
        setLoading(true);
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const authInfo = {
        user,
        loading,
        registerUser,
        googleSignIn,
        loginUser,
        logOut  // Add logOut to authInfo
    }

    return (
        <myContext.Provider value={authInfo}>
            {children}
        </myContext.Provider>
    )
}

export default AuthProvider
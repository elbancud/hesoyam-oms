import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';
import firebase
    from 'firebase';
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [key, setKey] = useState();

    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
       
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user ? user.email : "")
            user ? localStorage.setItem('user', JSON.stringify(user.email)) : localStorage.removeItem('user');
            if (user) {
                const dbRef = firebase.database().ref("account-details");
                      dbRef.on('value', snapshot => {
                          snapshot.forEach(snap => {
                              if (user.email === snap.val().email) {
                                  setKey(snap.key)
                                  }
                              });
                      })
                
            } 
        })
        return unsubscribe
    },[])
        const value = {
            currentUser,
            key,
            login,
        }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>            
    )
}


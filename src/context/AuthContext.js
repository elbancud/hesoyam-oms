import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';
import firebase from 'firebase';
import { useCookies } from 'react-cookie'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [key, setKey] = useState();
    const [userSideLogin, setUserSideLogin] = useState();
    const [cookies, setCookies] = useCookies(['user'])
    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
       
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user ? user.email : "")
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


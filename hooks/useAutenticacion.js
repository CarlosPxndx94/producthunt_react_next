import React, { useState, useEffect } from 'react';
import firebase from '../firebase'

function useAutenticacion() {
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                setUserAuth(usuario);
            } else {
                setUserAuth(null);
            }
        });

        return () => unsuscribe();

    }, []);

    return userAuth;
}

export default useAutenticacion;
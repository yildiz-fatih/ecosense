// context/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const CATEGORIES = ['plastic', 'glass', 'paper', 'metal', 'organic'];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoad] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (fbUser) => {
            if (fbUser) {
                const ref = doc(db, 'users', fbUser.uid);
                let snap = await getDoc(ref);
                if (!snap.exists()) {
                    const counts = Object.fromEntries(CATEGORIES.map(c => [c, 0]));
                    snap = { username: 'Newbie', email: fbUser.email, total: 0, counts };
                    await setDoc(ref, snap);
                } else {
                    snap = snap.data();
                }
                setUser({ uid: fbUser.uid, ...snap });
            } else {
                setUser(null);
            }
            setLoad(false);
        });
        return unsub;
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

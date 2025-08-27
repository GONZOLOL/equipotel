'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';
import {
    auth,
    googleProvider,
    checkUserAuthorization,
    getAuthorizedUserInfo,
} from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authorizedUser, setAuthorizedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Función para limpiar el estado de autorización
    const clearAuthState = useCallback(() => {
        setUser(null);
        setAuthorizedUser(null);
        setIsAuthorized(false);
        setLoading(false);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Verificar si el usuario está autorizado
                const authorized = await checkUserAuthorization(user.email);

                setIsAuthorized(authorized);

                if (authorized) {
                    // Obtener información adicional del usuario autorizado
                    const userInfo = await getAuthorizedUserInfo(user.email);
                    setAuthorizedUser(userInfo);
                    setUser(user);
                    setLoading(false); // Importante: establecer loading en false aquí
                } else {
                    // Si no está autorizado, cerrar sesión automáticamente
                    await signOut(auth);
                    clearAuthState();
                }
            } else {
                // No hay usuario autenticado
                clearAuthState();
            }
        });

        return unsubscribe;
    }, [clearAuthState]);

    const signInWithGoogle = useCallback(async () => {
        try {
            setLoading(true); // Establecer loading en true al iniciar login
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Verificar autorización inmediatamente después del login
            const authorized = await checkUserAuthorization(user.email);

            if (!authorized) {
                // Si no está autorizado, cerrar sesión y mostrar error
                await signOut(auth);
                setLoading(false);
                throw new Error(
                    'No tienes permisos para acceder a esta aplicación. Contacta al administrador.'
                );
            }

            // Obtener información del usuario autorizado
            const userInfo = await getAuthorizedUserInfo(user.email);
            setAuthorizedUser(userInfo);
            setIsAuthorized(true);
            setUser(user);
            setLoading(false);

            return user;
        } catch (error) {
            setLoading(false);
            console.error('Error signing in with Google:', error);
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            // Limpiar estado inmediatamente
            clearAuthState();
            // Luego cerrar sesión en Firebase
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            clearAuthState();
            throw error;
        }
    }, [clearAuthState]);

    const value = {
        user,
        authorizedUser,
        loading,
        isAuthorized,
        signInWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

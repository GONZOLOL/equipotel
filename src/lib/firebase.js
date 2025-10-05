import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Debug: Verificar variables de entorno
console.log('Firebase Config Debug:');
console.log(
    'API Key:',
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Present' : 'Missing'
);
console.log(
    'Auth Domain:',
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Present' : 'Missing'
);
console.log(
    'Project ID:',
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Present' : 'Missing'
);

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configurar el nombre de la aplicación para Google Auth
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

// Función para verificar si un usuario está autorizado
export const checkUserAuthorization = async (email) => {
    try {
        const usersRef = collection(db, 'authorized_users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        return !querySnapshot.empty;
    } catch (error) {
        console.error('Error checking user authorization:', error);
        return false;
    }
};

// Función para obtener información del usuario autorizado
export const getAuthorizedUserInfo = async (email) => {
    try {
        const usersRef = collection(db, 'authorized_users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return {
                id: userDoc.id,
                ...userDoc.data(),
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting authorized user info:', error);
        return null;
    }
};

export default app;

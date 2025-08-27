'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);
    const { signInWithGoogle, isAuthorized } = useAuth();
    const { isDarkMode, toggleTheme } = useThemeToggle();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirigir si ya está autorizado
    useEffect(() => {
        if (isAuthorized) {
            router.push('/admin/dashboard');
        }
    }, [isAuthorized, router]);

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError('');
            await signInWithGoogle();
            // La redirección se maneja automáticamente en el useEffect
        } catch (error) {
            console.error('Error signing in:', error);

            // Manejar diferentes tipos de errores
            if (error.message.includes('No tienes permisos')) {
                setError(
                    'No tienes permisos para acceder a esta aplicación. Contacta al administrador.'
                );
            } else if (error.code === 'auth/popup-closed-by-user') {
                setError('Inicio de sesión cancelado.');
            } else if (error.code === 'auth/popup-blocked') {
                setError(
                    'El popup fue bloqueado. Permite popups para este sitio.'
                );
            } else {
                setError(
                    'Error al iniciar sesión. Por favor, inténtalo de nuevo.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="w-full max-w-md relative">
                <Card className="shadow-xl dark:bg-gray-800 dark:border-gray-700">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center mb-4">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full">
                                <i className="pi pi-shield text-white text-2xl"></i>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
                            Panel de Administración
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            Inicia sesión para acceder al panel de
                            administración
                        </p>
                    </div>

                    {error && (
                        <Message
                            severity="error"
                            text={error}
                            className="mb-4"
                        />
                    )}

                    <div className="space-y-4">
                        <Button
                            label="Iniciar sesión con Google"
                            icon="pi pi-google"
                            onClick={handleGoogleSignIn}
                            loading={loading}
                            className="w-full p-3"
                            severity="primary"
                        />

                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                                Solo usuarios autorizados pueden acceder
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                        <div className="text-center">
                            <a
                                href="/"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-300"
                            >
                                ← Volver al sitio principal
                            </a>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

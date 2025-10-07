'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function ProtectedRoute({ children }) {
    const { user, loading, isAuthorized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/admin/login');
            } else if (!isAuthorized) {
                // Si el usuario está autenticado pero no autorizado, cerrar sesión y redirigir
                router.push('/admin/login');
            }
        }
    }, [user, loading, isAuthorized, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <ProgressSpinner
                        style={{ width: '50px', height: '50px' }}
                    />
                </div>
            </div>
        );
    }

    if (!user || !isAuthorized) {
        return null;
    }

    return children;
}

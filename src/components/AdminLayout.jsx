'use client';

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function AdminLayout({
    children,
    title,
    subtitle,
    showBackButton = false,
    backUrl = '/admin/dashboard',
}) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { isDarkMode, toggleTheme } = useThemeToggle();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 gap-4">
                            {showBackButton && (
                                <Button
                                    icon="pi pi-arrow-left"
                                    severity="secondary"
                                    outlined
                                    onClick={() => router.push(backUrl)}
                                    className="dark:border-gray-600 dark:text-gray-300"
                                />
                            )}
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-300">
                                    {title}
                                </h1>
                                {subtitle && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 gap-4">
                            {/* Theme Toggle Button */}
                            <Button
                                icon={isDarkMode ? 'pi pi-sun' : 'pi pi-moon'}
                                severity="secondary"
                                outlined
                                onClick={toggleTheme}
                                className="dark:border-gray-600 dark:text-gray-300 "
                                tooltip={
                                    isDarkMode
                                        ? 'Cambiar a modo claro'
                                        : 'Cambiar a modo oscuro'
                                }
                                tooltipOptions={{ position: 'bottom' }}
                            />

                            {/* Logout Button */}
                            <Button
                                label="Cerrar Sesión"
                                icon="pi pi-sign-out"
                                severity="danger"
                                outlined
                                onClick={logout}
                                className="dark:border-red-400 dark:text-red-400"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </div>
        </div>
    );
}

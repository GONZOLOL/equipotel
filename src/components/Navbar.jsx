'use client';

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { isDarkMode, isInitialized } = useTheme();
    const pathname = usePathname();

    // Detectar si estamos en la zona admin
    const isAdminZone = pathname?.startsWith('/admin');

    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Set initial scroll state
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItemStyle = 'text-xl font-bold text-gray-800 dark:text-white p-3';

    // Items de navegación para la zona pública
    const publicItems = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            url: '/',
            className: menuItemStyle,
        },
        {
            label: 'Productos',
            icon: 'pi pi-box',
            url: '/productos',
            className: menuItemStyle,
        },
        {
            label: 'Contacto',
            icon: 'pi pi-envelope',
            url: '/contacto',
            className: menuItemStyle,
        },
        {
            label: 'Sobre Nosotros',
            icon: 'pi pi-users',
            url: '/sobre-nosotros',
            className: menuItemStyle,
        },
    ];

    // Items de navegación para la zona admin
    const adminItems = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            url: '/admin/dashboard',
            className: menuItemStyle,
        },
        {
            label: 'Productos',
            icon: 'pi pi-box',
            url: '/admin/products',
            className: menuItemStyle,
        },
        {
            label: 'Analíticas',
            icon: 'pi pi-chart-bar',
            url: '/admin/analytics',
            className: menuItemStyle,
        },
    ];

    // Usar items según la zona
    const items = isAdminZone ? adminItems : publicItems;

    const start = (
        <Link
            href={isAdminZone ? '/admin/dashboard' : '/'}
            className="flex items-center space-x-2 no-underline mr-6"
        >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg">
                <i className="pi pi-shield text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                {isAdminZone ? 'Equipotel Admin' : 'Equipotel'}
            </span>
        </Link>
    );

    const end = (
        <div className="flex items-center space-x-3 gap-4">
            <ThemeToggle />
            {!isAdminZone && (
                <Button
                    label="Llamar"
                    icon="pi pi-phone"
                    severity="success"
                    size="small"
                    className="hidden sm:flex"
                    onClick={() => (window.location.href = 'tel:+34951234567')}
                />
            )}
            {isAdminZone && (
                <Button
                    label="Salir"
                    icon="pi pi-sign-out"
                    severity="secondary"
                    size="small"
                    className="hidden sm:flex"
                    onClick={() => (window.location.href = '/')}
                />
            )}
        </div>
    );

    // Mostrar skeleton simple mientras no esté montado o inicializado
    if (!isMounted || !isInitialized) {
        return (
            <nav
                className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
                suppressHydrationWarning
            >
                <div className="w-full">
                    <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg"></div>
                            <div className="w-24 h-6 rounded bg-gray-200 hidden sm:block"></div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded bg-gray-200"></div>
                            <div className="w-16 h-8 bg-green-500 rounded hidden sm:block"></div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav
            className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
            suppressHydrationWarning
        >
            <div className="w-full">
                <Menubar
                    model={items}
                    start={start}
                    end={end}
                    className="border-none w-full bg-transparent px-10 sm:px-6 lg:px-8"
                />
            </div>
        </nav>
    );
}

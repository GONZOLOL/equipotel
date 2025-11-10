'use client';

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { isDarkMode, isInitialized } = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    // Detectar si estamos en la zona admin
    const isAdminZone = pathname?.startsWith('/admin');

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/admin/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

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

    const normalizePath = (path) => {
        if (!path) return '';
        if (path === '/') return '/';
        const trimmed = path.replace(/\/+$/, '');
        return trimmed.toLowerCase();
    };

    const baseLinkClasses =
        'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 md:text-base';
    const activeLinkClasses = 'bg-[#e11d48] text-white shadow-sm';
    const inactiveLinkClasses =
        'text-gray-700 hover:bg-slate-200/60 hover:text-[#e11d48] dark:text-gray-200 dark:hover:bg-white/10';

    const isPathActive = (url) => {
        if (!pathname) return false;
        const currentPath = normalizePath(pathname);
        const targetPath = normalizePath(url);

        return (
            currentPath === targetPath ||
            (targetPath !== '/' && currentPath.startsWith(`${targetPath}/`))
        );
    };

    const renderMenuLink = ({ label, icon, url }) => {
        const isActive = isPathActive(url);

        return (
            <Link
                href={url}
                className={`${baseLinkClasses} ${
                    isActive ? activeLinkClasses : inactiveLinkClasses
                }`}
            >
                <i className={`${icon} text-sm`} />
                <span>{label}</span>
            </Link>
        );
    };

    const createMenuItem = (label, icon, url) => ({
        label,
        icon,
        url,
        command: () => router.push(url),
        template: () => renderMenuLink({ label, icon, url }),
    });

    // Items de navegación para la zona pública
    const publicItems = [
        createMenuItem('Inicio', 'pi pi-home', '/'),
        createMenuItem('Productos', 'pi pi-box', '/productos'),
        createMenuItem(
            'Segunda Mano',
            'pi pi-refresh',
            '/productos-segunda-mano'
        ),
        createMenuItem('Contacto', 'pi pi-envelope', '/contacto'),
        createMenuItem('Sobre Nosotros', 'pi pi-users', '/sobre-nosotros'),
    ];

    // Items de navegación para la zona admin
    const adminItems = [
        createMenuItem('Dashboard', 'pi pi-home', '/admin/dashboard'),
        createMenuItem('Productos', 'pi pi-box', '/admin/products'),
        createMenuItem('Analíticas', 'pi pi-chart-bar', '/admin/analytics'),
    ];

    // Usar items según la zona
    const items = isAdminZone ? adminItems : publicItems;

    const start = (
        <Link
            href={isAdminZone ? '/admin/dashboard' : '/'}
            className="flex items-center space-x-1 no-underline mr-6"
        >
            <div className="flex items-center justify-center w-10 h-10  rounded-lg">
                <Image
                    src="/src/logo-castillo.svg"
                    alt="Equipotel"
                    width={30}
                    height={30}
                />
            </div>
            <span className="text-gray-600 dark:text-white text-2xl bg-clip-text">
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
                    onClick={() => {
                        const phoneNumber =
                            process.env.NEXT_PUBLIC_PHONE_NUMBER ||
                            '+34 676 20 80 24';
                        window.location.href = `tel:${phoneNumber}`;
                    }}
                />
            )}
            {isAdminZone && (
                <Button
                    label="Salir"
                    icon="pi pi-sign-out"
                    severity="danger"
                    size="small"
                    className="hidden sm:flex"
                    onClick={handleLogout}
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

'use client';

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

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

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            url: '/',
        },
        {
            label: 'Productos',
            icon: 'pi pi-box',
            items: [
                {
                    label: 'Cajas Fuertes',
                    icon: 'pi pi-shield',
                    url: '/productos?categoria=cajas-fuertes',
                },
                {
                    label: 'Armarios Acorazados',
                    icon: 'pi pi-building',
                    url: '/productos?categoria=armarios-acorazados',
                },
                {
                    label: 'Sistemas de Anclaje',
                    icon: 'pi pi-link',
                    url: '/productos?categoria=sistemas-anclaje',
                },
                {
                    label: 'Compartimentos de Seguridad',
                    icon: 'pi pi-lock',
                    url: '/productos?categoria=compartimentos-seguridad',
                },
            ],
        },
        {
            label: 'Contacto',
            icon: 'pi pi-envelope',
            url: '/contacto',
        },
        {
            label: 'Sobre Nosotros',
            icon: 'pi pi-users',
            url: '/sobre-nosotros',
        },
    ];

    const start = (
        <Link
            href="/"
            className="flex items-center space-x-2 no-underline mr-6"
        >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg">
                <i className="pi pi-shield text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                Equipotel
            </span>
        </Link>
    );

    const end = (
        <div className="flex items-center space-x-3 gap-4">
            <ThemeToggle />
            <Button
                label="Llamar"
                icon="pi pi-phone"
                severity="success"
                size="small"
                className="hidden sm:flex"
                onClick={() => (window.location.href = 'tel:+34951234567')}
            />
        </div>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700">
            <div className="w-full ">
                <Menubar
                    model={items}
                    start={start}
                    end={end}
                    className="border-none transition-all duration-300 w-full bg-transparent px-10 sm:px-6 lg:px-8"
                />
            </div>
        </nav>
    );
}

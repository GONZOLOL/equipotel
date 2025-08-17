'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Detectar tema inicial desde el DOM (ya aplicado por el script inline)
    useEffect(() => {
        const detectInitialTheme = () => {
            const html = document.documentElement;
            const isDark = html.classList.contains('dark');
            setIsDarkMode(isDark);
            setIsInitialized(true);
        };

        // Si el tema ya está aplicado, detectar inmediatamente
        if (document.documentElement.classList.contains('theme-applied')) {
            detectInitialTheme();
        } else {
            // Si no, esperar a que se aplique
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (
                        mutation.type === 'attributes' &&
                        mutation.attributeName === 'class'
                    ) {
                        if (
                            document.documentElement.classList.contains(
                                'theme-applied'
                            )
                        ) {
                            observer.disconnect();
                            detectInitialTheme();
                        }
                    }
                });
            });

            observer.observe(document.documentElement, { attributes: true });

            // Fallback
            setTimeout(() => {
                if (!isInitialized) {
                    detectInitialTheme();
                    observer.disconnect();
                }
            }, 2000);
        }
    }, []);

    // Aplicar tema cuando cambie (solo para cambios de usuario)
    useEffect(() => {
        if (!isInitialized) return;

        const root = document.documentElement;
        const body = document.body;

        if (isDarkMode) {
            root.classList.add('dark');
            body.classList.add('dark');
            root.style.colorScheme = 'dark';
        } else {
            root.classList.remove('dark');
            body.classList.remove('dark');
            root.style.colorScheme = 'light';
        }

        // Aplicar PrimeReact theme
        let linkElement = document.getElementById('prime-react-theme');
        if (!linkElement) {
            linkElement = document.createElement('link');
            linkElement.id = 'prime-react-theme';
            linkElement.rel = 'stylesheet';
            document.head.appendChild(linkElement);
        }

        const themeUrl = isDarkMode
            ? '/themes/lara-dark-blue/theme.css'
            : '/themes/lara-light-blue/theme.css';
        linkElement.href = themeUrl;

        // Guardar en localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode, isInitialized]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const setTheme = (theme) => {
        setIsDarkMode(theme === 'dark');
    };

    const value = {
        isDarkMode,
        isInitialized,
        toggleTheme,
        setTheme,
        theme: isDarkMode ? 'dark' : 'light',
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

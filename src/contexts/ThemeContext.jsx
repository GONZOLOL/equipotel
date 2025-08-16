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
    const [isLoaded, setIsLoaded] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        // Use saved theme or system preference
        const shouldUseDarkMode = savedTheme
            ? savedTheme === 'dark'
            : prefersDark;
        setIsDarkMode(shouldUseDarkMode);
        setIsLoaded(true);
    }, []);

    // Apply theme to document and PrimeReact
    useEffect(() => {
        if (!isLoaded) return;

        const root = document.documentElement;
        const body = document.body;

        if (isDarkMode) {
            // Apply dark theme
            root.classList.add('dark');
            body.classList.add('dark');
            document.documentElement.classList.add('dark');
            document.querySelector('html').classList.add('dark');

            console.log('🌙 Dark mode applied');

            // PrimeReact dark theme
            const linkElement = document.getElementById('prime-react-theme');
            if (linkElement) {
                linkElement.href = '/themes/lara-dark-blue/theme.css';
            } else {
                const newLink = document.createElement('link');
                newLink.id = 'prime-react-theme';
                newLink.rel = 'stylesheet';
                newLink.href = '/themes/lara-dark-blue/theme.css';
                document.head.appendChild(newLink);
            }
        } else {
            // Apply light theme
            root.classList.remove('dark');
            body.classList.remove('dark');
            document.documentElement.classList.remove('dark');
            document.querySelector('html').classList.remove('dark');

            console.log('☀️ Light mode applied');

            // PrimeReact light theme
            const linkElement = document.getElementById('prime-react-theme');
            if (linkElement) {
                linkElement.href = '/themes/lara-light-blue/theme.css';
            } else {
                const newLink = document.createElement('link');
                newLink.id = 'prime-react-theme';
                newLink.rel = 'stylesheet';
                newLink.href = '/themes/lara-light-blue/theme.css';
                document.head.appendChild(newLink);
            }
        }

        // Save to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode, isLoaded]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            // Only auto-switch if user hasn't manually set a preference
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                setIsDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const setTheme = (theme) => {
        setIsDarkMode(theme === 'dark');
    };

    const value = {
        isDarkMode,
        isLoaded,
        toggleTheme,
        setTheme,
        theme: isDarkMode ? 'dark' : 'light',
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

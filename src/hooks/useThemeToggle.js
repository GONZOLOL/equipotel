import { useTheme } from '@/contexts/ThemeContext';

export const useThemeToggle = () => {
    const theme = useTheme();

    return {
        isDarkMode: theme.isDarkMode,
        isLoaded: theme.isLoaded,
        toggleTheme: theme.toggleTheme,
        setTheme: theme.setTheme,
        theme: theme.theme,
        // Convenience methods
        isLightMode: !theme.isDarkMode,
        switchToLight: () => theme.setTheme('light'),
        switchToDark: () => theme.setTheme('dark'),
        // Icon and label helpers
        themeIcon: theme.isDarkMode ? 'pi pi-sun' : 'pi pi-moon',
        themeLabel: theme.isDarkMode
            ? 'Cambiar a modo claro'
            : 'Cambiar a modo oscuro',
        themeAriaLabel: theme.isDarkMode
            ? 'Cambiar a modo claro'
            : 'Cambiar a modo oscuro',
    };
};

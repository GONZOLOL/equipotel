'use client';

import { Button } from 'primereact/button';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function ThemeToggle({ className = '' }) {
    const {
        isDarkMode,
        toggleTheme,
        isLoaded,
        themeIcon,
        themeLabel,
        themeAriaLabel,
    } = useThemeToggle();

    if (!isLoaded) {
        return (
            <Button
                icon="pi pi-spinner"
                className={`p-button-text ${className}`}
                disabled
            />
        );
    }

    return (
        <Button
            icon={themeIcon}
            onClick={toggleTheme}
            className={`p-button-text ${className}`}
            tooltip={themeLabel}
            tooltipOptions={{ position: 'bottom' }}
            aria-label={themeAriaLabel}
        />
    );
}

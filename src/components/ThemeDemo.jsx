'use client';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function ThemeDemo() {
    const { isDarkMode, toggleTheme, themeIcon, themeLabel } = useThemeToggle();

    return (
        <div className="p-6 space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Sistema de Temas - Demo
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200">
                        Este componente demuestra cómo funciona el sistema de
                        temas en la aplicación.
                    </p>

                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-sm text-gray-500 dark:text-gray-300">
                            Modo actual: {isDarkMode ? 'Oscuro' : 'Claro'}
                        </span>
                        <Button
                            icon={themeIcon}
                            onClick={toggleTheme}
                            tooltip={themeLabel}
                            className="p-button-outlined"
                        />
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Componentes PrimeReact
                    </h3>
                    <div className="space-y-3">
                        <Button label="Botón Primario" severity="primary" />
                        <Button
                            label="Botón Secundario"
                            severity="secondary"
                            outlined
                        />
                        <div className="flex gap-2">
                            <Tag value="Éxito" severity="success" />
                            <Tag value="Advertencia" severity="warning" />
                            <Tag value="Error" severity="danger" />
                        </div>
                    </div>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Colores de Texto
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p className="text-gray-900 dark:text-white">
                            Texto principal
                        </p>
                        <p className="text-gray-600 dark:text-gray-200">
                            Texto secundario
                        </p>
                        <p className="text-gray-500 dark:text-gray-300">
                            Texto terciario
                        </p>
                        <p className="text-blue-600 dark:text-blue-400">
                            Texto azul
                        </p>
                        <p className="text-green-600 dark:text-green-400">
                            Texto verde
                        </p>
                    </div>
                </Card>
            </div>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Gradientes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="h-20 rounded-lg gradient-light flex items-center justify-center">
                        <span className="text-gray-700 dark:text-gray-200 font-medium">
                            Claro
                        </span>
                    </div>
                    <div className="h-20 rounded-lg gradient-blue-light flex items-center justify-center">
                        <span className="text-blue-700 dark:text-blue-200 font-medium">
                            Azul
                        </span>
                    </div>
                    <div className="h-20 rounded-lg gradient-green-light flex items-center justify-center">
                        <span className="text-green-700 dark:text-green-200 font-medium">
                            Verde
                        </span>
                    </div>
                    <div className="h-20 rounded-lg gradient-orange-light flex items-center justify-center">
                        <span className="text-orange-700 dark:text-orange-200 font-medium">
                            Naranja
                        </span>
                    </div>
                    <div className="h-20 rounded-lg gradient-purple-light flex items-center justify-center">
                        <span className="text-purple-700 dark:text-purple-200 font-medium">
                            Púrpura
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    );
}

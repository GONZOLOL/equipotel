'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function NotFound() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleGoHome = () => {
        router.push('/');
    };

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
                <div className="w-full max-w-xl text-center shadow-2xl bg-white dark:bg-gray-800 rounded-lg p-8">
                    <div className="animate-pulse">
                        <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-8"></div>
                        <div className="flex justify-center gap-4">
                            <div className="h-12 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            <div className="h-12 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <Card className="w-full max-w-xl text-center shadow-2xl">
                <div className="p-8">
                    {/* Icono 404 */}
                    <div className="mb-6">
                        <i
                            className="pi pi-exclamation-triangle text-red-400"
                            style={{ fontSize: '3rem' }}
                        />
                    </div>

                    {/* Título */}
                    <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
                        404
                    </h1>

                    {/* Subtítulo */}
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Página no encontrada
                    </h2>

                    {/* Descripción */}
                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        Lo sentimos, la página que buscas no existe o ha sido
                        movida. Puedes volver a la página principal o explorar
                        nuestros productos.
                    </p>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            label="Ir al Inicio"
                            icon="pi pi-home"
                            onClick={handleGoHome}
                            className="p-button-primary p-button-lg"
                        />
                        <Button
                            label="Ver Productos"
                            icon="pi pi-shopping-bag"
                            onClick={() => router.push('/productos')}
                            className="p-button-outlined p-button-lg"
                        />
                    </div>

                    {/* Información adicional */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            ¿Necesitas ayuda?
                            <a
                                href="/contacto"
                                className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                            >
                                Contáctanos
                            </a>
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}

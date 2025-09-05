'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Timeline } from 'primereact/timeline';
import Link from 'next/link';

export default function SobreNosotros() {
    const valores = [
        {
            icon: 'pi pi-shield',
            title: 'Seguridad',
            description:
                'Nuestra prioridad es garantizar la máxima seguridad para nuestros clientes.',
        },
        {
            icon: 'pi pi-check-circle',
            title: 'Calidad',
            description:
                'Trabajamos solo con productos certificados de la más alta calidad.',
        },
        {
            icon: 'pi pi-users',
            title: 'Confianza',
            description:
                'Construimos relaciones duraderas basadas en la confianza y el servicio.',
        },
        {
            icon: 'pi pi-star',
            title: 'Excelencia',
            description:
                'Buscamos la excelencia en cada proyecto y servicio que realizamos.',
        },
    ];

    const servicios = [
        {
            icon: 'pi pi-user-plus',
            title: 'Instalación Profesional',
            description:
                'Equipo especializado en la instalación de cajas fuertes, sistemas de anclaje certificados, cámaras de seguridad y equipos contra incendios.',
        },
        {
            icon: 'pi pi-wrench',
            title: 'Mantenimiento',
            description:
                'Servicio de mantenimiento preventivo y correctivo para todos nuestros productos y sistemas de seguridad.',
        },
        {
            icon: 'pi pi-cog',
            title: 'Reparación',
            description:
                'Reparación y actualización de sistemas de seguridad existentes.',
        },
        {
            icon: 'pi pi-comments',
            title: 'Asesoramiento',
            description:
                'Asesoramiento personalizado para elegir la mejor solución de seguridad.',
        },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="overflow-hidden relative text-white py-20 pt-40">
                {/* Imagen de fondo con opacidad */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/src/mainBackground.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.4,
                    }}
                ></div>
                {/* Overlay para mejorar la legibilidad del texto */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                        Sobre{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">
                            Equipotel
                        </span>
                    </h1>
                    <p className="text-xl mb-8 text-white max-w-3xl mx-auto">
                        Más de 20 años protegiendo lo que más importa. Somos
                        especialistas en cajas fuertes, sistenas de anclaje y
                        sistemas de seguridad en Málaga y Andalucía Oriental.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Historia */}
                <section className="mb-16">
                    <div className="grid gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                                Nuestra Historia
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                                Equipotel nació en 2010 con la misión de
                                proporcionar soluciones de seguridad confiables
                                y de alta calidad para hogares, empresas y el
                                sector bancario en Málaga y Andalucía Oriental.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                                Desde nuestros inicios, nos hemos especializado
                                en cajas fuertes, cámaras de seguridad, sistemas
                                de anclaje certificados y homologados según
                                normas UNE, y técnicos de seguridad física para
                                el sector bancario, siempre trabajando con
                                productos certificados y de la más alta calidad.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Con más de 20 años de experiencia en el sector,
                                hemos ayudado a miles de clientes a proteger sus
                                bienes más valiosos, construyendo una reputación
                                basada en la confianza, la profesionalidad y el
                                servicio de excelencia con instalación
                                profesional especializada.
                            </p>
                            <Link href="/productos">
                                <Button
                                    label="Conoce Nuestros Productos"
                                    severity="danger"
                                    size="large"
                                    className="px-8 py-3"
                                />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Valores */}
                <section className="mb-16 ">
                    <div className=" mb-12 mt-16">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Nuestros Valores
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                            Los principios que guían nuestro trabajo y relación
                            con los clientes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valores.map((valor, index) => (
                            <Card
                                key={index}
                                className="text-center border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100 mb-6"
                            >
                                <div className="bg-red-100 p-4 rounded-lg inline-block mb-4">
                                    <i
                                        className={`${valor.icon} text-red-600 text-3xl`}
                                    ></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                    {valor.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {valor.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Servicios */}
                <section className="mb-16">
                    <div className=" mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Nuestros Servicios
                        </h2>
                        <p className="text-lg text-white dark:text-gray-300 max-w-2xl">
                            Ofrecemos servicios completos para todas tus
                            necesidades de seguridad
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {servicios.map((servicio, index) => (
                            <Card
                                key={index}
                                className="text-center border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100"
                            >
                                <div className="bg-red-100 p-4 rounded-lg inline-block mb-4">
                                    <i
                                        className={`${servicio.icon} text-red-600 text-3xl`}
                                    ></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                    {servicio.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {servicio.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center w-full">
                    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            ¿Listo para Proteger lo que Más Importa?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Nuestros expertos están listos para asesorarte y
                            encontrar la mejor solución de seguridad para tus
                            necesidades.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contacto">
                                <Button
                                    label="Contactar Ahora"
                                    severity="danger"
                                    size="large"
                                    className="px-8 py-3"
                                />
                            </Link>
                            <Link href="/productos">
                                <Button
                                    label="Ver Productos"
                                    severity="danger"
                                    size="large"
                                    outlined
                                    className="px-8 py-3"
                                />
                            </Link>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    );
}

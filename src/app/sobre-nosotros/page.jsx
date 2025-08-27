'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Timeline } from 'primereact/timeline';

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
            icon: 'pi pi-tools',
            title: 'Instalación Profesional',
            description:
                'Equipo especializado en la instalación de cajas fuertes y armarios acorazados.',
        },
        {
            icon: 'pi pi-wrench',
            title: 'Mantenimiento',
            description:
                'Servicio de mantenimiento preventivo y correctivo para todos nuestros productos.',
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

    const timelineEvents = [
        {
            status: 'Fundación',
            date: '2010',
            icon: 'pi pi-building',
            color: '#607D8B',
            description:
                'Equipotel nace como empresa especializada en seguridad en Málaga.',
        },
        {
            status: 'Primera Certificación',
            date: '2012',
            icon: 'pi pi-certificate',
            color: '#4CAF50',
            description:
                'Obtenemos la primera certificación europea para nuestros productos.',
        },
        {
            status: 'Expansión',
            date: '2015',
            icon: 'pi pi-globe',
            color: '#2196F3',
            description:
                'Ampliamos nuestros servicios a toda la provincia de Málaga.',
        },
        {
            status: 'Innovación',
            date: '2018',
            icon: 'pi pi-lightbulb',
            color: '#FF9800',
            description:
                'Incorporamos las últimas tecnologías en seguridad electrónica.',
        },
        {
            status: 'Liderazgo',
            date: '2024',
            icon: 'pi pi-trophy',
            color: '#9C27B0',
            description:
                'Nos consolidamos como líderes en seguridad en la región.',
        },
    ];

    const customMarker = (item) => {
        return (
            <span
                className="custom-marker"
                style={{ backgroundColor: item.color }}
            >
                <i className={item.icon}></i>
            </span>
        );
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 py-20 pt-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                        Sobre{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Equipotel
                        </span>
                    </h1>
                    <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        Más de 14 años protegiendo lo que más importa. Somos
                        especialistas en cajas fuertes, armarios acorazados y
                        sistemas de seguridad en Málaga.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Historia */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                                Nuestra Historia
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                                Equipotel nació en 2010 con la misión de
                                proporcionar soluciones de seguridad confiables
                                y de alta calidad para hogares y empresas en
                                Málaga.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                                Desde nuestros inicios, nos hemos especializado
                                en cajas fuertes, armarios acorazados y sistemas
                                de anclaje, siempre trabajando con productos
                                certificados y de la más alta calidad.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                A lo largo de estos años, hemos ayudado a miles
                                de clientes a proteger sus bienes más valiosos,
                                construyendo una reputación basada en la
                                confianza, la profesionalidad y el servicio de
                                excelencia.
                            </p>
                            <Button
                                label="Conoce Nuestros Productos"
                                severity="primary"
                                size="large"
                                className="px-8 py-3"
                            />
                        </div>
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 h-96 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <i className="pi pi-building text-8xl text-gray-400 dark:text-gray-500 mb-4 block"></i>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                    Imagen de la empresa
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Valores */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Nuestros Valores
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Los principios que guían nuestro trabajo y relación
                            con los clientes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valores.map((valor, index) => (
                            <Card
                                key={index}
                                className="text-center border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 mb-6"
                            >
                                <div className="bg-blue-100 p-4 rounded-lg inline-block mb-4">
                                    <i
                                        className={`${valor.icon} text-blue-600 text-3xl`}
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

                {/* Timeline */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Nuestra Trayectoria
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Los hitos más importantes en nuestra historia
                        </p>
                    </div>

                    <Card className="bg-white dark:bg-gray-800 dark:border-gray-700">
                        <Timeline
                            value={timelineEvents}
                            marker={customMarker}
                            content={(item) => (
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        {item.status}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        {item.date}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {item.description}
                                    </p>
                                </div>
                            )}
                        />
                    </Card>
                </section>

                {/* Servicios */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Nuestros Servicios
                        </h2>
                        <p className="text-lg text-white dark:text-gray-300 max-w-2xl mx-auto">
                            Ofrecemos servicios completos para todas tus
                            necesidades de seguridad
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {servicios.map((servicio, index) => (
                            <Card
                                key={index}
                                className="text-center border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100"
                            >
                                <div className="bg-green-100 p-4 rounded-lg inline-block mb-4">
                                    <i
                                        className={`${servicio.icon} text-green-600 text-3xl`}
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

                {/* Estadísticas */}
                <section className="mb-16">
                    <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                <div className="fade-in">
                                    <div className="text-4xl md:text-5xl font-bold mb-2">
                                        14+
                                    </div>
                                    <div className="text-blue-100 text-lg">
                                        Años de Experiencia
                                    </div>
                                </div>
                                <div className="fade-in">
                                    <div className="text-4xl md:text-5xl font-bold mb-2">
                                        1000+
                                    </div>
                                    <div className="text-blue-100 text-lg">
                                        Clientes Satisfechos
                                    </div>
                                </div>
                                <div className="fade-in">
                                    <div className="text-4xl md:text-5xl font-bold mb-2">
                                        500+
                                    </div>
                                    <div className="text-blue-100 text-lg">
                                        Instalaciones Realizadas
                                    </div>
                                </div>
                                <div className="fade-in">
                                    <div className="text-4xl md:text-5xl font-bold mb-2">
                                        24/7
                                    </div>
                                    <div className="text-blue-100 text-lg">
                                        Soporte Técnico
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center">
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
                            <Button
                                label="Contactar Ahora"
                                severity="primary"
                                size="large"
                                className="px-8 py-3"
                            />
                            <Button
                                label="Ver Productos"
                                severity="secondary"
                                size="large"
                                outlined
                                className="px-8 py-3"
                            />
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    );
}

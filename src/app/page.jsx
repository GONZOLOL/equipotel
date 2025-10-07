'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import Link from 'next/link';
import { getProducts, convertGoogleDriveUrl } from '@/services/productService';
import Image from 'next/image';
import ProductImageSkeleton from '@/components/ProductImageSkeleton';

export default function Home() {
    const [loading, setLoading] = useState(true);

    const servicios = [
        {
            icon: 'pi pi-shield',
            title: 'Cajas Fuertes',
            description:
                'Amplia gama de cajas fuertes para hogar, oficina y sector bancario con diferentes niveles de seguridad certificados.',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            icon: 'pi pi-link',
            title: 'Sistemas de Anclaje',
            description:
                'Sistemas de anclaje certificados y homologados según normas UNE. Instalación profesional garantizada.',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600',
        },
        {
            icon: 'pi pi-video',
            title: 'Cámaras de Seguridad',
            description:
                'Sistemas de videovigilancia profesionales para hogar, oficina y sector bancario.',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
        },
        {
            icon: 'pi pi-lock',
            title: 'Segunda Mano',
            description:
                'Productos de segunda mano certificados y revisados por nuestros técnicos especializados.',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
        },
    ];

    const productTemplate = (product) => {
        const mainImage = product.mainImage || product.image;
        const hasImage = mainImage && mainImage.trim() !== '';

        return (
            <div className="p-4 h-full">
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                    <div className="text-center flex flex-col h-full">
                        {/* Imagen - altura fija */}
                        <div className="h-48 mb-6 rounded-xl flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                            <ProductImageSkeleton
                                producto={{
                                    ...product,
                                    convertGoogleDriveUrl,
                                }}
                                className="w-full h-full rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200"
                                showSkeleton={hasImage}
                            />
                        </div>

                        {/* Categoría - altura fija */}
                        <div className="mb-4 flex-shrink-0">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                {product.categoryLabel || product.category}
                            </span>
                        </div>

                        {/* Título - altura fija */}
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 min-h-[3rem] flex-shrink-0">
                            {product.name}
                        </h3>

                        {/* Precio - altura fija */}
                        <p className="text-2xl font-bold text-blue-600 mb-4 flex-shrink-0">
                            {product.priceFormatted || product.price}
                        </p>

                        {/* Características - altura fija */}
                        <div className="mb-4 flex-shrink-0 min-h-[4.5rem]">
                            {product.features && product.features.length > 0 ? (
                                <div className="space-y-1">
                                    {product.features
                                        .slice(0, 3)
                                        .map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300"
                                            >
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                {feature}
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500 dark:text-gray-400 min-h-[4.5rem] flex items-center justify-center">
                                    Producto de alta calidad
                                </div>
                            )}
                        </div>

                        {/* Botón - siempre al final */}
                        <div className="mt-auto pt-4">
                            <Button
                                label="Ver Detalles"
                                severity="primary"
                                size="small"
                                className="w-full"
                                onClick={() =>
                                    (window.location.href = `/productos/${product.id}`)
                                }
                            />
                        </div>
                    </div>
                </Card>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            {/* Hero Section */}
            <section className="overflow-hidden relative text-white pt-40 h-232">
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
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="fade-in">
                            <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                                Tu Seguridad es nuestra Prioridad
                            </h1>
                            <p className="text-xl mb-10 text-white leading-relaxed">
                                Especialistas en cajas fuertes, cámaras de
                                seguridad, sistemas de anclaje certificados y
                                homologados según normas UNE, y técnicos de
                                seguridad física para el sector bancario. Más de
                                20 años en el sector protegiendo lo que más
                                importa con productos certificados e instalación
                                profesional.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pb-15">
                                <Link href="/productos">
                                    <Button
                                        label="Ver Productos"
                                        size="large"
                                        severity="danger"
                                        className="text-lg px-8 py-4 shadow-lg hover:shadow-xl"
                                    />
                                </Link>
                                <Link href="/contacto">
                                    <Button
                                        label="Contactar"
                                        size="large"
                                        severity="danger"
                                        outlined
                                        className="text-lg px-8 py-4 border-2"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:block slide-in-right">
                            <div className=" bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 dark:border-gray-700/50 shadow-xl">
                                <div className="text-center">
                                    <div className="w-48 h-48  rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Image
                                            src="/src/logo-modelo-2.svg"
                                            alt="Seguridad Certificada"
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">
                                        Seguridad Certificada
                                    </h3>
                                    <p className="text-white leading-relaxed">
                                        Productos con certificaciones europeas
                                        de máxima seguridad. Más de 20 años
                                        protegiendo a nuestros clientes del
                                        sector bancario y empresas con
                                        instalación profesional especializada.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Servicios */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                            Nuestros{' '}
                            <span className="text-gradient">Servicios</span>
                        </h2>
                        <p className="text-xl dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Ofrecemos soluciones completas de seguridad para
                            hogares y empresas, con productos certificados e
                            instalación profesional.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {servicios.map((servicio, index) => (
                            <Card
                                key={index}
                                className={`${servicio.bgColor} dark:bg-gray-800 dark:border-gray-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                            >
                                <div className="text-center">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${servicio.color} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                                    >
                                        <i
                                            className={`${servicio.icon} text-white text-2xl`}
                                        ></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                                        {servicio.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {servicio.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Estadísticas */}
            <section className="py-20 bg-red-600 text-white">
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
            </section>
            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden text-white">
                {/* Video de fondo */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source
                        src="/src/asesoramientoBackground.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Overlay para mejorar la legibilidad del texto */}
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        ¿Necesitas Asesoramiento?
                    </h2>
                    <p className="text-xl mb-10 text-white max-w-3xl mx-auto leading-relaxed">
                        Nuestros técnicos especializados te ayudarán a elegir la
                        mejor solución para tus necesidades. Ofrecemos
                        asesoramiento gratuito y sin compromiso para cajas
                        fuertes, cámaras de seguridad, sistemas de anclaje
                        certificados y equipos contra incendios.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            label="Llamar Ahora"
                            size="large"
                            severity="danger"
                            className="text-lg px-10 py-4 shadow-lg hover:shadow-xl"
                            onClick={() => {
                                const phoneNumber =
                                    process.env.NEXT_PUBLIC_PHONE_NUMBER ||
                                    '+34 676 20 80 24';
                                window.location.href = `tel:${phoneNumber}`;
                            }}
                        />
                        <Button
                            label="Solicitar Presupuesto"
                            size="large"
                            severity="danger"
                            outlined
                            className="text-lg px-10 py-4 border-2"
                        />
                    </div>
                </div>
            </section>

            {/* Espaciado adicional antes del footer */}
            <div className="py-16"></div>
        </div>
    );
}

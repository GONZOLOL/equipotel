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

export default function Home() {
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [loading, setLoading] = useState(true);

    const servicios = [
        {
            icon: 'pi pi-shield',
            title: 'Cajas Fuertes',
            description:
                'Amplia gama de cajas fuertes para hogar y oficina con diferentes niveles de seguridad.',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            icon: 'pi pi-building',
            title: 'Armarios Acorazados',
            description:
                'Armarios de seguridad para empresas con protección máxima contra robos.',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600',
        },
        {
            icon: 'pi pi-link',
            title: 'Sistemas de Anclaje',
            description:
                'Sistemas profesionales para fijar cajas fuertes y armarios de forma segura.',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
        },
        {
            icon: 'pi pi-lock',
            title: 'Compartimentos de Seguridad',
            description:
                'Soluciones discretas y seguras para proteger objetos de valor.',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
        },
    ];

    useEffect(() => {
        const loadProductosDestacados = async () => {
            try {
                setLoading(true);
                const productos = await getProducts();
                if (productos && productos.length > 0) {
                    // Tomar los primeros 4 productos como destacados
                    const destacados = productos.slice(0, 4);
                    setProductosDestacados(destacados);
                }
            } catch (error) {
                console.error('Error loading featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProductosDestacados();
    }, []);

    const productTemplate = (product) => {
        const mainImage = product.mainImage || product.image;
        const hasImage = mainImage && mainImage.trim() !== '';

        return (
            <div className="p-4 h-full">
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                    <div className="text-center flex flex-col h-full">
                        {/* Imagen - altura fija */}
                        <div className="h-48 mb-6 rounded-xl flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                            {hasImage ? (
                                <Image
                                    src={convertGoogleDriveUrl(mainImage)}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                                    <i className="pi pi-image text-6xl text-gray-400 relative z-10"></i>
                                </>
                            )}
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
        <div className="min-h-screen ">
            <Navbar />
            {/* Hero Section */}

            <section className=" overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 pt-40">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="fade-in">
                            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                                Tu Seguridad es Nuestra{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    Prioridad
                                </span>
                            </h1>
                            <p className="text-xl mb-10 text-white dark:text-gray-300 leading-relaxed">
                                Especialistas en cajas fuertes, armarios
                                acorazados y sistemas de seguridad en Málaga.
                                Protege lo que más importa con productos
                                certificados y instalación profesional.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pb-15">
                                <Link href="/productos">
                                    <Button
                                        label="Ver Productos"
                                        size="large"
                                        severity="primary"
                                        className="text-lg px-8 py-4 shadow-lg hover:shadow-xl"
                                    />
                                </Link>
                                <Link href="/contacto">
                                    <Button
                                        label="Contactar"
                                        size="large"
                                        severity="secondary"
                                        outlined
                                        className="text-lg px-8 py-4 border-2"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:block slide-in-right">
                            <div className=" bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 dark:border-gray-700/50 shadow-xl">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <i className="pi pi-shield text-white text-4xl"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">
                                        Seguridad Certificada
                                    </h3>
                                    <p className="text-white leading-relaxed">
                                        Productos con certificaciones europeas
                                        de máxima seguridad. Más de 14 años
                                        protegiendo a nuestros clientes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Servicios */}
            <section className="py-20 bg-white !important dark:bg-gray-900">
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
            {/* Productos Destacados */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                            Productos{' '}
                            <span className="text-gradient">Destacados</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Descubre nuestra selección de productos más
                            populares y solicitados por nuestros clientes.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Cargando productos destacados...
                                </p>
                            </div>
                        </div>
                    ) : productosDestacados.length > 0 ? (
                        <Carousel
                            value={productosDestacados}
                            numVisible={3}
                            numScroll={3}
                            itemTemplate={productTemplate}
                            autoplayInterval={5000}
                            circular
                        />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                No hay productos destacados disponibles
                            </p>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link href="/productos">
                            <Button
                                label="Ver Todos los Productos"
                                severity="primary"
                                size="large"
                                className="px-10 py-4 text-lg shadow-lg hover:shadow-xl"
                            />
                        </Link>
                    </div>
                </div>
            </section>
            {/* Estadísticas */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
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
            <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        ¿Necesitas{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Asesoramiento
                        </span>
                        ?
                    </h2>
                    <p className="text-xl mb-10 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Nuestros expertos te ayudarán a elegir la mejor solución
                        para tus necesidades. Ofrecemos asesoramiento gratuito y
                        sin compromiso.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            label="Llamar Ahora"
                            size="large"
                            severity="primary"
                            className="text-lg px-10 py-4 shadow-lg hover:shadow-xl"
                            onClick={() =>
                                (window.location.href = 'tel:+34951234567')
                            }
                        />
                        <Button
                            label="Solicitar Presupuesto"
                            size="large"
                            severity="secondary"
                            outlined
                            className="text-lg px-10 py-4 border-2"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

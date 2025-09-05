'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Galleria } from 'primereact/galleria';
import { getProducts, convertGoogleDriveUrl } from '@/services/productService';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allImages, setAllImages] = useState([]);

    useEffect(() => {
        loadProduct();
    }, [params.id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const products = await getProducts();
            const foundProduct = products.find((p) => p.id === params.id);

            if (foundProduct && foundProduct.category !== 'segunda-mano') {
                setProduct(foundProduct);

                // Combinar imagen principal con imágenes adicionales
                const mainImage = foundProduct.mainImage || foundProduct.image;
                const additionalImages = foundProduct.additionalImages || [];

                // Convertir todas las URLs de Google Drive
                const convertedMainImage =
                    mainImage && mainImage.trim() !== ''
                        ? convertGoogleDriveUrl(mainImage)
                        : null;
                const convertedAdditionalImages = additionalImages
                    .filter((img) => img && img.trim() !== '')
                    .map((img) => convertGoogleDriveUrl(img));

                // Crear array de imágenes válidas
                const images = [];
                if (convertedMainImage) {
                    images.push(convertedMainImage);
                }
                images.push(...convertedAdditionalImages);

                setAllImages(images);
            } else {
                // Producto no encontrado o es de segunda mano
                router.push('/productos');
            }
        } catch (error) {
            console.error('Error loading product:', error);
            router.push('/productos');
        } finally {
            setLoading(false);
        }
    };

    // Obtener severidad de stock para el tag
    const getStockSeverity = (stock) => {
        const severities = {
            Disponible: 'success',
            Agotado: 'danger',
            Próximamente: 'warning',
        };
        return severities[stock] || 'help';
    };

    // Template para la galería de imágenes
    const itemTemplate = (item) => {
        return (
            <div className="w-full h-70 sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md overflow-hidden flex items-center justify-center">
                <Image
                    src={item}
                    alt={product?.name || 'Producto'}
                    className="w-full h-full object-contain"
                    width={600}
                    height={600}
                    onError={(e) => {
                        console.error('Error cargando imagen:', item);
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
                    style={{ display: 'none' }}
                >
                    <div className="text-center">
                        <i className="pi pi-image text-6xl text-gray-400 mb-4"></i>
                        <p className="text-gray-500 dark:text-gray-400">
                            Imagen no disponible
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const thumbnailTemplate = (item) => {
        return (
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded border-2 border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center">
                <Image
                    src={item}
                    alt={product?.name || 'Producto'}
                    className="w-full h-full object-cover"
                    width={80}
                    height={80}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
                    style={{ display: 'none' }}
                >
                    <i className="pi pi-image text-xl text-gray-400"></i>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar />
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <i className="pi pi-spin pi-spinner text-4xl text-gray-400 mb-4"></i>
                        <p className="text-gray-600 dark:text-gray-300">
                            Cargando producto...
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar />
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <i className="pi pi-exclamation-triangle text-4xl text-gray-400 mb-4"></i>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            Producto no encontrado
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            El producto que buscas no existe o no está
                            disponible.
                        </p>
                        <Button
                            label="Volver a productos"
                            severity="primary"
                            onClick={() => router.push('/productos')}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <button
                            onClick={() => router.push('/')}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            Inicio
                        </button>
                        <i className="pi pi-chevron-right text-gray-400"></i>
                        <button
                            onClick={() => router.push('/productos')}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            Productos
                        </button>
                        <i className="pi pi-chevron-right text-gray-400"></i>
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {product.name}
                        </span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Galería de imágenes */}
                    <div className="space-y-4">
                        {allImages.length > 0 ? (
                            <div className="relative w-full">
                                <Galleria
                                    value={allImages}
                                    circular
                                    showItemNavigators
                                    showThumbnails={allImages.length > 1}
                                    item={itemTemplate}
                                    thumbnail={thumbnailTemplate}
                                />
                            </div>
                        ) : (
                            <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <i className="pi pi-image text-6xl text-gray-400 mb-4"></i>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Sin imágenes disponibles
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Información del producto */}
                    <div className="space-y-6">
                        <div>
                            {/* Categoría */}
                            <div className="mb-3">
                                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold px-3 py-1 rounded-full">
                                    {product.categoryLabel || product.category}
                                </span>
                            </div>

                            {/* Título */}
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {product.name}
                            </h1>

                            {/* Stock */}
                            {product.stock && (
                                <div className="mb-4">
                                    <Tag
                                        value={product.stock}
                                        severity={getStockSeverity(
                                            product.stock
                                        )}
                                        className="text-sm"
                                    />
                                </div>
                            )}
                        </div>

                        <Divider />

                        {/* Descripción */}
                        {product.description && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Descripción
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Características */}
                        {product.features && product.features.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Características
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {product.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center text-gray-700 dark:text-gray-300"
                                        >
                                            <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Divider />

                        {/* Información adicional para productos normales */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div className="flex items-start">
                                <i className="pi pi-info-circle text-blue-600 dark:text-blue-400 mr-3 mt-1"></i>
                                <div>
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                                        Información del Producto
                                    </h4>
                                    <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                                        <li>• Producto nuevo y certificado</li>
                                        <li>
                                            • Garantía completa del fabricante
                                        </li>
                                        <li>
                                            • Instalación profesional incluida
                                        </li>
                                        <li>• Soporte técnico especializado</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                label="Contactar para más información"
                                severity="danger"
                                size="large"
                                className="flex-1"
                                onClick={() => {
                                    const phoneNumber =
                                        process.env.NEXT_PUBLIC_PHONE_NUMBER ||
                                        '+34 676 20 80 24';
                                    window.location.href = `tel:${phoneNumber}`;
                                }}
                            />
                            <Button
                                label="Solicitar presupuesto"
                                severity="secondary"
                                size="large"
                                outlined
                                className="flex-1"
                                onClick={() => router.push('/contacto')}
                            />
                        </div>
                    </div>
                </div>

                {/* Productos relacionados */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Otros Productos
                    </h2>
                    <div className="text-center">
                        <Button
                            label="Ver todos los productos"
                            severity="primary"
                            outlined
                            onClick={() => router.push('/productos')}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

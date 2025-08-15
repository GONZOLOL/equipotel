'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { getProducts, convertGoogleDriveUrl } from '@/services/productService';
import Image from 'next/image';

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (allImages.length <= 1) return;

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    setSelectedImageIndex((prev) =>
                        prev === 0 ? allImages.length - 1 : prev - 1
                    );
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    setSelectedImageIndex((prev) =>
                        prev === allImages.length - 1 ? 0 : prev + 1
                    );
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [allImages.length]);

    // Global mouse event listeners for drag
    useEffect(() => {
        if (isDragging) {
            const handleGlobalMouseMove = handleMouseMove;
            const handleGlobalMouseUp = handleMouseUp;

            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);

            return () => {
                document.removeEventListener('mouseup', handleGlobalMouseUp);
            };
        }
    }, [isDragging]);

    useEffect(() => {
        loadProduct();
    }, [params.id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const products = await getProducts();
            const foundProduct = products.find((p) => p.id === params.id);

            if (foundProduct) {
                setProduct(foundProduct);

                // Combinar imagen principal con imágenes adicionales
                const mainImage = foundProduct.mainImage || foundProduct.image;
                const additionalImages = foundProduct.additionalImages || [];

                // Convertir todas las URLs de Google Drive
                const convertedMainImage = mainImage
                    ? convertGoogleDriveUrl(mainImage)
                    : null;
                const convertedAdditionalImages = additionalImages.map((img) =>
                    convertGoogleDriveUrl(img)
                );

                const images = convertedMainImage
                    ? [convertedMainImage, ...convertedAdditionalImages]
                    : convertedAdditionalImages;

                console.log('URLs de imágenes convertidas:', {
                    original: { mainImage, additionalImages },
                    converted: {
                        convertedMainImage,
                        convertedAdditionalImages,
                    },
                    final: images,
                });

                setAllImages(images);
            } else {
                // Producto no encontrado
                router.push('/productos');
            }
        } catch (error) {
            console.error('Error loading product:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(price);
    };

    const getStockSeverity = (stock) => {
        switch (stock) {
            case 'Disponible':
                return 'success';
            case 'Agotado':
                return 'danger';
            case 'Próximamente':
                return 'warning';
            default:
                return 'info';
        }
    };

    // Touch/Drag handlers for swipe navigation
    const handleTouchStart = (e) => {
        if (allImages.length <= 1) return;
        setIsDragging(true);
        const touch = e.touches ? e.touches[0] : e;
        setStartX(touch.clientX);
        setCurrentX(touch.clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || allImages.length <= 1) return;
        e.preventDefault(); // Prevent default to avoid text selection
        const touch = e.touches ? e.touches[0] : e;
        setCurrentX(touch.clientX);
    };

    const handleTouchEnd = () => {
        if (!isDragging || allImages.length <= 1) return;

        const diffX = startX - currentX;
        const threshold = 50; // Minimum distance to trigger swipe

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next image
                setSelectedImageIndex((prev) =>
                    prev === allImages.length - 1 ? 0 : prev + 1
                );
            } else {
                // Swipe right - previous image
                setSelectedImageIndex((prev) =>
                    prev === 0 ? allImages.length - 1 : prev - 1
                );
            }
        }

        setIsDragging(false);
        setStartX(0);
        setCurrentX(0);
    };

    const handleMouseDown = (e) => {
        if (e.button !== 0 || allImages.length <= 1) return; // Only left mouse button
        handleTouchStart(e);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || allImages.length <= 1) return;
        handleTouchMove(e);
    };

    const handleMouseUp = () => {
        if (allImages.length <= 1) return;
        handleTouchEnd();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <i className="pi pi-spin pi-spinner text-4xl text-blue-600 mb-4"></i>
                    <p className="text-gray-600">Cargando producto...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <i className="pi pi-exclamation-triangle text-4xl text-red-600 mb-4"></i>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Producto no encontrado
                    </h2>
                    <p className="text-gray-600 mb-4">
                        El producto que buscas no existe o ha sido eliminado.
                    </p>
                    <Button
                        label="Volver a Productos"
                        icon="pi pi-arrow-left"
                        onClick={() => router.push('/productos')}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center py-4 gap-4">
                        <Button
                            icon="pi pi-arrow-left"
                            severity="secondary"
                            outlined
                            onClick={() => router.back()}
                            className="mr-4"
                        />
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                {product.name}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {product.categoryLabel}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image with Carousel Controls */}
                        <div className="relative group">
                            {allImages.length > 0 ? (
                                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md overflow-hidden relative">
                                    {/* Image Container with Drag */}
                                    <div
                                        className={`w-full h-full relative image-carousel-container ${
                                            isDragging ? 'dragging' : ''
                                        }`}
                                        onMouseDown={handleMouseDown}
                                        onTouchStart={handleTouchStart}
                                        onTouchMove={handleTouchMove}
                                        onTouchEnd={handleTouchEnd}
                                        style={{
                                            transform: isDragging
                                                ? `translateX(${
                                                      currentX - startX
                                                  }px)`
                                                : 'none',
                                            transition: isDragging
                                                ? 'none'
                                                : 'transform 0.3s ease-out',
                                        }}
                                    >
                                        <Image
                                            src={allImages[selectedImageIndex]}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            width={600}
                                            height={600}
                                            onError={(e) => {
                                                console.error(
                                                    'Error cargando imagen:',
                                                    allImages[
                                                        selectedImageIndex
                                                    ]
                                                );
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display =
                                                    'flex';
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                                            style={{ display: 'none' }}
                                        >
                                            <div className="text-center">
                                                <i className="pi pi-image text-4xl text-gray-400 mb-2"></i>
                                                <p className="text-gray-500 text-sm">
                                                    Error al cargar la imagen
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Carousel Navigation Controls */}
                                    {allImages.length > 1 && (
                                        <>
                                            {/* Previous Button */}
                                            <Button
                                                icon="pi pi-chevron-left"
                                                size="large"
                                                severity="secondary"
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white bg-opacity-90 hover:bg-opacity-100 shadow-lg hover:shadow-xl border border-gray-200 carousel-button"
                                                onClick={() =>
                                                    setSelectedImageIndex(
                                                        (prev) =>
                                                            prev === 0
                                                                ? allImages.length -
                                                                  1
                                                                : prev - 1
                                                    )
                                                }
                                            />

                                            {/* Next Button */}
                                            <Button
                                                icon="pi pi-chevron-right"
                                                size="large"
                                                severity="secondary"
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white bg-opacity-90 hover:bg-opacity-100 shadow-lg hover:shadow-xl border border-gray-200 carousel-button"
                                                onClick={() =>
                                                    setSelectedImageIndex(
                                                        (prev) =>
                                                            prev ===
                                                            allImages.length - 1
                                                                ? 0
                                                                : prev + 1
                                                    )
                                                }
                                            />

                                            {/* Image Counter */}
                                            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                                                {selectedImageIndex + 1} /{' '}
                                                {allImages.length}
                                            </div>

                                            {/* Drag Indicator */}
                                            {isDragging && (
                                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                                                    <i className="pi pi-arrows-h mr-1"></i>
                                                    Arrastrando...
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-md flex items-center justify-center">
                                    <i className="pi pi-image text-6xl text-gray-400"></i>
                                </div>
                            )}

                            {/* Featured Badge */}
                            {product.featured && (
                                <div className="absolute top-4 left-4 z-10">
                                    <Tag
                                        value="Destacado"
                                        severity="success"
                                        className="text-sm font-semibold"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Enhanced Thumbnail Gallery */}
                        {allImages.length > 1 && (
                            <div className="space-y-3">
                                {/* Thumbnail Navigation */}
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    {allImages.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedImageIndex(index)
                                            }
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 relative thumbnail-button ${
                                                selectedImageIndex === index
                                                    ? 'border-blue-600 shadow-lg scale-105 ring-2 ring-blue-200 selected'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.name} ${
                                                    index + 1
                                                }`}
                                                className="w-full h-full object-cover"
                                                width={80}
                                                height={80}
                                                onError={(e) => {
                                                    console.error(
                                                        'Error cargando miniatura:',
                                                        image
                                                    );
                                                    e.target.style.display =
                                                        'none';
                                                    e.target.nextSibling.style.display =
                                                        'flex';
                                                }}
                                            />
                                            <div
                                                className="absolute inset-0 bg-gray-200 flex items-center justify-center"
                                                style={{ display: 'none' }}
                                            >
                                                <i className="pi pi-image text-gray-400"></i>
                                            </div>
                                            {selectedImageIndex === index && (
                                                <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                                                    <i className="pi pi-check text-white text-sm font-bold"></i>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Navigation Hints */}
                                <div className="text-center text-xs text-gray-500 space-y-1 bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <i className="pi pi-keyboard text-blue-600"></i>
                                        <span>
                                            Flechas del teclado para navegar
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <i className="pi pi-mouse text-blue-600"></i>
                                        <span>
                                            Arrastra o desliza para cambiar
                                            imagen
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Title and Price */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl font-bold text-blue-600">
                                    {product.priceFormatted ||
                                        formatPrice(product.price)}
                                </span>
                                <Tag
                                    value={product.stock}
                                    severity={getStockSeverity(product.stock)}
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <Tag
                                value={product.categoryLabel}
                                severity="info"
                                className="text-sm"
                            />
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Descripción
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Características
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.features.map((feature, index) => (
                                        <Tag
                                            key={index}
                                            value={feature}
                                            severity="secondary"
                                            className="text-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2 pt-4 gap-2">
                            <Button
                                label="Solicitar Información"
                                icon="pi pi-envelope"
                                severity="primary"
                                size="medium"
                                className="w-full"
                                onClick={() => {
                                    // Aquí puedes agregar la lógica para contactar
                                    window.location.href = `mailto:info@equipotel.com?subject=Consulta sobre ${product.name}&body=Hola, me interesa obtener más información sobre el producto: ${product.name}`;
                                }}
                            />
                            <Button
                                label="Llamar Ahora"
                                icon="pi pi-phone"
                                outlined
                                size="medium"
                                className="w-full"
                                onClick={() => {
                                    window.location.href = 'tel:+34600000000';
                                }}
                            />
                        </div>

                        {/* Additional Info */}
                        <Divider />
                        <div className="text-sm text-gray-600 space-y-2">
                            <p>
                                <strong>Referencia:</strong> {product.id}
                            </p>
                            {product.featured && (
                                <p className="flex items-center gap-1">
                                    <i className="pi pi-star-fill text-yellow-500" />
                                    <span>Producto destacado</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products Section (placeholder) */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Productos Relacionados
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Aquí puedes agregar productos relacionados */}
                        <div className="text-center text-gray-500 py-8">
                            <i className="pi pi-box text-4xl mb-2"></i>
                            <p>Próximamente productos relacionados</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

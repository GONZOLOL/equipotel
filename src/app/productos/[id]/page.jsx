'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { getProducts } from '@/services/productService';
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
                document.removeEventListener('mousemove', handleGlobalMouseMove);
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
                const images = mainImage
                    ? [mainImage, ...additionalImages]
                    : additionalImages;
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
        setIsDragging(true);
        const touch = e.touches ? e.touches[0] : e;
        setStartX(touch.clientX);
        setCurrentX(touch.clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const touch = e.touches ? e.touches[0] : e;
        setCurrentX(touch.clientX);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        
        const diffX = startX - currentX;
        const threshold = 50; // Minimum distance to trigger swipe
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next image
                setSelectedImageIndex(prev => 
                    prev === allImages.length - 1 ? 0 : prev + 1
                );
            } else {
                // Swipe right - previous image
                setSelectedImageIndex(prev => 
                    prev === 0 ? allImages.length - 1 : prev - 1
                );
            }
        }
        
        setIsDragging(false);
        setStartX(0);
        setCurrentX(0);
    };

    const handleMouseDown = (e) => {
        if (e.button !== 0) return; // Only left mouse button
        handleTouchStart(e);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        handleTouchMove(e);
    };

    const handleMouseUp = () => {
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
                    <div className="flex items-center py-4">
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
                                <div 
                                    className="aspect-square bg-white rounded-lg shadow-md overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    style={{
                                        transform: isDragging ? `translateX(${currentX - startX}px)` : 'none',
                                        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                                    }}
                                >
                                    <Image
                                        src={allImages[selectedImageIndex]}
                                        alt={product.name}
                                        className="w-full h-full object-cover pointer-events-none"
                                        width={600}
                                        height={600}
                                    />

                                    {/* Carousel Navigation Controls */}
                                    {allImages.length > 1 && (
                                        <>
                                            {/* Previous Button */}
                                            <Button
                                                icon="pi pi-chevron-left"
                                                size="large"
                                                severity="secondary"
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-80 hover:bg-opacity-100 shadow-lg"
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
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-80 hover:bg-opacity-100 shadow-lg"
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
                                             <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                 {selectedImageIndex + 1} /{' '}
                                                 {allImages.length}
                                             </div>
                                             
                                             {/* Drag Indicator */}
                                             {isDragging && (
                                                 <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                     <i className="pi pi-arrows-h mr-1"></i>
                                                     Arrastrando...
                                                 </div>
                                             )}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-square bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
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
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {allImages.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedImageIndex(index)
                                            }
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                                                selectedImageIndex === index
                                                    ? 'border-blue-500 shadow-lg scale-105'
                                                    : 'border-gray-200 hover:border-gray-300'
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
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Thumbnail Navigation Dots */}
                                <div className="flex justify-center gap-2">
                                    {allImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedImageIndex(index)
                                            }
                                            className={`w-2 h-2 rounded-full transition-all ${
                                                selectedImageIndex === index
                                                    ? 'bg-blue-500 scale-125'
                                                    : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Navigation Hints */}
                                <div className="text-center text-xs text-gray-500 space-y-1">
                                    <div>
                                        <i className="pi pi-keyboard mr-1"></i>
                                        Flechas del teclado para navegar
                                    </div>
                                    <div>
                                        <i className="pi pi-mouse mr-1"></i>
                                        Arrastra o desliza para cambiar imagen
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
                        <div className="space-y-3 pt-4">
                            <Button
                                label="Solicitar Información"
                                icon="pi pi-envelope"
                                severity="primary"
                                size="large"
                                className="w-full"
                                onClick={() => {
                                    // Aquí puedes agregar la lógica para contactar
                                    window.location.href = `mailto:info@equipotel.com?subject=Consulta sobre ${product.name}&body=Hola, me interesa obtener más información sobre el producto: ${product.name}`;
                                }}
                            />
                            <Button
                                label="Llamar Ahora"
                                icon="pi pi-phone"
                                severity="success"
                                outlined
                                size="large"
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

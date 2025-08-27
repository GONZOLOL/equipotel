'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import {
    getProducts,
    getProductsByCategory,
    convertGoogleDriveUrl,
} from '@/services/productService';
import Image from 'next/image';

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imageErrors, setImageErrors] = useState(new Set());
    const [carouselIndex, setCarouselIndex] = useState(0);

    const categories = [
        { label: 'Todas las categorías', value: null },
        { label: 'Cajas Fuertes', value: 'cajas-fuertes' },
        { label: 'Armarios Acorazados', value: 'armarios-acorazados' },
        { label: 'Sistemas de Anclaje', value: 'sistemas-anclaje' },
        {
            label: 'Compartimentos de Seguridad',
            value: 'compartimentos-seguridad',
        },
        { label: 'Segunda Mano', value: 'segunda-mano' },
    ];

    const sortOptions = [
        { label: 'Precio: Menor a Mayor', value: 'price-asc' },
        { label: 'Precio: Mayor a Menor', value: 'price-desc' },
        { label: 'Nombre: A-Z', value: 'name-asc' },
        { label: 'Nombre: Z-A', value: 'name-desc' },
    ];

    // Marcar como montado
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                // Intentar cargar desde Firebase
                const firebaseProducts = await getProducts();
                if (firebaseProducts && firebaseProducts.length > 0) {
                    // Ordenar productos por precio ascendente
                    setProductos(firebaseProducts);
                    setFilteredProductos(firebaseProducts);
                } else {
                    // Si no hay productos, mostrar array vacío
                    setProductos([]);
                    setFilteredProductos([]);
                }
            } catch (error) {
                console.error('Error loading products:', error);
                // Fallback a array vacío
                setProductos([]);
                setFilteredProductos([]);
            } finally {
                setLoading(false);
            }
        };

        if (mounted) {
            loadProducts();
        }
    }, [mounted]);

    useEffect(() => {
        let filtered = [...productos];

        // Filtro por búsqueda
        if (searchTerm) {
            filtered = filtered.filter(
                (producto) =>
                    producto.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    producto.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        // Filtro por categoría
        if (selectedCategory) {
            filtered = filtered.filter(
                (producto) => producto.category === selectedCategory
            );
        }

        // Ordenamiento
        if (sortKey) {
            filtered.sort((a, b) => {
                let aValue, bValue;

                if (sortKey.includes('price')) {
                    aValue = a.price;
                    bValue = b.price;
                } else if (sortKey.includes('name')) {
                    aValue = a.name;
                    bValue = b.name;
                }

                if (sortKey.includes('desc')) {
                    return bValue > aValue ? 1 : -1;
                } else {
                    return aValue > bValue ? 1 : -1;
                }
            });
        }

        setFilteredProductos(filtered);
    }, [productos, searchTerm, selectedCategory, sortKey]);

    const onSort = (event) => {
        setSortKey(event.value);
    };

    const renderProductImage = (producto) => {
        const hasError = imageErrors.has(producto.id);
        const mainImage = producto.mainImage || producto.image;
        const hasImage = mainImage && mainImage.trim() !== '';

        if (!hasImage || hasError) {
            return (
                <div className="bg-gray-200 dark:bg-gray-700 w-24 h-24 sm:w-28 sm:h-28 rounded-lg flex items-center justify-center">
                    <i className="pi pi-image text-xl text-gray-400 dark:text-gray-500"></i>
                </div>
            );
        }

        // Solo mostrar la imagen principal
        const imageUrl = convertGoogleDriveUrl(mainImage);

        return (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden relative bg-white dark:bg-gray-800 mx-auto">
                <Image
                    src={imageUrl}
                    alt={producto.name}
                    fill
                    className="object-cover"
                />
            </div>
        );
    };

    const itemTemplate = (producto, layout) => {
        if (!producto) {
            return;
        }

        if (layout === 'list') {
            return (
                <div className="col-12 mb-4">
                    <Card className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32">
                                    {renderProductImage(producto)}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-column lg:flex-row justify-content-between align-items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                            {producto.name}
                                        </h3>
                                        <Tag
                                            value={producto.categoryLabel}
                                            severity="info"
                                            className="mb-3"
                                        />
                                        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                                            {producto.description}
                                        </p>
                                        {producto.features &&
                                            producto.features.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {producto.features.map(
                                                        (feature, index) => (
                                                            <Tag
                                                                key={index}
                                                                value={feature}
                                                                severity="secondary"
                                                                className="text-xs"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                    <div className="text-right lg:text-left">
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 block mb-3">
                                            {producto.priceFormatted}
                                        </span>
                                        <div className="flex gap-2">
                                            <Button
                                                label="Ver Detalles"
                                                severity="primary"
                                                size="small"
                                                onClick={() =>
                                                    (window.location.href = `/productos/${producto.id}`)
                                                }
                                            />
                                            <Button
                                                label="Contactar"
                                                severity="secondary"
                                                size="small"
                                                outlined
                                                onClick={() =>
                                                    (window.location.href = `mailto:info@equipotel.com?subject=Consulta sobre ${producto.name}`)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            );
        }

        if (layout === 'grid') {
            return (
                <div className="w-full h-full">
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-1 flex flex-col h-full">
                            {/* Imagen - altura fija */}
                            <div className="mb-3 flex-shrink-0">
                                {renderProductImage(producto)}
                            </div>

                            {/* Contenido */}
                            <div className="space-y-2 flex flex-col h-full">
                                {/* Título - altura fija */}
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2rem] text-center flex-shrink-0">
                                    {producto.name}
                                </h3>

                                {/* Categoría - altura fija */}
                                <div className="flex justify-center flex-shrink-0">
                                    <Tag
                                        value={producto.categoryLabel}
                                        severity="info"
                                        className="text-xs"
                                    />
                                </div>

                                {/* Descripción - altura fija */}
                                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[1.5rem] text-center flex-shrink-0">
                                    {producto.description}
                                </p>

                                {/* Características - altura fija */}
                                <div className="flex-shrink-0 min-h-[2rem]">
                                    {producto.features &&
                                    producto.features.length > 0 ? (
                                        <div className="flex flex-wrap gap-1 justify-center">
                                            {producto.features
                                                .slice(0, 1)
                                                .map((feature, index) => (
                                                    <Tag
                                                        key={index}
                                                        value={feature}
                                                        severity="secondary"
                                                        className="text-xs"
                                                    />
                                                ))}
                                        </div>
                                    ) : (
                                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center min-h-[2rem] flex items-center justify-center">
                                            Producto de calidad
                                        </div>
                                    )}
                                </div>

                                {/* Precio - altura fija */}
                                <div className="text-center flex-shrink-0">
                                    <p className="text-base font-bold text-blue-600 dark:text-blue-400">
                                        {producto.priceFormatted}
                                    </p>
                                </div>

                                {/* Botones - siempre al final */}
                                <div className="flex gap-1 justify-center pt-2 mt-auto">
                                    <Button
                                        label="Ver"
                                        severity="primary"
                                        size="small"
                                        className="flex-1 text-xs"
                                        onClick={() =>
                                            (window.location.href = `/productos/${producto.id}`)
                                        }
                                    />
                                    <Button
                                        label="Contactar"
                                        severity="secondary"
                                        size="small"
                                        outlined
                                        className="flex-1 text-xs"
                                        onClick={() =>
                                            (window.location.href = `mailto:info@equipotel.com?subject=Consulta sobre ${producto.name}`)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            );
        }
    };

    const header = () => {
        return (
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 productos-header">
                <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                    <div className="relative flex-1">
                        <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10" />
                        <InputText
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar productos..."
                            className="w-full search-input"
                        />
                    </div>
                    <Dropdown
                        value={selectedCategory}
                        options={categories}
                        onChange={(e) => setSelectedCategory(e.value)}
                        placeholder="Categoría"
                        className="w-full md:w-48"
                    />
                    <Dropdown
                        value={sortKey}
                        options={sortOptions}
                        onChange={onSort}
                        placeholder="Ordenar por"
                        className="w-full md:w-48"
                    />
                </div>
                {/* Botones de vista solo visibles en tablets y desktop */}
                <div className="hidden sm:flex gap-2 w-full md:w-auto justify-center md:justify-end">
                    <Button
                        icon="pi pi-th-large"
                        onClick={() => setLayout('grid')}
                        severity={layout === 'grid' ? 'primary' : 'secondary'}
                        outlined={layout !== 'grid'}
                        className="px-2"
                    />
                    <Button
                        icon="pi pi-bars"
                        onClick={() => setLayout('list')}
                        severity={layout === 'list' ? 'primary' : 'secondary'}
                        outlined={layout !== 'list'}
                    />
                </div>
            </div>
        );
    };

    if (!mounted) {
        return (
            <div className="w-full max-w-none py-8 pt-20 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <i className="pi pi-spin pi-spinner text-4xl text-blue-600 dark:text-blue-400 mb-4"></i>
                        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            Cargando...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-none py-8 pt-20 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
                    Nuestros Productos
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Descubre nuestra amplia gama de productos de seguridad para
                    hogar y empresa
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <i className="pi pi-spin pi-spinner text-4xl text-blue-600 dark:text-blue-400 mb-4"></i>
                        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            Cargando productos...
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {header()}
                    {filteredProductos.length > 0 ? (
                        <>
                            {layout === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {filteredProductos.map(
                                        (producto, index) => (
                                            <div
                                                key={producto.id || index}
                                                className="w-full"
                                            >
                                                {itemTemplate(producto, 'grid')}
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredProductos.map(
                                        (producto, index) => (
                                            <div key={producto.id || index}>
                                                {itemTemplate(producto, 'list')}
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <i className="pi pi-box text-6xl text-gray-400 dark:text-gray-500 mb-4"></i>
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4 transition-colors duration-300">
                                No se encontraron productos
                            </p>
                            <p className="text-gray-500 dark:text-gray-500 text-sm transition-colors duration-300">
                                Intenta cambiar los filtros de búsqueda o
                                categoría
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

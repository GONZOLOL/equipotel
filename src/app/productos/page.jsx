'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imageErrors, setImageErrors] = useState(new Set());

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

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                // Intentar cargar desde Firebase
                const firebaseProducts = await getProducts();
                if (firebaseProducts && firebaseProducts.length > 0) {
                    console.log(
                        'Productos cargados desde Firebase:',
                        firebaseProducts
                    );
                    setProductos(firebaseProducts);
                    setFilteredProductos(firebaseProducts);
                } else {
                    console.log(
                        'No hay productos en Firebase, usando datos de ejemplo'
                    );
                    // Usar datos de ejemplo si Firebase no tiene datos
                    setProductos(productosEjemplo);
                    setFilteredProductos(productosEjemplo);
                }
            } catch (error) {
                console.error('Error loading products:', error);
                // Fallback a datos de ejemplo
                setProductos(productosEjemplo);
                setFilteredProductos(productosEjemplo);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

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

        console.log(`Renderizando imagen para ${producto.name}:`, {
            hasImage,
            hasError,
            originalImage: mainImage,
            imageUrl: hasImage ? convertGoogleDriveUrl(mainImage) : null,
        });

        if (!hasImage || hasError) {
            return (
                <div className="bg-gray-200 h-48 mb-4 rounded-lg flex items-center justify-center">
                    <i className="pi pi-image text-4xl text-gray-400"></i>
                </div>
            );
        }

        // Convertir URL de Google Drive si es necesario
        const imageUrl = convertGoogleDriveUrl(mainImage);

        return (
            <div className="h-48 mb-4 rounded-lg overflow-hidden relative">
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
                    <Card>
                        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                            <div className="flex-shrink-0">
                                {renderProductImage(producto)}
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-column sm:flex-row justify-content-between align-items-start xl:align-items-start gap-2 mb-3">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {producto.name}
                                        </h3>
                                        <Tag
                                            value={producto.categoryLabel}
                                            severity="info"
                                            className="mb-2"
                                        />
                                        <p className="text-gray-600 mb-3">
                                            {producto.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-blue-600">
                                            {producto.priceFormatted}
                                        </span>
                                        <div className="flex gap-1 mt-2">
                                            {producto.features &&
                                                producto.features.map(
                                                    (feature, index) => (
                                                        <Tag
                                                            key={index}
                                                            value={feature}
                                                            severity="secondary"
                                                        />
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </div>
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
                    </Card>
                </div>
            );
        }

        if (layout === 'grid') {
            return (
                <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
                    <Card className="h-full">
                        <div className="text-center">
                            {renderProductImage(producto)}
                            <h3 className="text-lg font-semibold mb-2">
                                {producto.name}
                            </h3>
                            <Tag
                                value={producto.categoryLabel}
                                severity="info"
                                className="mb-2"
                            />
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {producto.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-3 justify-center">
                                {producto.features &&
                                    producto.features
                                        .slice(0, 2)
                                        .map((feature, index) => (
                                            <Tag
                                                key={index}
                                                value={feature}
                                                severity="secondary"
                                            />
                                        ))}
                            </div>
                            <p className="text-xl font-bold text-blue-600 mb-3">
                                {producto.priceFormatted}
                            </p>
                            <div className="flex gap-2 justify-center">
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
                    </Card>
                </div>
            );
        }
    };

    const header = () => {
        return (
            <div className="flex flex-column sm:flex-row justify-content-between align-items-center gap-4 mb-6">
                <div className="flex flex-column sm:flex-row gap-4 flex-1">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar productos..."
                            className="w-full sm:w-80"
                        />
                    </span>
                    <Dropdown
                        value={selectedCategory}
                        options={categories}
                        onChange={(e) => setSelectedCategory(e.value)}
                        placeholder="Categoría"
                        className="w-full sm:w-48"
                    />
                    <Dropdown
                        value={sortKey}
                        options={sortOptions}
                        onChange={onSort}
                        placeholder="Ordenar por"
                        className="w-full sm:w-48"
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        icon="pi pi-th-large"
                        onClick={() => setLayout('grid')}
                        severity={layout === 'grid' ? 'primary' : 'secondary'}
                        outlined={layout !== 'grid'}
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

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8 pt-32">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Nuestros Productos
                    </h1>
                    <p className="text-lg text-gray-600">
                        Descubre nuestra amplia gama de productos de seguridad
                        para hogar y empresa
                    </p>
                </div>

                <DataView
                    value={filteredProductos}
                    layout={layout}
                    header={header()}
                    itemTemplate={itemTemplate}
                    paginator
                    rows={12}
                    loading={loading}
                    emptyMessage="No se encontraron productos"
                />
            </div>

            <Footer />
        </div>
    );
}

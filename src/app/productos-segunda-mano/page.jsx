'use client';

import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { getProducts, convertGoogleDriveUrl } from '@/services/productService';
import ProductImageSkeleton from '@/components/ProductImageSkeleton';

const categories = [
    { label: 'Todas las categorías', value: null },
    { label: 'Cajas Fuertes', value: 'cajas-fuertes' },
    { label: 'Sistemas de Anclaje', value: 'sistemas-anclaje' },
    { label: 'Sistemas de Seguridad', value: 'sistemas-seguridad' },
    { label: 'Otros', value: 'otros' },
];

const sortOptions = [
    { label: 'Precio: Menor a Mayor', value: 'price-asc' },
    { label: 'Precio: Mayor a Menor', value: 'price-desc' },
    { label: 'Nombre: A-Z', value: 'name-asc' },
    { label: 'Nombre: Z-A', value: 'name-desc' },
    { label: 'Estado: Mejor primero', value: 'condition-asc' },
];

const conditionLabels = {
    excelente: 'Excelente',
    bueno: 'Bueno',
    regular: 'Regular',
};

const conditionSeverity = {
    excelente: 'success',
    bueno: 'warning',
    regular: 'danger',
};

export default function ProductosSegundaMano() {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const firebaseProducts = await getProducts();

                if (firebaseProducts && firebaseProducts.length > 0) {
                    const segundaManoProductos = firebaseProducts
                        .filter(
                            (producto) => producto.category === 'segunda-mano'
                        )
                        .map((producto) => ({
                            ...producto,
                            priceFormatted: producto.price
                                ? `${producto.price.toLocaleString('es-ES', {
                                      minimumFractionDigits: 2,
                                  })} €`
                                : 'Sin precio',
                        }));

                    setProductos(segundaManoProductos);
                    setFilteredProductos(segundaManoProductos);
                } else {
                    setProductos([]);
                    setFilteredProductos([]);
                }
            } catch (error) {
                console.error('Error loading products:', error);
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

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (producto) =>
                    producto.name.toLowerCase().includes(term) ||
                    producto.description?.toLowerCase().includes(term) ||
                    producto.features?.some((feature) =>
                        feature.toLowerCase().includes(term)
                    )
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(
                (producto) => producto.category === selectedCategory
            );
        }

        if (sortKey) {
            filtered.sort((a, b) => {
                const [field, direction] = sortKey.split('-');
                let aValue = 0;
                let bValue = 0;

                switch (field) {
                    case 'price':
                        aValue = a.price ?? 0;
                        bValue = b.price ?? 0;
                        break;
                    case 'name':
                        aValue = a.name ?? '';
                        bValue = b.name ?? '';
                        break;
                    case 'condition': {
                        const order = { excelente: 1, bueno: 2, regular: 3 };
                        aValue = order[a.condition] ?? 4;
                        bValue = order[b.condition] ?? 4;
                        break;
                    }
                }

                if (direction === 'desc') {
                    return bValue > aValue ? 1 : -1;
                }
                return aValue > bValue ? 1 : -1;
            });
        }

        setFilteredProductos(filtered);
    }, [productos, searchTerm, selectedCategory, sortKey]);

    const onSort = (event) => setSortKey(event.value);

    const renderProductImage = (producto) => {
        const productoWithConverter = {
            ...producto,
            convertGoogleDriveUrl,
        };

        return (
            <ProductImageSkeleton
                producto={productoWithConverter}
                className="relative mx-auto h-24 w-24 overflow-hidden rounded-lg bg-white dark:bg-gray-800 sm:h-28 sm:w-28"
            />
        );
    };

    const renderControls = () => (
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex w-full flex-wrap items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <InputText
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar..."
                            className="p-inputtext-sm w-full pl-9"
                        />
                        <i className="pi pi-search pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    </div>
                    <Dropdown
                        value={selectedCategory}
                        options={categories}
                        onChange={(e) => setSelectedCategory(e.value)}
                        placeholder="Categoría"
                        showClear
                        className="w-full md:w-48 text-sm"
                        panelClassName="text-sm"
                    />
                    <Dropdown
                        value={sortKey}
                        options={sortOptions}
                        onChange={onSort}
                        placeholder="Ordenar por"
                        className="w-full md:w-48 text-sm"
                        panelClassName="text-sm"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        icon="pi pi-th-large"
                        onClick={() => setLayout('grid')}
                        severity={layout === 'grid' ? 'danger' : 'secondary'}
                        outlined={layout !== 'grid'}
                        className="px-2 py-2 text-sm"
                    />
                    <Button
                        icon="pi pi-bars"
                        onClick={() => setLayout('list')}
                        severity={layout === 'list' ? 'danger' : 'secondary'}
                        outlined={layout !== 'list'}
                        className="px-2 py-2 text-sm"
                    />
                </div>
            </div>
        </div>
    );

    const itemTemplate = (producto, currentLayout) => {
        if (!producto) return null;

        const conditionTag =
            producto.condition && conditionLabels[producto.condition] ? (
                <Tag
                    value={conditionLabels[producto.condition]}
                    severity={conditionSeverity[producto.condition]}
                    className="text-xs"
                />
            ) : null;

        if (currentLayout === 'list') {
            return (
                <div className="col-12 mb-4">
                    <Card className="transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex flex-col gap-6 p-4 xl:flex-row xl:items-start">
                            <div className="flex-shrink-0">
                                <div className="h-32 w-32">
                                    {renderProductImage(producto)}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                            {producto.name}
                                        </h3>
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            <Tag
                                                value={
                                                    producto.categoryLabel ||
                                                    producto.category
                                                }
                                                severity="help"
                                            />
                                            {conditionTag}
                                        </div>
                                        <p className="mb-3 text-lg font-bold text-red-600 dark:text-red-400">
                                            {producto.priceFormatted ||
                                                producto.price}
                                        </p>
                                        <p className="mb-3 text-gray-600 line-clamp-3 dark:text-gray-400">
                                            {producto.description}
                                        </p>
                                        {producto.features?.length > 0 && (
                                            <div className="mb-3 flex flex-wrap gap-1">
                                                {producto.features.map(
                                                    (feature, index) => (
                                                        <Tag
                                                            key={index}
                                                            value={feature}
                                                            severity="help"
                                                            className="text-xs"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-start gap-2 xl:flex-col">
                                        <Button
                                            label="Ver detalles"
                                            severity="danger"
                                            size="small"
                                            onClick={() =>
                                                (window.location.href = `/productos-segunda-mano/${producto.id}`)
                                            }
                                        />
                                        <Button
                                            label="Contactar"
                                            severity="danger"
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
                    </Card>
                </div>
            );
        }

        return (
            <div className="w-full">
                <Card className="flex h-full flex-col transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex h-full flex-col p-1">
                        <div className="mb-3 flex justify-center">
                            {renderProductImage(producto)}
                        </div>
                        <div className="flex h-full flex-col space-y-2">
                            <h3 className="flex-shrink-0 text-center text-sm font-semibold text-gray-900 line-clamp-2 dark:text-white">
                                {producto.name}
                            </h3>
                            <div className="flex flex-shrink-0 justify-center gap-1">
                                <Tag
                                    value={
                                        producto.categoryLabel ||
                                        producto.category
                                    }
                                    severity="help"
                                    className="text-xs"
                                />
                                {conditionTag}
                            </div>
                            <p className="flex-shrink-0 text-center text-lg font-bold text-red-600 dark:text-red-400">
                                {producto.priceFormatted || producto.price}
                            </p>
                            <p className="flex-shrink-0 min-h-[1.5rem] text-center text-xs text-gray-600 line-clamp-2 dark:text-gray-400">
                                {producto.description}
                            </p>
                            <div className="flex-shrink-0 min-h-[2rem]">
                                {producto.features?.length > 0 ? (
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {producto.features
                                            .slice(0, 1)
                                            .map((feature, index) => (
                                                <Tag
                                                    key={index}
                                                    value={feature}
                                                    severity="help"
                                                    className="text-xs"
                                                />
                                            ))}
                                    </div>
                                ) : (
                                    <div className="flex min-h-[2rem] items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                                        Producto de segunda mano
                                    </div>
                                )}
                            </div>
                            <div className="mt-auto flex justify-center gap-1 pt-2">
                                <Button
                                    label="Ver"
                                    severity="danger"
                                    size="small"
                                    className="flex-1 text-xs"
                                    onClick={() =>
                                        (window.location.href = `/productos-segunda-mano/${producto.id}`)
                                    }
                                />
                                <Button
                                    label="Contactar"
                                    severity="danger"
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
    };

    if (!mounted) {
        return (
            <div className="w-full px-4 py-8 pt-20 sm:px-6 lg:px-8">
                <div className="flex h-64 items-center justify-center">
                    <div className="text-center">
                        <i className="pi pi-spin pi-spinner mb-4 text-4xl text-red-600 dark:text-red-400"></i>
                        <p className="text-gray-600 transition-colors dark:text-gray-400">
                            Cargando...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white px-4 py-8 pt-24 text-gray-900 transition-colors dark:bg-gray-900 sm:px-6 lg:px-8">
            <div className="mx-auto mb-6 max-w-7xl">{renderControls()}</div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="text-center">
                        <i className="pi pi-spin pi-spinner mb-4 text-4xl text-danger dark:text-danger"></i>
                        <p className="text-gray-600 transition-colors dark:text-gray-400">
                            Cargando productos...
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {filteredProductos.length > 0 ? (
                        <>
                            {layout === 'grid' ? (
                                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                                <div className="mx-auto max-w-7xl space-y-4">
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
                        <div className="py-12 text-center">
                            <i className="pi pi-box mb-4 text-6xl text-gray-400 dark:text-gray-500"></i>
                            <p className="mb-4 text-lg text-gray-600 transition-colors dark:text-gray-400">
                                No se encontraron productos
                            </p>
                            <p className="text-sm text-gray-500 transition-colors dark:text-gray-500">
                                Intenta cambiar los filtros de búsqueda o
                                categoría
                            </p>
                        </div>
                    )}
                </>
            )}

            <div className="py-16"></div>
        </div>
    );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { FileUpload } from 'primereact/fileupload';
import { Message } from 'primereact/message';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
} from '@/services/productService';
import Image from 'next/image';

export default function AdminProducts() {
    const { user } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [message, setMessage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileUploadRef = useRef();

    const categories = [
        { label: 'Cajas Fuertes', value: 'cajas-fuertes' },
        { label: 'Armarios Acorazados', value: 'armarios-acorazados' },
        { label: 'Sistemas de Anclaje', value: 'sistemas-anclaje' },
        {
            label: 'Compartimentos de Seguridad',
            value: 'compartimentos-seguridad',
        },
        { label: 'Segunda Mano', value: 'segunda-mano' },
    ];

    const stockOptions = [
        { label: 'Disponible', value: 'Disponible' },
        { label: 'Agotado', value: 'Agotado' },
        { label: 'Próximamente', value: 'Próximamente' },
    ];

    const featureOptions = [
        { label: 'Atérmico', value: 'Atérmico' },
        { label: 'Certificado', value: 'Certificado' },
        { label: 'Electrónico', value: 'Electrónico' },
        { label: 'Acorazado', value: 'Acorazado' },
        { label: 'Múltiple bloqueo', value: 'Múltiple bloqueo' },
        { label: 'Empresa', value: 'Empresa' },
        { label: 'Grado III', value: 'Grado III' },
        { label: 'Alta seguridad', value: 'Alta seguridad' },
        { label: 'Profesional', value: 'Profesional' },
        { label: 'Fácil instalación', value: 'Fácil instalación' },
        { label: 'Seguro', value: 'Seguro' },
        { label: 'Discreto', value: 'Discreto' },
        { label: 'Oculto', value: 'Oculto' },
        { label: 'Segunda mano', value: 'Segunda mano' },
        { label: 'Reacondicionada', value: 'Reacondicionada' },
        { label: 'Garantía', value: 'Garantía' },
    ];

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const productsData = await getProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error loading products:', error);
            showMessage('error', 'Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    // Filtrar productos por categoría y búsqueda global
    const filteredProducts = products.filter((product) => {
        const matchesGlobalFilter =
            !globalFilter ||
            product.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(globalFilter.toLowerCase()) ||
            product.categoryLabel
                .toLowerCase()
                .includes(globalFilter.toLowerCase());

        const matchesCategoryFilter =
            !categoryFilter || product.category === categoryFilter;

        return matchesGlobalFilter && matchesCategoryFilter;
    });

    const showMessage = (severity, text) => {
        setMessage({ severity, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const openNewProductDialog = () => {
        setEditingProduct({
            name: '',
            category: '',
            categoryLabel: '',
            price: 0,
            priceFormatted: '',
            description: '',
            mainImage: '',
            additionalImages: [],
            features: [],
            stock: 'Disponible',
            featured: false,
        });
        setDialogVisible(true);
    };

    const openEditProductDialog = (product) => {
        setEditingProduct({ ...product });
        setDialogVisible(true);
    };

    const openDeleteDialog = (product) => {
        setSelectedProduct(product);
        setDeleteDialogVisible(true);
    };

    const handleImageUpload = async (event) => {
        const file = event.files[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            showMessage('info', 'Subiendo imagen...');

            // Generar ID temporal para el producto
            const tempProductId = editingProduct.id || `temp_${Date.now()}`;

            const imageUrl = await uploadProductImage(file, tempProductId);
            console.log('URL de imagen obtenida:', imageUrl);

            setEditingProduct((prev) => {
                const updated = {
                    ...prev,
                    image: imageUrl,
                };
                console.log('Estado actualizado con imagen:', updated);
                return updated;
            });

            showMessage('success', 'Imagen subida correctamente');

            // Limpiar el FileUpload
            if (fileUploadRef.current) {
                fileUploadRef.current.clear();
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            showMessage('error', 'Error al subir la imagen');
        } finally {
            setUploadingImage(false);
        }
    };

    const saveProduct = async () => {
        try {
            if (
                !editingProduct.name ||
                !editingProduct.category ||
                !editingProduct.price
            ) {
                showMessage(
                    'error',
                    'Por favor, completa todos los campos obligatorios'
                );
                return;
            }

            const productData = {
                ...editingProduct,
                categoryLabel:
                    categories.find(
                        (cat) => cat.value === editingProduct.category
                    )?.label || '',
                priceFormatted: `${editingProduct.price}€`,
                // Mantener compatibilidad con el campo image existente
                image: editingProduct.mainImage || editingProduct.image || '',
            };

            console.log('Guardando producto con datos:', productData);
            console.log(
                'URL de imagen principal en productData:',
                productData.mainImage
            );
            console.log(
                'URLs de imágenes adicionales:',
                productData.additionalImages
            );

            if (editingProduct.id) {
                await updateProduct(editingProduct.id, productData);
                showMessage('success', 'Producto actualizado correctamente');
            } else {
                await addProduct(productData);
                showMessage('success', 'Producto creado correctamente');
            }

            setDialogVisible(false);
            loadProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            showMessage('error', 'Error al guardar el producto');
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteProduct(selectedProduct.id);
            showMessage('success', 'Producto eliminado correctamente');
            setDeleteDialogVisible(false);
            loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            showMessage('error', 'Error al eliminar el producto');
        }
    };

    const imageBodyTemplate = (rowData) => {
        const imageUrl = rowData.mainImage || rowData.image;
        return imageUrl ? (
            <Image
                src={imageUrl}
                alt={rowData.name}
                className="w-12 h-12 object-cover rounded border"
                width={48}
                height={48}
            />
        ) : (
            <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center">
                <i className="pi pi-image text-gray-400"></i>
            </div>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return <Tag value={rowData.categoryLabel} severity="info" />;
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <span className="font-semibold text-blue-600">
                {rowData.priceFormatted}
            </span>
        );
    };

    const stockBodyTemplate = (rowData) => {
        const severity =
            rowData.stock === 'Disponible'
                ? 'success'
                : rowData.stock === 'Agotado'
                ? 'danger'
                : 'warning';
        return <Tag value={rowData.stock} severity={severity} />;
    };

    const featuredBodyTemplate = (rowData) => {
        return (
            <Tag
                value={rowData.featured ? 'Destacado' : 'Normal'}
                severity={rowData.featured ? 'success' : 'secondary'}
            />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-eye"
                    size="small"
                    severity="info"
                    outlined
                    onClick={() => router.push(`/productos/${rowData.id}`)}
                    title="Ver detalle"
                />
                <Button
                    icon="pi pi-pencil"
                    size="small"
                    severity="secondary"
                    outlined
                    onClick={() => openEditProductDialog(rowData)}
                    title="Editar"
                />
                <Button
                    icon="pi pi-trash"
                    size="small"
                    severity="danger"
                    outlined
                    onClick={() => openDeleteDialog(rowData)}
                    title="Eliminar"
                />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column sm:flex-row justify-between align-items-center gap-4">
            <div className="flex gap-2 justify-between w-full">
                <div className="flex gap-2 items-center">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Buscar productos..."
                            className="w-full sm:w-80"
                        />
                    </span>

                    <Dropdown
                        value={categoryFilter}
                        options={[
                            { label: 'Todas las categorías', value: '' },
                            ...categories,
                        ]}
                        onChange={(e) => setCategoryFilter(e.value)}
                        placeholder="Filtrar por categoría"
                        className="w-full sm:w-62"
                        showClear
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        label="Crear Producto de Prueba"
                        icon="pi pi-star"
                        severity="success"
                        outlined
                        onClick={async () => {
                            try {
                                const testProduct = {
                                    name: 'Caja Fuerte de Prueba',
                                    category: 'cajas-fuertes',
                                    categoryLabel: 'Cajas Fuertes',
                                    price: 299,
                                    priceFormatted: '299€',
                                    description:
                                        'Producto de prueba para verificar que las imágenes de Google Drive funcionan correctamente.',
                                    mainImage:
                                        'https://drive.google.com/uc?export=view&id=1A7Vd0Zvcfk0TEfMf4bzyrpiRkcOHlsDI',
                                    image: 'https://drive.google.com/uc?export=view&id=1A7Vd0Zvcfk0TEfMf4bzyrpiRkcOHlsDI',
                                    additionalImages: [
                                        'https://drive.google.com/uc?export=view&id=1A7Vd0Zvcfk0TEfMf4bzyrpiRkcOHlsDI',
                                        'https://drive.google.com/uc?export=view&id=1A7Vd0Zvcfk0TEfMf4bzyrpiRkcOHlsDI',
                                    ],
                                    features: [
                                        'Atérmico',
                                        'Certificado',
                                        'Electrónico',
                                    ],
                                    stock: 'Disponible',
                                    featured: false,
                                };
                                await addProduct(testProduct);
                                showMessage(
                                    'success',
                                    'Producto de prueba creado correctamente'
                                );
                                loadProducts();
                            } catch (error) {
                                console.error(
                                    'Error creating test product:',
                                    error
                                );
                                showMessage(
                                    'error',
                                    'Error al crear producto de prueba'
                                );
                            }
                        }}
                    />
                    <Button
                        label="Nuevo Producto"
                        icon="pi pi-plus"
                        severity="primary"
                        onClick={openNewProductDialog}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <Button
                                    icon="pi pi-arrow-left"
                                    severity="secondary"
                                    outlined
                                    onClick={() =>
                                        router.push('/admin/dashboard')
                                    }
                                />
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-800">
                                        Gestión de Productos
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Administra el catálogo de productos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {message && (
                        <Message
                            severity={message.severity}
                            text={message.text}
                            className="mb-4"
                        />
                    )}

                    <Card>
                        <DataTable
                            value={filteredProducts}
                            header={header}
                            loading={loading}
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            className="p-datatable-sm"
                            emptyMessage="No se encontraron productos"
                            filterDisplay="menu"
                        >
                            <Column
                                field="name"
                                header="Imagen"
                                body={imageBodyTemplate}
                                style={{ width: '80px' }}
                            />
                            <Column
                                field="name"
                                header="Nombre"
                                sortable
                                filter
                            />
                            <Column
                                field="categoryLabel"
                                header="Categoría"
                                body={categoryBodyTemplate}
                                sortable
                                filter
                            />
                            <Column
                                field="priceFormatted"
                                header="Precio"
                                body={priceBodyTemplate}
                                sortable
                            />
                            <Column
                                field="stock"
                                header="Stock"
                                body={stockBodyTemplate}
                                sortable
                                filter
                            />
                            <Column
                                field="featured"
                                header="Destacado"
                                body={featuredBodyTemplate}
                                sortable
                            />
                            <Column
                                header="Acciones"
                                body={actionBodyTemplate}
                                style={{ width: '120px' }}
                            />
                        </DataTable>
                    </Card>
                </div>

                {/* Product Dialog */}
                <Dialog
                    visible={dialogVisible}
                    onHide={() => setDialogVisible(false)}
                    header={
                        editingProduct?.id
                            ? 'Editar Producto'
                            : 'Nuevo Producto'
                    }
                    modal
                    className="p-fluid"
                    style={{ width: '60rem' }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label
                                htmlFor="name"
                                className="font-medium mb-2 block"
                            >
                                Nombre *
                            </label>
                            <InputText
                                id="name"
                                value={editingProduct?.name || ''}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Nombre del producto"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="category"
                                className="font-medium mb-2 block"
                            >
                                Categoría *
                            </label>
                            <Dropdown
                                id="category"
                                value={editingProduct?.category || ''}
                                options={categories}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        category: e.value,
                                    })
                                }
                                placeholder="Selecciona una categoría"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="price"
                                className="font-medium mb-2 block"
                            >
                                Precio (€) *
                            </label>
                            <InputNumber
                                id="price"
                                value={editingProduct?.price || 0}
                                onValueChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        price: e.value,
                                    })
                                }
                                mode="currency"
                                currency="EUR"
                                locale="es-ES"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="stock"
                                className="font-medium mb-2 block"
                            >
                                Stock
                            </label>
                            <Dropdown
                                id="stock"
                                value={editingProduct?.stock || 'Disponible'}
                                options={stockOptions}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        stock: e.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="featured"
                                className="font-medium mb-2 block"
                            >
                                Destacado
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={editingProduct?.featured || false}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            featured: e.target.checked,
                                        })
                                    }
                                    className="mr-2"
                                />
                                <label htmlFor="featured" className="text-sm">
                                    Marcar como destacado
                                </label>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="description"
                                className="font-medium mb-2 block"
                            >
                                Descripción
                            </label>
                            <InputTextarea
                                id="description"
                                value={editingProduct?.description || ''}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        description: e.target.value,
                                    })
                                }
                                rows={3}
                                placeholder="Descripción del producto"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="features"
                                className="font-medium mb-2 block"
                            >
                                Características
                            </label>
                            <MultiSelect
                                id="features"
                                value={editingProduct?.features || []}
                                options={featureOptions}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        features: e.value,
                                    })
                                }
                                placeholder="Selecciona características"
                                display="chip"
                            />
                        </div>

                        {/* Main Image Section */}
                        <div className="md:col-span-2">
                            <label className="font-medium mb-2 block">
                                Imagen Principal del Producto *
                            </label>

                            {/* Current Main Image Preview */}
                            {(editingProduct?.mainImage ||
                                editingProduct?.image) && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Imagen principal actual:
                                    </p>
                                    <Image
                                        src={
                                            editingProduct.mainImage ||
                                            editingProduct.image
                                        }
                                        alt="Producto"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                        width={128}
                                        height={128}
                                    />
                                </div>
                            )}

                            {/* Google Drive URL Input for Main Image */}
                            <div className="mt-4">
                                <label
                                    htmlFor="mainImage"
                                    className="font-medium mb-2 block"
                                >
                                    Enlace de Google Drive (Imagen Principal):
                                </label>
                                <div className="flex gap-2">
                                    <InputText
                                        id="mainImage"
                                        value={
                                            editingProduct?.mainImage ||
                                            editingProduct?.image ||
                                            ''
                                        }
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                mainImage: e.target.value,
                                            })
                                        }
                                        placeholder="https://drive.google.com/file/d/1ABC123.../view?usp=sharing"
                                        className="flex-1"
                                    />
                                    <Button
                                        icon="pi pi-question-circle"
                                        severity="info"
                                        outlined
                                        onClick={() => {
                                            alert(`📋 INSTRUCCIONES PARA GOOGLE DRIVE:

 1️⃣ Sube tu imagen a Google Drive
 2️⃣ Haz clic derecho en la imagen
 3️⃣ Selecciona "Obtener enlace"
 4️⃣ Cambia a "Cualquier persona con el enlace"
 5️⃣ Copia el enlace completo
 6️⃣ Pégalo en el campo de arriba

 💡 El sistema convertirá automáticamente el enlace para que se vea correctamente.`);
                                        }}
                                        title="Ver instrucciones"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Images Section */}
                        <div className="md:col-span-2">
                            <label className="font-medium mb-2 block">
                                Imágenes Adicionales (para el detalle del
                                producto)
                            </label>

                            {/* Current Additional Images Preview */}
                            {editingProduct?.additionalImages &&
                                editingProduct.additionalImages.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-2">
                                            Imágenes adicionales actuales:
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            {editingProduct.additionalImages.map(
                                                (img, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative"
                                                    >
                                                        <Image
                                                            src={img}
                                                            alt={`Producto ${
                                                                index + 1
                                                            }`}
                                                            className="w-24 h-24 object-cover rounded-lg border"
                                                            width={96}
                                                            height={96}
                                                        />
                                                        <Button
                                                            icon="pi pi-times"
                                                            size="small"
                                                            severity="danger"
                                                            className="absolute -top-2 -right-2 w-6 h-6"
                                                            onClick={() => {
                                                                const newImages =
                                                                    editingProduct.additionalImages.filter(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            index
                                                                    );
                                                                setEditingProduct(
                                                                    {
                                                                        ...editingProduct,
                                                                        additionalImages:
                                                                            newImages,
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Add New Additional Image */}
                            <div className="mt-4">
                                <label className="font-medium mb-2 block">
                                    Agregar nueva imagen adicional:
                                </label>
                                <div className="flex gap-2">
                                    <InputText
                                        value=""
                                        onChange={(e) => {
                                            if (e.target.value.trim()) {
                                                const newImages = [
                                                    ...(editingProduct?.additionalImages ||
                                                        []),
                                                    e.target.value.trim(),
                                                ];
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    additionalImages: newImages,
                                                });
                                                e.target.value = '';
                                            }
                                        }}
                                        placeholder="https://drive.google.com/file/d/1ABC123.../view?usp=sharing"
                                        className="flex-1"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                if (e.target.value.trim()) {
                                                    const newImages = [
                                                        ...(editingProduct?.additionalImages ||
                                                            []),
                                                        e.target.value.trim(),
                                                    ];
                                                    setEditingProduct({
                                                        ...editingProduct,
                                                        additionalImages:
                                                            newImages,
                                                    });
                                                    e.target.value = '';
                                                }
                                            }
                                        }}
                                    />
                                    <Button
                                        icon="pi pi-plus"
                                        severity="success"
                                        onClick={(e) => {
                                            const input =
                                                e.target.previousSibling;
                                            if (input.value.trim()) {
                                                const newImages = [
                                                    ...(editingProduct?.additionalImages ||
                                                        []),
                                                    input.value.trim(),
                                                ];
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    additionalImages: newImages,
                                                });
                                                input.value = '';
                                            }
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    💡 Presiona Enter o haz clic en + para
                                    agregar la imagen
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <Button
                            label="Cancelar"
                            severity="secondary"
                            outlined
                            onClick={() => setDialogVisible(false)}
                        />
                        <Button
                            label="Guardar"
                            severity="primary"
                            onClick={saveProduct}
                        />
                    </div>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    visible={deleteDialogVisible}
                    onHide={() => setDeleteDialogVisible(false)}
                    header="Confirmar Eliminación"
                    modal
                    className="p-fluid"
                    style={{ width: '30rem' }}
                >
                    <div className="flex align-items-center justify-content-center">
                        <i
                            className="pi pi-exclamation-triangle mr-3"
                            style={{ fontSize: '2rem' }}
                        />
                        <span>
                            ¿Estás seguro de que quieres eliminar este producto?
                        </span>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <Button
                            label="Cancelar"
                            severity="secondary"
                            outlined
                            onClick={() => setDeleteDialogVisible(false)}
                        />
                        <Button
                            label="Eliminar"
                            severity="danger"
                            onClick={confirmDelete}
                        />
                    </div>
                </Dialog>
            </div>
        </ProtectedRoute>
    );
}

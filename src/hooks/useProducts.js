'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/contexts/ToastContext';
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteProductImage,
} from '@/services/productService';

export const useProducts = () => {
    const { showToast } = useToast();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const categories = [
        { label: 'Cajas Fuertes', value: 'cajas-fuertes' },
        { label: 'Cámaras de Seguridad', value: 'camaras-seguridad' },
        { label: 'Sistemas de Anclaje', value: 'sistemas-anclaje' },
        { label: 'Equipos Contra Incendios', value: 'equipos-incendios' },
        { label: 'Armarios', value: 'armarios' },
        { label: 'Submostradores', value: 'submostradores' },
        {
            label: 'Segunda Mano',
            value: 'segunda-mano',
        },
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
        { label: 'Seguridad', value: 'Seguridad' },
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

    // Función para validar y agregar imagen adicional
    const addAdditionalImage = (imageUrl) => {
        if (!imageUrl.trim()) return;

        // Validar que sea una URL válida
        try {
            new URL(imageUrl);
        } catch {
            showToast('error', 'URL inválida. Por favor, verifica el enlace.');
            return;
        }

        // Verificar que no esté duplicada
        const existingImages = editingProduct?.additionalImages || [];
        if (existingImages.includes(imageUrl.trim())) {
            showToast('warn', 'Esta imagen ya está agregada.');
            return;
        }

        const newImages = [...existingImages, imageUrl.trim()];
        setEditingProduct({
            ...editingProduct,
            additionalImages: newImages,
        });

        showToast('success', 'Imagen adicional agregada correctamente.');
    };

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            const productsData = await getProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error loading products:', error);
            showToast('error', 'Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

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
            categoryFilter === '' || product.category === categoryFilter;

        return matchesGlobalFilter && matchesCategoryFilter;
    });

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

    const saveProduct = async (productData) => {
        try {
            if (
                !productData.name ||
                !productData.category ||
                !productData.price
            ) {
                showToast(
                    'error',
                    'Por favor, completa todos los campos obligatorios'
                );
                return;
            }

            const formattedProductData = {
                ...productData,
                categoryLabel:
                    categories.find((cat) => cat.value === productData.category)
                        ?.label || '',
                priceFormatted: `${productData.price}€`,
                // Mantener compatibilidad con el campo image existente
                image: productData.mainImage || productData.image || '',
            };

            if (productData.id) {
                await updateProduct(productData.id, formattedProductData);
                showToast('success', 'Producto actualizado correctamente');
            } else {
                await addProduct(formattedProductData);
                showToast('success', 'Producto creado correctamente');
            }

            setDialogVisible(false);
            loadProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            showToast('error', 'Error al guardar el producto');
        }
    };

    const confirmDelete = async () => {
        try {
            // Eliminar imágenes de Firebase Storage antes de eliminar el producto
            if (selectedProduct) {
                const imagesToDelete = [];

                // Agregar imagen principal si existe y es de Firebase
                if (
                    selectedProduct.mainImage &&
                    selectedProduct.mainImage.includes('firebase')
                ) {
                    imagesToDelete.push(selectedProduct.mainImage);
                }
                if (
                    selectedProduct.image &&
                    selectedProduct.image.includes('firebase')
                ) {
                    imagesToDelete.push(selectedProduct.image);
                }

                // Agregar imágenes adicionales si existen y son de Firebase
                if (selectedProduct.additionalImages) {
                    selectedProduct.additionalImages.forEach((img) => {
                        if (img.includes('firebase')) {
                            imagesToDelete.push(img);
                        }
                    });
                }

                // Eliminar todas las imágenes de Firebase Storage
                for (const imageUrl of imagesToDelete) {
                    try {
                        await deleteProductImage(imageUrl);
                    } catch (error) {
                        console.warn(
                            'No se pudo eliminar imagen:',
                            imageUrl,
                            error
                        );
                        // Continuar con la eliminación aunque falle una imagen
                    }
                }
            }

            // Eliminar el producto de Firestore
            await deleteProduct(selectedProduct.id);
            showToast('success', 'Producto eliminado correctamente');
            setDeleteDialogVisible(false);
            loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            showToast('error', 'Error al eliminar el producto');
        }
    };

    const createTestProduct = async () => {
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
                features: ['Atérmico', 'Certificado', 'Electrónico'],
                stock: 'Disponible',
                featured: false,
            };
            await addProduct(testProduct);
            showToast('success', 'Producto de prueba creado correctamente');
            loadProducts();
        } catch (error) {
            console.error('Error creating test product:', error);
            showToast('error', 'Error al crear producto de prueba');
        }
    };

    return {
        // Estado
        products: filteredProducts,
        loading,
        globalFilter,
        setGlobalFilter,
        categoryFilter,
        setCategoryFilter,
        dialogVisible,
        setDialogVisible,
        deleteDialogVisible,
        setDeleteDialogVisible,
        editingProduct,
        setEditingProduct,
        selectedProduct,

        // Opciones
        categories,
        stockOptions,
        featureOptions,

        // Funciones
        addAdditionalImage,
        openNewProductDialog,
        openEditProductDialog,
        openDeleteDialog,
        saveProduct,
        confirmDelete,
        createTestProduct,
    };
};

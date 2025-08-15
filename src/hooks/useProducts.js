'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
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
            showToast('error', 'Error al cargar los productos');
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

    const saveProduct = async () => {
        try {
            if (
                !editingProduct.name ||
                !editingProduct.category ||
                !editingProduct.price
            ) {
                showToast(
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
                showToast('success', 'Producto actualizado correctamente');
            } else {
                await addProduct(productData);
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
                features: [
                    'Atérmico',
                    'Certificado',
                    'Electrónico',
                ],
                stock: 'Disponible',
                featured: false,
            };
            await addProduct(testProduct);
            showToast(
                'success',
                'Producto de prueba creado correctamente'
            );
            loadProducts();
        } catch (error) {
            console.error(
                'Error creating test product:',
                error
            );
            showToast(
                'error',
                'Error al crear producto de prueba'
            );
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

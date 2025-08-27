import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { getBestGoogleDriveUrl } from '@/utils/imageUtils';

// Convertir enlace de Google Drive a URL de imagen directa
export const convertGoogleDriveUrl = (url) => {
    return getBestGoogleDriveUrl(url);
};

// Obtener todos los productos
export const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = [];
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            // Convertir URLs de Google Drive si es necesario
            if (productData.image) {
                productData.image = convertGoogleDriveUrl(productData.image);
            }
            products.push({ id: doc.id, ...productData });
        });
        console.log('Productos obtenidos de Firestore:', products);
        return products;
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
};

// Obtener productos por categoría
export const getProductsByCategory = async (category) => {
    try {
        const q = query(
            collection(db, 'products'),
            where('category', '==', category)
        );
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            // Convertir URLs de Google Drive si es necesario
            if (productData.image) {
                productData.image = convertGoogleDriveUrl(productData.image);
            }
            products.push({ id: doc.id, ...productData });
        });
        return products;
    } catch (error) {
        console.error('Error getting products by category:', error);
        throw error;
    }
};

// Obtener productos destacados
export const getFeaturedProducts = async () => {
    try {
        const q = query(
            collection(db, 'products'),
            where('featured', '==', true),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            // Convertir URLs de Google Drive si es necesario
            if (productData.image) {
                productData.image = convertGoogleDriveUrl(productData.image);
            }
            products.push({ id: doc.id, ...productData });
        });
        return products;
    } catch (error) {
        console.error('Error getting featured products:', error);
        throw error;
    }
};

// Agregar un nuevo producto
export const addProduct = async (productData) => {
    try {
        console.log('Agregando producto:', productData);
        console.log('URL de imagen a guardar:', productData.image);

        // Convertir URL de Google Drive si es necesario
        if (productData.image) {
            productData.image = convertGoogleDriveUrl(productData.image);
        }

        const productToSave = {
            ...productData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        console.log('Producto final a guardar:', productToSave);

        const docRef = await addDoc(collection(db, 'products'), productToSave);
        console.log('Producto agregado con ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

// Actualizar un producto
export const updateProduct = async (productId, productData) => {
    try {
        console.log('Actualizando producto:', productId, productData);

        // Convertir URL de Google Drive si es necesario
        if (productData.image) {
            productData.image = convertGoogleDriveUrl(productData.image);
        }

        const productRef = doc(db, 'products', productId);
        await updateDoc(productRef, {
            ...productData,
            updatedAt: new Date(),
        });
        console.log('Producto actualizado correctamente');
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Eliminar un producto
export const deleteProduct = async (productId) => {
    try {
        await deleteDoc(doc(db, 'products', productId));
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Subir imagen a Firebase Storage
export const uploadProductImage = async (file, productId = null) => {
    try {
        // Validar el archivo
        if (!file) {
            throw new Error('No se proporcionó ningún archivo');
        }

        // Validar tipo de archivo
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
        ];
        if (!allowedTypes.includes(file.type)) {
            throw new Error(
                'Tipo de archivo no permitido. Solo se permiten: JPEG, JPG, PNG, WEBP'
            );
        }

        // Validar tamaño (máximo 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new Error(
                'El archivo es demasiado grande. Máximo 5MB permitido'
            );
        }

        // Generar nombre único para el archivo
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const fileExtension = file.name.split('.').pop();
        const fileName = `products/${
            productId || 'temp'
        }/${timestamp}_${randomId}.${fileExtension}`;

        // Crear referencia en Firebase Storage
        const storageRef = ref(storage, fileName);

        // Subir archivo
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Archivo subido exitosamente:', snapshot.metadata.name);

        // Obtener URL de descarga
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('URL de descarga generada:', downloadURL);

        return {
            url: downloadURL,
            path: fileName,
            name: file.name,
            size: file.size,
            type: file.type,
        };
    } catch (error) {
        console.error('Error subiendo imagen:', error);
        throw error;
    }
};

// Subir múltiples imágenes
export const uploadMultipleImages = async (files, productId = null) => {
    try {
        const uploadPromises = files.map((file) =>
            uploadProductImage(file, productId)
        );
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        console.error('Error subiendo múltiples imágenes:', error);
        throw error;
    }
};

// Eliminar imagen de Firebase Storage
export const deleteProductImage = async (imageUrl) => {
    try {
        // Si es una URL de Firebase Storage, extraer la ruta
        if (imageUrl.includes('firebase')) {
            // Extraer la ruta del archivo de la URL
            const urlParts = imageUrl.split('/');
            const filePath = urlParts
                .slice(urlParts.indexOf('o') + 1)
                .join('/');
            const decodedPath = decodeURIComponent(filePath);

            const imageRef = ref(storage, decodedPath);
            await deleteObject(imageRef);
            console.log('Imagen eliminada de Firebase Storage:', decodedPath);
        } else {
            console.log(
                'No es una URL de Firebase Storage, no se elimina:',
                imageUrl
            );
        }
    } catch (error) {
        console.error('Error eliminando imagen:', error);
        // No lanzar error para no interrumpir el flujo si la imagen no existe
    }
};

// Verificar si una imagen existe y es accesible
export const verifyImageUrl = async (imageUrl) => {
    try {
        if (!imageUrl || imageUrl.trim() === '') {
            return { valid: false, error: 'URL vacía' };
        }

        // Convertir URL de Google Drive si es necesario
        const convertedUrl = convertGoogleDriveUrl(imageUrl);

        // Verificar si es una URL válida
        const url = new URL(convertedUrl);
        if (!url.protocol.startsWith('http')) {
            return { valid: false, error: 'URL no válida' };
        }

        // Para Google Drive, asumimos que es válido si tiene el formato correcto
        if (convertedUrl.includes('drive.google.com/uc?export=view')) {
            return {
                valid: true,
                size: 'N/A (Google Drive)',
                note: 'Verificación automática para Google Drive',
            };
        }

        // Para otras URLs, intentar verificar (pero puede fallar por CORS)
        try {
            const response = await fetch(convertedUrl, {
                method: 'HEAD',
                mode: 'no-cors', // Intentar evitar problemas de CORS
            });

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.startsWith('image/')) {
                    return {
                        valid: true,
                        size: response.headers.get('content-length'),
                    };
                } else {
                    return { valid: false, error: 'No es una imagen válida' };
                }
            } else {
                return { valid: false, error: `HTTP ${response.status}` };
            }
        } catch (fetchError) {
            // Si falla el fetch, asumimos que es válido para Google Drive
            if (convertedUrl.includes('drive.google.com')) {
                return {
                    valid: true,
                    size: 'N/A (Google Drive)',
                    note: 'Verificación automática (CORS bloqueado)',
                };
            }
            return {
                valid: false,
                error: 'Error de red: ' + fetchError.message,
            };
        }
    } catch (error) {
        console.error('Error verificando imagen:', error);
        return { valid: false, error: error.message };
    }
};

// Verificar todas las imágenes de los productos
export const verifyAllProductImages = async () => {
    try {
        const products = await getProducts();
        const results = [];

        for (const product of products) {
            if (product.image) {
                const verification = await verifyImageUrl(product.image);
                results.push({
                    productId: product.id,
                    productName: product.name,
                    imageUrl: product.image,
                    ...verification,
                });
            } else {
                results.push({
                    productId: product.id,
                    productName: product.name,
                    imageUrl: null,
                    valid: false,
                    error: 'Sin imagen',
                });
            }
        }

        console.log('Verificación de imágenes completada:', results);
        return results;
    } catch (error) {
        console.error('Error verificando imágenes:', error);
        throw error;
    }
};

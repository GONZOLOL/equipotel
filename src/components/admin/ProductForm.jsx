'use client';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { convertGoogleDriveUrl } from '@/services/productService';
import { useToast } from '@/contexts/ToastContext';

const ProductForm = ({
    dialogVisible,
    onHide,
    product,
    onSave,
    categories,
    stockOptions,
    featureOptions,
    conditionOptions,
    isSegundaMano = false,
    onRemoveImage,
}) => {
    const [productData, setProductData] = useState(product || {});
    const [uploadingMainImage, setUploadingMainImage] = useState(false);
    const [uploadingAdditionalImages, setUploadingAdditionalImages] =
        useState(false);
    const [mainImageProgress, setMainImageProgress] = useState(0);
    const [additionalImagesProgress, setAdditionalImagesProgress] = useState(0);
    const mainImageFileUploadRef = useRef(null);
    const additionalImagesFileUploadRef = useRef(null);
    const { showToast } = useToast();

    // Actualizar productData cuando cambie el prop product
    useEffect(() => {
        setProductData(product || {});
    }, [product]);

    // Función para manejar la subida de imagen principal
    const handleMainImageUpload = async (event) => {
        const file = event.files[0];
        if (!file) return;

        try {
            setUploadingMainImage(true);
            setMainImageProgress(0);

            // Simular progreso
            const progressInterval = setInterval(() => {
                setMainImageProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 100);

            // Importar dinámicamente para evitar problemas de SSR
            const { uploadProductImage } = await import(
                '@/services/productService'
            );
            const result = await uploadProductImage(file, productData?.id);

            clearInterval(progressInterval);
            setMainImageProgress(100);

            // Actualizar el producto con la nueva imagen
            setProductData({
                ...productData,
                mainImage: result.url,
                image: result.url, // Mantener compatibilidad
            });

            // Toast se maneja en el componente padre
        } catch (error) {
            console.error('Error subiendo imagen principal:', error);
            showToast('error', error.message || 'Error al subir la imagen');
        } finally {
            setUploadingMainImage(false);
            setMainImageProgress(0);
            // Limpiar el input de archivo
            if (mainImageFileUploadRef.current) {
                mainImageFileUploadRef.current.clear();
            }
        }
    };

    // Función para manejar la subida de imágenes adicionales
    const handleAdditionalImagesUpload = async (event) => {
        const files = event.files;
        if (!files || files.length === 0) return;

        try {
            setUploadingAdditionalImages(true);
            setAdditionalImagesProgress(0);

            // Simular progreso
            const progressInterval = setInterval(() => {
                setAdditionalImagesProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 5;
                });
            }, 100);

            // Importar dinámicamente para evitar problemas de SSR
            const { uploadMultipleImages } = await import(
                '@/services/productService'
            );
            const results = await uploadMultipleImages(files, productData?.id);

            clearInterval(progressInterval);
            setAdditionalImagesProgress(100);

            // Agregar las nuevas URLs a las imágenes adicionales existentes
            const newUrls = results.map((result) => result.url);
            const currentImages = productData?.additionalImages || [];
            const updatedImages = [...currentImages, ...newUrls];

            setProductData({
                ...productData,
                additionalImages: updatedImages,
            });

            // Toast se maneja en el componente padre
        } catch (error) {
            console.error('Error subiendo imágenes adicionales:', error);
            showToast('error', error.message || 'Error al subir las imágenes');
        } finally {
            setUploadingAdditionalImages(false);
            setAdditionalImagesProgress(0);
            // Limpiar el input de archivo
            if (additionalImagesFileUploadRef.current) {
                additionalImagesFileUploadRef.current.clear();
            }
        }
    };

    // Función para eliminar imagen adicional
    const removeAdditionalImage = (index) => {
        const newImages = productData.additionalImages.filter(
            (_, i) => i !== index
        );
        setProductData({
            ...productData,
            additionalImages: newImages,
        });
    };

    // Configuración del FileUpload para imagen principal
    const mainImageUploadConfig = {
        name: 'mainImage',
        accept: 'image/*',
        maxFileSize: 5242880, // 5MB
        customUpload: true,
        uploadHandler: handleMainImageUpload,
        chooseLabel: 'Seleccionar',
        cancelLabel: '',
        auto: true, // Subida automática
        multiple: false,
        emptyTemplate: (
            <div className="flex flex-col items-center p-4">
                <i className="pi pi-image text-2xl text-gray-400 mb-2"></i>
                <span className="text-xs text-gray-500 text-center">
                    Haz clic para seleccionar imagen
                </span>
            </div>
        ),
    };

    // Configuración del FileUpload para imágenes adicionales
    const additionalImagesUploadConfig = {
        name: 'additionalImages',
        url: '/api/upload', // No se usa realmente, manejamos la subida manualmente
        accept: 'image/*',
        maxFileSize: 5242880, // 5MB
        multiple: true,
        customUpload: true,
        uploadHandler: handleAdditionalImagesUpload,
        chooseLabel: 'Seleccionar',
        cancelLabel: '',
        auto: true, // Subida automática
        emptyTemplate: (
            <div className="flex flex-col items-center p-4">
                <i className="pi pi-images text-2xl text-gray-400 mb-2"></i>
                <span className="text-xs text-gray-500 text-center">
                    Haz clic para seleccionar imágenes
                </span>
            </div>
        ),
    };

    return (
        <Dialog
            visible={dialogVisible}
            onHide={onHide}
            header={
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl font-semibold">
                        {productData?.id ? 'Editar Producto' : 'Nuevo Producto'}
                    </h2>
                </div>
            }
            modal
            className="p-fluid"
            style={{ width: '90rem', maxWidth: '95vw' }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="md:col-span-3 lg:col-span-4">
                    <label htmlFor="name" className="font-medium mb-2 block">
                        Nombre *
                    </label>
                    <InputText
                        id="name"
                        value={productData?.name || ''}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                name: e.target.value,
                            })
                        }
                        placeholder="Nombre del producto"
                    />
                </div>

                {/* Custom grid for the 4 fields row */}
                <div className="md:col-span-3 lg:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-20 gap-4">
                        <div className="lg:col-span-6">
                            <label
                                htmlFor="category"
                                className="font-medium mb-2 block"
                            >
                                Categoría *
                            </label>
                            <Dropdown
                                id="category"
                                value={productData?.category || ''}
                                options={categories}
                                onChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        category: e.value,
                                    })
                                }
                                placeholder="Selecciona una categoría"
                            />
                        </div>
                        <div className="lg:col-span-8">
                            <label
                                htmlFor="features"
                                className="font-medium mb-2 block"
                            >
                                Características
                            </label>
                            <MultiSelect
                                id="features"
                                value={productData?.features || []}
                                options={featureOptions}
                                onChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        features: e.value,
                                    })
                                }
                                placeholder="Selecciona características"
                                display="chip"
                            />
                        </div>

                        <div className="lg:col-span-3">
                            <label
                                htmlFor="price"
                                className="font-medium mb-2 block"
                            >
                                Precio (€) *
                            </label>
                            <InputNumber
                                id="price"
                                value={productData?.price || 0}
                                onValueChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        price: e.value || 0,
                                    })
                                }
                                mode="currency"
                                currency="EUR"
                                locale="es-ES"
                            />
                        </div>

                        <div className="lg:col-span-3">
                            <label
                                htmlFor="stock"
                                className="font-medium mb-2 block"
                            >
                                Stock
                            </label>
                            <Dropdown
                                id="stock"
                                value={productData?.stock || 'Disponible'}
                                options={stockOptions}
                                onChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        stock: e.value,
                                    })
                                }
                            />
                        </div>
                        {isSegundaMano && (
                            <div className="lg:col-span-3">
                                <label
                                    htmlFor="condition"
                                    className="font-medium mb-2 block"
                                >
                                    Estado *
                                </label>
                                <Dropdown
                                    id="condition"
                                    value={productData?.condition || ''}
                                    options={conditionOptions}
                                    onChange={(e) =>
                                        setProductData({
                                            ...productData,
                                            condition: e.value,
                                        })
                                    }
                                    placeholder="Selecciona el estado"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-3 lg:col-span-4">
                    <label
                        htmlFor="description"
                        className="font-medium mb-2 block"
                    >
                        Descripción
                    </label>
                    <InputTextarea
                        id="description"
                        value={productData?.description || ''}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                description: e.target.value,
                            })
                        }
                        rows={2}
                        placeholder="Descripción del producto"
                    />
                </div>

                {/* Images Section - Main and Additional in same row */}
                <div className="md:col-span-3 lg:col-span-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Main Image Section */}
                        <div>
                            <label className="font-medium mb-2 block">
                                Imagen Principal del Producto *
                            </label>

                            {/* File Upload for Main Image */}
                            <div className="mb-4">
                                <FileUpload
                                    ref={mainImageFileUploadRef}
                                    {...mainImageUploadConfig}
                                    disabled={uploadingMainImage}
                                    className="compact-fileupload"
                                />
                                {uploadingMainImage && (
                                    <div className="mt-2">
                                        <ProgressBar
                                            value={mainImageProgress}
                                        />
                                        <p className="text-sm text-gray-600 mt-1">
                                            Subiendo imagen principal...
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* Current Main Image Preview */}
                            {(productData?.mainImage || productData?.image) && (
                                <div className="mb-4">
                                    <div className="flex gap-4">
                                        <Image
                                            src={convertGoogleDriveUrl(
                                                productData.mainImage ||
                                                    productData.image
                                            )}
                                            alt="Producto"
                                            className="w-32 h-32 object-cover rounded-lg border"
                                            width={128}
                                            height={128}
                                            onError={(e) => {
                                                console.error(
                                                    'Error cargando preview de imagen principal:',
                                                    productData.mainImage ||
                                                        productData.image
                                                );
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display =
                                                    'flex';
                                            }}
                                        />
                                        <div
                                            className="w-24 h-24 bg-gray-200 rounded-lg border flex items-center justify-center"
                                            style={{ display: 'none' }}
                                        >
                                            <i className="pi pi-image text-gray-400 text-xl"></i>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Images Section */}
                        <div>
                            <label className="font-medium mb-2 block">
                                Imágenes Adicionales
                            </label>

                            {/* File Upload for Additional Images */}
                            <div className="mb-4">
                                <FileUpload
                                    ref={additionalImagesFileUploadRef}
                                    {...additionalImagesUploadConfig}
                                    disabled={uploadingAdditionalImages}
                                    className="compact-fileupload"
                                />
                                {uploadingAdditionalImages && (
                                    <div className="mt-2">
                                        <ProgressBar
                                            value={additionalImagesProgress}
                                        />
                                        <p className="text-sm text-gray-600 mt-1">
                                            Subiendo imágenes adicionales...
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* Current Additional Images Preview */}
                            {productData?.additionalImages &&
                                productData.additionalImages.length > 0 && (
                                    <div className="mb-4">
                                        <div className="relative">
                                            {/* Carrusel de imágenes adicionales */}
                                            <div className="flex gap-4 overflow-x-auto pb-4 pt-5">
                                                {productData.additionalImages.map(
                                                    (img, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative flex-shrink-0 "
                                                        >
                                                            <Image
                                                                src={convertGoogleDriveUrl(
                                                                    img
                                                                )}
                                                                alt={`Producto ${
                                                                    index + 1
                                                                }`}
                                                                className="w-24 h-24 object-cover rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                                                                width={96}
                                                                height={96}
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    console.error(
                                                                        'Error cargando preview de imagen adicional:',
                                                                        img
                                                                    );
                                                                    e.target.style.display =
                                                                        'none';
                                                                    e.target.nextSibling.style.display =
                                                                        'flex';
                                                                }}
                                                            />

                                                            <Button
                                                                icon="pi pi-times"
                                                                size="small"
                                                                severity="danger"
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    top: '-10px',
                                                                    right: '-15px',
                                                                    zIndex: '1000',
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    padding:
                                                                        '15px',
                                                                    borderRadius:
                                                                        '50%',
                                                                }}
                                                                onClick={() =>
                                                                    removeAdditionalImage(
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
                <Button
                    label="Cancelar"
                    severity="secondary"
                    outlined
                    onClick={onHide}
                />
                <Button
                    label="Guardar"
                    severity="primary"
                    onClick={() => onSave(productData)}
                />
            </div>
        </Dialog>
    );
};

export default ProductForm;

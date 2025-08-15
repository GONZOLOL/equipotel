'use client';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import Image from 'next/image';
import { convertGoogleDriveUrl } from '@/services/productService';

const ProductForm = ({
    dialogVisible,
    setDialogVisible,
    editingProduct,
    setEditingProduct,
    categories,
    stockOptions,
    featureOptions,
    addAdditionalImage,
    saveProduct,
    showToast,
}) => {
    return (
        <Dialog
            visible={dialogVisible}
            onHide={() => setDialogVisible(false)}
            header={
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl font-semibold">
                        {editingProduct?.id
                            ? 'Editar Producto'
                            : 'Nuevo Producto'}
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                inputId="featured-header"
                                checked={editingProduct?.featured || false}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        featured: e.checked,
                                    })
                                }
                            />
                            <label
                                htmlFor="featured-header"
                                className="text-sm font-medium text-gray-700"
                            >
                                Destacado
                            </label>
                        </div>
                    </div>
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
                        <div className="lg:col-span-8">
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

                        <div className="lg:col-span-3">
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

                        <div className="lg:col-span-3">
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
                        value={editingProduct?.description || ''}
                        onChange={(e) =>
                            setEditingProduct({
                                ...editingProduct,
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

                            {/* Current Main Image Preview */}
                            {(editingProduct?.mainImage ||
                                editingProduct?.image) && (
                                <div className="mb-4">
                                    <div className="flex gap-4">
                                        <Image
                                            src={convertGoogleDriveUrl(
                                                editingProduct.mainImage ||
                                                    editingProduct.image
                                            )}
                                            alt="Producto"
                                            className="w-32 h-32 object-cover rounded-lg border"
                                            width={128}
                                            height={128}
                                            onError={(e) => {
                                                console.error(
                                                    'Error cargando preview de imagen principal:',
                                                    editingProduct.mainImage ||
                                                        editingProduct.image
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

                            {/* Google Drive URL Input for Main Image */}
                            <div className="mt-9">
                                <label
                                    htmlFor="mainImage"
                                    className="font-medium mb-2 block"
                                >
                                    Enlace de Google Drive:
                                </label>
                                <div className="flex gap-2">
                                    <InputText
                                        id="mainImage"
                                        value={
                                            editingProduct?.mainImage ||
                                            editingProduct?.image ||
                                            ''
                                        }
                                        onChange={(e) => {
                                            const url = e.target.value;
                                            setEditingProduct({
                                                ...editingProduct,
                                                mainImage: url,
                                            });

                                            // Validar URL en tiempo real
                                            if (url.trim()) {
                                                try {
                                                    new URL(url);
                                                    if (
                                                        url.includes(
                                                            'drive.google.com'
                                                        )
                                                    ) {
                                                        // URL válida de Google Drive
                                                    } else {
                                                        // Mostrar advertencia si no es Google Drive
                                                        console.warn(
                                                            'La URL no parece ser de Google Drive'
                                                        );
                                                    }
                                                } catch {
                                                    // URL inválida
                                                    console.warn(
                                                        'URL inválida'
                                                    );
                                                }
                                            }
                                        }}
                                        placeholder="https://drive.google.com/file/d/1ABC123.../view?usp=sharing"
                                        className="flex-1"
                                    />
                                    <Button
                                        icon="pi pi-question-circle"
                                        severity="info"
                                        outlined
                                        onClick={() => {
                                            showToast(
                                                'info',
                                                `📋 INSTRUCCIONES PARA GOOGLE DRIVE:

                                                    1️⃣ Sube tu imagen a Google Drive
                                                    2️⃣ Haz clic derecho en la imagen
                                                    3️⃣ Selecciona "Obtener enlace"
                                                    4️⃣ Cambia a "Cualquier persona con el enlace"
                                                    5️⃣ Copia el enlace completo
                                                    6️⃣ Pégalo en el campo de arriba

                                                    💡 El sistema convertirá automáticamente el enlace para que se vea correctamente.`
                                            );
                                        }}
                                        title="Ver instrucciones"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Images Section */}
                        <div>
                            <label className="font-medium mb-2 block">
                                Imágenes Adicionales
                            </label>

                            {/* Current Additional Images Preview */}
                            {editingProduct?.additionalImages &&
                                editingProduct.additionalImages.length > 0 && (
                                    <div className="mb-4">
                                        <div className="relative">
                                            {/* Carrusel de imágenes adicionales */}
                                            <div className="flex gap-4 overflow-x-auto pb-4 pt-5">
                                                {editingProduct.additionalImages.map(
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
                                    </div>
                                )}

                            {/* Add New Additional Image */}
                            <div className="mt-4">
                                <label className="font-medium mb-2 block">
                                    Agregar nueva imagen:
                                </label>
                                <div className="flex gap-2">
                                    <InputText
                                        id="additionalImageInput"
                                        placeholder="https://drive.google.com/file/d/1ABC123.../view?usp=sharing"
                                        className="flex-1"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addAdditionalImage(
                                                    e.target.value
                                                );
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                    <Button
                                        icon="pi pi-plus"
                                        severity="success"
                                        onClick={(e) => {
                                            const input =
                                                document.getElementById(
                                                    'additionalImageInput'
                                                );
                                            addAdditionalImage(input.value);
                                            input.value = '';
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
    );
};

export default ProductForm;

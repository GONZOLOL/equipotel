'use client';

import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProductTable = ({
    products,
    loading,
    globalFilter,
    setGlobalFilter,
    categoryFilter,
    setCategoryFilter,
    categories,
    onEditProduct,
    onDeleteProduct,
    onCreateTestProduct,
    onNewProduct,
}) => {
    const router = useRouter();

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
                    onClick={() => onEditProduct(rowData)}
                    title="Editar"
                />
                <Button
                    icon="pi pi-trash"
                    size="small"
                    severity="danger"
                    outlined
                    onClick={() => onDeleteProduct(rowData)}
                    title="Eliminar"
                />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column sm:flex-row justify-between align-items-center gap-3">
            <div className="flex gap-2 justify-between w-full">
                <div className="flex gap-2 items-center">
                    <span className="p-input-icon-left relative">
                        <i className="pi pi-search absolute left-3 text-gray-400 z-10" />
                        <InputText
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Buscar productos..."
                            className="w-full sm:w-72 search-input"
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
                        className="w-full sm:w-62 h-12"
                        showClear
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        label="Crear Producto de Prueba"
                        className="h-10"
                        icon="pi pi-star"
                        severity="success"
                        outlined
                        onClick={onCreateTestProduct}
                    />
                    <Button
                        label="Nuevo Producto"
                        className="h-10"
                        icon="pi pi-plus"
                        severity="primary"
                        onClick={onNewProduct}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <Card className="shadow-sm">
            <DataTable
                value={products}
                header={header}
                loading={loading}
                paginator
                rows={8}
                rowsPerPageOptions={[5, 8, 15, 25]}
                className="p-datatable-sm"
                emptyMessage="No se encontraron productos"
                filterDisplay="menu"
                scrollable
                scrollHeight="calc(100vh - 300px)"
            >
                <Column
                    field="name"
                    header="Imagen"
                    body={imageBodyTemplate}
                    style={{ width: '80px' }}
                />
                <Column field="name" header="Nombre" sortable filter />
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
    );
};

export default ProductTable;

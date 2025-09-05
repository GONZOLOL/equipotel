'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { Button } from 'primereact/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import ProductTable from '@/components/admin/ProductTable';
import ProductForm from '@/components/admin/ProductForm';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

export default function AdminProducts() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const {
        products,
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
        categories,
        stockOptions,
        featureOptions,
        addAdditionalImage,
        openNewProductDialog,
        openEditProductDialog,
        openDeleteDialog,
        saveProduct,
        confirmDelete,
        createTestProduct,
    } = useProducts();

    return (
        <ProtectedRoute>
            <AdminLayout
                title="Gestión de Productos"
                subtitle="Administra el catálogo de productos"
                showBackButton={true}
                backUrl="/admin/dashboard"
            >
                <ProductTable
                    products={products}
                    loading={loading}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    categories={categories}
                    onEditProduct={openEditProductDialog}
                    onDeleteProduct={openDeleteDialog}
                    onCreateTestProduct={createTestProduct}
                    onNewProduct={openNewProductDialog}
                />

                {/* Product Form Dialog */}
                <ProductForm
                    dialogVisible={dialogVisible}
                    onHide={() => setDialogVisible(false)}
                    product={editingProduct}
                    onSave={saveProduct}
                    categories={categories}
                    stockOptions={stockOptions}
                    featureOptions={featureOptions}
                    conditionOptions={[]}
                    isSegundaMano={false}
                    onRemoveImage={addAdditionalImage}
                />

                {/* Delete Confirmation Dialog */}
                <DeleteConfirmDialog
                    visible={deleteDialogVisible}
                    onHide={() => setDeleteDialogVisible(false)}
                    onConfirm={confirmDelete}
                    productName={selectedProduct?.name}
                />
            </AdminLayout>
        </ProtectedRoute>
    );
}

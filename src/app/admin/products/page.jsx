'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
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
            <div className="min-h-screen bg-gray-50 px-8">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-3">
                            <div className="flex items-center space-x-4 gap-4">
                                <Button
                                    icon="pi pi-arrow-left"
                                    severity="secondary"
                                    outlined
                                    onClick={() =>
                                        router.push('/admin/dashboard')
                                    }
                                />
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-800">
                                        Gestión de Productos
                                    </h1>
                                    <p className="text-xs text-gray-600">
                                        Administra el catálogo de productos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                </div>

                {/* Product Form Dialog */}
                <ProductForm
                    dialogVisible={dialogVisible}
                    setDialogVisible={setDialogVisible}
                    editingProduct={editingProduct}
                    setEditingProduct={setEditingProduct}
                    categories={categories}
                    stockOptions={stockOptions}
                    featureOptions={featureOptions}
                    addAdditionalImage={addAdditionalImage}
                    saveProduct={saveProduct}
                    showToast={showToast}
                />

                {/* Delete Confirmation Dialog */}
                <DeleteConfirmDialog
                    deleteDialogVisible={deleteDialogVisible}
                    setDeleteDialogVisible={setDeleteDialogVisible}
                    selectedProduct={selectedProduct}
                    onConfirmDelete={confirmDelete}
                />
            </div>
        </ProtectedRoute>
    );
}

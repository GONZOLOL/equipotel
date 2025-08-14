'use client';

import { useState, useEffect } from 'react';
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
import { getProducts, addProduct, updateProduct, deleteProduct, uploadProductImage } from '@/services/productService';

export default function AdminProducts() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState(null);

  const categories = [
    { label: 'Cajas Fuertes', value: 'cajas-fuertes' },
    { label: 'Armarios Acorazados', value: 'armarios-acorazados' },
    { label: 'Sistemas de Anclaje', value: 'sistemas-anclaje' },
    { label: 'Compartimentos de Seguridad', value: 'compartimentos-seguridad' },
    { label: 'Segunda Mano', value: 'segunda-mano' }
  ];

  const stockOptions = [
    { label: 'Disponible', value: 'Disponible' },
    { label: 'Agotado', value: 'Agotado' },
    { label: 'Próximamente', value: 'Próximamente' }
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
    { label: 'Garantía', value: 'Garantía' }
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
      image: '',
      features: [],
      stock: 'Disponible',
      featured: false
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
      if (!editingProduct.name || !editingProduct.category || !editingProduct.price) {
        showMessage('error', 'Por favor, completa todos los campos obligatorios');
        return;
      }

      const productData = {
        ...editingProduct,
        categoryLabel: categories.find(cat => cat.value === editingProduct.category)?.label || '',
        priceFormatted: `${editingProduct.price}€`
      };

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

  const categoryBodyTemplate = (rowData) => {
    return <Tag value={rowData.categoryLabel} severity="info" />;
  };

  const priceBodyTemplate = (rowData) => {
    return <span className="font-semibold text-blue-600">{rowData.priceFormatted}</span>;
  };

  const stockBodyTemplate = (rowData) => {
    const severity = rowData.stock === 'Disponible' ? 'success' : 
                   rowData.stock === 'Agotado' ? 'danger' : 'warning';
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
          icon="pi pi-pencil"
          size="small"
          severity="secondary"
          outlined
          onClick={() => openEditProductDialog(rowData)}
        />
        <Button
          icon="pi pi-trash"
          size="small"
          severity="danger"
          outlined
          onClick={() => openDeleteDialog(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-column sm:flex-row justify-content-between align-items-center gap-4">
      <h2 className="text-2xl font-bold text-gray-800 m-0">Gestión de Productos</h2>
      <div className="flex gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full sm:w-80"
          />
        </span>
        <Button
          label="Nuevo Producto"
          icon="pi pi-plus"
          severity="primary"
          onClick={openNewProductDialog}
        />
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
                  onClick={() => router.push('/admin/dashboard')}
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
              value={products}
              globalFilter={globalFilter}
              header={header}
              loading={loading}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              className="p-datatable-sm"
              emptyMessage="No se encontraron productos"
              filterDisplay="menu"
              responsiveLayout="scroll"
            >
              <Column field="name" header="Nombre" sortable filter />
              <Column field="categoryLabel" header="Categoría" body={categoryBodyTemplate} sortable filter />
              <Column field="priceFormatted" header="Precio" body={priceBodyTemplate} sortable />
              <Column field="stock" header="Stock" body={stockBodyTemplate} sortable filter />
              <Column field="featured" header="Destacado" body={featuredBodyTemplate} sortable />
              <Column header="Acciones" body={actionBodyTemplate} style={{ width: '120px' }} />
            </DataTable>
          </Card>
        </div>

        {/* Product Dialog */}
        <Dialog
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
          header={editingProduct?.id ? 'Editar Producto' : 'Nuevo Producto'}
          modal
          className="p-fluid"
          style={{ width: '50rem' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="name" className="font-medium mb-2 block">Nombre *</label>
              <InputText
                id="name"
                value={editingProduct?.name || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                placeholder="Nombre del producto"
              />
            </div>

            <div>
              <label htmlFor="category" className="font-medium mb-2 block">Categoría *</label>
              <Dropdown
                id="category"
                value={editingProduct?.category || ''}
                options={categories}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.value })}
                placeholder="Selecciona una categoría"
              />
            </div>

            <div>
              <label htmlFor="price" className="font-medium mb-2 block">Precio (€) *</label>
              <InputNumber
                id="price"
                value={editingProduct?.price || 0}
                onValueChange={(e) => setEditingProduct({ ...editingProduct, price: e.value })}
                mode="currency"
                currency="EUR"
                locale="es-ES"
              />
            </div>

            <div>
              <label htmlFor="stock" className="font-medium mb-2 block">Stock</label>
              <Dropdown
                id="stock"
                value={editingProduct?.stock || 'Disponible'}
                options={stockOptions}
                onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.value })}
              />
            </div>

            <div>
              <label htmlFor="featured" className="font-medium mb-2 block">Destacado</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingProduct?.featured || false}
                  onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm">Marcar como destacado</label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="font-medium mb-2 block">Descripción</label>
              <InputTextarea
                id="description"
                value={editingProduct?.description || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                rows={3}
                placeholder="Descripción del producto"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="features" className="font-medium mb-2 block">Características</label>
              <MultiSelect
                id="features"
                value={editingProduct?.features || []}
                options={featureOptions}
                onChange={(e) => setEditingProduct({ ...editingProduct, features: e.value })}
                placeholder="Selecciona características"
                display="chip"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="image" className="font-medium mb-2 block">URL de la imagen</label>
              <InputText
                id="image"
                value={editingProduct?.image || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
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
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            <span>¿Estás seguro de que quieres eliminar este producto?</span>
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

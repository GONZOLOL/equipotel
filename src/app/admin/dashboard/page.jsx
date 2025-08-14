'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { getProducts } from '@/services/productService';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo para las gráficas
  const [chartData] = useState({
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.4
      },
      {
        label: 'Consultas',
        data: [28, 48, 40, 19, 86, 27],
        fill: false,
        borderColor: '#10b981',
        tension: 0.4
      }
    ]
  });

  const [chartOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const categoryBodyTemplate = (rowData) => {
    return <Tag value={rowData.categoryLabel} severity="info" />;
  };

  const priceBodyTemplate = (rowData) => {
    return <span className="font-semibold text-blue-600">{rowData.priceFormatted}</span>;
  };

  const stockBodyTemplate = (rowData) => {
    return (
      <Tag 
        value={rowData.stock} 
        severity={rowData.stock === 'Disponible' ? 'success' : 'warning'} 
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
          onClick={() => router.push(`/admin/products/edit/${rowData.id}`)}
        />
        <Button
          icon="pi pi-trash"
          size="small"
          severity="danger"
          outlined
        />
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg">
                  <i className="pi pi-shield text-white"></i>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">
                    Panel de Administración
                  </h1>
                  <p className="text-sm text-gray-600">
                    Bienvenido, {user?.displayName || user?.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  label="Gestionar Productos"
                  icon="pi pi-box"
                  severity="primary"
                  onClick={() => router.push('/admin/products')}
                />
                <Button
                  label="Analytics"
                  icon="pi pi-chart-line"
                  severity="success"
                  onClick={() => router.push('/admin/analytics')}
                />
                <Button
                  label="Cerrar Sesión"
                  icon="pi pi-sign-out"
                  severity="secondary"
                  outlined
                  onClick={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                  <i className="pi pi-box text-blue-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Productos</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <i className="pi pi-eye text-green-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Visitas Hoy</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
                  <i className="pi pi-phone text-yellow-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Consultas</p>
                  <p className="text-2xl font-bold text-gray-900">56</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                  <i className="pi pi-chart-line text-purple-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ventas</p>
                  <p className="text-2xl font-bold text-gray-900">€12,345</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card title="Análisis de Ventas y Consultas">
              <Chart type="line" data={chartData} options={chartOptions} />
            </Card>

            <Card title="Productos por Categoría">
              <Chart 
                type="doughnut" 
                data={{
                  labels: ['Cajas Fuertes', 'Armarios Acorazados', 'Sistemas de Anclaje', 'Segunda Mano'],
                  datasets: [{
                    data: [12, 8, 6, 4],
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
                  }]
                }} 
              />
            </Card>
          </div>

          {/* Recent Products */}
          <Card title="Productos Recientes">
            <DataTable 
              value={products.slice(0, 5)} 
              loading={loading}
              paginator 
              rows={5}
              className="p-datatable-sm"
            >
              <Column field="name" header="Nombre" sortable />
              <Column field="categoryLabel" header="Categoría" body={categoryBodyTemplate} />
              <Column field="priceFormatted" header="Precio" body={priceBodyTemplate} sortable />
              <Column field="stock" header="Stock" body={stockBodyTemplate} />
              <Column header="Acciones" body={actionBodyTemplate} style={{ width: '100px' }} />
            </DataTable>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}

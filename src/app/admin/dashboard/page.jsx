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
import { Message } from 'primereact/message';
import { getProducts, verifyAllProductImages } from '@/services/productService';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [recentProducts, setRecentProducts] = useState([]);
    const [imageVerification, setImageVerification] = useState(null);
    const [message, setMessage] = useState(null);

    // Datos de ejemplo para los gráficos
    const chartData = {
        visitors: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Visitantes',
                    data: [1200, 1900, 3000, 5000, 2000, 3000],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                },
            ],
        },
        conversions: {
            labels: ['Llamadas', 'Emails', 'WhatsApp', 'Formularios'],
            datasets: [
                {
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#3B82F6',
                        '#10B981',
                        '#F59E0B',
                        '#EF4444',
                    ],
                },
            ],
        },
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    useEffect(() => {
        loadRecentProducts();
    }, []);

    const loadRecentProducts = async () => {
        try {
            const products = await getProducts();
            setRecentProducts(products.slice(0, 5)); // Solo los últimos 5
        } catch (error) {
            console.error('Error loading recent products:', error);
        }
    };

    const showMessage = (severity, text) => {
        setMessage({ severity, text });
        setTimeout(() => setMessage(null), 5000);
    };

    const imageStatusBodyTemplate = (rowData) => {
        if (!rowData.imageUrl) {
            return <Tag value="Sin imagen" severity="warning" />;
        }

        if (rowData.valid) {
            const note = rowData.note ? ` (${rowData.note})` : '';
            return <Tag value={`Válida${note}`} severity="success" />;
        } else {
            return <Tag value={`Error: ${rowData.error}`} severity="danger" />;
        }
    };

    const imageUrlBodyTemplate = (rowData) => {
        if (!rowData.imageUrl) {
            return <span className="text-gray-500">Sin imagen</span>;
        }

        return (
            <div className="flex items-center gap-2">
                <img
                    src={rowData.imageUrl}
                    alt={rowData.productName}
                    className="w-8 h-8 object-cover rounded"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                    }}
                />
                <i
                    className="pi pi-image text-gray-400"
                    style={{ display: 'none' }}
                ></i>
                <span className="text-xs text-gray-600 truncate max-w-32">
                    {rowData.imageUrl}
                </span>
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
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Panel de Administración
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Bienvenido,{' '}
                                    {user?.displayName || user?.email}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    label="Productos"
                                    icon="pi pi-box"
                                    severity="primary"
                                    outlined
                                    onClick={() =>
                                        router.push('/admin/products')
                                    }
                                />
                                <Button
                                    label="Analíticas"
                                    icon="pi pi-chart-bar"
                                    severity="secondary"
                                    outlined
                                    onClick={() =>
                                        router.push('/admin/analytics')
                                    }
                                />
                                <Button
                                    label="Cerrar Sesión"
                                    icon="pi pi-sign-out"
                                    severity="danger"
                                    outlined
                                    onClick={logout}
                                />
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
                            className="mb-6"
                        />
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <div className="text-center">
                                <i className="pi pi-users text-3xl text-blue-500 mb-2"></i>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    1,234
                                </h3>
                                <p className="text-gray-600">Visitantes</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="text-center">
                                <i className="pi pi-eye text-3xl text-green-500 mb-2"></i>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    5,678
                                </h3>
                                <p className="text-gray-600">Páginas Vistas</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="text-center">
                                <i className="pi pi-phone text-3xl text-orange-500 mb-2"></i>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    45
                                </h3>
                                <p className="text-gray-600">Contactos</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="text-center">
                                <i className="pi pi-box text-3xl text-purple-500 mb-2"></i>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {recentProducts.length}
                                </h3>
                                <p className="text-gray-600">Productos</p>
                            </div>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <Card title="Tráfico de Visitantes">
                            <Chart
                                type="line"
                                data={chartData.visitors}
                                options={chartOptions}
                                height="300px"
                            />
                        </Card>
                        <Card title="Fuentes de Conversión">
                            <Chart
                                type="doughnut"
                                data={chartData.conversions}
                                options={chartOptions}
                                height="300px"
                            />
                        </Card>
                    </div>

                    {/* Recent Products */}
                    <Card title="Productos Recientes" className="mb-8">
                        <DataTable
                            value={recentProducts}
                            paginator
                            rows={5}
                            className="p-datatable-sm"
                            emptyMessage="No hay productos recientes"
                        >
                            <Column field="name" header="Nombre" />
                            <Column field="categoryLabel" header="Categoría" />
                            <Column field="priceFormatted" header="Precio" />
                            <Column field="stock" header="Stock" />
                        </DataTable>
                    </Card>

                    {/* Image Verification Results */}
                    {imageVerification && (
                        <Card title="Verificación de Imágenes" className="mb-8">
                            <DataTable
                                value={imageVerification}
                                paginator
                                rows={10}
                                className="p-datatable-sm"
                                emptyMessage="No hay resultados de verificación"
                            >
                                <Column field="productName" header="Producto" />
                                <Column
                                    field="imageUrl"
                                    header="URL de Imagen"
                                    body={imageUrlBodyTemplate}
                                />
                                <Column
                                    field="valid"
                                    header="Estado"
                                    body={imageStatusBodyTemplate}
                                />
                                <Column field="size" header="Tamaño" />
                                <Column field="note" header="Nota" />
                            </DataTable>
                        </Card>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}

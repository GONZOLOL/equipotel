'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import { getProducts, verifyAllProductImages } from '@/services/productService';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { isDarkMode } = useThemeToggle();
    const [recentProducts, setRecentProducts] = useState([]);
    const [imageVerification, setImageVerification] = useState(null);
    const [message, setMessage] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [timeRange, setTimeRange] = useState('7d');

    // Hook para obtener datos reales de analytics
    const {
        data,
        loading: analyticsLoading,
        error: analyticsError,
        formatChartData,
        formatBasicMetrics,
    } = useAnalytics(timeRange);

    // Obtener datos reales de analytics
    const analyticsChartData = formatChartData();
    const basicMetrics = formatBasicMetrics();

    const timeRangeOptions = [
        { label: 'Últimos 7 días', value: '7d' },
        { label: 'Últimos 30 días', value: '30d' },
        { label: 'Últimos 90 días', value: '90d' },
        { label: 'Este año', value: '1y' },
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: isDarkMode ? '#e5e7eb' : '#495057',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: isDarkMode ? '#e5e7eb' : '#495057',
                },
                grid: {
                    color: isDarkMode ? '#374151' : '#ebedef',
                },
            },
            y: {
                ticks: {
                    color: isDarkMode ? '#e5e7eb' : '#495057',
                },
                grid: {
                    color: isDarkMode ? '#374151' : '#ebedef',
                },
            },
        },
    };

    useEffect(() => {
        setMounted(true);
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
            return (
                <span className="text-gray-500 dark:text-gray-400">
                    Sin imagen
                </span>
            );
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
                    className="pi pi-image text-gray-400 dark:text-gray-500"
                    style={{ display: 'none' }}
                ></i>
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-32">
                    {rowData.imageUrl}
                </span>
            </div>
        );
    };

    if (!mounted) {
        return null;
    }

    return (
        <ProtectedRoute>
            <AdminLayout
                title="Panel de Administración"
                subtitle={`Bienvenido, ${user?.displayName || user?.email}`}
            >
                {message && (
                    <Message
                        severity={message.severity}
                        text={message.text}
                        className="mb-6"
                    />
                )}

                {/* Selector de rango de tiempo */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Dashboard
                    </h2>
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Período:
                        </label>
                        <Dropdown
                            value={timeRange}
                            options={timeRangeOptions}
                            onChange={(e) => setTimeRange(e.value)}
                            placeholder="Seleccionar período"
                            className="w-48"
                        />
                    </div>
                </div>

                {/* Error de analytics */}
                {analyticsError && (
                    <Message
                        severity="error"
                        text={`Error cargando analytics: ${analyticsError}`}
                        className="mb-6"
                    />
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-center">
                            <i className="pi pi-users text-3xl text-blue-500 dark:text-blue-400 mb-2"></i>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {analyticsLoading
                                    ? '...'
                                    : basicMetrics.totalUsers || 0}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Visitantes
                            </p>
                        </div>
                    </Card>
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-center">
                            <i className="pi pi-eye text-3xl text-green-500 dark:text-green-400 mb-2"></i>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {analyticsLoading
                                    ? '...'
                                    : basicMetrics.totalPageViews || 0}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Páginas Vistas
                            </p>
                        </div>
                    </Card>
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-center">
                            <i className="pi pi-chart-line text-3xl text-orange-500 dark:text-orange-400 mb-2"></i>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {analyticsLoading
                                    ? '...'
                                    : basicMetrics.bounceRate || '0%'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Tasa de Rebote
                            </p>
                        </div>
                    </Card>
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-center">
                            <i className="pi pi-box text-3xl text-purple-500 dark:text-purple-400 mb-2"></i>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                {recentProducts.length}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Productos
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card
                        title="Visitantes por Día"
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        {analyticsLoading ? (
                            <div className="flex items-center justify-center h-80">
                                <i className="pi pi-spin pi-spinner text-2xl text-blue-600 dark:text-blue-400"></i>
                            </div>
                        ) : (
                            <div className="w-full h-80">
                                <Chart
                                    type="line"
                                    data={analyticsChartData.visitorsData || {}}
                                    options={chartOptions}
                                    height="350px"
                                    width="100%"
                                />
                            </div>
                        )}
                    </Card>
                    <Card
                        title="Páginas Más Visitadas"
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        {analyticsLoading ? (
                            <div className="flex items-center justify-center h-80">
                                <i className="pi pi-spin pi-spinner text-2xl text-blue-600 dark:text-blue-400"></i>
                            </div>
                        ) : (
                            <div className="w-full h-80">
                                <Chart
                                    type="doughnut"
                                    data={
                                        analyticsChartData.pageViewsData || {}
                                    }
                                    options={chartOptions}
                                    height="350px"
                                    width="100%"
                                />
                            </div>
                        )}
                    </Card>
                </div>

                {/* Recent Products */}
                <Card
                    title="Productos Recientes"
                    className="mb-8 dark:bg-gray-800 dark:border-gray-700"
                >
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
                    <Card
                        title="Verificación de Imágenes"
                        className="mb-8 dark:bg-gray-800 dark:border-gray-700"
                    >
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
            </AdminLayout>
        </ProtectedRoute>
    );
}

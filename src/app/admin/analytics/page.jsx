'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function AdminAnalytics() {
    const { user } = useAuth();
    const router = useRouter();
    const { isDarkMode } = useThemeToggle();
    const [timeRange, setTimeRange] = useState('7d');
    const [mounted, setMounted] = useState(false);

    const timeRangeOptions = [
        { label: 'Últimos 7 días', value: '7d' },
        { label: 'Últimos 30 días', value: '30d' },
        { label: 'Últimos 90 días', value: '90d' },
        { label: 'Este año', value: '1y' },
    ];

    const {
        data,
        loading,
        error,
        refreshData,
        formatChartData,
        formatBasicMetrics,
    } = useAnalytics(timeRange);

    const chartData = formatChartData();
    const basicMetrics = formatBasicMetrics();

    useEffect(() => {
        setMounted(true);
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            legend: {
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

    const pieChartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: isDarkMode ? '#e5e7eb' : '#495057',
                },
            },
        },
    };

    if (!mounted) {
        return null;
    }

    return (
        <ProtectedRoute>
            <AdminLayout
                title="Analytics y Métricas"
                subtitle="Análisis detallado del rendimiento del sitio"
                showBackButton={true}
                backUrl="/admin/dashboard"
            >
                {/* Header Controls */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <Dropdown
                            value={timeRange}
                            options={timeRangeOptions}
                            onChange={(e) => setTimeRange(e.value)}
                            placeholder="Seleccionar período"
                            className="w-48"
                        />
                        <Button
                            label="Actualizar"
                            icon="pi pi-refresh"
                            severity="danger"
                            loading={loading}
                            onClick={refreshData}
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <i className="pi pi-eye text-blue-600 dark:text-blue-400 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Visitantes Únicos
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {loading
                                        ? '...'
                                        : basicMetrics.totalUsers || '0'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                                <i className="pi pi-globe text-green-600 dark:text-green-400 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Páginas Vistas
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {loading
                                        ? '...'
                                        : basicMetrics.totalPageViews || '0'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                                <i className="pi pi-clock text-yellow-600 dark:text-yellow-400 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Tiempo Promedio
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {loading
                                        ? '...'
                                        : basicMetrics.avgSessionDuration ||
                                          '0m 0s'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <i className="pi pi-percentage text-purple-600 dark:text-purple-400 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Tasa de Rebote
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {loading
                                        ? '...'
                                        : basicMetrics.bounceRate || '0%'}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card
                        title="Visitantes por Día"
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <i className="pi pi-spin pi-spinner text-2xl text-blue-600 dark:text-blue-400"></i>
                            </div>
                        ) : (
                            <div className="w-full h-80">
                                <Chart
                                    type="line"
                                    data={chartData.visitorsData || {}}
                                    options={chartOptions}
                                    height="350px"
                                />
                            </div>
                        )}
                    </Card>

                    <Card
                        title="Páginas Más Visitadas"
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <i className="pi pi-spin pi-spinner text-2xl text-blue-600 dark:text-blue-400"></i>
                            </div>
                        ) : (
                            <div className="w-full h-80">
                                <Chart
                                    type="doughnut"
                                    data={chartData.pageViewsData || {}}
                                    options={pieChartOptions}
                                    height="350px"
                                    width="100%"
                                />
                            </div>
                        )}
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card
                        title="Fuentes de Tráfico"
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <i className="pi pi-spin pi-spinner text-2xl text-blue-600 dark:text-blue-400"></i>
                            </div>
                        ) : (
                            <div className="w-full h-80">
                                <Chart
                                    type="bar"
                                    data={chartData.trafficData || {}}
                                    options={chartOptions}
                                    height="350px"
                                    width="100%"
                                />
                            </div>
                        )}
                    </Card>

                    <Card
                        title="Dispositivos de Acceso"
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <i className="pi pi-spin pi-spinner text-2xl text-blue-600 dark:text-blue-400"></i>
                            </div>
                        ) : (
                            <div className="w-full h-80">
                                <Chart
                                    type="pie"
                                    data={chartData.deviceData || {}}
                                    options={pieChartOptions}
                                    height="350px"
                                    width="100%"
                                />
                            </div>
                        )}
                    </Card>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card
                        title="Fuentes de Tráfico"
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center h-32">
                                <i className="pi pi-spin pi-spinner text-xl text-blue-600 dark:text-blue-400"></i>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {data?.trafficSources
                                    ?.slice(0, 4)
                                    .map((source, index) => {
                                        const totalSessions =
                                            data.trafficSources.reduce(
                                                (sum, s) => sum + s.sessions,
                                                0
                                            );
                                        const percentage =
                                            totalSessions > 0
                                                ? (
                                                      (source.sessions /
                                                          totalSessions) *
                                                      100
                                                  ).toFixed(1)
                                                : 0;

                                        const sourceName =
                                            source.source === 'Organic Search'
                                                ? 'Google'
                                                : source.source === 'Direct'
                                                ? 'Directo'
                                                : source.source === 'Social'
                                                ? 'Redes Sociales'
                                                : source.source === 'Referral'
                                                ? 'Referencias'
                                                : source.source;

                                        return (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {sourceName}
                                                </span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {percentage}%
                                                </span>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </Card>

                    <Card
                        title="Páginas Más Visitadas"
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center h-32">
                                <i className="pi pi-spin pi-spinner text-xl text-blue-600 dark:text-blue-400"></i>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {data?.topPages
                                    ?.slice(0, 4)
                                    .map((page, index) => {
                                        const pageName =
                                            page.path === '/'
                                                ? 'Inicio'
                                                : page.path === '/productos'
                                                ? 'Productos'
                                                : page.path === '/contacto'
                                                ? 'Contacto'
                                                : page.path ===
                                                  '/sobre-nosotros'
                                                ? 'Sobre Nosotros'
                                                : page.path === '/admin'
                                                ? 'Admin'
                                                : page.path;

                                        return (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {pageName}
                                                </span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {page.views.toLocaleString()}{' '}
                                                    vistas
                                                </span>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </Card>

                    <Card
                        title="Rendimiento Web"
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    LCP (Largest Contentful Paint)
                                </span>
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    1.2s
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    FID (First Input Delay)
                                </span>
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    45ms
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    CLS (Cumulative Layout Shift)
                                </span>
                                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                                    0.08
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    TTFB (Time to First Byte)
                                </span>
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    180ms
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </AdminLayout>
        </ProtectedRoute>
    );
}

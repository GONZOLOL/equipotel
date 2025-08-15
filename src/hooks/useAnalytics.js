import { useState, useEffect } from 'react';

export const useAnalytics = (timeRange = '7d') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAnalyticsData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/analytics?dateRange=${timeRange}`
            );
            const result = await response.json();

            if (result.success) {
                setData(result.data);
            } else {
                setData(null);
                setError(result.message);
            }
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalyticsData();
    }, [timeRange]);

    const refreshData = () => {
        fetchAnalyticsData();
    };

    // Formatear datos para las gráficas
    const formatChartData = () => {
        if (!data) return {};

        // Datos de visitantes diarios
        const visitorsData = {
            labels: data.dailyVisitors.map((item) => {
                const date = new Date(item.date);
                return date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                });
            }),
            datasets: [
                {
                    label: 'Visitantes',
                    data: data.dailyVisitors.map((item) => item.visitors),
                    fill: false,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                },
            ],
        };

        // Datos de páginas más visitadas
        const pageViewsData = {
            labels: data.topPages.map((item) => {
                const path =
                    item.path === '/'
                        ? 'Inicio'
                        : item.path === '/productos'
                        ? 'Productos'
                        : item.path === '/contacto'
                        ? 'Contacto'
                        : item.path === '/sobre-nosotros'
                        ? 'Sobre Nosotros'
                        : item.path === '/admin'
                        ? 'Admin'
                        : item.path;
                return path;
            }),
            datasets: [
                {
                    data: data.topPages.map((item) => item.views),
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                        '#ef4444',
                    ],
                },
            ],
        };

        // Datos de dispositivos
        const deviceData = {
            labels: data.devices.map((item) => {
                const device =
                    item.device === 'desktop'
                        ? 'Desktop'
                        : item.device === 'mobile'
                        ? 'Mobile'
                        : item.device === 'tablet'
                        ? 'Tablet'
                        : item.device;
                return device;
            }),
            datasets: [
                {
                    data: data.devices.map((item) => item.users),
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                    borderWidth: 0,
                },
            ],
        };

        // Datos de fuentes de tráfico
        const trafficData = {
            labels: data.trafficSources.map((item) => {
                const source =
                    item.source === 'Organic Search'
                        ? 'Google'
                        : item.source === 'Direct'
                        ? 'Directo'
                        : item.source === 'Social'
                        ? 'Redes Sociales'
                        : item.source === 'Referral'
                        ? 'Referencias'
                        : item.source;
                return source;
            }),
            datasets: [
                {
                    label: 'Sesiones',
                    data: data.trafficSources.map((item) => item.sessions),
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                    ],
                    borderColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
                    borderWidth: 1,
                },
            ],
        };

        return {
            visitorsData,
            pageViewsData,
            deviceData,
            trafficData,
        };
    };

    // Formatear métricas básicas
    const formatBasicMetrics = () => {
        if (!data?.basicMetrics) return {};

        const { totalUsers, totalPageViews, avgSessionDuration, bounceRate } =
            data.basicMetrics;

        // Formatear duración de sesión
        const formatDuration = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.round(seconds % 60);
            return `${minutes}m ${remainingSeconds}s`;
        };

        return {
            totalUsers: totalUsers.toLocaleString(),
            totalPageViews: totalPageViews.toLocaleString(),
            avgSessionDuration: formatDuration(avgSessionDuration),
            bounceRate: bounceRate.toFixed(1) + '%',
        };
    };

    return {
        data,
        loading,
        error,
        refreshData,
        formatChartData,
        formatBasicMetrics,
    };
};

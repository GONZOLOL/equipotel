import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Inicializar el cliente de Google Analytics
const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || './google-analytics-key.json',
});

const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID;

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const dateRange = searchParams.get('dateRange') || '7d';
        
        // Calcular fechas basadas en el rango
        const endDate = new Date();
        const startDate = new Date();
        
        switch (dateRange) {
            case '7d':
                startDate.setDate(endDate.getDate() - 7);
                break;
            case '30d':
                startDate.setDate(endDate.getDate() - 30);
                break;
            case '90d':
                startDate.setDate(endDate.getDate() - 90);
                break;
            case '1y':
                startDate.setFullYear(endDate.getFullYear() - 1);
                break;
            default:
                startDate.setDate(endDate.getDate() - 7);
        }

        // Formatear fechas para GA
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];

        // Obtener métricas básicas
        const [basicMetrics] = await analyticsDataClient.runReport({
            property: `properties/${GA_PROPERTY_ID}`,
            dateRanges: [
                {
                    startDate: startDateStr,
                    endDate: endDateStr,
                },
            ],
            metrics: [
                { name: 'activeUsers' },
                { name: 'screenPageViews' },
                { name: 'averageSessionDuration' },
                { name: 'bounceRate' },
            ],
        });

        // Obtener visitantes por día
        const [dailyVisitors] = await analyticsDataClient.runReport({
            property: `properties/${GA_PROPERTY_ID}`,
            dateRanges: [
                {
                    startDate: startDateStr,
                    endDate: endDateStr,
                },
            ],
            dimensions: [{ name: 'date' }],
            metrics: [{ name: 'activeUsers' }],
            orderBys: [{ dimension: { dimensionName: 'date' } }],
        });

        // Obtener páginas más visitadas
        const [topPages] = await analyticsDataClient.runReport({
            property: `properties/${GA_PROPERTY_ID}`,
            dateRanges: [
                {
                    startDate: startDateStr,
                    endDate: endDateStr,
                },
            ],
            dimensions: [{ name: 'pagePath' }],
            metrics: [{ name: 'screenPageViews' }],
            orderBys: [
                {
                    metric: { metricName: 'screenPageViews' },
                    desc: true,
                },
            ],
            limit: 5,
        });

        // Obtener dispositivos
        const [deviceData] = await analyticsDataClient.runReport({
            property: `properties/${GA_PROPERTY_ID}`,
            dateRanges: [
                {
                    startDate: startDateStr,
                    endDate: endDateStr,
                },
            ],
            dimensions: [{ name: 'deviceCategory' }],
            metrics: [{ name: 'activeUsers' }],
        });

        // Obtener fuentes de tráfico
        const [trafficSources] = await analyticsDataClient.runReport({
            property: `properties/${GA_PROPERTY_ID}`,
            dateRanges: [
                {
                    startDate: startDateStr,
                    endDate: endDateStr,
                },
            ],
            dimensions: [{ name: 'sessionDefaultChannelGroup' }],
            metrics: [{ name: 'sessions' }],
            orderBys: [
                {
                    metric: { metricName: 'sessions' },
                    desc: true,
                },
            ],
        });

        // Procesar datos básicos
        const basicData = basicMetrics.rows?.[0] || {};
        const totalUsers = parseInt(basicData.metricValues?.[0]?.value || '0');
        const totalPageViews = parseInt(basicData.metricValues?.[1]?.value || '0');
        const avgSessionDuration = parseFloat(basicData.metricValues?.[2]?.value || '0');
        const bounceRate = parseFloat(basicData.metricValues?.[3]?.value || '0');

        // Procesar visitantes diarios
        const dailyData = dailyVisitors.rows?.map(row => ({
            date: row.dimensionValues?.[0]?.value || '',
            visitors: parseInt(row.metricValues?.[0]?.value || '0'),
        })) || [];

        // Procesar páginas más visitadas
        const pagesData = topPages.rows?.map(row => ({
            path: row.dimensionValues?.[0]?.value || '',
            views: parseInt(row.metricValues?.[0]?.value || '0'),
        })) || [];

        // Procesar datos de dispositivos
        const devicesData = deviceData.rows?.map(row => ({
            device: row.dimensionValues?.[0]?.value || 'unknown',
            users: parseInt(row.metricValues?.[0]?.value || '0'),
        })) || [];

        // Procesar fuentes de tráfico
        const sourcesData = trafficSources.rows?.map(row => ({
            source: row.dimensionValues?.[0]?.value || 'unknown',
            sessions: parseInt(row.metricValues?.[0]?.value || '0'),
        })) || [];

        return NextResponse.json({
            success: true,
            data: {
                basicMetrics: {
                    totalUsers,
                    totalPageViews,
                    avgSessionDuration,
                    bounceRate,
                },
                dailyVisitors: dailyData,
                topPages: pagesData,
                devices: devicesData,
                trafficSources: sourcesData,
                dateRange: {
                    start: startDateStr,
                    end: endDateStr,
                },
            },
        });

    } catch (error) {
        console.error('Error fetching analytics data:', error);
        
        // Si no hay configuración de GA, devolver error
        if (error.message?.includes('credentials') || !GA_PROPERTY_ID) {
            return NextResponse.json({
                success: false,
                message: 'Google Analytics no configurado. Por favor, configura las credenciales según la documentación.',
                error: 'CONFIGURATION_REQUIRED',
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            message: 'Error al obtener datos de analytics',
            error: error.message,
        }, { status: 500 });
    }
}



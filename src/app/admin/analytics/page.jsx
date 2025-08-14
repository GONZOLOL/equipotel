'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminAnalytics() {
  const { user } = useAuth();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  const timeRangeOptions = [
    { label: 'Últimos 7 días', value: '7d' },
    { label: 'Últimos 30 días', value: '30d' },
    { label: 'Últimos 90 días', value: '90d' },
    { label: 'Este año', value: '1y' }
  ];

  // Datos de ejemplo para las gráficas
  const [visitorsData] = useState({
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Visitantes',
        data: [120, 190, 300, 500, 200, 300, 450],
        fill: false,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  });

  const [pageViewsData] = useState({
    labels: ['/', '/productos', '/contacto', '/sobre-nosotros', '/admin'],
    datasets: [
      {
        data: [300, 150, 100, 80, 50],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#8b5cf6',
          '#ef4444'
        ]
      }
    ]
  });

  const [conversionData] = useState({
    labels: ['Consultas', 'Llamadas', 'Emails', 'Formularios'],
    datasets: [
      {
        label: 'Conversiones',
        data: [65, 59, 80, 81],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
        borderColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#8b5cf6'
        ],
        borderWidth: 1
      }
    ]
  });

  const [deviceData] = useState({
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [60, 35, 5],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 0
      }
    ]
  });

  const chartOptions = {
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
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    }
  };

  // Función para cargar datos reales de Google Analytics
  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      // Aquí iría la integración real con Google Analytics API
      // Por ahora usamos datos de ejemplo
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

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
                    Analytics y Métricas
                  </h1>
                  <p className="text-sm text-gray-600">
                    Análisis detallado del rendimiento del sitio
                  </p>
                </div>
              </div>
              
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
                  severity="primary"
                  loading={loading}
                  onClick={loadAnalyticsData}
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
                  <i className="pi pi-eye text-blue-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Visitantes Únicos</p>
                  <p className="text-2xl font-bold text-gray-900">2,156</p>
                  <p className="text-xs text-green-600">+12.5% vs mes anterior</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <i className="pi pi-globe text-green-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Páginas Vistas</p>
                  <p className="text-2xl font-bold text-gray-900">8,432</p>
                  <p className="text-xs text-green-600">+8.2% vs mes anterior</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
                  <i className="pi pi-clock text-yellow-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">2m 34s</p>
                  <p className="text-xs text-red-600">-3.1% vs mes anterior</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                  <i className="pi pi-percentage text-purple-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tasa de Rebote</p>
                  <p className="text-2xl font-bold text-gray-900">42.3%</p>
                  <p className="text-xs text-green-600">-2.1% vs mes anterior</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card title="Visitantes por Día">
              <Chart 
                type="line" 
                data={visitorsData} 
                options={chartOptions}
                height="300px"
              />
            </Card>

            <Card title="Páginas Más Visitadas">
              <Chart 
                type="doughnut" 
                data={pageViewsData} 
                options={pieChartOptions}
                height="300px"
              />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card title="Conversiones por Canal">
              <Chart 
                type="bar" 
                data={conversionData} 
                options={chartOptions}
                height="300px"
              />
            </Card>

            <Card title="Dispositivos de Acceso">
              <Chart 
                type="pie" 
                data={deviceData} 
                options={pieChartOptions}
                height="300px"
              />
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Fuentes de Tráfico">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Google</span>
                  <span className="font-semibold">45.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Directo</span>
                  <span className="font-semibold">28.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Redes Sociales</span>
                  <span className="font-semibold">15.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Otros</span>
                  <span className="font-semibold">10.8%</span>
                </div>
              </div>
            </Card>

            <Card title="Productos Más Vistos">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Caja Fuerte Serie RA</span>
                  <span className="font-semibold">234 vistas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Armario Acorazado RS</span>
                  <span className="font-semibold">189 vistas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sistema de Anclaje</span>
                  <span className="font-semibold">156 vistas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Caja Segunda Mano</span>
                  <span className="font-semibold">98 vistas</span>
                </div>
              </div>
            </Card>

            <Card title="Rendimiento Web">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">LCP (Largest Contentful Paint)</span>
                  <span className="font-semibold text-green-600">1.2s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">FID (First Input Delay)</span>
                  <span className="font-semibold text-green-600">45ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CLS (Cumulative Layout Shift)</span>
                  <span className="font-semibold text-yellow-600">0.08</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">TTFB (Time to First Byte)</span>
                  <span className="font-semibold text-green-600">180ms</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

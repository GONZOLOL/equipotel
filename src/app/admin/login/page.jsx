'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full">
                <i className="pi pi-shield text-white text-2xl"></i>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-600">
              Inicia sesión para acceder al panel de administración
            </p>
          </div>

          {error && (
            <Message
              severity="error"
              text={error}
              className="mb-4"
            />
          )}

          <div className="space-y-4">
            <Button
              label="Iniciar sesión con Google"
              icon="pi pi-google"
              onClick={handleGoogleSignIn}
              loading={loading}
              className="w-full p-3"
              severity="primary"
            />

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Solo usuarios autorizados pueden acceder
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ← Volver al sitio principal
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

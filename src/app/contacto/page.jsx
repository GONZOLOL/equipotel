'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const asuntos = [
    { label: 'Consulta General', value: 'consulta-general' },
    { label: 'Presupuesto', value: 'presupuesto' },
    { label: 'Instalación', value: 'instalacion' },
    { label: 'Mantenimiento', value: 'mantenimiento' },
    { label: 'Reparación', value: 'reparacion' },
    { label: 'Otro', value: 'otro' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDropdownChange = (e) => {
    setFormData(prev => ({
      ...prev,
      asunto: e.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      setLoading(false);
      setMessage({
        severity: 'success',
        summary: '¡Mensaje enviado!',
        detail: 'Gracias por contactar con nosotros. Te responderemos en breve.',
        life: 5000
      });
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: 'pi pi-map-marker',
      title: 'Dirección',
      content: 'Málaga, España',
      description: 'Servicio en toda la provincia de Málaga'
    },
    {
      icon: 'pi pi-phone',
      title: 'Teléfono',
      content: '+555 136 997 334',
      description: 'Lunes a Viernes: 9:00 - 18:00'
    },
    {
      icon: 'pi pi-envelope',
      title: 'Email',
      content: 'info@equipotel.es',
      description: 'Respuesta en menos de 24 horas'
    },
    {
      icon: 'pi pi-clock',
      title: 'Horario',
      content: 'Lun - Vie: 9:00 - 18:00',
      description: 'Sábados: 9:00 - 14:00'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 pt-32">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contacto</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Necesitas asesoramiento sobre nuestros productos de seguridad? 
            Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Información de contacto */}
          <div>
            <Card title="Información de Contacto" className="h-full">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <i className={`${info.icon} text-blue-600 text-xl`}></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-lg text-gray-700 mb-1">{info.content}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Formulario de contacto */}
          <div>
            <Card title="Envíanos un Mensaje">
              {message && (
                <Message 
                  severity={message.severity} 
                  text={message.detail}
                  className="mb-4"
                />
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <InputText
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <InputText
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <InputText
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <Dropdown
                      id="asunto"
                      value={formData.asunto}
                      options={asuntos}
                      onChange={handleDropdownChange}
                      placeholder="Selecciona un asunto"
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <InputTextarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full"
                    placeholder="Cuéntanos qué necesitas..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  label="Enviar Mensaje"
                  icon="pi pi-send"
                  loading={loading}
                  className="w-full"
                  size="large"
                />
              </form>
            </Card>
          </div>
        </div>

        {/* Mapa */}
        <Card title="Nuestra Ubicación" className="mb-8">
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <i className="pi pi-map text-6xl text-gray-400 mb-4 block"></i>
              <p className="text-gray-600 text-lg">Mapa interactivo</p>
              <p className="text-gray-500">Málaga, España</p>
              <Button 
                label="Ver en Google Maps" 
                severity="secondary" 
                outlined 
                className="mt-4"
                onClick={() => window.open('https://maps.google.com/?q=Malaga,Spain', '_blank')}
              />
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card title="Preguntas Frecuentes">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ¿Ofrecen servicio de instalación?
              </h3>
              <p className="text-gray-600">
                Sí, contamos con un equipo especializado en la instalación de cajas fuertes 
                y armarios acorazados. Ofrecemos servicio de instalación en toda la provincia de Málaga.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ¿Qué garantía ofrecen sus productos?
              </h3>
              <p className="text-gray-600">
                Todos nuestros productos incluyen garantía de fábrica. Las cajas fuertes 
                certificadas incluyen garantías de 2 a 5 años según el modelo.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ¿Pueden asesorarme sobre qué producto elegir?
              </h3>
              <p className="text-gray-600">
                Por supuesto. Nuestros expertos te ayudarán a elegir la mejor solución 
                según tus necesidades específicas y presupuesto.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}

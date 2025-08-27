'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo y descripción */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 mb-4 no-underline"
                        >
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg">
                                <i className="pi pi-shield text-white text-xl"></i>
                            </div>
                            <span className="text-2xl font-bold text-gray-800 dark:text-white">
                                Equipotel
                            </span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
                            Especialistas en cajas fuertes, armarios acorazados
                            y sistemas de seguridad en Málaga. Protegemos lo que
                            más importa desde 2010.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <i className="pi pi-facebook text-white"></i>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <i className="pi pi-instagram text-white"></i>
                            </a>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
                            Enlaces Rápidos
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center"
                                >
                                    <i className="pi pi-home mr-2 text-blue-500"></i>
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/productos"
                                    className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center"
                                >
                                    <i className="pi pi-box mr-2 text-blue-500"></i>
                                    Productos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sobre-nosotros"
                                    className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center"
                                >
                                    <i className="pi pi-users mr-2 text-blue-500"></i>
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacto"
                                    className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center"
                                >
                                    <i className="pi pi-envelope mr-2 text-blue-500"></i>
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Servicios */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
                            Nuestros Servicios
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-gray-600 dark:text-gray-200 flex items-center">
                                <i className="pi pi-shield mr-2 text-green-500"></i>
                                Cajas Fuertes
                            </li>
                            <li className="text-gray-600 dark:text-gray-200 flex items-center">
                                <i className="pi pi-building mr-2 text-green-500"></i>
                                Armarios Acorazados
                            </li>
                            <li className="text-gray-600 dark:text-gray-200 flex items-center">
                                <i className="pi pi-link mr-2 text-green-500"></i>
                                Sistemas de Anclaje
                            </li>
                            <li className="text-gray-600 dark:text-gray-200 flex items-center">
                                <i className="pi pi-lock mr-2 text-green-500"></i>
                                Compartimentos de Seguridad
                            </li>
                        </ul>
                    </div>

                    {/* Información de contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
                            Contacto
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="pi pi-phone text-white text-sm"></i>
                                </div>
                                <a
                                    href={process.env.NEXT_PUBLIC_PHONE_NUMBER}
                                    className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    +34 676 20 80 24
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="pi pi-envelope text-white text-sm"></i>
                                </div>
                                <a
                                    href="mailto:info@equipotel.es"
                                    className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    info@equipotel.es
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="pi pi-clock text-white text-sm"></i>
                                </div>
                                <div className="text-gray-600 dark:text-gray-200 text-sm">
                                    Lun - Vie: 9:00 - 18:00
                                    <br />
                                    Sáb: 9:00 - 14:00
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-gray-300 dark:border-gray-600 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-500 dark:text-gray-300 text-sm">
                            © 2024 Equipotel. Todos los derechos reservados.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            Desarrollado por
                            <Link
                                href="https://www.linkedin.com/in/gonzalo-lerda-díez-590ba7178"
                                className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
                            >
                                <span className="text-blue-600 ml-1">
                                    Gonzalo Lerda Diez
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

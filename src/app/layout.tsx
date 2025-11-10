import { Inter } from 'next/font/google';
import './globals.css';
import './custom-theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Equipotel Málaga | Venta e Instalación de Cajas Fuertes',
    description:
        'Venta, instalación, traslado y mantenimiento de cajas fuertes homologadas en Málaga, Costa del Sol y provincia. Servicio urgente 24/7 con técnicos certificados.',
    keywords:
        'cajas fuertes málaga, instalación cajas fuertes, traslado cajas fuertes, mantenimiento cajas fuertes, aperturas urgentes cajas fuertes, costa del sol, equipotel',
    authors: [{ name: 'Equipotel' }],
    creator: 'Equipotel',
    publisher: 'Equipotel',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://equipotel.es'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Equipotel Málaga | Venta e Instalación de Cajas Fuertes homologadas',
        description:
            'Especialistas en cajas fuertes certificadas, anclajes UNE, aperturas urgentes y mantenimiento en Málaga y la Costa del Sol.',
        url: 'https://equipotel.es',
        siteName: 'Equipotel',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Equipotel - Cajas Fuertes y Seguridad',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Equipotel Málaga | Cajas Fuertes homologadas',
        description:
            'Venta, instalación y traslado de cajas fuertes en Málaga con servicio técnico 24/7.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className="h-full w-full" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#3b82f6" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=5"
                />

                {/* Google Analytics */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
            `,
                    }}
                />

                {/* Facebook Pixel */}
                {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
                        }}
                    />
                )}

                {/* Performance Monitoring */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              // Performance monitoring
              window.addEventListener('load', function() {
                if ('performance' in window) {
                  const perfData = performance.getEntriesByType('navigation')[0];
                  const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                  
                  // Send to analytics
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                      name: 'load',
                      value: Math.round(loadTime)
                    });
                  }
                }
              });
            `,
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    // Detectar tema guardado o preferencia del sistema
                                    const savedTheme = localStorage.getItem('theme');
                                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
                                    
                                    // Aplicar tema inmediatamente antes de que se renderice nada
                                    const html = document.documentElement;
                                    const body = document.body;
                                    
                                    if (isDark) {
                                        html.classList.add('dark');
                                        body.classList.add('dark');
                                        html.style.colorScheme = 'dark';
                                        html.style.setProperty('--background-start-rgb', '17, 24, 39');
                                        html.style.setProperty('--background-end-rgb', '31, 41, 55');
                                        html.style.setProperty('--foreground-rgb', '255, 255, 255');
                                    } else {
                                        html.classList.remove('dark');
                                        body.classList.remove('dark');
                                        html.style.colorScheme = 'light';
                                        html.style.setProperty('--background-start-rgb', '255, 255, 255');
                                        html.style.setProperty('--background-end-rgb', '249, 250, 251');
                                        html.style.setProperty('--foreground-rgb', '17, 24, 39');
                                    }
                                    
                                    // Marcar como tema aplicado inmediatamente
                                    html.classList.add('theme-applied');
                                    
                                    // Aplicar PrimeReact theme en segundo plano
                                    let linkElement = document.getElementById('prime-react-theme');
                                    if (!linkElement) {
                                        linkElement = document.createElement('link');
                                        linkElement.id = 'prime-react-theme';
                                        linkElement.rel = 'stylesheet';
                                        document.head.appendChild(linkElement);
                                    }
                                    
                                    const themeUrl = isDark ? '/themes/lara-dark-blue/theme.css' : '/themes/lara-light-blue/theme.css';
                                    linkElement.href = themeUrl;
                                } catch (e) {
                                    console.warn('Error applying theme:', e);
                                    // En caso de error, mostrar contenido de todas formas
                                    document.documentElement.classList.add('theme-applied');
                                }
                            })();
                        `,
                    }}
                />
            </head>
            <body
                className={`${inter.className} h-full w-full min-h-screen overflow-x-hidden`}
            >
                <div className="min-h-screen w-full flex flex-col">
                    <ThemeProvider>
                        <AuthProvider>
                            <ToastProvider>
                                <Navbar />
                                <main className="flex-1">{children}</main>
                                <Footer />
                            </ToastProvider>
                        </AuthProvider>
                    </ThemeProvider>
                </div>
            </body>
        </html>
    );
}

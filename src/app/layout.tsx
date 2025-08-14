import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Equipotel - Cajas Fuertes y Sistemas de Seguridad en Málaga',
    description:
        'Especialistas en cajas fuertes, armarios acorazados y sistemas de seguridad en Málaga. Protegemos lo que más importa desde 2010.',
    keywords:
        'cajas fuertes, armarios acorazados, seguridad, Málaga, equipotel, sistemas de anclaje',
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
        title: 'Equipotel - Cajas Fuertes y Sistemas de Seguridad en Málaga',
        description:
            'Especialistas en cajas fuertes, armarios acorazados y sistemas de seguridad en Málaga.',
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
        title: 'Equipotel - Cajas Fuertes y Sistemas de Seguridad en Málaga',
        description:
            'Especialistas en cajas fuertes, armarios acorazados y sistemas de seguridad en Málaga.',
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
        <html lang="es">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#3b82f6" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
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
            </head>
            <body className={inter.className}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}

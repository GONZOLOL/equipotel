import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// PrimeReact CSS
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Analytics
import { GA_TRACKING_ID, FB_PIXEL_ID } from '@/lib/analytics';
import { initPerformanceMonitoring } from '@/lib/performance';
import { reportWebVitalsToAnalytics } from './web-vitals';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Equipotel - Cajas Fuertes y Armarios Acorazados en Málaga',
    description:
        'Especialistas en cajas fuertes, armarios acorazados, sistemas de anclaje y compartimentos de seguridad en Málaga. Productos certificados con instalación profesional.',
    keywords:
        'cajas fuertes, armarios acorazados, seguridad, Málaga, sistemas anclaje, compartimentos seguridad',
    authors: [{ name: 'Equipotel' }],
    creator: 'Equipotel',
    publisher: 'Equipotel',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || 'https://equipotel.es'
    ),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Equipotel - Cajas Fuertes y Armarios Acorazados',
        description:
            'Especialistas en cajas fuertes, armarios acorazados, sistemas de anclaje y compartimentos de seguridad en Málaga',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://equipotel.es',
        siteName: 'Equipotel',
        images: [
            {
                url: '/images/og-image.jpg',
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
        title: 'Equipotel - Cajas Fuertes y Armarios Acorazados',
        description:
            'Especialistas en cajas fuertes, armarios acorazados, sistemas de anclaje y compartimentos de seguridad en Málaga',
        images: ['/images/og-image.jpg'],
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
        google: 'tu-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                {GA_TRACKING_ID && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
                            }}
                        />
                    </>
                )}

                {/* Facebook Pixel */}
                {FB_PIXEL_ID && (
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
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
                        }}
                    />
                )}

                {/* Performance Monitoring */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                ${initPerformanceMonitoring.toString()}
                initPerformanceMonitoring();
              })();
            `,
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                ${reportWebVitalsToAnalytics.toString()}
                reportWebVitalsToAnalytics();
              })();
            `,
                    }}
                />
            </body>
        </html>
    );
}

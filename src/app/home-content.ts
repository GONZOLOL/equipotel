const siteUrl = 'https://equipotel.es';

export const services = [
    {
        title: 'Venta e instalación de cajas fuertes',
        description:
            'Suministro, transporte e instalación certificada de cajas fuertes homologadas para hogar, banca y empresa en toda Málaga.',
        url: `${siteUrl}/cajas-fuertes-malaga`,
    },
    {
        title: 'Traslado y anclaje profesional',
        description:
            'Movimientos especiales con medios propios, cálculo estructural y anclaje según normativa UNE EN-1143.',
        url: `${siteUrl}/cajas-fuertes-malaga#traslado`,
    },
    {
        title: 'Mantenimiento y aperturas programadas',
        description:
            'Mantenimiento preventivo, auditorías de seguridad y aperturas planificadas con técnicos certificados en cajas fuertes.',
        url: `${siteUrl}/mantenimiento-cajas-fuertes`,
    },
] as const;

export const highlights = [
    'Materiales de grado industrial y controles redundantes.',
    'Integración con alarmas, CCTV y monitorización remota.',
    'Auditorías periódicas y soporte experto a demanda.',
] as const;

export const coverageAreas = [
    {
        name: 'Málaga capital',
        detail: 'Centro Histórico, Soho, Limonar, Teatinos, Carretera de Cádiz y polígonos industriales.',
    },
    {
        name: 'Costa del Sol',
        detail: 'Torremolinos, Benalmádena, Fuengirola, Marbella, Estepona y urbanizaciones de la A-7.',
    },
    {
        name: 'Interior y Axarquía',
        detail: 'Rincón de la Victoria, Vélez-Málaga, Antequera, Ronda, Coin, Alhaurín el Grande y municipios cercanos.',
    },
    {
        name: 'Resto de Andalucía',
        detail: 'Sevilla, Granada, Córdoba, Jaén, Almería y Cádiz mediante desplazamientos programados con planificación logística previa.',
    },
] as const;

export const faqs = [
    {
        question: '¿Cuál es el plazo habitual para instalar una caja fuerte?',
        answer: 'Nuestro equipo técnico coordina la visita en un plazo de 24-48 horas para valorar el trabajo y, una vez aprobado el presupuesto, agendar la instalación en la fecha que mejor se adapte a tu disponibilidad.',
    },
    {
        question: '¿Qué normativa siguen vuestras instalaciones?',
        answer: 'Trabajamos con cajas fuertes homologadas según la norma UNE EN-1143-1 y aplicamos protocolos de anclaje certificados, con informes de fijación y pruebas de resistencia.',
    },
    {
        question: '¿Ofrecéis visitas técnicas sin coste?',
        answer: 'Realizamos auditorías y visitas técnicas gratuitas para valorar ubicación, cálculo estructural y logística de transporte antes de presentar la propuesta definitiva.',
    },
] as const;

export const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'ProfessionalService',
            '@id': `${siteUrl}/#localbusiness`,
            name: 'Equipotel Málaga',
            image: `${siteUrl}/src/logo.png`,
            url: siteUrl,
            telephone: '+34 676 20 80 24',
            email: 'info@equipotel.es',
            priceRange: '€€€',
            description:
                'Venta, instalación y mantenimiento de cajas fuertes homologadas en Málaga y provincia.',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Málaga',
                postalCode: '29004',
                addressRegion: 'Andalucía',
                addressCountry: 'ES',
            },
            areaServed: [
                { '@type': 'City', name: 'Málaga' },
                { '@type': 'City', name: 'Marbella' },
                { '@type': 'City', name: 'Fuengirola' },
                { '@type': 'City', name: 'Vélez-Málaga' },
                { '@type': 'State', name: 'Andalucía' },
            ],
            sameAs: [
                'https://www.facebook.com/equipotel',
                'https://www.linkedin.com/company/equipotel',
            ],
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Inicio',
                    item: siteUrl,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Cajas fuertes en Málaga',
                    item: `${siteUrl}/cajas-fuertes-malaga`,
                },
            ],
        },
        ...services.map((service) => ({
            '@type': 'Service',
            name: service.title,
            description: service.description,
            areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                    '@type': 'GeoCoordinates',
                    latitude: 36.7213,
                    longitude: -4.4217,
                },
                geoRadius: 50000,
            },
            provider: {
                '@type': 'Organization',
                name: 'Equipotel Málaga',
                url: siteUrl,
            },
            url: service.url,
        })),
        {
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ question, answer }) => ({
                '@type': 'Question',
                name: question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: answer,
                },
            })),
        },
    ],
} as const;

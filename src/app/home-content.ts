export const services = [
    {
        title: 'Venta e instalación de cajas fuertes',
        description:
            'Suministro, transporte e instalación certificada de cajas fuertes homologadas para hogar, banca y empresa en toda Málaga.',
    },
    {
        title: 'Traslado y anclaje profesional',
        description:
            'Movimientos especiales con medios propios, cálculo estructural y anclaje según normativa UNE EN-1143.',
    },
    {
        title: 'Mantenimiento y aperturas urgentes',
        description:
            'Reparaciones, auditorías, duplicado de combinaciones y aperturas 24/7 con cerrajeros de seguridad cualificados.',
    },
] as const;

export const highlights = [
    'Materiales de grado industrial y controles redundantes.',
    'Integración con alarmas, CCTV y monitorización remota.',
    'Auditorías periódicas y soporte especializado 24/7.',
] as const;

export const coverageAreas = [
    {
        name: 'Málaga capital',
        detail:
            'Centro Histórico, Soho, Limonar, Teatinos, Carretera de Cádiz y polígonos industriales.',
    },
    {
        name: 'Costa del Sol',
        detail:
            'Torremolinos, Benalmádena, Fuengirola, Marbella, Estepona y urbanizaciones de la A-7.',
    },
    {
        name: 'Interior y Axarquía',
        detail:
            'Rincón de la Victoria, Vélez-Málaga, Antequera, Ronda, Coin, Alhaurín el Grande y municipios cercanos.',
    },
] as const;

export const faqs = [
    {
        question: '¿Atendéis urgencias de cajas fuertes en Málaga?',
        answer:
            'Sí. Disponemos de cerrajeros y técnicos de seguridad en guardia las 24 horas para apertura, reparación o cambio de combinaciones en Málaga capital y provincia.',
    },
    {
        question: '¿Qué normativa siguen vuestras instalaciones?',
        answer:
            'Trabajamos con cajas fuertes homologadas según la norma UNE EN-1143-1 y aplicamos protocolos de anclaje certificados, con informes de fijación y pruebas de resistencia.',
    },
    {
        question: '¿Ofrecéis visitas técnicas sin coste?',
        answer:
            'Realizamos auditorías y visitas técnicas gratuitas para valorar ubicación, cálculo estructural y logística de transporte antes de presentar la propuesta definitiva.',
    },
] as const;

export const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'LocalBusiness',
            '@id': 'https://equipotel.es/#localbusiness',
            name: 'Equipotel Málaga',
            image: 'https://equipotel.es/src/logo.png',
            url: 'https://equipotel.es/',
            telephone: '+34 676 20 80 24',
            email: 'info@equipotel.es',
            priceRange: '€€€',
            description:
                'Venta, instalación y mantenimiento de cajas fuertes homologadas en Málaga y provincia.',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Polígono Guadalhorce, Calle Hermanos Lumière 14',
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
            ],
            openingHoursSpecification: [
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                    ],
                    opens: '08:00',
                    closes: '19:00',
                },
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Saturday'],
                    opens: '09:00',
                    closes: '14:00',
                },
            ],
            sameAs: [
                'https://www.facebook.com/equipotel',
                'https://www.linkedin.com/company/equipotel',
            ],
        },
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


import Link from 'next/link';

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Inicio',
                    item: 'https://equipotel.es/',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Cajas fuertes en Málaga',
                    item: 'https://equipotel.es/cajas-fuertes-malaga',
                },
            ],
        },
        {
            '@type': 'Service',
            name: 'Venta e instalación de cajas fuertes en Málaga',
            description:
                'Estudio técnico, suministro, traslado y anclaje certificado de cajas fuertes homologadas en Málaga y Andalucía.',
            provider: {
                '@type': 'Organization',
                name: 'Equipotel Málaga',
                url: 'https://equipotel.es/',
            },
            areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                    '@type': 'GeoCoordinates',
                    latitude: 36.7213,
                    longitude: -4.4217,
                },
                geoRadius: 80000,
            },
        },
    ],
};

const productRanges = [
    {
        title: 'Cajas fuertes para vivienda y negocios',
        description:
            'Modelos empotrados, sobremesa y camuflados con certificaciones UNE EN-1143-1 grado III-V. Opciones ignífugas y biométricas.',
    },
    {
        title: 'Soluciones de alta seguridad para banca y retail',
        description:
            'Cajas de depósito inteligente, cámaras acorazadas modulares y compartimentación con monitorización integrada.',
    },
    {
        title: 'Integración con sistemas electrónicos',
        description:
            'Conexión con sistemas de alarma, CCTV y control horario. Software de auditoría para cajas inteligentes y control de accesos.',
    },
];

const processSteps = [
    {
        title: 'Auditoría inicial',
        description:
            'Visitamos el emplazamiento para evaluar estructura, accesos y requisitos normativos. Generamos informe técnico y plan logístico.',
    },
    {
        title: 'Traslado y anclaje',
        description:
            'Gestionamos medios especiales (grúas, plataformas, permisos municipales) y ejecutamos el anclaje conforme a UNE EN-1143-1.',
    },
    {
        title: 'Puesta en marcha y documentación',
        description:
            'Configuramos combinaciones, capacitamos al personal autorizado y entregamos documentación de instalación y mantenimiento.',
    },
];

const relocationFaqs = [
    {
        question: '¿Qué datos necesitáis para preparar un traslado?',
        answer: 'Necesitamos peso aproximado de la caja fuerte, dimensiones, planta de origen/destino, características de los accesos y fechas preferentes. Con esta información elaboramos una propuesta y plan logístico.',
    },
    {
        question: '¿Emitís certificados de anclaje?',
        answer: 'Sí. Tras cada instalación entregamos certificado de fijación conforme a normativa UNE EN-1143-1, detallando medios utilizados, fijaciones y pruebas de resistencia.',
    },
    {
        question: '¿Hasta qué peso de cajas fuertes manipuláis?',
        answer: 'Contamos con medios para manipular cajas fuertes de hasta 4 toneladas. Para pesos superiores planificamos soluciones personalizadas con medios de elevación adicionales.',
    },
];

export default function CajasFuertesMalagaPage() {
    return (
        <div className="home-shell pt-16 min-h-screen text-gray-900 transition-colors dark:text-white">
            <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-12 md:pt-20">
                <div className="space-y-6 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">
                        Venta e instalación de cajas fuertes en Málaga
                    </h1>
                    <p className="text-lg text-foreground-muted">
                        Diseñamos e implantamos soluciones de seguridad física
                        para vivienda, banca y empresa. Nos encargamos del
                        estudio estructural, suministro, transporte y anclaje
                        certificado en Málaga capital, Costa del Sol y el resto
                        de Andalucía.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/contacto"
                            className="rounded-xl bg-[#e11d48] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            Solicitar estudio
                        </Link>
                        <Link
                            href="/productos"
                            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                        >
                            Ver modelos disponibles
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
                    <h2 className="text-3xl font-bold text-center md:text-left">
                        Soluciones que combinan seguridad y funcionalidad
                    </h2>
                    <p className="mt-3 max-w-3xl text-foreground-muted">
                        Trabajamos con fabricantes europeos certificados y
                        adaptamos cada proyecto a la actividad del cliente
                        (retail, joyería, banca, logística o residencial).
                        Abarcamos desde cajas pequeñas empotradas hasta cámaras
                        acorazadas modulares.
                    </p>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {productRanges.map(({ title, description }) => (
                            <article
                                key={title}
                                className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10"
                            >
                                <h3 className="text-lg font-semibold text-foreground dark:text-white">
                                    {title}
                                </h3>
                                <p className="mt-3 text-foreground-muted">
                                    {description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="traslado"
                className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-white/5"
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
                        <div className="lg:w-2/5">
                            <h2 className="text-3xl font-bold text-foreground">
                                Traslado y anclaje certificado
                            </h2>
                            <p className="mt-4 text-foreground-muted">
                                Nos encargamos de la logística integral: estudio
                                de accesos, permisos municipales, medios de
                                elevación y fijaciones conforme a normativa UNE
                                EN-1143-1. El proceso se planifica con
                                antelación y se ejecuta con personal propio
                                especializado.
                            </p>
                        </div>
                        <div className="grid flex-1 gap-6 md:grid-cols-3">
                            {processSteps.map(({ title, description }) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 text-foreground-muted shadow-sm dark:border-white/10 dark:bg-white/10"
                                >
                                    <h3 className="text-base font-semibold text-foreground dark:text-white">
                                        {title}
                                    </h3>
                                    <p className="mt-3">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
                    <h2 className="text-3xl font-bold text-center md:text-left">
                        Preguntas frecuentes
                    </h2>
                    <div className="mt-8 space-y-5">
                        {relocationFaqs.map(({ question, answer }) => (
                            <details
                                key={question}
                                className="group rounded-2xl border border-slate-200 bg-white transition dark:border-white/10 dark:bg-white/5"
                            >
                                <summary className="cursor-pointer list-none p-6 text-lg font-semibold text-foreground dark:text-white">
                                    <span className="flex items-center justify-between gap-4">
                                        {question}
                                        <span className="rounded-full bg-[#e11d48]/10 px-2 py-1 text-sm text-[#e11d48] transition group-open:rotate-45">
                                            +
                                        </span>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-foreground-muted">
                                    {answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-lg dark:border-white/10 dark:bg-white/10 md:text-left">
                    <h2 className="text-2xl font-bold text-foreground">
                        Solicita tu estudio personalizado
                    </h2>
                    <p className="mt-3 text-foreground-muted">
                        Cuéntanos qué tipo de caja fuerte necesitas trasladar o
                        instalar y coordinaremos una visita técnica sin
                        compromiso para elaborar el presupuesto.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/contacto"
                            className="inline-flex justify-center rounded-xl bg-[#e11d48] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            Quiero un asesoramiento
                        </Link>
                        <Link
                            href="/productos"
                            className="inline-flex justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                        >
                            Revisar catálogo
                        </Link>
                    </div>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </div>
    );
}

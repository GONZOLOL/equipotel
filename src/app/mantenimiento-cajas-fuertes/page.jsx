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
                    name: 'Mantenimiento de cajas fuertes',
                    item: 'https://equipotel.es/mantenimiento-cajas-fuertes',
                },
            ],
        },
        {
            '@type': 'Service',
            name: 'Mantenimiento de cajas fuertes',
            description:
                'Planes de mantenimiento preventivo, auditorías de seguridad y aperturas programadas de cajas fuertes en Málaga y Andalucía.',
            provider: {
                '@type': 'Organization',
                name: 'Equipotel Málaga',
                url: 'https://equipotel.es/',
            },
            areaServed: {
                '@type': 'State',
                name: 'Andalucía',
            },
        },
    ],
};

const maintenanceServices = [
    {
        title: 'Plan preventivo',
        description:
            'Revisiones periódicas con calibración de cerraduras, comprobación de sensores y verificación de anclajes para evitar incidencias inesperadas.',
    },
    {
        title: 'Ajuste de combinaciones y autorizaciones',
        description:
            'Cambio de combinaciones mecánicas, reseteo de códigos digitales y gestión de autorizaciones siguiendo protocolos internos.',
    },
    {
        title: 'Aperturas programadas y asistencia técnica',
        description:
            'Aperturas controladas con informes, sustitución de componentes y modernización de cerraduras mecánicas a electrónicas.',
    },
];

const maintenanceFaqs = [
    {
        question: '¿Con qué frecuencia se recomienda un mantenimiento?',
        answer: 'Depende del uso y del entorno. Para cajas fuertes domésticas recomendamos una revisión anual, mientras que en entornos bancarios o retail puede ser necesario un plan trimestral.',
    },
    {
        question:
            '¿Podéis asumir mantenimientos de marcas que no habéis suministrado?',
        answer: 'Sí. Trabajamos con la mayoría de fabricantes europeos. Durante la primera visita auditamos la instalación y proponemos el plan de mantenimiento adecuado.',
    },
    {
        question: '¿Qué documentación entregáis tras la revisión?',
        answer: 'Emitimos un informe con las comprobaciones realizadas, ajustes aplicados y recomendaciones. Si se detectan incidencias críticas se adjunta presupuesto de reparación.',
    },
];

export default function MantenimientoCajasFuertesPage() {
    return (
        <div className="home-shell pt-16 min-h-screen text-gray-900 transition-colors dark:text-white">
            <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-12 md:pt-20">
                <div className="space-y-6 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">
                        Mantenimiento de cajas fuertes en Málaga y Andalucía
                    </h1>
                    <p className="text-lg text-foreground-muted">
                        Aumenta la vida útil de tus cajas fuertes y evita
                        incidencias críticas con un plan preventivo diseñado por
                        especialistas. Realizamos auditorías técnicas, ajustes
                        de combinaciones y aperturas programadas para entidades
                        financieras, retail y residencias de alto nivel.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/contacto"
                            className="rounded-xl bg-[#e11d48] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            Pedir propuesta de mantenimiento
                        </Link>
                        <Link
                            href="/cajas-fuertes-malaga"
                            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                        >
                            Ver servicio de instalación
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
                    <h2 className="text-3xl font-bold text-center md:text-left">
                        Plan integral de mantenimiento
                    </h2>
                    <p className="mt-3 max-w-3xl text-foreground-muted md:text-left">
                        Trabajamos con planes anuales o semestrales adaptados al
                        nivel de uso y criticidad. Nuestra metodología combina
                        revisiones presenciales con asistencia remota para
                        resolver alertas de seguridad.
                    </p>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {maintenanceServices.map(({ title, description }) => (
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

            <section className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
                    <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground">
                                Informe técnico y recomendaciones
                            </h2>
                            <p className="mt-4 text-foreground-muted">
                                Después de cada intervención entregamos un
                                informe con las verificaciones realizadas,
                                incidencias detectadas y recomendaciones de
                                mejora. Esto permite respaldar auditorías
                                internas y pólizas de seguro.
                            </p>
                        </div>
                        <ul className="space-y-4">
                            <li className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-foreground-muted shadow-sm dark:border-white/10 dark:bg-white/10">
                                Check-list de cerraduras, retardos y sistemas de
                                bloqueo.
                            </li>
                            <li className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-foreground-muted shadow-sm dark:border-white/10 dark:bg-white/10">
                                Verificación de anclajes y sellado para mantener
                                la resistencia certificada.
                            </li>
                            <li className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-foreground-muted shadow-sm dark:border-white/10 dark:bg-white/10">
                                Recomendaciones de actualización tecnológica o
                                migración a sistemas electrónicos.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
                    <h2 className="text-3xl font-bold text-center md:text-left">
                        Preguntas frecuentes
                    </h2>
                    <div className="mt-8 space-y-5">
                        {maintenanceFaqs.map(({ question, answer }) => (
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
                        Coordina tu primera revisión
                    </h2>
                    <p className="mt-3 text-foreground-muted">
                        Escríbenos para evaluar el estado actual de tus cajas
                        fuertes y planificar un mantenimiento preventivo
                        adaptado a tus riesgos operativos.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/contacto"
                            className="inline-flex justify-center rounded-xl bg-[#e11d48] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            Solicitar revisión
                        </Link>
                        <Link
                            href="/cajas-fuertes-malaga"
                            className="inline-flex justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                        >
                            Ver instalación y traslado
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

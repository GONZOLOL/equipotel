import SafeCanvas from '@/components/SafeModel';
import Link from 'next/link';

const services = [
    {
        title: 'Transporte de Cajas Fuertes',
        description: 'Movimientos y traslados con medios especializados.',
    },
    {
        title: 'Instalaciones Técnicas',
        description:
            'Anclajes certificados, configuración y verificación profesional.',
    },
    {
        title: 'Sistemas de Seguridad',
        description: 'Soluciones electrónicas conectadas y monitorizadas.',
    },
];

const highlights = [
    'Materiales de grado industrial y controles redundantes.',
    'Integración con alarmas, CCTV y monitorización remota.',
    'Auditorías periódicas y soporte especializado 24/7.',
];

export default function Home() {
    return (
        <div className="home-shell min-h-screen text-gray-900 transition-colors dark:text-white">
            <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-10 md:pt-28 md:pb-12">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                            Sistemas de{' '}
                            <span className="text-[#e11d48]">Seguridad</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg md:mx-0 text-foreground-muted">
                            Más de 30 años garantizando la protección de tu
                            patrimonio con ingeniería, precisión y tecnología.
                            Especialistas en cajas fuertes, anclajes
                            certificados y soluciones electrónicas llave en
                            mano.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                            <a
                                className="px-5 py-3 rounded-xl bg-[#e11d48] text-white hover:opacity-90 transition text-center"
                                href="#contacto"
                            >
                                Solicitar asesoramiento
                            </a>
                            <a
                                className="px-5 py-3 rounded-xl bg-slate-900/5 text-foreground transition hover:bg-slate-900/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 text-center"
                                href="#servicios"
                            >
                                Ver soluciones
                            </a>
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-lg md:max-w-xl">
                        <SafeCanvas />
                    </div>
                </div>
            </section>

            <section
                id="servicios"
                className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20"
            >
                <div className="mb-8 text-center md:text-left">
                    <h2 className="text-3xl font-bold">Servicios</h2>
                    <p className="mt-3 text-base text-foreground-muted md:max-w-2xl">
                        Acompañamos cada fase del proyecto con ingeniería
                        propia, logística especializada y soporte cercano.
                    </p>
                </div>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map(({ title, description }) => (
                        <li
                            key={title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                        >
                            <h3 className="text-xl font-semibold text-foreground dark:text-white">
                                {title}
                            </h3>
                            <p className="mt-3 text-foreground-muted">
                                {description}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            <section
                id="tecnologia"
                className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-white/5"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-16">
                    <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
                        Ingeniería y confianza
                    </h2>
                    <p className="mx-auto max-w-3xl text-foreground-muted md:text-left">
                        Materiales de grado industrial, controles redundantes y
                        auditorías periódicas. Integramos soluciones con
                        sistemas de alarma, CCTV y monitorización remota para
                        garantizar continuidad y respuesta inmediata.
                    </p>
                    <ul className="mt-8 space-y-3">
                        {highlights.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-3 text-foreground-muted"
                            >
                                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-[#e11d48]" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section
                id="contacto"
                className="mx-auto max-w-7xl px-4 sm:px-6 py-16"
            >
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-4">Contacto</h2>
                    <p className="mx-auto max-w-2xl text-foreground-muted md:mx-0">
                        Te asesoramos sin compromiso. Escríbenos o agenda una
                        llamada con nuestro equipo técnico para diseñar un plan
                        de seguridad a medida.
                    </p>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                    <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-100 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                    >
                        Formulario de contacto
                    </Link>
                    <a
                        href="tel:+34676208024"
                        className="inline-flex items-center justify-center rounded-xl bg-[#e11d48] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
                    >
                        Llamar +34 676 20 80 24
                    </a>
                    <a
                        href="mailto:info@equipotel.es"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-100 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                    >
                        info@equipotel.es
                    </a>
                </div>
            </section>
        </div>
    );
}

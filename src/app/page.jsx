import SafeCanvas from '@/components/SafeModel';
import Link from 'next/link';
import {
    services,
    highlights,
    coverageAreas,
    faqs,
    structuredData,
} from './home-content';

export default function Home() {
    return (
        <div className="home-shell min-h-screen text-gray-900 transition-colors dark:text-white">
            <section className="mx-auto max-w-7xl mt-24 px-4 sm:px-6 pt-34 pb-10 md:pt-28 md:pb-12">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-foreground">
                            Cajas fuertes en Málaga con instalación certificada
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg md:mx-0 text-foreground-muted">
                            Venta, traslado y mantenimiento de cajas fuertes
                            homologadas en toda la provincia de Málaga desde
                            1993. Equipo propio de ingenieros y cerrajeros de
                            seguridad con tiempos de respuesta inferiores a 24
                            h.
                        </p>
                        <ul className="mt-5 space-y-2 text-sm sm:text-base text-foreground-muted">
                            <li className="flex items-center justify-center gap-2 md:justify-start">
                                <span className="h-2 w-2 rounded-full bg-[#e11d48]" />
                                Homologaciones UNE EN-1143-1 y UNE EN-1300
                            </li>
                            <li className="flex items-center justify-center gap-2 md:justify-start">
                                <span className="h-2 w-2 rounded-full bg-[#e11d48]" />
                                Servicio urgente 24/7 en Málaga capital y Costa
                                del Sol
                            </li>
                        </ul>
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
                id="cobertura"
                className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-16">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-bold">
                            Cobertura integral en Málaga y provincia
                        </h2>
                        <p className="mt-3 max-w-3xl text-foreground-muted">
                            Nos desplazamos con medios propios y autorizaciones
                            municipales para manipular cajas fuertes de gran
                            tonelaje en cualquier punto de la Costa del Sol y el
                            interior.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {coverageAreas.map(({ name, detail }) => (
                            <div
                                key={name}
                                className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                            >
                                <h3 className="text-xl font-semibold text-foreground dark:text-white">
                                    {name}
                                </h3>
                                <p className="mt-3 text-foreground-muted">
                                    {detail}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 rounded-2xl border border-dashed border-[#e11d48]/50 bg-white/60 p-6 text-foreground-muted dark:bg-white/5">
                        <strong className="text-foreground dark:text-white">
                            Base logística en el Polígono Guadalhorce
                        </strong>
                        <p className="mt-2">
                            Coordinamos permisos de carga y descarga, accesos a
                            parkings subterráneos y elevación mediante grúa o
                            plataformas para instalaciones complejas en
                            edificios residenciales y oficinas.
                        </p>
                    </div>
                </div>
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
                id="faq"
                className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5"
            >
                <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-16">
                    <h2 className="text-3xl font-bold text-center md:text-left">
                        Preguntas frecuentes sobre cajas fuertes en Málaga
                    </h2>
                    <div className="mt-10 space-y-6">
                        {faqs.map(({ question, answer }) => (
                            <details
                                key={question}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 transition dark:border-white/10 dark:bg-white/5"
                            >
                                <summary className="cursor-pointer list-none text-lg font-semibold text-foreground dark:text-white">
                                    <span className="flex items-center justify-between gap-4">
                                        {question}
                                        <span className="text-[#e11d48] transition group-open:rotate-45">
                                            +
                                        </span>
                                    </span>
                                </summary>
                                <p className="mt-3 text-foreground-muted">
                                    {answer}
                                </p>
                            </details>
                        ))}
                    </div>
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

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </div>
    );
}

'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

const brands = [
    { name: 'Ollé', image: '/src/brands/logo-1.png' },
    { name: 'Kaba', image: '/src/brands/logo-2.png' },
    { name: 'Ferrimax', image: '/src/brands/logo-3.png' },
    { name: 'Fichet', image: '/src/brands/logo-4.png' },
    { name: 'Baussa', image: '/src/brands/logo-5.png' },
    { name: 'Kiuso', image: '/src/brands/logo-6.png' },
    { name: 'Tecnosefi', image: '/src/brands/logo-7.png' },
];

const GROUP_MULTIPLIER = 3;
const repeatedBrands = Array.from(
    { length: GROUP_MULTIPLIER },
    () => brands
).flat();
const marqueeStyle = {
    '--marquee-shift': `${100 / GROUP_MULTIPLIER}%`,
};

export default function BrandCarousel() {
    const { isDarkMode } = useTheme();

    return (
        <section
            aria-label="Marcas de cajas fuertes con las que trabajamos"
            className="border-t border-slate-200 bg-white py-12 dark:border-white/10 dark:bg-gray-900"
        >
            <div className="mx-auto w-full px-4 sm:px-6">
                <h2 className="text-center text-sm font-semibold uppercase tracking-[0.4em] text-foreground-muted">
                    Marcas homologadas
                </h2>
                <div className="mt-6 overflow-hidden">
                    <div
                        className="brand-marquee flex w-max items-center gap-16"
                        style={marqueeStyle}
                    >
                        {repeatedBrands.map((brand, index) => (
                            <figure
                                key={`${brand.name}-${index}`}
                                className={`relative flex h-16 w-40 flex-none items-center justify-center rounded-2xl px-6 py-4 transition-all duration-300 ring-0 ${
                                    isDarkMode
                                        ? 'bg-white/90 shadow-lg ring-1 ring-white/20 hover:bg-white'
                                        : 'hover:bg-white'
                                }`}
                            >
                                <Image
                                    src={brand.image}
                                    alt={`Logo ${brand.name}`}
                                    fill
                                    sizes="(max-width: 640px) 120px, 160px"
                                    className={`object-contain drop-shadow-sm ${
                                        isDarkMode
                                            ? 'opacity-100'
                                            : 'opacity-95'
                                    }`}
                                />
                                <figcaption className="sr-only">
                                    {brand.name}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

import { useState } from 'react';
import Image from 'next/image';

export default function ProductImageSkeleton({
    producto,
    className = 'w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden relative bg-gray-200 dark:bg-gray-700 mx-auto',
    showSkeleton = true,
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const mainImage = producto.mainImage || producto.image;
    const hasImage = mainImage && mainImage.trim() !== '';

    // Si no hay imagen o hay error, mostrar placeholder
    if (!hasImage || hasError) {
        return (
            <div className={className}>
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <i className="pi pi-image text-xl text-gray-400 dark:text-gray-500"></i>
                </div>
            </div>
        );
    }

    const imageUrl = producto.convertGoogleDriveUrl
        ? producto.convertGoogleDriveUrl(mainImage)
        : mainImage;

    return (
        <div className={className}>
            {/* Skeleton loader */}
            {isLoading && showSkeleton && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                </div>
            )}

            {/* Imagen real */}
            <Image
                src={imageUrl}
                alt={producto.name}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover transition-opacity duration-300"
                style={{
                    opacity: isLoading ? 0 : 1,
                }}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
            />
        </div>
    );
}

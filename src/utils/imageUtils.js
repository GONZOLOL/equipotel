// Utilidades para manejar imágenes de Google Drive

export const generateGoogleDriveUrls = (originalUrl) => {
    if (!originalUrl || !originalUrl.includes('drive.google.com')) {
        return [originalUrl];
    }

    const fileIdMatch = originalUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (!fileIdMatch) {
        return [originalUrl];
    }

    const fileId = fileIdMatch[1];

    return [
        // 1. Proxy de Google (más confiable)
        `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=https://drive.google.com/uc?export=view&id=${fileId}`,

        // 2. URL directa de Google Drive
        `https://drive.google.com/uc?export=view&id=${fileId}`,

        // 3. Thumbnail de Google Drive
        `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`,

        // 4. URL con parámetros de tamaño
        `https://drive.google.com/uc?export=view&id=${fileId}&sz=w800`,

        // 5. URL sin parámetros
        `https://drive.google.com/uc?export=view&id=${fileId}`,
    ];
};

export const getBestGoogleDriveUrl = (originalUrl) => {
    const urls = generateGoogleDriveUrls(originalUrl);
    return urls[0]; // Retorna el proxy de Google como primera opción
};

export const isValidImageUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Utilidades para manejar imágenes de Google Drive

export const generateGoogleDriveUrls = (originalUrl) => {
    if (!originalUrl || typeof originalUrl !== 'string') {
        return [originalUrl];
    }

    // Si ya es una URL convertida, devolverla tal como está
    if (
        originalUrl.includes('drive.google.com/uc?export=view') ||
        originalUrl.includes(
            'images1-focus-opensocial.googleusercontent.com'
        ) ||
        originalUrl.includes('drive.google.com/thumbnail')
    ) {
        return [originalUrl];
    }

    // Si no es una URL de Google Drive, devolverla tal como está
    if (!originalUrl.includes('drive.google.com')) {
        return [originalUrl];
    }

    // Extraer el ID del archivo de diferentes formatos de URL
    let fileId = null;

    // Formato: https://drive.google.com/file/d/FILE_ID/view
    const fileIdMatch1 = originalUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch1) {
        fileId = fileIdMatch1[1];
    }

    // Formato: https://drive.google.com/open?id=FILE_ID
    const fileIdMatch2 = originalUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (!fileId && fileIdMatch2) {
        fileId = fileIdMatch2[1];
    }

    // Formato: https://drive.google.com/drive/folders/FILE_ID
    const fileIdMatch3 = originalUrl.match(/\/folders\/([a-zA-Z0-9-_]+)/);
    if (!fileId && fileIdMatch3) {
        fileId = fileIdMatch3[1];
    }

    if (!fileId) {
        console.warn(
            'No se pudo extraer el ID del archivo de Google Drive:',
            originalUrl
        );
        return [originalUrl];
    }

    return [
        // 1. URL directa de Google Drive (más confiable)
        `https://drive.google.com/uc?export=view&id=${fileId}`,

        // 2. Thumbnail de Google Drive (alta calidad)
        `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`,

        // 3. Proxy de Google (fallback)
        `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=https://drive.google.com/uc?export=view&id=${fileId}`,

        // 4. URL con parámetros de tamaño específico
        `https://drive.google.com/uc?export=view&id=${fileId}&sz=w1200`,
    ];
};

export const getBestGoogleDriveUrl = (originalUrl) => {
    const urls = generateGoogleDriveUrls(originalUrl);
    return urls[0]; // Retorna la URL directa de Google Drive como primera opción
};

export const isValidImageUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const validateGoogleDriveUrl = (url) => {
    if (!url || typeof url !== 'string') {
        return { valid: false, error: 'URL vacía o inválida' };
    }

    // Verificar si es una URL válida
    try {
        new URL(url);
    } catch {
        return { valid: false, error: 'Formato de URL inválido' };
    }

    // Verificar si es una URL de Google Drive
    if (!url.includes('drive.google.com')) {
        return { valid: true, note: 'No es una URL de Google Drive' };
    }

    // Extraer el ID del archivo
    const fileIdMatch =
        url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/) ||
        url.match(/[?&]id=([a-zA-Z0-9-_]+)/) ||
        url.match(/\/folders\/([a-zA-Z0-9-_]+)/);

    if (!fileIdMatch) {
        return { valid: false, error: 'No se pudo extraer el ID del archivo' };
    }

    const fileId = fileIdMatch[1];

    // Verificar que el ID tenga el formato correcto (al menos 25 caracteres para Google Drive)
    if (fileId.length < 25) {
        return { valid: false, error: 'ID de archivo demasiado corto' };
    }

    return {
        valid: true,
        fileId,
        convertedUrl: `https://drive.google.com/uc?export=view&id=${fileId}`,
        note: 'URL de Google Drive válida',
    };
};

# 🚀 Guía de Despliegue - Equipotel Landing Page

## 📋 Resumen del Proyecto

**Equipotel Landing Page** es una aplicación web moderna construida con Next.js 15.0, PrimeReact y Firebase, diseñada para mostrar los productos y servicios de Equipotel, empresa especializada en cajas fuertes y sistemas de seguridad en Málaga.

### 🛠️ Tecnologías Utilizadas

-   **Frontend**: Next.js 15.0, React 19, PrimeReact
-   **Estilos**: Tailwind CSS 4
-   **Base de Datos**: Firebase Firestore
-   **Almacenamiento**: Firebase Storage
-   **Analytics**: Google Analytics, Facebook Pixel
-   **Despliegue**: Vercel (recomendado)

## 🔥 Configuración de Firebase

### 1. Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "equipotel-landing"
3. Habilita Google Analytics (opcional)

### 2. Configurar Firestore Database

1. En la consola de Firebase, ve a "Firestore Database"
2. Crea una base de datos en modo de producción
3. Configura las reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de productos
    match /productos/{producto} {
      allow read: if true;
      allow write: if false; // Solo admin puede escribir
    }

    // Permitir escritura de formularios de contacto
    match /contactos/{contacto} {
      allow read, write: if true;
    }
  }
}
```

### 3. Configurar Storage

1. Ve a "Storage" en la consola de Firebase
2. Inicia Storage
3. Configura las reglas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Permitir lectura pública de imágenes
    match /productos/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### 4. Obtener Credenciales

1. Ve a "Configuración del proyecto" > "Cuentas de servicio"
2. Haz clic en "Configurar SDK"
3. Copia las credenciales de configuración

## 🔧 Configuración Local

### 1. Clonar y Configurar

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd equipotel-landing

# Instalar dependencias
npm install

# Ejecutar script de configuración
npm run setup
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` con las credenciales de Firebase:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Configuración adicional
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=Equipotel
NEXT_PUBLIC_COMPANY_PHONE=+555 136 997 334
NEXT_PUBLIC_COMPANY_EMAIL=info@equipotel.es

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📊 Configuración de Analytics

### Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad
3. Obtén el ID de seguimiento (G-XXXXXXXXXX)
4. Agrega el ID a las variables de entorno

### Facebook Pixel

1. Ve a [Facebook Business Manager](https://business.facebook.com/)
2. Crea un nuevo pixel
3. Obtén el ID del pixel
4. Agrega el ID a las variables de entorno

## 🚀 Despliegue en Vercel

### 1. Preparar el Repositorio

```bash
# Asegúrate de que todos los cambios estén commitados
git add .
git commit -m "Preparar para despliegue"
git push origin main
```

### 2. Conectar a Vercel

1. Ve a [Vercel](https://vercel.com/)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno en Vercel
4. Despliega automáticamente

### 3. Configurar Dominio Personalizado

1. En Vercel, ve a "Settings" > "Domains"
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones

## 📱 Configuración de PWA

### 1. Generar Iconos

Usa una herramienta como [PWA Builder](https://www.pwabuilder.com/) para generar los iconos necesarios:

-   `public/icons/icon-72x72.png`
-   `public/icons/icon-96x96.png`
-   `public/icons/icon-128x128.png`
-   `public/icons/icon-144x144.png`
-   `public/icons/icon-152x152.png`
-   `public/icons/icon-192x192.png`
-   `public/icons/icon-384x384.png`
-   `public/icons/icon-512x512.png`

### 2. Configurar Manifest

El archivo `public/manifest.json` ya está configurado. Solo necesitas:

-   Actualizar los colores del tema si es necesario
-   Verificar que las rutas de los iconos sean correctas

## 🔍 Optimización SEO

### 1. Meta Tags

Los meta tags están configurados en `src/app/layout.tsx`. Actualiza:

-   Título y descripción
-   Palabras clave
-   Open Graph tags
-   Twitter Card tags

### 2. Sitemap

El sitemap se genera automáticamente en `/sitemap.xml`

### 3. Robots.txt

El archivo robots.txt se genera automáticamente

### 4. Google Search Console

1. Verifica tu sitio en [Google Search Console](https://search.google.com/search-console)
2. Agrega el código de verificación a las variables de entorno
3. Envía el sitemap

## 📈 Monitoreo y Analytics

### Web Vitals

La aplicación incluye monitoreo automático de:

-   **LCP** (Largest Contentful Paint)
-   **FID** (First Input Delay)
-   **CLS** (Cumulative Layout Shift)
-   **FCP** (First Contentful Paint)
-   **TTFB** (Time to First Byte)

### Eventos Personalizados

La aplicación trackea automáticamente:

-   Clicks en productos
-   Envíos de formularios
-   Llamadas telefónicas
-   Emails
-   Scroll depth
-   Tiempo en página

## 🔧 Mantenimiento

### Actualizaciones

```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit

# Ejecutar tests
npm run lint
```

### Backup de Datos

1. Exporta regularmente los datos de Firestore
2. Haz backup de las imágenes en Storage
3. Mantén copias de las variables de entorno

## 🆘 Solución de Problemas

### Errores Comunes

1. **Error de Firebase**: Verifica las credenciales en `.env.local`
2. **Imágenes no cargan**: Verifica las reglas de Storage
3. **Analytics no funciona**: Verifica los IDs en las variables de entorno
4. **Build falla**: Verifica que todas las dependencias estén instaladas

### Logs

-   **Desarrollo**: Los logs aparecen en la consola del navegador
-   **Producción**: Usa Vercel Analytics o Firebase Analytics

## 📞 Soporte

Para soporte técnico:

-   📧 Email: info@equipotel.es
-   📱 Teléfono: +555 136 997 334
-   🌐 Web: https://equipotel.es

---

**¡Tu landing page está lista para conquistar el mundo! 🚀**

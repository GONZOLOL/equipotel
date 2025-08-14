# 🏦 Equipotel - Landing Page

Landing page moderna para Equipotel, empresa especializada en cajas fuertes y sistemas de seguridad en Málaga.

## 🚀 Tecnologías Utilizadas

-   **Next.js 15.0** - Framework de React
-   **PrimeReact** - Biblioteca de componentes UI
-   **Tailwind CSS** - Framework de CSS
-   **Firebase** - Base de datos y almacenamiento
-   **Vercel** - Plataforma de despliegue

## 📋 Características

-   ✅ Diseño responsive y moderno
-   ✅ Navbar fijo con scroll dinámico
-   ✅ Catálogo de productos con Firebase
-   ✅ Formulario de contacto funcional
-   ✅ SEO optimizado
-   ✅ Analytics integrado
-   ✅ PWA ready

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/equipotel-landing.git
cd equipotel-landing
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

#### 3.1 Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "equipotel-landing"
3. Habilita **Firestore Database** y **Storage**

#### 3.2 Configurar Firestore

1. En Firebase Console, ve a **Firestore Database**
2. Crea una base de datos en modo de prueba
3. Crea la colección `products` con la siguiente estructura:

```javascript
{
  name: "Caja Fuerte Serie RA",
  category: "cajas-fuertes",
  categoryLabel: "Cajas Fuertes",
  price: 299,
  priceFormatted: "299€",
  description: "Caja fuerte atérmica con certificación europea",
  image: "https://tu-url-de-imagen.jpg",
  features: ["Atérmico", "Certificado", "Electrónico"],
  stock: "Disponible",
  featured: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### 3.3 Configurar Storage

1. En Firebase Console, ve a **Storage**
2. Crea las reglas de seguridad:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // Para desarrollo
    }
  }
}
```

#### 3.4 Obtener configuración

1. En Firebase Console, ve a **Project Settings**
2. En la sección "Your apps", crea una nueva app web
3. Copia la configuración

#### 3.5 Configurar Autenticación

1. En Firebase Console, ve a **Authentication**
2. Habilita el proveedor **Google**
3. Configura los dominios autorizados (localhost para desarrollo)
4. Añade las cuentas de email autorizadas para el admin

### 4. Configurar variables de entorno

Crea el archivo `.env.local` en la raíz del proyecto:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=Equipotel
NEXT_PUBLIC_COMPANY_PHONE=+34 951 234 567
NEXT_PUBLIC_COMPANY_EMAIL=info@equipotel.es

# Analytics (Opcional)
NEXT_PUBLIC_GA_TRACKING_ID=tu_ga_tracking_id
NEXT_PUBLIC_FB_PIXEL_ID=tu_fb_pixel_id
```

### 5. Ejecutar el proyecto

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

### 6. Acceder al Panel de Administración

1. Ve a `http://localhost:3000/admin`
2. Inicia sesión con tu cuenta de Google
3. Accede al dashboard en `http://localhost:3000/admin/dashboard`
4. Gestiona productos en `http://localhost:3000/admin/products`
5. Revisa analytics en `http://localhost:3000/admin/analytics`

## 📁 Estructura del Proyecto

```
equipotel-landing/
├── src/
│   ├── app/                 # Páginas de Next.js
│   │   ├── page.jsx         # Página principal
│   │   ├── productos/       # Catálogo de productos
│   │   ├── contacto/        # Página de contacto
│   │   └── sobre-nosotros/  # Página sobre nosotros
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx       # Barra de navegación
│   │   └── Footer.jsx       # Pie de página
│   ├── lib/                 # Configuraciones
│   │   ├── firebase.js      # Configuración de Firebase
│   │   ├── analytics.js     # Configuración de analytics
│   │   └── performance.js   # Monitoreo de performance
│   └── services/            # Servicios
│       └── productService.js # Servicios de productos
├── public/                  # Archivos estáticos
└── scripts/                 # Scripts de utilidad
```

## 🔥 Funcionalidades de Firebase

### Productos

-   ✅ Cargar productos desde Firestore
-   ✅ Filtrar por categoría
-   ✅ Búsqueda en tiempo real
-   ✅ Ordenamiento dinámico
-   ✅ Paginación

### Imágenes

-   ✅ Subir imágenes a Firebase Storage
-   ✅ URLs de descarga automáticas
-   ✅ Optimización de imágenes

### Panel de Administración

-   ✅ Autenticación con Google
-   ✅ Dashboard con métricas
-   ✅ Gestión completa de productos (CRUD)
-   ✅ Analytics integrado
-   ✅ DataGrid con filtros y ordenamiento
-   ✅ Protección de rutas

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en Vercel
3. Despliega automáticamente

### Otros proveedores

El proyecto es compatible con:

-   Netlify
-   AWS Amplify
-   Railway
-   Render

## 📊 Analytics y SEO

### Google Analytics

-   Configurado para GA4
-   Tracking de eventos personalizados
-   Web Vitals integrados

### SEO

-   Meta tags optimizados
-   Sitemap automático
-   Robots.txt configurado
-   Open Graph tags

## 🎨 Personalización

### Colores

Los colores principales están definidos en `src/app/globals.css`:

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #6b7280;
    --accent-color: #10b981;
}
```

### Componentes

Todos los componentes de PrimeReact están personalizados en `src/app/globals.css`.

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
npm run setup        # Configuración inicial
```

## 📞 Soporte

Para soporte técnico o preguntas:

-   Email: info@equipotel.es
-   Teléfono: +34 951 234 567

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Desarrollado con ❤️ para Equipotel**

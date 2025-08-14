# Equipotel - Landing Page

Landing page moderna para Equipotel, empresa especializada en cajas fuertes, armarios acorazados y sistemas de seguridad en Málaga.

## 🚀 Tecnologías Utilizadas

-   **Next.js 15.0** - Framework de React
-   **PrimeReact** - Biblioteca de componentes UI
-   **Firebase** - Base de datos y almacenamiento
-   **Tailwind CSS** - Framework de estilos
-   **JavaScript** - Lenguaje de programación

## 📋 Características

-   ✅ Diseño responsive y moderno
-   ✅ Catálogo de productos con filtros
-   ✅ Formulario de contacto funcional
-   ✅ Integración con Firebase
-   ✅ Optimización SEO
-   ✅ Componentes reutilizables
-   ✅ Navegación intuitiva

## 🛠️ Instalación

1. **Clonar el repositorio**

    ```bash
    git clone <url-del-repositorio>
    cd equipotel-landing
    ```

2. **Instalar dependencias**

    ```bash
    npm install
    ```

3. **Configurar variables de entorno**
   Crear un archivo `.env.local` en la raíz del proyecto:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
    ```

4. **Ejecutar en desarrollo**

    ```bash
    npm run dev
    ```

5. **Abrir en el navegador**
    ```
    http://localhost:3000
    ```

## 🔥 Configuración de Firebase

### 1. Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Firestore Database
4. Habilita Storage
5. Configura las reglas de seguridad

### 2. Configurar Firestore

Crea las siguientes colecciones:

```javascript
// Colección: productos
{
  id: "auto-generated",
  name: "Caja Fuerte Serie RA",
  category: "cajas-fuertes",
  categoryLabel: "Cajas Fuertes",
  price: 299,
  priceFormatted: "299€",
  description: "Caja fuerte atérmica con certificación europea...",
  image: "url_de_la_imagen",
  features: ["Atérmico", "Certificado", "Electrónico"],
  stock: "Disponible",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### 3. Configurar Storage

-   Crea una carpeta `productos` en Storage
-   Sube las imágenes de los productos
-   Configura las reglas de acceso público para las imágenes

## 📁 Estructura del Proyecto

```
equipotel-landing/
├── src/
│   ├── app/
│   │   ├── contacto/
│   │   │   └── page.jsx
│   │   ├── productos/
│   │   │   └── page.jsx
│   │   ├── sobre-nosotros/
│   │   │   └── page.jsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── lib/
│       └── firebase.js
├── public/
│   └── images/
├── package.json
└── README.md
```

## 🎨 Personalización

### Colores y Estilos

Los colores principales están definidos en `src/app/globals.css`:

-   **Azul principal**: `#3b82f6`
-   **Azul oscuro**: `#2563eb`
-   **Gris**: `#6b7280`
-   **Verde**: `#10b981`
-   **Amarillo**: `#f59e0b`

### Componentes

Los componentes principales están en `src/components/`:

-   `Navbar.jsx` - Navegación principal
-   `Footer.jsx` - Pie de página

### Páginas

Las páginas están en `src/app/`:

-   `page.jsx` - Página principal
-   `productos/page.jsx` - Catálogo de productos
-   `contacto/page.jsx` - Formulario de contacto
-   `sobre-nosotros/page.jsx` - Información de la empresa

## 📱 Responsive Design

La aplicación está optimizada para:

-   📱 Móviles (320px - 768px)
-   💻 Tablets (768px - 1024px)
-   🖥️ Desktop (1024px+)

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Netlify

1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros

```bash
npm run build
npm start
```

## 📊 SEO

La aplicación incluye:

-   Meta tags optimizados
-   Open Graph tags
-   Schema markup
-   URLs amigables
-   Sitemap automático

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
```

## 📞 Soporte

Para soporte técnico o consultas:

-   📧 Email: info@equipotel.es
-   📱 Teléfono: +555 136 997 334
-   🌐 Web: https://equipotel.es

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Equipotel** - Tu seguridad es nuestra prioridad 🔒

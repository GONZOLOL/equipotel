# Sistema de Temas - Equipotel Landing

Este documento describe el sistema de temas implementado en la aplicación Equipotel Landing, que permite cambiar entre modo claro y oscuro.

## 🎨 Características

-   ✅ **Modo Claro/Oscuro**: Cambio dinámico entre temas
-   ✅ **Persistencia**: La preferencia se guarda en localStorage
-   ✅ **Detección del Sistema**: Respeta la preferencia del sistema operativo
-   ✅ **Integración PrimeReact**: Compatible con los temas de PrimeReact
-   ✅ **Transiciones Suaves**: Animaciones fluidas entre temas
-   ✅ **Responsive**: Funciona en todos los dispositivos

## 🚀 Instalación y Configuración

### 1. Descargar Temas de PrimeReact

```bash
npm run download-themes
```

Este comando descarga los temas necesarios de PrimeReact:

-   `lara-light-blue` (modo claro)
-   `lara-dark-blue` (modo oscuro)

### 2. Configuración de Tailwind

El archivo `tailwind.config.js` está configurado para soportar el modo oscuro basado en clases:

```javascript
module.exports = {
    darkMode: 'class', // Habilita el modo oscuro basado en clases
    // ... resto de la configuración
};
```

## 📁 Estructura de Archivos

```
src/
├── contexts/
│   └── ThemeContext.jsx          # Contexto principal del tema
├── components/
│   ├── ThemeToggle.jsx           # Botón de cambio de tema
│   └── ThemeDemo.jsx             # Componente de demostración
├── hooks/
│   └── useThemeToggle.js         # Hook personalizado
└── app/
    ├── layout.tsx                # Layout con ThemeProvider
    └── globals.css               # Estilos globales con modo oscuro

public/
└── themes/
    ├── lara-light-blue/
    │   └── theme.css
    └── lara-dark-blue/
        └── theme.css
```

## 🔧 Uso

### 1. Usar el Hook Personalizado

```jsx
import { useThemeToggle } from '@/hooks/useThemeToggle';

function MyComponent() {
    const { isDarkMode, toggleTheme, themeIcon, themeLabel } = useThemeToggle();

    return <button onClick={toggleTheme}>{isDarkMode ? '☀️' : '🌙'}</button>;
}
```

### 2. Usar el Contexto Directamente

```jsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
    const { isDarkMode, toggleTheme, setTheme } = useTheme();

    const switchToLight = () => setTheme('light');
    const switchToDark = () => setTheme('dark');

    return (
        <div>
            <button onClick={switchToLight}>Modo Claro</button>
            <button onClick={switchToDark}>Modo Oscuro</button>
        </div>
    );
}
```

### 3. Usar el Componente ThemeToggle

```jsx
import ThemeToggle from '@/components/ThemeToggle';

function MyComponent() {
    return (
        <div>
            <ThemeToggle />
            <ThemeToggle className="custom-class" />
        </div>
    );
}
```

## 🎨 Clases CSS para Modo Oscuro

### 🎯 Mejores Prácticas de Contraste

Para garantizar una excelente legibilidad y accesibilidad, hemos definido un sistema de colores con contraste optimizado:

#### Texto Principal (Alto Contraste)

-   **Claro**: `text-gray-900` (#111827)
-   **Oscuro**: `text-white` (#ffffff)

#### Texto Secundario (Contraste Medio)

-   **Claro**: `text-gray-600` (#4b5563)
-   **Oscuro**: `text-gray-200` (#e5e7eb)

#### Texto Terciario (Contraste Bajo pero Legible)

-   **Claro**: `text-gray-500` (#6b7280)
-   **Oscuro**: `text-gray-300` (#d1d5db)

#### Enlaces (Alto Contraste para Accesibilidad)

-   **Claro**: `text-blue-600` (#2563eb)
-   **Oscuro**: `text-blue-400` (#60a5fa)

### Clases de Tailwind

```jsx
// Texto
className = 'text-gray-900 dark:text-white'; // Texto principal
className = 'text-gray-600 dark:text-gray-200'; // Texto secundario
className = 'text-gray-500 dark:text-gray-300'; // Texto terciario

// Fondos
className = 'bg-white dark:bg-gray-900'; // Fondo principal
className = 'bg-gray-50 dark:bg-gray-800'; // Fondo secundario
className = 'bg-gray-100 dark:bg-gray-700'; // Fondo terciario

// Bordes
className = 'border-gray-200 dark:border-gray-700'; // Bordes

// Gradientes
className = 'gradient-light'; // Gradiente claro/oscuro
className = 'gradient-blue-light'; // Gradiente azul
className = 'gradient-green-light'; // Gradiente verde
```

### Clases CSS Personalizadas

```css
/* Modo oscuro automático para componentes */
.dark .p-card {
    background: #1f2937;
    border-color: #374151;
    color: #ffffff;
}

.dark .p-menubar {
    background: #1f2937;
    border-color: #374151;
}

.dark .p-menubar .p-menuitem-link {
    color: #ffffff;
}
```

## 🔄 API del Hook useThemeToggle

```javascript
const {
    // Estado
    isDarkMode, // boolean: true si está en modo oscuro
    isLoaded, // boolean: true cuando el tema está cargado
    theme, // string: 'light' | 'dark'

    // Métodos
    toggleTheme, // function: cambia entre claro/oscuro
    setTheme, // function: establece tema específico

    // Métodos de conveniencia
    isLightMode, // boolean: true si está en modo claro
    switchToLight, // function: cambia a modo claro
    switchToDark, // function: cambia a modo oscuro

    // Helpers para UI
    themeIcon, // string: icono actual (pi-sun | pi-moon)
    themeLabel, // string: etiqueta del tooltip
    themeAriaLabel, // string: etiqueta de accesibilidad
} = useThemeToggle();
```

## 🎯 Mejores Prácticas

### 1. Siempre Usar Clases Condicionales

```jsx
// ✅ Correcto
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"

// ❌ Incorrecto
className={isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
```

### 2. Usar el Hook Personalizado

```jsx
// ✅ Correcto
import { useThemeToggle } from '@/hooks/useThemeToggle';

// ❌ Incorrecto
import { useTheme } from '@/contexts/ThemeContext';
```

### 3. Proporcionar Estados de Carga

```jsx
function MyComponent() {
    const { isLoaded, isDarkMode } = useThemeToggle();

    if (!isLoaded) {
        return <div>Cargando...</div>;
    }

    return <div>Contenido</div>;
}
```

## 🐛 Solución de Problemas

### 1. El tema no cambia

-   Verificar que el `ThemeProvider` esté envolviendo la aplicación
-   Comprobar que los archivos de tema estén en `/public/themes/`
-   Revisar la consola del navegador para errores

### 2. Parpadeo al cargar

-   El parpadeo es normal en la primera carga
-   Se puede minimizar usando `isLoaded` para mostrar contenido

### 3. Estilos no se aplican

-   Verificar que las clases `dark:` estén en el CSS
-   Comprobar que Tailwind esté configurado correctamente
-   Revisar que el archivo `globals.css` incluya los estilos del modo oscuro

## 🔮 Futuras Mejoras

-   [ ] Soporte para temas personalizados
-   [ ] Animaciones más avanzadas
-   [ ] Integración con preferencias del sistema en tiempo real
-   [ ] Temas estacionales o especiales
-   [ ] Exportar/importar preferencias de tema

## 📝 Notas de Desarrollo

-   El sistema usa `localStorage` para persistencia
-   Los temas de PrimeReact se cargan dinámicamente
-   Las transiciones son CSS puras para mejor rendimiento
-   El sistema es compatible con SSR de Next.js

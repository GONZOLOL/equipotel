#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
    const envContent = `# Firebase Configuration
# Obtén estos valores desde la consola de Firebase
# https://console.firebase.google.com/

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
`;

    fs.writeFileSync(envPath, envContent);
}

// Crear carpeta de imágenes si no existe
const imagesPath = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
}

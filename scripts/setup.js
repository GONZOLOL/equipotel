#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando Equipotel Landing Page...\n');

// Verificar si existe .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creando archivo .env.local...');
  
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
  console.log('✅ Archivo .env.local creado');
} else {
  console.log('✅ Archivo .env.local ya existe');
}

// Crear carpeta de imágenes si no existe
const imagesPath = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesPath)) {
  console.log('📁 Creando carpeta public/images...');
  fs.mkdirSync(imagesPath, { recursive: true });
  console.log('✅ Carpeta public/images creada');
} else {
  console.log('✅ Carpeta public/images ya existe');
}

console.log('\n🎉 Configuración completada!');
console.log('\n📋 Próximos pasos:');
console.log('1. Configura Firebase en https://console.firebase.google.com/');
console.log('2. Actualiza las variables en .env.local con tus credenciales de Firebase');
console.log('3. Ejecuta: npm run dev');
console.log('4. Abre http://localhost:3000 en tu navegador');
console.log('\n📚 Para más información, consulta el README.md');

import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { nombre, email, telefono, asunto, mensaje } = body;

        // Validar campos requeridos
        if (!nombre || !email || !asunto || !mensaje) {
            return NextResponse.json(
                { error: 'Todos los campos marcados con * son obligatorios' },
                { status: 400 }
            );
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'El formato del email no es válido' },
                { status: 400 }
            );
        }

        // Configurar el contenido del email
        const emailContent = `
Nuevo mensaje de contacto desde la web de Equipotel

Datos del remitente:
- Nombre: ${nombre}
- Email: ${email}
- Teléfono: ${telefono || 'No proporcionado'}
- Asunto: ${asunto}

Mensaje:
${mensaje}

---
Este mensaje fue enviado desde el formulario de contacto de equipotel.es
Fecha: ${new Date().toLocaleString('es-ES', {
            timeZone: 'Europe/Madrid',
        })}
        `;

        // Por ahora, solo devolver el mailto link
        // En producción, aquí iría la configuración de nodemailer
        const mailtoLink = `mailto:info@equipotel.es?subject=Nuevo contacto: ${asunto}&body=${encodeURIComponent(
            emailContent
        )}`;

        // Log para debugging
        console.log('Formulario de contacto recibido:', {
            nombre,
            email,
            telefono,
            asunto,
            mensaje,
        });

        return NextResponse.json({
            success: true,
            message: 'Mensaje procesado. Se abrirá tu cliente de email.',
            mailtoLink: mailtoLink,
            fallback: true,
        });
    } catch (error) {
        console.error('Error en la API de contacto:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

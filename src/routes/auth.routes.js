/**
 * =========================================================================
 * ENRUTADOR DE AUTENTICACIÓN (MOCK LOGIN)
 * =========================================================================
 * Responsabilidad: Procesar el inicio de sesión del administrador mediante
 * las credenciales del archivo .env y emitir el token de seguridad JWT.
 */

import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

/**
 * POST /api/auth/login (o la ruta base que utilices en tu servidor)
 * Genera un token de acceso válido por 1 hora si las credenciales coinciden.
 */
router.post('/login', (req, res) => {
  // 1. Desestructuramos el email y password enviados en el cuerpo del request
  const { email, password } = req.body;

  // 2. Control de Seguridad Preventivo:
  // Validamos que todas las variables necesarias existan en el .env antes de operar.
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    console.error("❌ ERROR CRÍTICO: Variables de entorno (ADMIN_EMAIL, ADMIN_PASSWORD o JWT_SECRET) no configuradas en .env");
    return res.status(500).json({ 
      success: false,
      message: "Error de configuración interna en el servidor. Falta el archivo .env o sus variables." 
    });
  }

  // 3. Validación de Identidad:
  // Comparamos el email y contraseña recibidos con los valores estrictos del .env
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    
    // 4. Generación del Token (Firma):
    // Guardamos el email en el payload del token, lo firmamos con la clave secreta
    // y establecemos un tiempo de expiración prudente de 1 hora.
    const token = jwt.sign(
      { email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // 5. Respuesta Exitosa:
    // Retornamos el token al cliente (api.http / Postman) para que pueda usarlo
    return res.json({ 
      success: true,
      message: "Autenticación exitosa. Bienvenido Admin.",
      token 
    });
  }

  // 6. Respuesta de Rechazo:
  // Si las credenciales no coinciden, cortamos el acceso con un estado 401 Unauthorized
  return res.status(401).json({ 
    success: false,
    message: "Credenciales inválidas. Verifique el email y la contraseña." 
  });
});

export default router;
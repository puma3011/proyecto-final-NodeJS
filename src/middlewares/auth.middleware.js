/**
 * =========================================================================
 * MIDDLEWARE DE AUTENTICACIÓN (JWT)
 * =========================================================================
 * 
 * Responsabilidad:
 * Funciona como una "barrera de peaje" antes de llegar a los controladores.
 * Se encarga de interceptar la petición, extraer el token que viene desde 
 * el cliente (en los Headers), verificar que sea válido y que no haya expirado.
 * 
 * - Si el token es correcto: Da luz verde usando next() para continuar al controlador.
 * - Si el token falta o es inválido: Corta la petición y responde con un error.
 */

import jwt from 'jsonwebtoken';

// CLAVE SECRETA (JWT_SECRET)
// IMPORTANTE: En producción, esto debe ir OBLIGATORIAMENTE en un archivo .env
// Usamos una clave de prueba para la entrega del Ejercicio 14.
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_super_segura_de_mirty';

const verificarToken = (req, res, next) => {
    // 1. Extraer la cabecera 'Authorization' de la petición HTTP
    const authHeader = req.headers['authorization'];

    // 2. Verificar si la cabecera existe en la petición
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. No se proporcionó el encabezado Authorization.'
        });
    }

    // 3. El formato estándar es 'Bearer <TOKEN>'. Vamos a separar el texto por el espacio.
    // partes[0] será 'Bearer' y partes[1] será el token real.
    const partes = authHeader.split(' ');

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({
            success: false,
            message: 'Formato de token inválido. Debe ser: Bearer <TOKEN>'
        });
    }

    // 4. Si el formato es correcto, guardamos el token limpio en una constante
    const token = partes[1];

    try {
        // 5. Procedemos a verificar el token usando la librería y nuestra clave secreta
        // Si el token expiró o fue manipulado, esta línea dispara un error que cae al catch.
        const verificado = jwt.verify(token, JWT_SECRET);

        // 6. Si pasó la verificación, inyectamos los datos decodificados del usuario 
        // adentro del objeto 'req' (request) para que los controladores puedan saber quién es.
        req.user = verificado;

        // 7. ¡Luz verde! La petición cumplió con los requisitos de seguridad y sigue viaje
        // hacia la ruta o el controlador correspondiente de Firestore.
        next();

    } catch (error) {
        // 8. Capturamos cualquier fallo en la verificación del token
        return res.status(403).json({
            success: false,
            message: 'Token inválido o expirado. Acceso no autorizado.',
            error: error.message
        });
    }
};

// Exportamos la función para poder importarla en nuestro archivo de rutas
export default verificarToken;
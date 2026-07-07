/**
 * =========================================================================
 * ENRUTADOR DE PRODUCTOS (CON PROTECCIÓN JWT)
 * =========================================================================
 * Responsabilidad: Capturar las URLs entrantes y mapearlas al controlador correspondiente.
 * 
 * CAPA DE SEGURIDAD INTERMEDIA (MIDDLEWARE):
 * Las rutas de lectura (GET) son de acceso público para cualquier usuario.
 * Las rutas de escritura (POST, PUT, DELETE) requieren un token válido
 * provisto en los encabezados HTTP para poder ejecutarse.
 */

import express from 'express';
import { 
  createProduct, 
  getAllProducts, 
  getProductsByFilters,
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/products.Controller.js';

// Importamos el middleware de autenticación que valida el token de seguridad
import verificarToken from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * =========================================================================
 * DEFINICIÓN DE ENDPOINTS PÚBLICOS (Métodos GET)
 * No requieren token. Cualquier cliente puede consultar el catálogo.
 * =========================================================================
 */

// 1. Obtener TODOS los productos (Limpio, sin parámetros de consulta obligatorios)
router.get('/api/products', getAllProducts);

// 2. Nueva ruta exclusiva para búsquedas con filtros (?category=X&price=Y)
// NOTA: Se coloca ANTES de /api/products/:id para evitar conflictos con el parámetro dinámico.
router.get('/api/products/filter', getProductsByFilters);

// 3. Obtener un único producto por su ID dinámico pasado por la URL
router.get("/api/products/:id", getProductById);


/**
 * =========================================================================
 * DEFINICIÓN DE ENDPOINTS PROTEGIDOS (Métodos POST, PUT, DELETE)
 * Se inyecta 'verificarToken' como paso previo obligatorio.
 * =========================================================================
 */

// 4. Crear un nuevo producto en la base de datos (Requiere credenciales de Admin)
router.post("/api/products", verificarToken, createProduct);

// 5. Actualizar campos de un producto existente por su ID (Requieres credenciales de Admin)
router.put("/api/products/:id", verificarToken, updateProduct);

// 6. Eliminar un producto por su ID (Requiere credenciales de Admin)
router.delete("/api/products/:id", verificarToken, deleteProduct);

export default router;
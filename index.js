/**
 * ARCHIVO DE ENTRADA (ENTRY POINT)
 * Responsabilidad: Es el Director de Orquesta y el punto de entrada de la aplicación. 
 * Su única tarea es levantar el servidor Express, aplicar configuraciones globales (como los permisos de CORS y poder leer JSON) y 
 * decirle al servidor qué rutas escuchar. No maneja lógica de negocio ni sabe qué es un producto. 
 */

// importamos Express y Cors
import express from "express";
import cors from "cors";
import morgan from "morgan"; // 1. Importamos la librería Morgan
import 'dotenv/config';
import productsRouter from './src/routes/products.Routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARES Y ARCHIVOS ESTÁTICOS
// ==========================================

// Servir archivos estáticos (aquí es donde Express busca el archivo /logoico.webp)
app.use(express.static('public'));

// Activamos Morgan en modo desarrollo para monitorear las peticiones en consola
app.use(morgan('dev'));

// Configuración global de CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === `http://localhost:${PORT}`) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Permitir lectura de cuerpos JSON
app.use(express.json());

// ==========================================
// RUTA DE BIENVENIDA (HOME)
// ==========================================
// Tu ruta personalizada con HTML estructurado que evita el error 404 en la raíz
app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>API TechLab</title>
      <link rel="icon" type="image/webp" href="/logoico.webp">
    </head>
    <body style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #f4f6f9; color: #333;">
      <h1>🚀 API de TechLab funcionando</h1>
      <p>Usa <code>/api/products</code> para ver el catálogo.</p>
    </body>
    </html>
  `);
});

app.get("/ping", (req, res) => {
  res.status(200).send("/pong");
});

// ==========================================
// VINCULACIÓN DE RUTAS MODULARES
// ==========================================
app.use('/api/auth', authRoutes); // Login disponible en: http://localhost:3000/api/auth/login
app.use(productsRouter);           // Tus rutas de productos

// ==========================================
// MANEJO DE RUTAS NO ENCONTRADAS (404)
// ==========================================
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ==========================================
// ARRANQUE DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔗 URL Local: http://localhost:${PORT}`);
  console.log(` Logger Morgan activo en modo 'dev'.`);
  console.log(`=================================================`);
});
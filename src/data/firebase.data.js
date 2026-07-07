import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Cargamos la librería 'dotenv' para que lea el archivo .env y levante las variables a process.env
import 'dotenv/config';

console.log("Iniciando configuración de Firebase...");

/**
 * CONFIGURACIÓN DE FIREBASE
 * * Responsabilidad: Mapear las credenciales del archivo oculto .env.
 * * Nota para el equipo: Usamos 'process.env.NOMBRE_VARIABLE' para que coincida 
 * exactamente con las claves declaradas en nuestro archivo .env de la raíz.
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Inicializamos la aplicación de Firebase con la configuración del entorno
export const app = initializeApp(firebaseConfig);

// Inicializamos la base de datos Firestore vinculada a esta aplicación
const db = getFirestore(app);

// Exportamos la instancia de la base de datos para que la use 'firestore.models.js'
export { db };
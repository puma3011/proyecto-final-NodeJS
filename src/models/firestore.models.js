import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../data/firebase.data.js";

/**
 * Trae todos los documentos de una colección dada.
 */
export async function readDocuments(collectionName) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  // Mapeamos los documentos para unificar el ID de Firebase con los campos internos del objeto
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

/**
 * Trae un único documento por ID.
 */
export async function readDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() };
}

/**
 * Agrega un nuevo documento dejando que Firebase administre y genere el Hash ID aleatorio.
 */
export async function createDocument(collectionName, data) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

/**
 * Actualiza campos parciales de un documento sin sobreescribir el resto.
 */
export async function updateDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

/**
 * Ejecuta la baja/eliminación permanente de un documento por ID en la base de datos.
 */
export async function deleteDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
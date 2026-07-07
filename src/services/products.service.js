/**
 * SERVICIOS DE PRODUCTO
 * Responsabilidad: Lógica de Negocio. Procesa y manipula los datos antes de responder.
 */

import { readDocuments, readDocument, createDocument, updateDocument, deleteDocument } from "../models/firestore.models.js";

/**
 * FUNCIÓN AUXILIAR (Helper): formatProductStructure
 * 
 * ¿Por qué existe esta función?
 * En JavaScript y en bases de datos NoSQL como Firestore, los objetos son colecciones 
 * de pares clave-valor que no garantizan un orden interno de sus propiedades. Al recuperar 
 * los documentos, Express los transforma a JSON y los muestra tal cual fueron guardados o 
 * devuelvos en memoria, lo que puede provocar que los campos aparezcan desordenados.
 * 
 * Esta función intercepta el producto y fuerza un orden visual estricto (id -> name -> price -> etc.) 
 * al crear un objeto nuevo asignando las llaves de forma secuencial. Esto mejora drásticamente 
 * la legibilidad y el control visual cuando testeamos las respuestas en el archivo api.http. o en Postman
 */

const formatProductStructure = (product) => {
  if (!product) return null;
  
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock,
    description: product.description || "" // Si no tiene descripción, evita que quede undefined
  };
};

/**
 * Servicio encargado estrictamente de filtrar la colección de productos
 */
export const getProductsByFiltersService = async ({ category, price }) => {
  const products = await readDocuments("products");
  
  // 1. Filtramos los productos según los criterios
  const filteredProducts = products.filter(product => {
    let match = true;

    if (category !== undefined) {
      match = match && product.category === category;
    }
    if (price !== undefined) {
      match = match && product.price <= Number(price);
    }

    return match;
  });

  // 2. Mapeamos la lista filtrada para que CADA producto tenga la estructura ordenada
  return filteredProducts.map(product => formatProductStructure(product));
};

/**
 * Servicio para obtener TODOS los productos estructurados
 */
export const getAllProductsService = async () => {
  const products = await readDocuments("products");
  // Mapeamos todos los productos de la lista para ordenarlos visualmente
  return products.map(product => formatProductStructure(product));
};

/**
 * Servicio para obtener un único producto estructurado por ID
 */
export const getProductByIdService = async (id) => {
  const product = await readDocument("products", id);
  return formatProductStructure(product);
};

// Estos servicios de escritura devuelven el ID o impactan directo, se mantienen simples
export const createProductService = async (producto) => await createDocument("products", producto);
export const updateProductService = async (id, data) => await updateDocument("products", id, data);
export const deleteProductService = async (id) => await deleteDocument("products", id);
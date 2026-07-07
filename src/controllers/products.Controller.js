/**
 * CONTROLADOR DE PRODUCTOS
 * Responsabilidad: Recibir los parámetros de las peticiones HTTP y armar las respuestas.
 */

import { 
  createProductService, 
  getAllProductsService,
  getProductByIdService, 
  getProductsByFiltersService, // Importamos el servicio de filtrado específico
  updateProductService,
  deleteProductService 
} from "../services/products.service.js";

/**
 * 1. Obtener TODOS los productos (Sin filtros)
 * Endpoint: GET /api/products
 */
export const getAllProducts = async (req, res) => {
  try {
    // Llamamos directamente al servicio encargado de traer toda la colección
    const products = await getAllProductsService();

    if (products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos registrados' });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al obtener productos' });
  }
};

/**
 * 2. Obtener productos FILTRADOS por Query Params
 * Endpoint: GET /api/products/filter?category=X&price=Y
 */
export const getProductsByFilters = async (req, res) => {
  try {
    // Capturamos las variables de consulta de la URL (?category=X&price=Y)
    const category = req.query.category;
    const price = req.query.price;

    // Validación básica: Si no mandan ningún filtro, avisamos al cliente
    if (category === undefined && price === undefined) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un filtro (category o price)' });
    }

    // Enviamos los filtros al servicio especializado
    const products = await getProductsByFiltersService({ category, price });

    if (products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos con esos criterios de búsqueda' });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al filtrar productos' });
  }
};

/**
 * 3. Obtener un único producto por su ID
 * Endpoint: GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdService(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

/**
 * 4. Crear un nuevo producto
 * Endpoint: POST /api/products
 */
export const createProduct = async (req, res) => {
  const producto = req.body; 
  if (!producto || !producto.name) {
    return res.status(400).json({ message: 'Información del producto inválida' });
  }
  try {
    const id = await createProductService(producto);
    producto.id = id;
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el producto' });
  }
};

/**
 * 5. Actualizar campos de un producto existente
 * Endpoint: PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await updateProductService(id, data);
    return res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

/**
 * 6. Eliminar un producto por su ID
 * Endpoint: DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteProductService(id);
    return res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};
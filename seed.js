import { createProductService } from './src/servicios/products.service.js';

const initialProducts = [
    { name: "Mouse Gamer", price: 25000, category: "perifericos", stock: 10, description: "Mouse óptico 16000 DPI" },
    { name: "Monitor 24'", price: 180000, category: "monitores", stock: 5, description: "Monitor IPS 144Hz" },
    { name: "Auriculares 7.1", price: 35000, category: "audio", stock: 8, description: "Sonido envolvente" },
    { name: "Teclado Mecánico RGB", price: 45000, category: "perifericos", stock: 15, description: "Teclado gamer con switches azules" },
    { name: "Silla Gamer Ergonómica", price: 120000, category: "muebles", stock: 4, description: "Silla con soporte lumbar y cervical" },
    { name: "Webcam Full HD 1080p", price: 35000, category: "perifericos", stock: 20, description: "Webcam con micrófono integrado" },
    { name: "Placa de Video RTX 3060", price: 450000, category: "hardware", stock: 3, description: "Placa de video de alta gama" },
    { name: "Procesador Intel i7", price: 380000, category: "hardware", stock: 6, description: "Procesador de 12va generación" },
    { name: "Disco SSD 1TB NVMe", price: 65000, category: "hardware", stock: 25, description: "Almacenamiento ultra rápido" },
    { name: "Fuente de Poder 750W", price: 85000, category: "hardware", stock: 12, description: "Fuente modular certificada 80 Plus" },
    { name: "Gabinete ATX Vidrio", price: 55000, category: "hardware", stock: 10, description: "Gabinete con panel lateral de vidrio templado" },
    { name: "Router WiFi 6", price: 42000, category: "redes", stock: 18, description: "Router de alta velocidad" },
    { name: "Parlantes 2.1 Bluetooth", price: 28000, category: "audio", stock: 9, description: "Sistema de audio inalámbrico" },
    { name: "Micrófono Condensador", price: 48000, category: "audio", stock: 7, description: "Micrófono ideal para streaming" }
];

const seed = async () => {
    console.log("🚀 Iniciando carga de productos en Firebase...");
    try {
        for (const product of initialProducts) {
            // Adaptamos para que use el nombre de tu función de servicios
            const id = await createProductService(product);
            console.log(`✅ Producto creado: ${product.name} con ID: ${id}`);
        }
        console.log("✨ Proceso de semilla terminado con éxito");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error en la carga:", error.message);
        process.exit(1);
    }
};

seed();
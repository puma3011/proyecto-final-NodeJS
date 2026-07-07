# 🚀 API REST - Catálogo de Productos

API REST desarrollada con **Node.js y Express** para la administración de un catálogo de productos.  
El proyecto implementa persistencia en la nube mediante **Firebase Firestore** y autenticación segura utilizando **JSON Web Tokens (JWT)**.

Este proyecto corresponde al ejercicio final del curso **Node.js - Talento Tech (Comisión 26132)**.

---

## 📌 Características principales

- ✅ API REST con Express
- ✅ Arquitectura modular por capas
- ✅ CRUD completo de productos
- ✅ Persistencia de datos con Firebase Firestore
- ✅ Autenticación mediante JWT
- ✅ Rutas protegidas con middleware
- ✅ Variables de entorno para configuración segura
- ✅ Pruebas de endpoints utilizando REST Client de VS Code

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- Firebase Firestore
- JSON Web Token (JWT)
- CORS
- Dotenv
- Nodemon
- REST Client (VS Code)

---

## 📂 Estructura del proyecto

```
proyecto-final/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── controllers/
│   │   └── products.Controller.js
│   │
│   ├── data/
│   │   └── firebase.data.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   └── firestore.models.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── products.Routes.js
│   │
│   └── services/
│       └── products.service.js
│
├── api.http
├── index.js
├── seed.js
├── package.json
└── .env.example
```

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta:

```bash
cd proyecto-final
```

Instalar dependencias:

```bash
npm install
```

---

## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Completar los valores con la configuración correspondiente de Firebase.

---

## ▶️ Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

Servidor disponible en:

```
http://localhost:3000
```

---

## 🔑 Autenticación

Para acceder a las operaciones protegidas se debe obtener un token JWT mediante:

```
POST /api/auth/login
```

Ejemplo:

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

El token obtenido debe enviarse en las rutas protegidas:

```
Authorization: Bearer TOKEN
```

---

## 📌 Endpoints principales

### Productos públicos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener producto por ID |
| GET | `/api/products/filter` | Filtrar productos |

### Productos protegidos

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |

---

## 🧪 Pruebas

El proyecto incluye un archivo:

```
api.http
```

que permite probar los endpoints directamente desde Visual Studio Code utilizando la extensión:

**REST Client - Huachao Mao**

---

## 👨‍💻 Autor

Proyecto realizado como parte del curso:

**Talento Tech - Node.js**

---

## 📄 Licencia

Proyecto educativo desarrollado con fines de aprendizaje.

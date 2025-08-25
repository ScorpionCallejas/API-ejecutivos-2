# API de Gestión de Ejecutivos

API REST completa para la gestión de ejecutivos con autenticación por tokens y múltiples endpoints para consultas específicas.

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Autenticación](#autenticación)
- [Endpoints](#endpoints)
  - [CRUD Básico](#crud-básico)
  - [Datos Específicos](#datos-específicos)
  - [Filtros](#filtros)
  - [Estados](#estados)
  - [Temporales](#temporales)
  - [Utilidades](#utilidades)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)

## Requisitos

- Node.js (versión 18 o superior)
- MySQL (versión 5.7 o superior)
- npm o yarn

## Instalación

1. Clona o descarga los archivos del proyecto
2. Instala las dependencias:

```bash
npm install
```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_HOST=localhost
DB_PORT=3307
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_datos
PORT=3000
```

2. Asegúrate de tener la base de datos MySQL creada y la tabla `ejecutivo` con la estructura adecuada.

## Autenticación

La API utiliza autenticación por token. Debes incluir un token válido en los headers de tus solicitudes:

### Headers requeridos:

```http
x-api-token: tu_token_valido
```
o
```http
Authorization: tu_token_valido
```

### Tokens válidos preconfigurados:

- `abc123def456`
- `xyz789uvw012`
- `token_cliente_1`
- `token_cliente_2`
- `callejas`

## Endpoints

### CRUD Básico

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/ejecutivos` | Obtener todos los ejecutivos |
| GET | `/api/ejecutivos/:id` | Obtener ejecutivo por ID |
| POST | `/api/ejecutivos` | Crear nuevo ejecutivo |
| PUT | `/api/ejecutivos/:id` | Actualizar ejecutivo |
| DELETE | `/api/ejecutivos/:id` | Eliminar ejecutivo |

### Datos Específicos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/ejecutivos/nombres/todos` | Solo nombres de ejecutivos |
| GET | `/api/ejecutivos/telefonos/todos` | Solo teléfonos de ejecutivos |
| GET | `/api/ejecutivos/emails/todos` | Solo emails de ejecutivos |

### Filtros

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/ejecutivos/estado/:estado` | Ejecutivos por estado |
| GET | `/api/ejecutivos/rango/:rango` | Ejecutivos por rango |
| GET | `/api/ejecutivos/genero/:genero` | Ejecutivos por género |
| GET | `/api/ejecutivos/tipo/:tipo` | Ejecutivos por tipo |
| GET | `/api/ejecutivos/plantel/:id_pla` | Ejecutivos por plantel |
| GET | `/api/ejecutivos/usuario/:usuario` | Ejecutivos por usuario |
| GET | `/api/ejecutivos/esquema/:esquema` | Ejecutivos por esquema de color |

### Estados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/ejecutivos/activos/todos` | Solo ejecutivos activos |
| GET | `/api/ejecutivos/inactivos/todos` | Solo ejecutivos inactivos |
| GET | `/api/ejecutivos/con-foto/todos` | Ejecutivos con foto de perfil |
| GET | `/api/ejecutivos/sin-foto/todos` | Ejecutivos sin foto de perfil |
| GET | `/api/ejecutivos/con-descripcion/todos` | Ejecutivos con descripción |
| GET | `/api/ejecutivos/con-equipo/todos` | Ejecutivos con equipo asignado |
| GET | `/api/ejecutivos/con-permisos/todos` | Ejecutivos con permisos especiales |

### Temporales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/ejecutivos/recientes/todos` | Ejecutivos recientes (30 días) |
| GET | `/api/ejecutivos/anio-ingreso/:anio` | Ejecutivos por año de ingreso |
| GET | `/api/ejecutivos/rango-nacimiento/todos` | Ejecutivos por rango de nacimiento |

### Utilidades

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/ejecutivos/buscar/ejecutivos` | Buscar ejecutivos |
| GET | `/api/ejecutivos/estadisticas/generales` | Estadísticas generales |
| GET | `/api/ejecutivos/paginacion/todos` | Paginación de ejecutivos |
| GET | `/api/ejecutivos/top/todos` | Top ejecutivos |
| GET | `/api/ejecutivos/count/todos` | Count por criterio |

## Ejemplos de Uso

### Obtener todos los ejecutivos

```bash
curl -X GET http://localhost:3000/api/ejecutivos \
  -H "x-api-token: abc123def456"
```

### Buscar ejecutivos

```bash
curl -X GET "http://localhost:3000/api/ejecutivos/buscar/ejecutivos?query=Juan" \
  -H "x-api-token: abc123def456"
```

### Obtener estadísticas

```bash
curl -X GET http://localhost:3000/api/ejecutivos/estadisticas/generales \
  -H "x-api-token: abc123def456"
```

### Paginación de resultados

```bash
curl -X GET "http://localhost:3000/api/ejecutivos/paginacion/todos?page=2&limit=5" \
  -H "x-api-token: abc123def456"
```

### Crear nuevo ejecutivo

```bash
curl -X POST http://localhost:3000/api/ejecutivos \
  -H "Content-Type: application/json" \
  -H "x-api-token: abc123def456" \
  -d '{
    "nom_eje": "Juan Pérez",
    "tel_eje": "555-1234"
  }'
```

## Estructura de la Base de Datos

La API espera una tabla `ejecutivo` con la siguiente estructura (aproximada):

```sql
CREATE TABLE ejecutivo (
  id_eje INT PRIMARY KEY AUTO_INCREMENT,
  nom_eje VARCHAR(255),
  app_eje VARCHAR(255),
  apm_eje VARCHAR(255),
  tel_eje VARCHAR(20),
  cor_eje VARCHAR(255),
  cor2_eje VARCHAR(255),
  est_eje VARCHAR(50),
  ran_eje VARCHAR(50),
  gen_eje VARCHAR(10),
  tip_eje VARCHAR(50),
  id_pla INT,
  usu_eje VARCHAR(100),
  fot_eje TEXT,
  des_eje TEXT,
  per_eje VARCHAR(50),
  swi_eje VARCHAR(50),
  equ_eje VARCHAR(100),
  nac_eje DATE,
  ing_eje DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Iniciar el Servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado).

## Ver Endpoints Disponibles

Visita `http://localhost:3000/api/endpoints` para ver una lista completa de todos los endpoints disponibles.

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express.js
- MySQL2
- CORS
- dotenv

## 📝 Notas

- Todos los endpoints requieren autenticación por token
- Las respuestas siguen el formato: `{ success: boolean, data: any, message?: string }`
- Los errores devuelven el código HTTP apropiado y un mensaje descriptivo
- La API incluye manejo de errores y validaciones básicas

Este README proporciona una documentación completa para usar la API de gestión de ejecutivos. ¡Listo para copiar y pegar!

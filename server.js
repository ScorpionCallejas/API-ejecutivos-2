const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ejecutivoRoutes = require('./src/routes/ejecutivoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/ejecutivos', ejecutivoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Ejecutivos funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      todos: '/api/ejecutivos',
      por_id: '/api/ejecutivos/:id',
      nombres: '/api/ejecutivos/nombres/todos',
      telefonos: '/api/ejecutivos/telefonos/todos',
      emails: '/api/ejecutivos/emails/todos',
      buscar: '/api/ejecutivos/buscar/ejecutivos?query=nombre',
      estadisticas: '/api/ejecutivos/estadisticas/generales',
      paginacion: '/api/ejecutivos/paginacion/todos?page=1&limit=10'
    }
  });
});

// Ruta para mostrar todos los endpoints disponibles
app.get('/api/endpoints', (req, res) => {
  res.json({
    success: true,
    endpoints: {
      // CRUD básico
      'GET /api/ejecutivos': 'Obtener todos los ejecutivos',
      'GET /api/ejecutivos/:id': 'Obtener ejecutivo por ID',
      'POST /api/ejecutivos': 'Crear nuevo ejecutivo',
      'PUT /api/ejecutivos/:id': 'Actualizar ejecutivo',
      'DELETE /api/ejecutivos/:id': 'Eliminar ejecutivo',
      
      // Datos específicos
      'GET /api/ejecutivos/nombres/todos': 'Solo nombres de ejecutivos',
      'GET /api/ejecutivos/telefonos/todos': 'Solo teléfonos de ejecutivos',
      'GET /api/ejecutivos/emails/todos': 'Solo emails de ejecutivos',
      
      // Filtros
      'GET /api/ejecutivos/estado/:estado': 'Ejecutivos por estado',
      'GET /api/ejecutivos/rango/:rango': 'Ejecutivos por rango',
      'GET /api/ejecutivos/genero/:genero': 'Ejecutivos por género',
      'GET /api/ejecutivos/tipo/:tipo': 'Ejecutivos por tipo',
      'GET /api/ejecutivos/plantel/:id_pla': 'Ejecutivos por plantel',
      'GET /api/ejecutivos/usuario/:usuario': 'Ejecutivos por usuario',
      'GET /api/ejecutivos/esquema/:esquema': 'Ejecutivos por esquema de color',
      
      // Estados
      'GET /api/ejecutivos/activos/todos': 'Solo ejecutivos activos',
      'GET /api/ejecutivos/inactivos/todos': 'Solo ejecutivos inactivos',
      'GET /api/ejecutivos/con-foto/todos': 'Ejecutivos con foto de perfil',
      'GET /api/ejecutivos/sin-foto/todos': 'Ejecutivos sin foto de perfil',
      'GET /api/ejecutivos/con-descripcion/todos': 'Ejecutivos con descripción',
      'GET /api/ejecutivos/con-equipo/todos': 'Ejecutivos con equipo asignado',
      'GET /api/ejecutivos/con-permisos/todos': 'Ejecutivos con permisos especiales',
      
      // Temporales
      'GET /api/ejecutivos/recientes/todos': 'Ejecutivos recientes (30 días)',
      'GET /api/ejecutivos/anio-ingreso/:anio': 'Ejecutivos por año de ingreso',
      'GET /api/ejecutivos/rango-nacimiento/todos?desde=YYYY-MM-DD&hasta=YYYY-MM-DD': 'Ejecutivos por rango de nacimiento',
      
      // Utilidades
      'GET /api/ejecutivos/buscar/ejecutivos?query=texto': 'Buscar ejecutivos',
      'GET /api/ejecutivos/estadisticas/generales': 'Estadísticas generales',
      'GET /api/ejecutivos/paginacion/todos?page=1&limit=10': 'Paginación de ejecutivos',
      'GET /api/ejecutivos/top/todos?limit=10': 'Top ejecutivos',
      'GET /api/ejecutivos/count/todos?criterio=campo&valor=valor': 'Count por criterio'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles en: http://localhost:${PORT}/api/endpoints`);
});
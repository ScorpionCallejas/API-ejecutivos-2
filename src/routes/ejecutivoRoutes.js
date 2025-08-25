const express = require('express');
const ejecutivoController = require('../controllers/ejecutivoController');
// JavaScript
const tokenAuth = require('../middleware/tokenAuth');

const router = express.Router();

router.use(tokenAuth);

// Rutas CRUD existentes
router.get('/', ejecutivoController.getAllEjecutivos);
router.get('/:id', ejecutivoController.getEjecutivoById);
router.post('/', ejecutivoController.createEjecutivo);
router.put('/:id', ejecutivoController.updateEjecutivo);
router.delete('/:id', ejecutivoController.deleteEjecutivo);

// Nuevas rutas - Datos específicos
router.get('/nombres/todos', ejecutivoController.getNombresEjecutivos);
router.get('/telefonos/todos', ejecutivoController.getTelefonosEjecutivos);
router.get('/emails/todos', ejecutivoController.getEmailsEjecutivos);

// Nuevas rutas - Filtros
router.get('/estado/:estado', ejecutivoController.getEjecutivosPorEstado);
router.get('/rango/:rango', ejecutivoController.getEjecutivosPorRango);
router.get('/genero/:genero', ejecutivoController.getEjecutivosPorGenero);
router.get('/tipo/:tipo', ejecutivoController.getEjecutivosPorTipo);
router.get('/plantel/:id_pla', ejecutivoController.getEjecutivosPorPlantel);
router.get('/usuario/:usuario', ejecutivoController.getEjecutivosPorUsuario);
router.get('/esquema/:esquema', ejecutivoController.getEjecutivosPorEsquemaColor);

// Nuevas rutas - Estados
router.get('/activos/todos', ejecutivoController.getEjecutivosActivos);
router.get('/inactivos/todos', ejecutivoController.getEjecutivosInactivos);
router.get('/con-foto/todos', ejecutivoController.getEjecutivosConFoto);
router.get('/sin-foto/todos', ejecutivoController.getEjecutivosSinFoto);
router.get('/con-descripcion/todos', ejecutivoController.getEjecutivosConDescripcion);
router.get('/con-equipo/todos', ejecutivoController.getEjecutivosConEquipo);
router.get('/con-permisos/todos', ejecutivoController.getEjecutivosConPermisos);

// Nuevas rutas - Temporales
router.get('/recientes/todos', ejecutivoController.getEjecutivosRecientes);
router.get('/anio-ingreso/:anio', ejecutivoController.getEjecutivosPorAnioIngreso);
router.get('/rango-nacimiento/todos', ejecutivoController.getEjecutivosPorRangoNacimiento);

// Nuevas rutas - Utilidades
router.get('/buscar/ejecutivos', ejecutivoController.buscarEjecutivos);
router.get('/estadisticas/generales', ejecutivoController.getEstadisticas);
router.get('/paginacion/todos', ejecutivoController.getEjecutivosPaginados);
router.get('/top/todos', ejecutivoController.getTopEjecutivos);
router.get('/count/todos', ejecutivoController.getCountEjecutivos);

module.exports = router;
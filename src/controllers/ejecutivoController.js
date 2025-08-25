const db = require('../config/database');

const ejecutivoController = {
  // Obtener todos los ejecutivos
  getAllEjecutivos: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM ejecutivo ORDER BY nom_eje ASC');
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener ejecutivo por ID
  getEjecutivoById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE id_eje = ?', 
        [id]
      );
      
      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Ejecutivo no encontrado'
        });
      }

      res.json({
        success: true,
        data: rows[0]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 1. Solo nombres
  getNombresEjecutivos: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT id_eje, nom_eje, app_eje, apm_eje FROM ejecutivo ORDER BY nom_eje ASC'
      );
      
      const nombres = rows.map(ejecutivo => ({
        id: ejecutivo.id_eje,
        nombre_completo: `${ejecutivo.nom_eje || ''} ${ejecutivo.app_eje || ''} ${ejecutivo.apm_eje || ''}`.trim(),
        nombre: ejecutivo.nom_eje,
        apellido_paterno: ejecutivo.app_eje,
        apellido_materno: ejecutivo.apm_eje
      }));

      res.json({
        success: true,
        data: nombres
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 2. Solo teléfonos
  getTelefonosEjecutivos: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT id_eje, nom_eje, app_eje, apm_eje, tel_eje FROM ejecutivo ORDER BY nom_eje ASC'
      );
      
      const telefonos = rows.map(ejecutivo => ({
        id: ejecutivo.id_eje,
        nombre_completo: `${ejecutivo.nom_eje || ''} ${ejecutivo.app_eje || ''} ${ejecutivo.apm_eje || ''}`.trim(),
        telefono: ejecutivo.tel_eje
      }));

      res.json({
        success: true,
        data: telefonos
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 3. Solo emails
  getEmailsEjecutivos: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT id_eje, nom_eje, app_eje, apm_eje, cor_eje, cor2_eje FROM ejecutivo ORDER BY nom_eje ASC'
      );
      
      const emails = rows.map(ejecutivo => ({
        id: ejecutivo.id_eje,
        nombre_completo: `${ejecutivo.nom_eje || ''} ${ejecutivo.app_eje || ''} ${ejecutivo.apm_eje || ''}`.trim(),
        email_principal: ejecutivo.cor_eje,
        email_secundario: ejecutivo.cor2_eje
      }));

      res.json({
        success: true,
        data: emails
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 4. Por estado
  getEjecutivosPorEstado: async (req, res) => {
    try {
      const { estado } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE est_eje = ? ORDER BY nom_eje ASC',
        [estado]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 5. Por rango
  getEjecutivosPorRango: async (req, res) => {
    try {
      const { rango } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE ran_eje = ? ORDER BY nom_eje ASC',
        [rango]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 6. Activos
  getEjecutivosActivos: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE est_eje = "Activo" ORDER BY nom_eje ASC'
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 7. Inactivos
  getEjecutivosInactivos: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE est_eje != "Activo" ORDER BY nom_eje ASC'
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 8. Por plantel
  getEjecutivosPorPlantel: async (req, res) => {
    try {
      const { id_pla } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE id_pla = ? ORDER BY nom_eje ASC',
        [id_pla]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 9. Búsqueda
  buscarEjecutivos: async (req, res) => {
    try {
      const { query } = req.query;
      const [rows] = await db.execute(
        `SELECT * FROM ejecutivo 
         WHERE nom_eje LIKE ? OR app_eje LIKE ? OR apm_eje LIKE ? 
         OR cor_eje LIKE ? OR tel_eje LIKE ?
         ORDER BY nom_eje ASC`,
        [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 10. Estadísticas
  getEstadisticas: async (req, res) => {
    try {
      const [total] = await db.execute('SELECT COUNT(*) as total FROM ejecutivo');
      const [activos] = await db.execute('SELECT COUNT(*) as activos FROM ejecutivo WHERE est_eje = "Activo"');
      const [porRango] = await db.execute('SELECT ran_eje, COUNT(*) as cantidad FROM ejecutivo GROUP BY ran_eje');
      const [porPlantel] = await db.execute('SELECT id_pla, COUNT(*) as cantidad FROM ejecutivo GROUP BY id_pla');
      const [porGenero] = await db.execute('SELECT gen_eje, COUNT(*) as cantidad FROM ejecutivo WHERE gen_eje IS NOT NULL GROUP BY gen_eje');
      
      res.json({
        success: true,
        data: {
          total: total[0].total,
          activos: activos[0].activos,
          inactivos: total[0].total - activos[0].activos,
          por_rango: porRango,
          por_plantel: porPlantel,
          por_genero: porGenero
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 11. Por género
  getEjecutivosPorGenero: async (req, res) => {
    try {
      const { genero } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE gen_eje = ? ORDER BY nom_eje ASC',
        [genero]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 12. Con foto de perfil
  getEjecutivosConFoto: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE fot_eje IS NOT NULL ORDER BY nom_eje ASC'
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 13. Sin foto de perfil
  getEjecutivosSinFoto: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE fot_eje IS NULL ORDER BY nom_eje ASC'
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 14. Por tipo de ejecutivo
  getEjecutivosPorTipo: async (req, res) => {
    try {
      const { tipo } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE tip_eje = ? ORDER BY nom_eje ASC',
        [tipo]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 15. Ejecutivos recientes (últimos 30 días)
  getEjecutivosRecientes: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE ing_eje >= DATE_SUB(NOW(), INTERVAL 30 DAY) ORDER BY ing_eje DESC'
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 16. Por año de ingreso
  getEjecutivosPorAnioIngreso: async (req, res) => {
    try {
      const { anio } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE YEAR(ing_eje) = ? ORDER BY ing_eje DESC',
        [anio]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 17. Con permisos especiales
  getEjecutivosConPermisos: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE per_eje = "Autorizado" OR per_eje = "1" OR per_eje = "2" ORDER BY nom_eje ASC'
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 18. Por esquema de color
  getEjecutivosPorEsquemaColor: async (req, res) => {
    try {
      const { esquema } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE swi_eje = ? ORDER BY nom_eje ASC',
        [esquema]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 19. Con descripción/biografía
  getEjecutivosConDescripcion: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE des_eje IS NOT NULL AND des_eje != "" ORDER BY nom_eje ASC'
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 20. Por usuario específico
  getEjecutivosPorUsuario: async (req, res) => {
    try {
      const { usuario } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE usu_eje = ? ORDER BY nom_eje ASC',
        [usuario]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 21. Paginación de ejecutivos
  getEjecutivosPaginados: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo ORDER BY nom_eje ASC LIMIT ? OFFSET ?',
        [parseInt(limit), parseInt(offset)]
      );
      
      const [total] = await db.execute('SELECT COUNT(*) as total FROM ejecutivo');
      
      res.json({
        success: true,
        data: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total[0].total,
          pages: Math.ceil(total[0].total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 22. Top ejecutivos por cantidad
  getTopEjecutivos: async (req, res) => {
    try {
      const { limit = 10 } = req.query;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo ORDER BY id_eje DESC LIMIT ?',
        [parseInt(limit)]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 23. Ejecutivos con equipo asignado
  getEjecutivosConEquipo: async (req, res) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE equ_eje IS NOT NULL AND equ_eje != "" ORDER BY nom_eje ASC'
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 24. Por fecha de nacimiento (rango)
  getEjecutivosPorRangoNacimiento: async (req, res) => {
    try {
      const { desde, hasta } = req.query;
      const [rows] = await db.execute(
        'SELECT * FROM ejecutivo WHERE nac_eje BETWEEN ? AND ? ORDER BY nac_eje ASC',
        [desde, hasta]
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // 25. Count por diversos criterios
  getCountEjecutivos: async (req, res) => {
    try {
      const { criterio, valor } = req.query;
      
      let query = 'SELECT COUNT(*) as count FROM ejecutivo';
      let params = [];
      
      if (criterio && valor) {
        query += ` WHERE ${criterio} = ?`;
        params.push(valor);
      }
      
      const [result] = await db.execute(query, params);
      
      res.json({
        success: true,
        count: result[0].count
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Crear nuevo ejecutivo
  createEjecutivo: async (req, res) => {
    try {
      const { nom_eje, tel_eje } = req.body;
      const [result] = await db.execute(
        'INSERT INTO ejecutivo (nom_eje, tel_eje) VALUES (?, ?)',
        [nom_eje, tel_eje]
      );

      res.status(201).json({
        success: true,
        message: 'Ejecutivo creado exitosamente',
        data: {
          id_eje: result.insertId,
          nom_eje,
          tel_eje
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Actualizar ejecutivo
  updateEjecutivo: async (req, res) => {
    try {
      const { id } = req.params;
      const { nom_eje, tel_eje } = req.body;
      
      const [result] = await db.execute(
        'UPDATE ejecutivo SET nom_eje = ?, tel_eje = ? WHERE id_eje = ?',
        [nom_eje, tel_eje, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Ejecutivo no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Ejecutivo actualizado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Eliminar ejecutivo
  deleteEjecutivo: async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await db.execute(
        'DELETE FROM ejecutivo WHERE id_eje = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Ejecutivo no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Ejecutivo eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = ejecutivoController;
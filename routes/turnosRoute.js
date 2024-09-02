//rutas para los turnos
const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnoController'); //importo el controller para poder utilizar sus funciones

//ruta para listar los turnos
router.get('/turnos', turnosController.listarTurnos);

//rutas a agregar

module.exports = router; //exporto el módulo para que pueda ser incorporado en app.js
const express = require('express');
const router = express.Router();
const TurnoController = require('../controllers/turnoController'); //importo el controller para poder utilizar sus funciones
const turnoController = new TurnoController();
const TurnoModel = require('../models/turnoModel');
const turnoModel = new TurnoModel();

//Ruta para listar los turnos
router.get('/turnos', turnoController.listarTurnos);

//Ruta para editar y agregar turnos
router.get('/turnos/editar/:id', turnoController.editarTurno);
router.get('/turnos/agregar/0', turnoController.agregarTurno);

//Ruta para guardar cambios
router.post('/tunos/editar/:id', turnoController.guardarTurno);

//Ruta para eliminar turnos
router.delete('/turnos/eliminar/:id', turnoController.eliminarTurno);

module.exports = router; //exporto el módulo para que pueda ser incorporado en app.js
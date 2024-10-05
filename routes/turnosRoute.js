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
router.post('/turnos/editar/:id', turnoController.guardarTurno);

router.get('/turnos/agregar/0', turnoController.agregarTurno);
router.post('/turnos/agregar/0', turnoController.guardarTurno);

//Ruta para eliminar turnos
router.delete('/turnos/eliminar/:id', turnoController.eliminarTurno);

router.post('/turnos/confirmar', turnoController.confirmarTurno)

module.exports = router; //exporto el módulo para que pueda ser incorporado en app.js

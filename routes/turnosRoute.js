const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnoController'); //importo el controller para poder utilizar sus funciones

//Rutas a agregar
//router.post('/turnos/insertar', turnosController.insertarTurnos);
router.get('/turnos/insertar', turnosController.renderAddTurn)

//Ruta para listar los turnos
router.get('/turnos', turnosController.listarTurnos);

//Ruta para editar turnos

module.exports = router; //exporto el módulo para que pueda ser incorporado en app.js
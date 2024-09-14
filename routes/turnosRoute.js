const express = require('express');
const router = express.Router();
const TurnoController = require('../controllers/turnoController'); //importo el controller para poder utilizar sus funciones
const turnoController = new TurnoController();
const TurnoModel = require('../models/turnoModel');
const turnoModel = new TurnoModel();

//Ruta para listar los turnos
router.get('/turnos', turnoController.listarTurnos);

//Rutas a agregar


//Ruta para editar turnos
router.get('/turnos/editar/:id', (req, res)=>{

});

module.exports = router; //exporto el módulo para que pueda ser incorporado en app.js
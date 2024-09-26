const express = require('express');
const router = express.Router();
const PacienteController = require('../controllers/pacienteController'); //importo el controller para poder utilizar sus funciones
const pacienteController = new PacienteController();
const PacienteModel = require('../models/pacienteModel');
const pacienteModel = new PacienteModel();

//Ruta para listar los pacientes
router.get('/pacientes', pacienteController.listarPacientes);

//Ruta para editar y agregar pacientes
router.get('/pacientes/editar/:id', pacienteController.editarPaciente);
router.post('/pacientes/editar/:id', pacienteController.guardarPaciente);
router.get('/pacientes/agregar/0', pacienteController.mostrarAgregarPaciente);
router.post('/pacientes/agregar/0', pacienteController.guardarPaciente);


//Ruta para eliminar pacientes
router.delete('/pacientes/eliminar/:id', pacienteController.eliminarPaciente);

module.exports = router; //exporto el módulo para que pueda ser incorporado en app.js

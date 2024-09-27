// routes/medicos.js
const express = require('express');
const router = express.Router();
const MedicoController = require('../controllers/medicoController');
const medicoController = new MedicoController();
const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();
const upload = require('../middleware/upload');


// Ruta para listar todos los médicos
router.get('/medicos', medicoController.listarMedicos);


// Rutas para mostrar el formulario de inserción de un nuevo médico y guardar nuevo médico
router.get('/medico/agregar/0', medicoController.insertarMedico);
router.post('/medico/agregar/0', upload.single('foto'), medicoController.guardarMedico);

// Rutas para mostrar el formulario de edición de un médico (por ID) y guardar datos actualizados
router.get('/medico/editar/:id', medicoController.editarMedico);
router.post('/medico/editar/:id', upload.single('foto'), medicoController.guardarMedico)


// Ruta para eliminar un médico (por ID)
router.delete('/medicos/eliminar/:id', medicoController.eliminarMedico);

module.exports = router;
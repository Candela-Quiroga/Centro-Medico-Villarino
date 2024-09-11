// routes/medicos.js
const express = require('express');
const router = express.Router();
const MedicoController = require('../controllers/medicoController');
const medicoController = new MedicoController();

// Ruta para mostrar el formulario de inserción de un nuevo médico
router.get('/medico/insertar', medicoController.obtenerEspecialidades, (req, res) => {
    medicoController.mostrarFormulario(req, res);
});

// Ruta para listar todos los médicos
router.get('/medicos', (req, res) => {
    medicoController.listarMedicos(req, res);
});

// Ruta para mostrar el formulario de edición de un médico (por ID)
router.get('/medico/editar/:id', medicoController.obtenerEspecialidades, (req, res) => {
    medicoController.editarMedico(req, res);
});

// Ruta para guardar un médico (crear o actualizar)
router.post('/medico/guardar', (req, res) => {
    medicoController.guardarMedico(req, res);
});

// Ruta para eliminar un médico (por ID)
router.post('/medico/eliminar/:id', (req, res) => {
    medicoController.eliminarMedico(req, res);
});

module.exports = router;
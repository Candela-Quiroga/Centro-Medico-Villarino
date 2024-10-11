// routes/medicos.js
const express = require('express');
const router = express.Router();
const HorarioController = require('../controllers/horarioController');
const horarioController = new HorarioController();


// Ruta para listar todos los horarios
router.get('/medico/:medicoId/horarios', horarioController.listarHorarios);


// Rutas para mostrar el formulario de inserción de un nuevo médico y guardar nuevo médico
router.get('/medico/:medicoId/horarios/agregar', horarioController.agregarHorario);
router.post('/medico/:medicoId/horarios/agregar', horarioController.guardarHorario);

// Rutas para mostrar el formulario de edición de un médico (por ID) y guardar datos actualizados
router.get('/medico/:medicoId/horarios/editar/:horarioId', horarioController.editarHorario);
router.post('/medico/:medicoId/horarios/editar/:horarioId', horarioController.guardarHorario);


// Ruta para eliminar un médico (por ID)
router.delete('/medico/:medicoId/horarios/eliminar/:horarioId', horarioController.eliminarHorario);

module.exports = router;

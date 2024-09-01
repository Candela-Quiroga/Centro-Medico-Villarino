//AGREGAREMOS LOS COMENTARIOS DE TODO EN CADA LINEA UNA VEZ NOS FUNCIONE EL ABML

const express = require ('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

router.get('/medicos', medicoController.getAllMedicos);
router.get('/medico/:id', medicoController.getMedicoById);
router.post('/medico', medicoController.createMedico);
router.put('/medico/:id', medicoController.updateMedico);
router.delete('/medico/:id', medicoController.deleteMedico);

module.exports = medicosRoute //es para exportar el modulo.
const express = require('express');
const router = express.Router();
const HistoriaClinicaController = require('../controllers/historiaClinicaController'); //importo el controller para poder utilizar sus funciones
const historiaClinicaController = new HistoriaClinicaController();
const HistoriaClinicaModel = require('../models/historiaClinicaModel');
const historiaClinicaModel = new HistoriaClinicaModel();

//Ruta para listar los historiaClinicas
router.get('/historiasclinicas', historiaClinicaController.listarHistoriaClinica);

//Ruta para editar y agregar historiaClinicas
router.get('/historiasclinicas/editar/:id', historiaClinicaController.editarHistoriaClinica);
router.post('/historiasclinicas/editar/:id', historiaClinicaController.guardarHistoriaClinica);
router.get('/historiasclinicas/agregar/0', historiaClinicaController.AgregarHistoriaClinica);
router.post('/historiasclinicas/agregar/0', historiaClinicaController.guardarHistoriaClinica);
router.get('/historiasclinicas/imprimir/:id', historiaClinicaController.imprimirHistoriaClinica);

//Ruta para eliminar historiaClinicas
router.delete('/historiasclinicas/eliminar/:id', historiaClinicaController.eliminarHistoriaClinica);

module.exports = router; //exporto el módulo para que pueda ser incorporado en app.js
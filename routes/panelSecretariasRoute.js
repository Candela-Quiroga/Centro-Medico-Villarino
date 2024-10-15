const express = require('express');
const router = express.Router();

const PanelSecretariaController = require('../controllers/panelSecretariaController');
const panelSecretariaController = new PanelSecretariaController();


//rutas redirección a home
router.get('/panelSecretaria',panelSecretariaController.mostrarPanelGeneral);



module.exports = router;
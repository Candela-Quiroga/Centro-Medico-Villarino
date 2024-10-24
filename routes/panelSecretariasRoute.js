const express = require('express');
const router = express.Router();

const PanelSecretariaController = require('../controllers/panelSecretariaController');
const panelSecretariaController = new PanelSecretariaController();
const autenticar = require('../middleware/autenticacion')([3]); 

//rutas redirección a home
router.get('/panelSecretaria', autenticar,panelSecretariaController.mostrarPanelGeneral);

module.exports = router;
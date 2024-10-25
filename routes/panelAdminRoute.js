const express = require('express');
const router = express.Router();

const PanelAdminController = require('../controllers/panelAdminController');
const panelAdminController = new PanelAdminController();

//rutas redirección a home
router.get('/panelAdmin', panelAdminController.mostrarPanelGeneral);

module.exports = router;
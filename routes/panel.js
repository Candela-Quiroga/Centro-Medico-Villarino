const express = require("express");
const router = express.Router();

const PanelController = require("../controllers/panelController");
const panelController = new PanelController();

router.get('/panel/listado', panelController.mostrarListado);

module.exports = router;
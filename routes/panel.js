const express = require("express");
const router = express.Router();

const controllerPanel = require("../controllers/usuarioController");
const panelController = new controllerPanel();

router.get('/panel/listado', panelController.mostrarListado);

module.exports = router;
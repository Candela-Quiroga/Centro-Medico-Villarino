const express = require('express');
const router = express.Router();

const WebController = require('../controllers/webController');
const webController = new WebController();


//rutas redirección a home
router.get('/',webController.mostrarHome);

//ruta a nosotros
router.get('/nosotros', webController.mostrarNosotros);

//ruta a profesionales
router.get('/profesionales', webController.mostrarProfesionales);

//ruta a coberturas
router.get('/coberturas', webController.mostrarCoberturas);

//ruta a contacto
router.get('/contacto', webController.mostrarContacto);

//ruta a Pedir Turno
router.get('/pedirTurno', webController.mostrarPedirTurno);

module.exports = router;
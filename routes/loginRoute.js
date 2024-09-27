//loginRoute.js
const express = require('express');
const router = express.Router(); //permite crear diferentes tipos de rutas para después exportarlas

const LoginController = require('../controllers/loginController'); 
const loginController = new LoginController();

//rutas para ingreso
router.get('/login', loginController.mostrarFormulario); 
router.post('/login', loginController.validarFormulario);

module.exports = router;

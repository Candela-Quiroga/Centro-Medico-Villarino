const express = require('express');
const router = express.Router(); //permite crear diferentes tipos de rutas para después exportarlas

const LoginController = require('../controllers/loginController'); 
const loginController = new LoginController();

//rutas para ingreso
router.get('/login', loginController.mostrarFormulario); 
router.post('/login', loginController.validarFormulario);

module.exports = router; //estamos diciendo "vamos a exportar el modulo router". Este modulo es el de la linea 2 y tiene las rutas generadas.

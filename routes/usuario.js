const express = require('express');

const router = express.Router(); //permite crear diferentes tipos de rutas para después exportarlas. AL poder exportarlas, en el app.js vamos a tener
const UsuarioController = require('../controllers/usuarioController'); 
const usuarioController = new UsuarioController();

//rutas para abml
router.get('/usuarios', usuarioController.listarUsuarios); //va a decir, "voy a crear un nuevo template y a partir de este nuevo template voy a listar todos los usuarios que yo ya tenga"
router.get('/usuario/:id', usuarioController.editarUsuario); //con los dos puntos le decimos que es el comodin y despues de estos, le damos el nombre
router.post('/usuario', usuarioController.guardarUsuario);
router.delete('/usuario/:id', usuarioController.eliminarUsuario);

//rutas para ingreso
router.get('./login', usuarioController.mostrarFormulario); 
router.post('/login', usuarioController.validarFormulario);

module.exports = router; //estamos diciendo "vamos a exportar el modulo router". Este modulo es el de la linea 2 y tiene las rutas generadas.

const express = require('express');
const router = express.Router(); //permite crear diferentes tipos de rutas para después exportarlas

const ManejoUsuariosController = require('../controllers/manejoUsuariosController');
const manejoUsuariosController = new ManejoUsuariosController();

//rutas para abml para usuarios en general
router.get('/usuarios', manejoUsuariosController.listarUsuarios); //va a decir, "voy a crear un nuevo template y a partir de este nuevo template voy a listar todos los usuarios que yo ya tenga"
router.get('/usuario/:id', manejoUsuariosController.editarUsuario); //con los dos puntos le decimos que es el comodin y despues de estos, le damos el nombre
router.post('/usuario', manejoUsuariosController.guardarUsuario);
router.post('/usuario/:id', manejoUsuariosController.editarUsuario);
router.delete('/usuario/:id', manejoUsuariosController.eliminarUsuario);

//rutas redirección a home
router.get('/home', manejoUsuariosController.homepage);

//ruta a nosotros
router.get('/nosotros', manejoUsuariosController.mostrarnosotros);

module.exports = router; //estamos diciendo "vamos a exportar el modulo router". Este modulo es el de la linea 2 y tiene las rutas generadas.

//manejoUsuariosRoute.js
const express = require('express');
const router = express.Router(); //permite crear diferentes tipos de rutas para después exportarlas

const ManejoUsuariosController = require('../controllers/manejoUsuariosController');
const manejoUsuariosController = new ManejoUsuariosController();

//rutas para abml para usuarios en general
router.get('/usuarios', manejoUsuariosController.listarUsuarios); //va a decir, "voy a crear un nuevo template y a partir de este nuevo template voy a listar todos los usuarios que yo ya tenga"
router.get('/usuario/:id', manejoUsuariosController.editarUsuario); //con los dos puntos le decimos que es el comodin y despues de estos, le damos el nombre
router.post('/usuario', manejoUsuariosController.guardarUsuario);
router.post('/usuario/:id', manejoUsuariosController.editarUsuario);
router.put('/usuario/:id', manejoUsuariosController.guardarUsuario); //PARA ACTUALIZAR usuario existente
router.delete('/usuario/:id', manejoUsuariosController.eliminarUsuario); //Eliminar usuario

module.exports = router; //Exportar módulo 

//manejoUsuariosRoute.js
const express = require('express');
const router = express.Router(); //permite crear diferentes tipos de rutas para después exportarlas

const ManejoUsuariosController = require('../controllers/manejoUsuariosController');
const manejoUsuariosController = new ManejoUsuariosController();

//ruta listar usuarios
router.get('/usuarios', manejoUsuariosController.listarUsuarios); //va a decir, "voy a crear un nuevo template y a partir de este nuevo template voy a listar todos los usuarios que yo ya tenga"

//ruta crear usuario
router.get('/usuario/crear', manejoUsuariosController.crearUsuario); //Obtener
router.post('/usuario/crear', manejoUsuariosController.guardarUsuario); //Guardar

//ruta actualizar usuario
router.get('/usuario/editar/:id', manejoUsuariosController.editarUsuario); //Obtener 
router.put('/usuario/editar/:id', manejoUsuariosController.guardarUsuario); //Editar 

//ruta borrar usuario
router.delete('/usuario/eliminar/:id', manejoUsuariosController.eliminarUsuario); //Eliminar

module.exports = router; //Exportar módulo 

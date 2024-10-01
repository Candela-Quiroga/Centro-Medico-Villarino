//manejoUsuariosRoute.js
const express = require('express');
const router = express.Router(); //permite crear diferentes tipos de rutas para después exportarlas

const ManejoUsuariosController = require('../controllers/manejoUsuariosController');
const manejoUsuariosController = new ManejoUsuariosController();

const UsuarioModel = require('../models/usuarioModel');
const usuarioModel = new UsuarioModel();

//ruta listar usuarios
router.get('/usuarios', manejoUsuariosController.listarUsuarios); //va a decir, "voy a crear un nuevo template y a partir de este nuevo template voy a listar todos los usuarios que yo ya tenga"

//ruta crear usuario
router.get('/usuario/agregar/0', manejoUsuariosController.crearUsuario); //Crear nuevo
router.post('/usuario/agregar/0', manejoUsuariosController.guardarUsuario); //Guardar nuevo. POST significa crear nuevo

//ruta actualizar usuario
router.get('/usuario/editar/:id', manejoUsuariosController.editarUsuario); //Obtener 
router.put('/usuario/editar/:id', manejoUsuariosController.guardarUsuario); //Guardar editado. PUT significa insertar, reemplazar si ya existe

//ruta borrar usuario
router.delete('/usuario/eliminar/:id', manejoUsuariosController.eliminarUsuario); //Eliminar

module.exports = router; //Exportar módulo 

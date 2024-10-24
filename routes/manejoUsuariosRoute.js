//manejoUsuariosRoute.js
const express = require('express');
const router = express.Router(); //permite crear diferentes tipos de rutas para después exportarlas

const ManejoUsuariosController = require('../controllers/manejoUsuariosController');
const manejoUsuariosController = new ManejoUsuariosController();

const UsuarioModel = require('../models/usuarioModel');
const usuarioModel = new UsuarioModel();

const autenticar = require('../middleware/autenticacion')([1]);

//ruta listar usuarios
router.get('/usuarios', autenticar, manejoUsuariosController.listarUsuarios); //va a decir, "voy a crear un nuevo template y a partir de este nuevo template voy a listar todos los usuarios que yo ya tenga"

//ruta crear usuario
router.get('/usuario/agregar/0', autenticar, manejoUsuariosController.crearUsuario); //Crear nuevo
router.post('/usuario/agregar/0', autenticar,manejoUsuariosController.guardarUsuario); //Guardar nuevo. POST significa crear nuevo

//ruta actualizar usuario
router.get('/usuario/editar/:id', autenticar,manejoUsuariosController.editarUsuario); //Obtener 
router.post('/usuario/editar/:id', autenticar,manejoUsuariosController.guardarUsuario); //Guardar editado. PUT significa insertar, reemplazar si ya existe

//ruta borrar usuario
router.delete('/usuario/eliminar/:id',autenticar, manejoUsuariosController.eliminarUsuario); //Eliminar

module.exports = router; //Exportar módulo 

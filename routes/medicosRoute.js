const express = require('express'); // Importo el módulo 'express'
const router = express.Router();  // Creo el enrrutador
const conx = require('../database/db'); // Importo la db

// Ruta para listar médicos
router.get('/medicos/listar', (req, res) => {
    const query = `     
        SELECT 
            medicos.id, 
            usuarios.nombre AS usuario, 
            medicos.telefono, 
            especialidades.nombre_especialidad AS especialidad
        FROM medicos
        JOIN usuarios ON medicos.id_usuario = usuarios.id
        JOIN especialidades ON medicos.id_especialidad = especialidades.id
    `; // hice la consulta para traerme los datos de la db
    conx.query(query, (error, results) => {
        if (error) {
            console.log('Error en el listado de médicos:'+ error); //Mensaje de error en caso de no lograr la conexion
        } else {
            res.render('../views/Medicos/index', { results: results }); //Si no hubo error renderizar el ejs de listado
        }
    });
});

// Ruta para crear un nuevo médica
router.get('/medicos/crear', (req, res) => {
    conx.query('SELECT id, nombre FROM usuarios', (error, resultsUsuarios) => { //Hago la consulta a la db
        if (error) {
            console.log('Error al obtener los usuarios:', error);   //Mensaje de error en caso de no lograr la conexion
            res.status(500).send('Error al cargar la vista');       //Mensaje de error en caso de no lograr la conexion
        } else {
            res.render('../views/Medicos/create', { resultsUsuarios: resultsUsuarios }); //Si no hubo error renderizar el ejs de crear nuevo médico
        }
    });
});


// Ruta para editar un médico
router.get('/medicos/editar/:id', (req, res) => {
    const id = req.params.id;
    const query = `
        SELECT medicos.id, medicos.telefono, usuarios.nombre AS nombre, especialidades.nombre_especialidad AS nombre_especialidad
        FROM medicos
        JOIN usuarios ON medicos.id_usuario = usuarios.id
        JOIN especialidades ON medicos.id_especialidad = especialidades.id
        WHERE medicos.id = ?
    `; // Hice la consulta por id para traerme los datos de la db
    conx.query(query, [id], (error, results) => {
        if (error) {
            console.log('Error en la edición de médicos:', error); //Mensaje de error en caso de no lograr la conexion
        } else {
            res.render('../views/Medicos/edit', { medico: results[0] }); // Si no hubo error renderizar el ejs de editar el registro de un médico
        }
    });
});

// Ruta para eliminar un médico
router.get('/medicos/eliminar/:id', (req, res) => {
    const id = req.params.id;
    conx.query('DELETE FROM medicos WHERE id = ?', [id], (error, results) => { // Hice la consulta por id para traerme los datos de la db
        if (error) {
            console.log('Error al eliminar médicos:', error); // Mensaje de error en caso de no lograr la conexion
        } else {
            res.redirect('/medicos/listar'); // Si no hubo error renderizar el ejs de listar nuevamente con los datos actualizados
        }
    });
});

// Importo los controladores
const medicoController = require('../controllers/medicoController');

// Defino las rutas para guardar y editar activando los controladores correspondientes
router.post('/guardar', medicoController.guardar);
router.post('/editar', medicoController.editar);

// Exporto los módulos
module.exports = router;
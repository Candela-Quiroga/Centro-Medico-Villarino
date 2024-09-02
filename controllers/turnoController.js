//importo el model para poder acceder a las funciones que interactuan con la bbdd
const turnosModel = require('../models/turnoModel');

//funciones del controlador

//funcion para listar los turnos
const listarTurnos = (req, res) => {
    turnosModel.obtenerTurnos((error, results) => {
        if (error) { //imprimo mensajes de error por si ocurre algun inconveniente
            console.error('Error al obtener los turnos con detalles:', error);
            res.status(500).send('Error al obtener los turnos');
        } else {
            console.log(results); //este console log es para probar si me traía bien los datos
            
            //renderizo la view de la lista de turnos
            res.render('turnos/listarTurnos.ejs', { results: results });
        }
    });
};

//proximamente se van a agregar más funciones

//exporto el controller con la funcion de listar
module.exports = {
    listarTurnos
};

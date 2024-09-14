//importo el model para poder acceder a las funciones que interactuan con la bbdd
const TurnoModel = require('../models/turnoModel');
const turnoModel = new TurnoModel();


//funcion para listar los turnos


//funcion para editar tunros
class TurnoController {
    async listarTurnos (req, res) {
        turnoModel.listarTurnos((turno) => {
            console.log(turno);
            res.render("../views/turnos/listarTurnos");
            resultado: turno;
        });
    };

    async editarTurno(req, res){

    }
}




//funcion para agregar turnos
const insertarTurnos = (req, res) => {
    const id_medico = req.body.id_medico || 0; //Capturo los datos en el body
    const id_paciente = req.body.id_paciente || 0;
    const fecha_hora = req.body.fecha_hora || 0;
    const motivo = req.body.motivo || 0;

    turnoModel.agregarTurno(id_medico, id_paciente, fecha_hora, motivo, (error, results) => { //Paso esos mismo datos como parametro
        if (error) { //imprimo mensajes de error por si ocurre algun inconveniente
            console.error('Error al insertar el turnos con detalles:', error);
            res.status(500).send('Error al insertar el turnos');
        } else {
            console.log(results); //este console log es para probar si me traía bien los datos
            //renderizo la view de la lista de turnos
            res.render('/turnos/turnosListar', { results: results });//cambiar
        }
    });
};



//funcion para eliminar turnos


//exporto el controller con la funcion de listar
module.exports = TurnoController;

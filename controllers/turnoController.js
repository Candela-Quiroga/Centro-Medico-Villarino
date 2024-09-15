//importo el model para poder acceder a las funciones que interactuan con la bbdd
const TurnoModel = require('../models/turnoModel');
const turnoModel = new TurnoModel();

const PacienteModel = require('../models/PacienteModel');
const pacienteModel = new PacienteModel();

const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();

class TurnoController {
    //funcion para listar los turnos
    async listarTurnos (req, res) {
        turnoModel.listarTurnos((turnos) => {
            if (!turnos || turnos.length === 0) {
                console.log("No se encontraron turnos.");
            } else {
                console.log(turnos);
            }
            res.render("../views/turnos/listarTurnos", {turno: turnos}); //Antes no me funcionaba por no pasar la variable turnos como parametro en el render
        });
    };

    //funcion para editar los turnos
    async editarTurno(req, res){
        const id = req.params.id;
        turnoModel.obtenerTurno(id, (turno)=>{

            // Obtener pacientes y médicos en paralelo usando Promises
        Promise.all([
            new Promise((resolve, reject) => {
                pacienteModel.listarPaciente((pacientes) => {
                    resolve(pacientes);
                });
            }),
            new Promise((resolve, reject) => {
                medicoModel.listar((medicos) => {
                    resolve(medicos);
                });
            })
        ])
        .then(([pacientes, medicos]) => {
            res.render("../views/turnos/editarTurnos", {
                turno: turno,
                pacientes: pacientes,
                medicos: medicos
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error al cargar la información");
        });
    });
    }

    
    //funcion para agregar turnos
    async guardarTurno(req, res){
        const datos = req.body;
        turnoModel.guardarTurno(datos, ()=>{
            res.send({
                "success": true,
            });
        });
    }
    
    //funcion para eliminar turnos
    async eliminarTurno(req, res){

    }
}
    




//exporto el controller con la funcion de listar
module.exports = TurnoController;

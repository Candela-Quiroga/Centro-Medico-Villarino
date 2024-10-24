const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();

const PacienteModel = require('../models/PacienteModel');
const pacienteModel = new PacienteModel();

const TurnoModel = require('../models/turnoModel');
const turnoModel = new TurnoModel();

class PanelSecretariaController {

    // Mostrar panel general
    mostrarPanelGeneral(req, res) {

        try {
            // Llamar a listarMedicos, obtenerObrasSociales y listarTurnos en paralelo
            const listarMedicosPromise = new Promise((resolve, reject) => {
                medicoModel.listarMedicos((medicos) => {
                    if (medicos) {
                        resolve(medicos);
                    } else {
                        reject('Error al listar médicos');
                    }
                });
            });

            const obtenerObrasSocialesPromise = new Promise((resolve, reject) => {
                pacienteModel.obtenerObrasSociales((obrasSociales) => {
                    if (obrasSociales) {
                        resolve(obrasSociales);
                    } else {
                        reject('Error al obtener obras sociales');
                    }
                });
            });

            const listarTurnosPromise = new Promise((resolve, reject) => {
                turnoModel.listarTurnos('', (turnos) => {
                    if (turnos) {
                        resolve(turnos);
                    } else {
                        reject('Error al listar turnos');
                    }
                });
            });

            // Ejecutar todas las promesas en paralelo
            Promise.all([listarMedicosPromise, obtenerObrasSocialesPromise, listarTurnosPromise])
                .then(([medicos, obrasSociales, turnos]) => {
                    // Renderizar la vista de panel, pasando médicos, obras sociales, turnos y el nombre del usuario
                    res.render('panel/panelSecretarias', {
                        title: 'Panel General Secretarias',
                        medicos: medicos,
                        obrasSociales: obrasSociales,
                        turnos: turnos, // Pasar los turnos a la vista
                    });
                })
                .catch(error => {
                    console.error('Error al obtener datos para la página de panel secretarias:', error);
                    res.status(500).send('Error al cargar el panel de secretarias');
                });

        } catch (error) {
            console.error('Error al obtener datos para la página de panel secretarias:', error);
            res.status(500).send('Error al cargar el panel de secretarias');
        }
    }

}

module.exports = PanelSecretariaController;

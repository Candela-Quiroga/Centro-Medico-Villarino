const HorarioModel = require('../models/horarioModel');
const horarioModel = new HorarioModel();

const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel(); 

class HorarioController {

    // Listar todos los horarios de un médico
    async listarHorarios(req, res) {
        const medicoId = req.params.medicoId; // ID del médico
        horarioModel.listarHorarios(medicoId, (horarios) => {
            console.log("Horarios:", horarios);
            res.render("horarios/listarHorarios", {
                horarios: horarios,
                medicoId: medicoId,
            });
        });
    }


    // Función para mostrar el formulario de inserción de horarios
    async agregarHorario(req, res) {
        try {
            const medicoId = req.params.medicoId; // Obtener el ID del médico de los parámetros de la URL

            // Obtener los horarios actuales del médico
            horarioModel.listarHorarios(medicoId, (horarios) => {
                console.log("Horarios actuales:", horarios);
                res.render("horarios/agregarHorario", {
                    horarios: horarios, // Lista de horarios del médico
                    horario: { id: 0, medicoId: medicoId }, // Estamos creando un nuevo horario, por eso id=0
                });
            });
        } catch (err) {
            console.error('Error al cargar la información para agregar horario:', err);
            res.status(500).send("Error al cargar la información");
        }
    }

    // Mostrar el formulario de edición de horarios
    async editarHorario(req, res) {
        try {
            const horarioId = req.params.horarioId;
            const medicoId = req.params.medicoId;
            const horarioExistente = await new Promise((resolve, reject) => {
                horarioModel.obtenerHorario(horarioId, (horario) => {
                    if (horario) {
                        resolve(horario);
                    } else {
                        reject(new Error('No se encontró el horario.'));
                    }
                });
            });
            res.render("horarios/editarHorario", { 
                horario: { ...horarioExistente, id_medico: medicoId },
            });
        } catch (err) {
            res.status(500).send("Error al cargar la información");
        }
    }


    // Guardar un nuevo horario o actualizar uno existente
    async guardarHorario(req, res) {
        const datos = req.body;
        try {
            // Si id es 0, creamos un nuevo horario
            if (datos.id == 0) {
                await horarioModel.guardarHorario(datos, (result) => {
                    if (result) {
                        res.send({ "success": true, "message": "Horario guardado exitosamente" });
                    } else {
                        res.status(500).send({ "success": false, "message": "Error al guardar el horario" });
                    }
                });
            } else {
                // Si no, actualizamos el horario existente
                await horarioModel.obtenerHorario(datos.id, (horarioExistente) => {
                    if (horarioExistente) {
                        horarioModel.guardarHorario(datos, (result) => {
                            if (result) {
                                res.send({ "success": true, "message": "Horario actualizado exitosamente" });
                            } else {
                                res.status(500).send({ "success": false, "message": "Error al actualizar el horario" });
                            }
                        });
                    } else {
                        res.status(404).send({ "success": false, "message": "Horario no encontrado" });
                    }
                });
            }
        } catch (error) {
            res.status(500).send({ "success": false, "message": error.message });
        }
    }


    //Eliminar horario
    async eliminarHorario(req, res) {
        const id = req.params.horarioId;
        horarioModel.eliminarHorario(id, (result) => {
            if (!result) {
                return res.status(500).send("Error al eliminar el horario.");
            } else {
                res.status(200).send({ success: true, message: "Horario eliminado correctamente" });
            }
        });
    }


}

module.exports = HorarioController;
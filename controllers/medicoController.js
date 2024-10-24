const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();

//horarios model, para mostrar horarios de cada médico
const HorarioModel = require('../models/horarioModel');
const horarioModel = new HorarioModel();

class MedicoController {
    // Listado de todos los médicos
    async listarMedicos(req, res) {
        medicoModel.listarMedicos(async (medicos) => {
            // Para cada médico, obtenemos sus horarios
            for (let medico of medicos) {
                await new Promise((resolve) => {
                    horarioModel.listarHorarios(medico.id, (horarios) => {
                        medico.horarios = horarios; // Asignamos los horarios al médico
                        resolve();
                    });
                });
            }
            // Renderizamos la vista con los médicos y sus horarios
            res.render("medicos/listarMedicos", {
                medicos: medicos,
                nombreUsuario: req.session.nombreUsuario, //VER COMO HACER QUE ESTO SEA MENOS REPETITIVO. HACER UN MIDDLEWARE.
                emailUsuario: req.session.emailUsuario
            });
        });
    }

    // Función para mostrar formulario de inserción de médicos
    async insertarMedico(req, res) {
        try {

            //obtengo las listas de especialidades y de usuarios para utilizar en un select
            const especialidades = await medicoModel.listarEspecialidades();
            const usuarios = await medicoModel.listarUsuarios();
            
            res.render("medicos/insertarMedico", {
                medico: {id: 0}, //estamos creando un nuevo médico, por eso id=0
                especialidades: especialidades,
                usuarios: usuarios,
                nombreUsuario: req.session.nombreUsuario, //VER COMO HACER QUE ESTO SEA MENOS REPETITIVO. HACER UN MIDDLEWARE.
                emailUsuario: req.session.emailUsuario
            });
        } catch (err) {
            console.error('Error al cargar la información:', err);
            res.status(500).send("Error al cargar la información");
        }
    }


    // Obtengo un médico por su ID y lo muestro en un formulario para editar
    async editarMedico(req, res) {
    const id = req.params.id; //obtenemos el id del médico a editar
    
    try {
        // Obtener los datos del médico
        const medico = await new Promise((resolve, reject) => {
            medicoModel.obtenerMedico(id, (medico) => {
                if (medico) {
                    resolve(medico);
                } else {
                    reject(new Error('No se encontró el médico.'));
                }
            });
        });

        const especialidades = await medicoModel.listarEspecialidades();
        const usuarios = await medicoModel.listarUsuarios();

        res.render("medicos/editarMedico", {
            medico: medico,
            especialidades: especialidades,
            usuarios: usuarios,
            nombreUsuario: req.session.nombreUsuario, //VER COMO HACER QUE ESTO SEA MENOS REPETITIVO. HACER UN MIDDLEWARE.
            emailUsuario: req.session.emailUsuario
        });
    } catch (err) {
        console.error('Error al cargar la información:', err);
        res.status(500).send("Error al cargar la información");
    }
}


    // Función para guardar (crear o actualizar) un médico
    async guardarMedico(req, res) {
        const datos = req.body;
    
        // Verificamos si se ha subido una nueva foto
        if (req.file) {
            datos.foto = "/" + req.file.path; // Si se subió un archivo, se actualiza la foto. Usamos una ruta absoluta "/" para indicar que la ruta de la imagen cargada comienza en la carpeta raiz
        } else {
            // Si no se subió un archivo, mantener la foto original
            const medicoExistente = await new Promise((resolve, reject) => {
                medicoModel.obtenerMedico(datos.id, (medico) => {
                    if (medico) {
                        resolve(medico);
                    } else {
                        reject(new Error('No se encontró el médico.'));
                    }
                });
            });
            datos.foto = medicoExistente.foto; // Mantener la foto existente
        }
    
        medicoModel.guardarMedico(datos, (result) => {
            res.send({
                "success": true,
            });
        });
    }
    

    // Eliminar un médico
    async eliminarMedico(req, res) {
        const id = req.params.id;
        medicoModel.eliminarMedico(id, (result) => {
            if (!result) {
                return res.status(500).send("Error al eliminar el médico.");
            } else {
            res.redirect('/medicos'); // Redirige a la lista de turnos tras eliminar
            }
        });
    }   


    //Obtener médicos por obra social
    async obtenerMedicosPorObraSocial(req, res) {
        const obraSocialId = req.params.obraSocialId;

        try {
            medicoModel.obtenerMedicosPorObraSocial(obraSocialId, (medicos) => {
                res.json(medicos);
            });
        } catch (error) {
            console.error('Error al obtener médicos por obra social:', error);
            res.status(500).json({ error: 'Error al obtener médicos' });
        }
    }
}

module.exports = MedicoController;
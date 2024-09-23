const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();


class MedicoController {
    // Listado de todos los médicos
    async listarMedicos(req, res) {
        medicoModel.listarMedicos((medicos) => {
            console.log("Médicos:", medicos);
            res.render("medicos/listarMedicos", {
                medicos: medicos
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
                usuarios: usuarios
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
            usuarios: usuarios
        });
    } catch (err) {
        console.error('Error al cargar la información:', err);
        res.status(500).send("Error al cargar la información");
    }
}


    // Función para guardar (crear o actualizar) un médico
    async guardarMedico(req, res){
        const datos = req.body;
        console.log(datos);
        medicoModel.guardarMedico(datos, (result) => {
            res.send({
                "success": true,
            })
        })
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
}

module.exports = MedicoController;
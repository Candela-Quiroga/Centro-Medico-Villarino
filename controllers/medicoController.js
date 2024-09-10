const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();

class MedicoController {
    // Listado de todos los médicos
    async listarMedicos(req, res) {
        medicoModel.listar((medicos) => {
            console.log("Médicos:", medicos);
            res.render("medicos/listarMedicos", {
                medicos: medicos
            });
        });
    }

    // Función para mostrar formulario
    async mostrarFormulario(req, res) {
        try {
            // Llamamos a medicoModel.listarEspecialidades() para obtener la lista de especialidades. Lo mismo con usuarios.
            const especialidades = await medicoModel.listarEspecialidades();
            const usuarios = await medicoModel.listarUsuarios();

            res.render('medicos/insertarMedico', { 
                especialidades: especialidades, //para poder usar especialidades en el ejs correspondiente
                usuarios: usuarios //lo mismo que el de arriba
            });
        } catch (error) {
            console.error('Error al obtener datos para el formulario:', error);
            res.status(500).send('Error al obtener datos para el formulario'); //Este código indica que ha ocurrido un error interno en el servidor
        }
    }

    // Obtengo un médico por su ID y lo muestro en un formulario para editar
    async editarMedico(req, res) {
        const id = req.params.id;
        medicoModel.obtenerMedico(id, async (medico) => {
            if (medico === false) { //// Si no se encuentra el médico (es decir, medico es false), obtiene un objeto base para crear un nuevo registro en medicos
                medico = medicoModel.obtenerMedicoBase();
            }
            try {
                const especialidades = await medicoModel.listarEspecialidades();
                const usuarios = await medicoModel.listarUsuarios();
    
                console.log(medico);
                res.render('medicos/editarMedico', {
                    medico: medico,
                    especialidades: especialidades,
                    usuarios: usuarios
                });
            } catch (error) {
                console.error('Error al obtener datos para la edición:', error);
                res.status(500).send('Error al obtener datos para la edición');
            }
        });
    }

    // Guardar (crear o actualizar) un médico
    async guardarMedico(req, res) {
        // Obtener el id_usuario desde el formulario
        const id_usuario = req.body.id_usuario || null;
    
        // Crear el objeto de datos
        const datos = {
            id: req.body.id || 0,
            id_usuario: id_usuario,
            id_especialidad: req.body.id_especialidad || null,
            telefono: req.body.telefono || '',
            foto: '',  
            descripcion: req.body.descripcion || ''
        };
    
        console.log('Datos recibidos para guardar:', datos);
    
        try {
            const resultado = await medicoModel.guardarMedico(datos);
            if (resultado && resultado.insertId) {
                // Redirige al listado de médicos si se guarda correctamente
                res.redirect('/medicos');
            } else {
                // Enviar un mensaje de error si la inserción falla
                res.status(500).send('Error al guardar los datos');
            }
        } catch (error) {
            console.error('Error al guardar médico:', error);
            res.status(500).send('Error al guardar los datos');
        }
    }

    // Eliminar un médico
    async eliminarMedico(req, res) {
        const id = req.params.id;
        medicoModel.eliminar(id, () => {
            res.redirect('/medicos'); // Redirige al listado después de eliminar
        });
    }

    // Middleware para obtener especialidades
    async obtenerEspecialidades(req, res, next) {
        try {
            const especialidades = await medicoModel.listarEspecialidades();
            req.especialidades = especialidades;
            next();
        } catch (error) {
            console.error('Error al obtener especialidades:', error);
            res.status(500).send('Error al obtener especialidades');
        }
    }
}

module.exports = MedicoController;

//importo el model para poder acceder a las funciones que interactuan con la bbdd
const PacienteModel = require('../models/pacienteModel');
const pacienteModel = new PacienteModel();
const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();
const TurnoModel = require('../models/turnoModel');
const turnoModel = new TurnoModel();


class PacienteController {

    //funcion para listar los pacientes
    async listarPacientes (req, res) {

        const { buscar } = req.query; // Obtiene el valor del query y lo almacena en buscar
        let filtro = ''; // Almacena las palabra que usamos para filtrar
        
        if (buscar) {
            filtro = `
                WHERE pacientes.nombre LIKE '%${buscar}%' 
                OR pacientes.email LIKE '%${buscar}%' 
                OR pacientes.dni LIKE '%${buscar}%'
            `;
        }

        pacienteModel.listarPacientes(filtro, (pacientes) => {
            if (!pacientes || pacientes.length === 0) {
                console.log("No se encontraron pacientes.");
            } else {
                console.log(pacientes);
            }
            res.render("../views/pacientes/listarPacientes", {pacientes: pacientes}); //Antes no me funcionaba por no pasar la variable pacientes como parametro en el render
        });
    };

    //funcion para editar los pacientes
    async editarPaciente(req, res) {
        try {
            const id = req.params.id;
    
            // Obtener el paciente por su ID
            const paciente = await new Promise((resolve, reject) => {
                pacienteModel.obtenerPaciente(id, (result) => {
                    if (!result) reject(new Error("No se encontró el paciente"));
                    resolve(result);
                });
            });
    
            // Obtener las obras sociales
            const obrasSociales = await new Promise((resolve, reject) => {
                pacienteModel.obtenerObrasSociales((result) => {
                    if (!result) reject(new Error("No se encontraron obras sociales"));
                    resolve(result);
                });
            });
    
            // Renderizar la vista de edición con los datos del paciente y las obras sociales
            res.render("../views/pacientes/editarPacientes", { paciente, obrasSociales });
    
        } catch (error) {
            console.error("Error al editar paciente:", error);
            res.status(500).send("Ocurrió un error al intentar editar el paciente.");
        }
    }
    
    //funcion para agregar pacientes
    async guardarPaciente(req, res){
        const datos = req.body;
        console.log(datos);
        pacienteModel.guardarPaciente(datos, (result)=>{
            res.send({
                "success": true,
            });
        });
    }

    // Función para mostrar el formulario de agregar pacientes
    async mostrarAgregarPaciente(req, res) {
        try {
            // Obtener las obras sociales para el formulario
            const obrasSociales = await new Promise((resolve, reject) => {
                pacienteModel.obtenerObrasSociales((result) => {
                    if (!result) reject(new Error("No se encontraron obras sociales"));
                    resolve(result);
                });
            });

            // Renderizar la vista de agregar paciente
            res.render("../views/pacientes/agregarPacientes", { paciente: pacienteModel.obtenerPacienteBase(), obrasSociales });
        } catch (error) {
            console.error("Error al mostrar el formulario de agregar paciente:", error);
            res.status(500).send("Error al cargar el formulario de agregar paciente.");
        }
    }

    // Función para guardar un nuevo paciente
    async guardarPaciente(req, res) {
        const datos = req.body; // Datos recibidos del formulario
        console.log(datos);
        try {
            await new Promise((resolve, reject) => {
                pacienteModel.guardarPaciente(datos, (result) => {
                    if (!result) reject(new Error("Error al guardar el paciente"));
                    resolve(result);
                });
            });

            res.send({ success: true });
        } catch (error) {
            console.error("Error al guardar el paciente:", error);
            res.status(500).send({ success: false });
        }
    }

    //funcion para eliminar pacientes
    async eliminarPaciente(req, res) {
        const id = req.params.id;
        pacienteModel.eliminarPaciente(id, (result) => {
            if (!result) {
                return res.status(500).send("Error al eliminar el paciente.");
            } else {
            res.redirect('/pacientes'); // Redirige a la lista de pacientes tras eliminar
            }
        });
    }    
}
//exporto el controller con la funcion de listar
module.exports = PacienteController;
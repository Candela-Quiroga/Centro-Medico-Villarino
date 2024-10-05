//importo el model para poder acceder a las funciones que interactuan con la bbdd
const TurnoModel = require('../models/turnoModel');
const turnoModel = new TurnoModel();

const PacienteModel = require('../models/pacienteModel');
const pacienteModel = new PacienteModel();

const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();

class TurnoController {
    //funcion para listar los turnos
    async listarTurnos (req, res) {

        const { buscar } = req.query; // Obtiene el valor del query y lo almacena en buscar
        let filtro = ''; // Almacena las palabra que usamos para filtrar
        
        if (buscar) {
            filtro = `
                WHERE pacientes.nombre LIKE '%${buscar}%' 
                OR usuarios.nombre LIKE '%${buscar}%' 
                OR pacientes.dni LIKE '%${buscar}%'
            `;
        }

        turnoModel.listarTurnos(filtro, (turnos) => {
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
                pacienteModel.listarPacientes((pacientes) => {
                    resolve(pacientes);
                });
            }),
            new Promise((resolve, reject) => {
                medicoModel.listarMedicos((medicos) => {
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
        console.log(datos);
        turnoModel.guardarTurno(datos, (result)=>{
            res.send({
                "success": true,
            });
        });
    }

    //Funcion para agregar el nuevo turno
    async agregarTurno(req, res) {
        //para obtener los médicos y pacientes
        Promise.all([
            new Promise((resolve, reject) => {
                pacienteModel.listarPacientes((pacientes) => {
                    resolve(pacientes);
                });
            }),
            new Promise((resolve, reject) => {
                medicoModel.listarMedicos((medicos) => {
                    resolve(medicos);
                });
            })
        ])
        .then(([pacientes, medicos]) => {
            res.render("../views/turnos/agregarTurnos", {
                turno: { id: 0 }, // Turno vacío
                pacientes: pacientes,
                medicos: medicos
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error al cargar la información");
        });
    }
    
    //funcion para eliminar turnos
    async eliminarTurno(req, res) {
        const id = req.params.id;
        turnoModel.eliminarTurno(id, (result) => {
            if (!result) {
                return res.status(500).send("Error al eliminar el turno.");
            } else {
            res.redirect('/turnos'); // Redirige a la lista de turnos tras eliminar
            }
        });
    }   
    
    async obtenerTurnosDisponibles(req, res) {
        const { fecha, id_medico } = req.params;

        // Obtener turnos ocupados para ese día
        const ocupados = await Turno.findAll({ where: { Fecha: fecha, id_medico: id_medico } });

        // Generar intervalos de 15 minutos
        const turnos = [];
        for (let hora = 8; hora < 18; hora += 0.25) {
            const tiempo = `${Math.floor(hora)}:${(hora % 1) * 60 === 0 ? '00' : '15'}`;
            if (!ocupados.some(turno => turno.Hora === tiempo)) {
                turnos.push(tiempo);
            }
        }

        res.json(turnos);
    }

    generarPDF(turno) {
        const doc = new pdfKit();
        const nombreArchivo = `comprobante_turno_${turno.id}.pdf`;

        doc.pipe(fs.createWriteStream(nombreArchivo));
        doc.fontSize(25).text('Comprobante de Turno', { align: 'center' });
        doc.text(`Paciente: ${turno.id_paciente}`);
        doc.text(`Doctor: ${turno.id_medico}`);
        doc.text(`Fecha: ${turno.Fecha}`);
        doc.text(`Hora: ${turno.Hora}`);
        doc.text(`Motivo: ${turno.Motivo}`);
        doc.end();
    }

    async confirmarTurno(req, res) {
        const { id_turno, id_obra_social, nombre, apellido, dni, telefono, correo } = req.body;

        // Primer paso, validar si el turno realmente puede cambiar de estado a confirmado
        turnoModel.obtenerTurno(id_turno, (turno) => {

            if (turno.id_paciente != 0 || turno.id_estado != 1) {
                res.json({
                    "mensaje": "El turno ya se encuentra confirmado por otra persona, por favor seleccione otro horario"
                });
            }

            // Paso 2, verificamos si el cliente ya existe
            // SI ya existe, lo actualizamos con los nuevos datos (capaz cambio el telefono oo email)
            // Si no existe, lo creamos
            pacienteModel.obtenerPacientePorDNI(dni, (paciente) => {
                // Como ya tenemos una funcion que guarda al paciente, solamente le pasamos el objeto que realmente deberia ir
                var pacienteObjeto = {
                    nombre: nombre,
                    apellido: apellido,
                    dni: dni,
                    email: correo,
                    telefono: telefono,
                    // La edad habria que hacer que llegue por los dato,s ya que ahora no se manda
                    edad: 0,
                    id_obrasocial: id_obra_social,
                    // En este caso le decimos, si no existe el paciente, id 0, y si existe, traeme el id que ya existe
                    id: (paciente === null) ? 0 : paciente.id
                }
                
                // Creamos o actualizamos el paciente en la DB
                pacienteModel.guardarPaciente(pacienteObjeto, (datos) => {
                    // Si el paciente ya existia, usamos el id existente, si no, el id que acabamos de ingresar
                    const idClienteActualizado = pacienteObjeto.id || datos.insertId;

                    turnoModel.confirmarTurno(id_turno, idClienteActualizado, (resultado) => {

                        if (resultado === null) {
                            res.json({
                                "mensaje": "Hubo un error confirmado el turno. Contactese con un administrador"
                            });
                        }

                        res.json({
                            "success": true
                        });
                    })
                })
            })

        });
    }
};

//exporto el controller con la funcion de listar
module.exports = TurnoController;
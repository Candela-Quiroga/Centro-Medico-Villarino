//importo el model para poder acceder a las funciones que interactuan con la bbdd
const moment = require('moment');

const HorarioModel = require('../models/horarioModel');
const horarioModel = new HorarioModel();

const TurnoModel = require('../models/turnoModel');
const turnoModel = new TurnoModel();

const PacienteModel = require('../models/pacienteModel');
const pacienteModel = new PacienteModel();

const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();

const EstadoTurnoModel = require('../models/estadoTurnoModel');
const estadoTurnoModel = new EstadoTurnoModel();

const diasSpanish = {
    "Monday": 'lunes',
    "Tuesday": 'martes',
    "Wednesday": 'miercoles',
    "Thursday": 'jueves',
    "Friday": 'viernes',
    "Saturday": 'sabado',
    "Sunday": 'domingo',
}

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
            res.render("../views/turnos/listarTurnos", {
                turno: turnos,
            }); //Antes no me funcionaba por no pasar la variable turnos como parametro en el render
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
            }),
            new Promise((resolve, reject) => {
                estadoTurnoModel.listarEstadoTurno((estado_turnos) => {
                    resolve(estado_turnos);
                });
            })
        ])
        .then(([pacientes, medicos, estado_turnos]) => {
            res.render("../views/turnos/editarTurnos", {
                turno: turno,
                pacientes: pacientes,
                medicos: medicos,
                estado_turnos: estado_turnos
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
            }),
            new Promise((resolve, reject) => {
                estadoTurnoModel.listarEstadoTurno((estado_turnos) => {
                    resolve(estado_turnos);
                });
            })
        ])
        .then(([pacientes, medicos, estado_turnos]) => {
            res.render("../views/turnos/agregarTurnos", {
                turno: { id: 0 }, // Turno vacío
                pacientes: pacientes,
                medicos: medicos,
                estado_turnos: estado_turnos
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


    async confirmarTurno(req, res) {
        const { id_turno, id_obra_social, nombre, apellido, dni, telefono, correo } = req.body;

        // Primer paso, validar si el turno realmente puede cambiar de estado a confirmado
        turnoModel.obtenerTurno(id_turno, (turno) => {

            if (turno.id_paciente != null || turno.id_estadoTurno != 1) {
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

    async crearTurnosDesdeHorarios(req, res) {
        //const { fechaDesde, fechaHasta } = req.query;

        // Hardcodeo las fechas para hacer pruebas
        const fechaDesde = '2024-10-11';
        const fechaHasta = '2024-11-10';

        const dateFechaDesde = moment(fechaDesde);
        const datefechaHasta = moment(fechaHasta);
        var fechaRecorrida = dateFechaDesde;

        var turnosCreados = 0;

        while (fechaRecorrida <= datefechaHasta) {
            // En este momento fechaRecorrida va a equivaler a cada uno de los dias
            // Que hay dentro de la fecha desde y fecha hasta, ej: fechaDesde: 2024-10-11, fechaHasta: 2024-10-13
            // Fecha recorrida va a ser igual a: 2024-10-11, 2024-10-12, 2024-10-13
            const nombreDia = fechaRecorrida.format("dddd"); // Ej Friday, Saturday, etc
            const nombreDiaSpanish = diasSpanish[nombreDia]; // Ej Viernes, Sabado, etc
            let diaDelAnio = fechaRecorrida.format("YYYY-MM-DD"); // Ej: 2024-10-11

            const horarios = await horarioModel.obtenerHorariosPorDia(nombreDiaSpanish);
            // Recorremos todos los horarios disponibles que haya en ese dia: ej Lunes hay horario de 10:00 a 13:00
            for (let horario of horarios) {

                let horarioDeInicio = moment(`${diaDelAnio} ${horario.hora_inicio}`);
                let horarioDeFin = moment(`${diaDelAnio} ${horario.hora_fin}`);
                let horaRecorrida = horarioDeInicio;

                // Conseguimos todos los turnos que haya cada 15 minutos de cada horario
                // Ej. si horarioDeInicio es 2024-10-11 10:00:00 y horarioDeFin es 2024-10-11 11:00:00
                // Conseguimos 2024-10-11 10:15:00, 2024-10-11 10:30:00, 2024-10-11 10:45:00
                while (horaRecorrida < horarioDeFin) {
                    let fechaFormatoYmdHis = horaRecorrida.format("YYYY-MM-DD HH:mm:ss"); // Ej: 2024-10-11 10:15:00

                    // Como este script se puede ejecutar infinitas veces, tenemos que ver que ya no haya un turno creado
                    // Para esa fecha, para ese horario, y para ese medico...
                    let existeTurnoParaEsaFechaYhora = await turnoModel.obtenerTurnoPorMedicoYFecha(
                        horario.id_medico, 
                        fechaFormatoYmdHis
                    );

                    // Si no existe el turno para esa fecha, lo creamos
                    // Si ya existe, no hacemos nada para evitar errores
                    if (existeTurnoParaEsaFechaYhora.length == 0) {
                        console.log(`creando turno para fecha ${fechaFormatoYmdHis} para medico ${horario.id_medico}`);
                        // Objeto para el nuevo turno
                        let nuevoTurno = {
                            id: 0,
                            id_paciente: null,
                            id_medico: horario.id_medico,
                            fecha_hora: fechaFormatoYmdHis,
                            id_estadoTurno: 1
                        };

                        turnoModel.guardarTurno(nuevoTurno, (turno) => {
                            turnosCreados++;
                        });
                    }

                    horaRecorrida.add(15, 'minutes');
                }
            }
            // Aumentamos un día a fechaRecorrida para que siga el ciclo
            fechaRecorrida = moment(fechaRecorrida).add(1, 'days');
        }

        res.json({
            "error": 0,
            "turnosCreados": turnosCreados
        })
    }
};

//exporto el controller con la funcion de listar
module.exports = TurnoController;
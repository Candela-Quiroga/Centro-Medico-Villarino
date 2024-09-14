//importo la conexión a la base de datos y la guardo en la constante "conx" para poder conusltar
const conx = require('../database/db');

class TurnoModel{
    async listarTurnos(callback){
        //esta función obtiene los turnos y detalles de la base de datos
        /*dentro de la constante "sql" guardo toda la consulta realizada para tener mayor prolijidad
        a la hora de hacer el conx.query, además realizo varios joins con las tablas relacionadas a 
        turnos para poder traer la información correspondiente en cada campo
        */
        let sql = `
            SELECT 
                turnos.id AS turno_id, 
                CONCAT(usuarios.nombre) AS medico_nombre,
                pacientes.nombre AS paciente_nombre, 
                turnos.fecha_hora, 
                turnos.motivo 
            FROM turnos 
            JOIN medicos ON turnos.id_medico = medicos.id 
            JOIN usuarios ON medicos.id_usuario = usuarios.id 
            JOIN especialidades ON medicos.id_especialidad = especialidades.id 
            JOIN pacientes ON turnos.id_paciente = pacientes.id
            JOIN obras_sociales ON pacientes.id_obraSocial = obras_sociales.id
        `;
        conx.query(sql, [], (err, results)=>{
            callback(results);
        });
    }
}

//exporto la función/es para poder ser utilizada/s desde el controlador
module.exports = TurnoModel;


//importo la conexión a la base de datos y la guardo en la constante "conx" para poder conusltar
const conx = require('../database/db');

class TurnoModel{

    obtenerTurnoBase(){
        return {
            id: 0,
            id_medico: '',
            id_paciente: '',
            fecha_hora: '',
            motivo: ''
        }
    }

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
        conx.query(sql, [], (err, results) => {
            if (err) {
                console.error(err);
                return callback([]);
            }
            callback(results);
        });
    }

    async obtenerTurno(id, callback){
        let sql = `SELECT * FROM turnos WHERE id = ?`;
        conx.query(sql, [id], async (err, results) => {
            if (results.length === 0) {
                callback(false);
            } else {
            callback(results[0]);
            }
        });
    }

    async guardarTurno(datos, callback){
        if(datos.id == 0){
            let sql = `INSERT INTO turnos (id_medico, id_paciente, fecha_hora, motivo)`;
            sql += `VALUES (?,?,?,?)`;
            conx.query(sql, [datos.medico, datos.paciente, datos.fecha_hora, datos.motivo], async (err, results)=>{
                if (err) {
                    console.error(err);
                    callback(null);
                } else {
                    callback(results);
                }
        });
        } else {
            let sql = `UPDATE turnos SET id_medico= ?, id_paciente= ?, fecha_hora= ?, motivo= ? WHERE id = ?`;
            conx.query(sql, [datos.medico, datos.paciente, datos.fecha_hora, datos.motivo, datos.id], async (err, results)=>{
                if (err) {
                    console.error(err);
                    callback(null);
                } else {
                    callback(results);
                }
        });
        }
    }

    async eliminarTurno(id, callback) {
        let sql = `DELETE FROM turnos WHERE id = ?`;
        conx.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                callback(null);
            } else {
                callback(results);
            }
        });
    }
    
}

//exporto la función/es para poder ser utilizada/s desde el controlador
module.exports = TurnoModel;
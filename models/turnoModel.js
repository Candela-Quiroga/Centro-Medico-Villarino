//importo la conexión a la base de datos y la guardo en la constante "conx" para poder conusltar
const conx = require('../database/db');

class TurnoModel{

    obtenerTurnoBase(){
        return {
            id: 0,
            id_medico: '',
            id_paciente: '',
            fecha_hora: '',
            id_estadoTurno: ''
        }
    }

    async listarTurnos(filtro, callback){
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
                turnos.fecha_hora AS fecha_hora, 
                estado_turno.nombre AS estado_nombre
            FROM turnos 
            JOIN medicos ON turnos.id_medico = medicos.id 
            JOIN usuarios ON medicos.id_usuario = usuarios.id 
            JOIN especialidades ON medicos.id_especialidad = especialidades.id 
            JOIN pacientes ON turnos.id_paciente = pacientes.id
            JOIN obras_sociales ON pacientes.id_obraSocial = obras_sociales.id
            JOIN estado_turno ON turnos.id_estadoTurno = estado_turno.id
            ${filtro}
            ORDER BY turnos.id DESC;
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
                callback(this.obtenerTurnoBase());
            } else {
            callback(results[0]);
            }
        });
    }

    async guardarTurno(datos, callback){
        if(datos.id == 0){
            let sql = `INSERT INTO turnos (id_medico, id_paciente, fecha_hora, id_estadoTurno)`;
            sql += `VALUES (?,?,?,?)`;
            conx.query(sql, [datos.id_medico, datos.id_paciente, datos.fecha_hora, datos.id_estadoTurno], async (err, results)=>{
                if (err) {
                    console.error(err);
                    callback(null);
                } else {
                    callback(results);
                }
        });
        } else {
            let sql = `UPDATE turnos SET id_medico= ?, id_paciente= ?, fecha_hora= ?, id_estadoTurno= ? WHERE id = ?`;
            conx.query(sql, [datos.id_medico, datos.id_paciente, datos.fecha_hora, datos.id_estadoTurno, datos.id], async (err, results)=>{
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

    async obtenerTurnoPorMedicoYFecha(id_medico, fecha){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM turnos WHERE id_medico = ? and fecha_hora LIKE ?`;
            conx.query(sql, [id_medico, `%${fecha}%`], async (err, results) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }

                resolve(results);
            });
        });
    }

    async confirmarTurno(id_turno, id_cliente, callback){
        const ID_ESTADO_CONFIRMADO = 3;

        let sql = `UPDATE turnos SET id_paciente = ?, id_estadoTurno = ? WHERE id = ?`;

        conx.query(sql, [id_cliente, ID_ESTADO_CONFIRMADO, id_turno], async (err, results)=>{
            if (err) {
                console.error(err);
                callback(null);
            } else {
                callback(results);
            }
        });
    }
}

module.exports = TurnoModel;
//importo la conexión a la base de datos y la guardo en la constante "conx" para poder conusltar
const conx = require('../database/db');

class HorarioModel {

    obtenerHorarioBase(){
        return{
            id: 0,
            id_medico: '',
            dia_semana: '',
            hora_inicio: '',
            hora_fin: ''
        };
    }


    //obtener un horario por su id
    async obtenerHorario(horarioId, callback) {
        let sql = `SELECT * FROM horarios WHERE id = ?`;
        conx.query(sql, [horarioId], (err, results) => {
            if (err) {
                console.error(err);
                callback(null);
            } else {
                callback(results[0]);
            }
        });
    }
    

    //listado de horarios de un médico 
    async listarHorarios(medicoId, callback){
        let sql = `
            SELECT 
                    horarios.id, 
                    usuarios.nombre AS nombre_medico, 
                    horarios.dia_semana, 
                    horarios.hora_inicio, 
                    horarios.hora_fin 
                FROM horarios 
                JOIN medicos ON horarios.id_medico = medicos.id 
                JOIN usuarios ON medicos.id_usuario = usuarios.id 
                WHERE medicos.id = ?;
        `;
        conx.query(sql, [medicoId], (err, results) => {
            if (err) {
                console.error(err);
                return callback([]);
            }
            callback(results);
        });
    }


    //Guardar un nuevo horario o actualizar uno existente
    async guardarHorario(datos, callback) {
        if (datos.id == 0) {
            // Crear nuevo horario
            let sql = `INSERT INTO horarios (id_medico, dia_semana, hora_inicio, hora_fin) VALUES (?, ?, ?, ?)`;
            conx.query(sql, [datos.id_medico, datos.dia_semana, datos.hora_inicio, datos.hora_fin], (err, results) => {
                if (err) {
                    console.error(err);
                    callback(null);
                } else {
                    callback(results);
                }
            });
        } else {
            // Actualizar horario existente
            let sql = `UPDATE horarios SET dia_semana = ?, hora_inicio = ?, hora_fin = ? WHERE id = ?`;
            conx.query(sql, [datos.dia_semana, datos.hora_inicio, datos.hora_fin, datos.id], (err, results) => {
                if (err) {
                    console.error(err);
                    callback(null);
                } else {
                    callback(results);
                }
            });
        }
    }

    //Eliminar horario
    async eliminarHorario(id, callback) {
        let sql = `DELETE FROM horarios WHERE id = ?`;
        conx.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                callback(null);
            } else {
                callback(results);
            }
        });
    }


    async obtenerHorariosPorDia(dia) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM horarios WHERE dia_semana = ?`;
            conx.query(sql, [dia], async (err, results) => {
    
                if (err) {
                    reject(err);
                }
    
                if (results.length === 0) {
                    resolve([]);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = HorarioModel;
// models/medicoModel.js
const conx = require('../database/db');

class MedicoModel {

    //Hago esta función para mostrar un select de usuarios (para usar a la hora de insertar un nuevo médico)
    async listarUsuarios() {
        let sql = "SELECT id, nombre FROM usuarios";
        return new Promise((resolve, reject) => {
            conx.query(sql, [], (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    //Inicializamos un nuevo objeto médico para utilizar al crear un nuevo registro de médicos
    obtenerMedicoBase() {
        return { 
            id: 0,
            id_usuario: 0,
            id_especialidad: 0,
            telefono: '',
            foto: '',
            descripcion: ''
        };
    }

    //listado de médicos
    async listar(callback) {
        let sql = `
            SELECT 
                medicos.id, 
                usuarios.nombre AS nombre_medico, 
                especialidades.nombre_especialidad, 
                medicos.telefono, 
                medicos.descripcion, 
                medicos.foto 
            FROM medicos
            JOIN usuarios ON medicos.id_usuario = usuarios.id
            JOIN especialidades ON medicos.id_especialidad = especialidades.id
        `;
        conx.query(sql, [], (err, results) => {
            if (err) {
                console.error(err);
                return callback([]);
            }
            callback(results);
        });
    }
    

    //para obtener los datos de un médico en específico
    async obtenerMedico(id, callback) {
        let sql = `SELECT medicos.*, usuarios.nombre AS nombre_medico 
                    FROM medicos 
                    JOIN usuarios ON medicos.id_usuario = usuarios.id 
                    WHERE medicos.id = ?`;
        conx.query(sql, [id], (err, results) => {
            if (err || results.length === 0) {
                callback(false);
            } else {
                callback(results[0]);
            }
        });
    }

    //guardar un nuevo médico en la base de datos
    async guardarMedico(datos) {
        const sql = "INSERT INTO medicos (id_usuario, id_especialidad, telefono, foto, descripcion) VALUES (?, ?, ?, ?, ?)";
        const params = [datos.id_usuario, datos.id_especialidad, datos.telefono, datos.foto, datos.descripcion];
    
        return new Promise((resolve, reject) => {
            conx.query(sql, params, (err, results) => {
                if (err) { // Si ocurre un error durante la ejecución de la consulta
                    console.error('Error al ejecutar la consulta:', err);
                    reject(err); //error en la consulta
                } else {
                    console.log('Resultado de la consulta:', results);
                    resolve(results); //funciona la consulta correctamente
                }
            });
        });
    }

    //eliminar un médico de la base de datos
    async eliminar(id, callback) {
        let sql = "DELETE FROM medicos WHERE id = ?";
        conx.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                callback(null);
            } else {
                callback(results);
            }
        });
    }

    //listado de especialidades 
    async listarEspecialidades() {
        let sql = "SELECT * FROM especialidades";
        return new Promise((resolve, reject) => {
            conx.query(sql, [], (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results); //Si no hay errores (err es falso), la Promise se resuelve con resolve(results);. Esto significa que la operación fue exitosa y los resultados de la consulta se pasan como resultado de la Promise
                }
            });
        });
    }

    //actualizar médico (función para editarMedico)
    async actualizarMedico(datos) {
        const sql = `UPDATE medicos 
                    SET telefono = ?, foto = ?, descripcion = ? 
                    WHERE id = ?`;
        const params = [datos.telefono, datos.foto, datos.descripcion, datos.id];
    
        return new Promise((resolve, reject) => {
            conx.query(sql, params, (err, results) => {
                if (err) {
                    console.error('Error al ejecutar la consulta de actualización:', err);
                    reject(err);
                } else {
                    console.log('Resultado de la consulta de actualización:', results);
                    resolve(results);
                }
            });
        });
    }
}

module.exports = MedicoModel;

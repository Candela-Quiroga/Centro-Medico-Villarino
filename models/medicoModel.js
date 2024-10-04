// models/medicoModel.js
const conx = require('../database/db');

class MedicoModel {

    //Inicializamos un nuevo objeto médico para utilizar al crear un nuevo registro de médicos
    obtenerMedicoBase() { //valores por defecto
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
    async listarMedicos(callback) {
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

    obtenerMedicosPorObraSocial(obraSocialId, callback) {
        const query = `
            SELECT medicos.*, usuarios.nombre AS nombre_medico, especialidades.nombre_especialidad as nombre_especialidad
            FROM medicos
            JOIN medicos_obrassociales ON medicos.id = medicos_obrassociales.id_medico
            JOIN especialidades ON medicos.id_especialidad = especialidades.id
            JOIN usuarios ON medicos.id_usuario = usuarios.id
            WHERE medicos_obrassociales.id_obraSocial = ?`;

        conx.query(query, [obraSocialId], (error, results) => {
            if (error) {
                console.error('Error al obtener médicos por obra social:', error);
                callback([]);
            } else {
                callback(results);
            }
        });
    }

    //guardar un nuevo médico en la base de datos, o guardar datos actualizados en el formulario de editar médico
    async guardarMedico(datos, callback) {

        //si el id del médico es 0, crea un nuevo médico
        if(datos.id == 0){
        let sql = `INSERT INTO medicos (id_usuario, id_especialidad, telefono, descripcion, foto)`;
        sql += `VALUES (?, ?, ?, ?, ?)`;
        conx.query(sql, [datos.id_usuario, datos.id_especialidad, datos.telefono, datos.descripcion, datos.foto], async (err, results) => {
            if(err){
                console.error(err);
                callback(null);
            }else{
                callback(results);
            }
        });

        }else{ //si no, actualiza datos existentes
        let sql = `UPDATE medicos SET id_usuario = ?, id_especialidad = ?, telefono = ?, descripcion = ?, foto = ? WHERE id = ?`;
        conx.query(sql, [datos.id_usuario, datos.id_especialidad, datos.telefono, datos.descripcion, datos.foto, datos.id], async (err, results) => {
            if(err){
                console.error(err);
                callback(null);
            }else{
                callback(results);
            }
        });
        }
    }

    

    //eliminar un médico de la base de datos
    async eliminarMedico(id, callback) {
        let sql = `DELETE FROM medicos WHERE id = ?`;
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
        let sql = `SELECT * FROM especialidades`;
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


    //listado de todos los usuarios
    async listarUsuarios() {
        let sql = `SELECT usuarios.id, usuarios.nombre 
                    FROM usuarios
                    JOIN categoria_permiso ON usuarios.id_categoriaPermiso = categoria_permiso.id
                    WHERE usuarios.id_categoriaPermiso = 2`;
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
    

}

module.exports = MedicoModel;
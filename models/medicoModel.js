//AGREGAREMOS LOS COMENTARIOS DE TODO EN CADA LINEA UNA VEZ NOS FUNCIONE EL ABML

const conx = require('../database/db');

const db = require('../config/database');

const Medico = {
    getAll: (callback) => {
        const query = 'SELECT * FROM medicos';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM medicos WHERE id = ?';
        db.query(query, [id], callback);
    },

    create: (data, callback) => {
        const query = 'INSERT INTO medicos (id_usuario, id_especialidad, telefono) VALUES (?, ?, ?)';
        db.query(query, [data.id_usuario, data.id_especialidad, data.telefono], callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE medicos SET id_usuario = ?, id_especialidad = ?, telefono = ? WHERE id = ?';
        db.query(query, [data.id_usuario, data.id_especialidad, data.telefono, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM medicos WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Medico;


module.exports = medicoModel; //es para exportar el modulo.

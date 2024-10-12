const conx = require('../database/db');

class EstadoTurnoModel{

    async listarEstadoTurno(callback) {
        let sql = `
            SELECT 
                estado_turno.id, 
                estado_turno.nombre AS estado_nombre
            FROM estado_turno
        `;
        conx.query(sql, [], (err, results) => {
            if (err) {
                console.error(err);
                return callback([]);
            }
            callback(results);
        });
    }
}

module.exports = EstadoTurnoModel;
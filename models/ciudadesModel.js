const conx = require('../database/db');

class CiudadesModel{

    async listarCiudades(callback) {
        let sql = `
            SELECT 
                ciudades.id, 
                ciudades.nombre AS nombre_ciudad
            FROM ciudades
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

module.exports = CiudadesModel;
//importo la conexión a la base de datos y la guardo en la constante "conx" para poder conusltar
const conx = require('../database/db');

class HorarioModel {

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
//importo la conexión a la base de datos y la guardo en la constante "conx" para poder conusltar
const conx = require('../database/db');

class PacienteModel{
    async listarPaciente(callback){
        let sql = `SELECT * FROM pacientes`;
        conx.query(sql, [], (err, results) => {
            if (err) {
                console.error(err);
                return callback([]);
            }
            callback(results);
        });
    }
}


//exporto la función/es para poder ser utilizada/s desde el controlador
module.exports = PacienteModel;


//importo la conexión a la base de datos y la guardo en la constante "conx" para poder conusltar
const conx = require('../database/db');

class HistoriaClinicaModel{

    obtenerHistoriaClinicaBase(){
        return {
            id: 0,
            fecha:'',
            id_paciente:'',
            nro_afiliado:'',
            sexo:'',
            fecha_de_nacimiento:'',
            edad:'',
            calle:'',
            altura:'',
            ciudad:'',
            id_turno:'',
            antecedentes_personales:'',
            medicacion_actual:'',
            examen_clinico:'',
            diagnostico:'',
            tratamiento:''
        }
    }

    async listarHistoriaClinica(callback){
        let sql = `
            SELECT 
                historia_clinica.id AS id, 
                historia_clinica.fecha AS fecha, 
                P1.nombre AS nombre_paciente,
                historia_clinica.nro_afiliado AS nro_afiliado,
                historia_clinica.sexo AS sexo, 
                historia_clinica.fecha_de_nacimiento AS fecha_de_nacimiento,
                historia_clinica.edad AS edad,
                historia_clinica.calle AS calle,
                historia_clinica.altura AS altura,
                historia_clinica.ciudad AS ciudad,
                historia_clinica.id_turno AS id_turno,
                historia_clinica.antecedentes_personales AS antecedentes_personales,
                historia_clinica.medicacion_actual AS medicacion_actual,
                historia_clinica.examen_clinico AS examen_clinico,
                historia_clinica.diagnostico AS diagnostico,
                historia_clinica.tratamiento AS tratamiento
            FROM historia_clinica
            LEFT JOIN turnos ON historia_clinica.id_turno = turnos.id
            LEFT JOIN pacientes AS P1 ON historia_clinica.id_paciente = P1.id
            LEFT JOIN pacientes AS P2 ON historia_clinica.edad = P2.edad
        `;
        
        conx.query(sql, [], (err, results) => {
            if (err) {
                console.error(err);
                return callback([]);
            }
            callback(results);
        });
    }

    async obtenerHistoriaClinica(id, callback){
        let sql = `SELECT * FROM historia_clinica WHERE id = ?`;
        conx.query(sql, [id], async (err, results) => {
            if (results.length === 0) {
                callback(this.obtenerHistoriaClinicaBase());
            } else {
            callback(results[0]);
            }
        });
    }

    async obtenerHistoriaClinicaPorDNI(dni, callback){
        let sql = `SELECT * FROM historia_clinica WHERE pacientes.dni = ?`;
        conx.query(sql, [dni], async (err, results) => {
            console.log(err);
            console.log(results);
            if (results.length === 0) {
                callback(null);
            } else {
                callback(results[0]);
            }
        });
    }

    async guardarHistoriaClinica(datos, callback){
        if(datos.id == 0){
            let sql = `INSERT INTO historia_clinica (
            fecha, 
            id_paciente, 
            nro_afiliado, 
            sexo, 
            fecha_de_nacimiento, 
            edad, 
            calle, 
            altura, 
            ciudad, 
            id_turno, 
            antecedentes_personales, 
            medicacion_actual, 
            examen_clinico,
            diagnostico,
            tratamiento
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            conx.query(sql, [
                datos.fecha, 
                datos.id_paciente, 
                datos.nro_afiliado, 
                datos.sexo, 
                datos.fecha_de_nacimiento, 
                datos.edad,
                datos.calle,
                datos.altura,
                datos.ciudad,
                datos.id_turno,
                datos.antecedentes_personales,
                datos.medicacion_actual,
                datos.examen_clinico,
                datos.diagnostico,
                datos.tratamiento
            ], async (err, results) => {
                if (err) {
                    console.error(err);
                    callback(null);
                } else {
                    callback(results);
                }
        });
        } else {
            let sql = `UPDATE historia_clinica SET 
            fecha= ?, 
            id_paciente= ?, 
            nro_afiliado= ?, 
            sexo= ?, 
            fecha_de_nacimiento= ?, 
            edad= ?,
            calle= ?,
            altura= ?,
            ciudad= ?,
            id_turno= ?,
            antecedentes_personales= ?,
            medicacion_actual= ?,
            examen_clinico= ?,
            diagnostico= ?,
            tratamiento= ?
            WHERE id = ?`;
            conx.query(sql, [
                datos.fecha, 
                datos.id_paciente, 
                datos.nro_afiliado, 
                datos.sexo, 
                datos.fecha_de_nacimiento, 
                datos.edad, 
                datos.calle,
                datos.altura,
                datos.ciudad,
                datos.id_turno,
                datos.antecedentes_personales,
                datos.medicacion_actual,
                datos.examen_clinico,
                datos.diagnostico,
                datos.tratamiento,
                datos.id
            ], async (err, results)=>{
                if (err) {
                    console.error(err);
                    callback(null);
                } else {
                    callback(results);
                }
        });
        }
    }

    async eliminarHistoriaClinica(id, callback) {
        let sql = `DELETE FROM historia_clinica WHERE id = ?`;
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
module.exports = HistoriaClinicaModel;
//importo la conexión a la base de datos y la guardo en la constante "conx" para poder conusltar
const conx = require('../database/db');

class PacienteModel{

    obtenerPacienteBase(){
        return {
            id: 0,
            nombre: '',
            email: '',
            telefono: '',
            id_obrasocial: ''
        }
    }

    async listarPacientes(callback){
        //esta función obtiene los pacientes y detalles de la base de datos
        /*dentro de la constante "sql" guardo toda la consulta realizada para tener mayor prolijidad
        a la hora de hacer el conx.query, además realizo varios joins con las tablas relacionadas a 
        pacientes para poder traer la información correspondiente en cada campo
        */
        let sql = `
            SELECT 
                pacientes.id AS id, 
                pacientes.nombre AS nombre, 
                pacientes.dni AS dni,
                pacientes.email AS email, 
                pacientes.telefono AS telefono,
                obras_sociales.nombre AS obra_social
            FROM pacientes
            LEFT JOIN obras_sociales ON pacientes.id_obrasocial = obras_sociales.id
        `;
        
        conx.query(sql, [], (err, results) => {
            if (err) {
                console.error(err);
                return callback([]);
            }
            callback(results);
        });
    }

    async obtenerPaciente(id, callback){
        let sql = `
            SELECT 
                pacientes.id, 
                pacientes.nombre, 
                pacientes.dni,
                pacientes.email, 
                pacientes.telefono, 
                pacientes.id_obrasocial
            FROM pacientes
            WHERE pacientes.id = ?`;
        conx.query(sql, [id], async (err, results) => {
            if (results.length === 0) {
                callback(this.obtenerPacienteBase());
            } else {
            callback(results[0]);
            }
        });
    }

    async obtenerPacientePorDNI(dni, callback){
        let sql = `SELECT * FROM pacientes WHERE dni = ?`;
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

    async guardarPaciente(datos, callback) {
        if(datos.id == 0){
            let sql = `INSERT INTO pacientes (nombre, dni, email, telefono, id_obrasocial)`;
            sql += `VALUES (?,?,?,?,?)`;
            conx.query(sql, [datos.nombre, datos.dni, datos.email, datos.telefono, datos.id_obrasocial], async (err, results)=>{
                if (err) {
                    console.error(err);
                    callback(null);
                } else {
                    callback(results);
                }
        });
        } else {
            let sql = `UPDATE pacientes SET nombre= ?, dni= ?, email= ?, telefono= ?, id_obrasocial= ? WHERE id = ?`;
            conx.query(sql, [datos.nombre, datos.dni, datos.email, datos.telefono, datos.id_obrasocial, datos.id], async (err, results)=>{
                if (err) {
                    console.error(err);
                    callback(null);
                } else {
                    callback(results);
                }
        });
        }
    }     

    async eliminarPaciente(id, callback) {
        let sql = `DELETE FROM pacientes WHERE id = ?`;
        conx.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                callback(null);
            } else {
                callback(results);
            }
        });
    }

    //Función para traerme las obras sociales en editarPaciente.ejs
    async obtenerObrasSociales(callback) {
        let sql = `SELECT id, nombre FROM obras_sociales`;
        conx.query(sql, [], (err, results) => {
            if (err) {
                console.error(err);
                return callback([]);
            }
            callback(results);
        });
    }

    //Función para traerme las ciudades en editarPaciente.ejs
    async obtenerCiudades(callback) {
        let sql = `SELECT id, nombre FROM ciudades`;
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
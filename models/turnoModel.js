//importo la conexión a la base de datos y la guardo en la constante "conx" para poder conusltar
const conx = require('../database/db');

//esta función obtiene los turnos y detalles de la base de datos
const obtenerTurnos = (callback) => {
    /*dentro de la constante "sql" guardo toda la consulta realizada para tener mayor prolijidad
    a la hora de hacer el conx.query, además realizo varios joins con las tablas relacionadas a 
    turnos para poder traer la información correspondiente en cada campo
    */
    const sql = `
        SELECT 
            turnos.id AS turno_id, 
            CONCAT(usuarios.nombre) AS medico_nombre,
            pacientes.nombre AS paciente_nombre, 
            turnos.fecha_hora, 
            turnos.motivo 
        FROM turnos 
        JOIN medicos ON turnos.id_medico = medicos.id 
        JOIN usuarios ON medicos.id_usuario = usuarios.id 
        JOIN especialidades ON medicos.id_especialidad = especialidades.id 
        JOIN pacientes ON turnos.id_paciente = pacientes.id
        JOIN obras_sociales ON pacientes.id_obraSocial = obras_sociales.id
    `;

    //realizo el conx.query pasandole la constante sql donde esta la consulta anterior
    conx.query(sql, (error, results) => {
        if (error) {
            return callback(error, null); 
        }
        callback(null, results);
    });
};

//Funcion Agregar Turno
const agregarTurno = (id_medico, id_paciente, fecha_hora, motivo, callback)=> {
    const sql = `
    INSERT INTO turnos (id_medico, id_paciente, fecha_hora, motivo) VALUES
    (?, ?, ?, ?);
    `;
    conx.query(sql, [id_medico, id_paciente, fecha_hora, motivo], (error, results) => {
        if (error) {
            return callback(error, null); 
        }
        callback(null, results);
    });
};


//Funcion Editar Turno
const editarTurno = (callback)=> {
    const sql = `
    
    
    `;
    conx.query(sql, (error, results) => {
        if (error) {
            return callback(error, null); 
        }
        callback(null, results);
    });
};

//Funcion Eliminar Turno
const eliminarTurno = (callback)=> {
    const sql = `
    
    
    `;
    conx.query(sql, (error, results) => {
        if (error) {
            return callback(error, null); 
        }
        callback(null, results);
    });
};



//exporto la función/es para poder ser utilizada/s desde el controlador
module.exports = {
    obtenerTurnos
};

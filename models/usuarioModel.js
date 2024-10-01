//usuarioModel.js es el encargado de hacer todas las consultas a la bd de todos los usuarios. 

const conx = require('../database/db'); //conexión a la bd. 

class UsuarioModel{ 

    obtenerUsuarioBase() { //esta función sirve para crear un nuevo usuario y usa como molde la estructura. 
        return { 
            id: 0,
            nombre: '',
            email: '',
            password: '',
            id_categoriaPermiso: 0
        };
    }

    obtenerUsuarios(id, callback) {
        const sql = "SELECT * FROM usuarios WHERE id = ?";
        conx.query(sql, [id], (err, results) => {
            if (err) {
                return callback(err, null); 
            }
            if (results.length === 0) {
                return callback(null, false);
            }
            callback(null, results[0]);
        });
    }

    listar(callback) {
        const sql = "SELECT * FROM usuarios";
        conx.query(sql, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    crear(datos, callback) {
        const sql = "INSERT INTO usuarios (nombre, email, password, id_categoriaPermiso) VALUES (?, ?, ?, ?)";
        conx.query(sql, [datos.nombre, datos.email, datos.password, datos.id_categoriaPermiso], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
    
    actualizar(datos, callback) {        
        const sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ?, id_categoriaPermiso = ? WHERE id = ?";
        conx.query(sql, [datos.nombre, datos.email, datos.password, datos.id_categoriaPermiso, datos.id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    eliminar(id, callback) {
        const sql = "DELETE FROM usuarios WHERE id = ?";
        conx.query(sql, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}; 
module.exports = UsuarioModel; //para exportar el modulo.
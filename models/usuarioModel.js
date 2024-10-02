//usuarioModel.js es el encargado de hacer todas las consultas a la bd de todos los usuarios. 

const conx = require('../database/db'); //conexión a la bd. 

class UsuarioModel{ 

    async listarCategoria(){
        return new Promise ((resolve, reject) => {
            let sql = "SELECT * FROM categoria_permiso";
            conx.query(sql, [], async(err,results) => {
                if(err) {
                    console.error("Error al obtener categoria", err);
                    reject(err);
                } else{
                    resolve(results);
                }
            });
        });
    }

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
        conx.query(sql, [datos.nombre, datos.email, datos.password, datos.categoria], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }
    
    actualizar(datos, callback) {        
        let sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ?, id_categoriaPermiso = ? WHERE id = ?";
        conx.query(sql, [datos.nombre, datos.email, datos.password, datos.categoria, datos.id], async (err, results) => {
            if (err) {
                console.error(err);
                return callback(null);
            } else {
            callback(results);
            }
        });
    }

    async eliminar(id, callback) {
        console.log(id);
        let sql = "DELETE FROM usuarios WHERE id = ?";
        conx.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                callback(null);
            }else {
                callback(results);
            }
        });
    }
}; 
module.exports = UsuarioModel; //para exportar el modulo.
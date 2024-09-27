//usuarioModel.js es el encargado de hacer todas las consultas a la bd de todos los usuarios. 

const conx = require('../database/db'); //conexión a la bd. 

class UsuarioModel{ 
    obtenerUsuarioBase() { //esta función sirve para crear un nuevo usuario
        return { //simulo un usuario q no existe pero tiene la misma estructura de uno q si, me ayuda al de crear, xq si le pasamos un id 0 va a crear en la parte de guardar
            id: 0,
            nombre: '',
            email: '',
            password: '',
            id_categoriaPermiso: 0
        }
    }

    async obtenerUsuario(id, callback){//le pasamos el id para hacer la búsqueda
        let sql = "SELECT * FROM usuarios WHERE id = ?"; //se le pasa un comodín xq vamos a tener que pasarle una variable a la consulta
        return new Promise((resolve, reject) => {
            conx.query(sql, [id], async (err, results) => {
                if(err){
                    reject(err);
                } else if(results.length === 0){
                    resolve(false);
                } else{
                    resolve(results[0]);
                }
            });
        })
    } //TAMBIÉN LA VAMOS A USAR PARA EL LOGIN
    
    async listar(callback) { //este método es un método asincrónico. Lo que permite trabajar con async y await. ES PARA VER TODOS LOS USUARIOS
        let sql = "SELECT * FROM usuarios"; //consulta para obtener todos los usuarios
        conx.query(sql, [], async (err,results) => { //esto permite utilizar las diferentes consultas q queramos ejecutar en la bd. Los parámetros que vamos a enviarle a la función, y tiene que pasarse por un array que los contengan
            if (err) {
                console.error(err); 
                return callback([]);
            }
            callback(results); //todo lo que va a venir de los usuarios. 
        }); //la función última se encarga de decir cuándo va a pasar algo y cuando no
    }

    async guardar(datos, callback){ 
        if (datos.id == 0){ //si es nuevo el usuario, inserto
            //creamos
            let sql = "INSERT INTO usuarios (nombre, email, password, id_categoriaPermiso) ";
            sql += "VALUES (?, ?, ?, ?) ";
            conx.query(sql, [datos.nombre, datos.email, datos.password, datos.id_categoriaPermiso], async (err, results) => {
                if (err) {
                    console.error("Error al guardar el usuario:", err);
                    return callback(null);
                }
                callback(results);
            });

        } else { //si es distinto a cero (ya existe), actualizo
            let sql = "UPDATE usuarios SET id = ?, nombre = ?, email = ?, password = ?, id_categoriaPermiso = ? WHERE id = ?";
            conx.query(sql, [datos.id, datos.nombre, datos.email, datos.password, datos.id_categoriaPermiso], async (err, results) => {
                if (err) {
                    console.error("Error al actualizar el usuario:", err);
                    return callback(null);
                }
                callback(results);
            });
        }
    }

    async eliminar(id, callback){
        let sql = "DELETE FROM usuarios WHERE id = ?";
        conx.query(sql, [id], async (err, results) => {
            callback(results);
        })
    }

}; 
module.exports = UsuarioModel; //para exportar el modulo.
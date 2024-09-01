const conx = require('../database/db'); //conexión a la bd. Aca importamos la bd

class UsuarioModel{ //el modelo es usuario. Es una clase que tiene distintos métodos y propiedades. Los métodos van a trabajar con la bd, por ende, a partir de esas configuraciones vamos a poner los datos que vamos a obtener.
    
    //esta función sirve para crear un nuevo usuario
    obtenerUsuarioBase() {
        return { //acá simulo un usuario q no existe pero tiene la misma estructura de uno q si, me ayuda al de crear, xq si le pasamos un id 0 va a crear en la parte de guardar
            id: 0,
            nombre: '',
            email: '',
            id_categoria: 0
        }
    }
    
    async listar(callback) { //este método es un método asincrónico. Lo que permite trabajar con async y await. ES PARA VER TODOS LOS USUARIOS
        let sql = "SELECT * FROM usuarios"; //consulta para obtener todos los usuarios
        conx.query(sql, [], async (err,results) => { //esto va a permitir utilizar las diferentes consultas q queramos ejecutar en la bd. Los parámetros que vamos a enviarle a la función, y tiene que pasarse por un array que los contengan
            //acá va a estar la lógica para trabajar con los resultados que queremos de la bd
            if (err) {
                console.error(err); // Manejo básico de errores
                return callback([]);
            }
            callback(results); //todo lo que va a venir de los usuarios. 
        }); //la función última se encarga de decir cuándo va a pasar algo y cuando no
    }

    async obtenerUsuario(id, callback){//le pasamos el id para hacer la búsqueda
        let sql = "SELECT * FROM usuarios WHERE id = ?"; //se le pasa un comodín xq vamos a tener que pasarle una variable a la consulta
        conx.query(sql, [id], async (err, results) => {
            if(results.length === 0) callback(false); //si el usuario no existe tenemos false y si no
            callback(results[0]); //devolvemos el user correspondiente
        })
    } //TAMBIÉN LA VAMOS A USAR PARA EL LOGIN

    async guardar(datos,callback){ 
        if (datos.id == 0){ //si el id q mandé, inserto
            //creamos
            let sql = "INSERT INTO usuarios (nombre, apellido, email, id_categoria) ";
            sql += "VALUES (?, ?, ?, ?) ";
            conx.query(sql, [datos.nombre, datos.email, datos.id_categoria], async (err, results) => {
                callback(results);
            });

        } else { //si es distinto a cero, actualizo
            //actualizamos
            let sql = "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, id_categoria = ? WHERE id = ?";
            conx.query(sql, [datos.nombre, datos.email, datos.id_categoria], async (err, results) => {
                callback(results);
            });
        }
    }

    async eliminar(id, callback){
        let sql = "DELETE * FROM usuarios WHERE id = ?";
        conx.query(sql, [id], async (err, results) => {
            callback(results);
        })
    }

    //FUNCIÓN PARA EL LOGIN
    validarUsuario(email, password) {
        return new Promise( (resolve, reject) => {
            let sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
            conx.query(sql, [email, password], (err, results) => {
                try {
                    if (results.length == 0){
                        resolve(null);
                    }
                    resolve(results[0]);
                } catch(error){
                    reject(error);
                }
            });
        });
    }
    //FIN FUNCIÓN PARA LOGIN

}; //usuario model es el encargado de hacer todas las consultas a la bd de todos los usuarios. 
module.exports = UsuarioModel; //es para exportar el modulo.
const conx = require('../database/db'); //conexión a la bd. Aca importamos la bd

class UsuarioModel{ //el modelo es usuario. Es una clase que tiene distintos métodos y propiedades. Los métodos van a trabajar con la bd, por ende, a partir de esas configuraciones vamos a poner los datos que vamos a obtener.
    
    async listar(callback) { //este método es un método asincronico. Lo que permite trabajar con async y await. ES PARA VER TODOS LOS USUARIOS
        let sql = "SELECT * FROM usuarios"; //para obtener todos los usuarios
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
            if (err) {
                console.error(err); // Manejo básico de errores
                return callback(false);
            }
            if(results.length === 0) return callback(false);
            callback(results[0]);
        })
    }
}; //usuario model es el encargado de hacer todas las consultas a la bd de todos los usuarios. 
module.exports = UsuarioModel; //es para exportar el modulo.